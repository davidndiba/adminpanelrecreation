// import {
//     ActionType,
//     ModalForm,
//     ProColumns,
//     ProFormSelect,
//     ProFormText,
//     ProTable,
//   } from '@ant-design/pro-components';
//   import {
//     Button,
//     Card,
//     Col,
//     Divider,
//     Input,
//     message,
//     Row,
//     Space,
//     Typography,
//     Statistic,
//   } from 'antd';
//   import { UserOutlined, TeamOutlined, LoginOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
//   import moment from 'moment';
//   import React, { useRef, useState, useEffect } from 'react';
//   import { history, request, useRequest } from 'umi';

//   const { Title } = Typography;

//   interface User {
//     id: string;
//     display_name: string;
//     email: string;
//     ip_address: string;
//     status: { name: string };
//     roles: string[];
//     last_login: string;
//     login_count: number;
//     created_at: string;
//   }
//   const Users: React.FC = () => {
//     const addUserRef = useRef<any>();
//     const tableActionRef = useRef<ActionType>();
  
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [totalUsers, setTotalUsers] = useState<number>(0);
//     const [activeUsers, setActiveUsers] = useState<number>(0);
//     const [inactiveUsers, setInactiveUsers] = useState<number>(0);
//     const [totalLogins, setTotalLogins] = useState<number>(0);
//     const [visible, setVisible] = useState<boolean>(false); // Corrected visible state
//     const [formValues, setFormValues] = useState<User | undefined>(undefined); // Corrected formValues state
//     const { data: statuses } = useRequest(() => request('/statuses'));  

//       // [visible, setVisible] = useState<boolean>(false), // Corrected visible state
//       // [formValues, setFormValues] = useState<User | undefined>(undefined); // Corrected formValues state

//       useEffect(() => {
//         const fetchStats = async () => {
//           try {
//             // Fetch data from the /users endpoint
//             const response = await request('/users');
      
//             if (response?.success) {
//               const statistics = response.data?.statistics;
      
//               // Set statistics using the response data
//               setTotalUsers(statistics?.total_users ?? 0);
//               setActiveUsers(statistics?.user_counts_by_status?.Active ?? 0);
//               setInactiveUsers(
//                 (statistics?.user_counts_by_status?.Deactivated ?? 0) + 
//                 (statistics?.user_counts_by_status?.Deleted ?? 0)
//               );
//               setTotalLogins(response.data?.data?.reduce((acc, user) => acc + (user.login_count || 0), 0));
//             } else {
//               message.error('Failed to retrieve users statistics.');
//             }
//           } catch (error) {
//             message.error('Failed to fetch statistics');
//           }
//         };
      
//         fetchStats();
//       }, []);
      
//     const handleRowSelection = (selectedKeys: React.Key[]) => {
//       setSelectedRowKeys(selectedKeys);
//     };

//     const handleSearch = () => {
//       // Trigger table reload on search
//       tableActionRef.current?.reload();
//     };

//     const handleEdit = async (user: User) => {
//       // Fetch the user data if necessary
//       const response = await request(`/users/${user.id}`);
//       const userData = response?.data;
    
//       // Set the form values
//       // addUserRef.current?.setFieldsValue(userData);
//       addUserRef.current?.setFieldsValue({
//         ...user,
//         status: { key: user.status }, // Adjust if your statuses use different format
//       });
    
//       // Open the modal form
//       // addUserRef.current?.open();
//       setFormValues(user);
//       setVisible(true);
//     };
    

//     const columns: ProColumns<User>[] = [
//       {
//         title: 'Display Name',
//         dataIndex: 'display_name',
//         key: 'display_name',
//         render: (text, record) => (
//           <a
//             href={`/users/${record.id}`}
//             style={{
//               color: '#1890ff', // Blue color to indicate link
//               textDecoration: 'none', // Remove underline
//               cursor: 'pointer', // Pointer cursor on hover
//             }}
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default anchor behavior
//               history.push(`/users/${record.id}`); // Use history for navigation
//             }}
//           >
//             {text}
//           </a>
//         ),
//       },
//       { title: 'Email', dataIndex: 'email', key: 'email' },
//       { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//       {
//         title: 'Status',
//         dataIndex: ['status', 'name'],
//         key: 'status',
//       },
//       {
//         title: 'Role',
//         dataIndex: 'roles',
//         key: 'roles',
//         render: (r: any) => r?.join(', '),
//       },
//       {
//         title: 'Last Login',
//         dataIndex: 'last_login',
//         key: 'last_login',
//         // render: (text: any) => moment(text).format('ll'),
//         render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
//       },
//       { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//       {
//         title: 'Created At',
//         dataIndex: 'created_at',
//         key: 'created_at',
//         render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
//       },
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//               type="link"
//             >
//               Edit
//             </Button>
//           </Space>
//         ),
//       },
//     ];

