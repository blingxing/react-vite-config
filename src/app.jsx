/*
 * @Author: ryyyyy
 * @Date: 2023-08-03 14:57:22
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-08-03 14:57:43
 * @FilePath: /data-screen/src/app.jsx
 * @Description:
 *
 */
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/router';

export default () => {
  return (
    <HashRouter>
        <Router />
      </HashRouter>
  );
};
