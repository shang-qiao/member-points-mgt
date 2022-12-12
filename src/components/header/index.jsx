import React, { Component } from 'react';
import './index.scss';

export default class Header extends Component {
  render() {
    return (
      <header className='nav'>
        <div className='nav-row'>
          <h1 className='title'></h1>
          <div className='nav-group'>
            <span className='bell'></span>
            <span className='question'></span>
            <span className='line'></span>
            <span className='photo'></span>
            <span className='name'>佚 名</span>
            <span className='down'></span>
          </div>
        </div>
      </header>
    );
  }
  componentDidMount() {

  }
}
