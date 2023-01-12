import React, { Component } from 'react';

export default class children extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    // 让组件在 props 变化时更新 state。（相当于是拦截器）
    // 该方法返回一个对象用于更新 state，如果返回 null 则不更新任何内容。
    console.log('[children]getDerivedStateFromProps');
    // return { count: 888 };
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[children]shouldComponentUpdate');
    console.log(this.props.count, nextProps);
    // 父组件穿的props的值没有变化时，不用重新渲染子组件
    if (this.props.count === nextProps.count) {
      return false;
    }
    return true;
  }
    
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 可以访问更新前的 props 和 state，
    console.log('[children]getSnapshotBeforeUpdate');
    // A snapshot value (or null) must be returned. You have returned undefined ?
    // 不返回会报错
    return null;
  }

  componentDidUpdate() {
    console.log('[children]componentDidUpdate');
  }

  componentDidMount() {
    console.log('[children]componentDidMount');
  }
    
  componentWillUnmount() {
    console.log('[children]componentWillUnmount');
  }

  render() {
    console.log('[children]render');
    return (
      <div>
        <h1>子组件</h1>
        <h2>{this.props.count}</h2>
      </div>
    );
  }
}
