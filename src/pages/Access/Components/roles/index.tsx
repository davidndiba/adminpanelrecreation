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
  //   Checkbox,
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
  //       setRoles(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   // Fetch permissions
  //   const fetchPermissions = async () => {
  //     setLoadingPermissions(true);
  //     try {
  //       const response = await request('/permissions');
  //       const permissionsData = response.data.data; // Accessing the array of permissions
  //       const permissions = permissionsData.map((perm: any) => ({
  //         id: perm.id,
  //         name: perm.name,
  //       }));
  //       setAllPermissions(permissions);
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
  //         ...values,
  //         permissions: values?.permissions || [],
  //       };
  
  //       await request('/roles', {
  //         method: 'POST',
  //         data: payload,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
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
  //         permission: values.permissions || [],
  //       };
  
  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: payload,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
  //       setSelectedRole(null);
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
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Is Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Permissions', dataIndex: 'permissions', key: 'permissions', render: (text) => text?.map((t)=>t?.name)?.join(", ") },
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
  //                 permissions: record.permissions.map((p: any) => ({ id: p })),
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
  //     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //         <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //         <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //         <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //         <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
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
  //         search={false}
  //         dataSource={roles}  
  //         rowKey="id"
  //         onRow={(record) => ({
  //           onClick: () => handleViewRole(record.id),
  //         })}
  //         bordered
  //         style={{
  //           border: '1px solid #d9d9d9', // Customize the table border color
  //         }}
  //         components={{
  //           header: {
  //             cell: (props) => (
  //               <th
  //                 {...props}
  //                 style={{
  //                   borderBottom: '2px solid #d9d9d9', // Customize the column line color
  //                 }}
  //               />
  //             ),
  //           },
  //           body: {
  //             cell: (props) => (
  //               <td
  //                 {...props}
  //                 style={{
  //                   borderBottom: '1px solid #d9d9d9', // Customize the row line color
  //                 }}
  //               />
  //             ),
  //           },
  //         }}
  //       />
  //       {selectedRole && (
  //         <div style={{ marginTop: '24px' }}>
  //           <Title level={4}>Role Details</Title>
  //           <Card>
  //             <p><strong>Name:</strong> {selectedRole.name}</p>
  //             <p><strong>Description:</strong> {selectedRole.description}</p>
  //             <p><strong>Is Default:</strong> {selectedRole.is_default ? 'Yes' : 'No'}</p>
  //             <p><strong>Can Be Deleted:</strong> {selectedRole.can_be_deleted ? 'Yes' : 'No'}</p>
  //             <p><strong>Is Deleted:</strong> {selectedRole.is_deleted ? 'Yes' : 'No'}</p>
  //             <p><strong>Permissions:</strong> {selectedRole.permissions.join(', ')}</p>
  //           </Card>
  //         </div>
  //       )}
  
  //       {/* Role Modal */}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onCancel={() => setIsModalVisible(false)}
  //         footer={null}
  //       >
  //         <Form
  //           form={form}
  //           onFinish={isEditing ? (values) => handleEditRole(selectedRole?.id || '', values) : handleAddRole}
  //           layout="vertical"
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
  //             <Input.TextArea rows={4} />
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
  //           >
  //             <Select
  //               mode="multiple"
  //               placeholder="Select permissions"
  //               loading={loadingPermissions}
  //             >
  //               {allPermissions.map((permission) => (
  //                 <Option key={permission.id} value={permission.id}>
  //                   {permission.name}
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
  //   Checkbox,
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
  //       setRoles(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   // Fetch permissions
  //   const fetchPermissions = async () => {
  //     setLoadingPermissions(true);
  //     try {
  //       const response = await request('/permissions');
  //       const permissionsData = response.data.data;
  //       const permissions = permissionsData.map((perm: any) => ({
  //         id: perm.id,
  //         name: perm.name,
  //       }));
  //       setAllPermissions(permissions);
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
  //         ...values,
  //         permissions: values?.permissions || [],
  //       };
  
  //       await request('/roles', {
  //         method: 'POST',
  //         data: payload,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
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
  //         permission: values.permissions || [],
  //       };
  
  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: payload,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
  //       setSelectedRole(null);
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
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Is Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Status', dataIndex: 'status', key: 'status' }, // Replaced Permissions with Status
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
  //                 permissions: record.permissions.map((p: any) => ({ id: p })),
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
  //     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>
  
  //       {/* Roles Table */}
  //       <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
  //         <Button
  //           type="primary"
  //           icon={<PlusOutlined />}
  //           onClick={() => {
  //             setIsEditing(false);
  //             setSelectedRole(null);
  //             form.resetFields();
  //             setIsModalVisible(true);
  //           }}
  //           style={{
  //             backgroundColor: '#6c5ce7',
  //             color: '#ffffff',
  //             borderColor: '#6c5ce7',// Lighter blue version
  //           }}
  //         >
  //           Add New Role
  //         </Button>
  //       </div>
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         pagination={{
  //           showQuickJumper: true,
  //         }}
  //         search={false}
  //         toolBarRender={false}
  //         style={{ border: 'none' }} // Removing border line
  //       />
  
  //       {/* Add/Edit Role Modal */}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onCancel={() => setIsModalVisible(false)}
  //         onOk={() => {
  //           form
  //             .validateFields()
  //             .then((values) => {
  //               if (selectedRole) {
  //                 handleEditRole(selectedRole.id, values);
  //               } else {
  //                 handleAddRole(values);
  //               }
  //             })
  //             .catch((info) => {
  //               console.log('Validate Failed:', info);
  //             });
  //         }}
  //       >
  //         <Form form={form} layout="vertical">
  //           <Form.Item
  //             label="Role Name"
  //             name="name"
  //             rules={[{ required: true, message: 'Please input the role name!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item label="Description" name="description">
  //             <Input.TextArea />
  //           </Form.Item>
  //           <Form.Item name="permissions" label="Permissions">
  //             <Checkbox.Group>
  //               <Row>
  //                 {allPermissions.map((permission) => (
  //                   <Col span={8} key={permission.id}>
  //                     <Checkbox value={permission.id}>{permission.name}</Checkbox>
  //                   </Col>
  //                 ))}
  //               </Row>
  //             </Checkbox.Group>
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
  //   Select,
  //   Space,
  //   Typography,
  //   Checkbox,
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
  //       setRoles(response.data);
  //     } catch (error) {
  //       message.error('Failed to fetch roles');
  //     }
  //   };
  
  //   // Fetch permissions
  //   const fetchPermissions = async () => {
  //     setLoadingPermissions(true);
  //     try {
  //       const response = await request('/permissions');
  //       const permissionsData = response.data.data;
  //       const permissions = permissionsData.map((perm: any) => ({
  //         id: perm.id,
  //         name: perm.name,
  //       }));
  //       setAllPermissions(permissions);
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
  // console.log('Fetched permissions:', allPermissions);

  //   // Handle add role
  //   const handleAddRole = async (values: any) => {
  //     try {
  //       const payload = {
  //         ...values,
  //         permissions: values?.permissions || [],
  //       };
  
  //       await request('/roles', {
  //         method: 'POST',
  //         data: payload,
  //       });
  //       message.success('Role added successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
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
  //         permissions: values.permissions || [],
  //       };
  
  //       await request(`/roles/${id}`, {
  //         method: 'PUT',
  //         data: payload,
  //       });
  //       message.success('Role updated successfully');
  //       fetchRoles();
  //       setIsModalVisible(false);
  //       setSelectedRole(null);
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
  
  //   // Status mapping
  //   const statusMap: Record<string, string> = {
  //     active: 'Active',
  //     pending: 'Pending',
  //     archived: 'Archived',
  //     // Add other status mappings as necessary
  //   };
  
  //   const columns: ProColumns<Role>[] = [
  //     { title: 'Role', dataIndex: 'name', key: 'name' },
  //     { title: 'Description', dataIndex: 'description', key: 'description' },
  //     { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
  //     { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => statusMap[text] || 'Unknown' }, // Map status ID to name
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
  //                 permissions: record.permissions.map((p: any) => ({ id: p })),
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
  //     <div style={{ padding: '24px', backgroundColor: '#fff' }}>
  //       {/* Statistics Cards */}
  //       <Row gutter={16} style={{ marginBottom: '16px' }}>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
  //             <Title level={4}>Total Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.totalRoles}
  //             </div>
  //             <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
  //             <Title level={4}>Active Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.activeRoles}
  //             </div>
  //             <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
  //             <Title level={4}>Pending Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.pendingRoles}
  //             </div>
  //             <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
  //           </Card>
  //         </Col>
  //         <Col span={6}>
  //           <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
  //             <Title level={4}>Archived Roles</Title>
  //             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  //               {stats.archivedRoles}
  //             </div>
  //             <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
  //           </Card>
  //         </Col>
  //       </Row>
  
  //       {/* Roles Table */}
  //       <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
  //         <Button
  //           type="primary"
  //           icon={<PlusOutlined />}
  //           onClick={() => {
  //             setIsEditing(false);
  //             setSelectedRole(null);
  //             form.resetFields();
  //             setIsModalVisible(true);
  //           }}
  //           style={{
  //             backgroundColor: '#6c5ce7',
  //             color: '#ffffff',
  //             borderColor: '#6c5ce7', // Lighter blue version
  //           }}
  //         >
  //           Add New Role
  //         </Button>
  //       </div>
  //       <ProTable<Role>
  //         columns={columns}
  //         dataSource={roles}
  //         rowKey="id"
  //         pagination={{
  //           showQuickJumper: true,
  //         }}
  //         search={false}
  //       />
  
  //       {/* Modal Form */}
  //       <Modal
  //         title={isEditing ? 'Edit Role' : 'Add Role'}
  //         visible={isModalVisible}
  //         onCancel={() => setIsModalVisible(false)}
  //         footer={null}
  //       >
  //         <Form
  //           form={form}
  //           onFinish={isEditing ? (values) => handleEditRole(selectedRole?.id!, values) : handleAddRole}
  //           layout="vertical"
  //         >
  //           <Form.Item
  //             label="Role Name"
  //             name="name"
  //             rules={[{ required: true, message: 'Please input the role name!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             label="Description"
  //             name="description"
  //             rules={[{ required: true, message: 'Please input the description!' }]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="permissions"
  //             label="Permissions"
  //             rules={[{ required: true, message: 'Please select permissions!' }]}
  //           >
  //             <Select mode="multiple" placeholder="Select permissions">
  //               {allPermissions.map((perm) => (
  //                 <Option key={perm.id} value={perm.id}>
  //                   {perm.name}
  //                 </Option>
  //               ))}
  //             </Select>
  //           </Form.Item>
  //           <Form.Item
  //             name="is_default"
  //             valuePropName="checked"
  //           >
  //             <Checkbox>Is Default</Checkbox>
  //           </Form.Item>
  //           <Form.Item
  //             name="can_be_deleted"
  //             valuePropName="checked"
  //           >
  //             <Checkbox>Can Be Deleted</Checkbox>
  //           </Form.Item>
  //           <Form.Item
  //             name="status"
  //             label="Status"
  //             rules={[{ required: true, message: 'Please select the status!' }]}
  //           >
  //             <Select>
  //               <Option value="active">Active</Option>
  //               <Option value="pending">Pending</Option>
  //               <Option value="archived">Archived</Option>
  //               {/* Add other status options as necessary */}
  //             </Select>
  //           </Form.Item>
  //           <Form.Item>
  //             <Button
  //               type="primary"
  //               htmlType="submit"
  //               style={{ backgroundColor: '#6c5ce7', color: '#ffffff' }}
  //             >
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
        const permissionsData = response.data.data;
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
        const payload = {
          ...values,
          permissions: values?.permissions || [],
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
        const payload = {
          ...values,
          permissions: values.permissions || [],
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
  
    // Status mapping
    const statusMap: Record<string, string> = {
      active: 'Active',
      pending: 'Pending',
      archived: 'Archived',
      // Add other status mappings as necessary
    };
  
    const columns: ProColumns<Role>[] = [
      { title: 'Role', dataIndex: 'name', key: 'name' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: (text) => (text ? 'Yes' : 'No') },
      { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: (text) => (text ? 'Yes' : 'No') },
      { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => statusMap[text] || 'Unknown' }, // Map status ID to name
      {
        title: 'Permissions',
        dataIndex: 'permissions',
        key: 'permissions',
        render: (permissions: string[]) => (
          <>
            {permissions.map((permissionId) => {
              const perm = allPermissions.find(p => p.id === permissionId);
              return perm ? <div key={permissionId}>{perm.name}</div> : null;
            })}
          </>
        ),
      },
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
      <div style={{ padding: '24px', backgroundColor: '#fff' }}>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={6}>
            <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
              <Title level={4}>Total Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.totalRoles}
              </div>
              <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
              <Title level={4}>Active Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.activeRoles}
              </div>
              <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
              <Title level={4}>Pending Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.pendingRoles}
              </div>
              <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
              <Title level={4}>Archived Roles</Title>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.archivedRoles}
              </div>
              <FileDoneOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
            </Card>
          </Col>
        </Row>
  
        {/* Table */}
        <ProTable<Role>
          columns={columns}
          dataSource={roles}
          rowKey="id"
          search={false}
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsEditing(false);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Add Role
            </Button>,
          ]}
        />
  
        {/* Modal */}
        <Modal
          title={isEditing ? 'Edit Role' : 'Add Role'}
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedRole(null);
          }}
          footer={null}
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
            initialValues={{ permissions: [] }}
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
              rules={[{ required: true, message: 'Please input the role description!' }]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item
              name="is_default"
              valuePropName="checked"
              label="Default Role"
            >
              <Checkbox />
            </Form.Item>
  
            <Form.Item
              name="permissions"
              label="Permissions"
              rules={[{ required: true, message: 'Please select at least one permission!' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select permissions"
                loading={loadingPermissions}
              >
                {allPermissions.map((permission) => (
                  <Option key={permission.id} value={permission.id}>
                    {permission.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEditing ? 'Update Role' : 'Add Role'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default Roles;
  