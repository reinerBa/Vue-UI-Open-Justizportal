import { reactive } from 'vue';
import { createStore, ActionContext } from 'vuex'
import { AppConfig, AppOperator } from '../ressources/model';
import { appstate } from './modules/Appstate/appstate';

export interface IRootState {
  version: string;
}

export interface AppState {
  title: string,
  appConfig: AppConfig,
  appOperator: AppOperator
}

export const store = createStore({
  modules: {
    state: appstate,
    auth: authModule,
    akten: aktenModule
  }
})

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
