// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Space, Modal, Form, Input, message, Popconfirm, Card, Col, Row, Typography } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, TeamOutlined, DatabaseOutlined, FileDoneOutlined } from '@ant-design/icons';

// const { Title } = Typography;

// interface Role {
//   id: string;
//   role: string;
//   description: string;
// }

// const Roles: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch roles
//   const fetchRoles = async () => {
//     try {
//       const response = await request(`/roles`);
//       setRoles(response.data);
//     } catch (error) {
//       message.error('Failed to fetch roles');
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // Handle add role
//   const handleAddRole = async (values: any) => {
//     try {
//       await request(`/roles`, {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Role added successfully');
//       fetchRoles();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add role');
//     }
//   };

//   // Handle edit role
//   const handleEditRole = async (id: string, values: any) => {
//     try {
//       await request(`/roles/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Role updated successfully');
//       fetchRoles();
//       setSelectedRole(null);
//     } catch (error) {
//       message.error('Failed to update role');
//     }
//   };

//   // Handle delete role
//   const handleDeleteRole = async (id: string) => {
//     try {
//       await request(`/roles/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('Role deleted successfully');
//       fetchRoles();
//     } catch (error) {
//       message.error('Failed to delete role');
//     }
//   };

//   // Handle view role
//   const handleViewRole = async (id: string) => {
//     try {
//       const response = await request(`/roles/${id}`);
//       setSelectedRole(response.data);
//     } catch (error) {
//       message.error('Failed to fetch role details');
//     }
//   };

