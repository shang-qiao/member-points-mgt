import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import styles from './index.module.scss';

const { RangePicker } = DatePicker;

export default (props) => {
  const [form] = Form.useForm();
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
  const onFinish = (values) => {
    console.log('onFinish', values);
  };

  return (
    <Form
      ref={props.forwardRef}
      className='search_condition'
      layout='inline'
      form={form}
      name='control-hooks'
      onFinish={onFinish}
    >
      <Form.Item
        colon={false}
        name='activity-name'
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
        name='activity-time'
        label='活动时间'
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item
        colon={false}
        name='activity-status'
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
        >
          <Select.Option value='online'>已上线</Select.Option>
          <Select.Option value='offline'>未上线</Select.Option>
          <Select.Option value='expired'>已过期</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        colon={false}
        name='activity-port'
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
        >
          <Select.Option value='pc'>PC端</Select.Option>
          <Select.Option value='app'>APP端</Select.Option>
          <Select.Option value='mini-program'>小程序端</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        colon={false}
        name='activity-type'
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
        >
          <Select.Option value='male'>注册</Select.Option>
          <Select.Option value='female'>完善个人信息</Select.Option>
          <Select.Option value='aa'>首次签到</Select.Option>
        </Select>
      </Form.Item>

      {props.slot}

    </Form>
  );
};
