import React, { Component } from 'react';
import { connect } from 'react-redux';

class PromotionPoints extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <div>promotion-points</div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username
  };
}

export default connect(mapStateToProps)(PromotionPoints);