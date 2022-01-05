import moment from 'moment'
import { reactive, computed, watch, ref, readonly, InjectionKey, ComputedRef } from "vue"
import { AuthInfo } from '../libs/models/auth-info'
import router from '../router'

const storeName = "jupo-auth-store"
export const AuthStoreKey: InjectionKey<AuthStore> = Symbol('authStore')

export class AuthStore {
    protected _state: AuthInfo = null
/*    public IsLoggedIn(): ComputedRef<boolean> {return computed(()=> Boolean(state.token))} 
    public Token: ComputedRef<string>
    public Username: ComputedRef<string>
    public expiresAt: ComputedRef<number>
*/    public useStore = () => ({
        isLoggedIn: computed(()=> Boolean(this._state.token)),
        token: computed(()=> this._state.token),
        username: computed(()=> this._state.username),
        expiresAt: computed(()=> this._state.expiresAt)})

    constructor(state: AuthInfo = null) {
        const rawState = state || sessionStorage.getItem(storeName) ? JSON.parse(sessionStorage.getItem(storeName)) : new AuthInfo()
        this._state = reactive(rawState)
        watch(this._state, (value) => sessionStorage.setItem(storeName, JSON.stringify(value)))
        
       // this.IsLoggedIn = this._state.token
  /*      this.Username = computed(()=> String(this._state.username))
        this.Token = computed(()=> String(this._state.token))
        this.expiresAt = computed(()=> Number(this._state.expiresAt))
    */}
    static IsLoggedIn() {
      const rawState: AuthInfo = sessionStorage.getItem(storeName) ? JSON.parse(sessionStorage.getItem(storeName)) : new AuthInfo()
      return !!rawState.token
    }

    public logout(): void {
        this._state.username = ""
        this._state.token = ""
        this._state.expiresAt = 0
    }

    public setAuthInfo(info: AuthInfo) { 
        this._state.username = info.username,
        this._state.token = info.token,
        this._state.expiresAt = info.expiresAt
    }
    public ResetTimer(token: string, expiresIn: number) {
        this._state.token = token
        this._state.expiresAt = moment.now() + expiresIn *1e3
    }
}
/*
const storeCotent: AuthInfo = sessionStorage.getItem(storeName) ? JSON.parse(sessionStorage.getItem(storeName)) : new AuthInfo()

const state = reactive(storeCotent)
watch(state, (value) => sessionStorage.setItem(storeName, JSON.stringify(value)))

var logoutFunction = () => {
    state.username = ""
    state.token = ""
    state.expiresAt = 0
    calculateCountdown()
    router.push('/login')
}
//var expiresAt: number= 0
const _countdown = ref('00:00')
export const countdown = readonly(_countdown)

export const authState = readonly(state)

export const useStore = () => ({
    // isExpired: computed(() => moment.now() > state.expiresAt),
    isLoggedIn: computed(()=> Boolean(state.token)),
    token: computed(()=> state.token),
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
*/
