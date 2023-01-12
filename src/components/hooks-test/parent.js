import { Button } from 'antd';
import React, { Component } from 'react';
import Children from './children';

export default class parent extends Component {
  constructor(props) {
    console.log('[parent]constructor');
    super(props);
    this.state = {
      count: 0
    };
  }

  changeCount = () => {
    this.setState({
      count: 666
    });
  };
    
  static getDerivedStateFromProps(props, state) {
    // 让组件在 props 变化时更新 state。（相当于是拦截器）
    // 该方法返回一个对象用于更新 state，如果返回 null 则不更新任何内容。
    console.log('[parent]getDerivedStateFromProps');
    // return { count: 888 };
    return null;
  }
    
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[parent]shouldComponentUpdate');
    return true;
    // return false;
  }
    
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 可以访问更新前的 props 和 state，
    console.log('[parent]getSnapshotBeforeUpdate');
    // A snapshot value (or null) must be returned. You have returned undefined ?
    // 不返回会报错
    return null;
  }
    
  componentDidUpdate() {
    console.log('[parent]componentDidUpdate');
  }

  componentDidMount() {
    console.log('[parent]componentDidMount');
  }
    
  componentWillUnmount() {
    console.log('[parent]componentWillUnmount');
  }

  render() {
    console.log('[parent]render');
    return (
      <div>
        <h1>{this.state.count}</h1>
        <Button type='primary' onClick={this.changeCount}>改变state</Button>
        <hr/>
        <Children count={this.state.count} />
      </div>
    );
  }
}
