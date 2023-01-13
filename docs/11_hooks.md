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

##### 五、自定义 hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

- 必须以 use 开头
- 在两个组件中使用相同的 Hook 不会共享 state

##### 六、额外的 hook

1. useContext

```javascript
function B() {
  // 3. 通过Comsumer获取数据
  return (
    <div>
      <Context.Consumer>{(value) => <span>{value}</span>}</Context.Consumer>
    </div>
  );
  // 4. react16.8版本之后增加了hooks，可以使用hooks中的useContext来获取消费者
  import { useContext } from "react";
  const { name } = useContext(Context);
  // 直接这样定义就可以拿到consumer的值，省去了之前要定义在Consumer中才能使用。
}
```

2. useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state）。 3. useCallback

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
// 返回一个 memoized 回调函数。
```

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

`useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。`

4. useMemo
   `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
   返回一个 memoized 值。

- 把“创建”函数和依赖项数组作为参数传入 `useMemo`，仅会在某个依赖项改变时才重新计算 memoized 值。有助于避免在每次渲染时都进行高开销的计算。

- 传入 useMemo 的函数会在渲染期间执行。不要在这个函数内执行与渲染无关的操作，诸如副作用操作属于 useEffect 的适用范畴，而不是 useMemo。

- 没有提供依赖项数组，useMemo `在每次渲染时都会计算新的值`。

5. useRef

6. useImperativeHandle
   `useImperativeHandle(ref, createHandle, [deps])`
   useImperativeHandle 可以让你在使用 ref 时`自定义暴露给父组件的实例值`。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle 应当与 forwardRef 一起使用`：

```javascript
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。

7. useLayoutEffect
useLayoutEffect和useEffect区别：
- useEffect会在渲染的内容更新到DOM上后执行,不会阻塞DOM的更新（常用）（异步）；
- useLayoutEffect会在渲染的内容更新到DOM上之前进行,会阻塞DOM更新（对渲染结果有影响时才用）（同步）。