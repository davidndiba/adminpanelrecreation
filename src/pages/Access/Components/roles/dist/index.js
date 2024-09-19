"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var icons_1 = require("@ant-design/icons");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var Option = antd_1.Select.Option;
var Roles = function () {
    var _a = react_1.useState([]), roles = _a[0], setRoles = _a[1];
    var _b = react_1.useState(null), selectedRole = _b[0], setSelectedRole = _b[1];
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1];
    var _d = react_1.useState(false), isEditing = _d[0], setIsEditing = _d[1];
    var form = antd_1.Form.useForm()[0];
    var _e = react_1.useState([]), allPermissions = _e[0], setAllPermissions = _e[1];
    var _f = react_1.useState(false), loadingPermissions = _f[0], setLoadingPermissions = _f[1];
    // Fetch roles
    var fetchRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/roles')];
                case 1:
                    response = _a.sent();
                    setRoles(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    antd_1.message.error('Failed to fetch roles');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Fetch permissions
    var fetchPermissions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, permissionsData, permissions, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingPermissions(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, umi_1.request('/permissions')];
                case 2:
                    response = _a.sent();
                    permissionsData = response.data.data;
                    permissions = permissionsData.map(function (perm) { return ({
                        id: perm.id,
                        name: perm.name
                    }); });
                    setAllPermissions(permissions);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to fetch permissions');
                    return [3 /*break*/, 5];
                case 4:
                    setLoadingPermissions(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchRoles();
        fetchPermissions();
    }, []);
    // Handle add role
    var handleAddRole = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, error_3, errorMessage;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    payload = __assign(__assign({}, values), { permissions: (values === null || values === void 0 ? void 0 : values.permissions) || [] });
                    return [4 /*yield*/, umi_1.request('/roles', {
                            method: 'POST',
                            data: payload
                        })];
                case 1:
                    _c.sent();
                    antd_1.message.success('Role added successfully');
                    fetchRoles();
                    setIsModalVisible(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    errorMessage = ((_b = (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to add role';
                    antd_1.message.error(errorMessage);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle edit role
    var handleEditRole = function (id, values) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, error_4, errorMessage;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    payload = __assign(__assign({}, values), { permissions: values.permissions || [] });
                    return [4 /*yield*/, umi_1.request("/roles/" + id, {
                            method: 'PUT',
                            data: payload
                        })];
                case 1:
                    _c.sent();
                    antd_1.message.success('Role updated successfully');
                    fetchRoles();
                    setIsModalVisible(false);
                    setSelectedRole(null);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _c.sent();
                    errorMessage = ((_b = (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to update role';
                    antd_1.message.error(errorMessage);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle delete role
    var handleDeleteRole = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/roles/" + id, {
                            method: 'DELETE'
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Role deleted successfully');
                    fetchRoles();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to delete role');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle view role
    var handleViewRole = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/roles/" + id)];
                case 1:
                    response = _a.sent();
                    setSelectedRole(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    antd_1.message.error('Failed to fetch role details');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Status mapping
    var statusMap = {
        active: 'Active',
        pending: 'Pending',
        archived: 'Archived'
    };
    var columns = [
        { title: 'Role', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', render: function (text) { return (text ? 'Yes' : 'No'); } },
        { title: 'Can Be Deleted', dataIndex: 'can_be_deleted', key: 'can_be_deleted', render: function (text) { return (text ? 'Yes' : 'No'); } },
        { title: 'Status', dataIndex: 'status', key: 'status', render: function (text) { return statusMap[text] || 'Unknown'; } },
        {
            title: 'Permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            render: function (permissions) { return (react_1["default"].createElement(react_1["default"].Fragment, null, permissions.map(function (permissionId) {
                var perm = allPermissions.find(function (p) { return p.id === permissionId; });
                return perm ? react_1["default"].createElement("div", { key: permissionId }, perm.name) : null;
            }))); }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () {
                        setIsEditing(true);
                        setSelectedRole(record);
                        form.setFieldsValue(__assign(__assign({}, record), { permissions: record.permissions.map(function (p) { return ({ id: p }); }) }));
                        setIsModalVisible(true);
                    } }),
                react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete this role?", onConfirm: function () { return handleDeleteRole(record.id); }, okText: "Yes", cancelText: "No" },
                    react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.DeleteOutlined, null) })))); }
        },
    ];
    var stats = {
        totalRoles: roles.length,
        activeRoles: roles.filter(function (role) { return role.status === 'active'; }).length,
        pendingRoles: roles.filter(function (role) { return role.status === 'pending'; }).length,
        archivedRoles: roles.filter(function (role) { return role.status === 'archived'; }).length
    };
    return (react_1["default"].createElement("div", { style: { padding: '24px', backgroundColor: '#fff' } },
        react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#e6f7ff', color: '#1890ff' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Total Roles"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.totalRoles),
                    react_1["default"].createElement(icons_1.UserOutlined, { style: { fontSize: '36px', color: '#1890ff' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#f6ffed', color: '#52c41a' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Active Roles"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.activeRoles),
                    react_1["default"].createElement(icons_1.TeamOutlined, { style: { fontSize: '36px', color: '#52c41a' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fff7e6', color: '#fa8c16' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Pending Roles"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.pendingRoles),
                    react_1["default"].createElement(icons_1.DatabaseOutlined, { style: { fontSize: '36px', color: '#faad14' } }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fffbe6', color: '#faad14' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Archived Roles"),
                    react_1["default"].createElement("div", { style: { fontSize: '24px', fontWeight: 'bold' } }, stats.archivedRoles),
                    react_1["default"].createElement(icons_1.FileDoneOutlined, { style: { fontSize: '36px', color: '#ff4d4f' } })))),
        react_1["default"].createElement(pro_components_1.ProTable, { columns: columns, dataSource: roles, rowKey: "id", search: false, toolBarRender: function () { return [
                react_1["default"].createElement(antd_1.Button, { key: "add", type: "primary", 
                    // icon={<PlusOutlined />}
                    icon: react_1["default"].createElement(icons_1.PlusOutlined, null), style: {
                        backgroundColor: '#6c5ce7',
                        color: '#ffffff',
                        borderColor: '#6c5ce7'
                    }, onClick: function () {
                        setIsEditing(false);
                        form.resetFields();
                        setIsModalVisible(true);
                    } }, "Add New Role"),
            ]; } }),
        react_1["default"].createElement(antd_1.Modal, { title: isEditing ? 'Edit Role' : 'Add Role', visible: isModalVisible, onCancel: function () {
                setIsModalVisible(false);
                setSelectedRole(null);
            }, footer: null },
            react_1["default"].createElement(antd_1.Form, { form: form, onFinish: function (values) {
                    if (isEditing && selectedRole) {
                        handleEditRole(selectedRole.id, values);
                    }
                    else {
                        handleAddRole(values);
                    }
                }, layout: "vertical", initialValues: { permissions: [] } },
                react_1["default"].createElement(antd_1.Form.Item, { name: "name", label: "Role Name", rules: [{ required: true, message: 'Please input the role name!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { name: "description", label: "Description", rules: [{ required: true, message: 'Please input the role description!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { name: "is_default", valuePropName: "checked", label: "Default Role" },
                    react_1["default"].createElement(antd_1.Checkbox, null)),
                react_1["default"].createElement(antd_1.Form.Item, { name: "permissions", label: "Permissions", rules: [{ required: true, message: 'Please select at least one permission!' }] },
                    react_1["default"].createElement(antd_1.Select, { mode: "multiple", placeholder: "Select permissions", loading: loadingPermissions }, allPermissions.map(function (permission) { return (react_1["default"].createElement(Option, { key: permission.id, value: permission.id }, permission.name)); }))),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, isEditing ? 'Update Role' : 'Add Role'))))));
};
exports["default"] = Roles;
