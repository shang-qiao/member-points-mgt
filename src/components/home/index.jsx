import React, { Component } from 'react';
import {
  BarChartOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space, Badge } from 'antd';
import Crumbs from '../breadcrumb';
// import PubSub from 'pubsub-js';
import './index.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.myRefs = React.createRef();
    // this.state = {
    //   currentRoute: 'rules-setting',
    // };
    this.state = {
      username: localStorage.getItem('username'),
    };
  }

  logout = () => {
    // 清除token
    localStorage.removeItem('token');
    // 跳转登录界面
    location.href = '/';
  };

  render() {
    const { Header, Content, Sider } = Layout;

    const items = [
      {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.antgroup.com'
          >
            个人中心
          </a>
        ),
      },
      {
        key: '2',
        icon: React.createElement(LogoutOutlined),
        label: (
          <a rel='noopener noreferrer' onClick={this.logout}>
            退出
          </a>
        ),
      },
    ];

    const menuItems = [
      {
        key: 'rules-setting',
        icon: React.createElement(VideoCameraOutlined),
        label: <Link to='/rules-setting'>规则设置</Link>,
      },
      {
        key: 'points-get',
        icon: React.createElement(BarChartOutlined),
        label: '积分设置',
        children: [
          {
            key: 'points-get/activity-points',
            label: <Link to='/points-get/activity-points'>活动积分</Link>,
          },
          {
            key: 'points-get/promotion-points',
            label: <Link to='/points-get/promotion-points'>促销积分</Link>,
          },
        ],
      },
    ];

    return (
      <Layout hasSider>
        <Header className='outer-header'>
          <h1 className='title'></h1>
          <div className='nav-group'>
            <div className='msg'>
              <Badge size='small' offset={[-15, -2]} count={5}>
                <BellOutlined />
              </Badge>
            </div>
            <div className='question'>
              <QuestionCircleOutlined />
            </div>
            <span className='line'></span>
            <Space direction='vertical'>
              <Dropdown
                menu={{
                  items,
                }}
                placement='bottom'
              >
                <div className='info'>
                  <span className='photo'></span>
                  <span className='name'>{this.state.username}</span>
                </div>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: 62,
            backgroundColor: '#323A52',
          }}
        >
          <Menu
            ref={this.myRefs}
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['rules-setting']}
            defaultOpenKeys={['points-get']}
            items={menuItems}
          />
        </Sider>
        <Layout className='site-layout'>
          <Header
            style={{
              padding: 20,
              background: '#fff',
            }}
          >
            <Crumbs />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              overflow: 'initial',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: '#fff',
                height: '100%',
              }}
            >
              {this.props.childElement}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  componentDidMount = () => {
    // todo:如何使用useLocation()?
    // question:菜单改变路由，路由变化驱动面包屑改变；面包屑改变，驱动菜单回显。死循环？
    // 刷新页面后，根据路由地址回显菜单选项
    // console.log(window.location.pathname.slice(1));
    // this.setState({
    //   currentRoute: window.location.pathname.slice(1),
    // });
    // 点击面包屑，更改路由后，更新菜单选项
    // PubSub.subscribe('updateSelectedKey', (msg, key) => {
    //   this.setState({
    //     currentRoute: key,
    //   });
    // });
  };
}
