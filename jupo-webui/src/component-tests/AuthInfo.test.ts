import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AuthInfo from "../components/auth/AuthInfo.vue"
import { AuthService, AuthServiceKey } from "../libs/services/AuthService.ts"
import { AuthStore, AuthStoreKey } from "../store/authStore.ts"
import { config, operatorConfig } from "../store/configStore"

test('nicht angemeldet', async ()=>{
  //const authStore = new AuthStore({  token: "123", username: "user", expiresAt: "15e3"} as AuthInfo) 
  const authStore = new AuthStore()
  const authService = new AuthService(authStore, ()=> config)
  expect(AuthInfo).toBeTruthy()

  const wrapper = mount(AuthInfo, {
    global: {
      provide:{
        [AuthServiceKey]: authService,
        [AuthStoreKey]: authStore
      }
    }
  })
  expect(wrapper.text()).toContain('Sie sind nicht angemeldet')
})

