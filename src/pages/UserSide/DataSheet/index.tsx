import React from 'react';
import {  Table } from 'antd';
import { PageHeader } from '@ant-design/pro-components';

const DataSheet: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
   
  ];

  return (
    <div>
      <PageHeader title="Data Sheet" subTitle="Manage and view data" />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DataSheet;
