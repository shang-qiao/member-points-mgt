import React from 'react';
import { Tabs } from 'antd';
import RoutineActivity from './routine-activity';
import CustomActivity from './custom-activity';
import styles from './index.module.scss';

export default function index() {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs
        className='activ-tabs'
        onChange={onChange}
        defaultActiveKey='1'
        items={[
          {
            label: '常规活动',
            key: '1',
            children: <RoutineActivity />,
          },
          {
            label: '自定义活动1',
            key: '2',
            children: <CustomActivity />,
          }
        ]}
      />;
    </div>
  );
}

// class ActivityPoints extends Component {

//   constructor(props) {
//     super(props);
//     console.log(props);
//   }

//   render() {
//     return (
//       <div>
//         <div>activity-points</div>
//       </div>
//     );
//   }
//   componentDidMount() { 
//     this.props.setUsername('ShangQiao');
//     console.log(this.props);
//   }
// }



// function mapStateToProps(state) {
//   return {
//     username: state.username
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return{
//     setUsername: (username) => dispatch(setUsername(username))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ActivityPoints);