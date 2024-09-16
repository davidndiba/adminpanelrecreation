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
  Divider,
  Input,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { history, request, useRequest } from 'umi';

const { Title } = Typography;

interface User {
  id: string;
  display_name: string;
  email: string;
  ip_address: string;
  status: { name: string };
  roles: string[];
  last_login: string;
  login_count: number;
  created_at: string;
}

const Users: React.FC = () => {
  const addUserRef = React.useRef<any>(),
    { data: statuses } = useRequest(() => request('/statuses')),
    tableActionRef = React.useRef<ActionType>(),
    [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]),
    [searchTerm, setSearchTerm] = useState<string>(''),
    handleRowSelection = (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
    columns: ProColumns<User>[] = [
      // {
      //   title: 'Select',
      //   dataIndex: 'select',
      //   key: 'select',
      //   render: (_, record) => (
      //     <input
      //       type="checkbox"
      //       checked={selectedRowKeys.includes(record.id)}
      //       onChange={(e) => {
      //         if (e.target.checked) {
      //           setSelectedRowKeys([...selectedRowKeys, record.id]);
      //         } else {
      //           setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
      //         }
      //       }}
      //     />
      //   ),
      // },
      {
        title: 'Display Name',
        dataIndex: 'display_name',
        key: 'display_name',
      },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
      {
        title: 'Status',
        dataIndex: ['status', 'name'],
        key: 'status',
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        render: (r: any) => r?.join(', '),
      },
      {
        title: 'Last Login',
        dataIndex: 'last_login',
        key: 'last_login',
        render: (text: any) => moment(text).format('ll'),
      },
      { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: any) => moment(text).format('ll'),
      },
    ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff' }}>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Total Users</Title>
            {/* <div style={{ fontSize: '24px' }}>{users?.length}</div> */}
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <Input
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
        </Col>
      </Row>
      <ProTable<User>
        columns={columns}
        actionRef={tableActionRef}
        rowKey="id"
        headerTitle={
          <ModalForm
            formRef={addUserRef}
            title="Add User"
            onFinish={async (values) => {
              await request('/auth/admin/register', {
                method: 'POST',
                data: values,
              });
              message.success('User added successfully');
              addUserRef?.current?.resetFields?.();
              return true;
            }}
            trigger={<Button type="primary">Add User</Button>}
          >
            <ProFormText
              label="Display Name"
              name="display_name"
              rules={[{ required: true }]}
            />
            <ProFormText
              label="Email"
              name="email"
              rules={[
                { required: true },
                { type: 'email', message: 'Invalid email address' },
              ]}
            />
            <ProFormText label="Phone Number" name="phone" />
            <ProFormText
              label="Username"
              name="username"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              request={async () => {
                const resp = await request('/roles');
                return resp?.data ?? [];
              }}
              fieldProps={{
                fieldNames: {
                  label: 'name',
                  value: 'id',
                },
              }}
              label="Role"
              name="role"
              rules={[{ required: true }]}
            />
          </ModalForm>
        }
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          hideOnSinglePage: true,
        }}
        search={false}
        request={async () => {
          const resp = await request('/users');
          return {
            data: resp?.data?.data,
            total: resp?.data?.total,
            success: true,
          };
        }}
        footer={() => (
          <>
            <Space split={<Divider type="vertical" />}>
              {statuses?.map((status: any) => (
                <Button
                  size="small"
                  key={status.id}
                  onClick={async () => {
                    console.log(selectedRowKeys);
                    selectedRowKeys?.forEach(async (id) => {
                      await request(`/users/${id}`, {
                        method: 'PUT',
                        data: { status: status.id },
                      });
                      tableActionRef?.current?.reload?.();
                      message.success(`User status updated to ${status.name}`);
                    });
                  }}
                  disabled={selectedRowKeys.length === 0}
                >
                  {status.name}
                </Button>
              ))}
            </Space>
          </>
        )}
        onRow={(record) => ({
          onClick: () => {
            history.push(`/users/${record?.id}`);
          },
        })}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelection,
        }}
      />
    </div>
  );
};

export default Users;