//     return (
//       <div style={{ padding: '24px', backgroundColor: '#fff' }}>
//         <Row gutter={16} style={{ marginBottom: '16px' }}>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
//               <Title level={4}>Total Users</Title>
//               <Statistic
//                 title="Total Users"
//                 value={totalUsers}
//                 prefix={<UserOutlined style={{ color: '#1890ff', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
//               <Title level={4}>Active Users</Title>
//               <Statistic
//                 title="Active Users"
//                 value={activeUsers}
//                 prefix={<TeamOutlined style={{ color: '#52c41a', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
//               <Title level={4}>Inactive Users</Title>
//               <Statistic
//                 title="Inactive Users"
//                 value={inactiveUsers}
//                 prefix={<UserOutlined style={{ color: '#fa8c16', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
//               <Title level={4}>Total Logins</Title>
//               <Statistic
//                 title="Total Logins"
//                 value={totalLogins}
//                 prefix={<LoginOutlined style={{ color: '#faad14', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Search field above the table */}
//         <Row gutter={16} style={{ marginBottom: '16px' }}>
//           <Col span={24}>
//             <Input
//               placeholder="Search Users"
//               value={searchTerm}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSearchTerm(value);

//                 // If input is cleared, reload the table
//                 if (value === '') {
//                   handleSearch();
//                 }
//               }}
//               onPressEnter={handleSearch} // Trigger search on Enter
//               style={{ width: 200, marginBottom: '16px' }} // Make search field smaller
//               allowClear // Add a clear button
//             />
//           </Col>
//         </Row>
// <div
//         style={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           marginBottom: '16px',
//         }}
//       >
//         <ModalForm
//           formRef={addUserRef}
//           title={formValues ? 'Edit User' : 'Add New User'}
//           visible={visible}
//           onVisibleChange={setVisible} // Control modal visibility
//           onFinish={async (values) => {
//             try {
//               if (formValues?.id) {
//                 // Update existing user
//                 await request(`/users/${formValues.id}`, {
//                   method: 'PUT',
//                   data: values,
//                 });
//                 message.success('User updated successfully');
//               } else {
//                 // Create new user
//                 await request('/auth/admin/register', {
//                   method: 'POST',
//                   data: values,
//                 });
//                 message.success('User added successfully');
//               }

