<script lang="ts">
  import { defineComponent, inject } from "@vue/runtime-core"

function eventSorter(a: WebApi.DtOStatistic, b: WebApi.DtOStatistic) {
  if (a.day > b.day) return 1
  if (a.day < b.day) return -1
  if (a.hour > b.hour) return 1
  if (a.hour < b.hour) return -1
  return 0
}

function orderGroups(events: Array<WebApi.DtOStatistic>): Array<Array<WebApi.DtOStatistic>>  {
  let keys: Set<string> = new Set()
  events.forEach(e => keys.add(e.controller + '#' + e.action))

  let rArray : Array<Array<WebApi.DtOStatistic>> = []
  keys.forEach(key => {
    let [controller, action] = key.split("#")
    let eventSet = events.filter(e => e.controller == controller && action == e.action)
    let eventsSorted = eventSet.sort(eventSorter)
    let eventsDateFormated = eventsSorted.map(e => {return {...e, day: e.day.split('-').reverse().join('.')}})

    rArray.push(eventsDateFormated)
  })
  return rArray
}

export default defineComponent({
  components: { DaySum, HourSum },
  data(){
    return {
      startDate: '',
      endDate: '',
      precision: 'h',
      isLoading: false,
      password: '',
      loginDone: false,
      usageDays: [] as Array<string>,
      lastStatisticResponse: [] as Array<WebApi.DtOStatistic>,
      usagesTable: {}
    }
  },
  mounted(){
    let today = moment()
    this.endDate = today.format("YYYY-MM-DD")
    let start = today.subtract(7, "day")
    this.startDate = start.format("YYYY-MM-DD")
  },
  methods:{
    async loginSuccess(pw: string) {
      this.password = pw
      this.loginDone = true

      await this.loadData()
    },
  async loadData(){ 
    let response = await this.statisticService.getNutzungsstatistiken({password: this.password, startDate: this.startDate, endDate: this.endDate})
    this.lastStatisticResponse.splice(0, 9e9, ...response.data)

    let eventData = orderGroups(this.lastStatisticResponse)
    this.usageDays.splice(0, 9e9) 
    for (let key in this.usagesTable) delete this.usagesTable[key]
      
    eventData.forEach(action => {
      let daySet : Map<string, number> = new Map<string, number>()
      let dayList : object = {}
      let daySetName: Array<string> = []
      action.forEach(event => {
        let slotName =`${event.day}: ${event.controller} ${event.action}`
        if (daySet.has(slotName)) {
          daySet.set(slotName, daySet.get(slotName) + event.count)
          dayList[event.day][event.hour] = event.count
        } else {
          daySet.set(slotName, event.count)
          dayList[event.day] = {[event.hour]: event.count}
          daySetName.push(slotName)
        }
      })

      this.usageDays.push(...daySetName.map(name => name +": "+ daySet.get(name)))
      this.usagesTable[`${action[0].controller} ${action[0].action}`] = dayList
    })
  }
}})
</script>

<script lang="ts" setup>
  import { StatisticService, StatisticServiceKey } from "../../libs/services/StatisticService"
  import moment from 'moment'
  import StatisticLogin from './StatisticLogin.vue'
  import DaySum from "./DaySum.vue"
  import HourSum from "./HourSum.vue"
  const statisticService: StatisticService = inject<StatisticService>(StatisticServiceKey)
</script>

<template>
<h2>Nutzungsauswertung</h2>

<StatisticLogin v-if="!loginDone" @access-password="loginSuccess"/>

<div v-if="loginDone">
  <p>
    <label class="pad1em">Von: <input v-model="startDate" type="date"></label>&emsp;
    <label class="pad1em">Bis: <input v-model="endDate" type="date"></label>&emsp; 
    <button class="pad1em" @click="loadData()">Aktualisieren</button>
  </p>
  <p>
    <label class="pad1em"><input type="radio" name="precision" value="d" v-model="precision"/> Tageweise</label>
    <label class="pad1em"><input type="radio" name="precision" value="h" v-model="precision"/> Stundenweise</label>
  </p>

  <HourSum v-if="precision=='h'" :usagesTable="usagesTable"/>
  <DaySum v-if="precision=='d'" :usageDays="usageDays"/>
</div>
</template>

<style lang="stylus">
.pad1em 
    padding 1rem

.jp-stat-table td:not(:first-of-type)
    text-align center
    border 1px solid gray
    min-width 1.5em
</style>