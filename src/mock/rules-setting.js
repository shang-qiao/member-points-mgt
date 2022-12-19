import Mock from 'mockjs';

// 延时后再响应
Mock.setup({
  timeout: 500
});

Mock.mock('/rules-setting/save', 'post',  () => {
  if(verifyToken()) {
    // 继续业务操作，返回成功或失败
    return resData(true, 200, 'success!');
  } 
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611,'expired token!');
});

Mock.mock('/login', 'post',  (options) => {
  console.log(options);
  const { username, password } = JSON.parse(options.body);
  // 用户要登录，校验用户名和密码
  if (username === 'admin' && password === '12345') {
    // 登录成功后，存储token(里面包含了用户的身份信息)
    // token过期时间由服务端控制，过期了，需要重新登录获取
    // 用户登录成功，颁发2小时有效期的token；
    return resData(true, 200, 'success!', 'afhawebewrq.werwoetwe.wherhuiewjqqwe');
  } 
  // 用户名校验失败
  return resData(false, 610, 'username or password is incorrect!');
  
});

function resData(result, code, msg, token) {
  return { result, code, msg, token };
}

//mock好像获取不到header，这里模拟了一下
function verifyToken() {
  // 非登录接口，校验token
  // 2小时内非登录接口请求header携带token，token校验通过，正常访问
  // 从header中取出token，进行校验
  return true;
  // return false;
}