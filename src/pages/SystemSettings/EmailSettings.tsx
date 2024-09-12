// import { ProCard } from '@ant-design/pro-components';
// import {
//   Button,
//   Collapse,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Space,
//   Table,
//   Typography,
// } from 'antd';
// import { useEffect, useState } from 'react';
// import { request } from 'umi'; // Import request from umi for API calls

// const { Title } = Typography;
// const { Panel } = Collapse;

// const EmailSettings = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [emails, setEmails] = useState<any[]>([]);
//   const [emailDetailsVisible, setEmailDetailsVisible] = useState<string | null>(
//     null,
//   );

//   // Fetch emails for viewing
//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const response = await request('/emails');
//         if (response.success === 'true') {
//           setEmails(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch emails');
//         }
//       } catch (error) {
//         message.error('Failed to fetch emails');
//         console.error(error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   // Handle email deletion
//   const handleDeleteEmail = async (emailId: string) => {
//     try {
//       await request(`/emails/${emailId}`, { method: 'DELETE' });
//       message.success('Email deleted successfully');
//       setEmails(emails.filter((email) => email.id !== emailId));
//     } catch (error) {
//       message.error('Failed to delete email');
//       console.error(error);
//     }
//   };

//   const handleComposeEmail = async (values: any) => {
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email sent successfully');
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to send email');
//       console.error(error);
//     }
//   };

//   const emailColumns = [
//     {
//       title: 'Recipient',
//       dataIndex: 'recipient',
//       key: 'recipient',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//     },
//     {
//       title: 'Date Sent',
//       dataIndex: 'dateSent',
//       key: 'dateSent',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: any) => (
//         <Space size="middle">
//           <Button
//             onClick={() =>
//               setEmailDetailsVisible(
//                 record.id === emailDetailsVisible ? null : record.id,
//               )
//             }
//           >
//             {emailDetailsVisible === record.id
//               ? 'Hide Details'
//               : 'View Details'}
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this email?"
//             onConfirm={() => handleDeleteEmail(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   const emailDetails = emails.find((email) => email.id === emailDetailsVisible);

//   return (
//     <ProCard title="" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>
//           Email Settings
//         </Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {/* Email Setup */}
//           <ProCard bordered>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <div>Email Setup</div>
//               <Button type="primary" onClick={() => setIsModalVisible(true)}>
//                 Compose Email
//               </Button>
//             </div>
//           </ProCard>

//           {/* Email Template */}
//           <ProCard bordered>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <div>Email Template</div>
//               <Button type="primary">View Template</Button>
//             </div>
//           </ProCard>

//           {/* Email Logs/Queue */}
//           <ProCard bordered>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <div>Email Logs/Queue</div>
//               <Button
//                 type="primary"
//                 onClick={() => setEmailDetailsVisible(null)}
//               >
//                 {emailDetailsVisible ? 'Hide Logs/Queue' : 'View Logs/Queue'}
//               </Button>
//             </div>
//             {emailDetailsVisible === null && (
//               <Table
//                 columns={emailColumns}
//                 dataSource={emails}
//                 rowKey="id"
//                 pagination={{ pageSize: 10 }}
//                 style={{ marginTop: '16px' }}
//               />
//             )}
//             {emailDetailsVisible && emailDetails && (
//               <Collapse defaultActiveKey={['1']} style={{ marginTop: '16px' }}>
//                 <Panel
//                   header={`Details for Email ID: ${emailDetails.id}`}
//                   key="1"
//                 >
//                   <p>
//                     <strong>Recipient:</strong> {emailDetails.recipient}
//                   </p>
//                   <p>
//                     <strong>Subject:</strong> {emailDetails.subject}
//                   </p>
//                   <p>
//                     <strong>Date Sent:</strong> {emailDetails.dateSent}
//                   </p>
//                   <p>
//                     <strong>Body:</strong>
//                   </p>
//                   <div>{emailDetails.body}</div>
//                 </Panel>
//               </Collapse>
//             )}
//           </ProCard>
//         </div>
//       </div>

//       {/* Modal for Composing Email */}
//       <Modal
//         title="Compose Email"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form layout="vertical" onFinish={handleComposeEmail}>
//           <Form.Item
//             label="Recipient"
//             name="recipient"
//             rules={[
//               { required: true, message: 'Please enter the recipient email!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Subject"
//             name="subject"
//             rules={[{ required: true, message: 'Please enter the subject!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Body"
//             name="body"
//             rules={[
//               { required: true, message: 'Please enter the email body!' },
//             ]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default EmailSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import {
//   Button,
//   Collapse,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Select,
//   Space,
//   Table,
//   Tabs,
//   Typography,
// } from 'antd';
// import { request } from 'umi';

// const { Title } = Typography;
// const { Panel } = Collapse;
// const { TabPane } = Tabs;
// const { Option } = Select;

