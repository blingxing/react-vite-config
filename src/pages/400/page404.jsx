import React from 'react';
import { Empty, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page40x}>
      <Empty description={false}>
        <p className={styles.des}>很抱歉，你要查找的网页找不到。</p>
        <Button type='link' onClick={() => navigate('/', { replace: true })}>
          返回首页
        </Button>
      </Empty>
    </div>
  );
};

export default Page404;
