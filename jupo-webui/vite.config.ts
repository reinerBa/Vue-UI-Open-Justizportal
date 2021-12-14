import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {open: true},
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'webapiMock',
        localEnabled: command === 'serve',
      }),
    ],
  }
}