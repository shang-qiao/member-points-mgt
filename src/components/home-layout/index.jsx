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
import styles from './index.module.scss';

export default class HomeLayout extends Component {
  constructor(props) {
    super(props);
    this.myRefs = React.createRef();
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
          <h1 className={styles.title}></h1>
          <div className={styles.nav_group}>
            <div>
              <Badge size='small' offset={[-15, -2]} count={5}>
                <BellOutlined />
              </Badge>
            </div>
            <div className={styles.question}>
              <QuestionCircleOutlined />
            </div>
            <span className={styles.line}></span>
            <Space direction='vertical'>
              <Dropdown
                menu={{
                  items,
                }}
                placement='bottom'
              >
                <div className={styles.info}>
                  <span className={styles.photo}></span>
                  <span className={styles.name}>{this.state.username}</span>
                </div>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Sider>
          <Menu
            ref={this.myRefs}
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['rules-setting']}
            selectedKeys={[location.pathname.slice(1)]}
            defaultOpenKeys={['points-get']}
            items={menuItems}
          />
        </Sider>
        <Layout className='site-layout'>
          <Header>
            <Crumbs />
          </Header>
          <Content>
            <div
              className='main'
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
    console.log(window.location.pathname.slice(1));
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
