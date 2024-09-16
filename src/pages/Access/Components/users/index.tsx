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
//   display_name: string; // Added display_name
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
//   const [statusOptions] = useState<string[]>(['Active', 'Inactive', 'Pending']);
//   const [roleOptions, setRoleOptions] = useState<string[]>([]); // Initially empty

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request(`/users`);
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Fetch roles
//   const fetchRoles = async () => {
//     try {
//       const response = await request(`/roles`);
//       setRoleOptions(response.data.map((role: { name: string }) => role.name));
//     } catch (error) {
//       message.error('Failed to fetch roles');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchRoles(); // Fetch roles when component mounts
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
//           display_name: values.display_name, 
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

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
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
//     {
//       title: 'Display Name',
//       dataIndex: 'display_name', // Changed to display_name
//       key: 'display_name',
//       render: (text) => text || 'N/A',
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status.name : 'N/A',
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
//                 display_name: record.display_name, // Added display_name
//                 email: record.email,
//                 status: record.status.name,
//                 roles: record.roles,
//                 username: record.username, // Add username if you have it
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
//             <PauseCircleOutlined style={{ fontSize: '36px', color: '#f5222d' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.pendingUsers}
//             </div>
//             <ClockCircleOutlined style={{ fontSize: '36px', color: '#faad14' }} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Add User Button */}
//       <Row style={{ marginBottom: '16px' }}>
//         <Col span={24} style={{ textAlign: 'right' }}> {/* Changed to right */}
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               setSelectedUser(null);
//               form.resetFields();
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>

//       {/* Users Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//         search={false}
//       />

//       {/* Modal Form */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//         width={800} // Adjust width if needed
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="user_form"
//           initialValues={selectedUser || {}}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Display Name"
//                 name="display_name"
//                 rules={[{ required: true, message: 'Please input the display name!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[{ required: true, message: 'Please input the username!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Role"
//                 name="roles"
//                 rules={[{ required: true, message: 'Please select the role!' }]}
//               >
//                 <Select mode="multiple">
//                   {roleOptions.map((role) => (
//                     <Select.Option key={role} value={role}>
//                       {role}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             {/* <Col span={12}>  */}
//               {/* <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[{ required: true, message: 'Please input the password!' }]}
//               >
//                 <Input.Password />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Confirm Password"
//                 name="password_confirmation"
//                 rules={[{ required: true, message: 'Please confirm the password!' }]}
//               >
//                 <Input.Password />
//               </Form.Item> */}
//             {/* </Col> */}
//             <Col span={12}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{ required: true, message: 'Please input the email!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Phone Number"
//                 name="phone_number"
//                 rules={[{ required: true, message: 'Please input the phone number!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Status"
//                 name="status"
//                 rules={[{ required: true, message: 'Please select the status!' }]}
//               >
//                 <Select>
//                   {statusOptions.map((status) => (
//                     <Select.Option key={status} value={status}>
//                       {status}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Form, Input, message, Modal, Popconfirm, Row, Select, Space, Typography } from 'antd';
// import { PlusOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import { ProColumns, ProTable } from '@ant-design/pro-components'; // Ensure ProTable is imported correctly
// import moment from 'moment';

// const { Title } = Typography;

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
//   created_at: string;
// }

