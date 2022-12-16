import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import { login } from '../../api/user';

export default class Login extends Component {

  onFinish = async(values) => {
    // 调用登录接口
    const { data: res } = await login(values);
    // const res = login(values).data;
    if (res.code === 200) {
      // 登录成功，跳转页面
      message.success('登录成功！');
      // token存入localstorage
      localStorage.setItem('token', res.token);
      window.location.href = '/';
    } else {
      message.error('用户名或密码输入错误，请重试！');
    }
  };

  render() {
    return (
      <div className='container'>
        <div className='form'>
          <h1 className='title'>会员积分管理系统</h1>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={ this.onFinish }
          >
            <Form.Item
              hasFeedback
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
            </Form.Item>
            <Form.Item
              hasFeedback
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
  
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };

  componentDidMount() { 
    // [question]函数式组件中好像用不了cmd?
    // [question]useNavigate,useLocation好像只能在函数式组件中使用?
    console.log('cmd');
    if (localStorage.getItem('token')) {
      // 已经登录，跳转首页
      window.location.href = '/';
    }
  };
}


