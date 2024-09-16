
// import React, { useEffect, useState } from 'react';
// import { Table, Checkbox, Button, message, DatePicker, Form, Modal, Select, Input, Spin, Card } from 'antd';
// import { request } from 'umi';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import moment from 'moment'; // Import moment

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const Queue = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [emailFormVisible, setEmailFormVisible] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [form] = Form.useForm();
//   const [editorContent, setEditorContent] = useState('');
//   const [composedEmail, setComposedEmail] = useState({ recipient: '', subject: '' });
//   const [loading, setLoading] = useState(false); // Loading state

//   useEffect(() => {
//     fetchEmails();
//     fetchTemplates();
//   }, []);

//   const fetchEmails = async (params = {}) => {
//     try {
//       const response = await request('/emails', { params });
//       setEmails(response.data);
//     } catch (error) {
//       message.error('Failed to fetch emails');
//     }
//   };

//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
//     }
//   };

//   const handleComposeEmail = async (values) => {
//     const { recipient, subject } = values;

//     if (!recipient || !editorContent || (!subject && !selectedTemplate)) {
//       message.error('Recipient and body are required. Subject is required if no template is used.');
//       return;
//     }

//     const payload = {
//       to: recipient,
//       subject: subject || '',
//       template_id: selectedTemplate || null,
//       body: editorContent,
//     };

//     setLoading(true); // Show loader
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: payload,
//       });
//       message.success('Email sent successfully');
//       setEmailFormVisible(false);
//       form.resetFields();
//       setEditorContent('');
//       setSelectedTemplate(null);
//       fetchEmails();
//     } catch (error) {
//       message.error('Failed to send email');
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   const handleDeleteSelected = async () => {
//     if (selectedEmails.length === 0) {
//       message.error('No emails selected');
//       return;
//     }

//     try {
//       await request('/delete-emails', {
//         method: 'POST',
//         data: { ids: selectedEmails },
//       });
//       message.success('Selected emails deleted successfully');
//       setSelectedEmails([]); // Clear selected emails after deletion
//       fetchEmails(); // Refresh email list after deletion
//     } catch (error) {
//       message.error('Failed to delete selected emails');
//     }
//   };

//   const handleBulkDelete = async () => {
//     // Implement bulk delete logic here
//     message.info('Bulk delete functionality is not yet implemented.');
//   };

//   const emailColumns = [
//     {
//       title: '',
//       dataIndex: 'checkbox',
//       render: (_, record) => (
//         <Checkbox
//           onChange={(e) => {
//             const { checked } = e.target;
//             setSelectedEmails((prevSelectedEmails) =>
//               checked ? [...prevSelectedEmails, record.id] : prevSelectedEmails.filter((id) => id !== record.id)
//             );
//           }}
//         />
//       ),
//     },
//     { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
//     { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//     { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: (text) => moment(text).format('YYYY-MM-DD') },
//   ];

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '40vh',
//         // backgroundColor: '#f0f2f5',
//       }}
//     >
//       <Card style={{ width: '190%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//         <div style={{ marginBottom: '16px' }}>
//           <RangePicker onChange={(dates) => handleDateFilter(dates)} />
//         </div>

//         <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
//           <Button type="primary" onClick={() => setEmailFormVisible(true)} style={{ marginRight: '8px' }}>
//             Compose Email
//           </Button>
//           <Button danger onClick={handleDeleteSelected} style={{ marginRight: '8px' }}>
//             Delete Selected
//           </Button>
//           <Button danger onClick={handleBulkDelete}>
//             Bulk Delete
//           </Button>
//         </div>

//         <Table columns={emailColumns} dataSource={emails} rowKey="id" />

//         <Modal
//           title="Compose Email"
//           visible={emailFormVisible}
//           onCancel={() => setEmailFormVisible(false)}
//           footer={null}
//         >
//           <Form form={form} layout="vertical" onFinish={handleComposeEmail}>
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
//               rules={[{ required: !selectedTemplate, message: 'Please enter the subject!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item label="Select Template" name="template">
//               <Select onChange={(value) => setSelectedTemplate(value)} placeholder="Select a template">
//                 {templates.map((template) => (
//                   <Option key={template.id} value={template.id}>
//                     {template.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the email body!' }]}>
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

// export default Queue;
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button, message, DatePicker, Form, Modal, Select, Input, Spin, Card } from 'antd';
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

  const fetchEmails = async (params = {}) => {
    try {
      const response = await request('/emails', { params });
      setEmails(response.data);
    } catch (error) {
      message.error('Failed to fetch emails');
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await request('/templates');
      setTemplates(response.data);
    } catch (error) {
      message.error('Failed to fetch templates');
    }
  };

  const handleComposeEmail = async (values) => {
    const { recipient, subject } = values;

    if (!recipient || !editorContent || (!subject && !selectedTemplate)) {
      message.error('Recipient and body are required. Subject is required if no template is used.');
      return;
    }

    const payload = {
      to: recipient,
      subject: subject || '',
      template_id: selectedTemplate || null,
      body: editorContent,
    };

    setLoading(true); // Show loader
    try {
      await request('/compose-email', {
        method: 'POST',
        data: payload,
      });
      message.success('Email sent successfully');
      setEmailFormVisible(false);
      form.resetFields();
      setEditorContent('');
      setSelectedTemplate(null);
      fetchEmails();
    } catch (error) {
      message.error('Failed to send email');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEmails.length === 0) {
      message.error('No emails selected');
      return;
    }

    try {
      await request('/delete-emails', {
        method: 'POST',
        data: { ids: selectedEmails },
      });
      message.success('Selected emails deleted successfully');
      setSelectedEmails([]); // Clear selected emails after deletion
      fetchEmails(); // Refresh email list after deletion
    } catch (error) {
      message.error('Failed to delete selected emails');
    }
  };

  const handleBulkDelete = async () => {
    // Implement bulk delete logic here
    message.info('Bulk delete functionality is not yet implemented.');
  };

  const emailColumns = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: (_, record) => (
        <Checkbox
          onChange={(e) => {
            const { checked } = e.target;
            setSelectedEmails((prevSelectedEmails) =>
              checked ? [...prevSelectedEmails, record.id] : prevSelectedEmails.filter((id) => id !== record.id)
            );
          }}
        />
      ),
    },
    { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: (text) => moment(text).format('YYYY-MM-DD') },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        // backgroundColor: '#f0f2f5',
      }}
    >
      <Card style={{ width: '100%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '16px' }}>
          <RangePicker onChange={(dates) => handleDateFilter(dates)} />
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
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

        <Table
          columns={emailColumns}
          dataSource={emails}
          rowKey="id"
          bordered // Add this line to include borders
        />

        <Modal
          title="Compose Email"
          visible={emailFormVisible}
          onCancel={() => setEmailFormVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleComposeEmail}>
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
            <Form.Item label="Select Template" name="template">
              <Select onChange={(value) => setSelectedTemplate(value)} placeholder="Select a template">
                {templates.map((template) => (
                  <Option key={template.id} value={template.id}>
                    {template.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the email body!' }]}>
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

export default Queue;
