// import React, { useState } from 'react';
// import { Form, Modal, Button, message } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { request } from 'umi';

// const SendEmail = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const [isComposeEmailModalVisible, setIsComposeEmailModalVisible] = useState(false);

//   const handleComposeEmail = async (values) => {
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: { ...values, body: editorContent },
//       });
//       message.success('Email sent successfully');
//       setIsComposeEmailModalVisible(false);
//       setEditorContent('');
//     } catch (error) {
//       message.error('Failed to send email');
//     }
//   };

//   return (
//     <>
//       <Button onClick={() => setIsComposeEmailModalVisible(true)}>Compose Email</Button>
//       <Modal
//         title="Compose Email"
//         visible={isComposeEmailModalVisible}
//         onCancel={() => setIsComposeEmailModalVisible(false)}
//         onOk={() => handleComposeEmail()}
//       >
//         <Form layout="vertical" onFinish={handleComposeEmail}>
//           {/* Add form fields here */}
//           <CKEditor
//             editor={ClassicEditor}
//             data={editorContent}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               setEditorContent(data);
//             }}
//           />
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default SendEmail;
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, message, Input, Select, Table } from 'antd';
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
      // Adjusting the payload to match expected API fields
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
    <>
      <Button onClick={() => setIsComposeEmailModalVisible(true)}>Compose Email</Button>
      <Modal
        title="Compose Email"
        visible={isComposeEmailModalVisible}
        onCancel={() => setIsComposeEmailModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleComposeEmail}
        >
          <Form.Item
            label="To"
            name="recipient"  // Ensure this field name is used correctly in payload
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

      <Table
        columns={emailColumns}
        dataSource={emails}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default SendEmail;
