// import React, { useEffect, useState } from 'react';
// import { Table, Checkbox, Button, message } from 'antd';
// import { request } from 'umi';

// const Queue = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);

//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const response = await request('/emails');
//         setEmails(response.data);
//       } catch (error) {
//         message.error('Failed to fetch emails');
//       }
//     };

//     fetchEmails();
//   }, []);

//   const handleDeleteSelected = async () => {
//     try {
//       await Promise.all(selectedEmails.map(emailId => 
//         request(`/emails/${emailId}`, { method: 'DELETE' })
//       ));
//       message.success('Selected emails deleted successfully');
//       setEmails(emails.filter(email => !selectedEmails.includes(email.id)));
//     } catch (error) {
//       message.error('Failed to delete selected emails');
//     }
//   };

//   const emailColumns = [
//     {
//       title: '',
//       dataIndex: 'checkbox',
//       render: (_, record) => (
//         <Checkbox
//           onChange={(e) => {
//             const { checked } = e.target;
//             setSelectedEmails(prevSelectedEmails => checked
//               ? [...prevSelectedEmails, record.id]
//               : prevSelectedEmails.filter(id => id !== record.id)
//             );
//           }}
//         />
//       ),
//     },
//     { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
//     { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//     { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent' },
//   ];

//   return (
//     <>
//       <Table columns={emailColumns} dataSource={emails} rowKey="id" />
//       <Button danger onClick={handleDeleteSelected}>Delete Selected</Button>
//     </>
//   );
// };

// export default Queue;
// import React, { useEffect, useState } from 'react';
// import { Table, Checkbox, Button, message, DatePicker, Form, Modal, Select, Input } from 'antd';
// import { request } from 'umi';
// import moment from 'moment';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const Queue = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [emailFormVisible, setEmailFormVisible] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [composedEmail, setComposedEmail] = useState({ recipient: '', subject: '', body: '' });

//   const [form] = Form.useForm();

//   // Fetch email logs
//   const fetchEmails = async (params = {}) => {
//     try {
//       const response = await request('/emails', { params });
//       setEmails(response.data);
//     } catch (error) {
//       message.error('Failed to fetch emails');
//     }
//   };

//   useEffect(() => {
//     fetchEmails();
//     fetchTemplates();
//   }, []);

//   // Fetch email templates
//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
//     }
//   };

//   // Fetch single template by ID
//   const fetchTemplateById = async (templateId) => {
//     try {
//       const response = await request(`/templates/${templateId}`);
//       return response.data;
//     } catch (error) {
//       message.error('Failed to fetch template');
//     }
//   };

//   // Handle date filter
//   const handleDateFilter = async (dates) => {
//     const start_date = dates ? dates[0].format('YYYY-MM-DD') : undefined;
//     const end_date = dates ? dates[1].format('YYYY-MM-DD') : undefined;
//     fetchEmails({ start_date, end_date });
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/emails/bulk-delete', {
//         method: 'DELETE',
//         data: { ids: selectedEmails }
//       });
//       message.success('Bulk delete successful');
//       fetchEmails();  // Refresh the list
//     } catch (error) {
//       message.error('Failed to delete selected emails');
//     }
//   };

//   // Handle delete selected
//   const handleDeleteSelected = async () => {
//     try {
//       await Promise.all(selectedEmails.map(emailId => 
//         request(`/emails/${emailId}`, { method: 'DELETE' })
//       ));
//       message.success('Selected emails deleted successfully');
//       fetchEmails();  // Refresh the list
//     } catch (error) {
//       message.error('Failed to delete selected emails');
//     }
//   };

//   // Handle single delete
//   const handleSingleDelete = async (emailId) => {
//     try {
//       await request(`/emails/${emailId}`, { method: 'DELETE' });
//       message.success('Email deleted successfully');
//       fetchEmails();  // Refresh the list
//     } catch (error) {
//       message.error('Failed to delete email');
//     }
//   };

//   // Handle resend
//   const handleResend = async (emailId) => {
//     try {
//       await request(`/emails/${emailId}/resend`, { method: 'POST' });
//       message.success('Email resent successfully');
//     } catch (error) {
//       message.error('Failed to resend email');
//     }
//   };

