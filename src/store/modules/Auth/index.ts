import { ActionContext, ActionTree, MutationTree } from "vuex";
import { AppConfig, AuthErrorCodes, AuthInfo, AuthResponse } from "../../../ressources/model";
import { IRootState } from "../../store"
import * as moment from 'moment'
import axios from 'axios'
import { getAuthInfo } from "../../../services/local-store.service";

interface AuthRequest {
  username: string
  password: string
}
interface userAuthResponse {
  username: string
  response: AuthResponse
}

export interface AuthStateTypes {
  authInfo: AuthInfo,
  expiredTimer: NodeJS.Timeout,
  tokenUrl: string
}

export const state: AuthStateTypes = {
  authInfo: new AuthInfo(),
  expiredTimer: null,
  tokenUrl: ''
}

// mutations
export enum AuthMTypes {
  SET_EXPIRED_TIMER = 'SET_EXPIRED_TIMER', 
  STORE_AUTH_INFO = 'STORE_AUTH_INFO',
  STORE_AUTH_RESPONSE = 'STORE_AUTH_RESPONSE',
  SET_TOKEN_URL = 'SET_TOKEN_URL'
}

export type AppstateMutationsTypes<S = AuthStateTypes> = {
  [AuthMTypes.SET_EXPIRED_TIMER](state: S, payload: NodeJS.Timeout): void,
  [AuthMTypes.STORE_AUTH_INFO](state: S, payload: AuthInfo): void,
  [AuthMTypes.STORE_AUTH_RESPONSE](state: S, payload: userAuthResponse): void,
  [AuthMTypes.SET_TOKEN_URL](state: S, payload: string): void,
}

export const mutations: MutationTree<AuthStateTypes> &
AppstateMutationsTypes = {
  [AuthMTypes.SET_TOKEN_URL](state: AuthStateTypes, payload: string) {
    state.tokenUrl = payload
  },
  [AuthMTypes.SET_EXPIRED_TIMER](state: AuthStateTypes, payload: NodeJS.Timeout) {
    state.expiredTimer = payload
  },
  [AuthMTypes.SET_EXPIRED_TIMER](state: AuthStateTypes, payload: AuthInfo) {
    if(state.expiredTimer) clearTimeout(state.expiredTimer)
    

    if(state.authInfo.username) {
      const dueTime = moment.duration(state.authInfo.expiresAt.diff(moment.now())).asMilliseconds()

      setTimeout(() => {
        this.logout()
      }, dueTime)
    }
  },
  [AuthMTypes.STORE_AUTH_INFO](state: AuthStateTypes, payload: AuthInfo) {

  }
}

// actions
export enum AuthATypes {
  LOGIN = "LOGIN",
  REFRESH = "REFRESH",
  LOGOUT = "LOGOUT",
  SET_Timer = "SET_TIMER",
  LOAD_FROM_LOCAL_STORE = 'LOAD_FROM_LOCAL_STORE'
}

export interface AuthActionsTypes {
  [AuthATypes.LOGIN](
    { commit, state }: ActionContext<AuthStateTypes, IRootState>,
    payload: AuthRequest
  ): Promise<void>
  [AuthATypes.REFRESH](
    { commit, state }: ActionContext<AuthStateTypes, IRootState>
  ): Promise<void>
  [AuthATypes.LOAD_FROM_LOCAL_STORE](
    { commit }: ActionContext<AuthStateTypes, IRootState> ): void
  [AuthATypes.SET_Timer](
    { commit, state, dispatch }: ActionContext<AuthStateTypes, IRootState>,
    payload: AuthInfo
  ): void
}

export const actions: ActionTree<AuthStateTypes, IRootState> &
  AuthActionsTypes = {
  async [AuthATypes.LOGIN]({ commit, state }, payload: AuthRequest ): Promise<void> {
    let response = await axios.post<AuthResponse>(state.tokenUrl, payload)
    if (response.data.returnCode === AuthErrorCodes.Ok) {
      commit(AuthMTypes.STORE_AUTH_RESPONSE, 
        {username: payload.username, response: response.data} as userAuthResponse)
    }
  },
  async [AuthATypes.REFRESH]({ commit, state }): Promise<void> {
    if (state.authInfo.username && !state.authInfo.isExpired()) {
      const response = await axios.get<AuthResponse>(state.tokenUrl + '/refresh')
      commit(AuthMTypes.STORE_AUTH_RESPONSE, 
        {username: state.authInfo.username, response: response.data} as userAuthResponse)
    }
    await new Promise(resolve => resolve(void))
  },
  [AuthATypes.LOAD_FROM_LOCAL_STORE]({commit}){
    const authInfo = getAuthInfo()

    if (authInfo.username && authInfo.token && authInfo.expiresAt && !authInfo.isExpired()) {
      commit(AuthMTypes.STORE_AUTH_INFO, authInfo)
    }
  },
  [AuthATypes.SET_Timer]({ commit, state, dispatch }, payload: AuthInfo) {
    clearTimeout(state.expiredTimer)
    
    if(state.authInfo.username) {
      const dueTime = moment.duration(state.authInfo.expiresAt.diff(moment.now())).asMilliseconds()

      setTimeout(() => {
        dispatch(AuthATypes.LOGOUT)
      }, dueTime)

      commit(AuthMTypes.SET_EXPIRED_TIMER, payload)
    }
  },

  [AuthATypes.LOAD_FROM_LOCAL_STORE]({ commit }, payload: number) {
    commit(MutationTypes.SET_COUNTER, payload);
  },
  [AuthATypes.REFRESH]({ commit }) {
    commit(MutationTypes.SET_ROOT_DISPATCH, true);
  },
  [AuthATypes.LOGOUT]({ commit }, payload: boolean) {
    console.log('called', payload);
  }
};
export const auth = {
  state,
  mutations,
  actions
}