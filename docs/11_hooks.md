##### 一、 Hook 是什么？

- Hook 是 React 16.8 的新增特性。可以在不编写 class 的情况下使用 state 以及其他的 React 特性。
- 没有计划从 React 中移除 class。Hook 和现有代码可以同时工作，可以渐进式地使用他们。

##### 二、 Hook 使用规则？

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中。）

##### 三、 useState()

在 React 函数组件上添加内部 state。

```javascript
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

##### 四、 useEffect()

- useEffect 给函数组件增加了操作副作用的能力。可以把 useEffect 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
- 告诉 React 组件需要在渲染后执行某些操作。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

1. 需要清除的 effect（比如发送网络请求，手动变更 DOM，记录日志）

```javascript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

2. 不需要清除的 effect（订阅外部数据源）

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

3. 通过跳过 Effect 进行性能优化

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新。类似componentDidUpdate()。

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []); // 不依赖于 props 或 state 中的值，所以永远都不需要重复执行。类似componentDidMount()。
```

##### 五、 hook 规则

- 只在最顶层使用 Hook。不要在循环，条件或嵌套函数中调用 Hook。
- 只在 React 函数中调用 Hook。不要在普通的 JavaScript 函数中调用 Hook。

##### 六、自定义 hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

- 必须以 use 开头
- 在两个组件中使用相同的 Hook 不会共享 state
