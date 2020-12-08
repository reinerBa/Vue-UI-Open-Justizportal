import { reactive } from 'vue';
import { createStore, ActionContext } from 'vuex'
import { PortalState, AppOperator, AppConfig } from '../core/model'

export interface AppState {
  title: string,
  appConfig: AppConfig,
  appOperator: AppOperator
}

export default createStore<AppState>({
  state: {
    title: '',
    appConfig: reactive(new AppConfig),
    appOperator: reactive(new AppOperator)
  },
  actions: {
    fetchAppConfig: ({commit}, url: string) => {

    },
    fetchAppOperatorConfig: ({commit}, url: string) => {

    },
    onSetYear: ({commit}, title: string) => {
      commit('setTitle', title);
    }
  },
  mutations: {
    setTitle(state: AppState, title: string) {
      state.title = title;
    },
    setAppConfig (state: AppState, payload: AppConfig) {
      //
    },
    setAppOperatorConfig (state: AppState, payload: AppOperator) {
      //
    }
  }
});
