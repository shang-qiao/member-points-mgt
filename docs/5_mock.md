官方文档：http://mockjs.com/

##### 1. 安装

- 安装依赖 `npm i mockjs -D`

##### 2. 配置

- 创建目录 mock，新建 mock 配置文件（按照模块划分）

```javascript
import Mock from "mockjs";
// 延时后再响应
Mock.setup({
  timeout: 300,
});
Mock.mock("/rules-setting/get", "get", () => {
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    return {
      result: true,
      code: 200,
      data: rulesSetting,
      msg: "success!",
    };
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, "expired token!");
});
```

##### 3. 在入口文件 index.js 中引入，即可启用。注释即停止使用。

```javascript
import "./mock/rules-setting";
```

##### 4. Q&A

<span style="color: red;">【注意】</span>

1. 【坑】设置 axios.defaults.baseURL = '/api'时，mock 会失效，不会拦截到请求。所以使用 mock 时，不要设置 baseURL;
2. 请求路径必须与拦截路径保持一致，否则拦截不到请求。
