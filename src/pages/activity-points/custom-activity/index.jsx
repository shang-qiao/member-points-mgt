import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

export default (props)  =>{
  // 页面跳转
  const navigate = useNavigate();
  const jumpPage = () => {
    console.log(props);
    navigate('/points-get/promotion-points', { state: { name: 'shangqiao' } });
    // navigate('/points-get/promotion-points?name=shangqiao&age=20');
    // navigate('/points-get/promotion-points/shangqiao');
  };

  return (
    <>
      <Button type='primary' onClick={jumpPage}>跳转促销积分</Button>
      {/* <NavLink to='/rules-setting'>跳转页面</NavLink> */}
    </>
  );
};
