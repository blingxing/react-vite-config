/*
 * @Author: ryyyyy
 * @Date: 2023-05-06 11:08:46
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-08-03 15:07:27
 * @FilePath: /data-screen/src/router/index.jsx
 * @Description:
 *
 */
import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

const Page1 = lazy(() => import('@/pages/page1'));
//Do not edit! CDA PREPEND:import
// const Page404 = lazy(() => import('@/pages/400/page404'));

const routerList = [
  createRedirect('/', '/page1'),
  {
    path: '/page1',
    element: createSuspense(<Page1 />),
  },
  //Do not edit! CDA PREPEND:router
  // {
  //   path: '*',
  //   element: createSuspense(<Page404 />),
  // },
];

function SuspenseElement({ children }) {
  return (
    <Suspense
      fallback={
        <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>loading...</div>
      }
    >
      {children}
    </Suspense>
  );
}

function createSuspense(children) {
  return <SuspenseElement>{children}</SuspenseElement>;
}

function createRedirect(path, to, replace = true) {
  return {
    path,
    element: <Navigate replace={replace} to={to} />,
  };
}

const Router = () => useRoutes(routerList);

export default Router;