// const EmailSettings = () => {
//   const [form] = Form.useForm();
//   const [currentConfig, setCurrentConfig] = useState<any>({});
//   const [serverOptions, setServerOptions] = useState<any[]>([]);
//   const [templates, setTemplates] = useState<any[]>([]);
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
//   const [emails, setEmails] = useState<any[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Fetch email configuration
//   useEffect(() => {
//     const fetchEmailConfig = async () => {
//       try {
//         const response = await request('/mail-config');
//         if (response.success) {
//           setCurrentConfig(response.data);
//           form.setFieldsValue({
//             mailer: response.data.mailer,
//             host: response.data.host,
//             port: response.data.port,
//             username: response.data.username,
//             password: response.data.password,
//             fromEmail: response.data.fromEmail,
//             fromName: response.data.fromName,
//           });
//         } else {
//           message.error(response.message || 'Failed to fetch email config');
//         }
//       } catch (error) {
//         message.error('Failed to fetch email config');
//         console.error(error);
//       }
//     };

//     fetchEmailConfig();
//   }, [form]);

//   // Fetch server options
//   useEffect(() => {
//     const fetchServerOptions = async () => {
//       try {
//         const response = await request('/mail-config');
//         if (response.success) {
//           // Populate server options if needed
//           setServerOptions([{ value: 'smtp', label: 'SMTP' }, { value: 'sendmail', label: 'Sendmail' }]);
//         } else {
//           message.error(response.message || 'Failed to fetch server options');
//         }
//       } catch (error) {
//         message.error('Failed to fetch server options');
//         console.error(error);
//       }
//     };

//     fetchServerOptions();
//   }, []);

//   // Fetch email templates
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await request('/templates');
//         if (response.success) {
//           setTemplates(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch templates');
//         }
//       } catch (error) {
//         message.error('Failed to fetch templates');
//         console.error(error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   // Fetch single template
//   const fetchTemplate = async (templateId: string) => {
//     try {
//       const response = await request(`/templates/${templateId}`);
//       if (response.success) {
//         setSelectedTemplate(response.data);
//       } else {
//         message.error(response.message || 'Failed to fetch template');
//       }
//     } catch (error) {
//       message.error('Failed to fetch template');
//       console.error(error);
//     }
//   };

//   // Handle update email configuration
//   const handleUpdateConfig = async (values: any) => {
//     try {
//       await request('/mail-config/update', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email configuration updated successfully');
//     } catch (error) {
//       message.error('Failed to update email configuration');
//       console.error(error);
//     }
//   };

//   // Handle email deletion
//   const handleDeleteEmail = async (emailId: string) => {
//     try {
//       await request(`/emails/${emailId}`, { method: 'DELETE' });
//       message.success('Email deleted successfully');
//       setEmails(emails.filter((email) => email.id !== emailId));
//     } catch (error) {
//       message.error('Failed to delete email');
//       console.error(error);
//     }
//   };

//   // Handle compose email
//   const handleComposeEmail = async (values: any) => {
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email sent successfully');
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to send email');
//       console.error(error);
//     }
//   };

//   // Fetch sent emails
//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const response = await request('/emails');
//         if (response.success) {
//           setEmails(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch emails');
//         }
//       } catch (error) {
//         message.error('Failed to fetch emails');
//         console.error(error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   // Columns for email logs
//   const emailColumns = [
//     {
//       title: 'Recipient',
//       dataIndex: 'recipient',
//       key: 'recipient',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//     },
//     {
//       title: 'Date Sent',
//       dataIndex: 'dateSent',
//       key: 'dateSent',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: any) => (
//         <Space size="middle">
//           <Popconfirm
//             title="Are you sure you want to delete this email?"
//             onConfirm={() => handleDeleteEmail(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <ProCard title="Email Settings" bordered>
//       <Tabs defaultActiveKey="1">
//         {/* Settings Tab */}
//         <TabPane tab="Settings" key="1">
//           <ProCard bordered>
//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={handleUpdateConfig}
//               style={{ padding: '16px' }}
//             >
//               <Form.Item
//                 label="Mailer"
//                 name="mailer"
//                 rules={[
//                   { required: true, message: 'Please select the mailer!' },
//                 ]}
//               >
//                 <Select>
//                   {serverOptions.map(option => (
//                     <Option key={option.value} value={option.value}>
//                       {option.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 label="Host"
//                 name="host"
//                 rules={[
//                   { required: true, message: 'Please enter the host!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Port"
//                 name="port"
//                 rules={[
//                   { required: true, message: 'Please enter the port!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Username"
//                 name="username"
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Password"
//                 name="password"
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 label="From Email"
//                 name="fromEmail"
//                 rules={[
//                   { required: true, message: 'Please enter the from email!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="From Name"
//                 name="fromName"
//                 rules={[
//                   { required: true, message: 'Please enter the from name!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Save Settings
//                 </Button>
//               </Form.Item>
//             </Form>
//           </ProCard>
//         </TabPane>

