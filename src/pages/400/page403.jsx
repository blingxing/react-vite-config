import React from 'react';
import { Empty } from 'antd';
import styles from './index.module.scss';

const Page403 = () => {
  return (
    <div className={styles.page40x}>
      <Empty description={false}>
        <p className={styles.des}>没有权限，请联系管理员XXX。</p>
      </Empty>
    </div>
  );
};

export default Page403;
