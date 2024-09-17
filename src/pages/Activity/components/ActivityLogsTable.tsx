
import React, { useState, useEffect } from 'react';
import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Form, Pagination, Tooltip, Spin } from 'antd';
import { request } from 'umi';
import { format } from 'date-fns';
import './ActivityLogs.less';

interface LogData {
  key: number; 
  user: string;
  description: string;
  module: string;
  ip_address: string;
  updated_at: string;
}

const ActivityLogs = () => {
  const [data, setData] = useState<LogData[]>([]);
  const [selectedRows, setSelectedRows] = useState<LogData[]>([]);
  const [filters, setFilters] = useState({
    user: '',
    start_date: '',
    end_date: '',
    module: '',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch users for filtering
    const fetchUsers = async () => {
      try {
        const response = await request('/users');
        const userOptions = response.data.data.map(user => ({
          value: user.display_name || user.username, // Use display_name or username
          label: user.display_name || user.username, // Display the user name
        }));
        setUsers(userOptions);
      } catch (error) {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch modules for filtering
    const fetchModules = async () => {
      try {
        const response = await request('/modules');
        const moduleOptions = response.data.map(module => ({
          value: module,
          label: module,
        }));
        setModules(moduleOptions);
      } catch (error) {
        message.error('Failed to fetch modules');
      }
    };

    fetchModules();
  }, []);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const { start_date, end_date, user, module } = filters;
      console.log('Start Date:', start_date);
      console.log('End Date:', end_date);
      console.log('Filters for API request:', { start_date, end_date, user, module });
      const response = await request('/audits', {
        params: {
          page,
          per_page: pagination.pageSize,
          start_date: start_date || undefined,
          end_date: end_date || undefined,
          user: user || undefined, 
          module: module || undefined,
        },
      });

      if (response.data && response.data.data) {
        const mappedData = response.data.data.map((log, id) => ({
          key: log.id,
          user: log.user,
          description: log.description,
          module: log.module,
          ip_address: log.ip_address,
          updated_at: log.auditable_record.updated_at,
        }));

        setData(mappedData);
        setPagination({
          ...pagination,
          current: page,
          total: response.data.total,
        });
      } else {
        message.error('No data found');
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current);
  }, [filters, pagination.current]);

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      message.error('No logs selected for bulk deletion');
      return;
    }
  
    try {
      await request('/audits', {
        method: 'DELETE',
        params: {
          start_date: filters.start_date,
          end_date: filters.end_date,
          user: filters.user,
          module: filters.module,
        },
        data: {
          logs: selectedRows.map(row => row.key),
        },
      });
      message.success('Selected logs deleted successfully');
      fetchData(pagination.current); // Reload the table data
      setSelectedRows([]);
    } catch (error) {
      message.error('Failed to delete selected logs');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length !== 1) {
      message.error('Please select exactly one log to delete');
      return;
    }
  
    const logId = selectedRows[0].key;
  
    try {
      await request(`/audits/${logId}`, {
        method: 'DELETE',
      });
      message.success('Log deleted successfully');
      fetchData(pagination.current); 
      setSelectedRows([]);
    } catch (error) {
      message.error('Failed to delete the log');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <div className="description-cell">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text: string) => (
        <span className="date-cell">{format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}</span>
      ),
    },
  ];

  useEffect(() => {
    console.log('Filters:', filters);
    console.log('Users:', users);
    console.log('Filters before fetching data:', filters);
    console.log('Pagination:', pagination);
    fetchData(pagination.current);
  }, [filters, pagination.current]);

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    console.log('Changed Values:', changedValues);
    console.log('All Values:', allValues);

    const { dateRange } = allValues;
    let startDate = '';
    let endDate = '';

    if (dateRange && dateRange.length === 2) {
      startDate = format(dateRange[0].toDate(), 'yyyy-MM-dd');
      endDate = format(dateRange[1].toDate(), 'yyyy-MM-dd');
      if (new Date(startDate) > new Date(endDate)) {
        message.error('Start date must be earlier than end date');
        return;
      }
    }

    const newFilters = {
      ...filters,
      user: allValues.user || '',
      module: allValues.module || '',
      start_date: startDate,
      end_date: endDate,
    };
    console.log('New Filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
        onValuesChange={handleFormValuesChange}
      >
        <Form.Item name="user" label="User">
          <ProFormSelect
            options={[{ value: '', label: 'All Users' }, ...users]}
          />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <ProFormDateRangePicker
            format="YYYY-MM-DD"
            onChange={(dates: any) => {
              console.log('Date Range Changed:', dates);
            }}
          />
        </Form.Item>
        <Form.Item name="module" label="Module">
          <ProFormSelect
            options={[{ value: '', label: 'All Modules' }, ...modules]}
          />
        </Form.Item>
      </Form>

      <div style={{ marginBottom: 16 }}>
        <Popconfirm
          title="Are you sure you want to delete the selected logs?"
          onConfirm={handleBulkDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" disabled={selectedRows.length === 0}>
            Bulk Delete
          </Button>
        </Popconfirm>
        <Button
          type="danger"
          style={{ marginLeft: 8 }}
          disabled={selectedRows.length !== 1}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <ProTable
          columns={columns}
          dataSource={data}
          search={false}
          rowKey="key"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRows(selectedRows as LogData[]);
            },
          }}
          pagination={false}
        />
      )}

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page) => setPagination({ ...pagination, current: page })}
        style={{ marginTop: 16 }}
      />
    </>
  );
};

export default ActivityLogs;
