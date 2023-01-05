import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { login } from '../../api/user';
import { t } from 'i18next';

export default class Login extends Component {
  onFinish = async(values) => {
    // 调用登录接口
    const { data: res } = await login(values);
    if (res.code === 200) {
      // 登录成功，跳转页面
      message.success(t('loginSuccessTip'));
      // token存入localstorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', values.username);
      window.location.href = '/';
    } else {
      message.error(t('loginFailedTip'));
    }
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
    // [question]函数式组件中好像用不了cmd?
    // [question]useNavigate,useLocation好像只能在函数式组件中使用?
    if (localStorage.getItem('token')) {
      // 已经登录，跳转首页
      window.location.href = '/';
    }
  }
}
