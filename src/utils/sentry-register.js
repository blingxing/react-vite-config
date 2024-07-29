/*
 * @Author: ryyyyy
 * @Date: 2022-02-24 15:53:43
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-02-15 19:23:02
 * @Description: Do not edit
 * @FilePath: /create-data-vite-app/src/utils/sentry-register.js
 */
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { addInstrumentationHandler } from '@sentry/utils';

function getResourceUrl(error) {
  const target = error && error.target;
  if (target) {
    return target.src || target.href;
  }

  return false;
}

export const registerSentry = ({ dsn = '', captureXhr = true, captureResource = true } = {}) => {
  if (!dsn) return;
  if (captureXhr) {
    addInstrumentationHandler('xhr', function (handlerData) {
      if (
        !handlerData.endTimestamp ||
        (handlerData.xhr && handlerData.xhr.__sentry_own_request__) ||
        !(handlerData.xhr && handlerData.xhr.__sentry_xhr__) ||
        (handlerData.xhr && handlerData.xhr.status >= 200 && handlerData.xhr.status <= 399)
      ) {
        return;
      }
      const { method, body, url, status_code } = handlerData.xhr.__sentry_xhr__;
      const apiUrl = url.split('?')[0];
      const duration = handlerData.endTimestamp - handlerData.startTimestamp;
      Sentry.captureMessage(`网络请求出错:[${method}] ${url} ${status_code}`, {
        level: 'error',
        extra: {
          'request.body': body,
          'request.bodytype': Object.prototype.toString.call(body),
          'request.duration': duration,
          'request.response': handlerData.xhr.responseText,
        },
        fingerprint: [method, apiUrl, status_code],
      });
    });
  }

  if (captureResource) {
    window.addEventListener(
      'error',
      function handleSourceError(e) {
        const resourceUrl = getResourceUrl(e);
        if (resourceUrl) {
          Sentry.captureMessage(`资源出错:${resourceUrl}`, {
            level: 'error',
            tags: {
              'resource.fileext': resourceUrl.slice(resourceUrl.lastIndexOf('.') + 1),
            },
            fingerprint: [resourceUrl],
          });
        }
      },
      true
    );
  }

  Sentry.init({
    dsn, //内部转发服务器向sentry服务器发起请求
    ignoreErrors: [
      // Random plugins/extensions
      'top.GLOBALS',
      'ResizeObserver loop limit exceeded',
    ],
    beforeSend: (e) => {
      const pathname = window.location.hash.split('#')[1]?.split('?')?.[0] || '/';
      if (e.tags) {
        e.tags['pathname'] = pathname;
      } else {
        e.tags = {
          pathname: pathname,
        };
      }
      return e;
    },
    integrations: [
      new BrowserTracing({
        tracingOrigins: ['localhost', /^\//],
        beforeNavigate: (context) => {
          return {
            ...context,
            name: window.location.hash.split('#')[1]?.split('?')?.[0] || '/',
          };
        },
        shouldCreateSpanForRequest(url) {
          return false;
        },
      }),
    ],
    release: import.meta.env.VITE_SENTRY_RELEASE, // 版本号，需要与插件的版本一致，否则对应不上

    tracesSampleRate: 1.0, // 采样率，1.0表示100%，0表示0%
    environment: import.meta.env.MODE, // 环境，可以配置，最好从环境变量读取(目前区分了test和production两个环境)
  });
};
