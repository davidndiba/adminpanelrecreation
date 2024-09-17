// import { Button, Card, Descriptions, Form, Input, Spin, message } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { request, useParams } from 'umi';

// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }

// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data); 
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, form]);

//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };

//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   return (
//     <Card title="User Profile">
//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered>
//             <Descriptions.Item label="ID">{profile.id}</Descriptions.Item>
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item
//                   name="display_name"
//                   rules={[
//                     { required: true, message: 'Display Name is required' },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     {
//                       type: 'email',
//                       message: 'The input is not valid E-mail!',
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">
//               {profile.ip_address}
//             </Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {profile.status?.name || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Roles">
//               {profile.roles?.length ? profile.roles.join(', ') : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile.last_login || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">
//               {profile.login_count || 'N/A'}
//             </Descriptions.Item>
//           </Descriptions>

//           {editing && (
//             <Form.Item>
//               <Button type="primary" onClick={handleSave}>
//                 Save
//               </Button>
//               <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           )}
//           {!editing && (
//             <Button type="primary" onClick={() => setEditing(true)}>
//               Edit
//             </Button>
//           )}
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };

// export default Profile;
// import { Button, Card, Col, Descriptions, Form, Input, Row, Spin, Typography, message } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { request, useParams, history } from 'umi';

// const { Title } = Typography;

// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: string; // Assume this is an ID for status
//   last_login: string | null; // Could be null if not available
//   login_count: number;
//   [key: string]: any; // Handle other fields dynamically
// }

// // Assuming you have a mapping for status names
// const statusMap: Record<string, string> = {
//   'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
//   // Add other status IDs and their names here
// };

// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data);
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, form]);

//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };

//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };

//   const handleBack = () => {
//     history.push('/'); // Replace '/' with the path you want to navigate to
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   return (
//     <Card
//       title={<Title level={2}>User Profile</Title>}
//       bordered={false}
//       style={{ maxWidth: 1000, margin: 'auto' }}
//     >
//       <Button
//         type="default"
//         style={{ marginBottom: 16 }}
//         onClick={handleBack}
//       >
//         Back
//       </Button>

//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered column={1} size="large">
//             {/* <Descriptions.Item label="ID">{profile.id}</Descriptions.Item> */}
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item  
//                   name="display_name"
//                   rules={[{ required: true, message: 'Display Name is required' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">{profile.ip_address || 'N/A'}</Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {statusMap[profile.status] || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile?.last_login ? new Date(profile?.last_login).toLocaleString() : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">{profile?.login_count || 'N/A'}</Descriptions.Item>
//           </Descriptions>

//           <Form.Item>
//             {editing ? (
//               <>
//                 <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>
//                   Save
//                 </Button>
//                 <Button onClick={handleCancel}>Cancel</Button>
//               </>
//             ) : (
//               <Button type="primary" onClick={() => setEditing(true)}>
//                 Edit
//               </Button>
//             )}
//           </Form.Item>
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };

// export default Profile;
// import { Button, Card, Col, Descriptions, Form, Input, Row, Spin, Typography, message } from 'antd';
// import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import React, { useEffect, useState } from 'react';
// import { request, useParams, history } from 'umi';

// const { Title } = Typography;

// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: string; // Assume this is an ID for status
//   last_login: string | null; // Could be null if not available
//   login_count: number;
//   [key: string]: any; // Handle other fields dynamically
// }

// // Assuming you have a mapping for status names
// const statusMap: Record<string, string> = {
//   'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
//   // Add other status IDs and their names here
// };

// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data);
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, form]);

//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };

//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };

