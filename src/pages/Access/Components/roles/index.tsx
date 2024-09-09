// import React from 'react';
// import { ProTable } from '@ant-design/pro-components';

// const Roles: React.FC = () => {
//   const columns = [
//     { title: 'Role', dataIndex: 'role', key: 'role' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     // Add more role fields here
//   ];

//   const data = [
//     { key: 1, role: 'Admin', description: 'Full access to all resources' },
//     // Add more role data here
//   ];

//   return <ProTable columns={columns} dataSource={data} rowKey="key" />;
// };

// export default Roles;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProColumns } from '@ant-design/pro-components';
// import { Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
// import { request } from 'umi';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// // const baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1'; 

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

//   return (
//     <div>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setIsEditing(false);
//           setSelectedRole(null);
//           form.resetFields();
//           setIsModalVisible(true);
//         }}
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
import React, { useState, useEffect } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Input, message, Popconfirm, Card, Col, Row, Typography } from 'antd';
import { request } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, TeamOutlined, DatabaseOutlined, FileDoneOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Role {
  id: string;
  role: string;
  description: string;
}

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await request(`/roles`);
      setRoles(response.data);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle add role
  const handleAddRole = async (values: any) => {
    try {
      await request(`/roles`, {
        method: 'POST',
        data: values,
      });
      message.success('Role added successfully');
      fetchRoles();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to add role');
    }
  };

  // Handle edit role
  const handleEditRole = async (id: string, values: any) => {
    try {
      await request(`/roles/${id}`, {
        method: 'PUT',
        data: values,
      });
      message.success('Role updated successfully');
      fetchRoles();
      setSelectedRole(null);
    } catch (error) {
      message.error('Failed to update role');
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
    { title: 'Role', dataIndex: 'role', key: 'role' },
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
              setSelectedRole(record);
              form.setFieldsValue(record);
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

  // Mock data for statistics
  const stats = {
    totalRoles: roles.length,
    activeRoles: roles.filter(role => role.status === 'active').length,
    pendingRoles: roles.filter(role => role.status === 'pending').length,
    archivedRoles: roles.filter(role => role.status === 'archived').length,
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Total Roles</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalRoles}</div>
            <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Active Roles</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activeRoles}</div>
            <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Pending Roles</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingRoles}</div>
            <DatabaseOutlined style={{ fontSize: '36px', color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Title level={4}>Archived Roles</Title>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.archivedRoles}</div>
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
        style={{ marginBottom: '16px' }}
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
        <div style={{ marginTop: 16 }}>
          <h2>Selected Role</h2>
          <p><strong>Role:</strong> {selectedRole.role}</p>
          <p><strong>Description:</strong> {selectedRole.description}</p>
        </div>
      )}
      <Modal
        title={isEditing ? 'Edit Role' : 'Add Role'}
        visible={isModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              if (isEditing) {
                handleEditRole(selectedRole!.id, values);
              } else {
                handleAddRole(values);
              }
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter the role!' }]}
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

export default Roles;
