// import React, { useState, useEffect } from 'react';
// import { Form, Select, message, Row, Col, Typography } from 'antd';
// import { request } from 'umi';

// const { Title } = Typography;
// const { Option } = Select;

// const Settings = () => {
//   const [form] = Form.useForm();
//   const [serverOptions, setServerOptions] = useState([]);

//   useEffect(() => {
//     const fetchServerOptions = async () => {
//       try {
//         const response = await request('/mail-config');
//         if (response.success) {
//           setServerOptions([{ value: 'smtp', label: 'SMTP' }, { value: 'sendmail', label: 'Sendmail' }]);
//         } else {
//           message.error(response.message || 'Failed to fetch server options');
//         }
//       } catch (error) {
//         message.error('Failed to fetch server options');
//       }
//     };

//     fetchServerOptions();
//   }, []);

//   const handleUpdateConfig = async (values) => {
//     try {
//       await request('/mail-config/update', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email configuration updated successfully');
//     } catch (error) {
//       message.error('Failed to update email configuration');
//     }
//   };

//   return (
//     <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
//       <Col xs={24} sm={20} md={16} lg={12}>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleUpdateConfig}
//           style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}
//         >
//           <Title level={4}>Email Configuration</Title>
//           <Form.Item
//             label="Mailer"
//             name="mailer"
//             rules={[{ required: true, message: 'Please select the mailer!' }]}
//           >
//             <Select style={{ width: '100%' }}>
//               {serverOptions.map((option) => (
//                 <Option key={option.value} value={option.value}>{option.label}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           {/* Add other form fields as needed */}
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from 'react';
import { Form, Select, message, Row, Col, Typography, Input, Button, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { request } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const Settings = () => {
  const [form] = Form.useForm();
  const [serverOptions, setServerOptions] = useState([]);
  const [currentConfig, setCurrentConfig] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  // Fetch mail configuration and available mailers
  useEffect(() => {
    const fetchMailConfig = async () => {
      try {
        const configResponse = await request('/mail-config');
        const mailerResponse = await request('/mailers');
        if (configResponse.success && mailerResponse) {
          setCurrentConfig(configResponse.data);
          setServerOptions(mailerResponse.map((mailer) => ({ value: mailer.name, label: mailer.description })));
          form.setFieldsValue({
            mailer: configResponse.data.mailer,
            host: configResponse.data.configurations.host,
            port: configResponse.data.configurations.port,
            fromName: configResponse.data.configurations.fromName,
            username: configResponse.data.configurations.username,
            fromEmail: configResponse.data.configurations.fromEmail,
            password: configResponse.data.configurations.password,
          });
        } else {
          message.error(configResponse.message || 'Failed to fetch mail configuration');
        }
      } catch (error) {
        message.error('Error fetching data');
      }
    };
    fetchMailConfig();
  }, [form]);

  // Handle updating email configuration
  const handleUpdateConfig = async (values) => {
    try {
      const response = await request('/mail-config', {
        method: 'PUT',
        data: values,
      });
      if (response.success) {
        message.success('Mail configuration updated successfully');
      } else {
        message.error(response.message || 'Failed to update mail configuration');
      }
    } catch (error) {
      message.error('Error updating mail configuration');
    }
  };

  // Show modal for testing email config
  const showTestModal = () => {
    setIsModalVisible(true);
  };

  // Handle test email send
  const handleTestEmail = async () => {
    try {
      const response = await request('/mail-config/test', {
        method: 'POST',
        data: { email: testEmail },
      });
      if (response.success) {
        message.success('Test email sent successfully');
        setIsModalVisible(false);
      } else {
        message.error(response.message || 'Failed to send test email');
      }
    } catch (error) {
      message.error('Error sending test email');
    }
  };

  return (
    <PageContainer>
      <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateConfig}
            style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>Email Configuration</Title>
            <Form.Item
              label="Mailer"
              name="mailer"
              rules={[{ required: true, message: 'Please select the mailer!' }]}
            >
              <Select placeholder="Select mailer">
                {serverOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Host"
              name="host"
              rules={[{ required: true, message: 'Please input the host!' }]}
            >
              <Input placeholder="e.g. smtp.gmail.com" />
            </Form.Item>
            <Form.Item
              label="Port"
              name="port"
              rules={[{ required: true, message: 'Please input the port!' }]}
            >
              <Input type="number" placeholder="e.g. 587" />
            </Form.Item>
            <Form.Item
              label="From Name"
              name="fromName"
              rules={[{ required: true, message: 'Please input the from name!' }]}
            >
              <Input placeholder="e.g. Example App" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input the username!' }]}
            >
              <Input placeholder="e.g. sosmongare@gmail.com" />
            </Form.Item>
            <Form.Item
              label="From Email"
              name="fromEmail"
              rules={[{ required: true, message: 'Please input the from email!' }]}
            >
              <Input placeholder="e.g. sosmongare@gmail.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Save Settings
                  </Button>
                </Col>
                <Col>
                  <Button type="dashed" onClick={showTestModal}>
                    Test Email Config
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Test email modal */}
      <Modal
        title="Test Email Configuration"
        visible={isModalVisible}
        onOk={handleTestEmail}
        onCancel={() => setIsModalVisible(false)}
        okText="Send Test Email"
      >
        <Form layout="vertical">
          <Form.Item label="Test Email Address">
            <Input
              placeholder="Enter email to send test"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Settings;
