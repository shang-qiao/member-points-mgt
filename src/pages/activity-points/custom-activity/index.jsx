import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { useAsync } from '../../../hooks/useAsync';
import { getActivityList } from '../../../api/points-setting';

export default (props) => {
  // 页面跳转
  const navigate = useNavigate();
  const {
    execute: getActivity,
    data,
    loading,
    error,
  } = useAsync(getActivityList);

  const jumpPage = () => {
    console.log(props);
    navigate('/points-get/promotion-points', { state: { name: 'shangqiao' } });
    // navigate('/points-get/promotion-points?name=shangqiao&age=20');
    // navigate('/points-get/promotion-points/shangqiao');
  };
  const getData = () => {
    getActivity();
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <Button type='primary' onClick={jumpPage}>
          跳转促销积分
        </Button>
        <Button type='primary' onClick={getData}>
          获取数据
        </Button>
        <hr />
        { JSON.stringify(data) }
        {/* <NavLink to='/rules-setting'>跳转页面</NavLink> */}
      </Spin>
    </>
  );
};
