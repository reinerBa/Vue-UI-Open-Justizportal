import { MutationTree } from "vuex";

export interface AppstateStateTypes {
  title: string,
  titleService: string
}

export const state: AppstateStateTypes = {
  title: '',
  titleService: ''
}

export enum AppstateMTypes {
  CHANGE_STATE = 'CHANGE_STATE',
  SET_TITLE = "SET_TITLE"
}

export type AppstateMutationsTypes<S = AppstateStateTypes> = {
  [AppstateMTypes.CHANGE_STATE](state: S, payload: string): void,
  [AppstateMTypes.SET_TITLE](state: S, payload: string): void
}

export const mutations: MutationTree<AppstateStateTypes> &
AppstateMutationsTypes = {
  [AppstateMTypes.CHANGE_STATE](state: AppstateStateTypes, payload: string) {
    state.title = payload;
  },
  [AppstateMTypes.SET_TITLE](state: AppstateStateTypes, payload: string) {
    state.titleService = 'Justizportal | ' + payload
    document.title = state.titleService
  }
}

/*
export interface AppstateActionsTypes {
  [AppstateActionTypes.UPDATE_VERSION](
    { commit }: AugmentedActionContext,
    payload: number
  ): void
}

export enum AppstateActionTypes {
  UPDATE_VERSION = "UPDATE_VERSION"
}
*/

export const appstate = {
  state,
  mutations
}