//               addUserRef.current?.resetFields();
//               setVisible(false); // Close the modal
//               tableActionRef.current?.reload(); // Refresh the table data
//             } catch (error) {
//               message.error('Failed to save user');
//             }
//           }}
//           initialValues={formValues} // Set initial form values
//           trigger={
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               style={{
//                 backgroundColor: '#6c5ce7',
//                 color: '#ffffff',
//                 borderColor: '#6c5ce7',
//               }}
//               onClick={() => {
//                 setFormValues(undefined); // Reset form values
//                 setVisible(true); // Show the modal for new user
//               }}
//             >
//               Add New User
//             </Button>
//           }
//         >
//           <ProFormText
//             label="Display Name"
//             name="display_name"
//             rules={[{ required: true }]}
//           />
//           <ProFormText
//             label="Email"
//             name="email"
//             rules={[
//               { required: true },
//               { type: 'email', message: 'Invalid email address' },
//             ]}
//           />
//           <ProFormText label="Phone Number" name="phone" />
//           <ProFormText
//             label="Username"
//             name="username"
//             rules={[{ required: true }]}
//           />
//           <ProFormSelect
//             label="Status"
//             name={['status', 'name']}
//             options={statuses?.map((status) => ({ label: status.name, value: status.name })) || []}
//             rules={[{ required: true }]}
//           />
//           <ProFormSelect
//             request={async () => {
//               const resp = await request('/roles');
//               return resp?.data ?? [];
//             }}
//             fieldProps={{
//               fieldNames: {
//                 label: 'name',
//                 value: 'id',
//               },
//             }}
//             label="Role"
//             name="role"
//             rules={[{ required: true }]}
//           />
//         </ModalForm>
//       </div>


//         <ProTable<User>
//           columns={columns}
//           actionRef={tableActionRef}
//           rowKey="id"
//           rowSelection={{ selectedRowKeys, onChange: handleRowSelection }}
//           pagination={{
//             defaultCurrent: 1,
//             defaultPageSize: 10,
//             showSizeChanger: true,
//             pageSizeOptions: ['10', '20', '50', '100'],
//             hideOnSinglePage: true,
//           }}
//           search={false}
//           request={async (params) => {
//             // Include search term as a query parameter
//             const resp = await request('/users', {
//               params: {
//                 ...params,
//                 search: searchTerm, // Pass search term
//               },
//             });

//             return {
//               data: resp?.data?.data,
//               total: resp?.data?.total,
//               success: true,
//             };
//           }}
//           components={{
//             header: {
//               cell: (props) => (
//                 <th
//                   {...props}
//                   style={{
//                     borderBottom: '2px solid #d9d9d9', // Customize the column line color
//                   }}
//                 />
//               ),
//             },
//             body: {
//               cell: (props) => (
//                 <td
//                   {...props}
//                   style={{
//                     borderBottom: '1px solid #d9d9d9', // Customize the row line color
//                   }}
//                 />
//               ),
//             },
//           }}
//           footer={() => (
//             <Space split={<Divider type="vertical" />}>
//               {statuses?.map((status: any) => (
//                 <Button
//                   size="small"
//                   key={status.id}
//                   onClick={async () => {
//                     selectedRowKeys?.forEach(async (id) => {
//                       await request(`/users/${id}`, {
//                         method: 'PUT',
//                         data: { status: status.id },
//                       });
//                       tableActionRef?.current?.reload?.();
//                       message.success(`User status updated to ${status.name}`);
//                     });
//                   }}
//                   disabled={selectedRowKeys.length === 0}
//                 >
//                   {status.name}
//                 </Button>
//               ))}
//             </Space>
//           )}
//           onRow={() => ({
//           })} 
//           rowSelection={{
//             selectedRowKeys,
//             onChange: handleRowSelection,
//           }}
//         />
//       </div>
//     );
//   };

//   export default Users;
// // import React from 'react';
// // import {  Table, Button } from 'antd';
// // import { PageHeader } from '@ant-design/pro-components';

// // const Users: React.FC = () => {
// //   const columns = [
// //     {
// //       title: 'Name',
// //       dataIndex: 'name',
// //       key: 'name',
// //     },
// //     {
// //       title: 'Email',
// //       dataIndex: 'email',
// //       key: 'email',
// //     },
// //     {
// //       title: 'Role',
// //       dataIndex: 'role',
// //       key: 'role',
// //     },
// //     {
// //       title: 'Action',
// //       key: 'action',
// //       render: () => (
// //         <Button type="link">Edit</Button>
// //       ),
// //     },
// //   ];

// //   const data = [
// //     {
// //       key: '1',
// //       name: 'John Brown',
// //       email: 'john.brown@example.com',
// //       role: 'Admin',
// //     },
// //     // more data here
// //   ];

// //   return (
// //     <div>
// //       <PageHeader title="Users" subTitle="Manage user accounts" />
// //       <Table columns={columns} dataSource={data} />
// //     </div>
// //   );
// // };

// // export default Users;
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Row,
  Space,
  Statistic,
  Tag,
  Popconfirm,
  Tooltip,
  Typography,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  LoginOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { request, useRequest } from 'umi';
import './Users.less'; // Assuming a custom CSS file for additional styling

const { Title, Text } = Typography;

interface User {
  id: string;
  username: string;
  full_name: string;
  contact: string;
  email: string;
  role: string;
  last_login: string;
}

const Users: React.FC = () => {
  const addUserRef = useRef<any>();
  const tableActionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [totalLogins, setTotalLogins] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<User | undefined>(undefined);
  const { data: statuses } = useRequest(() => request('/statuses'));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await request('/users');
        if (response?.success) {
          const statistics = response.data?.statistics;
          setTotalUsers(statistics?.total_users ?? 0);
          setActiveUsers(statistics?.user_counts_by_status?.Active ?? 0);
          setInactiveUsers(
            (statistics?.user_counts_by_status?.Deactivated ?? 0) +
              (statistics?.user_counts_by_status?.Deleted ?? 0)
          );
          setTotalLogins(
            response.data?.data?.reduce((acc, user) => acc + (user.login_count || 0), 0)
          );
        } else {
          message.error('Failed to retrieve users statistics.');
        }
      } catch (error) {
        message.error('Failed to fetch statistics');
      }
    };
    fetchStats();
  }, []);

  const handleRowSelection = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleSearch = () => {
    tableActionRef.current?.reload();
  };

  const handleEdit = async (user: User) => {
    const response = await request(`/users/${user.id}`);
    const userData = response?.data;
    addUserRef.current?.setFieldsValue({
      ...user,
      status: { key: user.status.name },
    });
    setFormValues(user);
    setVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await request(`/users/${userId}`, { method: 'DELETE' });
      message.success('User deleted successfully');
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns: ProColumns<User>[] = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (_, record) => (
        <Text strong>{record.username}</Text>
      ),
    },
    {
      title: 'Full Names',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record) => (
        <>
          <div>Email: {record.email}</div>
          <div>Phone: {record.contact}</div>
        </>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Last Login',
      dataIndex: 'last_login',
      key: 'last_login',
      sorter: true,
      render: (text: any) => moment(text).format('DD-MMM-YYYY HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              type="link"
              className="edit-btn"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger className="delete-btn" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-page">
      <Row gutter={[16, 16]} className="user-stats">
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#e6f7ff' }}>
            <Title level={4}>Total Users</Title>
            <Statistic
              value={totalUsers}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#f6ffed' }}>
            <Title level={4}>Active Users</Title>
            <Statistic
              value={activeUsers}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#fff7e6' }}>
            <Title level={4}>Inactive Users</Title>
            <Statistic
              value={inactiveUsers}
              prefix={<UserOutlined style={{ color: '#fa8c16' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ backgroundColor: '#fffbe6' }}>
            <Title level={4}>Total Logins</Title>
            <Statistic
              value={totalLogins}
              prefix={<LoginOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="search-bar">
        <Col span={24}>
          <Input.Search
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === '') handleSearch();
            }}
            onSearch={handleSearch}
            style={{ width: 300, marginBottom: '16px' }}
            allowClear
          />
        </Col>
      </Row>

      <div className="user-actions">
        <ModalForm
          formRef={addUserRef}
          title={formValues ? 'Edit User' : 'Add New User'}
          visible={visible}
          onVisibleChange={setVisible}
          onFinish={async (values) => {
            try {
              if (formValues?.id) {
                await request(`/users/${formValues.id}`, {
                  method: 'PUT',
                  data: values,
                });
                message.success('User updated successfully');
              } else {
                await request('/auth/admin/register', {
                  method: 'POST',
                  data: values,
                });
                message.success('User added successfully');
              }
              addUserRef.current?.resetFields();
              setVisible(false);
              tableActionRef.current?.reload();
            } catch (error) {
              message.error('Failed to save user');
            }
          }}
        >
          <ProFormText
            name="username"
            label="User Name"
            placeholder="Enter user name"
            rules={[{ required: true, message: 'User Name is required' }]}
          />
          <ProFormText
            name="full_name"
            label="Full Names"
            placeholder="Enter full names"
            rules={[{ required: true, message: 'Full Names are required' }]}
          />
          <ProFormText
            name="contact"
            label="Contact"
            placeholder="Enter contact number"
          />
          <ProFormText
            name="email"
            label="Email"
            placeholder="Enter email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
          <ProFormText
            name="role"
            label="Role"
            placeholder="Enter role"
            rules={[{ required: true, message: 'Role is required' }]}
          />
        </ModalForm>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFormValues(undefined);
            setVisible(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <ProTable<User>
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelection,
        }}
        actionRef={tableActionRef}
        columns={columns}
        request={async (params) => {
          const response = await request('/users', {
            params: {
              page: params.current,
              limit: params.pageSize,
              search: searchTerm,
            },
          });
          return {
            data: response.data.data,
            success: response.success,
            total: response.data.total,
          };
        }}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
        toolBarRender={false}
        options={false}
        dateFormatter="string"
      />
    </div>
  );
};

export default Users;
