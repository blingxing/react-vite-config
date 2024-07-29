/*
 * @Author: ryyyyy
 * @Date: 2023-02-01 11:16:32
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-11-27 11:48:06
 * @FilePath: /react-vite-simple-config/vite.config.js
 * @Description:
 *
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import * as path from 'path';

import { base, port, apiAddress, proxyApi, defineEnvVariabels } from './editable.config';

import {
  MODE_PRODUCTION,
  MODE_DEVELOPMENT,
  createDevClassName,
  createNotDevClassName,
} from './constant.config';

import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  return {
    base: `${base}`,
    plugins: [react(), Inspect(), basicSsl(), visualizer()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/var';`,
        },
      },
      modules: {
        root: path.resolve(__dirname, './src'),
        // generateScopedName: MODE_DEVELOPMENT ? "[path][local]-[hash:base64:5]" : "[hash:base64:8]"
        generateScopedName: (name, filename, css) => {
          return MODE_DEVELOPMENT
            ? createDevClassName(filename, name)
            : createNotDevClassName(filename, name);
        },
      },
    },
    build: {
      sourcemap: MODE_PRODUCTION,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd'],
            echarts: ['echarts'],
          },
        },
      },
    },
    server: {
      port,
      open: true,
      https: true,
      // host: true,
      proxy: {
        [proxyApi]: {
          target: apiAddress,
          changeOrigin: true,
          //secure: false, //https 的时候 使用该参数
          // cookieDomainRewrite: "",
          pathRewrite: { '^/api': '/api/' },
        },
      },
    },
    define: defineEnvVariabels,
  };
});
