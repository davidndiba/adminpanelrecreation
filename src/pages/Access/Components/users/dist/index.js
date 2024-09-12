"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
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
var icons_1 = require("@ant-design/icons");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var moment_1 = require("moment");
var react_1 = require("react");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var dateStr = '2024-09-04T13:20:23.000000Z';
var formattedDate = moment_1["default"](dateStr).format('MMMM Do, YYYY, h:mm:ss A [UTC]');
console.log(formattedDate);
var Users = function () {
    var _a = react_1.useState([]), users = _a[0], setUsers = _a[1];
    var _b = react_1.useState(null), selectedUser = _b[0], setSelectedUser = _b[1];
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1];
    var _d = react_1.useState(false), isEditing = _d[0], setIsEditing = _d[1];
    var form = antd_1.Form.useForm()[0];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    var statusOptions = react_1.useState(['Active', 'Inactive', 'Pending'])[0];
    var _f = react_1.useState([]), roleOptions = _f[0], setRoleOptions = _f[1]; // Initially empty
    // Fetch users
    var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/users")];
                case 1:
                    response = _a.sent();
                    setUsers(response.data.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    antd_1.message.error('Failed to fetch users');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Fetch roles
    var fetchRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/roles")];
                case 1:
                    response = _a.sent();
                    setRoleOptions(response.data.map(function (role) { return role.name; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to fetch roles');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchUsers();
        fetchRoles(); // Fetch roles when component mounts
    }, []);
    // Add user
    var handleAddUser = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var ipAddress, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, getIpAddress()];
                case 1:
                    ipAddress = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4 /*yield*/, umi_1.request("/auth/register", {
                            method: 'POST',
                            data: {
                                email: values.email,
                                display_name: values.display_name,
                                username: values.username,
                                password: values.password,
                                password_confirmation: values.password_confirmation,
                                ip_address: ipAddress,
                                status: values.status || 'Active',
                                roles: values.roles || []
                            }
                        })];
                case 3:
                    _a.sent();
                    antd_1.message.success('User added successfully');
                    fetchUsers();
                    setIsModalVisible(false);
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to add user');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Get IP Address
    var getIpAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://api.ipify.org?format=json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.ip];
                case 3:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to get IP address');
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Edit user
    var handleEditUser = function (id, values) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/users/" + id, {
                            method: 'PUT',
                            data: {
                                display_name: values.display_name,
                                email: values.email,
                                status: values.status,
                                roles: values.roles
                            }
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('User updated successfully');
                    fetchUsers();
                    setSelectedUser(null);
                    setIsModalVisible(false); // Close modal after successful update
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to update user');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Delete user
    var handleDeleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/users/" + id, {
                            method: 'DELETE'
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('User deleted successfully');
                    fetchUsers();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    antd_1.message.error('Failed to delete user');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle modal submit
    var handleOk = function () {
        form
            .validateFields()
            .then(function (values) {
            if (isEditing) {
                handleEditUser(selectedUser.id, values);
            }
            else {
                handleAddUser(values);
            }
        })["catch"](function (info) {
            console.log('Validate Failed:', info);
        });
    };
    // Handle modal cancel
    var handleCancel = function () {
        setIsModalVisible(false);
        form.resetFields();
    };
    // Calculate statistics
    var calculateStats = function () {
        var totalUsers = users.length;
        // Filter users based on status with null checks
        var activeUsers = users.filter(function (user) { var _a; return ((_a = user.status) === null || _a === void 0 ? void 0 : _a.name) === 'Active'; }).length;
        var inactiveUsers = users.filter(function (user) { var _a; return ((_a = user.status) === null || _a === void 0 ? void 0 : _a.name) === 'Inactive'; }).length;
        var pendingUsers = users.filter(function (user) { var _a; return ((_a = user.status) === null || _a === void 0 ? void 0 : _a.name) === 'Pending'; }).length;
        return { totalUsers: totalUsers, activeUsers: activeUsers, inactiveUsers: inactiveUsers, pendingUsers: pendingUsers };
    };
    var stats = calculateStats();
    var columns = [
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: function (text) { return text || 'N/A'; }
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: function (status) { return status ? status.name : 'N/A'; }
        },
        { title: 'Role', dataIndex: 'roles', key: 'roles', render: function (roles) { return roles.join(', '); } },
        { title: 'Last Login', dataIndex: 'last_login', key: 'last_login', render: function (text) { return moment_1["default"](text).format('MMMM Do, YYYY, h:mm:ss A [UTC]'); } },
        { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () {
                        setIsEditing(true);
                        setSelectedUser(record);
                        form.setFieldsValue({
                            display_name: record.display_name,
                            email: record.email,
                            status: record.status.name,
                            roles: record.roles,
                            username: record.username
                        });
                        setIsModalVisible(true);
                    } }),
                react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete this user?", onConfirm: function () { return handleDeleteUser(record.id); }, okText: "Yes", cancelText: "No" },
                    react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.DeleteOutlined, null) })))); }
        },
    ];
    return (react_1["default"].createElement("div", { style: { padding: '24px', backgroundColor: '#f0f2f5' } },
        react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true },
                    react_1["default"].createElement(Title, { level: 4 }, "Total Users"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.totalUsers),
                    react_1["default"].createElement(icons_1.UserOutlined, { style: { fontSize: '36px', color: '#1890ff' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true },
                    react_1["default"].createElement(Title, { level: 4 }, "Active Users"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.activeUsers),
                    react_1["default"].createElement(icons_1.CheckCircleOutlined, { style: { fontSize: '36px', color: '#52c41a' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true },
                    react_1["default"].createElement(Title, { level: 4 }, "Inactive Users"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.inactiveUsers),
                    react_1["default"].createElement(icons_1.PauseCircleOutlined, { style: { fontSize: '36px', color: '#f5222d' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true },
                    react_1["default"].createElement(Title, { level: 4 }, "Pending Users"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.pendingUsers),
                    react_1["default"].createElement(icons_1.ClockCircleOutlined, { style: { fontSize: '36px', color: '#faad14' } })))),
        react_1["default"].createElement(antd_1.Row, { style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                " ",
                react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), onClick: function () {
                        setIsEditing(false);
                        setSelectedUser(null);
                        form.resetFields();
                        setIsModalVisible(true);
                    } }, "Add User"))),
        react_1["default"].createElement(pro_components_1.ProTable, { columns: columns, dataSource: users, rowKey: "id", pagination: { pageSize: 10 }, search: false }),
        react_1["default"].createElement(antd_1.Modal, { title: isEditing ? 'Edit User' : 'Add User', visible: isModalVisible, onOk: handleOk, onCancel: handleCancel, confirmLoading: loading, width: 800 },
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", name: "user_form", initialValues: selectedUser || {} },
                react_1["default"].createElement(antd_1.Row, { gutter: 16 },
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Display Name", name: "display_name", rules: [{ required: true, message: 'Please input the display name!' }] },
                            react_1["default"].createElement(antd_1.Input, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: 'Please input the username!' }] },
                            react_1["default"].createElement(antd_1.Input, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Role", name: "roles", rules: [{ required: true, message: 'Please select the role!' }] },
                            react_1["default"].createElement(antd_1.Select, { mode: "multiple" }, roleOptions.map(function (role) { return (react_1["default"].createElement(antd_1.Select.Option, { key: role, value: role }, role)); })))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Please input the password!' }] },
                            react_1["default"].createElement(antd_1.Input.Password, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Confirm Password", name: "password_confirmation", rules: [{ required: true, message: 'Please confirm the password!' }] },
                            react_1["default"].createElement(antd_1.Input.Password, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Please input the email!' }] },
                            react_1["default"].createElement(antd_1.Input, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Phone Number", name: "phone_number", rules: [{ required: true, message: 'Please input the phone number!' }] },
                            react_1["default"].createElement(antd_1.Input, null))),
                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Status", name: "status", rules: [{ required: true, message: 'Please select the status!' }] },
                            react_1["default"].createElement(antd_1.Select, null, statusOptions.map(function (status) { return (react_1["default"].createElement(antd_1.Select.Option, { key: status, value: status }, status)); })))))))));
};
exports["default"] = Users;
