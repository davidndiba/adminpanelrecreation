// import {
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   PauseCircleOutlined,
//   PlusOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { ProColumns, ProTable } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Row,
//   Space,
//   Typography,
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;
// const dateStr = '2024-09-04T13:20:23.000000Z';
// const formattedDate = moment(dateStr).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
// console.log(formattedDate);
// // Define types for user data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string; // Add ip_address field
//   status: string; // Add status field
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request(`/users`);
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Get IP Address
//   const getIpAddress = async () => {
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       return data.ip;
//     } catch (error) {
//       message.error('Failed to get IP address');
//       return '';
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     const ipAddress = await getIpAddress(); // Get IP address

//     try {
//       await request(`/auth/register`, {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name,
//           username: values.username,
//           password: values.password,
//           password_confirmation: values.password_confirmation,
//           ip_address: ipAddress, // Add IP address
//           status: 'Active', // Set status to Active by default
//         },
//       });
//       message.success('User added successfully');
//       fetchUsers();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add user');
//     }
//   };

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           username: values.username,
//           ip_address: values.ip_address, // Add IP address
//         },
//       });
//       message.success('User updated successfully');
//       fetchUsers();
//       setSelectedUser(null);
//     } catch (error) {
//       message.error('Failed to update user');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id: string) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       message.error('Failed to delete user');
//     }
//   };

