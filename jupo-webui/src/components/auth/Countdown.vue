<script lang="ts">
import moment from 'moment'
import { Ref } from '@vue/reactivity'
import { defineComponent, inject } from '@vue/runtime-core'
import { AuthStoreKey, AuthStore } from './../../store/authStore'
import router from '../../router'
import { useNow } from '@vueuse/core'
import { injectStrict } from './../../libs/tools'

// @ts-ignore
var intervalHandler: NodeJS.Timeout = null

export default defineComponent({
  props: {
    expiresAt: {
      type: Number, 
      required: true
    }
  },
  methods:{
    countdownTime(nowDate: Date): string{
      var differenceTime = this.expiresAt - (nowDate ).getTime()
      if(differenceTime < 0){
        this.authStore.logout()
        router.push('/login')
      } 

      let duration: moment.Duration = moment.duration((differenceTime as any), 'milliseconds')
      let secounds: String = duration.seconds().toString().length == 1 ? `0${duration.seconds()}` : duration.seconds().toString()
      return `${duration.minutes()}:${secounds}`
    }
  }
})
</script> 
<script lang="ts" setup>
    const authStore: AuthStore = injectStrict<AuthStore>(AuthStoreKey)
    const {expiresAt} = authStore.useStore()
    const nowDate: Ref<Date> = useNow()
</script>

<template>
    <span id="countdown-time">{{countdownTime(nowDate)}}</span>
</template>
