
// import {
//   Button,
//   Card,
//   Col,
//   Descriptions,
//   Form,
//   Input,
//   Modal,
//   Row,
//   Spin,
//   Table,
//   Typography,
//   Progress,
//   Statistic,
//   Divider,
//   message,
// } from 'antd';
// import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import React, { useEffect, useState } from 'react';
// import { request, useParams, history } from 'umi';

// const { Title, Text } = Typography;

// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string | null;
//   status: string;
//   last_login: string | null;
//   login_count: number;
//   phone: string;
//   location: string;
//   website: string;
//   [key: string]: any;
// }

// interface ActivityLog {
//   id: string;
//   action: string;
//   timestamp: string;
// }

// const statusMap: Record<string, string> = {
//   'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
// };

// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id || 'profile'}`);
//         if (response.data) {
//           setProfile(response.data.user);
//           setActivityLogs(response.data.activity_logs);
//           form.setFieldsValue(response.data.user);
//         } else {
//           message.error('Failed to fetch profile');
//         }
//       } catch (error) {
//         message.error('Failed to fetch profile');
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

//   if (loading) {
//     return <Spin />;
//   }

//   const columns = [
//     { title: 'Action', dataIndex: 'action', key: 'action' },
//     { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
//   ];

//   return (
//     <Card bordered={false} style={{ maxWidth: 1000, margin: 'auto' }}>
//       <Row>
//         <Col span={16}>
//           <Title level={2}>System Administrator</Title>
//           <Text strong>Administrator</Text>
//           <Divider />
//           <Text>Welcome to your user account profile. View recent activity and edit your user credentials and information.</Text>
//         </Col>
//         <Col span={8} style={{ textAlign: 'right' }}>
//           <Statistic title="Login Count" value={profile?.login_count || 'N/A'} />
//         </Col>
//       </Row>

//       <Row gutter={16} style={{ marginTop: 24 }}>
//         <Col span={12}>
//           <Card title="Websites & User Guide">
//             <Descriptions column={1}>
//               <Descriptions.Item label="Website">
//                 <a href={profile?.website || '#'}>{profile?.website || 'N/A'}</a>
//               </Descriptions.Item>
//               <Descriptions.Item label="Help">
//                 <a href="/user-guide.pdf">User Guide pdf</a>
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>

//         <Col span={12}>
//           <Card title="Activities per Month">
//             <Statistic title="Activities" value={171} suffix="past 10 months" />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={16} style={{ marginTop: 24 }}>
//         <Col span={12}>
//           <Card title="Activity by Modules">
//             <Descriptions bordered column={1}>
//               <Descriptions.Item label="Users Module">
//                 <Progress percent={66.1} format={(percent) => `${percent}% (113)`} />
//               </Descriptions.Item>
//               <Descriptions.Item label="Planner Module">
//                 <Progress percent={30.4} format={(percent) => `${percent}% (52)`} />
//               </Descriptions.Item>
//               <Descriptions.Item label="Mappings Module">
//                 <Progress percent={2.9} format={(percent) => `${percent}% (5)`} />
//               </Descriptions.Item>
//               <Descriptions.Item label="User Accounts Module">
//                 <Progress percent={0.6} format={(percent) => `${percent}% (1)`} />
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>

//         <Col span={12}>
//           <Card title="Contact Information">
//             <Descriptions bordered column={1}>
//               <Descriptions.Item label="Mobile">{profile?.phone || 'N/A'}</Descriptions.Item>
//               <Descriptions.Item label="Email">{profile?.email || 'N/A'}</Descriptions.Item>
//               <Descriptions.Item label="Location">{profile?.location || 'N/A'}</Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={16} style={{ marginTop: 24 }}>
//         <Col span={24}>
//           <Card title="Recent Activity">
//             <Table columns={columns} dataSource={activityLogs} rowKey="id" pagination={false} />
//           </Card>
//         </Col>
//       </Row>

//       {editing && (
//         <Modal
//           visible={editing}
//           title="Edit Profile"
//           onCancel={() => setEditing(false)}
//           onOk={handleSave}
//         >
//           <Form form={form} layout="vertical">
//             <Form.Item label="Display Name" name="display_name">
//               <Input />
//             </Form.Item>
//             <Form.Item label="Email" name="email">
//               <Input />
//             </Form.Item>
//           </Form>
//         </Modal>
//       )}
//     </Card>
//   );
// };

