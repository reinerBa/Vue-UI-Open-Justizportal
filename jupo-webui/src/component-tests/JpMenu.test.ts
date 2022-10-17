import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import JpMenu from '../components/navigation/JpMenu.vue'

test('jpmenu', async () => {
  expect(JpMenu).toBeTruthy()

  const wrapper = mount(JpMenu, {})
  expect(wrapper.text()).toContain('Home')
  expect(wrapper.text()).toContain('Kontakt')
})
