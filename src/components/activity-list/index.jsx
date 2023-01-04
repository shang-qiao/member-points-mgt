import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Table, Tag, Space, Modal, message } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import { getActivityList, saveActivity } from '../../api/points-setting';
// import { TYPE_OPTIONS, STATUS_OPTIONS, PORT_OPTIONS } from '../constants/common';
import ActivityForm from '../activity-form';
import styles from './index.module.scss';
const ActivityList = (props, ref) => {
  const columns = [
    {
      title: '活动编号',
      dataIndex: 'no',
      width: '10%',
    },
    {
      title: '活动类型',
      dataIndex: 'activityType',
      width: '15%',
      render: (item) => {
        return item.label;
      },
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      width: '20%',
    },
    {
      title: '有效期',
      dataIndex: 'activityTime',
      width: '20%',
    },
    {
      title: '活动端口',
      dataIndex: 'activityPort',
      width: '10%',
      render: (item) => {
        return item.label;
      },
    },
    {
      title: '活动状态',
      dataIndex: 'activityStatus',
      width: '10%',
      render: (status) => {
        // 已上线：绿色1；未上线：蓝色2；已过期：红色0。
        let color;
        if (status.value === 'expired') {
          color = 'red';
        } else if (status.value === 'online') {
          color = 'green';
        } else {
          color = 'blue';
        }
        return <Tag color={color}>{status.label}</Tag>;
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      render: (_, item) => (
        <Space size='middle'>
          <a disabled>上线</a>
          <a
            onClick={() => {
              handleEdit(item);
            }}
          >
            编辑
          </a>
          <a onClick={handleDelete}>删除</a>
        </Space>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState(0);
  // 将子组件的方法暴露出去，给父组件使用
  useImperativeHandle(ref, () => {
    return {
      dataSource,
      setDataSource
    };
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // 提交表单
    formRef.current
      .validateFields()
      .then(async(value) => {
        const { activityTime, ...rest } = value;
        // 校验通过，调用新增接口，成功添加后关闭弹框
        const { data: res } = await saveActivity({
          activityTime:
            activityTime[0].$d.toLocaleString() +
            '-' +
            activityTime[1].$d.toLocaleString(),
          ...rest,
        });
        if (res.code === 200) {
          setIsModalOpen(false);
        }
        console.log('value', value.activityTime[0].$d.toLocaleString());
      })
      .catch(() => {
        message.warning('请完善信息');
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // 不加好像也会重置表单信息，及错误提示
    // formRef.current.resetFields();
  };
  const formRef = useRef();
  const ModalForm = forwardRef((props, ref) => {
    return <ActivityForm forwardRef={ref} />;
  });

  const addActivity = () => {
    showModal();
  };
  const handleDelete = () => {
    const modal = Modal.confirm();
    modal.update({
      title: '删除',
      content: '您确定要删除活动吗？',
      onOk: deleteActivity,
      okButtonProps: { danger: true },
    });
  };
  const deleteActivity = () => {
    console.log('delete ok');
    // 调删除接口
    // 删除成功后，关闭弹框
  };
  const handleEdit = (item) => {
    showModal();
    const { activityTime, ...rest } = item;
    setTimeout(() => {
      formRef.current.setFieldsValue({
        ...rest,
        activityTime: [
          dayjs(item.activityTime.split('-')[0].trim()),
          dayjs(item.activityTime.split('-')[1].trim()),
        ],
      });
    }, 0);
  };

  const getAcitvList = async() => {
    props.changeLoading(true);
    const { data: res } = await getActivityList();
    props.changeLoading(false);
    if (res.code === 200) {
      if (res.data.length > 0) {
        console.log(res.data);
        // setDataSource(res.data);
        setDataSource((prev) => {
          // console.log('prev', prev);
          return res.data;
        });
      }
    }
  };

  useEffect(() => {
    // 获取表格数据
    getAcitvList();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h3>活动列表</h3>
        <div className={styles.add_activ} onClick={addActivity}>
          <FileAddOutlined />
          <div className={styles.label}>添加活动</div>
        </div>
      </header>
      <main>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 50,
            showTotal: () => '共' + dataSource.length + '条',
          }}
          scroll={{
            y: 258,
          }}
        />
        <Modal
          forceRender={true}
          className={styles.add_activ_modal}
          maskClosable={false}
          // destroyOnClose={true}
          width={560}
          title='添加活动'
          okText='确定'
          cancelText='取消'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ModalForm ref={formRef} />
        </Modal>
      </main>
      <footer></footer>
    </div>
  );
};

export default forwardRef(ActivityList);