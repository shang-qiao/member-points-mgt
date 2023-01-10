// import { connect } from 'react-redux';
// import { setUsername } from '../../store/actions/user';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export default (props) => {
  const location = useLocation();
  const [ searchParams ] = useSearchParams();
  const params = useParams();
  useEffect(()=>{
    // useNaviagte()('/points-get/promotion-points', { state: { name: 'shangqiao' } })
    console.log('location', location.state);

    // navigate('/points-get/promotion-points?name=shangqiao&age=20');
    // console.log('searchParams', searchParams.getAll('name'));

    // navigate('/points-get/promotion-points/shangqiao');
    // console.log('params', params);

    console.log(props);
  }, []);

  const handleChange = (e) => {
    console.log(e);
  };


  return (
    <div>
      <Tabs
        size='large'
        defaultActiveKey='1'
        onChange={handleChange}
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
  
};

// function mapStateToProps(state) {
//   return {
//     username: state.username
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     setUsername(username) {
//       dispatch(setUsername(username));
//     }
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PromotionPoints);

// connect 现在是接受参数mapStateToProps/mapDispatchToProps，然后返回⼀个函数，这个返回的函数才是高阶组件。
// 它会接受⼀个组件作为参数，然后⽤connect把组件包装以后再返回。
