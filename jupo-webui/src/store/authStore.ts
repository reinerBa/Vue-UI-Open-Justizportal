import { stat } from 'fs';
import moment from 'moment'
import { reactive, computed, watch, ref } from "vue"
import { AuthInfo } from '../libs/core/src/lib/model/auth-info';
const storeName = "jupo-auth-store"
const storeCotent: AuthInfo = sessionStorage.getItem(storeName) ? JSON.parse(localStorage.getItem(storeName)) : new AuthInfo()

const state = reactive(storeCotent)
watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)))

export const useStore = () => ({
    isExpired: computed(() => state.isExpired() ),
    resetTimer: () =>{},
    setAuthInfo: (info: AuthInfo) => { 
        state.username = info.username,
        state.token = info.token,
        state.expiresAt = info.expiresAt
    }
})
