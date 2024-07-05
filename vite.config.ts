import { loadEnv } from 'vite'

import uni from '@dcloudio/vite-plugin-uni'
// import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log(command, mode)
  return {
    define: {
      // fix "path" module issue
      'process.platform': null,
      'process.version': null
      // define global var
      // GLOBAL_VAR: {
      //   GIT_COMMIT_ID: commitHash
      // }
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 8077, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      // proxy look for https://vitejs.cn/config/#server-proxy
      proxy: {
        '/api/java': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace('/api/java', '')
        },
        '/api/node': {
          target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_NODE_URL,
          changeOrigin: true,
          rewrite: path => path.replace('/api/node', '')
        }
      }
    },
    plugins: [
      uni()
      // eslintPlugin({
      //   cache: false
      // })
    ]
  }
}
