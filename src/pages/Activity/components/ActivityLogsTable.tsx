import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Form,
  message,
  Pagination,
  Popconfirm,
  Spin,
  Tooltip,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import './ActivityLogs.less'; // Custom styles

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
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
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await request('/users');
        setUsers(
          response.data.map((user: any) => ({
            value: user.id,
            label: user.name,
          })),
        );
      } catch (error) {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Fetch activity logs data with filters and pagination
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      console.log('Fetching data with filters:', filters, 'and page:', page); // Debugging
      const response = await request('/audits', {
        params: {
          ...filters,
          page,
          per_page: pagination.pageSize,
        },
      });

      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        const mappedData = response.data.data.map((log: any, index: any) => ({
          key: index,
          user: log.user,
          description: log.description,
          module: log.module,
          ip_address: log.ip_address,
          updated_at: log.auditable_record.updated_at,
          auditable_id: log?.auditable_id,
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

  // Handle bulk delete using the filters
  const handleBulkDelete = async () => {
    try {
      const { start_date, end_date, user, module } = filters;
      await request('/audits', {
        method: 'DELETE',
        params: {
          start_date,
          end_date,
          user,
          module,
        },
      });
      message.success('Logs deleted successfully based on filters');
      fetchData(pagination.current);
    } catch (error) {
      message.error('Failed to delete logs');
    }
  };

  // Handle selected row deletion
  const handleSelectedDelete = async () => {
    if (!selectedRow) {
      message.error('No log selected for deletion');
      return;
    }

    try {
      await request(`/audits/${selectedRow?.auditable_id}`, {
        method: 'DELETE',
      });
      message.success('Selected log deleted successfully');
      setSelectedRow(null); // Clear selected row
      fetchData(pagination.current); // Refresh the table data
    } catch (error) {
      message.error('Failed to delete selected log');
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
      render: (text: any) => (
        <Tooltip title={text} placement="topLeft">
          <div className="description-cell">{text}</div>
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
      renderText: (t: any) => moment(t).format('ll'),
    },
  ];

  return (
    <>
      {/* Filters Form */}
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
        onValuesChange={(changedValues) => {
          const newFilters = {
            ...filters,
            ...changedValues,
            start_date:
              changedValues.dateRange?.[0]?.format('YYYY-MM-DD') ||
              filters.start_date,
            end_date:
              changedValues.dateRange?.[1]?.format('YYYY-MM-DD') ||
              filters.end_date,
          };
          console.log('Filters updated:', newFilters);
          setFilters(newFilters);
        }}
      >
        <Form.Item name="user" label="User">
          <ProFormSelect
            options={[{ value: '', label: 'All Users' }, ...users]}
          />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <ProFormDateRangePicker fieldProps={{ format: 'YYYY-MM-DD' }} />
        </Form.Item>
        <Form.Item name="module" label="Module">
          <ProFormSelect
            options={[
              { value: '', label: 'All Modules' },
              // Add actual module options here
            ]}
          />
        </Form.Item>
      </Form>

      {/* Bulk Delete and Single Delete Buttons */}
      <div style={{ marginBottom: 16 }}>
        <Popconfirm
          title="Are you sure you want to delete logs based on filters?"
          onConfirm={handleBulkDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            style={{ marginRight: 16 }}
            disabled={!filters.start_date && !filters.end_date}
          >
            Delete Logs Based on Filters
          </Button>
        </Popconfirm>

        <Popconfirm
          title="Are you sure you want to delete the selected log?"
          onConfirm={handleSelectedDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" disabled={!selectedRow}>
            Delete Selected Log
          </Button>
        </Popconfirm>
      </div>

      {/* Activity Logs Table */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <ProTable
          columns={columns}
          dataSource={data}
          search={false}
          rowKey="key"
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRow(selectedRows[0] || null);
            },
            selectedRowKeys: selectedRow ? [selectedRow?.key] : [],
          }}
          pagination={false}
          bordered
        />
      )}

      {/* Pagination Controls */}
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page) => {
          setPagination({
            ...pagination,
            current: page,
          });
          fetchData(page); // Fetch new page data
        }}
        showSizeChanger={false}
        pageSizeOptions={[15]}
        hideOnSinglePage
      />
    </>
  );
};

export default ActivityLogs;
