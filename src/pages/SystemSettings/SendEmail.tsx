
// import React, { useState, useEffect } from 'react';
// import { Form, Modal, Button, message, Input, Select, Table, Card } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { request } from 'umi';
// import moment from 'moment'; // Import moment for date formatting

// const { Option } = Select;

// const SendEmail = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const [isComposeEmailModalVisible, setIsComposeEmailModalVisible] = useState(false);
//   const [templates, setTemplates] = useState([]);
//   const [form] = Form.useForm();
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTemplates();
//     fetchEmails();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
//     }
//   };

//   const fetchEmails = async () => {
//     try {
//       const response = await request('/emails');
//       setEmails(response.data);
//     } catch (error) {
//       message.error('Failed to fetch emails');
//     }
//   };

//   const handleComposeEmail = async (values) => {
//     setLoading(true);
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: { 
//           to: values.recipient, 
//           template_id: values.template,
//           placeholders: values.placeholders || {},  // Ensure placeholders are included if needed
//           body: editorContent 
//         },
//       });
//       message.success('Email sent successfully');
//       setIsComposeEmailModalVisible(false);
//       setEditorContent('');
//       form.resetFields();
//       fetchEmails(); // Refresh email list
//     } catch (error) {
//       message.error('Failed to send email');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTemplateChange = async (templateId) => {
//     if (!templateId) return;

//     try {
//       const response = await request(`/templates/${templateId}`);
//       const template = response.data;
//       setEditorContent(template.body);
//       form.setFieldsValue({
//         subject: template.subject || '',
//       });
//     } catch (error) {
//       message.error('Failed to fetch template');
//     }
//   };

//   const emailColumns = [
//     { title: 'Recipient', dataIndex: 'to', key: 'recipient' },  // Ensure dataIndex matches API field name
//     { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//     { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: text => moment(text).format('YYYY-MM-DD') },
//   ];

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
//       <Card
//         style={{ 
//           width: '190%',
//           // maxWidth: '1200px',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
//         }}
//       >
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
//           <h2>Email List</h2>
//           <Button 
//             type="primary" 
//             onClick={() => setIsComposeEmailModalVisible(true)}
//           >
//             Compose Email
//           </Button>
//         </div>
//         <Table
//           columns={emailColumns}
//           dataSource={emails}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//         />

//         <Modal
//           title="Compose Email"
//           visible={isComposeEmailModalVisible}
//           onCancel={() => setIsComposeEmailModalVisible(false)}
//           footer={null}
//           centered
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleComposeEmail}
//           >
//             <Form.Item
//               label="To"
//               name="recipient"  
//               rules={[{ required: true, message: 'Please enter the recipient email!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label="Subject"
//               name="subject"
//               rules={[{ required: true, message: 'Please enter the subject!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label="Select Template"
//               name="template"
//             >
//               <Select onChange={handleTemplateChange} placeholder="Select a template">
//                 {templates.map(template => (
//                   <Option key={template.id} value={template.id}>{template.name}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               label="Body"
//               name="body"
//               rules={[{ required: true, message: 'Please enter the email body!' }]}
//             >
//               <CKEditor
//                 editor={ClassicEditor}
//                 data={editorContent}
//                 onChange={(event, editor) => {
//                   const data = editor.getData();
//                   setEditorContent(data);
//                 }}
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Send Email
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default SendEmail;
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, message, Input, Select, Table, Card } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { request } from 'umi';
import moment from 'moment'; // Import moment for date formatting

const { Option } = Select;

const SendEmail = () => {
  const [editorContent, setEditorContent] = useState('');
  const [isComposeEmailModalVisible, setIsComposeEmailModalVisible] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
    fetchEmails();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await request('/templates');
      setTemplates(response.data);
    } catch (error) {
      message.error('Failed to fetch templates');
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await request('/emails');
      setEmails(response.data);
    } catch (error) {
      message.error('Failed to fetch emails');
    }
  };

  const handleComposeEmail = async (values) => {
    setLoading(true);
    try {
      await request('/compose-email', {
        method: 'POST',
        data: { 
          to: values.recipient, 
          template_id: values.template,
          placeholders: values.placeholders || {},  // Ensure placeholders are included if needed
          body: editorContent 
        },
      });
      message.success('Email sent successfully');
      setIsComposeEmailModalVisible(false);
      setEditorContent('');
      form.resetFields();
      fetchEmails(); // Refresh email list
    } catch (error) {
      message.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = async (templateId) => {
    if (!templateId) return;

    try {
      const response = await request(`/templates/${templateId}`);
      const template = response.data;
      setEditorContent(template.body);
      form.setFieldsValue({
        subject: template.subject || '',
      });
    } catch (error) {
      message.error('Failed to fetch template');
    }
  };

  const emailColumns = [
    { title: 'Recipient', dataIndex: 'to', key: 'recipient' },  // Ensure dataIndex matches API field name
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: text => moment(text).format('YYYY-MM-DD') },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
           <Card
             style={{ 
               width: '190%',
               // maxWidth: '1200px',
               boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
             }}
           >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>Email List</h2>
          <Button 
            type="primary" 
            onClick={() => setIsComposeEmailModalVisible(true)}
          >
            Compose Email
          </Button>
        </div>
        <Table
          columns={emailColumns}
          dataSource={emails}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered // Add this line to display borders
          style={{ borderRadius: '4px' }} // Optional: Add rounded corners if desired
        />

        <Modal
          title="Compose Email"
          visible={isComposeEmailModalVisible}
          onCancel={() => setIsComposeEmailModalVisible(false)}
          footer={null}
          centered
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleComposeEmail}
          >
            <Form.Item
              label="To"
              name="recipient"  
              rules={[{ required: true, message: 'Please enter the recipient email!' }]}
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
              label="Select Template"
              name="template"
            >
              <Select onChange={handleTemplateChange} placeholder="Select a template">
                {templates.map(template => (
                  <Option key={template.id} value={template.id}>{template.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Body"
              name="body"
              rules={[{ required: true, message: 'Please enter the email body!' }]}
            >
              <CKEditor
                editor={ClassicEditor}
                data={editorContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorContent(data);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Email
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default SendEmail;
