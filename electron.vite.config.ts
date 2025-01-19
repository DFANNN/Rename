import {resolve} from 'path'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue(),
      AutoImport({
        // 指定需要自动引入的库
        imports: ['vue', 'vue-router'],
        // 生成自动导入的声明文件，用于TypeScript类型检查
        dts: 'src/auto-imports.d.ts'
      }),

      // 自动按需引入组件
      Components({
        // 使用ElementPlus组件库的解析器
        resolvers: [ElementPlusResolver()],
        // 生成组件的声明文件，用于TypeScript类型检查
        dts: 'src/components.d.ts'
      })
    ],

  }
})
