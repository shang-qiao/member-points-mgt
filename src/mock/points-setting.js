import Mock from 'mockjs';
import CONSTANT from '../constants/common';
import dayjs from 'dayjs';

// 延时后再响应
Mock.setup({
  timeout: 300,
});
// 数据库中的数据
let data = [];
for (let i = 0; i < 60; i++) {
  data.push({
    key: i,
    no: i,
    activityName: `Edward King ${i}`,
    activityType: CONSTANT.TYPE_OPTIONS[Math.ceil(Math.random() * 3) - 1],
    activityTime:
      '2022/11/' +
      Math.ceil(Math.random() * 30) +
      ' - 2022/12/' +
      Math.ceil(Math.random() * 30),
    activityPort: CONSTANT.PORT_OPTIONS[Math.ceil(Math.random() * 3) - 1],
    activityStatus: CONSTANT.STATUS_OPTIONS[Math.ceil(Math.random() * 3) - 1],
  });
}

function findElementAndReplace(obj, key, type) {
  CONSTANT[key + '_OPTIONS'].forEach((item) => {
    if (item.value === obj[type]) {
      obj[type] = item;
    }
  });
}

function deleteByActivId(id, newData) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key.toString() === id.toString()) {
      if (newData) {
        console.log('new', i, newData);
        data.splice(i, 1, newData);
      } else {
        data.splice(i, 1);
      }
      break;
    }
  }
}

function updateActivity(obj) {
  findElementAndReplace(obj, 'TYPE', 'activityType');
  findElementAndReplace(obj, 'PORT', 'activityPort');
  findElementAndReplace(obj, 'STATUS', 'activityStatus');
  obj.activityTime =
    dayjs(obj.activityTime.split('-')[0]).format('YYYY-MM-DD') +
    ' - ' +
    dayjs(obj.activityTime.split('-')[1]).format('YYYY-MM-DD');
}

Mock.mock('/points-setting/activ/add', 'post', (options) => {
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    const activityData = JSON.parse(options.body);
    console.log('MOCK接收到的数据', activityData);
    if (activityData.key === -1) {
      // add
      activityData['key'] = data.length + 1;
      activityData['no'] = data.length + 1;
      updateActivity(activityData);
      data.push(activityData);
    } else {
      // edit
      activityData.activityTime =
      dayjs(activityData.activityTime.split('-')[0]).format('YYYY-MM-DD') +
      ' - ' +
      dayjs(activityData.activityTime.split('-')[1]).format('YYYY-MM-DD');
      deleteByActivId(activityData.key, activityData);

    }
    return resData(true, 200, 'success!');
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, 'expired token!');
});

Mock.mock(RegExp('/points-setting/activ/delete/[0-9]d*'), 'get', (options) => {
  const activityId = options.url.substring(
    options.url.lastIndexOf('/') + 1,
    options.url.length
  );
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    // 删除数据
    deleteByActivId(activityId);
    return resData(true, 200, 'success!');
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, 'expired token!');
});

Mock.mock('/points-setting/activ-list/get', 'get', () => {
  if (verifyToken()) {
    // 继续业务操作，返回成功或失败
    return {
      result: true,
      code: 200,
      data,
      msg: 'success!',
    };
  }
  // token校验失败，返回611错误码；前端收到，跳转登录接口。
  return resData(false, 611, 'expired token!');
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
