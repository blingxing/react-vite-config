/*
 * @Author: ryyyyy
 * @Date: 2022-02-16 17:41:46
 * @LastEditors: ryyyyy
 * @LastEditTime: 2022-03-16 16:30:29
 * @Description: Do not edit
 * @FilePath: /create-data-app/src/pages/error/index.jsx
 */
import React from 'react';
import * as Sentry from "@sentry/react";
export default class RenderControlError extends React.Component {
  state = {
    isError: false,
  };
  componentDidCatch(error, info) {
    this.setState({ isError: true });
  }
  render() {
    return <Sentry.ErrorBoundary fallback={<p>内部出现错误，已上报到服务器，请RTX联系ranyu、liyangyang</p>}>
      {
        !this.state.isError ? (
          this.props.children
        ) : null
      }
    </Sentry.ErrorBoundary>
  }
}
