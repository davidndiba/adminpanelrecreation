// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1';

// // Define types for user data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   // Add other fields as needed
// }
// const Users: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [form] = Form.useForm();

//     // Fetch users
//     const fetchUsers = async () => {
//       try {
//         const response = await request(`/users`);
//         setUsers(response.data.data);
//       } catch (error) {
//         message.error('Failed to fetch users');
//       }
//     };

//     useEffect(() => {
//       fetchUsers();
//     }, []);

//     // Add user
//     const handleAddUser = async (values: any) => {
//       try {
//         await request(`/auth/register`, {
//           method: 'POST',
//           data: {
//             email: values.email,
//             display_name: values.display_name,
//             username: values.username,
//             password: values.password,
//             password_confirmation: values.password_confirmation,
//           },
//         });
//         message.success('User added successfully');
//         fetchUsers();
//         setIsModalVisible(false);
//       } catch (error) {
//         message.error('Failed to add user');
//       }
//     };

//     // Edit user
//     const handleEditUser = async (id: string, values: any) => {
//       try {
//         await request(`/users/${id}`, {
//           method: 'PUT',
//           data: {
//             display_name: values.display_name,
//             email: values.email,
//             username: values.username,
//           },
//         });
//         message.success('User updated successfully');
//         fetchUsers();
//         setSelectedUser(null);
//       } catch (error) {
//         message.error('Failed to update user');
//       }
//     };

//     // Delete user
//     const handleDeleteUser = async (id: string) => {
//       try {
//         await request(`/users/${id}`, {
//           method: 'DELETE',
//         });
//         message.success('User deleted successfully');
//         fetchUsers();
//       } catch (error) {
//         message.error('Failed to delete user');
//       }
//     };

//     // Handle modal submit
//     const handleOk = () => {
//       form
//         .validateFields()
//         .then(values => {
//           if (isEditing) {
//             handleEditUser(selectedUser!.id, values);
//           } else {
//             handleAddUser(values);
//           }
//         })
//         .catch(info => {
//           console.log('Validate Failed:', info);
//         });
//     };

//     // Handle modal cancel
//     const handleCancel = () => {
//       setIsModalVisible(false);
//       form.resetFields();
//     };

