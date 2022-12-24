import React, { useEffect, useRef, forwardRef } from 'react';
import { Form, Button } from 'antd';
import ActivityForm from '../../../components/activity-form';
import ActivityList from '../../../components/activity-list';
import styles from './index.module.scss';

export default () => {
  const searchAndResetBtn = (
    <Form.Item>
      <Button
        className={styles.search_btn}
        onClick={() => handleSearch()}
        type='primary'
        htmlType='submit'
      >
        搜索
      </Button>
      <Button onClick={() => handleReset()} htmlType='button'>
        重置
      </Button>
    </Form.Item>
  );
  const formRef = useRef();
  // 将子组件ref暴露出去，在父组件上绑定ref获取子组件内绑定的ref
  // 【坑】ref必须挂载到dom元素而非react组件，否则获取不到dom
  const Search = forwardRef((props, ref) => (
    <ActivityForm slot={searchAndResetBtn} forwardRef={ref} />
  ));

  // useEffect(() => {
  //   const el = formRef.current;
  //   console.log(el.getFieldsValue());
  // }, []);

  const handleSearch = () => {
    console.log('search');
    const formData = formRef.current.getFieldsValue();
    console.log(formData);
  };
  const handleReset = () => {
    console.log('reset');
    formRef.current.resetFields();
  };
  return (
    <div>
      <Search ref={formRef} />
      <ActivityList />
    </div>
  );
};