//   const handleBack = () => {
//     history.push('/'); // Replace '/' with the path you want to navigate to
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   return (
//     <Card
//       title={<Title level={2}>User Profile</Title>}
//       bordered={false}
//       style={{ maxWidth: 1000, margin: 'auto', position: 'relative' }}
//     >
//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered column={1} size="large">
//             {/* <Descriptions.Item label="ID">{profile.id}</Descriptions.Item> */}
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item
//                   name="display_name"
//                   rules={[{ required: true, message: 'Display Name is required' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">{profile.ip_address || 'N/A'}</Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {statusMap[profile.status] || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile.last_login ? new Date(profile.last_login).toLocaleString() : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">{profile.login_count || 'N/A'}</Descriptions.Item>
//           </Descriptions>

//           <Form.Item style={{ textAlign: 'right' }}>
//             {editing ? (
//               <>
//                 <Button
//                   type="primary"
//                   onClick={handleSave}
//                   style={{ marginRight: 8 }}
//                 >
//                   Save
//                 </Button>
//                 <Button onClick={handleCancel}>Cancel</Button>
//               </>
//             ) : (
//               <Button
//                 type="link"
//                 icon={<EditOutlined />}
//                 style={{ color: '#1890ff' }} // Darker blue color
//                 onClick={() => setEditing(true)}
//               >
//                 Edit
//               </Button>
//             )}
//           </Form.Item>

//           {/* Back Button positioned at the bottom left */}
//           <Button
//             type="default"
//             icon={<ArrowLeftOutlined />}
//             style={{ position: 'absolute', bottom: 16, left: 16 }}
//             onClick={handleBack}
//           >
//             Back
//           </Button>
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };

// export default Profile;
import { Button, Card, Col, Descriptions, Form, Input, Row, Spin, Table, Typography, message } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { request, useParams, history } from 'umi';

const { Title } = Typography;

interface ProfileData {
  id: string;
  display_name: string;
  email: string;
  ip_address: string | null;
  status: string; // Assume this is an ID for status
  last_login: string | null;
  login_count: number;
  [key: string]: any; // Handle other fields dynamically
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

// Assuming you have a mapping for status names
const statusMap: Record<string, string> = {
  'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
  // Add other status IDs and their names here
};

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request(`/users/${id}`);
        if (response.data) {
          setProfile(response.data.user);
          setActivityLogs(response.data.activity_logs);
          form.setFieldsValue(response.data.user);
        } else {
          message.error('No data found');
        }
      } catch (error) {
        message.error('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await request(`/users/${id}`, {
        method: 'PUT',
        data: values,
      });
      message.success('Profile updated successfully');
      setProfile(values);
      setEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(profile);
    setEditing(false);
  };

  const handleBack = () => {
    history.push('/'); // Replace '/' with the path you want to navigate to
  };

  if (loading) {
    return <Spin />;
  }

  const columns = [
    { title: 'Action', dataIndex: 'action', key: 'action' },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  ];

  return (
    <Card
      title={<Title level={2}>User Profile</Title>}
      bordered={false}
      style={{ maxWidth: 1000, margin: 'auto', position: 'relative' }}
    >
      {profile ? (
        <Form form={form} layout="vertical">
          <Descriptions bordered column={1} size="large">
            <Descriptions.Item label="Display Name">
              {editing ? (
                <Form.Item
                  name="display_name"
                  rules={[{ required: true, message: 'Display Name is required' }]}
                  style={{ margin: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                profile.display_name || 'N/A'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {editing ? (
                <Form.Item
                  name="email"
                  rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
                  style={{ margin: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                profile.email || 'N/A'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="IP Address">
              {profile.ip_address || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {statusMap[profile.status] || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">
              {profile.last_login ? new Date(profile.last_login).toLocaleString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Login Count">
              {profile.login_count || 'N/A'}
            </Descriptions.Item>
          </Descriptions>

          <Form.Item style={{ textAlign: 'right' }}>
            {editing ? (
              <>
                <Button
                  type="primary"
                  onClick={handleSave}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </>
            ) : (
              <Button
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }} // Darker blue color
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </Form.Item>

          {/* Back Button positioned at the bottom left */}
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            style={{ position: 'absolute', bottom: 16, left: 16 }}
            onClick={handleBack}
          >
            Back
          </Button>
        </Form>
      ) : (
        <p>No profile data available</p>
      )}

      {/* Activity Logs Section */}
      {activityLogs.length > 0 && (
        <Card title="Activity Logs" style={{ marginTop: 24 }}>
          <Table
            columns={columns}
            dataSource={activityLogs}
            rowKey="id"
            pagination={false}
          />
        </Card>
      )}
    </Card>
  );
};

export default Profile;
