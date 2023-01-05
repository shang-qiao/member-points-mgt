import React, { useRef, forwardRef, useState } from 'react';
import { Form, Button, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ActivityForm from '../../../components/activity-form';
import ActivityList from '../../../components/activity-list';
import styles from './index.module.scss';

export default () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const searchAndResetBtn = (
    <Form.Item>
      <Button
        className={styles.search_btn}
        onClick={() => handleSearch()}
        type='primary'
        htmlType='submit'
      >
        {t('search')}
      </Button>
      <Button onClick={() => handleReset()} htmlType='button'>
        {t('reset')}
      </Button>
    </Form.Item>
  );
  const formRef = useRef();
  const myRef = useRef();
  // 将子组件ref暴露出去，在父组件上绑定ref获取子组件内绑定的ref
  // 【坑】ref必须挂载到dom元素而非react组件，否则获取不到dom
  const SearchCondition = forwardRef((props, ref) => (
    <ActivityForm slot={searchAndResetBtn} forwardRef={ref} />
  ));

  const filterDataSource = (datasource, condition) => {
    console.log(datasource);
    const {
      activityName,
      activityPort,
      activityStatus,
      activityType,
      activityTime,
    } = condition;
    return datasource.filter((item) => {
      return (
        item.activityName.indexOf(activityName) > 0 ||
        item.activityPort.value === activityPort ||
        item.activityStatus.value === activityStatus ||
        item.activityType.value === activityType ||
        (dayjs(item.activityTime.split('-')[0].trim()).isAfter(
          activityTime[0].$d.toLocaleString()
        ) &&
          dayjs(item.activityTime.split('-')[1].trim()).isBefore(
            activityTime[1].$d.toLocaleString()
          ))
      );
    });
  };

  const handleSearch = () => {
    // 拿到过滤条件，过滤数据
    const datasource = myRef.current.dataSource;
    formRef.current
      .validateFields()
      .then((value) => {
        // 检验通过
        // 一般数据量大的时候，掉后台接口过滤，同时分页
        // antd table 有前台过滤功能吗？
        console.log('value', value);
        const result = filterDataSource(datasource, value);
        myRef.current.setDataSource(result);
      })
      .catch(() => {
        message.warning(t('acitvityPoint.activityCompleteInfo'));
      });
  };
  const handleReset = () => {
    console.log('reset');
    formRef.current.resetFields();
    // 调查询接口，查询最新数据，更新table
    console.log(myRef.current.dataSource);
    myRef.current.setDataSource(myRef.current.dataSource);
  };
  const handleLoadingChange = (isShow) => {
    setIsLoading(isShow);
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <SearchCondition ref={formRef} />
        <ActivityList onLoadingChange={handleLoadingChange} ref={myRef} />
      </Spin>
    </div>
  );
};
