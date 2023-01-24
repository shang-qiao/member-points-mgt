import Mock from 'mockjs';

let rulesSetting = {
  isEnabled: 2,
  enableHours: 1,
  isExpire: 2,
  expireDays: 2,
  isRemind: 2,
  pointsRules: {
    standardMoney: 3,
    paidMondy: 4,
    getPoints: 5,
    maxPoints: 6,
  },
  isDeduction: 2,
};

// 延时后再响应
Mock.setup({
  timeout: 300,
});

Mock.mock('/rules-setting/save', 'post', (options) => {
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    rulesSetting = JSON.parse(options.body);
    return resData(true, 200, 'success!');
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, 'expired token!');
});

Mock.mock('/rules-setting/get', 'get', () => {
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    return {
      result: true,
      code: 200,
      data: rulesSetting,
      msg: 'success!',
    };
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, 'expired token!');
});

Mock.mock('/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  const isConsistent = bcrypt.compareSync('12345', password);
  if (username === 'admin' && isConsistent) {
    // 生成jwt令牌，去掉敏感信息
    // 登录成功后，存储token(里面包含了用户的身份信息)
    // token过期时间由服务端控制，过期了，需要重新登录获取
    // 用户登录成功，颁发2小时有效期的token；
    const payload = { username: loginInfo.username };
    const token = jwt.sign(payload, jwtCfg.jwtSecretKey, {
      expiresIn: '2h',
    });
    res.json(resData(true, 200, 'success!', token));
  } else {
    // 用户名密码校验失败
    res.json(resData(false, 610, 'username or password is incorrect!'));
  }
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
