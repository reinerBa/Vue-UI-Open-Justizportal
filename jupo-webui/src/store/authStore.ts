import { stat } from 'fs';
import moment from 'moment'
import { reactive, computed, watch, ref, readonly } from "vue"
import { AuthInfo } from '../libs/models/auth-info';
const storeName = "jupo-auth-store"
const storeCotent: AuthInfo = sessionStorage.getItem(storeName) ? JSON.parse(localStorage.getItem(storeName)) : new AuthInfo()

const state = reactive(storeCotent)
watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)))

var logoutFunction = () => {
    state.username = ""
    state.token = ""
    state.expiresAt = 0
    calculateCountdown()
}
//var expiresAt: number= 0
const _countdown = ref('00:00')
export const countdown = readonly(_countdown)

export const authState = readonly(state)

export const useStore = () => ({
    isExpired: computed(() => moment.now() > state.expiresAt),
    isLoggedIn: computed(()=> Boolean(state.token)),
    username: computed(()=> state.username),
    expiresAt: computed(()=> state.expiresAt),
    resetTimer: (token: string, expiresIn: number) =>{
        state.token = token
        state.expiresAt = moment.now() + expiresIn *1e3
        calculateCountdown()
    },
    setAuthInfo: (info: AuthInfo) => { 
        state.username = info.username,
        state.token = info.token,
        state.expiresAt = info.expiresAt
        calculateCountdown()
    },
    logout: logoutFunction
})

const calculateCountdown = () => {
    var differenceTime = state.expiresAt - moment.now()
    var duration = moment.duration(differenceTime, 'milliseconds')
    _countdown.value = duration.minutes() + ":" + duration.seconds()
}

