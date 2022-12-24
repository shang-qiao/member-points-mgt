import React from 'react';
import { Table, Tag, Space, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './index.module.scss';
export default () => {
  const columns = [
    {
      title: '活动编号',
      dataIndex: 'no',
      width: '10%',
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      width: '15%',
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: '有效期',
      dataIndex: 'expireTime',
      width: '20%',
    },
    {
      title: '活动端口',
      dataIndex: 'device',
      width: '10%',
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      width: '10%',
      render: (status) => {
        // 已上线：绿色1；未上线：蓝色2；已过期：红色0。
        let color;
        if (status === '已过期') {
          color = 'red';
        } else if (status === '已上线') {
          color = 'green';
        } else {
          color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      render: () => (
        <Space size='middle'>
          <a disabled>上线</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      no: i,
      type: 'aaa',
      expireTime: '2022:10:10 - 2022:12:12',
      device: 'app',
      status: '已上线',
      address: `London, Park Lane no. ${i}`,
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  const addActivity = () => {
    showModal();
  };

  return (
    <div>
      <header className={styles.header}>
        <h3>活动列表</h3>
        <div className={styles.add_activ}>
          <FileAddOutlined />
          <div className={styles.label} onClick={addActivity}>添加活动</div>
        </div>
      </header>
      <main>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 50,
            showTotal: () => '共' + data.length + '条'
          }}
          scroll={{
            y: 240,
          }}
        />
        <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </main>
      <footer></footer>
    </div>
  );
};
