import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import styles from './index.module.scss';

const { RangePicker } = DatePicker;

export default (props) => {
  const [form] = Form.useForm();
  const portOptions = [
    {
      label: 'App端',
      value: 'app',
    },
    {
      label: '小程序端',
      value: 'miniProgram',
    },
    {
      label: 'PC端',
      value: 'pc',
    },
  ];
  const typeOptions = [
    {
      label: '注册',
      value: 'register',
    },
    {
      label: '完善个人信息',
      value: 'completeInfo',
    },
    {
      label: '首次签到',
      value: 'firstSign',
    },
  ];
  const statusOptions = [
    {
      label: '已上线',
      value: 'online',
    },
    {
      label: '未上线',
      value: 'offline',
    },
    {
      label: '已过期',
      value: 'expired',
    },
  ];
  const onGenderChange = (value) => {
    // switch (value) {
    //   case 'male':
    //     form.setFieldsValue({
    //       note: 'Hi, man!',
    //     });
    //     return;
    //   case 'female':
    //     form.setFieldsValue({
    //       note: 'Hi, lady!',
    //     });
    //     return;
    //   case 'other':
    //     form.setFieldsValue({
    //       note: 'Hi there!',
    //     });
    //     break;
    //   default:
    // }
  };

  return (
    <Form
      ref={props.forwardRef}
      className='search_condition'
      layout='inline'
      form={form}
      name='control-hooks'
    >
      <Form.Item
        colon={false}
        name='activityName'
        label='活动名称'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityTime'
        label='活动时间'
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ]}
      >
        <RangePicker format='YYYY/MM/DD' />
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityStatus'
        label='活动状态'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder='请选择活动状态'
          onChange={onGenderChange}
          allowClear
          options={statusOptions}
        >
        </Select>
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityPort'
        label='活动端口'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder='请选择活动端口'
          onChange={onGenderChange}
          allowClear
          options={portOptions}
        ></Select>
      </Form.Item>
      <Form.Item
        colon={false}
        name='activityType'
        label='活动类型'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder='请选择活动类型'
          onChange={onGenderChange}
          allowClear
          options={typeOptions}
        >
        </Select>
      </Form.Item>

      {props.slot}
    </Form>
  );
};
