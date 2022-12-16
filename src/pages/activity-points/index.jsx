import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../../store/actions/user';

class ActivityPoints extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <div>activity-points</div>
      </div>
    );
  }
  componentDidMount() { 
    this.props.setUsername('ShangQiao');
    console.log(this.props);
  }
}



function mapStateToProps(state) {
  return {
    username: state.username
  };
}
function mapDispatchToProps(dispatch) {
  return{
    setUsername: (username) => dispatch(setUsername(username))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPoints);