import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import { login } from '../../api/user';
import { useNavigate } from 'react-router';
export default () => {
  // [router-v6]:useNaviage的Hook只能在函数式组件中调用
  const navigate = useNavigate();

  const onFinish = async(values) => {
    // 调用登录接口
    const { data: res} = await login(values);
    if (res.code === 200) {
      // 登录成功，跳转页面
      message.success('登录成功！');
      navigate('/');
    } else {
      message.success('登录失败！');
    }
  };

  return (
    <div className='container'>
      <div className='form'>
        <h1 className='title'>会员积分管理系统</h1>
        {/* <div className='title'>Log in</div> */}
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={ onFinish }
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

