// 路由鉴权
// 1. 判断token是否存在
// 2. 如果存在,直接正常渲染
// 3. 如果不存在,重定向到登录路由

import { Navigate } from 'react-router-dom';
// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
// 这里的AuthRoute就是一个高阶组件

const AuthRoute = ({ children }) => {
  // 获取token
  const token = localStorage.getItem('token');
  // 如果token存在 直接正常渲染
  if (token) {
    return <>{children}</>;
  }
  // 如果token不存在，重定向到登录路由
  
  return <Navigate to='/login' replace />;
  
};
{/*
 <AuthRoute> <Layout /> </AuthRoute> 
 登录：<> <Layout /> </>
 非登录：<Navigate to="/login" replace />
*/ }
export { AuthRoute };