//         {/* Email Template Tab */}
//         <TabPane tab="Email Template" key="2">
//           <ProCard bordered>
//             <div style={{ padding: '16px' }}>
//               <Title level={5} style={{ marginBottom: '16px' }}>
//                 Email Templates
//               </Title>
//               <Form
//                 layout="vertical"
//                 onFinish={async (values) => {
//                   try {
//                     await request('/templates', {
//                       method: 'POST',
//                       data: values,
//                     });
//                     message.success('Template created successfully');
//                     await fetchTemplates();
//                   } catch (error) {
//                     message.error('Failed to create template');
//                     console.error(error);
//                   }
//                 }}
//               >
//                 <Form.Item label="Template Name" name="name">
//                   <Input />
//                 </Form.Item>
//                 <Form.Item label="Template Body" name="body">
//                   <Input.TextArea rows={4} />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Create Template
//                   </Button>
//                 </Form.Item>
//               </Form>
//               <div style={{ marginTop: '24px' }}>
//                 <Title level={5}>Available Templates</Title>
//                 <Table
//                   dataSource={templates}
//                   columns={[
//                     { title: 'Name', dataIndex: 'name', key: 'name' },
//                     { title: 'Body', dataIndex: 'body', key: 'body', render: (text: string) => text.slice(0, 50) + '...' },
//                     {
//                       title: 'Action',
//                       key: 'action',
//                       render: (_: any, record: any) => (
//                         <Space size="middle">
//                           <Button onClick={() => fetchTemplate(record.id)}>View</Button>
//                           <Popconfirm
//                             title="Are you sure you want to delete this template?"
//                             onConfirm={async () => {
//                               try {
//                                 await request(`/templates/${record.id}`, { method: 'DELETE' });
//                                 message.success('Template deleted successfully');
//                                 await fetchTemplates();
//                               } catch (error) {
//                                 message.error('Failed to delete template');
//                                 console.error(error);
//                               }
//                             }}
//                             okText="Yes"
//                             cancelText="No"
//                           >
//                             <Button danger>Delete</Button>
//                           </Popconfirm>
//                         </Space>
//                       ),
//                     },
//                   ]}
//                 />
//               </div>
//               {selectedTemplate && (
//                 <div style={{ marginTop: '24px' }}>
//                   <Title level={5}>Template Preview</Title>
//                   <div
//                     style={{
//                       border: '1px solid #ddd',
//                       padding: '16px',
//                       borderRadius: '4px',
//                       backgroundColor: '#f9f9f9',
//                     }}
//                     dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
//                   />
//                 </div>
//               )}
//             </div>
//           </ProCard>
//         </TabPane>

//         {/* Queue Tab */}
//         <TabPane tab="Queue" key="3">
//           <ProCard bordered>
//             <Title level={5} style={{ marginBottom: '16px' }}>
//               Sent Emails
//             </Title>
//             <Table
//               dataSource={emails}
//               columns={emailColumns}
//               rowKey="id"
//             />
//           </ProCard>
//         </TabPane>

//         {/* Compose Email Tab */}
//         <TabPane tab="Compose Email" key="4">
//           <ProCard bordered>
//             <Form
//               layout="vertical"
//               onFinish={handleComposeEmail}
//               style={{ padding: '16px' }}
//             >
//               <Form.Item
//                 label="To"
//                 name="to"
//                 rules={[
//                   { required: true, message: 'Please enter the recipient email!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Subject"
//                 name="subject"
//                 rules={[
//                   { required: true, message: 'Please enter the email subject!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Body"
//                 name="body"
//                 rules={[
//                   { required: true, message: 'Please enter the email body!' },
//                 ]}
//               >
//                 <Input.TextArea rows={4} />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Send Email
//                 </Button>
//               </Form.Item>
//             </Form>
//           </ProCard>
//         </TabPane>
//       </Tabs>

//       {/* Compose Email Modal */}
//       <Modal
//         title="Compose Email"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           onFinish={handleComposeEmail}
//         >
//           <Form.Item
//             label="To"
//             name="to"
//             rules={[
//               { required: true, message: 'Please enter the recipient email!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Subject"
//             name="subject"
//             rules={[
//               { required: true, message: 'Please enter the email subject!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Body"
//             name="body"
//             rules={[
//               { required: true, message: 'Please enter the email body!' },
//             ]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default EmailSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import {
//   Button,
//   Collapse,
//   Form,
//   Input,
//   message,
//   Modal,
//   Popconfirm,
//   Select,
//   Space,
//   Table,
//   Tabs,
//   Typography,
// } from 'antd';
// import { request } from 'umi';

// const { Title } = Typography;
// const { Panel } = Collapse;
// const { TabPane } = Tabs;
// const { Option } = Select;

// const EmailSettings= () => {
//   const [form] = Form.useForm();
//   const [currentConfig, setCurrentConfig] = useState<any>({});
//   const [serverOptions, setServerOptions] = useState<any[]>([]);
//   const [templates, setTemplates] = useState<any[]>([]);
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
//   const [emails, setEmails] = useState<any[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isTestEmailModalVisible, setIsTestEmailModalVisible] = useState(false);
  

