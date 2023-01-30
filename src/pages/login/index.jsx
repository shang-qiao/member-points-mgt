import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { getPubKey ,login } from '../../api/user';
import { t } from 'i18next';
import { encrypt } from '../../utils/rsaEncrypt';

export default class Login extends Component {
  onFinish = async(values) => {
    // 1. 获取公钥
    const publicKey = await this.getPublicKey();
    // 2. 对密码进行RSA非对称加密，保证敏感信息在传输过程中不被泄露
    const encryptPwd = encrypt(publicKey, values.password);
    const loginInfo = { username: values.username, password: encryptPwd };
    // 3. 调用登录接口，传输加密密码
    const { data: res } = await login(loginInfo);
    if (res.code === 200) {
      // 登录成功，跳转页面
      message.success(t('loginSuccessTip'));
      // token存入localstorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', values.username);
      // 跳转主页
      window.location.href = '/';
    } else {
      message.error(t('loginFailedTip'));
    }
  };

  getPublicKey = async() => {
    const { data: res } = await getPubKey();
    return res.data.publicKey;
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <h1 className={styles.title}>{t('MemberPointsMgtSystem')}</h1>
          <Form
            name='normal_login'
            className={styles.login_form}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              hasFeedback
              name='username'
              rules={[
                {
                  required: true,
                  message: t('enterUsernameTip'),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder={t('username')}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name='password'
              rules={[
                {
                  required: true,
                  message: t('enterPasswordTip'),
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder={t('password')}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                {t('login')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // [question]函数式组件中好像用不了cmd? √
    // [question]useNavigate,useLocation好像只能在函数式组件中使用? √
    if (localStorage.getItem('token')) {
      // 已经登录，跳转首页
      window.location.href = '/';
    }
  }
}