//   // Handle compose email
//   const handleComposeEmail = async () => {
//     // Ensure fields are populated
//     const { recipient, subject, body } = composedEmail;
//     if (!recipient || !body || (!subject && !selectedTemplate)) {
//       message.error('Recipient and body are required. Subject is required if no template is used.');
//       return;
//     }

//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: composedEmail
//       });
//       message.success('Email sent successfully');
//       setEmailFormVisible(false);
//       form.resetFields();
//       setComposedEmail({ recipient: '', subject: '', body: '' }); // Reset composedEmail
//     } catch (error) {
//       message.error('Failed to send email');
//     }
//   };

//   // Handle template selection
//   const handleTemplateChange = async (templateId) => {
//     if (!templateId) return;
    
//     const selected = await fetchTemplateById(templateId);
//     if (selected) {
//       setComposedEmail(prev => ({
//         ...prev,
//         body: selected.body
//       }));
//       setSelectedTemplate(templateId);
//       form.setFieldsValue({
//         body: selected.body // Update form body field
//       });
//     }
//   };

//   const emailColumns = [
//     {
//       title: '',
//       dataIndex: 'checkbox',
//       render: (_, record) => (
//         <Checkbox
//           onChange={(e) => {
//             const { checked } = e.target;
//             setSelectedEmails(prevSelectedEmails => checked
//               ? [...prevSelectedEmails, record.id]
//               : prevSelectedEmails.filter(id => id !== record.id)
//             );
//           }}
//         />
//       ),
//     },
//     { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
//     { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//     { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: text => moment(text).format('YYYY-MM-DD') },
//     {
//       title: 'Actions',
//       dataIndex: 'actions',
//       render: (_, record) => (
//         <Button onClick={() => handleSingleDelete(record.id)} danger>Delete</Button>
//       ),
//     }
//   ];

//   return (
//     <>
//       <div style={{ marginBottom: '16px' }}>
//         <RangePicker onChange={handleDateFilter} />
//       </div>
//       <div style={{ marginBottom: '16px' }}>
//         <Button type="primary" onClick={() => setEmailFormVisible(true)} style={{ marginRight: '8px' }}>
//           Test Email
//         </Button>
//         <Button danger onClick={handleDeleteSelected} style={{ marginRight: '8px' }}>
//           Delete Selected
//         </Button>
//         <Button danger onClick={handleBulkDelete}>
//           Bulk Delete
//         </Button>
//       </div>
//       <Table columns={emailColumns} dataSource={emails} rowKey="id" />

//       <Modal
//         title="Compose Email"
//         visible={emailFormVisible}
//         onCancel={() => setEmailFormVisible(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleComposeEmail}
//           initialValues={composedEmail}
//         >
//           <Form.Item
//             label="To"
//             name="recipient"
//             rules={[{ required: true, message: 'Please enter the recipient email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Subject"
//             name="subject"
//             rules={[{ required: !selectedTemplate, message: 'Please enter the subject!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Select Template"
//             name="template"
//             rules={[{ required: false }]}
//           >
//             <Select onChange={handleTemplateChange} placeholder="Select a template">
//               {templates.map(template => (
//                 <Option key={template.id} value={template.id}>{template.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Body"
//             name="body"
//             rules={[{ required: true, message: 'Please enter the email body!' }]}
//           >
//             <ReactQuill value={composedEmail.body} onChange={body => setComposedEmail(prev => ({ ...prev, body }))} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Queue;
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button, message, DatePicker, Form, Modal, Select, Input, Spin } from 'antd';
import { request } from 'umi';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import moment from 'moment'; // Import moment

const { RangePicker } = DatePicker;
const { Option } = Select;

