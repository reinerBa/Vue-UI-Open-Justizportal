import {mount} from "@vue/test-utils"
import App from "../App.vue"
import {test, expect} from "vitest"

const user = {
  name: 'matt'
}

test('Matt is 22', () => {
  expect(user.name).toBe('matt')
})

test('mount app.vue', async () => {
  expect(App).toBeTruthy()

//  const wrapper = mount(App, {})
//  expect(wrapper.text()).toContain('Angemeldet als')
})