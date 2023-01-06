##### 1. 安装

- 安装依赖 `npm i react-i18next i18next --S`

##### 2. 配置国际化

- 创建文件：i18n/zh.js

```javascript
export default {
  username: "用户名",
  password: "密码",
};
```

- 创建文件：i18n/en.js

```javascript
export default {
  username: "username",
  password: "password",
};
```

- 创建文件：i18n/index.js

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh";
import en from "./en";

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "zh",
  lng: "zh",
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
```

##### 3. 在入口文件 index.js 中引用启用

```javascript
import "./i18n";
```

##### 4.使用

1. 类组件中使用：
   使用 withTranslation()高阶组价包裹容器组件。

```javascript
import { withTranslation } from "react-i18next";

class HomeLayout extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
  }
  render() {
    return <div>{this.t("username")}</div>;
  }
}

export default withTranslation()(HomeLayout);
```

2. 函数组件中使用：

```javascript
import { useTranslation } from 'react-i18next';

export default (props) => {
  const { t } = useTranslation();

  return {
    <div>{t('username')}</div>
  }
}
```

3. 切换语言
   i18n.language：获取当前环境语言
   i18n.changeLanguage()：切换语言

```javascript
import i18n from "i18next";

switchLang = () => {
  const lang = i18n.language;
  if (lang === "zh") {
    i18n.changeLanguage("en");
  } else {
    i18n.changeLanguage("zh");
  }
};
```

##### 5. Q&A

1. 
