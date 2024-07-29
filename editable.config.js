/*
 * @Author: ryyyyy
 * @Date: 2023-02-01 15:24:16
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-05-09 17:40:06
 * @FilePath: /aigc/editable.config.js
 * @Description:
 *
 */
import { VITE_SENTRY_RELEASE } from './constant.config';
/**
 * @description: 配置可变部分
 * port：本地服务器端口号
 * base：开发或生产环境服务的公共基础路径
 * proxyApi: 开发代理前缀
 * apiAddress: 代理到的目标服务器api
 * VITE_SENTRY_DSN: sentry dsn地址
 * project: sentry项目名称，在sentryclirc中配置
 */
export const port = 3001;
export const base = './';
const urlPrefix = '~/assets'; //如果线上包裹了dist则为‘～/dist/assets’，以此类推
//代理相关
export const apiAddress = `http://api.aigc.wanmei.com`;
export const proxyApi = '/api';
//sentry 配置相关
export const VITE_SENTRY_DSN =
  'https://f1c38e340375456bb108d569ea9f169a@sentry.games.wanmei.com/16';
export const sentryConfig = {
  configFile: './.sentryclirc',
  release: VITE_SENTRY_RELEASE, // package.json version 保持同步
  deploy: {
    env: 'production',
  },
  skipEnvironmentCheck: true, // 可以跳过环境检查
  sourceMaps: {
    include: [`./dist/assets`], // sourceMap所在文件夹
    ignore: ['node_modules', 'vite.config.js', 'config.js'],
    urlPrefix, // 项目上线之后js文件夹，~代表网站根目录，例如http://web.oa.wanmei.net/
  },
  debug: true,
  setCommits: {
    auto: true,
    ignoreEmpty: true,
  },
};

export const defineEnvVariabels = {
  'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(VITE_SENTRY_RELEASE),
  'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(VITE_SENTRY_DSN),
};
