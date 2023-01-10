当前使用 v6 版本。v4 版本与之前版本有较大的差别，需安装 react-router-dom。

##### 1. 安装

- 安装依赖 `npm i react-router react-router-dom -S`

##### 2. 配置路由

- 创建路由目录 router，新建路由配置文件 index.js

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';

<Routes>
  <!-- 路由跳转：v6 将 <Redirect> 组件移除了，故采用 <Navigate replace /> -->
  <Route path="/" element={<Navigate to="/rules-setting" replace />} />
  <Route path="/login" element={<Login />} />
</Routes>
```

##### 3. 路由组件必须被 BrowserRouter/HashRouter 包裹

所以在入口文件 index.js 中引入配置好的路由，然后被 BrowserRouter 包裹。

```javascript
import { BrowserRouter, HashRouter } from "react-router-dom";
import Routes from "./router";

<React.StrictMode>
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
</React.StrictMode>
```

##### 4. Q&A

1. 路由有几种模式？推荐使用哪种模式？为什么？
   - Histoty
     - 
   - Hash
   
2. 

3. 注意：withRouter在react-router-dom@6中被删除。