//   // Handle modal submit
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (isEditing) {
//           handleEditUser(selectedUser!.id, values);
//         } else {
//           handleAddUser(values);
//         }
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   // Handle modal cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalUsers = users.length;
//     const activeUsers = users.filter((user) => user.status === 'Active').length;
//     const inactiveUsers = users.filter(
//       (user) => user.status === 'Inactive',
//     ).length;
//     const pendingUsers = users.filter(
//       (user) => user.status === 'Pending',
//     ).length;
//     return { totalUsers, activeUsers, inactiveUsers, pendingUsers };
//   };

//   const stats = calculateStats();

//   const columns: ProColumns<User>[] = [
//     { title: 'Name', dataIndex: 'firstname', key: 'firstname' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     { title: 'Status', dataIndex: 'status', key: 'status' },
//     { title: 'Role', dataIndex: 'roles', key: 'roles' },
//     {
//       title: 'Created At',
//       dataIndex: 'created_at',
//       key: 'created_at',
//       render: (text: string) => {
//         return moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
//       },
//     },
//     // { title: 'Role', dataIndex: 'roles', key: 'roles' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedUser(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this user?"
//             onConfirm={() => handleDeleteUser(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.totalUsers}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.activeUsers}
//             </div>
//             <CheckCircleOutlined
//               style={{ fontSize: '36px', color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Inactive Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.inactiveUsers}
//             </div>
//             <PauseCircleOutlined
//               style={{ fontSize: '36px', color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.pendingUsers}
//             </div>
//             <ClockCircleOutlined
//               style={{ fontSize: '36px', color: '#ff4d4f' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedUser(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//       >
//         Add User
//       </Button>
//       <ProTable<User>
//         search={false}
//         columns={columns}
//         request={async () => {
//           const resp = await request(`/users`);
//           return {
//             data: resp?.data?.data,
//             total: resp?.meta?.total,
//           };
//         }}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => {
//             setSelectedUser(record);
//           },
//         })}
//       />
//       {selectedUser && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected User</h2>
//           <p>
//             <strong>Name:</strong> {selectedUser.display_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedUser.email}
//           </p>
//           <p>
//             <strong>IP Address:</strong> {selectedUser.ip_address}
//           </p>
//           <p>
//             <strong>Status:</strong> {selectedUser.status}
//           </p>
//           {/* Display more details as needed */}
//         </div>
//       )}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="display_name"
//             label="Name"
//             rules={[{ required: true, message: 'Please enter the name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please enter the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please enter the username!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter the password!' }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item
//             name="password_confirmation"
//             label="Confirm Password"
//             dependencies={['password']}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please confirm your password!',
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error(
//                       'The two passwords that you entered do not match!',
//                     ),
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           {/* IP Address is handled automatically and status is set to Active by default */}
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
// import {
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   PauseCircleOutlined,
//   PlusOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { ProColumns, ProTable } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Row,
//   Space,
//   Typography,
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;
// const dateStr = '2024-09-04T13:20:23.000000Z';
// const formattedDate = moment(dateStr).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
// console.log(formattedDate);

// // Define types for user data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: {
//     name: string;
//   };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request(`/users`);
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Get IP Address
//   const getIpAddress = async () => {
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       return data.ip;
//     } catch (error) {
//       message.error('Failed to get IP address');
//       return '';
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     const ipAddress = await getIpAddress(); // Get IP address

//     try {
//       await request(`/auth/register`, {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name,
//           username: values.username,
//           password: values.password,
//           password_confirmation: values.password_confirmation,
//           ip_address: ipAddress, // Add IP address
//           status: 'Active', // Set status to Active by default
//         },
//       });
//       message.success('User added successfully');
//       fetchUsers();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add user');
//     }
//   };

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           username: values.username,
//           ip_address: values.ip_address,
//           // Any other fields you want to update
//         },
//       });
//       message.success('User updated successfully');
//       fetchUsers();
//       setSelectedUser(null);
//       setIsModalVisible(false); // Close modal after successful update
//     } catch (error) {
//       message.error('Failed to update user');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id: string) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       message.error('Failed to delete user');
//     }
//   };

//   // Handle modal submit
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (isEditing) {
//           handleEditUser(selectedUser!.id, values);
//         } else {
//           handleAddUser(values);
//         }
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   // Handle modal cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalUsers = users.length;
//     const activeUsers = users.filter((user) => user.status.name === 'Active').length;
//     const inactiveUsers = users.filter(
//       (user) => user.status.name === 'Inactive',
//     ).length;
//     const pendingUsers = users.filter(
//       (user) => user.status.name === 'Pending',
//     ).length;
//     return { totalUsers, activeUsers, inactiveUsers, pendingUsers };
//   };

//   const stats = calculateStats();

//   const columns: ProColumns<User>[] = [
//     // { title: 'Name', dataIndex: 'display_name', key: 'display_name' },
//     {
//       title: 'Name',
//       dataIndex: 'first_name',
//       key: 'name',
//       render: (_, record) => `${record?.firstname} ${record?.lastname}`,
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => text?.name },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles?.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedUser(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this user?"
//             onConfirm={() => handleDeleteUser(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.totalUsers}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.activeUsers}
//             </div>
//             <CheckCircleOutlined
//               style={{ fontSize: '36px', color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Inactive Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.inactiveUsers}
//             </div>
//             <PauseCircleOutlined
//               style={{ fontSize: '36px', color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.pendingUsers}
//             </div>
//             <ClockCircleOutlined
//               style={{ fontSize: '36px', color: '#ff4d4f' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedUser(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//       >
//         Add User
//       </Button>
//       <ProTable<User>
//         search={false}
//         columns={columns}
//         request={async () => {
//           const resp = await request(`/users`);
//           return {
//             data: resp?.data?.data,
//             total: resp?.data?.total,
//           };
//         }}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => {
//             setSelectedUser(record);
//           },
//         })}
//       />
//       {selectedUser && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected User</h2>
//           <p>
//             <strong>Name:</strong> {selectedUser.display_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedUser.email}
//           </p>
//           <p>
//             <strong>IP Address:</strong> {selectedUser.ip_address}
//           </p>
//           <p>
//             <strong>Status:</strong> {selectedUser.status.name}
//           </p>
//           <p>
//             <strong>Role:</strong> {selectedUser.roles.join(', ')}
//           </p>
//           <p>
//             <strong>Last Login:</strong> {moment(selectedUser.last_login).format('MMMM Do, YYYY, h:mm:ss A [UTC]')}
//           </p>
//           <p>
//             <strong>Login Count:</strong> {selectedUser.login_count}
//           </p>
//         </div>
//       )}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="display_name"
//             label="Display Name"
//             rules={[{ required: true, message: 'Please enter the display name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please enter the email' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name="username" label="Username">
//             <Input />
//           </Form.Item>
//           <Form.Item name="password" label="Password">
//             <Input.Password />
//           </Form.Item>
//           <Form.Item name="password_confirmation" label="Confirm Password">
//             <Input.Password />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
// import {
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   PauseCircleOutlined,
//   PlusOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { ProColumns, ProTable } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Row,
//   Select,
//   Space,
//   Typography,
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;
// const dateStr = '2024-09-04T13:20:23.000000Z';
// const formattedDate = moment(dateStr).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
// console.log(formattedDate);

// // Define types for user data
// interface User {
//   id: string;
//   first_name: string | null;
//   last_name: string | null;
//   email: string;
//   ip_address: string;
//   status: {
//     name: string;
//   };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [statusOptions, setStatusOptions] = useState<string[]>(['Active', 'Inactive', 'Pending']);
//   const [roleOptions, setRoleOptions] = useState<string[]>(['Admin', 'User', 'Viewer']); // Example roles

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request(`/users`);
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     const ipAddress = await getIpAddress();
  
//     try {
//       await request(`/auth/register`, {
//         method: 'POST',
//         data: {
//           email: values.email,
//           firstname: values.firstname,
//           lastname: values.lastname,
//           username: values.username,
//           password: values.password,
//           password_confirmation: values.password_confirmation,
//           ip_address: ipAddress,
//           status: values.status || 'Active',
//           roles: values.roles || [],
//         },
//       });
//       message.success('User added successfully');
//       fetchUsers();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add user');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//  // Get IP Address
//  const getIpAddress = async () => {
//   try {
//     const response = await fetch('https://api.ipify.org?format=json');
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     message.error('Failed to get IP address');
//     return '';
//   }
// };
//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           first_name: values.first_name,
//           last_name: values.last_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
//           // Any other fields you want to update
//         },
//       });
//       message.success('User updated successfully');
//       fetchUsers();
//       setSelectedUser(null);
//       setIsModalVisible(false); // Close modal after successful update
//     } catch (error) {
//       message.error('Failed to update user');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id: string) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       message.error('Failed to delete user');
//     }
//   };

//   // Handle modal submit
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (isEditing) {
//           handleEditUser(selectedUser!.id, values);
//         } else {
//           handleAddUser(values);
//         }
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   const handleClick = (record: User) => {
//     setFormValues({
//       first_name: record.first_name,
//       last_name: record.last_name,
//       email: record.email,
//       status: record.status ? record.status.name : 'N/A', // Handle null case
//       roles: record.roles,
//     });
//     setIsModalVisible(true);
//   };
  

//   // Handle modal cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalUsers = users.length;

//     // Filter users based on status with null checks
//     const activeUsers = users.filter((user) => user.status?.name === 'Active').length;
//     const inactiveUsers = users.filter((user) => user.status?.name === 'Inactive').length;
//     const pendingUsers = users.filter((user) => user.status?.name === 'Pending').length;

//     return { totalUsers, activeUsers, inactiveUsers, pendingUsers };
//   };

//   const stats = calculateStats();

//   const columns: ProColumns<User>[] = [
//     // {
//     //          title: 'Name',
//     //          dataIndex: 'first_name',
//     //          key: 'name',
//     //          render: (_, record) => `${record?.firstname} ${record?.lastname}`,
//     //        },
//     {
//       title: 'Name',
//       dataIndex: 'firstname',
//       key: 'name',
//       render: (_, record) => {
//         const firstName = record?.firstname || '';
//         const lastName = record?.lastname || '';
//         const fullName = `${firstName} ${lastName}`.trim();
//         return fullName || 'N/A';
//       },
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     // { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => text.name },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status?.name : 'N/A',
//     },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedUser(record);
//               form.setFieldsValue({
//                 first_name: record.first_name,
//                 last_name: record.last_name,
//                 email: record.email,
//                 status: record.status.name,
//                 roles: record.roles,
//               });
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this user?"
//             onConfirm={() => handleDeleteUser(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.totalUsers}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.activeUsers}
//             </div>
//             <CheckCircleOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Inactive Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.inactiveUsers}
//             </div>
//             <PauseCircleOutlined style={{ fontSize: '36px', color: '#faad14' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.pendingUsers}
//             </div>
//             <ClockCircleOutlined style={{ fontSize: '36px', color: '#f5222d' }} />
//           </Card>
//         </Col>
//       </Row>

//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setIsModalVisible(true);
//           form.resetFields();
//         }}
//       >
//         Add User
//       </Button>

//       <ProTable<User>
//         columns={columns}
//         request={async () => {
//           const resp = await request(`/users`);
//           return {
//             data: resp.data.data,
//             success: true,
//           };
//         }}
//         rowKey="id"
//       />
//       {selectedUser && (
//         <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #d9d9d9', backgroundColor: '#fff' }}>
//           <Title level={4}>User Details</Title>
//           <p>
//             <strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedUser.email}
//           </p>
//           <p>
//             <strong>IP Address:</strong> {selectedUser.ip_address}
//           </p>
//           <p>
//             <strong>Status:</strong> {selectedUser.status.name}
//           </p>
//           <p>
//             <strong>Role:</strong> {selectedUser.roles.join(', ')}
//           </p>
//           <p>
//             <strong>Last Login:</strong> {moment(selectedUser.last_login).format('MMMM Do, YYYY, h:mm:ss A [UTC]')}
//           </p>
//           <p>
//             <strong>Login Count:</strong> {selectedUser.login_count}
//           </p>
//         </div>
//       )}
//       <Modal
//   title={isEditing ? 'Edit User' : 'Add User'}
//   visible={isModalVisible}
//   onOk={handleOk}
//   onCancel={handleCancel}
//   confirmLoading={loading} // Show loading spinner
// >
//   <Form form={form} layout="vertical">
//     {isEditing && selectedUser && (
//       <>
//         <Form.Item
//           name="status"
//           label="Status"
//           rules={[{ required: true, message: 'Please select a status' }]}
//         >
//           <Select>
//             {statusOptions.map((status) => (
//               <Select.Option key={status} value={status}>
//                 {status}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="roles"
//           label="Roles"
//           rules={[{ required: true, message: 'Please select at least one role' }]}
//         >
//           <Select mode="multiple">
//             {roleOptions.map((role) => (
//               <Select.Option key={role} value={role}>
//                 {role}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </>
//     )}
//     <Form.Item
//       name="first_name"
//       label="First Name"
//       rules={[{ required: true, message: 'Please enter the first name' }]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       name="last_name"
//       label="Last Name"
//       rules={[{ required: true, message: 'Please enter the last name' }]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       name="email"
//       label="Email"
//       rules={[{ required: true, message: 'Please enter the email' }]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item name="username" label="Username">
//       <Input />
//     </Form.Item>
//     <Form.Item name="password" label="Password">
//       <Input.Password />
//     </Form.Item>
//     <Form.Item name="password_confirmation" label="Confirm Password">
//       <Input.Password />
//     </Form.Item>
//   </Form>
// </Modal>
//     </div>
//   );
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
  Select,
  Space,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

const { Title } = Typography;
const dateStr = '2024-09-04T13:20:23.000000Z';
const formattedDate = moment(dateStr).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
console.log(formattedDate);



// Define types for user data
interface User {
  id: string;
  display_name: string; // Added display_name
  email: string;
  ip_address: string;
  status: {
    name: string;
  };
  roles: string[];
  last_login: string;
  login_count: number;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [statusOptions] = useState<string[]>(['Active', 'Inactive', 'Pending']);
  const [roleOptions, setRoleOptions] = useState<string[]>([]); // Initially empty

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await request(`/users`);
      setUsers(response.data.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await request(`/roles`);
      setRoleOptions(response.data.map((role: { name: string }) => role.name));
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  // Add user
  const handleAddUser = async (values: any) => {
    setLoading(true);
    const ipAddress = await getIpAddress();
  
    try {
      await request(`/auth/register`, {
        method: 'POST',
        data: {
          email: values.email,
          display_name: values.display_name, 
          username: values.username,
          password: values.password,
          password_confirmation: values.password_confirmation,
          ip_address: ipAddress,
          status: values.status || 'Active',
          roles: values.roles || [],
        },
      });
      message.success('User added successfully');
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };
  
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

  // Edit user
  const handleEditUser = async (id: string, values: any) => {
    try {
      await request(`/users/${id}`, {
        method: 'PUT',
        data: {
          display_name: values.display_name,
          email: values.email,
          status: values.status,
          roles: values.roles,
          // Any other fields you want to update
        },
      });
      message.success('User updated successfully');
      fetchUsers();
      setSelectedUser(null);
      setIsModalVisible(false); // Close modal after successful update
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

    // Filter users based on status with null checks
    const activeUsers = users.filter((user) => user.status?.name === 'Active').length;
    const inactiveUsers = users.filter((user) => user.status?.name === 'Inactive').length;
    const pendingUsers = users.filter((user) => user.status?.name === 'Pending').length;

    return { totalUsers, activeUsers, inactiveUsers, pendingUsers };
  };

  const stats = calculateStats();

  const columns: ProColumns<User>[] = [
    {
      title: 'Display Name',
      dataIndex: 'display_name', // Changed to display_name
      key: 'display_name',
      render: (text) => text || 'N/A',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => status ? status.name : 'N/A',
    },
    { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
    { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
    { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
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
              form.setFieldsValue({
                display_name: record.display_name, // Added display_name
                email: record.email,
                status: record.status.name,
                roles: record.roles,
                username: record.username, // Add username if you have it
              });
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
            <CheckCircleOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Inactive Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.inactiveUsers}
            </div>
            <PauseCircleOutlined style={{ fontSize: '36px', color: '#f5222d' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Pending Users</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {stats.pendingUsers}
            </div>
            <ClockCircleOutlined style={{ fontSize: '36px', color: '#faad14' }} />
          </Card>
        </Col>
      </Row>

      {/* Add User Button */}
      <Row style={{ marginBottom: '16px' }}>
        <Col span={24} style={{ textAlign: 'right' }}> {/* Changed to right */}
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
        </Col>
      </Row>

      {/* Users Table */}
      <ProTable<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        search={false}
      />

      {/* Modal Form */}
      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={800} // Adjust width if needed
      >
        <Form
          form={form}
          layout="vertical"
          name="user_form"
          initialValues={selectedUser || {}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Display Name"
                name="display_name"
                rules={[{ required: true, message: 'Please input the display name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input the username!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="roles"
                rules={[{ required: true, message: 'Please select the role!' }]}
              >
                <Select mode="multiple">
                  {roleOptions.map((role) => (
                    <Select.Option key={role} value={role}>
                      {role}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="password_confirmation"
                rules={[{ required: true, message: 'Please confirm the password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the email!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select the status!' }]}
              >
                <Select>
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
