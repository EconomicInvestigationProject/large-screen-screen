import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import { resolve } from "path"; // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: "localhost", //配置主机名
    port: 8085, //配置端口号
    // 热更新
    hmr: true,
    proxy: {
      //代理
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  axios: {
    //是否开启跨域
    proxy: true
  },
  plugins: [vue()]
});