// export default Profile;
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
  Typography,
  Progress,
  Statistic,
  Divider,
  message,
} from 'antd';
import { UserOutlined, FilePdfOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { request, useParams } from 'umi';
import { Bar } from '@ant-design/plots'; // Bar chart library for activity graph

const { Title, Text } = Typography;

interface ProfileData {
  id: string;
  display_name: string;
  email: string;
  ip_address: string | null;
  status: string;
  last_login: string | null;
  login_count: number;
  phone: string | null;
  location: string | null;
  website: string;
  [key: string]: any;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

// Function to derive location from IP address
const deriveLocationFromIp = (ip: string | null): string => {
  if (!ip) return 'N/A';
  // Normally, you'd call an external service, but for this example, we simulate it
  if (ip.startsWith('102.209')) return 'South Africa'; // Example logic
  return 'Unknown Location';
};

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Used to check if an admin is viewing another user's profile
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch the current user's profile if no ID is provided, otherwise fetch the specific user profile by ID
        const response = await request(`/users/${id ? id : 'profile'}`);
        if (response.data) {
          const user = response.data.user;
          setProfile({
            ...user,
            location: deriveLocationFromIp(user.ip_address), // Derive location from IP
          });
          setActivityLogs(response.data.activity_logs);
          form.setFieldsValue(user);
        } else {
          message.error('Failed to fetch profile');
        }
      } catch (error) {
        message.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await request(`/users/${id || 'profile'}`, {
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

  if (loading) {
    return <Spin />;
  }

  const columns = [
    { title: 'Action', dataIndex: 'action', key: 'action' },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  ];

  const activityData = [
    { month: 'Jan', activities: 30 },
    { month: 'Feb', activities: 20 },
    { month: 'Mar', activities: 15 },
    { month: 'Apr', activities: 35 },
  ];

  const config = {
    data: activityData,
    xField: 'activities',
    yField: 'month',
    seriesField: 'month',
    barWidthRatio: 0.8,
  };

  return (
    <Card bordered={false} style={{ maxWidth: 1000, margin: 'auto' }}>
      {/* Admin Icon + Title */}
      <Row>
        <Col span={16}>
          <Row align="middle">
            <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 16 }} />
            <div>
              <Title level={2}>{profile?.display_name || 'System Administrator'}</Title>
              <Text strong>Administrator</Text>
            </div>
          </Row>
          <Divider />
          <Text>
            Welcome to your user account profile. View recent activity and edit your user credentials and information.
          </Text>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Statistic title="Login Count" value={profile?.login_count || 'N/A'} />
        </Col>
      </Row>

      {/* Website & User Guide */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Websites & User Guide">
            <Descriptions column={1}>
              <Descriptions.Item label="Website">
                <a href={profile?.website || '#'}>{profile?.website || 'trtmanufacturing.com'}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Help">
                <a href="/user-guide.pdf">
                  <FilePdfOutlined /> User Guide pdf
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Activity Graph */}
        <Col span={12}>
          <Card title="Activities by Month">
            <Bar {...config} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Activity by Modules">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Users Module">
                <Progress percent={66.1} format={(percent) => `${percent}% (113)`} />
              </Descriptions.Item>
              <Descriptions.Item label="Planner Module">
                <Progress percent={30.4} format={(percent) => `${percent}% (52)`} />
              </Descriptions.Item>
              <Descriptions.Item label="Mappings Module">
                <Progress percent={2.9} format={(percent) => `${percent}% (5)`} />
              </Descriptions.Item>
              <Descriptions.Item label="User Accounts Module">
                <Progress percent={0.6} format={(percent) => `${percent}% (1)`} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col span={12}>
          <Card title="Contact Information">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Mobile">{profile?.data?.phone || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Email">{profile?.email || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Location">{profile?.location || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Recent Activity">
            <Table columns={columns} dataSource={activityLogs} rowKey="id" pagination={false} />
          </Card>
        </Col>
      </Row>

      {editing && (
        <Modal
          visible={editing}
          title="Edit Profile"
          onCancel={() => setEditing(false)}
          onOk={handleSave}
        >
          <Form form={form} layout="vertical">
            <Form.Item label="Display Name" name="display_name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Card>
  );
};

export default Profile;
