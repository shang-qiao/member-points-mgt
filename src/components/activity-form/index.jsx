import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

export default (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const portOptions = [
    {
      label: t('acitvityPoint.app'),
      value: 'app',
    },
    {
      label: t('acitvityPoint.miniProgram'),
      value: 'miniProgram',
    },
    {
      label: t('acitvityPoint.pc'),
      value: 'pc',
    },
  ];
  const typeOptions = [
    {
      label: t('acitvityPoint.register'),
      value: 'register',
    },
    {
      label: t('acitvityPoint.completeInfo'),
      value: 'completeInfo',
    },
    {
      label: t('acitvityPoint.firstSign'),
      value: 'firstSign',
    },
  ];
  const statusOptions = [
    {
      label: t('acitvityPoint.online'),
      value: 'online',
    },
    {
      label: t('acitvityPoint.offline'),
      value: 'offline',
    },
    {
      label: t('acitvityPoint.expired'),
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
        label={t('acitvityPoint.activityName')}
        rules={[
          {
            required: true,
            message: t('acitvityPoint.inputActivityName'),
          },
        ]}
      >
        <Input placeholder={t('acitvityPoint.inputActivityName')} />
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityTime'
        label={t('acitvityPoint.activityTime')}
        rules={[
          {
            type: 'array',
            required: true,
            message: t('acitvityPoint.selectActivityTime'),
          },
        ]}
      >
        <RangePicker format='YYYY/MM/DD' />
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityStatus'
        label={t('acitvityPoint.activityStatus')}
        rules={[
          {
            required: true,
            message: t('acitvityPoint.selectActivityStatus'),
          },
        ]}
      >
        <Select
          placeholder={t('acitvityPoint.selectActivityStatus')}
          onChange={onGenderChange}
          allowClear
          options={statusOptions}
        ></Select>
      </Form.Item>

      <Form.Item
        colon={false}
        name='activityPort'
        label={t('acitvityPoint.activityPort')}
        rules={[
          {
            required: true,
            message: t('acitvityPoint.selectActivityPort'),
          },
        ]}
      >
        <Select
          placeholder={t('acitvityPoint.selectActivityPort')}
          onChange={onGenderChange}
          allowClear
          options={portOptions}
        ></Select>
      </Form.Item>
      <Form.Item
        colon={false}
        name='activityType'
        label={t('acitvityPoint.activityType')}
        rules={[
          {
            required: true,
            message: t('acitvityPoint.selectActivityType'),
          },
        ]}
      >
        <Select
          placeholder={t('acitvityPoint.selectActivityType')}
          onChange={onGenderChange}
          allowClear
          options={typeOptions}
        ></Select>
      </Form.Item>
      {props.slot}
    </Form>
  );
};
