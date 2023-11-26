import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import { resolve } from "path"; // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, ".", "src")
    }
  },
  server: {
    host: "localhost", //配置主机名
    port: 8080, //配置端口号
    proxy: {
      //代理
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [vue()]
});
