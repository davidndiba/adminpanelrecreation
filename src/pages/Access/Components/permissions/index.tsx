// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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
import React, { useState, useEffect } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
import { request } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// Define types for permission data
interface Permission {
  id: string;
  name: string;
  description: string | null;
  module: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

const Permissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Fetch all permissions
  const fetchPermissions = async () => {
    try {
      const response = await request(`/permissions`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      // Check if response data and data.data exist
      if (response.data && Array.isArray(response.data.data)) {
        setPermissions(response.data.data);
      } else {
        message.error('Unexpected response format');
      }
    } catch (error) {
      message.error('Failed to fetch permissions');
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Handle add permission
  const handleAddPermission = async (values: any) => {
    try {
      await request(`/permissions`, {
        method: 'POST',
        data: values,
      });
      message.success('Permission added successfully');
      fetchPermissions();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to add permission');
    }
  };

  // Handle edit permission
  const handleEditPermission = async (id: string, values: any) => {
    try {
      await request(`/permissions/${id}`, {
        method: 'PUT',
        data: values,
      });
      message.success('Permission updated successfully');
      fetchPermissions();
      setSelectedPermission(null);
    } catch (error) {
      message.error('Failed to update permission');
    }
  };

  // Handle delete permission
  const handleDeletePermission = async (id: string) => {
    try {
      await request(`/permissions/${id}`, {
        method: 'DELETE',
      });
      message.success('Permission deleted successfully');
      fetchPermissions();
    } catch (error) {
      message.error('Failed to delete permission');
    }
  };

  // Handle select permission
  const handleSelectPermission = async (id: string) => {
    try {
      const response = await request(`/permissions/${id}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      setSelectedPermission(response.data);
    } catch (error) {
      message.error('Failed to fetch permission details');
    }
  };

  // Handle modal submit
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (isEditing && selectedPermission) {
          handleEditPermission(selectedPermission.id, values);
        } else {
          handleAddPermission(values);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns: ProColumns<Permission>[] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Module', dataIndex: 'module', key: 'module' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at' },
    { title: 'Created By', dataIndex: 'created_by', key: 'created_by' },
    { title: 'Updated By', dataIndex: 'updated_by', key: 'updated_by' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditing(true);
              setSelectedPermission(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this permission?"
            onConfirm={() => handleDeletePermission(record.id)}
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
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setIsEditing(false);
          setSelectedPermission(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add Permission
      </Button>
      {selectedPermission && (
        <div style={{ marginTop: 16 }}>
          <h2>Selected Permission</h2>
          <p><strong>Name:</strong> {selectedPermission.name}</p>
          <p><strong>Description:</strong> {selectedPermission.description}</p>
          <p><strong>Module:</strong> {selectedPermission.module}</p>
          <p><strong>Created At:</strong> {selectedPermission.created_at}</p>
          <p><strong>Updated At:</strong> {selectedPermission.updated_at}</p>
          <p><strong>Created By:</strong> {selectedPermission.created_by}</p>
          <p><strong>Updated By:</strong> {selectedPermission.updated_by}</p>
          {/* Display more details as needed */}
        </div>
      )}
      <ProTable<Permission>
        columns={columns}
        dataSource={permissions}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleSelectPermission(record.id),
        })}
      />
      <Modal
        title={isEditing ? 'Edit Permission' : 'Add Permission'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="module"
            label="Module"
            rules={[{ required: true, message: 'Please enter the module!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Permissions;
