##### 1. 安装

- 安装依赖 `npm i react-redux -S`

##### 2. 配置 redux

1. 创建 constants/ActionType.js 文件

```javascript
const SET_USERNAME = "set_username";

export { SET_USERNAME };
```

2. 创建 store/reducers/user.js 文件

```javascript
import { SET_USERNAME } from "../../constants/ActionType";

export default (state = { username: "" }, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        username: action.username,
      };
    default:
      return state;
  }
};
```

3. 创建 store/actions/user.js 文件

```javascript
import { SET_USERNAME } from "../../constants/ActionType";

const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    username,
  };
};

export { setUsername };
```

4. 创建 store/index.js 文件

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

export default configureStore({
  reducer: userReducer,
});
```

5. 在入口文件 index.js 中配置

```javascript
import { Provider } from "react-redux";
import store from "./store";

<Provider store={store}>
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
</Provider>
```

##### 3. 使用 redux

1. 在类组件中使用 connect

```javascript
import { connect } from "react-redux";
import { setUsername } from "../../store/actions/user";

// 配置组件和redux中数据映射关系
// 通过props.username，props.setUsername()调用
function mapStateToProps(state) {
  return {
    username: state.username,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUsername(username) {
      dispatch(setUsername(username));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(组件名);
// connect 现在是接受参数mapStateToProps/mapDispatchToProps，返回⼀个函数，这个返回的函数是高阶组件。
// 它会接受⼀个组件作为参数，然后⽤connect把组件包装以后再返回。
```

2. 在函数组件中使用

```javascript
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_USERNAME } from "../../constants/ActionType";
// 通过useSelector(callback)获取store数据
const Login = () => {
  // 获取中央仓库中的username
  const username = useSelector((state) => state.username);
  // 修改中央仓库数据
  const dispatch = useDispatch();
  dispatch({ type: SET_USERNAME, data: "ShangQiao" });
};
```

##### 4. Q&A

1. redux 和 react-redux 的关系？
2. 原理？react 的 context 状态树组件通信有点类似？