//     const columns: ProColumns<User>[] = [
//       { title: 'Name', dataIndex: 'display_name', key: 'display_name' },
//       { title: 'Email', dataIndex: 'email', key: 'email' },
//       { title: 'Timezone', dataIndex: 'timezone', key: 'timezone' },
//       { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' },
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => {
//                 setIsEditing(true);
//                 setSelectedUser(record);
//                 form.setFieldsValue(record);
//                 setIsModalVisible(true);
//               }}
//             />
//             <Popconfirm
//               title="Are you sure you want to delete this user?"
//               onConfirm={() => handleDeleteUser(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} />
//             </Popconfirm>
//           </Space>
//         ),
//       },
//     ];

//     return (
//       <div>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setIsEditing(false);
//             setSelectedUser(null);
//             form.resetFields();
//             setIsModalVisible(true);
//           }}
//         >
//           Add User
//         </Button>
//         <ProTable<User>
//           columns={columns}
//           dataSource={users}
//           rowKey="id"
//           onRow={(record) => ({
//             onClick: () => {
//               setSelectedUser(record);
//             },
//           })}
//         />
//         {selectedUser && (
//           <div style={{ marginTop: 16 }}>
//             <h2>Selected User</h2>
//             <p><strong>Name:</strong> {selectedUser.display_name}</p>
//             <p><strong>Email:</strong> {selectedUser.email}</p>
//             {/* Display more details as needed */}
//           </div>
//         )}
//         <Modal
//           title={isEditing ? 'Edit User' : 'Add User'}
//           visible={isModalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           destroyOnClose
//         >
//           <Form form={form} layout="vertical">
//             <Form.Item
//               name="display_name"
//               label="Name"
//               rules={[{ required: true, message: 'Please enter the name!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: 'Please enter the email!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true, message: 'Please enter the username!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true, message: 'Please enter the password!' }]}
//             >
//               <Input.Password />
//             </Form.Item>
//             <Form.Item
//               name="password_confirmation"
//               label="Confirm Password"
//               dependencies={['password']}
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please confirm your password!',
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('The two passwords that you entered do not match!'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     );
//   };

//   export default Users;

// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1';

// // Define types for user data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string; // Add ip_address field
//   status: string; // Add status field
// }

// const Users: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [form] = Form.useForm();

//     // Fetch users
//     const fetchUsers = async () => {
//       try {
//         const response = await request(`/users`);
//         setUsers(response.data.data);
//       } catch (error) {
//         message.error('Failed to fetch users');
//       }
//     };

//     useEffect(() => {
//       fetchUsers();
//     }, []);

//     // Get IP Address
//     const getIpAddress = async () => {
//       try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         return data.ip;
//       } catch (error) {
//         message.error('Failed to get IP address');
//         return '';
//       }
//     };

//     // Add user
//     const handleAddUser = async (values: any) => {
//       const ipAddress = await getIpAddress(); // Get IP address

//       try {
//         await request(`/auth/register`, {
//           method: 'POST',
//           data: {
//             email: values.email,
//             display_name: values.display_name,
//             username: values.username,
//             password: values.password,
//             password_confirmation: values.password_confirmation,
//             ip_address: ipAddress, // Add IP address
//             status: 'Active', // Set status to Active by default
//           },
//         });
//         message.success('User added successfully');
//         fetchUsers();
//         setIsModalVisible(false);
//       } catch (error) {
//         message.error('Failed to add user');
//       }
//     };

//     // Edit user
//     const handleEditUser = async (id: string, values: any) => {
//       try {
//         await request(`/users/${id}`, {
//           method: 'PUT',
//           data: {
//             display_name: values.display_name,
//             email: values.email,
//             username: values.username,
//             ip_address: values.ip_address, // Add IP address
//           },
//         });
//         message.success('User updated successfully');
//         fetchUsers();
//         setSelectedUser(null);
//       } catch (error) {
//         message.error('Failed to update user');
//       }
//     };

//     // Delete user
//     const handleDeleteUser = async (id: string) => {
//       try {
//         await request(`/users/${id}`, {
//           method: 'DELETE',
//         });
//         message.success('User deleted successfully');
//         fetchUsers();
//       } catch (error) {
//         message.error('Failed to delete user');
//       }
//     };

//     // Handle modal submit
//     const handleOk = () => {
//       form
//         .validateFields()
//         .then(values => {
//           if (isEditing) {
//             handleEditUser(selectedUser!.id, values);
//           } else {
//             handleAddUser(values);
//           }
//         })
//         .catch(info => {
//           console.log('Validate Failed:', info);
//         });
//     };

//     // Handle modal cancel
//     const handleCancel = () => {
//       setIsModalVisible(false);
//       form.resetFields();
//     };

//     const columns: ProColumns<User>[] = [
//       { title: 'Name', dataIndex: 'display_name', key: 'display_name' },
//       { title: 'Email', dataIndex: 'email', key: 'email' },
//       { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' }, // Add IP Address
//       { title: 'Status', dataIndex: 'status', key: 'status' }, // Add Status
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => {
//                 setIsEditing(true);
//                 setSelectedUser(record);
//                 form.setFieldsValue(record);
//                 setIsModalVisible(true);
//               }}
//             />
//             <Popconfirm
//               title="Are you sure you want to delete this user?"
//               onConfirm={() => handleDeleteUser(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} />
//             </Popconfirm>
//           </Space>
//         ),
//       },
//     ];

//     return (
//       <div>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setIsEditing(false);
//             setSelectedUser(null);
//             form.resetFields();
//             setIsModalVisible(true);
//           }}
//         >
//           Add User
//         </Button>
//         <ProTable<User>
//           columns={columns}
//           dataSource={users}
//           rowKey="id"
//           onRow={(record) => ({
//             onClick: () => {
//               setSelectedUser(record);
//             },
//           })}
//         />
//         {selectedUser && (
//           <div style={{ marginTop: 16 }}>
//             <h2>Selected User</h2>
//             <p><strong>Name:</strong> {selectedUser.display_name}</p>
//             <p><strong>Email:</strong> {selectedUser.email}</p>
//             <p><strong>IP Address:</strong> {selectedUser.ip_address}</p>
//             <p><strong>Status:</strong> {selectedUser.status}</p>
//             {/* Display more details as needed */}
//           </div>
//         )}
//         <Modal
//           title={isEditing ? 'Edit User' : 'Add User'}
//           visible={isModalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           destroyOnClose
//         >
//           <Form form={form} layout="vertical">
//             <Form.Item
//               name="display_name"
//               label="Name"
//               rules={[{ required: true, message: 'Please enter the name!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: 'Please enter the email!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true, message: 'Please enter the username!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true, message: 'Please enter the password!' }]}
//             >
//               <Input.Password />
//             </Form.Item>
//             <Form.Item
//               name="password_confirmation"
//               label="Confirm Password"
//               dependencies={['password']}
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please confirm your password!',
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('The two passwords that you entered do not match!'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>
//             {/* IP Address is handled automatically and status is set to Active by default */}
//           </Form>
//         </Modal>
//       </div>
//     );
// };

// export default Users;
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

const { Title } = Typography;

// Define types for user data
interface User {
  id: string;
  display_name: string;
  email: string;
  ip_address: string; // Add ip_address field
  status: string; // Add status field
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await request(`/users`);
      setUsers(response.data.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get IP Address
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      message.error('Failed to get IP address');
      return '';
    }
  };

  // Add user
  const handleAddUser = async (values: any) => {
    const ipAddress = await getIpAddress(); // Get IP address

    try {
      await request(`/auth/register`, {
        method: 'POST',
        data: {
          email: values.email,
          display_name: values.display_name,
          username: values.username,
          password: values.password,
          password_confirmation: values.password_confirmation,
          ip_address: ipAddress, // Add IP address
          status: 'Active', // Set status to Active by default
        },
      });
      message.success('User added successfully');
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to add user');
    }
  };

  // Edit user
  const handleEditUser = async (id: string, values: any) => {
    try {
      await request(`/users/${id}`, {
        method: 'PUT',
        data: {
          display_name: values.display_name,
          email: values.email,
          username: values.username,
          ip_address: values.ip_address, // Add IP address
        },
      });
      message.success('User updated successfully');
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      message.error('Failed to update user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id: string) => {
    try {
      await request(`/users/${id}`, {
        method: 'DELETE',
      });
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  // Handle modal submit
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditing) {
          handleEditUser(selectedUser!.id, values);
        } else {
          handleAddUser(values);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === 'Active').length;
    const inactiveUsers = users.filter(
      (user) => user.status === 'Inactive',
    ).length;
    const pendingUsers = users.filter(
      (user) => user.status === 'Pending',
    ).length;
    return { totalUsers, activeUsers, inactiveUsers, pendingUsers };
  };

  const stats = calculateStats();

  const columns: ProColumns<User>[] = [
    { title: 'Name', dataIndex: 'display_name', key: 'display_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' }, // Add IP Address
    { title: 'Status', dataIndex: 'status', key: 'status' }, // Add Status
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditing(true);
              setSelectedUser(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Total Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.totalUsers}
            </div>
            <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Active Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.activeUsers}
            </div>
            <CheckCircleOutlined
              style={{ fontSize: '36px', color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Inactive Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.inactiveUsers}
            </div>
            <PauseCircleOutlined
              style={{ fontSize: '36px', color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Pending Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.pendingUsers}
            </div>
            <ClockCircleOutlined
              style={{ fontSize: '36px', color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setIsEditing(false);
          setSelectedUser(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add User
      </Button>
      <ProTable<User>
        search={false}
        columns={columns}
        request={async () => {
          const resp = await request(`/users`);
          return {
            data: resp?.data?.data,
            total: resp?.meta?.total,
          };
        }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            setSelectedUser(record);
          },
        })}
      />
      {selectedUser && (
        <div style={{ marginTop: 16 }}>
          <h2>Selected User</h2>
          <p>
            <strong>Name:</strong> {selectedUser.display_name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>IP Address:</strong> {selectedUser.ip_address}
          </p>
          <p>
            <strong>Status:</strong> {selectedUser.status}
          </p>
          {/* Display more details as needed */}
        </div>
      )}
      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="display_name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* IP Address is handled automatically and status is set to Active by default */}
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