//   // Fetch email configuration
//   useEffect(() => {
//     const fetchEmailConfig = async () => {
//       try {
//         const response = await request('/mail-config');
//         if (response.success) {
//           setCurrentConfig(response.data);
//           form.setFieldsValue({
//             mailer: response.data.mailer,
//             host: response.data.host,
//             port: response.data.port,
//             username: response.data.username,
//             password: response.data.password,
//             fromEmail: response.data.fromEmail,
//             fromName: response.data.fromName,
//           });
//         } else {
//           message.error(response.message || 'Failed to fetch email config');
//         }
//       } catch (error) {
//         message.error('Failed to fetch email config');
//         console.error(error);
//       }
//     };

//     fetchEmailConfig();
//   }, [form]);

//   // Fetch server options
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
//         console.error(error);
//       }
//     };

//     fetchServerOptions();
//   }, []);

//   // Fetch email templates
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await request('/templates');
//         if (response.success) {
//           setTemplates(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch templates');
//         }
//       } catch (error) {
//         message.error('Failed to fetch templates');
//         console.error(error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   // Fetch single template
//   const fetchTemplate = async (templateId: string) => {
//     try {
//       const response = await request(`/templates/${templateId}`);
//       if (response.success) {
//         setSelectedTemplate(response.data);
//       } else {
//         message.error(response.message || 'Failed to fetch template');
//       }
//     } catch (error) {
//       message.error('Failed to fetch template');
//       console.error(error);
//     }
//   };

//   // Handle update email configuration
//   const handleUpdateConfig = async (values: any) => {
//     try {
//       await request('/mail-config/update', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email configuration updated successfully');
//     } catch (error) {
//       message.error('Failed to update email configuration');
//       console.error(error);
//     }
//   };

//   // Handle email deletion
//   const handleDeleteEmail = async (emailId: string) => {
//     try {
//       await request(`/emails/${emailId}`, { method: 'DELETE' });
//       message.success('Email deleted successfully');
//       setEmails(emails.filter((email) => email.id !== emailId));
//     } catch (error) {
//       message.error('Failed to delete email');
//       console.error(error);
//     }
//   };

//   // Handle compose email
//   const handleComposeEmail = async (values: any) => {
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Email sent successfully');
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error('Failed to send email');
//       console.error(error);
//     }
//   };

//   // Handle sending test email
//   const handleSendTestEmail = async (values: any) => {
//     try {
//       await request('/test-email', {
//         method: 'POST',
//         data: values,
//       });
//       message.success('Test email sent successfully');
//       setIsTestEmailModalVisible(false);
//     } catch (error) {
//       message.error('Failed to send test email');
//       console.error(error);
//     }
//   };
 
//   // Fetch sent emails
//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const response = await request('/emails');
//         if (response.success) {
//           setEmails(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch emails');
//         }
//       } catch (error) {
//         message.error('Failed to fetch emails');
//         console.error(error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   // Columns for email logs
//   const emailColumns = [
//     {
//       title: 'Recipient',
//       dataIndex: 'recipient',
//       key: 'recipient',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//     },
//     {
//       title: 'Date Sent',
//       dataIndex: 'dateSent',
//       key: 'dateSent',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: any) => (
//         <Space size="middle">
//           <Popconfirm
//             title="Are you sure you want to delete this email?"
//             onConfirm={() => handleDeleteEmail(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <ProCard title="Email Settings" bordered>
//       <Tabs defaultActiveKey="1">
//         {/* Settings Tab */}
//         <TabPane tab="Settings" key="1">
//           <ProCard bordered>
//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={handleUpdateConfig}
//               style={{ padding: '16px' }}
//             >
//               <Form.Item
//                 label="Mailer"
//                 name="mailer"
//                 rules={[{ required: true, message: 'Please select the mailer!' }]}
//               >
//                 <Select>
//                   {serverOptions.map(option => (
//                     <Option key={option.value} value={option.value}>
//                       {option.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 label="Host"
//                 name="host"
//                 rules={[{ required: true, message: 'Please enter the host!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Port"
//                 name="port"
//                 rules={[{ required: true, message: 'Please enter the port!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Username"
//                 name="username"
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Password"
//                 name="password"
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 label="From Email"
//                 name="fromEmail"
//                 rules={[{ required: true, message: 'Please enter the from email!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="From Name"
//                 name="fromName"
//                 rules={[{ required: true, message: 'Please enter the from name!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Save Settings
//                 </Button>
//                 <Button
//                   type="default"
//                   style={{ marginLeft: '16px' }}
//                   onClick={() => setIsTestEmailModalVisible(true)}
//                 >
//                   Test Email Settings
//                 </Button>
//               </Form.Item>
//             </Form>
//           </ProCard>
//         </TabPane>

