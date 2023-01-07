##### 1. 为什么要使用 css module？

通过编译的方式修改选择器名字为全局唯一的方式来实现 css 的样式隔离。

- 全局 css 污染
- css 命名冲突

  现在有这样一个场景：
  A 页面和 B 页面都有一个相同的类名
  在 A 页面中有引入 css，
  B 页面没有 css。
  在我们切换 A 和 B 页面的时候。
  A 页面的 css 也作用在了 B 页面。
  我们只希望 A 页面的 css 不影响 B 页面。
  怎么处理这样的问题了。
  可以将 css 文件变成 xxx.module.css。

##### 2.create-react-app 脚手架中默认支持 scss 和 css module

1. 将 css 文件名改为 xxx.module.scss
2. 导入样式

```javascript
import styles from "./index.module.scss";
```

3. 通过 styles + 类名调用

```html
<header className="{styles.header}"></header>
```

4. 生成随机字符串，避免命名冲突。
   <br/>
   可在 webpack 中配置命名规则。

```html
<div class="header__mhzyI"></div>
```

5. 如何修改组件样式或全局样式？
   <br/>
   写在:global 中，不会生成随机字符串，也不用通过 styles+类名调用。

```scss
// 修改组件样式，不由styles.类名调用
:global {
  .anticon-file-add {
    margin-right: 5px;
    font-size: 20px;
  }
}
```

##### 3.为什么不使用 styled-component？

styled-components 是一个常用的 css in js 类库。
<br/>
原理：生成一个随机的 className。

```javascript

import styled from 'styled-components'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;
// 相当于  const Title = styled.h1(xx)
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;
render () {
    return (
        <Wrapper>
            <Title>Hello styled-components</Title>
        </Wrapper>
    )
}
```
缺点：
- 不能使用eslint格式化
- 因为css-in-js，所以可能会让组件的tsx文件变得很长
- styled-components每次渲染都会重新计算cssRule，并且计算出新的className，如果样式表中还没有对应的className,则会插入到样式表中
