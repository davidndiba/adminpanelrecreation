"use strict";
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// // const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1'; 
// // Define types for permission data
// interface Permission {
//   id: string;
//   permission: string;
//   description: string;
// }
// const Permissions: React.FC = () => {
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   // Fetch all permissions
//   const fetchPermissions = async () => {
//     try {
//       const response = await request(`/permissions`, {
//         method: 'GET',
//         headers: { Accept: 'application/json' },
//       });
//       setPermissions(response.data);
//     } catch (error) {
//       message.error('Failed to fetch permissions');
//     }
//   };
//   useEffect(() => {
//     fetchPermissions();
//   }, []);
//   // Handle add permission
//   const handleAddPermission = async (values: any) => {
//     try {
//       await request(`/permissions`, {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Permission added successfully');
//       fetchPermissions();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add permission');
//     }
//   };
//   // Handle edit permission
//   const handleEditPermission = async (id: string, values: any) => {
//     try {
//       await request(`/permissions/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Permission updated successfully');
//       fetchPermissions();
//       setSelectedPermission(null);
//     } catch (error) {
//       message.error('Failed to update permission');
//     }
//   };
//   // Handle delete permission
//   const handleDeletePermission = async (id: string) => {
//     try {
//       await request(`/permissions/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('Permission deleted successfully');
//       fetchPermissions();
//     } catch (error) {
//       message.error('Failed to delete permission');
//     }
//   };
//   // Handle select permission
//   const handleSelectPermission = async (id: string) => {
//     try {
//       const response = await request(`/permissions/${id}`, {
//         method: 'GET',
//         headers: { Accept: 'application/json' },
//       });
//       setSelectedPermission(response.data);
//     } catch (error) {
//       message.error('Failed to fetch permission details');
//     }
//   };
//   // Handle modal submit
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then(values => {
//         if (isEditing && selectedPermission) {
//           handleEditPermission(selectedPermission.id, values);
//         } else {
//           handleAddPermission(values);
//         }
//       })
//       .catch(info => {
//         console.log('Validate Failed:', info);
//       });
//   };
//   // Handle modal cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };
//   const columns: ProColumns<Permission>[] = [
//     { title: 'Permission', dataIndex: 'permission', key: 'permission' },
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
//               setSelectedPermission(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this permission?"
//             onConfirm={() => handleDeletePermission(record.id)}
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
//     <div>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedPermission(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//       >
//         Add Permission
//       </Button>
//       {selectedPermission && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected Permission</h2>
//           <p><strong>Permission:</strong> {selectedPermission.permission}</p>
//           <p><strong>Description:</strong> {selectedPermission.description}</p>
//           {/* Display more details as needed */}
//         </div>
//       )}
//       <ProTable<Permission>
//         columns={columns}
//         dataSource={permissions}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => handleSelectPermission(record.id),
//         })}
//       />
//       <Modal
//         title={isEditing ? 'Edit Permission' : 'Add Permission'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="permission"
//             label="Permission"
//             rules={[{ required: true, message: 'Please enter the permission!' }]}
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
// export default Permissions;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// // Define types for permission data
// interface Permission {
//   id: string;
//   name: string;
//   description: string | null;
//   module: string | null;
//   created_at: string;
//   updated_at: string;
//   created_by: string | null;
//   updated_by: string | null;
// }
// const Permissions: React.FC = () => {
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   // Fetch all permissions
//   const fetchPermissions = async () => {
//     try {
//       const response = await request(`/permissions`, {
//         method: 'GET',
//         headers: { Accept: 'application/json' },
//       });
//       // Check if response data and data.data exist
//       if (response.data && Array.isArray(response.data.data)) {
//         setPermissions(response.data.data);
//       } else {
//         message.error('Unexpected response format');
//       }
//     } catch (error) {
//       message.error('Failed to fetch permissions');
//     }
//   };
//   useEffect(() => {
//     fetchPermissions();
//   }, []);
//   // Handle add permission
//   const handleAddPermission = async (values: any) => {
//     try {
//       await request(`/permissions`, {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Permission added successfully');
//       fetchPermissions();
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to add permission');
//     }
//   };
//   // Handle edit permission
//   const handleEditPermission = async (id: string, values: any) => {
//     try {
//       await request(`/permissions/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Permission updated successfully');
//       fetchPermissions();
//       setSelectedPermission(null);
//     } catch (error) {
//       message.error('Failed to update permission');
//     }
//   };
//   // Handle delete permission
//   const handleDeletePermission = async (id: string) => {
//     try {
//       await request(`/permissions/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('Permission deleted successfully');
//       fetchPermissions();
//     } catch (error) {
//       message.error('Failed to delete permission');
//     }
//   };
//   // Handle select permission
//   const handleSelectPermission = async (id: string) => {
//     try {
//       const response = await request(`/permissions/${id}`, {
//         method: 'GET',
//         headers: { Accept: 'application/json' },
//       });
//       setSelectedPermission(response.data);
//     } catch (error) {
//       message.error('Failed to fetch permission details');
//     }
//   };
//   // Handle modal submit
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then(values => {
//         if (isEditing && selectedPermission) {
//           handleEditPermission(selectedPermission.id, values);
//         } else {
//           handleAddPermission(values);
//         }
//       })
//       .catch(info => {
//         console.log('Validate Failed:', info);
//       });
//   };
//   // Handle modal cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };
//   const columns: ProColumns<Permission>[] = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Module', dataIndex: 'module', key: 'module' },
//     { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
//     { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at' },
//     { title: 'Created By', dataIndex: 'created_by', key: 'created_by' },
//     { title: 'Updated By', dataIndex: 'updated_by', key: 'updated_by' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setIsEditing(true);
//               setSelectedPermission(record);
//               form.setFieldsValue(record);
//               setIsModalVisible(true);
//             }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this permission?"
//             onConfirm={() => handleDeletePermission(record.id)}
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
//     <div>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedPermission(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
//       >
//         Add Permission
//       </Button>
//       {selectedPermission && (
//         <div style={{ marginTop: 16 }}>
//           <h2>Selected Permission</h2>
//           <p><strong>Name:</strong> {selectedPermission.name}</p>
//           <p><strong>Description:</strong> {selectedPermission.description}</p>
//           <p><strong>Module:</strong> {selectedPermission.module}</p>
//           <p><strong>Created At:</strong> {selectedPermission.created_at}</p>
//           <p><strong>Updated At:</strong> {selectedPermission.updated_at}</p>
//           <p><strong>Created By:</strong> {selectedPermission.created_by}</p>
//           <p><strong>Updated By:</strong> {selectedPermission.updated_by}</p>
//           {/* Display more details as needed */}
//         </div>
//       )}
//       <ProTable<Permission>
//         columns={columns}
//         dataSource={permissions}
//         rowKey="id"
//         onRow={(record) => ({
//           onClick: () => handleSelectPermission(record.id),
//         })}
//       />
//       <Modal
//         title={isEditing ? 'Edit Permission' : 'Add Permission'}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: 'Please enter the name!' }]}
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
//           <Form.Item
//             name="module"
//             label="Module"
//             rules={[{ required: true, message: 'Please enter the module!' }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };
// export default Permissions;
// import React, { useState, useEffect } from 'react';
// import { Table, Checkbox, Button, message, Modal } from 'antd';
// import { request, useRequest } from 'umi';
// interface Role {
//   id: string;
//   name: string;
// }
// interface Permission {
//   id: string;
//   name: string;
// }
// const PermissionsManagement: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [permissionsByRole, setPermissionsByRole] = useState<Record<string, Set<string>>>({});
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const {data} = useRequest(()=>request(`/permissions`))
//   console.log(data)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch roles
//         const rolesResponse = await request('/roles', { method: 'GET' });
//         setRoles(rolesResponse.data || []);
//         // Fetch permissions
//         const permissionsResponse = await request('/permissions', { method: 'GET' });
//         const fetchedPermissions = Array.isArray(permissionsResponse.data) ? permissionsResponse.data : [];
//         setPermissions(fetchedPermissions);
//         // Fetch role-permissions mapping
//         // const rolePermissionsResponse = await request('/role-permissions', { method: 'GET' });
//         const rolePermissions = rolePermissionsResponse.data.reduce((acc: Record<string, Set<string>>, item: any) => {
//           if (!acc[item.role_id]) acc[item.role_id] = new Set();
//           acc[item.role_id].add(item.permission_id);
//           return acc;
//         }, {});
//         setPermissionsByRole(rolePermissions);
//       } catch (error) {
//         message.error('Failed to fetch data');
//       }
//     };
//     fetchData();
//   }, []);
//   const handleCheckboxChange = async (roleId: string, permissionId: string, checked: boolean) => {
//     try {
//       // Fetch current permissions for the role
//       const rolePermissions = permissionsByRole[roleId] || new Set<string>();
//       // Update permissions based on checkbox state
//       const updatedPermissions = new Set(rolePermissions);
//       if (checked) {
//         updatedPermissions.add(permissionId);
//       } else {
//         updatedPermissions.delete(permissionId);
//       }
//       // Send the updated permissions to the server
//       await request(`/roles/${roleId}`, {
//         method: 'PUT',
//         data: {
//           permissions: Array.from(updatedPermissions),
//         },
//       });
//       // Update state with the new permissions
//       setPermissionsByRole(prev => ({
//         ...prev,
//         [roleId]: updatedPermissions,
//       }));
//       message.success('Permissions updated successfully');
//     } catch (error) {
//       message.error('Failed to update permissions');
//     }
//   };
// const rowStyle = {
//   borderBottom: '1px solid #e8e8e8'
// }
//   // Table columns
//   // const columns = [
//   //   {
//   //     title: 'Permission',
//   //     dataIndex: 'name',
//   //     key: 'name',
//   //     render: (text: string) => <span>{text}</span>,
//   //   },
//   //   ...roles.map(role => ({
//   //     title: role.name,
//   //     key: role.id,
//   //     render: (permission: Permission) => {
//   //      console.log(role?.permissions?.filter((v)=>v?.id===permission?.id).length > 0)
//   //       return<Checkbox
//   //           checked={role?.permissions?.filter((v)=>v?.id===permission?.id).length > 0}
//   //         // checked={permissionsByRole[role.id]?.has(permission.id) || false}
//   //         onChange={(e) => handleCheckboxChange(role.id, permission.id, e.target.checked)}
//   //       />
//   //     },
//   //   })),
//   // ];
//   const columns = [
//     {
//       title: 'Permission',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text: string) => <span>{text}</span>,
//     },
//     ...roles.map(role => ({
//       title: role.name,
//       key: role.id,
//       render: (permission: Permission) => {
//         return (
//           <Checkbox
//             checked={permissionsByRole[role.id]?.has(permission.id) || false}
//             onChange={(e) => handleCheckboxChange(role.id, permission.id, e.target.checked)}
//           />
//         );
//       },
//     })),
//   ];
//   // Data source for table
//   const dataSource = permissions.map(permission => ({
//     key: permission.id,
//     ...permission,
//   }));
// console.log(permissions)
//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => setIsModalVisible(true)}
//       >
//         Manage Permissions
//       </Button>
//       <Table
//         dataSource={data?.data}
//         columns={columns}
//         pagination={false}
//         scroll={{ x: 'max-content' }}
//         rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
//         style={{ border: '1px solid #f0f0f0', borderRadius: '4px' }} // Table border and rounded corners
//       />
//       <Modal
//         title="Manage Permissions"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//       </Modal>
//     </div>
//   );
// };
// export default PermissionsManagement;
// import React, { useState, useEffect } from 'react';
// import { Table, Checkbox, Button, message, Modal } from 'antd';
// import { request } from 'umi';
// interface Role {
//   id: string;
//   name: string;
// }
// interface Permission {
//   id: string;
//   name: string;
// }
// const PermissionsManagement: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [permissionsByRole, setPermissionsByRole] = useState<Record<string, Set<string>>>({});
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch roles
//         const rolesResponse = await request('/roles', { method: 'GET' });
//         if (!rolesResponse.data) {
//           throw new Error('No roles data');
//         }
//         setRoles(rolesResponse.data);
//         // Fetch permissions
//         const permissionsResponse = await request('/permissions', { method: 'GET' });
//         if (!permissionsResponse.data || !permissionsResponse.data.data || !Array.isArray(permissionsResponse.data.data)) {
//           throw new Error('Invalid permissions data');
//         }
//         setPermissions(permissionsResponse.data.data);
//         // Initialize permissionsByRole with default values
//         const initialPermissionsByRole = rolesResponse.data.reduce((acc: Record<string, Set<string>>, role: Role) => {
//           acc[role.id] = new Set(); // Initialize with empty Set
//           return acc;
//         }, {});
//         setPermissionsByRole(initialPermissionsByRole);
//       } catch (error) {
//         message.error(`Failed to fetch data: ${error.message}`);
//       }
//     };
//     fetchData();
//   }, []);
//   // const handleCheckboxChange = async (roleId: string, permissionId: string, checked: boolean) => {
//   //   try {
//   //     // Fetch current permissions for the role
//   //     const rolePermissions = permissionsByRole[roleId] || new Set<string>();
//   //     // Update permissions based on checkbox state
//   //     const updatedPermissions = new Set(rolePermissions);
//   //     if (checked) {
//   //       updatedPermissions.add(permissionId);
//   //     } else {
//   //       updatedPermissions.delete(permissionId);
//   //     }
//   //     // Send the updated permissions to the server
//   //     await request(`/roles/${roleId}`, {
//   //       method: 'PUT',
//   //       data: {
//   //         permissions: Array.from(updatedPermissions),
//   //       },
//   //     });
//   //     // Update state with the new permissions
//   //     setPermissionsByRole(prev => ({
//   //       ...prev,
//   //       [roleId]: updatedPermissions,
//   //     }));
//   //     message.success('Permissions updated successfully');
//   //   } catch (error) {
//   //     message.error(`Failed to update permissions: ${error.message}`);
//   //   }
//   // };
//   const handleCheckboxChange = async (roleId: string, permissionId: string, checked: boolean) => {
//     try {
//       // Fetch current permissions for the role
//       const rolePermissions = permissionsByRole[roleId] || new Set<string>();
//       // Update permissions based on checkbox state
//       const updatedPermissions = new Set(rolePermissions);
//       if (checked) {
//         updatedPermissions.add(permissionId);
//       } else {
//         updatedPermissions.delete(permissionId);
//       }
//       // Send the updated permissions to the server
//       const response = await request(`/roles/${roleId}`, {
//         method: 'PUT',
//         data: {
//           permissions: Array.from(updatedPermissions),
//         },
//       });
//       // Check if the response is successful and contains updated data
//       if (response.success) {
//         // Update state with the new permissions
//         setPermissionsByRole(prev => ({
//           ...prev,
//           [roleId]: updatedPermissions,
//         }));
//         message.success('Permissions updated successfully');
//         // Refetch data to ensure frontend reflects updates
//         await fetchData(); // Make sure fetchData() is implemented to refetch the roles and permissions
//       } else {
//         throw new Error(response.message || 'Failed to update permissions');
//       }
//     } catch (error) {
//       message.error(`Failed to update permissions: ${error.message}`);
//     }
//   };
//   const columns = [
//     {
//       title: 'Permission',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text: string) => <span>{text}</span>,
//     },
//     ...roles.map(role => ({
//       title: role.name,
//       key: role.id,
//       render: (permission: Permission) => (
//         <Checkbox
//           checked={permissionsByRole[role.id]?.has(permission.id) || false}
//           onChange={(e) => handleCheckboxChange(role.id, permission.id, e.target.checked)}
//         />
//       ),
//     })),
//   ];
//   const dataSource = permissions.map(permission => ({
//     key: permission.id,
//     ...permission,
//   }));
//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => setIsModalVisible(true)}
//       >
//         Manage Permissions
//       </Button>
//       <Table
//         dataSource={dataSource}
//         columns={columns}
//         pagination={false}
//         scroll={{ x: 'max-content' }}
//         rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
//         style={{ border: '1px solid #f0f0f0', borderRadius: '4px' }} // Table border and rounded corners
//       />
//       <Modal
//         title="Manage Permissions"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {/* Modal content here */}
//       </Modal>
//     </div>
//   );
// };
// export default PermissionsManagement;
var react_1 = require("react");
var antd_1 = require("antd");
var umi_1 = require("umi");
var PermissionsManagement = function () {
    var _a = react_1.useState([]), roles = _a[0], setRoles = _a[1];
    var _b = react_1.useState([]), permissions = _b[0], setPermissions = _b[1];
    var _c = react_1.useState({}), permissionsByRole = _c[0], setPermissionsByRole = _c[1];
    var _d = react_1.useState(false), isModalVisible = _d[0], setIsModalVisible = _d[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var rolesResponse, permissionsResponse, initialPermissionsByRole, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, umi_1.request('/roles', { method: 'GET' })];
                    case 1:
                        rolesResponse = _a.sent();
                        if (!rolesResponse.data) {
                            throw new Error('No roles data');
                        }
                        setRoles(rolesResponse.data);
                        return [4 /*yield*/, umi_1.request('/permissions', { method: 'GET' })];
                    case 2:
                        permissionsResponse = _a.sent();
                        if (!permissionsResponse.data || !permissionsResponse.data.data || !Array.isArray(permissionsResponse.data.data)) {
                            throw new Error('Invalid permissions data');
                        }
                        setPermissions(permissionsResponse.data.data);
                        initialPermissionsByRole = rolesResponse.data.reduce(function (acc, role) {
                            acc[role.id] = new Set(); // Initialize with empty Set
                            return acc;
                        }, {});
                        setPermissionsByRole(initialPermissionsByRole);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        antd_1.message.error("Failed to fetch data: " + error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var rolesResponse, permissionsResponse, updatedPermissionsByRole, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, umi_1.request('/roles', { method: 'GET' })];
                case 1:
                    rolesResponse = _a.sent();
                    if (!rolesResponse.data) {
                        throw new Error('No roles data');
                    }
                    setRoles(rolesResponse.data);
                    return [4 /*yield*/, umi_1.request('/permissions', { method: 'GET' })];
                case 2:
                    permissionsResponse = _a.sent();
                    if (!permissionsResponse.data || !permissionsResponse.data.data || !Array.isArray(permissionsResponse.data.data)) {
                        throw new Error('Invalid permissions data');
                    }
                    setPermissions(permissionsResponse.data.data);
                    updatedPermissionsByRole = rolesResponse.data.reduce(function (acc, role) {
                        acc[role.id] = new Set(); // Initialize with empty Set
                        return acc;
                    }, {});
                    setPermissionsByRole(updatedPermissionsByRole);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    antd_1.message.error("Failed to fetch data: " + error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCheckboxChange = function (roleId, permissionId, checked) { return __awaiter(void 0, void 0, void 0, function () {
        var rolePermissions, updatedPermissions_1, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    rolePermissions = permissionsByRole[roleId] || new Set();
                    updatedPermissions_1 = new Set(rolePermissions);
                    if (checked) {
                        updatedPermissions_1.add(permissionId);
                    }
                    else {
                        updatedPermissions_1["delete"](permissionId);
                    }
                    return [4 /*yield*/, umi_1.request("/roles/" + roleId, {
                            method: 'PUT',
                            data: {
                                permissions: Array.from(updatedPermissions_1)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Server response:', response); // Log the server response for debugging
                    if (!response.success) return [3 /*break*/, 3];
                    // Update state with the new permissions
                    setPermissionsByRole(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[roleId] = updatedPermissions_1, _a)));
                    });
                    antd_1.message.success('Permissions updated successfully');
                    // Refetch data to ensure frontend reflects updates
                    return [4 /*yield*/, fetchData()];
                case 2:
                    // Refetch data to ensure frontend reflects updates
                    _a.sent(); // Make sure fetchData() is implemented to refetch the roles and permissions
                    return [3 /*break*/, 4];
                case 3: throw new Error(response.message || 'Failed to update permissions');
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    antd_1.message.error("Failed to update permissions: " + error_3.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var columns = __spreadArrays([
        {
            title: 'Permission',
            dataIndex: 'name',
            key: 'name',
            render: function (text) { return react_1["default"].createElement("span", null, text); }
        }
    ], roles.map(function (role) { return ({
        title: role.name,
        key: role.id,
        render: function (permission) {
            var _a;
            return (react_1["default"].createElement(antd_1.Checkbox, { checked: ((_a = permissionsByRole[role.id]) === null || _a === void 0 ? void 0 : _a.has(permission.id)) || false, onChange: function (e) { return handleCheckboxChange(role.id, permission.id, e.target.checked); } }));
        }
    }); }));
    var dataSource = permissions.map(function (permission) { return (__assign({ key: permission.id }, permission)); });
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.Table, { dataSource: dataSource, columns: columns, pagination: false, scroll: { x: 'max-content' }, rowClassName: function (record, index) { return index % 2 === 0 ? 'even-row' : 'odd-row'; }, style: { border: '1px solid #f0f0f0', borderRadius: '4px' } }),
        react_1["default"].createElement(antd_1.Modal, { title: "Manage Permissions", visible: isModalVisible, onCancel: function () { return setIsModalVisible(false); }, footer: null })));
};
exports["default"] = PermissionsManagement;
