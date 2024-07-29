/*
 * @Author: ryyyyy
 * @Date: 2023-08-03 15:07:49
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-11-27 15:12:49
 * @FilePath: /react-vite-m-config/src/pages/page1/index.jsx
 * @Description:
 *
 */
import React from 'react';
import styles from './index.module.scss';
import src from '@/images/test1.jpg';
import useStore from './store';
import useCreatorStore from '@/global/store';
const Page1 = () => {
  const { userInfo, setUserInfo } = useCreatorStore();
  const { count, setCount } = useStore();
  return (
    <div>
      <div>
        <p>这个name来自于global： {userInfo.name}</p>
        <button onClick={() => setUserInfo({ name: 'ryyyy' + Math.random() })}>修改全局的值</button>
        <br />
        {count}
        <button onClick={() => setCount(count + 1)}>add</button>
      </div>

      <img className={styles.img} src={src} />
    </div>
  );
};

export default Page1;