//         {/* Email Template Tab */}
//         <TabPane tab="Email Template" key="2">
//           <ProCard bordered>
//             <div style={{ padding: '16px' }}>
//               <Title level={5} style={{ marginBottom: '16px' }}>
//                 Email Templates
//               </Title>
//               <Form
//                 layout="vertical"
//                 onFinish={async (values) => {
//                   try {
//                     await request('/templates', {
//                       method: 'POST',
//                       data: values,
//                     });
//                     message.success('Template saved successfully');
//                   } catch (error) {
//                     message.error('Failed to save template');
//                     console.error(error);
//                   }
//                 }}
//               >
//                 <Form.Item
//                   label="Template"
//                   name="templateId"
//                   rules={[{ required: true, message: 'Please select a template!' }]}
//                 >
//                   <Select onChange={fetchTemplate}>
//                     {templates.map(template => (
//                       <Option key={template.id} value={template.id}>
//                         {template.name}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Template Content">
//                   <div
//                     style={{
//                       border: '1px solid #d9d9d9',
//                       borderRadius: '4px',
//                       padding: '8px',
//                       minHeight: '200px',
//                       overflowY: 'auto',
//                       background: '#fafafa',
//                     }}
//                     dangerouslySetInnerHTML={{ __html: selectedTemplate?.content || '' }}
//                   />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Save Template
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </div>
//           </ProCard>
//         </TabPane>

//         {/* Email Logs Tab */}
//         <TabPane tab="Email Logs" key="3">
//           <ProCard bordered>
//             <Table columns={emailColumns} dataSource={emails} rowKey="id" />
//           </ProCard>
//         </TabPane>
//       </Tabs>

