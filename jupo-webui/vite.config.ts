import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import sri from 'rollup-plugin-sri'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: './',
    server: { open: true },
    test: {
      globals: true
    },
    plugins: [
      vue(),
      {
        enforce: 'post',
        ...sri({ publicPath: './', selectors: ['script', 'link[rel=modulepreload]'] })
      },
      viteMockServe({
        // default
        mockPath: 'webapiMock',
        localEnabled: command === 'serve'
      })
    ]
  }
}
