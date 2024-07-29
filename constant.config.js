/*
 * @Author: ryyyyy
 * @Date: 2023-02-06 17:30:39
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-03-20 10:50:52
 * @FilePath: /create-data-vite-app/constant.config.js
 * @Description: 
 * 
 */
import * as path from 'path';
import * as fs from 'fs';
const { NODE_ENV, npm_package_version } = process.env;

export const MODE_DEVELOPMENT = NODE_ENV === "development";
export const MODE_PRODUCTION = NODE_ENV === "production";
export const VITE_SENTRY_RELEASE = npm_package_version;

/**
 * @description: sourcemap 上传插件
 */
export const delSourceMapPlugin = () => {
  return {
    name: "del-source-map",
    apply: "build",
    enforce: "post",
    closeBundle: {
      sequential: true,
      order: "post",
      handler: () => {
        delSouceMap();
      },
    },
  };
};
/**
 * @description: sourcemap 上传完毕后自动删除
 */
export function delSouceMap() {
  const sourceDir = path.resolve(__dirname, `./dist/assets`);
  const files = fs.readdirSync(sourceDir, { encoding: "utf-8" });
  files.forEach((fName) => {
    if (/\.map$/.test(fName)) {
      fs.rmSync(path.resolve(sourceDir, fName), { force: true });
    }
  });
  console.log("sourcemap has been removed............");
}

/**
 * @description: css classname 开发环境命名修改，加上路径，便于定位
 */
const srcPath = path.resolve(__dirname, './src')
export const createDevClassName = (resourcePath, localName) => {
  const pathStr = path
    .relative(srcPath, resourcePath)
    .replace(/\/|\\/g, '-')
    .replace('.module.scss', '');
  return `${pathStr}__${localName}`;
};

const classNamesAlphabet = 'abcdefghijklmnopqrstuvwxyz';
let id = 0;
const prefix = 'cda_';
const map = {};
const createId = () => {
    let quotient = id;
    let remainder = 0;
    const idArr = [];
    do {
        remainder = quotient % classNamesAlphabet.length;
        quotient = Math.floor(quotient / classNamesAlphabet.length);
        idArr.unshift(classNamesAlphabet[remainder]);
    } while (quotient > 0);

    id++;
    return prefix + idArr.join('');
};

/**
 * @description: 非开发环境css命名规则优化，减少名称长度，减小文件大小
 */
export const createNotDevClassName = (path, name) => {
    let key = `${path}_${name}`;
    if (!map[key]) map[key] = createId();
    return map[key];
};
