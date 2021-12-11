<script lang="ts">
import moment, { DurationInputArg2 } from 'moment'
import { ComputedRef } from '@vue/reactivity'
import { defineComponent } from '@vue/runtime-core'
import {useStore, countdown } from './../../store/authStore'

var intervalHandler: NodeJS.Timeout = null

export default defineComponent({
  props: {
    expiresAt: {
      type: Number, 
      required: true
    }
  },
  mounted(){
    this.now = moment.now()
    intervalHandler = setInterval(()=>{
      this.now = moment.now()
    }, 498)
  },
  unmounted(){
    clearInterval(intervalHandler)
  },
  data() {
    return {
      now: 0
    }
  },
  methods:{
    diff (now: bigint, expiresAt: bigint) {
      var differenceTime = expiresAt - now
      if(differenceTime < 0){
        useStore().logout()
      } 

      let duration = moment.duration((differenceTime as any), 'milliseconds')
      let secounds: String = duration.seconds().toString().length == 1 ? `0${duration.seconds()}` : duration.seconds().toString()
      return `${duration.minutes()}:${secounds}`
    }
  }
})
</script> 

<template>
    <span id="countdown-time">{{diff(now, expiresAt)}}</span>
</template>