const Queue = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState('');
  const [composedEmail, setComposedEmail] = useState({ recipient: '', subject: '' });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchEmails();
    fetchTemplates();
  }, []);

  // Fetch email logs
  const fetchEmails = async (params = {}) => {
    try {
      const response = await request('/emails', { params });
      setEmails(response.data);
    } catch (error) {
      message.error('Failed to fetch emails');
    }
  };

  // Fetch email templates
  const fetchTemplates = async () => {
    try {
      const response = await request('/templates');
      setTemplates(response.data);
    } catch (error) {
      message.error('Failed to fetch templates');
    }
  };

  // Fetch single template by ID
  const fetchTemplateById = async (templateId) => {
    try {
      const response = await request(`/templates/${templateId}`);
      return response.data;
    } catch (error) {
      message.error('Failed to fetch template');
    }
  };

  // Handle date filter
  const handleDateFilter = async (dates) => {
    const start_date = dates ? dates[0].format('YYYY-MM-DD') : undefined;
    const end_date = dates ? dates[1].format('YYYY-MM-DD') : undefined;
    fetchEmails({ start_date, end_date });
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await request('/emails/bulk-delete', {
        method: 'DELETE',
        data: { ids: selectedEmails }
      });
      message.success('Bulk delete successful');
      fetchEmails();  // Refresh the list
    } catch (error) {
      message.error('Failed to delete selected emails');
    }
  };

  // Handle delete selected
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedEmails.map(emailId => 
        request(`/emails/${emailId}`, { method: 'DELETE' })
      ));
      message.success('Selected emails deleted successfully');
      fetchEmails();  // Refresh the list
    } catch (error) {
      message.error('Failed to delete selected emails');
    }
  };

  // Handle single delete
  const handleSingleDelete = async (emailId) => {
    try {
      await request(`/emails/${emailId}`, { method: 'DELETE' });
      message.success('Email deleted successfully');
      fetchEmails();  // Refresh the list
    } catch (error) {
      message.error('Failed to delete email');
    }
  };

  // Handle resend
  const handleResend = async (emailId) => {
    try {
      await request(`/emails/${emailId}/resend`, { method: 'POST' });
      message.success('Email resent successfully');
    } catch (error) {
      message.error('Failed to resend email');
    }
  };

  // Handle compose email
  const handleComposeEmail = async (values) => {
    const { recipient, subject } = values;

    if (!recipient || !editorContent || (!subject && !selectedTemplate)) {
      message.error('Recipient and body are required. Subject is required if no template is used.');
      return;
    }

    const payload = {
      to: recipient,
      subject: subject || '', // Include subject if provided
      template_id: selectedTemplate || null, // Include template_id if a template is selected
      body: editorContent, // Include body if needed
    };

    setLoading(true); // Show loader
    try {
      await request('/compose-email', {
        method: 'POST',
        data: payload
      });
      message.success('Email sent successfully');
      setEmailFormVisible(false);
      form.resetFields();
      setEditorContent('');
      setSelectedTemplate(null); // Reset template selection
      fetchEmails(); // Refresh the list
    } catch (error) {
      message.error('Failed to send email');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle template selection
  const handleTemplateChange = async (templateId) => {
    if (!templateId) return;

    const selected = await fetchTemplateById(templateId);
    if (selected) {
      setEditorContent(selected.body);
      setSelectedTemplate(templateId);
      form.setFieldsValue({
        subject: selected.subject || '' // Update form subject field
      });
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
    { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: text => moment(text).format('YYYY-MM-DD') }, // Use moment here
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   render: (_, record) => (
    //     <Button onClick={() => handleSingleDelete(record.id)} danger>Delete</Button>
    //   ),
    // }
  ];

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <RangePicker onChange={handleDateFilter} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={() => setEmailFormVisible(true)} style={{ marginRight: '8px' }}>
          Compose Email
        </Button>
        <Button danger onClick={handleDeleteSelected} style={{ marginRight: '8px' }}>
          Delete Selected
        </Button>
        <Button danger onClick={handleBulkDelete}>
          Bulk Delete
        </Button>
      </div>
      <Table columns={emailColumns} dataSource={emails} rowKey="id" />

      <Modal
        title="Compose Email"
        visible={emailFormVisible}
        onCancel={() => setEmailFormVisible(false)}
        footer={null}
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
            rules={[{ required: !selectedTemplate, message: 'Please enter the subject!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Template"
            name="template"
            rules={[{ required: false }]}
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
    </>
  );
};

export default Queue;
