/*
 * @Author: ryyyyy
 * @Date: 2022-02-16 17:41:46
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-05-09 17:42:24
 * @Description: Do not edit
 * @FilePath: /aigc/src/utils/request.js
 */
import axios from 'axios';

const baseConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3600000, // 1小时
  baseURL: '',
};

// if (import.meta.env.MODE === 'development') {
//   baseConfig.headers['X-SSO-UID'] = 'xxx';
// }

const onError = (errorMsg) => {
  return {
    success: false,
    message: errorMsg,
    data: null,
  };
};

const onSuccess = (response) => {
  if (response.data && response.data.code === 0) {
    return {
      ...response.data,
      success: true,
    };
  }

  const responseURL = response.request.responseURL;
  if (import.meta.env.MODE === 'development') {
    console.group(responseURL);
    console.error(responseURL);
    console.error(response.data);
    console.groupEnd(responseURL);
  }
  return {
    success: false,
    data: response.data?.data,
  };
};

const instance = axios.create(baseConfig);

instance.interceptors.response.use(
  (response) => onSuccess(response),
  (error) => onError(error.toString())
);

// 数组转成,链接
function formatParams(params = {}) {
  const r = {};
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      r[key] = params[key].join(',');
    } else {
      r[key] = params[key];
    }
  });
  return r;
}

const request = {
  get: (url, params = {}) => {
    return instance.get(url, {
      params: formatParams(params),
    });
  },
  post: (url, data = {}) => {
    return instance.post(url, data, {});
  },
};

// 普通接口
export default request;

const downloadInstanse = axios.create(baseConfig);

export const downloadRequest = {
  post: (url, data) => {
    return downloadInstanse.request({
      method: 'post',
      url: url,
      data: data,
      responseType: 'blob',
    });
  },
  get: (url, params = {}) => {
    return downloadInstanse.request({
      method: 'get',
      url: url,
      params: formatParams(params),
      responseType: 'blob',
    });
  },
};
