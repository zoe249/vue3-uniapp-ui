import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
// 自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // transpileDependencies: ['uview-plus'],
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', 'uni-app'],
      //存放的位置
      dts: 'src/auto-import.d.ts'
    })
    // Components({
    //   dts: 'src/components.d.ts',
    // }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(__dirname, './src')
    },
    // 忽略后缀
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