//       {/* Test Email Modal */}
//       <Modal
//         title="Compose Email"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           onFinish={handleComposeEmail}
//         >
//           <Form.Item
//             label="To"
//             name="to"
//             rules={[
//               { required: true, message: 'Please enter the recipient email!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Subject"
//             name="subject"
//             rules={[
//               { required: true, message: 'Please enter the email subject!' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Body"
//             name="body"
//             rules={[
//               { required: true, message: 'Please enter the email body!' },
//             ]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default EmailSettings;
import React, { useState, useEffect } from 'react';
import { ProCard } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
  Switch,
  Checkbox,
} from 'antd';
import { request } from 'umi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const EmailSettings = () => {
  const [form] = Form.useForm();
  const [currentConfig, setCurrentConfig] = useState<any>({});
  const [serverOptions, setServerOptions] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isSendEmailModalVisible, setIsSendEmailModalVisible] = useState(false);
  const [isTestEmailModalVisible, setIsTestEmailModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComposeEmailModalVisible, setIsComposeEmailModalVisible] = useState(false);
  const [isComposeModalVisible, setIsComposeModalVisible] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);



  // Fetch email configuration
  useEffect(() => {
    const fetchEmailConfig = async () => {
      try {
        const response = await request('/mail-config');
        if (response.success) {
          setCurrentConfig(response.data);
          form.setFieldsValue({
            mailer: response.data.mailer,
            host: response.data.host,
            port: response.data.port,
            username: response.data.username,
            password: response.data.password,
            fromEmail: response.data.fromEmail,
            fromName: response.data.fromName,
          });
        } else {
          message.error(response.message || 'Failed to fetch email config');
        }
      } catch (error) {
        message.error('Failed to fetch email config');
        console.error(error);
      }
    };

    fetchEmailConfig();
  }, [form]);

  // Fetch server options
  useEffect(() => {
    const fetchServerOptions = async () => {
      try {
        const response = await request('/mail-config');
        if (response.success) {
          setServerOptions([{ value: 'smtp', label: 'SMTP' }, { value: 'sendmail', label: 'Sendmail' }]);
        } else {
          message.error(response.message || 'Failed to fetch server options');
        }
      } catch (error) {
        message.error('Failed to fetch server options');
        console.error(error);
      }
    };

    fetchServerOptions();
  }, []);
  const fetchTemplates = async () => {
    try {
      const response = await request('/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Failed to fetch templates', error);
    }
  };
  
  // Call fetchTemplates initially
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Fetch single template
  const fetchTemplate = async (templateId: string) => {
    try {
      const response = await request(`/templates/${templateId}`);
      if (response.success) {
        setSelectedTemplate(response.data);
      } else {
        message.error(response.message || 'Failed to fetch template');
      }
    } catch (error) {
      message.error('Failed to fetch template');
      console.error(error);
    }
  };

  // Handle update email configuration
  const handleUpdateConfig = async (values: any) => {
    try {
      await request('/mail-config/update', {
        method: 'POST',
        data: values,
      });
      message.success('Email configuration updated successfully');
    } catch (error) {
      message.error('Failed to update email configuration');
      console.error(error);
    }
  };

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
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedEmails.map(emailId =>
        request(`/emails/${emailId}`, { method: 'DELETE' })
      ));
      message.success('Selected emails deleted successfully');
      setEmails(emails.filter(email => !selectedEmails.includes(email.id)));
      setSelectedEmails([]);
    } catch (error) {
      message.error('Failed to delete selected emails');
      console.error(error);
    }
  };
  // Handle compose email
  // const handleComposeEmail = async (values: any) => {
  //   try {
  //     await request('/compose-email', {
  //       method: 'POST',
  //       data: values,
  //     });
  //     message.success('Email sent successfully');
  //     setIsSendEmailModalVisible(false);
  //     fetchEmails(); // Refresh email list after sending
  //   } catch (error) {
  //     message.error('Failed to send email');
  //     console.error(error);
  //   }
  // };
  const handleComposeEmail = async (values) => {
    try {
      await request('/compose-email', {
        method: 'POST',
        data: { ...values, body: editorContent },
      });
      message.success('Email sent successfully');
      setIsComposeEmailModalVisible(false);
      setEditorContent('');
    } catch (error) {
      message.error('Failed to send email');
      console.error(error);
    }
  };
  const handleSendTestEmail = async (values: any) => {
    try {
      // Update the payload to send "email" instead of "testEmail"
      await request('/mail-config/test', {
        method: 'POST',
        data: { email: values.testEmail },
      });
      message.success('Test email sent successfully');
      setIsTestEmailModalVisible(false);
    } catch (error) {
      message.error('Failed to send test email');
      console.error(error);
    }
  };
  
  const fetchEmails = async () => {
    try {
      const response = await request('/emails');
      if (response.success) {
        setEmails(response.data);
      } else {
        message.error(response.message || 'Failed to fetch emails');
      }
    } catch (error) {
      message.error('Failed to fetch emails');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Columns for email logs
  // const emailColumns = [
  //   {
  //     title: 'Recipient',
  //     dataIndex: 'to',
  //     key: 'recipient',
  //   },
  //   {
  //     title: 'Subject',
  //     dataIndex: 'subject',
  //     key: 'subject',
  //   },
  //   {
  //     title: 'Date Sent',
  //     dataIndex: 'sent_at',
  //     key: 'dateSent',
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_: any, record: any) => (
  //       <Space size="middle">
  //         <Popconfirm
  //           title="Are you sure you want to delete this email?"
  //           onConfirm={() => handleDeleteEmail(record.id)}
  //           okText="Yes"
  //           cancelText="No"
  //         >
  //           <Button danger>Delete</Button>
  //         </Popconfirm>
  //       </Space>
  //     ),
  //   },
  // ];

  const handleCreateTemplate = async (values: any) => {
    try {
      const response = await request('/templates', {
        method: 'POST',
        data: {
          name: values.templateName,
          subject: values.subject, // Add subject field
          body: editorContent,
        },
      });
      if (response.success) {
        message.success('Template created successfully');
        setIsCreateModalVisible(false);
        setEditorContent('');
        // Refresh the template list
        fetchTemplates();
      } else {
        message.error(response.message || 'Failed to create template');
      }
    } catch (error) {
      message.error('Failed to create template');
      console.error(error);
    }
  };

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
  };

  const templateColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      render: (text, record) => (
        <Switch
          checked={record.status === 'Active'}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: 'Option',
      render: (text, record) => (
        <>
          <Button onClick={() => handleView(record.id)}>View</Button>
          <Button onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];
  const handleView = async (templateId) => {
    try {
      const response = await request(`/templates/${templateId}`);
      if (response.success) {
        setSelectedTemplate(response.data);
        // Pre-fill the form with the template data
        form.setFieldsValue({
          templateName: response.data.name,
          subject: response.data.subject,
          body: response.data.body, // Ensure the form field name matches the one used for the body
        });
        setIsViewModalVisible(true); // Show the modal to view the template
      } else {
        message.error(response.message || 'Failed to fetch template');
      }
    } catch (error) {
      message.error('Failed to fetch template');
      console.error(error);
    }
  };
  const handleEdit = async (templateId: string) => {
    try {
      const response = await request(`/templates/${templateId}`);
      if (response.success) {
        setSelectedTemplate(response.data);
        form.setFieldsValue({
          templateName: response.data.name,
          subject: response.data.subject,
          body: response.data.body,
        });
        setIsModalVisible(true); 
      } else {
        message.error(response.message || 'Failed to fetch template for editing');
      }
    } catch (error) {
      message.error('Failed to fetch template for editing');
      console.error(error);
    }
  };

  const handleDelete = async (templateId) => {
    try {
      await request(`/templates/${templateId}`, { method: 'DELETE' });
      message.success('Template deleted successfully');
      fetchTemplates();
    } catch (error) {
      message.error('Failed to delete template');
      console.error(error);
    }
  };
  const handleStatusChange = async (templateId, checked) => {
    try {
      await request(`/templates/${templateId}/status`, {
        method: 'PATCH',
        data: { status: checked ? 'Active' : 'Inactive' },
      });
      message.success('Status updated successfully');
      fetchTemplates();
    } catch (error) {
      message.error('Failed to update status');
      console.error(error);
    }
  };
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      const method = selectedTemplate ? 'PUT' : 'POST';
      const url = selectedTemplate ? `/templates/${selectedTemplate.id}` : '/templates';
      await request(url, {
        method,
        data: values,
      });
      message.success('Template saved successfully');
      setIsModalVisible(false);
      fetchTemplates();
    } catch (error) {
      message.error('Failed to save template');
      console.error(error);
    }
  };
  const handleTemplateSelect = async (templateId) => {
    try {
      const response = await request(`/templates/${templateId}`);
      if (response.success) {
        setEditorContent(response.data.body);
      } else {
        message.error(response.message || 'Failed to fetch template');
      }
    } catch (error) {
      message.error('Failed to fetch template');
      console.error(error);
    }
  };

  const emailColumns = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: (_, record) => (
        <Checkbox
          onChange={(e) => {
            const { checked } = e.target;
            setSelectedEmails(prevSelectedEmails => checked
              ? [...prevSelectedEmails, record.id]
              : prevSelectedEmails.filter(id => id !== record.id)
            );
          }}
        />
      ),
    },
    { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent' },
  ];
  return (
    <ProCard title="Email Settings" bordered>
      <Tabs defaultActiveKey="1">
        {/* Settings Tab */}
        <TabPane tab="Settings" key="1">
          <ProCard bordered>
            <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
              <Col xs={24} sm={20} md={16} lg={12}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateConfig}
                  style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}
                >
                  <Title level={4}>Email Configuration</Title>
                  <Form.Item
                    label="Mailer"
                    name="mailer"
                    rules={[{ required: true, message: 'Please select the mailer!' }]}
                  >
                    <Select style={{ width: '100%' }}>
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
                    rules={[{ required: true, message: 'Please enter the host!' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="Port"
                    name="port"
                    rules={[{ required: true, message: 'Please enter the port!' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Username" name="username">
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="From Email"
                    name="fromEmail"
                    rules={[{ required: true, message: 'Please enter the from email!' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="From Name"
                    name="fromName"
                    rules={[{ required: true, message: 'Please enter the from name!' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
                      Save Settings
                    </Button>
                    <Button
                      type="default"
                      onClick={() => setIsTestEmailModalVisible(true)}
                    >
                      Test Email Settings
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </ProCard>
        </TabPane>

        {/* Email Template Tab */}
        <TabPane tab="Email Template" key="2">
        <Row justify="space-between" align="middle" style={{ padding: '16px' }}>
          <Col>
            <Title level={4}>Admin Email Templates</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => setIsCreateModalVisible(true)}
            >
              Create Template
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={templates}
          columns={templateColumns}
          rowKey="id"
          style={{ marginTop: '16px' }}
        />
      </TabPane>
        {/* Email Queue Tab */}
        {/* <TabPane tab="Queue" key="3">
          <ProCard bordered>
            <div style={{ padding: '16px' }}>
              <Title level={5} style={{ marginBottom: '16px' }}>
                Email Queue (Sent Emails)
              </Title>
              <Table
                columns={emailColumns}
                dataSource={emails}
                rowKey="id"
                style={{ marginTop: '16px' }}
              />
            </div>
          </ProCard>
        </TabPane> */}
 <TabPane tab="Queue" key="3">
          <ProCard bordered>
            <div style={{ padding: '16px' }}>
              <Row justify="space-between" style={{ marginBottom: '16px' }}>
                <Col>
                  <Button
                    type="primary"
                    danger
                    onClick={handleDeleteSelected}
                    disabled={selectedEmails.length === 0}
                  >
                    Delete Selected
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => setIsComposeEmailModalVisible(true)}
                  >
                    Test Email
                  </Button>
                </Col>
              </Row>
              <Title level={5} style={{ marginBottom: '16px' }}>
                Email Queue (Sent Emails)
              </Title>
              <Table
                columns={emailColumns}
                dataSource={emails}
                rowKey="id"
                style={{ marginTop: '16px' }}
              />
            </div>
          </ProCard>
        </TabPane>
        {/* Send Email Tab */}
        <TabPane tab="Send Email" key="4">
          <ProCard bordered>
            <div style={{ padding: '16px' }}>
              <Button
                type="primary"
                onClick={() => setIsComposeEmailModalVisible(true)}
              >
                Compose Email
              </Button>
              <Table
                columns={emailColumns}
                dataSource={emails}
                rowKey="id"
                style={{ marginTop: '16px' }}
              />
            </div>
          </ProCard>
        </TabPane>
      </Tabs>
      <Modal
        title="Compose Email"
        visible={isComposeEmailModalVisible}
        onCancel={() => setIsComposeEmailModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleComposeEmail}>
          <Form.Item name="to" label="Recipient" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="template" label="Select Template">
            <Select onChange={handleTemplateSelect}>
              {templates.map(template => (
                <Select.Option key={template.id} value={template.id}>
                  {template.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="body" label="Body">
            <CKEditor
              editor={ClassicEditor}
              data={editorContent}
              onChange={(event, editor) => setEditorContent(editor.getData())}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Settings Modal */}
      <Modal
        title="Test Email Configuration"
        visible={isTestEmailModalVisible}
        onCancel={() => setIsTestEmailModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSendTestEmail}>
          <Form.Item
            label="Test Email Address"
            name="testEmail"
            rules={[{ required: true, message: 'Please enter an email address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Test Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Send Email Modal */}
      <Modal
        title="Compose Email"
        visible={isSendEmailModalVisible}
        onCancel={() => setIsSendEmailModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleComposeEmail}>
  <Form.Item
    label="Recipient"
    name="to"  // Update to match the expected field
    rules={[{ required: true, message: 'Please enter recipient email!' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Subject"
    name="subject"
    rules={[{ required: true, message: 'Please enter subject!' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Body"
    name="body"
    rules={[{ required: true, message: 'Please enter the email body!' }]}
  >
    <Input.TextArea rows={6} />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">
      Send Email
    </Button>
  </Form.Item>
</Form>

      </Modal> 
      <Modal
  title="Edit Template"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={[
    <Button key="back" onClick={() => setIsModalVisible(false)}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={handleSave}>
      Save
    </Button>,
  ]}
>
  <Form
    form={form}
    layout="vertical"
    style={{ padding: '16px' }}
  >
    <Form.Item
      label="Template Name"
      name="templateName"
      rules={[{ required: true, message: 'Please enter the template name!' }]}
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
      rules={[{ required: true, message: 'Please enter the body!' }]}
    >
      <Input.TextArea rows={6} />
    </Form.Item>
  </Form>
</Modal>
      <Modal
  title="View Template"
  visible={isViewModalVisible}
  onCancel={() => setIsViewModalVisible(false)}
  footer={null}
  width={800}
>
  <Form
    form={form}
    layout="vertical"
    style={{ padding: '16px' }}
    initialValues={{
      templateName: selectedTemplate?.name,
      subject: selectedTemplate?.subject,
      body: selectedTemplate?.body,
    }}
  >
    <Form.Item
      label="Template Name"
      name="templateName"
    >
      <Input disabled />
    </Form.Item>
    <Form.Item
      label="Subject"
      name="subject"
    >
      <Input disabled />
    </Form.Item>
    <Form.Item
      label="Body"
      name="body"
    >
      <Input.TextArea rows={6} disabled />
    </Form.Item>
  </Form>
</Modal>
 
      <Modal
        // title="Create Template"
        title={selectedTemplate ? 'Edit Template' : 'Create Template'}
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onOk={handleSave}
        footer={null}
        width={800}
      >
       <Form
  layout="vertical"
  onFinish={handleCreateTemplate}
  style={{ padding: '16px' }}
>
  <Title level={5}>Template Basic Information</Title>
  <Form.Item
    label="Template Name"
    name="templateName"
    rules={[{ required: true, message: 'Please enter the template name!' }]}
  >
    <Input placeholder="Write Template Name" />
  </Form.Item>
  <Form.Item
    label="Subject"
    name="subject"
    rules={[{ required: true, message: 'Please enter the subject!' }]}
  >
    <Input placeholder="Write Template Subject" />
  </Form.Item>
  <Form.Item
    label="Select Provider"
    name="provider"
    rules={[{ required: true, message: 'Please select a provider!' }]}
  >
    <Select onChange={handleProviderChange}>
      <Option value="ckeditor">CKEditor</Option>
      <Option value="beefree">Bee Free</Option>
    </Select>
  </Form.Item>

  {selectedProvider === 'ckeditor' && (
    <Form.Item label="Template Body">
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        onChange={(event: any, editor: any) => {
          setEditorContent(editor.getData());
        }}
        config={{ height: 500 }} // Adjust height here
      />
    </Form.Item>
  )}

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  </Form.Item>
</Form>
      </Modal>
      {/* <Modal
        title={selectedTemplate ? 'Edit Template' : 'Create Template'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Template Name" rules={[{ required: true, message: 'Please input the template name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please input the subject!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="provider" label="Select Provider">
            <Select onChange={(value) => setEditor(value)}>
              <Option value="ckeditor">CKEditor</Option>
              <Option value="beefree">BeeFree</Option>
            </Select>
          </Form.Item>
          <Form.Item name="body" label="Template Body">
            {editor === 'ckeditor' && (
              <CKEditor
                editor={ClassicEditor}
                data={form.getFieldValue('body')}
                onChange={(event, editor) => form.setFieldsValue({ body: editor.getData() })}
              />
            )}
            {editor === 'beefree' && (
              <Input.TextArea rows={10} />
            )}
          </Form.Item>
        </Form>
      </Modal> */}
    </ProCard>
  );
};

export default EmailSettings;
