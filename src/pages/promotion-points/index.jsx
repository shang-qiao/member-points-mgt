import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Tabs } from 'antd';

class PromotionPoints extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleChange = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div>
        <Tabs
          size='large'
          defaultActiveKey='1'
          onChange={this.handleChange}
          items={[
            {
              label: 'Tab 11',
              key: '11',
              children: 'Content of Tab Pane 1',
            },
            {
              label: 'Tab 22',
              key: '2',
              children: 'Content of Tab Pane 2',
            },
            {
              label: 'Tab 33',
              key: '3',
              children: 'Content of Tab Pane 3',
            },
          ]}
        />
      </div>

    );
  }
}
export default PromotionPoints;

// function mapStateToProps(state) {
//   return {
//     username: state.username
//   };
// }

// export default connect(mapStateToProps)(PromotionPoints);