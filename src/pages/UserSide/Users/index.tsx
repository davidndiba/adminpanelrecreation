
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Row,
  Space,
  Statistic,
  Tag,
  Popconfirm,
  Tooltip,
  Typography,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  LoginOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { request, useRequest } from 'umi';
import './Users.less'; 

const { Title, Text } = Typography;

interface User {
  id: string;
  username: string;
  full_name: string;
  contact: string;
  email: string;
  role: string;
  last_login: string;
}

const Users: React.FC = () => {
  const addUserRef = useRef<any>();
  const tableActionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [totalLogins, setTotalLogins] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<User | undefined>(undefined);
  const { data: statuses } = useRequest(() => request('/statuses'));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await request('/users');
        if (response?.success) {
          const statistics = response.data?.statistics;
          setTotalUsers(statistics?.total_users ?? 0);
          setActiveUsers(statistics?.user_counts_by_status?.Active ?? 0);
          setInactiveUsers(
            (statistics?.user_counts_by_status?.Deactivated ?? 0) +
              (statistics?.user_counts_by_status?.Deleted ?? 0)
          );
          setTotalLogins(
            response.data?.data?.reduce((acc, user) => acc + (user.login_count || 0), 0)
          );
        } else {
          message.error('Failed to retrieve users statistics.');
        }
      } catch (error) {
        message.error('Failed to fetch statistics');
      }
    };
    fetchStats();
  }, []);

  const handleRowSelection = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleSearch = () => {
    tableActionRef.current?.reload();
  };

  const handleEdit = async (user: User) => {
    const response = await request(`/users/${user.id}`);
    const userData = response?.data;
    addUserRef.current?.setFieldsValue({
      ...user,
      status: { key: user.status.name },
    });
    setFormValues(user);
    setVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await request(`/users/${userId}`, { method: 'DELETE' });
      message.success('User deleted successfully');
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns: ProColumns<User>[] = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (_, record) => (
        <Text strong>{record.username}</Text>
      ),
    },
    {
      title: 'Full Names',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record) => (
        <>
          <div>Email: {record.email}</div>
          <div>Phone: {record.contact}</div>
        </>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Last Login',
      dataIndex: 'last_login',
      key: 'last_login',
      sorter: true,
      render: (text: any) => moment(text).format('DD-MMM-YYYY HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              type="link"
              className="edit-btn"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger className="delete-btn" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-page">
      <Row gutter={[16, 16]} className="user-stats">
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#e6f7ff' }}>
            <Title level={4}>Total Users</Title>
            <Statistic
              value={totalUsers}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#f6ffed' }}>
            <Title level={4}>Active Users</Title>
            <Statistic
              value={activeUsers}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#fff7e6' }}>
            <Title level={4}>Inactive Users</Title>
            <Statistic
              value={inactiveUsers}
              prefix={<UserOutlined style={{ color: '#fa8c16' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#fffbe6' }}>
            <Title level={4}>Total Logins</Title>
            <Statistic
              value={totalLogins}
              prefix={<LoginOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="search-bar">
        <Col span={24}>
          <Input.Search
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === '') handleSearch();
            }}
            onSearch={handleSearch}
            style={{ width: 300, marginBottom: '16px' }}
            allowClear
          />
        </Col>
      </Row>

      <div className="user-actions">
        <ModalForm
          formRef={addUserRef}
          title={formValues ? 'Edit User' : 'Add New User'}
          visible={visible}
          onVisibleChange={setVisible}
          onFinish={async (values) => {
            try {
              if (formValues?.id) {
                await request(`/users/${formValues.id}`, {
                  method: 'PUT',
                  data: values,
                });
                message.success('User updated successfully');
              } else {
                await request('/auth/admin/register', {
                  method: 'POST',
                  data: values,
                });
                message.success('User added successfully');
              }
              addUserRef.current?.resetFields();
              setVisible(false);
              tableActionRef.current?.reload();
            } catch (error) {
              message.error('Failed to save user');
            }
          }}
        >
          <ProFormText
            name="username"
            label="User Name"
            placeholder="Enter user name"
            rules={[{ required: true, message: 'User Name is required' }]}
          />
          <ProFormText
            name="full_name"
            label="Full Names"
            placeholder="Enter full names"
            rules={[{ required: true, message: 'Full Names are required' }]}
          />
          <ProFormText
            name="contact"
            label="Contact"
            placeholder="Enter contact number"
          />
          <ProFormText
            name="email"
            label="Email"
            placeholder="Enter email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
          <ProFormText
            name="role"
            label="Role"
            placeholder="Enter role"
            rules={[{ required: true, message: 'Role is required' }]}
          />
        </ModalForm>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFormValues(undefined);
            setVisible(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <ProTable<User>
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelection,
        }}
        actionRef={tableActionRef}
        columns={columns}
        request={async (params) => {
          const response = await request('/users', {
            params: {
              page: params.current,
              limit: params.pageSize,
              search: searchTerm,
            },
          });
          return {
            data: response.data.data,
            success: response.success,
            total: response.data.total,
          };
        }}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
        toolBarRender={false}
        options={false}
        dateFormatter="string"
      />
    </div>
  );
};

export default Users;
