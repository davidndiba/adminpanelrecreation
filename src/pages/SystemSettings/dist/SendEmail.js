"use strict";
// import React, { useState, useEffect } from 'react';
// import { Form, Modal, Button, message, Input, Select, Table, Card } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { request } from 'umi';
// import moment from 'moment'; // Import moment for date formatting
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
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
//            <Card
//              style={{ 
//                width: '190%',
//                // maxWidth: '1200px',
//                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
//              }}
//            >
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
//           bordered // Add this line to display borders
//           style={{ borderRadius: '4px' }} // Optional: Add rounded corners if desired
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
// import React, { useState, useEffect } from 'react';
// import { Form, Modal, Button, message, Input, Select, Card } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { request } from 'umi';
// const { Option } = Select;
// const SendEmail = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const [isComposeEmailModalVisible, setIsComposeEmailModalVisible] = useState(false);
//   const [templates, setTemplates] = useState([]);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     fetchTemplates();
//   }, []);
//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
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
//           placeholders: values.placeholders || {},
//           body: editorContent 
//         },
//       });
//       message.success('Email sent successfully');
//       setIsComposeEmailModalVisible(false);
//       setEditorContent('');
//       form.resetFields();
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
//   return (
//     <div style={{ padding: '20px', backgroundColor: '#fff' }}>
//       <Card
//         style={{ 
//           marginBottom: '20px', 
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
//           padding: '20px'
//         }}
//       >
//         <h2>Compose Email</h2>
//         <Button 
//           type="primary" 
//           onClick={() => setIsComposeEmailModalVisible(true)}
//         >
//           Open Compose Email Form
//         </Button>
//       </Card>
//       <Modal
//         title="Compose Email"
//         visible={isComposeEmailModalVisible}
//         onCancel={() => setIsComposeEmailModalVisible(false)}
//         footer={null}
//         centered
//         width={800} // Adjust the width as needed
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleComposeEmail}
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
//             rules={[{ required: true, message: 'Please enter the subject!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Select Template"
//             name="template"
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
//             <CKEditor
//               editor={ClassicEditor}
//               data={editorContent}
//               onChange={(event, editor) => {
//                 const data = editor.getData();
//                 setEditorContent(data);
//               }}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };
// export default SendEmail;
// import React, { useState, useEffect } from 'react';
// import { Form, Button, message, Select, Input } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Or your custom build
// import { request } from 'umi';
// import { PageContainer, ProCard } from '@ant-design/pro-components';
// const SendEmail = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const [templates, setTemplates] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [subject, setSubject] = useState('');
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     fetchTemplates();
//     fetchUsers();
//   }, []);
//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
//     }
//   };
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       const userOptions = response.data.data.map((user) => ({
//         label: user.display_name || user.username,
//         value: user.id,
//         email: user.email // Store email for each user
//       }));
//       setUsers(userOptions);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };
//   const handleUserSelection = (value) => {
//     setSelectedUsers(value);
//   };
//   const handleTemplateSelection = async (value) => {
//     setSelectedTemplate(value);
//     try {
//       const response = await request(`/templates/${value}`);
//       const { body, subject } = response.data;
//       setEditorContent(body);
//       setSubject(subject);
//     } catch (error) {
//       message.error('Failed to fetch template');
//     }
//   };
//   const handleSubmit = async () => {
//     setLoading(true);
//     // Extract email addresses from selected users
//     const selectedUserEmails = users
//       .filter(user => selectedUsers.includes(user.value))
//       .map(user => user.email);
//     if (selectedUserEmails.length === 0) {
//       message.error('Please select at least one user.');
//       setLoading(false);
//       return;
//     }
//     try {
//       await request('/compose-email', {
//         method: 'POST',
//         data: {
//           to: selectedUserEmails,
//           subject: subject || 'Default Subject', // Provide a default subject if not specified
//           body: editorContent,
//         },
//       });
//       message.success('Email sent successfully');
//       form.resetFields();
//       setEditorContent('');
//       setSelectedUsers([]);
//       setSelectedTemplate('');
//       setSubject('');
//     } catch (error) {
//       message.error('Failed to send email');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <PageContainer>
//       <ProCard>
//         <Form form={form} layout="vertical">
//           <Form.Item label="To Users" name="to" rules={[{ required: true, message: 'Please select users!' }]}>
//             <Select
//               mode="multiple"
//               placeholder="Select users to send email"
//               value={selectedUsers}
//               onChange={handleUserSelection}
//               options={users.map(user => ({ label: user.label, value: user.value }))}
//               style={{ width: '100%' }}
//               showSearch
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             />
//           </Form.Item>
//           <Form.Item label="Select Template" name="template">
//             <Select
//               placeholder="Select a template"
//               onChange={handleTemplateSelection}
//               value={selectedTemplate}
//               style={{ width: '100%' }}
//             >
//               {templates.map((template) => (
//                 <Select.Option key={template.id} value={template.id}>
//                   {template.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Subject is required!' }]}>
//             <Input
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter email subject"
//             />
//           </Form.Item>
//           <Form.Item label="Email Content" name="body" rules={[{ required: true, message: 'Email content is required!' }]}>
//             <CKEditor
//               editor={ClassicEditor} // Or your custom build
//               data={editorContent}
//               onChange={(event, editor) => {
//                 const data = editor.getData();
//                 setEditorContent(data);
//               }}
//               config={{
//                 toolbar: {
//                   items: [
//                     'heading', '|',
//                     'bold', 'italic', 'underline', 'strikethrough', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
//                     'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'imageUpload', 'codeBlock', '|',
//                     'undo', 'redo'
//                   ]
//                 },
//                 image: {
//                   toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
//                 },
//                 table: {
//                   contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
//                 },
//                 fontFamily: {
//                   options: ['default', 'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana']
//                 },
//                 fontSize: {
//                   options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
//                 },
//                 language: 'en'
//               }}
//               style={{ width: '100%', minHeight: '500px' }} // Increased height for better usability
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               onClick={handleSubmit}
//               loading={loading}
//               disabled={selectedUsers.length === 0 || !editorContent || !subject}
//             >
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </ProCard>
//     </PageContainer>
//   );
// };
// export default SendEmail;
var react_1 = require("react");
var antd_1 = require("antd");
var ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
var ckeditor5_build_classic_1 = require("@ckeditor/ckeditor5-build-classic"); // Or your custom build
var umi_1 = require("umi");
var pro_components_1 = require("@ant-design/pro-components");
var SendEmail = function () {
    var _a = react_1.useState(''), editorContent = _a[0], setEditorContent = _a[1];
    var _b = react_1.useState([]), templates = _b[0], setTemplates = _b[1];
    var _c = react_1.useState([]), users = _c[0], setUsers = _c[1];
    var _d = react_1.useState([]), selectedUsers = _d[0], setSelectedUsers = _d[1];
    var _e = react_1.useState(''), selectedTemplate = _e[0], setSelectedTemplate = _e[1];
    var _f = react_1.useState(''), subject = _f[0], setSubject = _f[1];
    var form = antd_1.Form.useForm()[0];
    var _g = react_1.useState(false), loading = _g[0], setLoading = _g[1];
    react_1.useEffect(function () {
        fetchTemplates();
        fetchUsers();
    }, []);
    var fetchTemplates = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/templates')];
                case 1:
                    response = _a.sent();
                    setTemplates(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    antd_1.message.error('Failed to fetch templates');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, userOptions, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/users')];
                case 1:
                    response = _a.sent();
                    userOptions = response.data.data.map(function (user) { return ({
                        label: user.display_name || user.username,
                        value: user.id,
                        email: user.email // Store email for each user
                    }); });
                    setUsers(userOptions);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to fetch users');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleUserSelection = function (value) {
        setSelectedUsers(value);
    };
    var handleTemplateSelection = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, body, subject_1, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSelectedTemplate(value);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request("/templates/" + value)];
                case 2:
                    response = _b.sent();
                    _a = response.data, body = _a.body, subject_1 = _a.subject;
                    setEditorContent(body);
                    setSubject(subject_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    antd_1.message.error('Failed to fetch template');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var selectedUserEmails, payload, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    selectedUserEmails = users
                        .filter(function (user) { return selectedUsers.includes(user.value); })
                        .map(function (user) { return user.email; })
                        .filter(function (email) { return email && email.trim() !== '' && isValidEmail(email); });
                    if (selectedUserEmails.length === 0) {
                        antd_1.message.error('Please select at least one user with a valid email address.');
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    payload = {
                        to: selectedUserEmails,
                        subject: subject || 'Default Subject',
                        body: editorContent
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, umi_1.request('/compose-email', {
                            method: 'POST',
                            data: payload
                        })];
                case 2:
                    response = _a.sent();
                    // Process the response if needed
                    console.log('Email sent response:', response);
                    antd_1.message.success('Email sent successfully');
                    form.resetFields();
                    setEditorContent('');
                    setSelectedUsers([]);
                    setSelectedTemplate('');
                    setSubject('');
                    return [3 /*break*/, 5];
                case 3:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to send email');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Function to validate email addresses
    var isValidEmail = function (email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); };
    return (react_1["default"].createElement(pro_components_1.PageContainer, null,
        react_1["default"].createElement(pro_components_1.ProCard, null,
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical" },
                react_1["default"].createElement(antd_1.Form.Item, { label: "To Users", name: "to", rules: [{ required: true, message: 'Please select users!' }] },
                    react_1["default"].createElement(antd_1.Select, { mode: "multiple", placeholder: "Select users to send email", value: selectedUsers, onChange: handleUserSelection, options: users.map(function (user) { return ({ label: user.label, value: user.value }); }), style: { width: '100%' }, showSearch: true, filterOption: function (input, option) {
                            return option.label.toLowerCase().includes(input.toLowerCase());
                        } })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Select Template", name: "template" },
                    react_1["default"].createElement(antd_1.Select, { placeholder: "Select a template", onChange: handleTemplateSelection, value: selectedTemplate, style: { width: '100%' } }, templates.map(function (template) { return (react_1["default"].createElement(antd_1.Select.Option, { key: template.id, value: template.id }, template.name)); }))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: true, message: 'Subject is required!' }] },
                    react_1["default"].createElement(antd_1.Input, { value: subject, onChange: function (e) { return setSubject(e.target.value); }, placeholder: "Enter email subject" })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Email Content", name: "body", rules: [{ required: true, message: 'Email content is required!' }] },
                    react_1["default"].createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor5_build_classic_1["default"], data: editorContent, onChange: function (event, editor) {
                            var data = editor.getData();
                            setEditorContent(data);
                        }, config: {
                            toolbar: {
                                items: [
                                    'heading', '|',
                                    'bold', 'italic', 'underline', 'strikethrough', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                                    'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'imageUpload', 'codeBlock', '|',
                                    'undo', 'redo'
                                ]
                            },
                            image: {
                                toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
                            },
                            table: {
                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                            },
                            fontFamily: {
                                options: ['default', 'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana']
                            },
                            fontSize: {
                                options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
                            },
                            language: 'en'
                        }, style: { width: '100%', minHeight: '500px' } })),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: handleSubmit, loading: loading, disabled: selectedUsers.length === 0 || !editorContent || !subject }, "Send Email"))))));
};
exports["default"] = SendEmail;
// import React, { useState, useEffect } from 'react';
// import { Form, Button, message, Select, Card, Row, Col } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { request } from 'umi';
// import { PageContainer, ProCard } from '@ant-design/pro-components';
// const SendEmail = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const [templates, setTemplates] = useState([]);
//   const [users, setUsers] = useState([]); // For storing the list of users
//   const [modules, setModules] = useState([]); // For storing the list of modules
//   const [selectedUsers, setSelectedUsers] = useState([]); // For storing selected users
//   const [selectedModule, setSelectedModule] = useState(''); // For storing selected module
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     fetchTemplates();
//     fetchUsers();
//     fetchModules(); // Fetch the list of modules when the component mounts
//   }, []);
//   const fetchTemplates = async () => {
//     try {
//       const response = await request('/templates');
//       setTemplates(response.data);
//     } catch (error) {
//       message.error('Failed to fetch templates');
//     }
//   };
//   const fetchUsers = async () => {
//     try {
//       const response = await request('/users');
//       const userOptions = response.data.data.map((user) => ({
//         label: user.display_name || user.username,
//         value: user.id, // Use the ID to identify the user
//       }));
//       setUsers(userOptions);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     }
//   };
//   const fetchModules = async () => {
//     try {
//       const response = await request('/modules');
//       const moduleOptions = response.data.map((module) => ({
//         label: module,
//         value: module,
//       }));
//       setModules(moduleOptions);
//     } catch (error) {
//       message.error('Failed to fetch modules');
//     }
//   };
//   const handleUserSelection = (value) => {
//     setSelectedUsers(value); // Update selected users
//   };
//   const handleModuleSelection = (value) => {
//     setSelectedModule(value); // Update selected module
//   };
//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await request('/send-email', {
//         method: 'POST',
//         data: {
//           users: selectedUsers,
//           module: selectedModule, // Send the selected module
//           content: editorContent,
//         },
//       });
//       message.success('Email sent successfully');
//       form.resetFields();
//       setEditorContent('');
//       setSelectedUsers([]);
//       setSelectedModule('');
//     } catch (error) {
//       message.error('Failed to send email');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <PageContainer>
//       <ProCard>
//         <Form form={form} layout="vertical">
//           <Form.Item label="To Users">
//             <Select
//               mode="multiple"
//               placeholder="Select users to send email"
//               value={selectedUsers}
//               onChange={handleUserSelection}
//               options={users}
//               style={{ width: '100%' }}
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             />
//           </Form.Item>
//           <Form.Item label="To Modules">
//             <Select
//               placeholder="Select a module"
//               value={selectedModule}
//               onChange={handleModuleSelection}
//               options={modules}
//               style={{ width: '100%' }}
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             />
//           </Form.Item>
//           <Form.Item label="Select Template">
//             <Select placeholder="Select a template">
//               {templates.map((template) => (
//                 <Select.Option key={template.id} value={template.id}>
//                   {template.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label="Email Content">
//             <CKEditor
//               editor={ClassicEditor}
//               data={editorContent}
//               onChange={(event, editor) => {
//                 const data = editor.getData();
//                 setEditorContent(data);
//               }}
//               config={{
//                 toolbar: [
//                   'heading',
//                   '|',
//                   'bold',
//                   'italic',
//                   'link',
//                   'bulletedList',
//                   'numberedList',
//                   'blockQuote',
//                   '|',
//                   'undo',
//                   'redo',
//                 ],
//               }}
//               style={{ width: '100%', minHeight: '300px' }} // Increased height
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               onClick={handleSubmit}
//               loading={loading}
//               disabled={(selectedUsers.length === 0 && !selectedModule) || !editorContent}
//             >
//               Send Email
//             </Button>
//           </Form.Item>
//         </Form>
//       </ProCard>
//     </PageContainer>
//   );
// };
// export default SendEmail;
