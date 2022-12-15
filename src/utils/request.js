import axios from 'axios';

// 公共属性设置
const instance = axios.create({
  //【坑】 如果 baseURL有值，则会以baseURL的地址请求为主，mock不会拦截。
  // baseURL: 'api',
  timeout: 3000,
  // headers: {
  //   'Content-Type': 'application/x-www-urlencoded'
  // }
});

function get(url, headers) {
  return instance.get(url, {
    headers,
  });
}

function post(url, data, headers) {
  return instance.post(url, data, {
    headers,
  });
}

instance.interceptors.request.use(
  (config) => {
    // 1.对请求参数做处理
    // 2.添加请求头
    const token = localStorage.getItem('token');
    token && (config.headers['Authorzation'] = 'Bear ' + token);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.code === 500) {
        // 未授权调用授权接口
      } else if (res.data.code === 510) {
        // 未登录跳转登录页面
      } else {
        return res;
      }
    } else {
      Promise.reject(res);
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

export { get, post };
