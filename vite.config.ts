import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
/// <reference types="vitest" />
/// <reference types="vite/client" />
export default defineConfig({
  plugins: [
    WindiCSS(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  
  // publicDir: resolve(__dirname, "./pubf/public"),
  server: {
    host:"localhost",
    port: 8080,
    proxy: {
      '^/api/.*': {
        // 请求地址
              target: 'http://localhost:4000',
              // 是否跨域
              changeOrigin: true,
              // 路径重写
              // rewrite: (path) => path.replace(/^\/api/, '')
            },
      },
      origin: 'http://127.0.0.1:8080/'
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  
  // base: "/",

});
