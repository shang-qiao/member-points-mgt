当前使用 v5 版本。

##### 1. 安装

- 安装依赖 `npm i antd -S`
- 安装 `npm i babel-plugin-import -D`
  - babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

##### 2. package.json 增加配置
babel节点中添加plugins子节点
```javascript
  "babel": {
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true
        }
      ]
    ]
  }
```

##### 3. 引入组件

- 在使用的地方直接引入组件即可，无需再引入样式

```javascript
import "antd/dist/reset.css";
import { Button } from "antd";
```

##### 4. Q&A

1.
