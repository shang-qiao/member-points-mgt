import Mock from 'mockjs';

// 延时后再响应
Mock.setup({
  timeout: 1000
});

Mock.mock('/rules-setting/save', 'post',  {
  result: true,
  code: 200,
  message: 'success'
});

Mock.mock('/login', 'post',  {
  result: true,
  code: 200,
  message: 'success'
});
