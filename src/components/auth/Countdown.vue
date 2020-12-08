<template>
  <span>{{ expiresInDuration }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Moment, Duration, duration, now } from 'moment'
import { durationFilter } from '../../filters/duration.filter'

let intervalHandler: NodeJS.Timeout
export default defineComponent({
  name: 'Countdown',
  props : {
    expiresAt: {
      type: Object as () => Moment,
      required: true
    }
  },
  data () {
    return {
      expiresIn: 0
    }
  },
  computed: {
    expiresInDuration () {
      return durationFilter(this.expiresIn)
    }
  },
  mounted () {
    this.resetTimer()
    intervalHandler = setInterval(this.resetTimer, 1000)
  },
  unmounted () {
    clearInterval(intervalHandler)
  },
  watch : {
    expiresAt () {
      this.resetTimer()
    }
  },
  methods: {
    resetTimer () {
      this.expiresIn = duration(this.expiresAt.diff(now()))
    }
  }
})
</script>