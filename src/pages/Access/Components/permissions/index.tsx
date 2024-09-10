// import React from 'react';
// import { ProTable } from '@ant-design/pro-components';

// const Permissions: React.FC = () => {
//   const columns = [
//     { title: 'Permission', dataIndex: 'permission', key: 'permission' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     // Add more permission fields here
//   ];

//   const data = [
//     { key: 1, permission: 'View Dashboard', description: 'Allows viewing the dashboard' },
//     // Add more permission data here
//   ];

//   return <ProTable columns={columns} dataSource={data} rowKey="key" />;
// };

// export default Permissions;
import React, { useState, useEffect } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
import { request } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1'; 

// Define types for permission data
interface Permission {
  id: string;
  permission: string;
  description: string;
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
      const response = await request(`${baseUrl}/permissions`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      setPermissions(response.data);
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
      await request(`${baseUrl}/permissions`, {
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
      await request(`${baseUrl}/permissions/${id}`, {
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
      await request(`${baseUrl}/permissions/${id}`, {
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
      const response = await request(`${baseUrl}/permissions/${id}`, {
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
    { title: 'Permission', dataIndex: 'permission', key: 'permission' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
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
          <p><strong>Permission:</strong> {selectedPermission.permission}</p>
          <p><strong>Description:</strong> {selectedPermission.description}</p>
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
            name="permission"
            label="Permission"
            rules={[{ required: true, message: 'Please enter the permission!' }]}
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
        </Form>
      </Modal>
    </div>
  );
};

export default Permissions;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Modal, Form, Input, message, Space, Popconfirm, Card, Col, Row, Typography } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined, CheckCircleOutlined, PauseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

// const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1';

// // Define types for permission data
// interface Permission {
//   id: string;
//   permission: string;
//   description: string;
//   status: string; // Hypothetical status field
// }

// const { Title } = Typography;

// const Permissions: React.FC = () => {
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch all permissions
//   const fetchPermissions = async () => {
//     try {
//       const response = await request(`${baseUrl}/permissions`, {
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
//       await request(`${baseUrl}/permissions`, {
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
//       await request(`${baseUrl}/permissions/${id}`, {
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
//       await request(`${baseUrl}/permissions/${id}`, {
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
//       const response = await request(`${baseUrl}/permissions/${id}`, {
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

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalPermissions = permissions.length;
//     const activePermissions = permissions.filter(permission => permission.status === 'Active').length;
//     const inactivePermissions = permissions.filter(permission => permission.status === 'Inactive').length;
//     const pendingPermissions = permissions.filter(permission => permission.status === 'Pending').length;
//     return { totalPermissions, activePermissions, inactivePermissions, pendingPermissions };
//   };

//   const stats = calculateStats();

//   const columns: ProColumns<Permission>[] = [
//     { title: 'Permission', dataIndex: 'permission', key: 'permission' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Status', dataIndex: 'status', key: 'status' }, // Add Status
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
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Statistics Cards */}
//       <Row gutter={16} style={{ marginBottom: '16px' }}>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Total Permissions</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalPermissions}</div>
//             <CheckCircleOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Active Permissions</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activePermissions}</div>
//             <CheckCircleOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Inactive Permissions</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.inactivePermissions}</div>
//             <PauseCircleOutlined style={{ fontSize: '36px', color: '#faad14' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card bordered>
//             <Title level={4}>Pending Permissions</Title>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingPermissions}</div>
//             <ClockCircleOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
//           </Card>
//         </Col>
//       </Row>

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
//           <p><strong>Status:</strong> {selectedPermission.status}</p>
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
