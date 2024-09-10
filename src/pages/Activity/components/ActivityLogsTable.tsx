// import React from 'react';
// import { ProTable, ProFormSelect } from '@ant-design/pro-components';

// const ActivityLogs = () => {
//   // Define the columns for the table
//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//     },
//     {
//       title: 'Timestamp',
//       dataIndex: 'timestamp',
//     },
//   ];

//   // Mock data
//   const data = [
//     { user: 'John Doe', action: 'Login', timestamp: '2024-09-06 12:00' },
//     { user: 'Jane Smith', action: 'Logout', timestamp: '2024-09-06 12:30' },
//     // Add more data here
//   ];

//   return (
//     <>
//       {/* Filters */}
//       <ProFormSelect
//         name="user"
//         label="Filter by User"
//         options={[
//           { value: 'John Doe', label: 'John Doe' },
//           { value: 'Jane Smith', label: 'Jane Smith' },
//         ]}
//       />
//       {/* Activity Logs Table */}
//       <ProTable columns={columns} dataSource={data} rowKey="timestamp" />
//     </>
//   );
// };

// export default ActivityLogs;
import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    start_date: '',
    end_date: '',
    module: '',
  });
  const [form] = Form.useForm();

  // Fetch activity logs data with filters
  const fetchData = async () => {
    try {
      const response = await request('/audits', {
        params: filters,
      });

      // Log the response to debug
      console.log('API response:', response);

      // Ensure response data is an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        message.error('Invalid data format received');
      }
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await request('/audits', {
        method: 'DELETE',
        params: {
          start_date: filters.start_date,
          end_date: filters.end_date,
          name: selectedRows.map((row) => row.user).join(','),
          module: filters.module,
        },
      });
      message.success('Selected logs deleted successfully');
      fetchData(); // Refresh data
      setSelectedRows([]); // Clear selected rows
    } catch (error) {
      message.error('Failed to delete logs');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
  ];

  return (
    <>
      {/* Filters Form */}
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
        onFinish={(values) => {
          setFilters({
            ...values,
            start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
            end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
          });
        }}
      >
        <Form.Item name="user" label="User">
          <ProFormSelect
            options={[
              { value: '', label: 'All Users' },
              // Add more user options dynamically if needed
            ]}
          />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <ProFormDateRangePicker />
        </Form.Item>
        <Form.Item name="module" label="Module">
          <ProFormSelect
            options={[
              { value: '', label: 'All Modules' },
              // Add more module options dynamically if needed
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
        </Form.Item>
      </Form>

      {/* Bulk Delete Button */}
      <Popconfirm
        title="Are you sure you want to delete selected logs?"
        onConfirm={handleBulkDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          disabled={selectedRows.length === 0}
        >
          Bulk Delete
        </Button>
      </Popconfirm>

      {/* Activity Logs Table */}
      <ProTable
        columns={columns}
        dataSource={data}
        rowKey="id" // Ensure this matches your data's unique key
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) =>
            setSelectedRows(selectedRows),
        }}
      />
    </>
  );
};

export default ActivityLogs;