// interface Status {
//   id: string;
//   name: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [statusOptions, setStatusOptions] = useState<Status[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Fetch statuses
//   const fetchStatuses = async () => {
//     try {
//       const response = await request('/statuses');
//       setStatusOptions(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch statuses');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchStatuses();
//   }, []);

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     try {
//       await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name,
//           username: values.username,
//           ip_address: '', 
//           status: 'Active', 
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

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
//         },
//       });
//       message.success('User updated successfully');
//       fetchUsers();
//       setSelectedUser(null);
//       setIsModalVisible(false);
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

//   // Handle status change
//   const handleStatusChange = async () => {
//     const selectedIds = selectedRowKeys as string[];
//     try {
//       for (const id of selectedIds) {
//         await request(`/users/${id}`, {
//           method: 'PATCH',
//           data: { status: form.getFieldValue('status') },
//         });
//       }
//       message.success('Statuses updated successfully');
//       fetchUsers();
//     } catch (error) {
//       message.error('Failed to update statuses');
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

//   // Columns for ProTable
//   const columns: ProColumns<User>[] = [
//     {
//       title: 'Select',
//       dataIndex: 'select',
//       key: 'select',
//       render: (_, record) => (
//         <Input.Checkbox
//           checked={selectedRowKeys.includes(record.id)}
//           onChange={(e) => {
//             const { checked } = e.target;
//             setSelectedRowKeys((prev) =>
//               checked
//                 ? [...prev, record.id]
//                 : prev.filter((key) => key !== record.id)
//             );
//           }}
//         />
//       ),
//     },
//     { title: 'Display Name', dataIndex: 'display_name', key: 'display_name' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => status?.name || 'N/A' },
//     { title: 'Roles', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
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
//                 display_name: record.display_name,
//                 email: record.email,
//                 status: record.status.name,
//                 roles: record.roles,
//                 username: record.username,
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
//               {users.length}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Add User Button */}
//       <Row style={{ marginBottom: '16px' }}>
//         <Col span={24} style={{ textAlign: 'right' }}>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               setSelectedUser(null);
//               form.resetFields();
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>

//       {/* Users Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//         search={false}
//         tableLayout="fixed"
//         bordered
//         rowClassName="user-table-row"
//         onRow={(record) => ({
//           onClick: () => {
//             window.location.href = `/users/${record.id}`; 
//           },
//         })}
//       />

//       {/* Status Change and Delete Buttons */}
//       <Row style={{ marginTop: '16px' }}>
//         <Col span={12}>
//           <Button type="primary" onClick={handleStatusChange} disabled={selectedRowKeys.length === 0}>
//             Update Status
//           </Button>
//         </Col>
//         <Col span={12} style={{ textAlign: 'right' }}>
//           <Popconfirm
//             title="Are you sure you want to delete the selected users?"
//             onConfirm={() => {
//               selectedRowKeys.forEach((id) => handleDeleteUser(id as string));
//             }}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="danger" disabled={selectedRowKeys.length === 0}>
//               Delete Selected
//             </Button>
//           </Popconfirm>
//         </Col>
//       </Row>

//       {/* Add/Edit User Modal */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="display_name"
//             label="Display Name"
//             rules={[{ required: true, message: 'Please input the display name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please input the username!' }]}
//           >
//             <Input />
//           </Form.Item>
//           {isEditing && (
//             <>
//               <Form.Item
//                 name="status"
//                 label="Status"
//                 rules={[{ required: true, message: 'Please select the status!' }]}
//               >
//                 <Select>
//                   {statusOptions.map(status => (
//                     <Select.Option key={status.id} value={status.id}>
//                       {status.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </>
//           )}
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
//   Table,
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;

// // Define types for user data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
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
//   const [statusOptions, setStatusOptions] = useState<any[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
//   useEffect(() => {
//     fetchUsers();
//     fetchStatuses(); // Fetch statuses when component mounts
//   }, []);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Fetch statuses
//   const fetchStatuses = async () => {
//     try {
//       const response = await request('/statuses');
//       setStatusOptions(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch statuses');
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     const ipAddress = await getIpAddress();
  
//     try {
//       await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name, 
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

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
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

//   // Handle delete selected users
//   const handleDeleteSelectedUsers = async () => {
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'DELETE',
//         })
//       ));
//       message.success('Selected users deleted successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error('Failed to delete selected users');
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

//   // Handle status change
//   const handleStatusChange = async (status: string) => {
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'PATCH',
//           data: { status },
//         })
//       ));
//       message.success('Users status updated successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error('Failed to update status');
//     }
//   };

//   // Handle row selection
//   const handleRowSelection = (selectedKeys: React.Key[]) => {
//     setSelectedRowKeys(selectedKeys);
//   };

//   const columns: ProColumns<User>[] = [
//     {
//       title: 'Select',
//       dataIndex: 'select',
//       render: (_, record) => (
//         <input
//           type="checkbox"
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedRowKeys([...selectedRowKeys, record.id]);
//             } else {
//               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
//             }
//           }}
//         />
//       ),
//     },
//     {
//       title: 'Display Name',
//       dataIndex: 'display_name',
//       key: 'display_name',
//       render: (text) => text || 'N/A',
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status.name : 'N/A',
//     },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {users.length}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         {/* Other statistic cards here */}
//       </Row>

//       {/* Add User Button */}
//       <Row style={{ marginBottom: '16px' }}>
//         <Col span={24} style={{ textAlign: 'right' }}>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               setSelectedUser(null);
//               form.resetFields();
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>

//       {/* Users Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//         search={false}
//         rowSelection={{
//           selectedRowKeys,
//           onChange: handleRowSelection,
//         }}
//         onRow={(record) => ({
//           onClick: () => {
//             window.location.href = `{{base_url}}/users/${record.id}`; // Redirect to user profile page
//           },
//         })}
//         tableLayout="fixed" // For table lines
//       />

//       {/* Bottom Actions */}
//       <Row style={{ marginTop: '16px' }}>
//         <Col span={24}>
//           <Space>
//             <Button
//               onClick={() => handleStatusChange('Archived')} // Example status change
//             >
//               Archive Selected
//             </Button>
//             <Popconfirm
//               title="Are you sure you want to delete selected users?"
//               onConfirm={() => handleDeleteSelectedUsers()}
//             >
//               <Button danger>Delete</Button>
//             </Popconfirm>
//           </Space>
//         </Col>
//       </Row>

//       {/* Add/Edit User Modal */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//         width={800}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="user_form"
//           initialValues={selectedUser || {}}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Display Name"
//                 name="display_name"
//                 rules={[{ required: true, message: 'Please input the display name!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[{ required: true, message: 'Please input the username!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Role"
//                 name="roles"
//                 rules={[{ required: true, message: 'Please select the role!' }]}
//               >
//                 <Select mode="multiple">
//                   {/* Populate role options */}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{ required: true, message: 'Please input the email!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Phone Number"
//                 name="phone_number"
//                 rules={[{ required: true, message: 'Please input the phone number!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>
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
//   Table,
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;
// const { Option } = Select;

// // Define types for user and status data
// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// interface Status {
//   id: string;
//   name: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [statusOptions, setStatusOptions] = useState<Status[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     fetchUsers();
//     fetchStatuses(); // Fetch statuses when component mounts
//   }, []);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Fetch statuses
//   const fetchStatuses = async () => {
//     try {
//       const response = await request('/statuses');
//       if (response.data && response.data.data) {
//         setStatusOptions(response.data.data);
//       } else {
//         setStatusOptions([]);
//       }
//     } catch (error) {
//       message.error('Failed to fetch statuses');
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     const ipAddress = await getIpAddress();
  
//     try {
//       await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name, 
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

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
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

//   // Handle delete selected users
//   const handleDeleteSelectedUsers = async () => {
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'DELETE',
//         })
//       ));
//       message.success('Selected users deleted successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error('Failed to delete selected users');
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async () => {
//     if (!selectedStatus) return;
    
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'PATCH',
//           data: { status: selectedStatus },
//         })
//       ));
//       message.success('Users status updated successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//       setSelectedStatus(undefined);
//     } catch (error) {
//       message.error('Failed to update status');
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

//   // Handle row selection
//   const handleRowSelection = (selectedKeys: React.Key[]) => {
//     setSelectedRowKeys(selectedKeys);
//   };

//   // Fetch single user data when clicked
//   const handleUserClick = async (id: string) => {
//     try {
//       const response = await request(`/users/${id}`);
//       setSelectedUser(response.data);
//       setIsEditing(true);
//       setIsModalVisible(true);
//       form.setFieldsValue(response.data);
//     } catch (error) {
//       message.error('Failed to fetch user details');
//     }
//   };

//   const columns: ProColumns<User>[] = [
//     {
//       title: 'Select',
//       dataIndex: 'select',
//       render: (_, record) => (
//         <input
//           type="checkbox"
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedRowKeys([...selectedRowKeys, record.id]);
//             } else {
//               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
//             }
//           }}
//         />
//       ),
//     },
//     {
//       title: 'Display Name',
//       dataIndex: 'display_name',
//       key: 'display_name',
//       render: (text) => text || 'N/A',
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status.name : 'N/A',
//     },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {users.length}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         {/* Other statistic cards here */}
//       </Row>

//       {/* Add User Button */}
//       <Row style={{ marginBottom: '16px' }}>
//         <Col span={24} style={{ textAlign: 'right' }}>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>

//       {/* User Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         search={false}
//         pagination={false}
//         toolBarRender={() => (
//           <Space>
//             <Select
//               placeholder="Select Status"
//               value={selectedStatus}
//               onChange={setSelectedStatus}
//               style={{ width: 200 }}
//             >
//               {statusOptions.length ? (
//                 statusOptions.map(status => (
//                   <Option key={status.id} value={status.id}>{status.name}</Option>
//                 ))
//               ) : (
//                 <Option value="">No statuses available</Option>
//               )}
//             </Select>
//             <Button
//               type="primary"
//               onClick={handleStatusChange}
//               disabled={!selectedRowKeys.length || !selectedStatus}
//             >
//               Update Status
//             </Button>
//             <Popconfirm
//               title="Are you sure you want to delete selected users?"
//               onConfirm={handleDeleteSelectedUsers}
//             >
//               <Button danger>Delete</Button>
//             </Popconfirm>
//           </Space>
//         )}
//         rowSelection={{
//           selectedRowKeys,
//           onChange: handleRowSelection,
//         }}
//         onRow={(record) => ({
//           onClick: () => handleUserClick(record.id),
//         })}
//       />

//       {/* Add/Edit User Modal */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//         width={800}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="user_form"
//           initialValues={selectedUser || {}}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Display Name"
//                 name="display_name"
//                 rules={[{ required: true, message: 'Please input the display name!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[{ required: true, message: 'Please input the username!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Role"
//                 name="roles"
//                 rules={[{ required: true, message: 'Please select the role!' }]}
//               >
//                 <Select mode="multiple">
//                   {/* Populate role options */}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{ required: true, message: 'Please input the email!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Phone Number"
//                 name="phone_number"
//                 rules={[{ required: true, message: 'Please input the phone number!' }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Status"
//                 name="status"
//                 rules={[{ required: true, message: 'Please select the status!' }]}
//               >
//                 <Select>
//                   {statusOptions.length ? (
//                     statusOptions.map(status => (
//                       <Option key={status.id} value={status.id}>{status.name}</Option>
//                     ))
//                   ) : (
//                     <Option value="">No statuses available</Option>
//                   )}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
// import {
//   CheckCircleOutlined,
//   DeleteOutlined,
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
// import { request, history } from 'umi';

// const { Title } = Typography;
// const { Option } = Select;

// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// interface Status {
//   id: string;
//   name: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [statusOptions, setStatusOptions] = useState<Status[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     fetchUsers();
//     fetchStatuses(); // Fetch statuses when component mounts
//   }, []);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Fetch statuses
//   const fetchStatuses = async () => {
//     try {
//       const response = await request('/statuses');
//       if (response.data && response.data.data) {
//         setStatusOptions(response.data.data);
//       } else {
//         setStatusOptions([]);
//       }
//     } catch (error) {
//       message.error('Failed to fetch statuses');
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     const ipAddress = await getIpAddress();
  
//     try {
//       await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name, 
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

//   // Edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
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

//   // Handle delete selected users
//   const handleDeleteSelectedUsers = async () => {
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'DELETE',
//         })
//       ));
//       message.success('Selected users deleted successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error('Failed to delete selected users');
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async () => {
//     if (!selectedStatus) return;
    
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'PATCH',
//           data: { status: selectedStatus },
//         })
//       ));
//       message.success('Users status updated successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//       setSelectedStatus(undefined);
//     } catch (error) {
//       message.error('Failed to update status');
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

//   // Handle row selection
//   const handleRowSelection = (selectedKeys: React.Key[]) => {
//     setSelectedRowKeys(selectedKeys);
//   };

//   // Handle row click to navigate to profile page
//   const handleUserClick = (id: string) => {
//     history.push(`/users/${id}`);
//   };

//   const columns: ProColumns<User>[] = [
//     {
//       title: 'Select',
//       dataIndex: 'select',
//       render: (_, record) => (
//         <input
//           type="checkbox"
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedRowKeys([...selectedRowKeys, record.id]);
//             } else {
//               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
//             }
//           }}
//         />
//       ),
//     },
//     {
//       title: 'Display Name',
//       dataIndex: 'display_name',
//       key: 'display_name',
//       render: (text) => text || 'N/A',
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status.name : 'N/A',
//     },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {users.length}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         {/* Other statistic cards here */}
//       </Row>

//       {/* Add User Button */}
//       <Row style={{ marginBottom: '16px' }}>
//         <Col span={24} style={{ textAlign: 'right' }}>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>

//       {/* User Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         search={false}
//         pagination={{ pageSize: 10 }}
//         toolBarRender={() => [
//           <Button
//             key="batch-delete"
//             icon={<DeleteOutlined />}
//             onClick={handleDeleteSelectedUsers}
//           >
//             Delete Selected
//           </Button>,
//           <Select
//             key="status-change"
//             placeholder="Change Status"
//             style={{ width: 200 }}
//             onChange={setSelectedStatus}
//           >
//             {statusOptions.map((status) => (
//               <Option key={status.id} value={status.name}>
//                 {status.name}
//               </Option>
//             ))}
//           </Select>,
//           <Button
//             key="apply-status"
//             type="primary"
//             onClick={handleStatusChange}
//             disabled={!selectedStatus}
//           >
//             Apply Status
//           </Button>
//         ]}
//         onRow={(record) => ({
//           onClick: () => handleUserClick(record.id),
//         })}
//       />

//       {/* User Modal */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           initialValues={selectedUser || {}}
//         >
//           <Form.Item
//             name="display_name"
//             label="Display Name"
//             rules={[{ required: true, message: 'Please input display name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           {!isEditing && (
//             <>
//               <Form.Item
//                 name="username"
//                 label="Username"
//                 rules={[{ required: true, message: 'Please input a username!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[{ required: true, message: 'Please input a password!' }]}
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 name="password_confirmation"
//                 label="Confirm Password"
//                 rules={[{ required: true, message: 'Please confirm your password!' }]}
//               >
//                 <Input.Password />
//               </Form.Item>
//             </>
//           )}
//           <Form.Item
//             name="status"
//             label="Status"
//           >
//             <Select>
//               {statusOptions.map((status) => (
//                 <Option key={status.id} value={status.name}>
//                   {status.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="roles"
//             label="Roles"
//           >
//             <Select mode="multiple">
//               <Option value="user">User</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
// import {
//   CheckCircleOutlined,
//   DeleteOutlined,
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
//   Row,
//   Select,
//   Typography,
// } from 'antd';
// import { ProFormSelect } from '@ant-design/pro-form';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { request, history } from 'umi';

// const { Title } = Typography;

// interface User {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// interface Status {
//   id: string;
//   name: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
//   const [statusOptions, setStatusOptions] = useState<{ label: string, value: string }[]>([]);
//   const [roleOptions, setRoleOptions] = useState<{ label: string, value: string }[]>([]);



//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const statusResponse = await request('/statuses');
//         const rolesResponse = await request('/roles');
//         setStatusOptions(statusResponse.data.data.map((status: Status) => ({
//           label: status.name,
//           value: status.name,
//         })));
//         setRoleOptions(rolesResponse.data.data.map((role: string) => ({
//           label: role,
//           value: role,
//         })));
//       } catch (error) {
//         message.error('Failed to fetch options');
//       }
//     };
  
//     fetchOptions();
//   }, []);



//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       setUsers(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };

//   // Add user
//   const handleAddUser = async (values: any) => {
//     setLoading(true);
//     const ipAddress = await getIpAddress();
  
//     try {
//       await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.display_name, 
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

//   // Handle row selection
//   const handleRowSelection = (selectedKeys: React.Key[]) => {
//     setSelectedRowKeys(selectedKeys);
//   };

//   // Handle row click to navigate to profile page
//   const handleUserClick = (id: string) => {
//     history.push(`/users/${id}`);
//   };

//   // Handle edit user
//   const handleEditUser = async (id: string, values: any) => {
//     try {
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: {
//           display_name: values.display_name,
//           email: values.email,
//           status: values.status,
//           roles: values.roles,
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

//   // Handle delete selected users
//   const handleDeleteSelectedUsers = async () => {
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'DELETE',
//         })
//       ));
//       message.success('Selected users deleted successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error('Failed to delete selected users');
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async () => {
//     if (!selectedStatus) return;
    
//     try {
//       await Promise.all(selectedRowKeys.map(id =>
//         request(`/users/${id}`, {
//           method: 'PATCH',
//           data: { status: selectedStatus },
//         })
//       ));
//       message.success('Users status updated successfully');
//       fetchUsers();
//       setSelectedRowKeys([]);
//       setSelectedStatus(undefined);
//     } catch (error) {
//       message.error('Failed to update status');
//     }
//   };

//   const columns: ProColumns<User>[] = [
//     {
//       title: 'Select',
//       dataIndex: 'select',
//       key: 'select',  
//       render: (_, record) => (
//         <input
//           type="checkbox"
//           checked={selectedRowKeys.includes(record.id)}
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedRowKeys([...selectedRowKeys, record.id]);
//             } else {
//               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
//             }
//           }}
//         />
//       ),
//     },
//     {
//       title: 'Display Name',
//       dataIndex: 'display_name',
//       key: 'display_name',
//       render: (text) => text || 'N/A',
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => status ? status.name : 'N/A',
//     },
//     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
//     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
//   ];

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Users</Title>
//             <div style={{ fontSize: '24px' }}>{users.length}</div>
//           </Card>
//         </Col>
//         {/* Additional Cards can be added here */}
//       </Row>

//       {/* Table */}
//       <ProTable<User>
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         bordered
//             style={{
//               border: '1px solid #d9d9d9', // Customize the table border color
//             }}
//             components={{
//               header: {
//                 cell: (props) => (
//                   <th
//                     {...props}
//                     style={{
//                       borderBottom: '2px solid #d9d9d9', // Customize the column line color
//                     }}
//                   />
//                 ),
//               },
//               body: {
//                 cell: (props) => (
//                   <td
//                     {...props}
//                     style={{
//                       borderBottom: '1px solid #d9d9d9', // Customize the row line color
//                     }}
//                   />
//                 ),
//               },
//             }}
//         search={false}
//         pagination={false}
//         toolBarRender={() => [
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setIsEditing(false);
//               form.resetFields();
//               setIsModalVisible(true);
//             }}
//           >
//             Add User
//           </Button>,
//           <Button
//             danger
//             onClick={handleDeleteSelectedUsers}
//             disabled={selectedRowKeys.length === 0}
//           >
//             Delete Selected Users
//           </Button>,
//           // <ProFormSelect
//           //   placeholder="Select status"
//           //   options={statusOptions}
//           //   onChange={setSelectedStatus}
//           //   value={selectedStatus}
//           //   request={async () => {
//           //     try {
//           //       const response = await request('/statuses');
//           //       return response.data.data.map((status: Status) => ({
//           //         label: status.name,
//           //         value: status.name,
//           //       }));
//           //     } catch (error) {
//           //       message.error('Failed to fetch status options');
//           //       return [];
//           //     }
//           //   }}
//           // />,
//           <ProFormSelect
//           placeholder="Select status"
//           options={statusOptions}
//           onChange={setSelectedStatus}
//           value={selectedStatus}
//         />,
//           // <Button
//           //   type="primary"
//           //   onClick={handleStatusChange}
//           //   disabled={!selectedStatus || selectedRowKeys.length === 0}
//           // >
//           //   Change Status
//           // </Button>
//           <Button
//           type="primary"
//           onClick={handleStatusChange}
//           disabled={!selectedStatus || selectedRowKeys.length === 0}
//         >
//           Change Status
//         </Button>
//         ]}
//         rowSelection={{
//           selectedRowKeys,
//           onChange: handleRowSelection,
//         }}
//         onRow={(record) => ({
//           onClick: () => handleUserClick(record.id),
//         })}
//       />

//       {/* Modal Form */}
//       <Modal
//         title={isEditing ? 'Edit User' : 'Add User'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           initialValues={isEditing ? { ...selectedUser, status: selectedUser?.status?.name } : {}}
//         >
//           <Form.Item
//             name="display_name"
//             label="Display Name"
//             rules={[{ required: true, message: 'Please input the display name!' }]}
//           >
//             <Input placeholder="Display Name" />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please input the username!' }]}
//           >
//             <Input placeholder="Username" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please input the password!' }]}
//           >
//             <Input.Password placeholder="Password" />
//           </Form.Item>
//           <Form.Item
//             name="password_confirmation"
//             label="Confirm Password"
//             rules={[{ required: true, message: 'Please confirm the password!' }]}
//           >
//             <Input.Password placeholder="Confirm Password" />
//           </Form.Item>
//           <ProFormSelect
//             name="status"
//             label="Status"
//             placeholder="Select Status"
//             rules={[{ required: true, message: 'Please select the status!' }]}
//             request={async () => {
              
//               try {
//                 const response = await request('/statuses');
//                 console.log(response?.data);
//                 return response.data.data.map((status: Status) => ({
//                   label: status.name,
//                   value: status.name,
//                 }));
//               } catch (error) {
//                 message.error('Failed to fetch status options');
//                 return [];
//               }
//             }}
//           />
          
//           <ProFormSelect
//             name="roles"
//             label="Roles"
//             placeholder="Select Roles"
//             mode="multiple"
//             rules={[{ required: true, message: 'Please select at least one role!' }]}
//             request={async () => {
//               try {
//                 const response = await request('/roles');
//                 return response.data.data.map((role: string) => ({
//                   label: role,
//                   value: role,
//                 }));
//               } catch (error) {
//                 message.error('Failed to fetch roles options');
//                 return [];
//               }
//             }}
//           />
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
  // import {
  //   CheckCircleOutlined,
  //   DeleteOutlined,
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
  //   Row,
  //   Select,
  //   Typography,
  // } from 'antd';
  // import { ProFormSelect } from '@ant-design/pro-form';
  // import moment from 'moment';
  // import React, { useEffect, useState } from 'react';
  // import { request, history } from 'umi';

  // const { Title } = Typography;

  // interface User {
  //   id: string;
  //   display_name: string;
  //   email: string;
  //   ip_address: string;
  //   status: { name: string };
  //   roles: string[];
  //   last_login: string;
  //   login_count: number;
  // }

  // interface Status {
  //   id: string;
  //   name: string;
  // }

  // interface Status {
  //   id: string;
  //   name: string;
  // }

  // interface Role {
  //   name: string;
  // }

  // const Users: React.FC = () => {
  //   const [users, setUsers] = useState<User[]>([]);
  //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();
  //   const [loading, setLoading] = useState(false);
  //   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //   const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  //   // const [statusOptions, setStatusOptions] = useState<{ label: string, value: string }[]>([]);
  //   // const [roleOptions, setRoleOptions] = useState<{ label: string, value: string }[]>([]);
  //   // const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  //   const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  //   const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  //   const [roleOptions, setRoleOptions] = useState<Role[]>([]);

  //   useEffect(() => {
  //     const fetchOptions = async () => {
  //       try {
  //         const statusResponse = await request('/statuses');
  //         const rolesResponse = await request('/roles');
  //         setStatusOptions(statusResponse.data.data.map((status: Status) => ({
  //           label: status.name,
  //           value: status.name,
  //         })));
  //         setRoleOptions(rolesResponse.data.data.map((role: string) => ({
  //           label: role,
  //           value: role,
  //         })));
  //       } catch (error) {
  //         message.error('Failed to fetch options');
  //       }
  //     };
    
  //     fetchOptions();
  //   }, []);



  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  //   // Fetch users
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await request('/users');
  //       setUsers(response.data.data);
  //     } catch (error) {
  //       message.error('Failed to fetch users');
  //     }
  //   };
  //   const fetchStatusOptions = async () => {
  //     try {
  //       const response = await request('/statuses');
  //       setStatusOptions(response.data.data);
  //     } catch (error) {
  //       message.error('Failed to fetch status options');
  //     }
  //   };
  //   // Add user
  //   const handleAddUser = async (values: any) => {
  //     setLoading(true);
  //     const ipAddress = await getIpAddress();
    
  //     try {
  //       await request('/auth/register', {
  //         method: 'POST',
  //         data: {
  //           email: values.email,
  //           display_name: values.display_name, 
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

  //   // Handle row selection
  //   const handleRowSelection = (selectedKeys: React.Key[]) => {
  //     setSelectedRowKeys(selectedKeys);
  //   };

  //   // Handle row click to navigate to profile page
  //   const handleUserClick = (id: string) => {
  //     history.push(`/users/${id}`);
  //   };

  //   // Handle edit user
  //   const handleEditUser = async (id: string, values: any) => {
  //     try {
  //       await request(`/users/${id}`, {
  //         method: 'PUT',
  //         data: {
  //           display_name: values.display_name,
  //           email: values.email,
  //           status: values.status,
  //           roles: values.roles,
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

  //   // Handle delete selected users
  //   const handleDeleteSelectedUsers = async () => {
  //     try {
  //       await Promise.all(selectedRowKeys.map(id =>
  //         request(`/users/${id}`, {
  //           method: 'DELETE',
  //         })
  //       ));
  //       message.success('Selected users deleted successfully');
  //       fetchUsers();
  //       setSelectedRowKeys([]);
  //     } catch (error) {
  //       message.error('Failed to delete selected users');
  //     }
  //   };

  //   // Handle status change
  //   const handleStatusChange = async () => {
  //     if (!selectedStatus) return;
      
  //     try {
  //       await Promise.all(selectedRowKeys.map(id =>
  //         request(`/users/${id}`, {
  //           method: 'PATCH',
  //           data: { status: selectedStatus },
  //         })
  //       ));
  //       message.success('Users status updated successfully');
  //       fetchUsers();
  //       setSelectedRowKeys([]);
  //       setSelectedStatus(undefined);
  //     } catch (error) {
  //       message.error('Failed to update status');
  //     }
  //   };

  //   const columns: ProColumns<User>[] = [
  //     {
  //       title: 'Select',
  //       dataIndex: 'select',
  //       key: 'select',  
  //       render: (_, record) => (
  //         <input
  //           type="checkbox"
  //           checked={selectedRowKeys.includes(record.id)}
  //           onChange={(e) => {
  //             if (e.target.checked) {
  //               setSelectedRowKeys([...selectedRowKeys, record.id]);
  //             } else {
  //               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
  //             }
  //           }}
  //         />
  //       ),
  //     },
  //     {
  //       title: 'Display Name',
  //       dataIndex: 'display_name',
  //       key: 'display_name',
  //       render: (text) => text || 'N/A',
  //     },
  //     { title: 'Email', dataIndex: 'email', key: 'email' },
  //     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
  //     {
  //       title: 'Status',
  //       dataIndex: 'status',
  //       key: 'status',
  //       render: (status) => status ? status.name : 'N/A',
  //     },
  //     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
  //     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
  //     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
  //     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
  //   ];

  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Users</Title>
  //             <div style={{ fontSize: '24px' }}>{users.length}</div>
  //           </Card>
  //         </Col>
  //         {/* Additional Cards can be added here */}
  //       </Row>

  //       {/* Table */}
  //       <ProTable<User>
  //         columns={columns}
  //         dataSource={users}
  //         rowKey="id"
  //         bordered
  //             style={{
  //               border: '1px solid #d9d9d9', // Customize the table border color
  //             }}
  //             components={{
  //               header: {
  //                 cell: (props) => (
  //                   <th
  //                     {...props}
  //                     style={{
  //                       borderBottom: '2px solid #d9d9d9', // Customize the column line color
  //                     }}
  //                   />
  //                 ),
  //               },
  //               body: {
  //                 cell: (props) => (
  //                   <td
  //                     {...props}
  //                     style={{
  //                       borderBottom: '1px solid #d9d9d9', // Customize the row line color
  //                     }}
  //                   />
  //                 ),
  //               },
  //             }}
  //         search={false}
  //         pagination={false}
  //         toolBarRender={() => [
  //           <Button
  //             type="primary"
  //             icon={<PlusOutlined />}
  //             onClick={() => {
  //               setIsEditing(false);
  //               form.resetFields();
  //               setIsModalVisible(true);
  //             }}
  //           >
  //             Add User
  //           </Button>,
  //           <Button
  //             danger
  //             onClick={handleDeleteSelectedUsers}
  //             disabled={selectedRowKeys.length === 0}
  //           >
  //             Delete Selected Users
  //           </Button>,
  //           // <ProFormSelect
  //           //   placeholder="Select status"
  //           //   options={statusOptions}
  //           //   onChange={setSelectedStatus}
  //           //   value={selectedStatus}
  //           //   request={async () => {
  //           //     try {
  //           //       const response = await request('/statuses');
  //           //       return response.data.data.map((status: Status) => ({
  //           //         label: status.name,
  //           //         value: status.name,
  //           //       }));
  //           //     } catch (error) {
  //           //       message.error('Failed to fetch status options');
  //           //       return [];
  //           //     }
  //           //   }}
  //           // />,
  //         //   <ProFormSelect
  //         //   placeholder="Select status"
  //         //   options={statusOptions}
  //         //   onChange={setSelectedStatus}
  //         //   value={selectedStatus}
  //         // />,
  //         <div style={{ margin: '16px 0' }}>
  //             {statusOptions.map(status => (
  //               <Button
  //                 key={status.id}
  //                 onClick={() => handleStatusChange(status.id)}
  //                 style={{ marginRight: 8 }}
  //                 type="default"
  //               >
  //                 {status.name}
  //               </Button>
  //             ))}
  //           </div>,
  //           // <Button
  //           //   type="primary"
  //           //   onClick={handleStatusChange}
  //           //   disabled={!selectedStatus || selectedRowKeys.length === 0}
  //           // >
  //           //   Change Status
  //           // </Button>
  //         //   <Button
  //         //   type="primary"
  //         //   onClick={handleStatusChange}
  //         //   disabled={!selectedStatus || selectedRowKeys.length === 0}
  //         // >
  //         //   Change Status
  //         // </Button>
  //         ]}
  //         rowSelection={{
  //           selectedRowKeys,
  //           onChange: handleRowSelection,
  //         }}
  //         onRow={(record) => ({
  //           onClick: () => handleUserClick(record.id),
  //         })}
  //       />

  //       {/* Modal Form */}
  //       <Modal
  //         title={isEditing ? 'Edit User' : 'Add User'}
  //         visible={isModalVisible}
  //         onOk={handleOk}
  //         onCancel={handleCancel}
  //         confirmLoading={loading}
  //       >
  //         <Form
  //           form={form}
  //           layout="vertical"
  //           initialValues={isEditing ? { ...selectedUser, status: selectedUser?.status?.name } : {}}
  //         >
  //           <Form.Item
  //             name="display_name"
  //             label="Display Name"
  //             rules={[{ required: true, message: 'Please input the display name!' }]}
  //           >
  //             <Input placeholder="Display Name" />
  //           </Form.Item>
  //           <Form.Item
  //             name="email"
  //             label="Email"
  //             rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
  //           >
  //             <Input placeholder="Email" />
  //           </Form.Item>
  //           <Form.Item
  //             name="username"
  //             label="Username"
  //             rules={[{ required: true, message: 'Please input the username!' }]}
  //           >
  //             <Input placeholder="Username" />
  //           </Form.Item>
            
  //           {/* <ProFormSelect
  //             name="status"
  //             label="Status"
  //             placeholder="Select Status"
  //             rules={[{ required: true, message: 'Please select the status!' }]}
  //             request={async () => {
                
  //               try {
  //                 const response = await request('/statuses');
  //                 console.log(response?.data);
  //                 return response.data.data.map((status: Status) => ({
  //                   label: status.name,
  //                   value: status.name,
  //                 }));
  //               } catch (error) {
  //                 message.error('Failed to fetch status options');
  //                 return [];
  //               }
  //             }}
  //           /> */}
  //           {/* <ProFormSelect
  //   name="status"
  //   label="Status"
  //   placeholder="Select Status"
  //   rules={[{ required: true, message: 'Please select the status!' }]}
  //   request={async () => {
  //     try {
  //       const response = await request('/statuses');
  //       console.log(response?.data);
  //       return response.data((status: Status) => ({
  //         label: status.name,
  //         value: status.id, 
  //       }));
  //     } catch (error) {
  //       message.error('Failed to fetch status options');
  //       return [];
  //     }
  //   }}
  // /> */}

  //           {/* <ProFormSelect
  //             name="roles"
  //             label="Roles"
  //             placeholder="Select Roles"
  //             mode="multiple"
  //             rules={[{ required: true, message: 'Please select at least one role!' }]}
  //             request={async () => {
  //               try {
  //                 const response = await request('/roles');
  //                 console.log(response?.data)
  //                 return response.data.data.map((role: string) => ({
  //                   label: role,
  //                   value: role,
  //                 }));
  //               } catch (error) {
  //                 message.error('Failed to fetch roles options');
  //                 return [];
  //               }
  //             }}
  //           /> */}
  //           <ProFormSelect
  //   name="roles"
  //   label="Roles"
  //   placeholder="Select Roles"
  //   mode="multiple"
  //   rules={[{ required: true, message: 'Please select at least one role!' }]}
  //   request={async () => {
  //     try {
  //       const response = await request('/roles');
  //       console.log(response?.data);
  //       return response?.data((role: string) => ({
  //         label: role,
  //         value: role,
  //       }));
  //     } catch (error) {
  //       message.error('Failed to fetch roles options');
  //       return [];
  //     }
  //   }}
  // />
  // {/* <ProFormSelect
  //             name="roles"
  //             label="Roles"
  //             placeholder="Select Roles"
  //             mode="multiple"
  //             options={roleOptions.map(role => ({
  //               label: role.name,
  //               value: role.name,
  //             }))}
  //             onChange={setSelectedRoles}
  //             value={selectedRoles}
  //             rules={[{ required: true, message: 'Please select at least one role!' }]}
  //           />, */}

  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default Users;
  // import {
  //   CheckCircleOutlined,
  //   DeleteOutlined,
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
  //   Row,
  //   Select,
  //   Typography,
  // } from 'antd';
  // import { ProFormSelect } from '@ant-design/pro-form';
  // import moment from 'moment';
  // import React, { useEffect, useState } from 'react';
  // import { request, history } from 'umi';
  
  // const { Title } = Typography;
  
  // interface User {
  //   id: string;
  //   display_name: string;
  //   email: string;
  //   ip_address: string;
  //   status: { name: string };
  //   roles: string[];
  //   last_login: string;
  //   login_count: number;
  //   created_at: string;
  // }
  
  // interface Status {
  //   id: string;
  //   name: string;
  // }
  
  // interface Role {
  //   name: string;
  // }
  
  // const Users: React.FC = () => {
  //   const [users, setUsers] = useState<User[]>([]);
  //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();
  //   const [loading, setLoading] = useState(false);
  //   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //   const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  //   const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  //   const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  //   const [searchTerm, setSearchTerm] = useState<string>('');
  //   useEffect(() => {
  //     const fetchOptions = async () => {
  //       try {
  //         const statusResponse = await request('/statuses');
  //         const rolesResponse = await request('/roles');
  //         setStatusOptions(statusResponse.data.data || []);
  //         setRoleOptions(rolesResponse.data.data || []);
  //       } catch (error) {
  //         message.error('Failed to fetch options');
  //       }
  //     };
  
  //     fetchOptions();
  //   }, []);
  
  //   useEffect(() => {
  //     fetchUsers();
  //   }, [searchTerm]);
  
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await request('/users', { method: 'GET',params:{search:searchTerm} });
  //       if (response.success) {
  //         setUsers(response.data.data); 
  //       } else {
  //         message.error('Failed to fetch users');
  //       }
  //     } catch (error) {
  //       message.error('Error fetching users');
  //     }
  //   };
  //   const handleAddUser = async (values: any) => {
  //     setLoading(true);
  //     const ipAddress = await getIpAddress();
  
  //     try {
  //       await request('/auth/register', {
  //         method: 'POST',
  //         data: {
  //           email: values.email,
  //           display_name: values.display_name,
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
  
  //   const handleCancel = () => {
  //     setIsModalVisible(false);
  //     form.resetFields();
  //   };
  
  //   const handleRowSelection = (selectedKeys: React.Key[]) => {
  //     setSelectedRowKeys(selectedKeys);
  //   };
  
  //   const handleUserClick = (id: string) => {
  //     history.push(`/users/${id}`);
  //   };
  
  //   const handleEditUser = async (id: string, values: any) => {
  //     try {
  //       await request(`/users/${id}`, {
  //         method: 'PUT',
  //         data: {
  //           display_name: values.display_name,
  //           email: values.email,
  //           status: values.status,
  //           roles: values.roles,
  //         },
  //       });
  //       message.success('User updated successfully');
  //       fetchUsers();
  //       setSelectedUser(null);
  //       setIsModalVisible(false);
  //     } catch (error) {
  //       message.error('Failed to update user');
  //     }
  //   };
  
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
  
  //   const handleDeleteSelectedUsers = async () => {
  //     try {
  //       await Promise.all(selectedRowKeys.map(id =>
  //         request(`/users/${id}`, {
  //           method: 'DELETE',
  //         })
  //       ));
  //       message.success('Selected users deleted successfully');
  //       fetchUsers();
  //       setSelectedRowKeys([]);
  //     } catch (error) {
  //       message.error('Failed to delete selected users');
  //     }
  //   };
  
  //   const handleStatusChange = async () => {
  //     if (!selectedStatus) return;
  
  //     try {
  //       await Promise.all(selectedRowKeys.map(id =>
  //         request(`/users/${id}`, {
  //           method: 'PUT',
  //           data: { status: selectedStatus },
  //         })
  //       ));
  //       message.success('Users status updated successfully');
  //       fetchUsers();
  //       setSelectedRowKeys([]);
  //       setSelectedStatus(undefined);
  //     } catch (error) {
  //       message.error('Failed to update status');
  //     }
  //   };
  
  //   const columns: ProColumns<User>[] = [
  //     {
  //       title: 'Select',
  //       dataIndex: 'select',
  //       key: 'select',
  //       render: (_, record) => (
  //         <input
  //           type="checkbox"
  //           checked={selectedRowKeys.includes(record.id)}
  //           onChange={(e) => {
  //             if (e.target.checked) {
  //               setSelectedRowKeys([...selectedRowKeys, record.id]);
  //             } else {
  //               setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
  //             }
  //           }}
  //         />
  //       ),
  //     },
  //     {
  //       title: 'Display Name',
  //       dataIndex: 'display_name',
  //       key: 'display_name',
  //       render: (text) => text || 'N/A',
  //     },
  //     { title: 'Email', dataIndex: 'email', key: 'email' },
  //     { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
  //     {
  //       title: 'Status',
  //       dataIndex: 'status',
  //       key: 'status',
  //       render: (status) => status ? status.name : 'N/A',
  //     },
  //     { title: 'Role', dataIndex: 'roles', key: 'roles', render: (roles) => roles.join(', ') },
  //     { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
  //     { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
  //     { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
  //   ];
  
  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Users</Title>
  //             <div style={{ fontSize: '24px' }}>{users.length}</div>
  //           </Card>
  //         </Col>
  //       </Row>
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //       <Col span={24}>
  //         <Input
  //           placeholder="Search Users"
  //           value={searchTerm}
  //           onChange={(e) => setSearchTerm(e.target.value)}
  //           style={{ marginBottom: '16px' }}
  //         />
  //       </Col>
  //     </Row>
  //       <ProTable<User>
  //         columns={columns}
  //         dataSource={users}
  //         rowKey="id"
  //         bordered
  //         style={{
  //           border: '1px solid #d9d9d9',
  //         }}
  //         components={{
  //           header: {
  //             cell: (props) => (
  //               <th
  //                 {...props}
  //                 style={{
  //                   borderBottom: '2px solid #d9d9d9',
  //                 }}
  //               />
  //             ),
  //           },
  //           body: {
  //             cell: (props) => (
  //               <td
  //                 {...props}
  //                 style={{
  //                   borderBottom: '1px solid #d9d9d9',
  //                 }}
  //               />
  //             ),
  //           },
  //         }}
  //         search={false}
  //         pagination={false}
  //         toolBarRender={() => [
  //           <Button
  //             type="primary"
  //             icon={<PlusOutlined />}
  //             onClick={() => {
  //               setIsEditing(false);
  //               setIsModalVisible(true);
  //             }}
  //           >
  //             Add User
  //           </Button>,
  //           <Button
  //             icon={<DeleteOutlined />}
  //             onClick={handleDeleteSelectedUsers}
  //             disabled={selectedRowKeys.length === 0}
  //           >
  //             Delete Selected
  //           </Button>,
  //           <Button
  //             icon={<CheckCircleOutlined />}
  //             onClick={handleStatusChange}
  //             disabled={!selectedStatus || selectedRowKeys.length === 0}
  //           >
  //             Change Status to {selectedStatus}
  //           </Button>,
  //           <div style={{ marginTop: '8px' }}>
  //             {['Active', 'Inactive', 'Pending Activation'].map(status => (
  //               <Button
  //                 key={status}
  //                 onClick={() => setSelectedStatus(status)}
  //                 style={{ marginRight: 8 }}
  //                 type={selectedStatus === status ? 'primary' : 'default'}
  //               >
  //                 {status}
  //               </Button>
  //             ))}
  //           </div>,
  //         ]}
  //         rowSelection={{
  //           selectedRowKeys,
  //           onChange: handleRowSelection,
  //         }}
  //         onRow={(record) => ({
  //           onClick: () => handleUserClick(record.id),
  //         })}
  //       />
  
  //       <Modal
  //         title={isEditing ? 'Edit User' : 'Add User'}
  //         visible={isModalVisible}
  //         onOk={handleOk}
  //         onCancel={handleCancel}
  //         confirmLoading={loading}
  //       >
  //         <Form
  //           form={form}
  //           layout="vertical"
  //           // initialValues={isEditing ? selectedUser : {}}
  //           initialValues={selectedUser || {}}
  //         onFinish={handleOk}
  //         >
  //           <Form.Item
  //             label="Display Name"
  //             name="display_name"
  //             rules={[{ required: true, message: 'Please input the display name!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             label="Email"
  //             name="email"
  //             rules={[{ required: true, message: 'Please input the email!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           {!isEditing && (
  //             <>
  //               <Form.Item
  //                 label="Username"
  //                 name="username"
  //                 rules={[{ required: true, message: 'Please input the username!' }]}
  //               >
  //                 <Input />
  //               </Form.Item>
  //             </>
  //           )}
  //           {/* <Form.Item
  //             label="Status"
  //             name="status"
  //             rules={[{ required: true, message: 'Please select the status!' }]}
  //           > */}
  //             {/* <Select>
  //               {statusOptions.length > 0 ? (
  //                 statusOptions.map(status => (
  //                   <Select.Option key={status.id} value={status.name}>
  //                     {status.name}
  //                   </Select.Option>
  //                 ))
  //               ) : (
  //                 <Select.Option disabled>No status options available</Select.Option>
  //               )}
  //             </Select>
  //           </Form.Item> */}
  //           <Form.Item
  //             label="Roles"
  //             name="roles"
  //             rules={[{ required: true, message: 'Please select at least one role!' }]}
  //           >
  //             <ProFormSelect
  //               mode="multiple"
  //               options={roleOptions.length > 0 ? roleOptions.map(role => ({ label: role.name, value: role.name })) : []}
  //             />
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };
  
  // export default Users;
  import {
    CheckCircleOutlined,
    DeleteOutlined,
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
    Row,
    Select,
    Typography,
  } from 'antd';
  import { ProFormSelect } from '@ant-design/pro-form';
  import moment from 'moment';
  import React, { useEffect, useState } from 'react';
  import { request, history } from 'umi';
  
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
  
  interface Status {
    id: string; 
    name: string;
  }
  
  interface Role {
    name: string;
  }
  
  const STATUS_OPTIONS = [
    {id: 'bfd022d1-655e-42fe-8aec-cb8eead81e54', name: 'Activate'},
    {id: '607fc82a-ccc7-4a2d-8a44-4a3148ed5a85', name: 'Deactivate'},
    {id: 'df88620e-b3f2-48ed-a6ba-49845afdfd17', name: 'Set Pending'},
    {id: '67f1b9d1-c0a7-469c-9b1c-ef69a160c3a5', name: 'Delete'},
  ]

  const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
    const [statusOptions, setStatusOptions] = useState<Status[]>([]);
    const [roleOptions, setRoleOptions] = useState<Role[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const statusResponse = await request('/statuses');
          const rolesResponse = await request('/roles');
          if (statusResponse.status) {
            setStatusOptions(statusResponse.data || []);
          } else {
            message.error('Failed to fetch statuses');
          }
          if (rolesResponse.status) {
            setRoleOptions(rolesResponse.data || []);
          } else {
            message.error('Failed to fetch roles');
          }
        } catch (error) {
          message.error('Failed to fetch options');
        }
      };
  
      fetchOptions();
    }, []);
  
    useEffect(() => {
      fetchUsers();
    }, [searchTerm]);
  
    const fetchUsers = async () => {
      try {
        const response = await request('/users', { method: 'GET', params: { search: searchTerm } });
        if (response.success) {
          setUsers(response.data.data);
        } else {
          message.error('Failed to fetch users');
        }
      } catch (error) {
        message.error('Error fetching users');
      }
    };
  
    const handleAddUser = async (values: any) => {
      setLoading(true);
      const ipAddress = await getIpAddress();
  
      try {
        await request('/auth/register', {
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
  
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
    };
  
    const handleRowSelection = (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    };
  
    const handleUserClick = (id: string) => {
      history.push(`/users/${id}`);
    };
  
    const handleEditUser = async (id: string, values: any) => {
      try {
        await request(`/users/${id}`, {
          method: 'PUT',
          data: {
            display_name: values.display_name,
            email: values.email,
            status: values.status,
            roles: values.roles,
          },
        });
        message.success('User updated successfully');
        fetchUsers();
        setSelectedUser(null);
        setIsModalVisible(false);
      } catch (error) {
        message.error('Failed to update user');
      }
    };
  
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
  
    const handleDeleteSelectedUsers = async () => {
      try {
        await Promise.all(selectedRowKeys.map(id =>
          request(`/users/${id}`, {
            method: 'DELETE',
          })
        ));
        message.success('Selected users deleted successfully');
        fetchUsers();
        setSelectedRowKeys([]);
      } catch (error) {
        message.error('Failed to delete selected users');
      }
    };
  
    // const handleStatusChange = async (selectedRowKeys: string[], selectedStatus: { id: string }) => {
    //   if (!selectedStatus) return;
    
  //     if (!selectedStatus) return;
  // console.log (selectedStatus)
  //     try {
  //       await Promise.all(selectedRowKeys.map(id =>
  //         request(`/users/${id}`, {
  //           method: 'PUT',
  //           data: { status: selectedStatus.id },
  //         })
  //       ));
  //       message.success('Users status updated successfully');
  //       fetchUsers();
  //       setSelectedRowKeys([]);
  //       setSelectedStatus(undefined);
  //     } catch (error) {
  //       message.error('Failed to update status');
  //     }
  //   };
  // const payload = {
  //   status: selectedStatusId, 
  // };

//   try {
//     // Ensure selectedStatus.id is correctly used
//     await Promise.all(selectedRowKeys.map(id =>
//       request(`/users/${id}`, {
//         method: 'PUT',  
//         data: { status: selectedStatus.id }, // Using the status ID
//       })
//     ));
    
//     message.success('Users status updated successfully');
//     fetchUsers(); // Assuming this function fetches the updated user list
//     setSelectedRowKeys([]); // Clear selection
//     setSelectedStatus(undefined); // Clear selected status
//   } catch (error) {
//     message.error('Failed to update status');
//   }
// };

const handleActionButtonClick = (userId: string, action: string) => {
  const status = STATUS_OPTIONS.find(option => option.name === action)?.id;
  if (status) {
    handleStatusChange(userId, status);
  } else {  
    message.error('Invalid status');
  }
};

const handleStatusChange = async () => {
  if (!selectedStatus) {
    message.error('Please select a status.');
    return;
  }

  const statusId = typeof selectedStatus === 'object' ? selectedStatus.id : selectedStatus;

  try {
    console.log('Selected Status ID:', statusId);
    console.log('Selected User IDs:', selectedRowKeys);

    await Promise.all(selectedRowKeys.map(id =>
      request(`/users/${id}`, {
        method: 'PUT',
        data: { status: status }, // Use the status ID
      })
    ));
    
    message.success('Users status updated successfully');
    fetchUsers(); // Fetch the updated user list
    setSelectedRowKeys([]); // Clear the selected row keys
    setSelectedStatus(undefined); // Clear the selected status
  } catch (error) {
    console.error('Error updating status:', error);
    message.error('Failed to update status');
  }
};

    const columns: ProColumns<User>[] = [
      {
        title: 'Select',
        dataIndex: 'select',
        key: 'select',
        render: (_, record) => (
          <input
            type="checkbox"
            checked={selectedRowKeys.includes(record.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRowKeys([...selectedRowKeys, record.id]);
              } else {
                setSelectedRowKeys(selectedRowKeys.filter(id => id !== record.id));
              }
            }}
          />
        ),
      },
      {
        title: 'Display Name',
        dataIndex: 'display_name',
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
      { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('MMMM Do, YYYY, h:mm:ss A [UTC]') },
    ];
  
    return (
      <div style={{ padding: '24px', backgroundColor: '#fff' }}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={6}>
            <Card bordered>
              <Title level={4}>Total Users</Title>
              <div style={{ fontSize: '24px' }}>{users.length}</div>
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
          dataSource={users}
          rowKey="id"
          headerTitle="Users Table"
          search={false}
          options={false}
          toolBarRender={() => [
            <Button
              key="add"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setIsEditing(false);
                setIsModalVisible(true);
              }}
            >
              Add User
            </Button>,
            <Button
              key="delete"
              icon={<DeleteOutlined />}
              type="danger"
              onClick={handleDeleteSelectedUsers}
              disabled={selectedRowKeys.length === 0}
            >
              Delete Selected
            </Button>,
           <div key="statusActions" style={{ display: 'flex', justifyContent: 'space-between' }}>
           {STATUS_OPTIONS.map((status) => (
             <Button
               key={status.id}
               onClick={() => handleStatusChange(status.id)}
               disabled={selectedRowKeys.length === 0}
             >
               {status.name}
             </Button>
           ))}
         </div>,
        
            // <ProFormSelect
            //   key="statusSelect"
            //   name="status"
            //   label="Select Status"
            //   options={statusOptions.map((status) => ({ label: status.name, value: status.name }))}
            //   onChange={setSelectedStatus}
            //   style={{ width: '200px' }}
            // />,
          ]}
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelection,
          }}
        />
        <Modal
          title={isEditing ? 'Edit User' : 'Add User'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={isEditing ? { ...selectedUser } : {}}
          >
            <Form.Item
              label="Display Name"
              name="display_name"
              rules={[{ required: true, message: 'Please input display name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              <Input />
            </Form.Item>
            {!isEditing && (
              <>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input username!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="password_confirmation"
                  rules={[{ required: true, message: 'Please confirm password!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            )}
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select>
                {statusOptions.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.id}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Roles"
              name="roles"
              rules={[{ required: true, message: 'Please select roles!' }]}
            >
              <Select mode="multiple">
                {roleOptions.map((role) => (
                  <Select.Option key={role.name} value={role.name}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default Users;
  