// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Form, Input, Button, Modal, message } from 'antd';

// const { Title } = Typography;

// const EmailSettings = () => {
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [password, setPassword] = React.useState('');

//   const handlePasswordChange = () => {
//     // Implement password change logic here
//     message.success('Password changed successfully');
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>Email Settings</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

//           {/* Email Setup */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Setup</div>
//               <Button type="primary" onClick={() => setIsModalVisible(true)}>View Email Setup</Button>
//             </div>
//           </ProCard>

//           {/* Change Password */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Change Password</div>
//               <Button type="primary" onClick={() => setIsModalVisible(true)}>Change Password</Button>
//             </div>
//           </ProCard>

//           {/* Email Template */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Template</div>
//               <Button type="primary">View Template</Button>
//             </div>
//           </ProCard>

//           {/* Email Logs/Queue */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Logs/Queue</div>
//               <Button type="primary">View Logs/Queue</Button>
//             </div>
//           </ProCard>

//           {/* Compose Email */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Compose Email</div>
//               <Button type="primary">Compose Email</Button>
//             </div>
//           </ProCard>

//           {/* Test Settings */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Test Settings</div>
//               <Button type="primary">Test Settings</Button>
//             </div>
//           </ProCard>

//         </div>
//       </div>

//       {/* Modal for Changing Password */}
//       <Modal
//         title="Change Password"
//         visible={isModalVisible}
//         onOk={handlePasswordChange}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Password">
//             <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default EmailSettings;
import { ProCard } from '@ant-design/pro-components';
import {
  Button,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi'; // Import request from umi for API calls

const { Title } = Typography;
const { Panel } = Collapse;

const EmailSettings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [emailDetailsVisible, setEmailDetailsVisible] = useState<string | null>(
    null,
  );

  // Fetch emails for viewing
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await request('/emails');
        if (response.success === 'true') {
          setEmails(response.data);
        } else {
          message.error(response.message || 'Failed to fetch emails');
        }
      } catch (error) {
        message.error('Failed to fetch emails');
        console.error(error);
      }
    };

    fetchEmails();
  }, []);

  // Handle email deletion
  const handleDeleteEmail = async (emailId: string) => {
    try {
      await request(`/emails/${emailId}`, { method: 'DELETE' });
      message.success('Email deleted successfully');
      setEmails(emails.filter((email) => email.id !== emailId));
    } catch (error) {
      message.error('Failed to delete email');
      console.error(error);
    }
  };

  const handleComposeEmail = async (values: any) => {
    try {
      await request('/compose-email', {
        method: 'POST',
        data: values,
      });
      message.success('Email sent successfully');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to send email');
      console.error(error);
    }
  };

  const emailColumns = [
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Date Sent',
      dataIndex: 'dateSent',
      key: 'dateSent',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() =>
              setEmailDetailsVisible(
                record.id === emailDetailsVisible ? null : record.id,
              )
            }
          >
            {emailDetailsVisible === record.id
              ? 'Hide Details'
              : 'View Details'}
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this email?"
            onConfirm={() => handleDeleteEmail(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const emailDetails = emails.find((email) => email.id === emailDetailsVisible);

  return (
    <ProCard title="" bordered>
      <div style={{ padding: '16px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Email Settings
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email Setup */}
          <ProCard bordered>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>Email Setup</div>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Compose Email
              </Button>
            </div>
          </ProCard>

          {/* Email Template */}
          <ProCard bordered>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>Email Template</div>
              <Button type="primary">View Template</Button>
            </div>
          </ProCard>

          {/* Email Logs/Queue */}
          <ProCard bordered>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>Email Logs/Queue</div>
              <Button
                type="primary"
                onClick={() => setEmailDetailsVisible(null)}
              >
                {emailDetailsVisible ? 'Hide Logs/Queue' : 'View Logs/Queue'}
              </Button>
            </div>
            {emailDetailsVisible === null && (
              <Table
                columns={emailColumns}
                dataSource={emails}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                style={{ marginTop: '16px' }}
              />
            )}
            {emailDetailsVisible && emailDetails && (
              <Collapse defaultActiveKey={['1']} style={{ marginTop: '16px' }}>
                <Panel
                  header={`Details for Email ID: ${emailDetails.id}`}
                  key="1"
                >
                  <p>
                    <strong>Recipient:</strong> {emailDetails.recipient}
                  </p>
                  <p>
                    <strong>Subject:</strong> {emailDetails.subject}
                  </p>
                  <p>
                    <strong>Date Sent:</strong> {emailDetails.dateSent}
                  </p>
                  <p>
                    <strong>Body:</strong>
                  </p>
                  <div>{emailDetails.body}</div>
                </Panel>
              </Collapse>
            )}
          </ProCard>
        </div>
      </div>

      {/* Modal for Composing Email */}
      <Modal
        title="Compose Email"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleComposeEmail}>
          <Form.Item
            label="Recipient"
            name="recipient"
            rules={[
              { required: true, message: 'Please enter the recipient email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter the subject!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[
              { required: true, message: 'Please enter the email body!' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
};

export default EmailSettings;