//   const columns: ProColumns<Role>[] = [
//     { title: 'Role', dataIndex: 'name', key: 'name' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedRole(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this role?"
//             onConfirm={() => handleDeleteRole(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   // Mock data for statistics
//   const stats = {
//     totalRoles: roles.length,
//     activeRoles: roles.filter(role => role.status === 'active').length,
//     pendingRoles: roles.filter(role => role.status === 'pending').length,
//     archivedRoles: roles.filter(role => role.status === 'archived').length,
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalRoles}</div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activeRoles}</div>
//             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingRoles}</div>
//             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Archived Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.archivedRoles}</div>
//             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Roles Table */}
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedRole(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//         style={{ marginBottom: '16px' }}
//       >
//         Add Role
//       </Button>
//       <ProTable<Role>
//         columns={columns}
//         dataSource={roles}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => handleViewRole(record.id),
//         })}
//       />
//       {selectedRole && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected Role</h2>
//           <p><strong>Role:</strong> {selectedRole.role}</p>
//           <p><strong>Description:</strong> {selectedRole.description}</p>
//         </div>
//       )}
//       <Modal
//         title={isEditing ? 'Edit Role' : 'Add Role'}
//         visible={isModalVisible}
//         onOk={() => {
//           form
//             .validateFields()
//             .then(values => {
//               if (isEditing) {
//                 handleEditRole(selectedRole!.id, values);
//               } else {
//                 handleAddRole(values);
//               }
//             })
//             .catch(info => {
//               console.log('Validate Failed:', info);
//             });
//         }}
//         onCancel={() => {
//           setIsModalVisible(false);
//           form.resetFields();
//         }}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="role"
//             label="Role"
//             rules={[{ required: true, message: 'Please enter the role!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: 'Please enter the description!' }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Roles;
// import {
//   DatabaseOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   FileDoneOutlined,
//   PlusOutlined,
//   TeamOutlined,
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
// import React, { useEffect, useState } from 'react';
// import { request } from 'umi';

// const { Title } = Typography;

// interface Role {
//   id: string;
//   role: string;
//   description: string;
//   status: string; // Assuming status is a part of the Role interface
// }

// const Roles: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch roles
//   const fetchRoles = async () => {
//     try {
//       const response = await request('/roles');
//       setRoles(response.data); // Update state with new roles data
//     } catch (error) {
//       message.error('Failed to fetch roles');
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // Handle add role
//   const handleAddRole = async (values: any) => {
//     try {
//       await request('/roles', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Role added successfully');
//       fetchRoles(); // Refresh roles list
//       setIsModalVisible(false); // Close modal
//     } catch (error) {
//       message.error('Failed to add role');
//     }
//   };

//   // Handle edit role
//   const handleEditRole = async (id: string, values: any) => {
//     try {
//       await request(`/roles/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Role updated successfully');
//       fetchRoles(); // Refresh roles list
//       setIsModalVisible(false); // Close modal
//       setSelectedRole(null); // Clear selected role
//     } catch (error) {
//       message.error('Failed to update role');
//     }
//   };

//   // Handle delete role
//   const handleDeleteRole = async (id: string) => {
//     try {
//       await request(`/roles/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('Role deleted successfully');
//       fetchRoles(); // Refresh roles list
//     } catch (error) {
//       message.error('Failed to delete role');
//     }
//   };

//   // Handle view role
//   const handleViewRole = async (id: string) => {
//     try {
//       const response = await request(`/roles/${id}`);
//       setSelectedRole(response.data);
//     } catch (error) {
//       message.error('Failed to fetch role details');
//     }
//   };

//   const columns: ProColumns<Role>[] = [
//     { title: 'Role', dataIndex: 'name', key: 'name' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedRole(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this role?"
//             onConfirm={() => handleDeleteRole(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   // Mock data for statistics
//   const stats = {
//     totalRoles: roles.length,
//     activeRoles: roles.filter((role) => role.status === 'active').length,
//     pendingRoles: roles.filter((role) => role.status === 'pending').length,
//     archivedRoles: roles.filter((role) => role.status === 'archived').length,
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.totalRoles}
//             </div>
//             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.activeRoles}
//             </div>
//             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.pendingRoles}
//             </div>
//             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Archived Roles</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {stats.archivedRoles}
//             </div>
//             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Roles Table */}
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedRole(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//         style={{ marginBottom: '16px' }}
//       >
//         Add Role
//       </Button>
//       <ProTable<Role>
//         columns={columns}
//         dataSource={roles}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => handleViewRole(record.id),
//         })}
//       />
//       {selectedRole && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected Role</h2>
//           <p>
//             <strong>Role:</strong> {selectedRole?.name}
//           </p>
//           <p>
//             <strong>Description:</strong> {selectedRole?.description}
//           </p>
//         </div>
//       )}
//       <Modal
//         title={isEditing ? 'Edit Role' : 'Add Role'}
//         visible={isModalVisible}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               if (isEditing && selectedRole) {
//                 handleEditRole(selectedRole.id, values);
//               } else {
//                 handleAddRole(values);
//               }
//             })
//             .catch((info) => {
//               console.log('Validate Failed:', info);
//             });
//         }}
//         onCancel={() => {
//           setIsModalVisible(false);
//           form.resetFields();
//         }}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="role"
//             label="Role"
//             rules={[{ required: true, message: 'Please enter the role!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               { required: true, message: 'Please enter the description!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Roles;
  // import {
  //   DatabaseOutlined,
  //   DeleteOutlined,
  //   EditOutlined,
  //   FileDoneOutlined,
  //   PlusOutlined,
  //   TeamOutlined,
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
  // import React, { useEffect, useState } from 'react';
  // import { request } from 'umi';

  // const { Title } = Typography;

  // interface Role {
  //   id: string;
  //   name: string;
  //   description: string;
  //   is_default: boolean;
  //   can_be_deleted: boolean;
  //   permissions: string[];
  //   status?: string; // Optional field for status
  // }

  // const Roles: React.FC = () => {
  //   const [roles, setRoles] = useState<Role[]>([]);
  //   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();

  //   // Fetch roles
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await request('/roles');
  //       setRoles(response.data); // Update state with new roles data
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };

  //   useEffect(() => {
  //     fetchRoles();
  //   }, []);

  //   // Handle add role
  //   const handleAddRole = async (values: any) => {
  //     try {
  //       // Ensure permissions is an array of strings
  //       values.permissions = values.permissions.split(',').map((p: string) => p.trim());

  //       await request('/roles', {
  //         method: 'POST',
  //         data: values,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to add role';
  //       message.error(errorMessage);
  //     }
  //   };

  //   // Handle edit role
  //   const handleEditRole = async (id: string, values: any) => {
  //     try {
  //       // Ensure permissions is an array of strings
  //       values.permissions = values.permissions.split(',').map((p: string) => p.trim());

  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: values,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //       setSelectedRole(null); // Clear selected role
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to update role';
  //       message.error(errorMessage);
  //     }
  //   };

  //   // Handle delete role
  //   const handleDeleteRole = async (id: string) => {
  //     try {
  //       await request(`/roles/${id}`, {
  //         method: 'DELETE',
  //       });
  //       message.success('Role deleted successfully');
  //       fetchRoles(); // Refresh roles list
  //     } catch (error) {
  //       message.error('Failed to delete role');
  //     }
  //   };

  //   // Handle view role
  //   const handleViewRole = async (id: string) => {
  //     try {
  //       const response = await request(`/roles/${id}`);
  //       setSelectedRole(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch role details');
  //     }
  //   };

  //   const columns: ProColumns<Role>[] = [
  //     { title: 'Role', dataIndex: 'name', key: 'name' },
  //     { title: 'Description', dataIndex: 'description', key: 'description' },
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text.join(', ') },
  //     {
  //       title: 'Actions',
  //       key: 'actions',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <Button
  //             icon={<EditOutlined />}
  //             onClick={() => {
  //               setIsEditing(true);
  //               setSelectedRole(record);
  //               form.setFieldsValue({
  //                 ...record,
  //                 permissions: record.permissions.join(', '), // Convert array to comma-separated string
  //               });
  //               setIsModalVisible(true);
  //             }}
  //           />
  //           <Popconfirm
  //             title="Are you sure you want to delete this role?"
  //             onConfirm={() => handleDeleteRole(record.id)}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <Button icon={<DeleteOutlined />} />
  //           </Popconfirm>
  //         </Space>
  //       ),
  //     },
  //   ];

  //   // Mock data for statistics
  //   const stats = {
  //     totalRoles: roles.length,
  //     activeRoles: roles.filter((role) => role.status === 'active').length,
  //     pendingRoles: roles.filter((role) => role.status === 'pending').length,
  //     archivedRoles: roles.filter((role) => role.status === 'archived').length,
  //   };

  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>

  //       {/* Roles Table */}
  //       <Button
  //         type="primary"
  //         icon={<PlusOutlined />}
  //         onClick={() => {
  //           setIsEditing(false);
  //           setSelectedRole(null);
  //           form.resetFields();
  //           setIsModalVisible(true);
  //         }}
  //         style={{ marginBottom: '16px' }}
  //       >
  //         Add Role
  //       </Button>
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         onRow={(record) => ({
  //           onClick: () => handleViewRole(record.id),
  //         })}
  //       />
  //       {selectedRole && (
  //         <div style={{ marginTop: 16 }}>
  //           <h2>Selected Role</h2>
  //           <p>
  //             <strong>Role:</strong> {selectedRole?.name}
  //           </p>
  //           <p>
  //             <strong>Description:</strong> {selectedRole?.description}
  //           </p>
  //           <p>
  //             <strong>Is Default:</strong> {selectedRole?.is_default ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Can Be Deleted:</strong> {selectedRole?.can_be_deleted ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Permissions:</strong> {selectedRole?.permissions.join(', ')}
  //           </p>
  //         </div>
  //       )}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onOk={() => {
  //           form
  //             .validateFields()
  //             .then((values) => {
  //               if (isEditing && selectedRole) {
  //                 handleEditRole(selectedRole.id, values);
  //               } else {
  //                 handleAddRole(values);
  //               }
  //             })
  //             .catch((info) => {
  //               console.log('Validate Failed:', info);
  //             });
  //         }}
  //         onCancel={() => {
  //           setIsModalVisible(false);
  //           form.resetFields();
  //         }}
  //         destroyOnClose
  //       >
  //         <Form form={form} layout="vertical">
  //           <Form.Item
  //             name="name"
  //             label="Role"
  //             rules={[{ required: true, message: 'Please enter the role!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //             rules={[{ required: true, message: 'Please enter a description!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="is_default"
  //             label="Is Default"
  //             valuePropName="checked"
  //           >
  //             <Input type="checkbox" />
  //           </Form.Item>
  //           <Form.Item
  //             name="can_be_deleted"
  //             label="Can Be Deleted"
  //             valuePropName="checked"
  //           >
  //             <Input type="checkbox" />
  //           </Form.Item>
  //           <Form.Item
  //             name="permissions"
  //             label="Permissions"
  //             rules={[{ required: true, message: 'Please enter at least one permission!' }]}
  //           >
  //             <Input placeholder="Comma-separated permissions" />
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default Roles;
  // import {
  //   DatabaseOutlined,
  //   DeleteOutlined,
  //   EditOutlined,
  //   FileDoneOutlined,
  //   PlusOutlined,
  //   TeamOutlined,
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
  // import React, { useEffect, useState } from 'react';
  // import { request } from 'umi';
  
  // const { Title } = Typography;
  
  // interface Role {
  //   id: string;
  //   name: string;
  //   description: string;
  //   is_default: boolean;
  //   can_be_deleted: boolean;
  //   permissions: string[];
  //   status?: string; // Optional field for status
  // }
  
  // const Roles: React.FC = () => {
  //   const [roles, setRoles] = useState<Role[]>([]);
  //   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();
  
  //   // Fetch roles
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await request('/roles');
  //       setRoles(response.data); // Update state with new roles data
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchRoles();
  //   }, []);
  
  //   // Handle add role
  //   const handleAddRole = async (values: any) => {
  //     try {
  //       // Convert permissions from comma-separated string to an array
  //       values.permissions = values.permissions.split(',').map((p: string) => p.trim());
  
  //       await request('/roles', {
  //         method: 'POST',
  //         data: values,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to add role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle edit role
  //   const handleEditRole = async (id: string, values: any) => {
  //     try {
  //       // Convert permissions from comma-separated string to an array
  //       values.permissions = values.permissions.split(',').map((p: string) => p.trim());
  
  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: values,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //       setSelectedRole(null); // Clear selected role
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to update role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle delete role
  //   const handleDeleteRole = async (id: string) => {
  //     try {
  //       await request(`/roles/${id}`, {
  //         method: 'DELETE',
  //       });
  //       message.success('Role deleted successfully');
  //       fetchRoles(); // Refresh roles list
  //     } catch (error) {
  //       message.error('Failed to delete role');
  //     }
  //   };
  
  //   // Handle view role
  //   const handleViewRole = async (id: string) => {
  //     try {
  //       const response = await request(`/roles/${id}`);
  //       setSelectedRole(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch role details');
  //     }
  //   };
  
  //   const columns: ProColumns<Role>[] = [
  //     { title: 'Role', dataIndex: 'name', key: 'name' },
  //     { title: 'Description', dataIndex: 'description', key: 'description' },
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text.join(', ') },
  //     {
  //       title: 'Actions',
  //       key: 'actions',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <Button
  //             icon={<EditOutlined />}
  //             onClick={() => {
  //               setIsEditing(true);
  //               setSelectedRole(record);
  //               form.setFieldsValue({
  //                 ...record,
  //                 permissions: record.permissions.join(', '), // Convert array to comma-separated string
  //               });
  //               setIsModalVisible(true);
  //             }}
  //           />
  //           <Popconfirm
  //             title="Are you sure you want to delete this role?"
  //             onConfirm={() => handleDeleteRole(record.id)}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <Button icon={<DeleteOutlined />} />
  //           </Popconfirm>
  //         </Space>
  //       ),
  //     },
  //   ];
  
  //   // Mock data for statistics
  //   const stats = {
  //     totalRoles: roles.length,
  //     activeRoles: roles.filter((role) => role.status === 'active').length,
  //     pendingRoles: roles.filter((role) => role.status === 'pending').length,
  //     archivedRoles: roles.filter((role) => role.status === 'archived').length,
  //   };
  
  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>
  
  //       {/* Roles Table */}
  //       <Button
  //         type="primary"
  //         icon={<PlusOutlined />}
  //         onClick={() => {
  //           setIsEditing(false);
  //           setSelectedRole(null);
  //           form.resetFields();
  //           setIsModalVisible(true);
  //         }}
  //         style={{ marginBottom: '16px' }}
  //       >
  //         Add Role
  //       </Button>
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         onRow={(record) => ({
  //           onClick: () => handleViewRole(record.id),
  //         })}
  //       />
  //       {selectedRole && (
  //         <div style={{ marginTop: 16 }}>
  //           <h2>Selected Role</h2>
  //           <p>
  //             <strong>Role:</strong> {selectedRole?.name}
  //           </p>
  //           <p>
  //             <strong>Description:</strong> {selectedRole?.description}
  //           </p>
  //           <p>
  //             <strong>Is Default:</strong> {selectedRole?.is_default ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Can Be Deleted:</strong> {selectedRole?.can_be_deleted ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Permissions:</strong> {selectedRole?.permissions.join(', ')}
  //           </p>
  //         </div>
  //       )}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onOk={() => {
  //           form
  //             .validateFields()
  //             .then((values) => {
  //               if (isEditing && selectedRole) {
  //                 handleEditRole(selectedRole.id, values);
  //               } else {
  //                 handleAddRole(values);
  //               }
  //             })
  //             .catch((info) => {
  //               console.log('Validate Failed:', info);
  //             });
  //         }}
  //         onCancel={() => {
  //           setIsModalVisible(false);
  //           form.resetFields();
  //         }}
  //         destroyOnClose
  //       >
  //         <Form form={form} layout="vertical">
  //           <Form.Item
  //             name="name"
  //             label="Role"
  //             rules={[{ required: true, message: 'Please enter role name' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //             rules={[{ required: true, message: 'Please enter description' }]}
  //           >
  //             <Input.TextArea rows={4} />
  //           </Form.Item>
  //           <Form.Item
  //             name="is_default"
  //             label="Is Default"
  //             valuePropName="checked"
  //           >
  //             <Input type="checkbox" />
  //           </Form.Item>
  //           <Form.Item
  //             name="can_be_deleted"
  //             label="Can Be Deleted"
  //             valuePropName="checked"
  //           >
  //             <Input type="checkbox" />
  //           </Form.Item>
  //           <Form.Item
  //             name="permissions"
  //             label="Permissions"
  //             rules={[{ required: true, message: 'Please enter permissions' }]}
  //           >
  //             <Input placeholder="Comma-separated values" />
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };
  
  // export default Roles;
  // import {
  //   DatabaseOutlined,
  //   DeleteOutlined,
  //   EditOutlined,
  //   FileDoneOutlined,
  //   PlusOutlined,
  //   TeamOutlined,
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
  //   Checkbox,
  // } from 'antd';
  // import React, { useEffect, useState } from 'react';
  // import { request } from 'umi';
  
  // const { Title } = Typography;
  
  // interface Role {
  //   id: string;
  //   name: string;
  //   description: string;
  //   is_default: boolean;
  //   can_be_deleted: boolean;
  //   permissions: string[];
  //   status?: string; // Optional field for status
  // }
  
  // const Roles: React.FC = () => {
  //   const [roles, setRoles] = useState<Role[]>([]);
  //   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();
  //   const [allPermissions, setAllPermissions] = useState<any[]>([]); // Load all permissions for the checkboxes
  
  //   // Fetch roles
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await request('/roles');
  //       setRoles(response.data); // Update state with new roles data
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   // Fetch permissions
  //   const fetchPermissions = async () => {
  //     try {
  //       const response = await request('/permissions'); // Assuming there's an endpoint to get all permissions
  //       setAllPermissions(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch permissions');
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchRoles();
  //     fetchPermissions();
  //   }, []);
  
  //   // Handle add role
  //   const handleAddRole = async (values: any) => {
  //     try {
  //       const payload = {
  //         ...values,
  //         permissions: values.permissions.filter((p: any) => p).map((p: any) => p.id), // Convert permissions to array of IDs
  //       };
  
  //       await request('/roles', {
  //         method: 'POST',
  //         data: payload,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to add role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle edit role
  //   const handleEditRole = async (id: string, values: any) => {
  //     try {
  //       const payload = {
  //         ...values,
  //         permissions: values.permissions.filter((p: any) => p).map((p: any) => p.id), // Convert permissions to array of IDs
  //       };
  
  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: payload,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles(); // Refresh roles list
  //       setIsModalVisible(false); // Close modal
  //       setSelectedRole(null); // Clear selected role
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to update role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle delete role
  //   const handleDeleteRole = async (id: string) => {
  //     try {
  //       await request(`/roles/${id}`, {
  //         method: 'DELETE',
  //       });
  //       message.success('Role deleted successfully');
  //       fetchRoles(); // Refresh roles list
  //     } catch (error) {
  //       message.error('Failed to delete role');
  //     }
  //   };
  
  //   // Handle view role
  //   const handleViewRole = async (id: string) => {
  //     try {
  //       const response = await request(`/roles/${id}`);
  //       setSelectedRole(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch role details');
  //     }
  //   };
  
  //   const columns: ProColumns<Role>[] = [
  //     { title: 'Role', dataIndex: 'name', key: 'name' },
  //     { title: 'Description', dataIndex: 'description', key: 'description' },
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text.join(', ') },
  //     {
  //       title: 'Actions',
  //       key: 'actions',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <Button
  //             icon={<EditOutlined />}
  //             onClick={() => {
  //               setIsEditing(true);
  //               setSelectedRole(record);
  //               form.setFieldsValue({
  //                 ...record,
  //                 permissions: record.permissions.map((p: any) => ({ id: p })), // Set permissions for editing
  //               });
  //               setIsModalVisible(true);
  //             }}
  //           />
  //           <Popconfirm
  //             title="Are you sure you want to delete this role?"
  //             onConfirm={() => handleDeleteRole(record.id)}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <Button icon={<DeleteOutlined />} />
  //           </Popconfirm>
  //         </Space>
  //       ),
  //     },
  //   ];
  
  //   // Mock data for statistics
  //   const stats = {
  //     totalRoles: roles.length,
  //     activeRoles: roles.filter((role) => role.status === 'active').length,
  //     pendingRoles: roles.filter((role) => role.status === 'pending').length,
  //     archivedRoles: roles.filter((role) => role.status === 'archived').length,
  //   };
  
  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>
  
  //       {/* Roles Table */}
  //       <Button
  //         type="primary"
  //         icon={<PlusOutlined />}
  //         onClick={() => {
  //           setIsEditing(false);
  //           setSelectedRole(null);
  //           form.resetFields();
  //           setIsModalVisible(true);
  //         }}
  //         style={{ marginBottom: '16px', float: 'right' }}
  //       >
  //         Add Role
  //       </Button>
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         onRow={(record) => ({
  //           onClick: () => handleViewRole(record.id),
  //         })}
  //       />
  //       {selectedRole && (
  //         <div style={{ marginTop: 16 }}>
  //           <h2>Selected Role</h2>
  //           <p>
  //             <strong>Role:</strong> {selectedRole?.name}
  //           </p>
  //           <p>
  //             <strong>Description:</strong> {selectedRole?.description}
  //           </p>
  //           <p>
  //             <strong>Is Default:</strong> {selectedRole?.is_default ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Can Be Deleted:</strong> {selectedRole?.can_be_deleted ? 'Yes' : 'No'}
  //           </p>
  //           <p>
  //             <strong>Permissions:</strong> {selectedRole?.permissions.join(', ')}
  //           </p>
  //         </div>
  //       )}
  
  //       {/* Role Form Modal */}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onCancel={() => setIsModalVisible(false)}
  //         footer={null}
  //       >
  //         <Form
  //           form={form}
  //           layout="vertical"
  //           onFinish={isEditing ? (values) => handleEditRole(selectedRole!.id, values) : handleAddRole}
  //         >
  //           <Form.Item
  //             name="name"
  //             label="Role Name"
  //             rules={[{ required: true, message: 'Please input the role name!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //           >
  //             <Input.TextArea />
  //           </Form.Item>
  //           <Form.Item
  //             name="is_default"
  //             label="Is Default"
  //             valuePropName="checked"
  //           >
  //             <Checkbox />
  //           </Form.Item>
  //           <Form.Item
  //             name="permissions"
  //             label="Permissions"
  //             rules={[{ required: true, message: 'Please select permissions!' }]}
  //           >
  //             <Checkbox.Group options={allPermissions.map((perm) => ({ label: perm.name, value: perm.id }))} />
  //           </Form.Item>
  //           <Form.Item>
  //             <Button type="primary" htmlType="submit">
  //               {isEditing ? 'Update Role' : 'Add Role'}
  //             </Button>
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };
  
  // export default Roles;
  import {
    DatabaseOutlined,
    DeleteOutlined,
    EditOutlined,
    FileDoneOutlined,
    PlusOutlined,
    TeamOutlined,
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
    Checkbox,
  } from 'antd';
  import React, { useEffect, useState } from 'react';
  import { request } from 'umi';
  
  const { Title } = Typography;
  const { Option } = Select;
  
  interface Role {
    id: string;
    name: string;
    description: string;
    is_default: boolean;
    can_be_deleted: boolean;
    is_deleted: boolean;
    permissions: string[];
    status?: string;
  }
  
  interface Permission {
    id: string;
    name: string;
  }
  
  const Roles: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [loadingPermissions, setLoadingPermissions] = useState(false);
  
    // Fetch roles
    const fetchRoles = async () => {
      try {
        const response = await request('/roles');
        setRoles(response.data);
      } catch (error) {
        message.error('Failed to fetch roles');
      }
    };
  
    // Fetch permissions
    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const response = await request('/permissions');
        const permissionsData = response.data.data; // Accessing the array of permissions
        const permissions = permissionsData.map((perm: any) => ({
          id: perm.id,
          name: perm.name,
        }));
        setAllPermissions(permissions);
      } catch (error) {
        message.error('Failed to fetch permissions');
      } finally {
        setLoadingPermissions(false);
      }
    };
  
    useEffect(() => {
      fetchRoles();
      fetchPermissions();
    }, []);
  
    // Handle add role
    const handleAddRole = async (values: any) => {
      try {
        // Filter out null values and map permissions to their IDs
        console.log(values?.permissions)
        const payload = {
          ...values,
          permission: values?.permissions 
        };
  
        await request('/roles', {
          method: 'POST',
          data: payload,
        });
        message.success('Role added successfully');
        fetchRoles();
        setIsModalVisible(false);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Failed to add role';
        message.error(errorMessage);
      }
    };
  
    // Handle edit role
    const handleEditRole = async (id: string, values: any) => {
      try {
        // Filter out null values and map permissions to their IDs
        const payload = {
          ...values,
          permissions: values.permissions ? values.permissions.map((p: any) => p.id).filter(Boolean) : [],
        };
  
        await request(`/roles/${id}`, {
          method: 'PUT',
          data: payload,
        });
        message.success('Role updated successfully');
        fetchRoles();
        setIsModalVisible(false);
        setSelectedRole(null);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Failed to update role';
        message.error(errorMessage);
      }
    };
  
    // Handle delete role
    const handleDeleteRole = async (id: string) => {
      try {
        await request(`/roles/${id}`, {
          method: 'DELETE',
        });
        message.success('Role deleted successfully');
        fetchRoles();
      } catch (error) {
        message.error('Failed to delete role');
      }
    };
  
    // Handle view role
    const handleViewRole = async (id: string) => {
      try {
        const response = await request(`/roles/${id}`);
        setSelectedRole(response.data);
      } catch (error) {
        message.error('Failed to fetch role details');
      }
    };
  
    const columns: ProColumns<Role>[] = [
      { title: 'Role', dataIndex: 'name', key: 'name' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
      { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
      { title: 'Is Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (text) => (text ? 'Yes' : 'No') },
      { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text?.map((t)=>t?.name)?.join(", ") },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setIsEditing(true);
                setSelectedRole(record);
                form.setFieldsValue({
                  ...record,
                  permissions: record.permissions.map((p: any) => ({ id: p })),
                });
                setIsModalVisible(true);
              }}
            />
            <Popconfirm
              title="Are you sure you want to delete this role?"
              onConfirm={() => handleDeleteRole(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  
    const stats = {
      totalRoles: roles.length,
      activeRoles: roles.filter((role) => role.status === 'active').length,
      pendingRoles: roles.filter((role) => role.status === 'pending').length,
      archivedRoles: roles.filter((role) => role.status === 'archived').length,
    };
  
    return (
      <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={6}>
            <Card bordered>
              <Title level={4}>Total Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.totalRoles}
              </div>
              <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered>
              <Title level={4}>Active Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.activeRoles}
              </div>
              <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered>
              <Title level={4}>Pending Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.pendingRoles}
              </div>
              <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered>
              <Title level={4}>Archived Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.archivedRoles}
              </div>
              <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
            </Card>
          </Col>
        </Row>
  
        {/* Roles Table */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsEditing(false);
            setSelectedRole(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
          style={{ marginBottom: '16px', float: 'right' }}
        >
          Add Role
        </Button>
        <ProTable<Role>
          columns={columns}
          dataSource={roles}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleViewRole(record.id),
          })}
        />
        {selectedRole && (
          <div style={{ marginTop: '24px' }}>
            <Title level={4}>Role Details</Title>
            <p>
              <strong>Name:</strong> {selectedRole.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedRole.description}
            </p>
            <p>
              <strong>Is Default:</strong> {selectedRole.is_default ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Can Be Deleted:</strong> {selectedRole.can_be_deleted ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Is Deleted:</strong> {selectedRole.is_deleted ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Permissions:</strong> {selectedRole.permissions.join(', ')}
            </p>
          </div>
        )}
  
        {/* Modal Form */}
        <Modal
          title={isEditing ? 'Edit Role' : 'Add Role'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            onFinish={(values) => {
              if (isEditing && selectedRole) {
                handleEditRole(selectedRole.id, values);
              } else {
                handleAddRole(values);
              }
            }}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Role Name"
              rules={[{ required: true, message: 'Please input the role name!' }]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
  
            <Form.Item
              name="is_default"
              label="Is Default"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
  
            <Form.Item
              name="can_be_deleted"
              label="Can Be Deleted"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
  
            <Form.Item
              name="permissions"
              label="Permissions"
              rules={[{ required: true, message: 'Please select permissions!' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select Permissions"
                loading={loadingPermissions}
                options={allPermissions.map((perm) => ({ label: perm.name, value: perm.id }))}
              />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {isEditing ? 'Update Role' : 'Add Role'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default Roles;
  // import {
  //   DatabaseOutlined,
  //   DeleteOutlined,
  //   EditOutlined,
  //   FileDoneOutlined,
  //   PlusOutlined,
  //   TeamOutlined,
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
  // import React, { useEffect, useState } from 'react';
  // import { request } from 'umi';
  
  // const { Title } = Typography;
  // const { Option } = Select;
  
  // interface Role {
  //   id: string;
  //   name: string;
  //   description: string;
  //   is_default: boolean;
  //   can_be_deleted: boolean;
  //   is_deleted: boolean;
  //   permissions: string[];
  //   status?: string;
  // }
  
  // interface Permission {
  //   id: string;
  //   name: string;
  // }
  
  // const Roles: React.FC = () => {
  //   const [roles, setRoles] = useState<Role[]>([]);
  //   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [form] = Form.useForm();
  //   const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  //   const [loadingPermissions, setLoadingPermissions] = useState(false);
  
  //   // Fetch roles
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await request('/roles');
  //       console.log('Roles response:', response); // Debugging
  //       if (Array.isArray(response.data)) {
  //         setRoles(response.data);
  //       } else {
  //         message.error('Roles data is not in expected format');
  //       }
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   // Fetch permissions
  //   const fetchPermissions = async () => {
  //     setLoadingPermissions(true);
  //     try {
  //       const response = await request('/permissions');
  //       console.log('Permissions response:', response); // Debugging
  //       if (Array.isArray(response.data)) {
  //         setAllPermissions(response.data);
  //       } else {
  //         message.error('Permissions data is not in expected format');
  //       }
  //     } catch (error) {
  //       message.error('Failed to fetch permissions');
  //     } finally {
  //       setLoadingPermissions(false);
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchRoles();
  //     fetchPermissions();
  //   }, []);
  
  //   // Handle add role
  //   const handleAddRole = async (values: any) => {
  //     try {
  //       const payload = {
  //         name: values.name,
  //         description: values.description,
  //         permissions: values.permissions ? values.permissions.filter(Boolean) : [], // Ensure no undefined values
  //       };
  
  //       const response = await request('/roles', {
  //         method: 'POST',
  //         data: payload,
  //       });
  
  //       if (response.success) {
  //         message.success('Role added successfully');
  //         fetchRoles();
  //         setIsModalVisible(false);
  //       } else {
  //         message.error(response.message || 'Failed to add role');
  //       }
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to add role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle edit role
  //   const handleEditRole = async (id: string, values: any) => {
  //     try {
  //       const payload = {
  //         name: values.name,
  //         description: values.description,
  //         permissions: values.permissions ? values.permissions.filter(Boolean) : [], // Ensure no undefined values
  //       };
  
  //       const response = await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: payload,
  //       });
  
  //       if (response.success) {
  //         message.success('Role updated successfully');
  //         fetchRoles();
  //         setIsModalVisible(false);
  //         setSelectedRole(null);
  //       } else {
  //         message.error(response.message || 'Failed to update role');
  //       }
  //     } catch (error) {
  //       const errorMessage = error?.response?.data?.message || 'Failed to update role';
  //       message.error(errorMessage);
  //     }
  //   };
  
  //   // Handle delete role
  //   const handleDeleteRole = async (id: string) => {
  //     try {
  //       const response = await request(`/roles/${id}`, {
  //         method: 'DELETE',
  //       });
  
  //       if (response.success) {
  //         message.success('Role deleted successfully');
  //         fetchRoles();
  //       } else {
  //         message.error(response.message || 'Failed to delete role');
  //       }
  //     } catch (error) {
  //       message.error('Failed to delete role');
  //     }
  //   };
  
  //   // Handle view role
  //   const handleViewRole = async (id: string) => {
  //     try {
  //       const response = await request(`/roles/${id}`);
  //       setSelectedRole(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch role details');
  //     }
  //   };
  
  //   const columns: ProColumns<Role>[] = [
  //     { title: 'Role', dataIndex: 'name', key: 'name' },
  //     { title: 'Description', dataIndex: 'description', key: 'description' },
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Is Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text.join(', ') },
  //     {
  //       title: 'Actions',
  //       key: 'actions',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <Button
  //             icon={<EditOutlined />}
  //             onClick={() => {
  //               setIsEditing(true);
  //               setSelectedRole(record);
  //               form.setFieldsValue({
  //                 ...record,
  //                 permissions: record.permissions.map((p: any) => p.id), // Populate permissions correctly
  //               });
  //               setIsModalVisible(true);
  //             }}
  //           />
  //           <Popconfirm
  //             title="Are you sure you want to delete this role?"
  //             onConfirm={() => handleDeleteRole(record.id)}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <Button icon={<DeleteOutlined />} />
  //           </Popconfirm>
  //         </Space>
  //       ),
  //     },
  //   ];
  
  //   const stats = {
  //     totalRoles: roles.length,
  //     activeRoles: roles.filter((role) => role.status === 'active').length,
  //     pendingRoles: roles.filter((role) => role.status === 'pending').length,
  //     archivedRoles: roles.filter((role) => role.status === 'archived').length,
  //   };
  
  //   return (
  //     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>
  
  //       {/* Roles Table */}
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         search={false}
  //         toolBarRender={() => [
  //           <Button
  //             type="primary"
  //             icon={<PlusOutlined />}
  //             onClick={() => {
  //               setIsEditing(false);
  //               setSelectedRole(null);
  //               form.resetFields();
  //               setIsModalVisible(true);
  //             }}
  //           >
  //             Add Role
  //           </Button>,
  //         ]}
  //       />
  
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onCancel={() => setIsModalVisible(false)}
  //         footer={null}
  //       >
  //         <Form
  //           form={form}
  //           layout="vertical"
  //           onFinish={isEditing ? (values) => selectedRole && handleEditRole(selectedRole.id, values) : handleAddRole}
  //         >
  //           <Form.Item
  //             name="name"
  //             label="Role Name"
  //             rules={[{ required: true, message: 'Please input the role name!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //             rules={[{ required: true, message: 'Please input the description!' }]}
  //           >
  //             <Input.TextArea rows={4} />
  //           </Form.Item>
  //           <Form.Item name="permissions" label="Permissions">
  //             <Select
  //               mode="multiple"
  //               placeholder="Select permissions"
  //               loading={loadingPermissions}
  //               allowClear
  //             >
  //               {allPermissions.map((perm) => (
  //                 <Option key={perm.id} value={perm.id}>
  //                   {perm.name}
  //                 </Option>
  //               ))}
  //             </Select>
  //           </Form.Item>
  //           <Form.Item>
  //             <Button type="primary" htmlType="submit">
  //               {isEditing ? 'Update Role' : 'Add Role'}
  //             </Button>
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // };
  
  // export default Roles;
  