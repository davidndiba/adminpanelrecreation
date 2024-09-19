"use strict";
// import React, { useEffect, useState } from 'react';
// import { Table, Checkbox, Button, message, DatePicker, Form, Modal, Select, Input, Spin, Card } from 'antd';
// import { request } from 'umi';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import moment from 'moment'; // Import moment
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
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
//       <Card style={{ width: '100%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
//             Clear All
//           </Button>
//         </div>
//         <Table
//           columns={emailColumns}
//           dataSource={emails}
//           rowKey="id"
//           bordered // Add this line to include borders
//         />
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
var react_1 = require("react");
var antd_1 = require("antd");
var umi_1 = require("umi");
var ckeditor5_build_classic_1 = require("@ckeditor/ckeditor5-build-classic");
var ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
var moment_1 = require("moment"); // Import moment
var RangePicker = antd_1.DatePicker.RangePicker;
var Option = antd_1.Select.Option;
var Queue = function () {
    var _a = react_1.useState([]), emails = _a[0], setEmails = _a[1];
    var _b = react_1.useState([]), selectedEmails = _b[0], setSelectedEmails = _b[1];
    var _c = react_1.useState([]), templates = _c[0], setTemplates = _c[1];
    var _d = react_1.useState(false), emailFormVisible = _d[0], setEmailFormVisible = _d[1];
    var _e = react_1.useState(null), selectedTemplate = _e[0], setSelectedTemplate = _e[1];
    var form = antd_1.Form.useForm()[0];
    var _f = react_1.useState(''), editorContent = _f[0], setEditorContent = _f[1];
    var _g = react_1.useState({ recipient: '', subject: '' }), composedEmail = _g[0], setComposedEmail = _g[1];
    var _h = react_1.useState(false), loading = _h[0], setLoading = _h[1]; // Loading state
    react_1.useEffect(function () {
        fetchEmails();
        fetchTemplates();
    }, []);
    var fetchEmails = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/emails', { params: params })];
                    case 1:
                        response = _a.sent();
                        setEmails(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch emails');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var fetchTemplates = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
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
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to fetch templates');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleComposeEmail = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var recipient, subject, payload, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipient = values.recipient, subject = values.subject;
                    if (!recipient || !editorContent || (!subject && !selectedTemplate)) {
                        antd_1.message.error('Recipient and body are required. Subject is required if no template is used.');
                        return [2 /*return*/];
                    }
                    payload = {
                        to: recipient,
                        subject: subject || '',
                        template_id: selectedTemplate || null,
                        body: editorContent
                    };
                    setLoading(true); // Show loader
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, umi_1.request('/compose-email', {
                            method: 'POST',
                            data: payload
                        })];
                case 2:
                    _a.sent();
                    antd_1.message.success('Email sent successfully');
                    setEmailFormVisible(false);
                    form.resetFields();
                    setEditorContent('');
                    setSelectedTemplate(null);
                    fetchEmails();
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to send email');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false); // Hide loader
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteSelected = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedEmails.length === 0) {
                        antd_1.message.error('No emails selected');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request('/delete-emails', {
                            method: 'POST',
                            data: { ids: selectedEmails }
                        })];
                case 2:
                    _a.sent();
                    antd_1.message.success('Selected emails deleted successfully');
                    setSelectedEmails([]); // Clear selected emails after deletion
                    fetchEmails(); // Refresh email list after deletion
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to delete selected emails');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleRetryEmail = function (emailId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/emails/retry/" + emailId, { method: 'POST' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Retrying email sending');
                    fetchEmails(); // Refresh email list after retry
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to retry sending email');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var emailColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Checkbox, { onChange: function (e) {
                    var checked = e.target.checked;
                    setSelectedEmails(function (prevSelectedEmails) {
                        return checked ? __spreadArrays(prevSelectedEmails, [record.id]) : prevSelectedEmails.filter(function (id) { return id !== record.id; });
                    });
                } })); }
        },
        { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD'); } },
        { title: 'Retry Count', dataIndex: 'retry_count', key: 'retryCount' },
        { title: 'Sent', dataIndex: 'sent', key: 'sent', render: function (text) { return (text === 'Yes' ? 'Yes' : 'No'); } },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Button, { onClick: function () { return handleRetryEmail(record.id); }, type: "link" }, "Retry")); }
        },
    ];
    return (react_1["default"].createElement("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40vh'
        } },
        react_1["default"].createElement(antd_1.Card, { style: { width: '100%', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' } },
            react_1["default"].createElement("div", { style: { marginBottom: '16px' } },
                react_1["default"].createElement(RangePicker, { onChange: function (dates) { return handleDateFilter(dates); } })),
            react_1["default"].createElement("div", { style: { marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return setEmailFormVisible(true); }, style: { marginRight: '8px' } }, "Compose Email"),
                react_1["default"].createElement(antd_1.Button, { danger: true, onClick: handleDeleteSelected, style: { marginRight: '8px', border: 'none', boxShadow: 'none' } }, "Delete Selected"),
                react_1["default"].createElement(antd_1.Button, { danger: true, onClick: function () { return antd_1.message.info('Bulk delete functionality is not yet implemented.'); } }, "Clear All")),
            react_1["default"].createElement(antd_1.Table, { columns: emailColumns, dataSource: emails, rowKey: "id", bordered: true }),
            react_1["default"].createElement(antd_1.Modal, { title: "Compose Email", visible: emailFormVisible, onCancel: function () { return setEmailFormVisible(false); }, footer: null },
                react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: handleComposeEmail },
                    react_1["default"].createElement(antd_1.Form.Item, { label: "To", name: "recipient", rules: [{ required: true, message: 'Please enter the recipient email!' }] },
                        react_1["default"].createElement(antd_1.Input, null)),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: !selectedTemplate, message: 'Please enter the subject!' }] },
                        react_1["default"].createElement(antd_1.Input, null)),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Select Template", name: "template" },
                        react_1["default"].createElement(antd_1.Select, { onChange: function (value) { return setSelectedTemplate(value); }, placeholder: "Select a template" }, templates.map(function (template) { return (react_1["default"].createElement(Option, { key: template.id, value: template.id }, template.name)); }))),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [{ required: true, message: 'Please enter the email body!' }] },
                        react_1["default"].createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor5_build_classic_1["default"], data: editorContent, onChange: function (event, editor) {
                                var data = editor.getData();
                                setEditorContent(data);
                            } })),
                    react_1["default"].createElement(antd_1.Form.Item, null,
                        react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", loading: loading }, "Send Email")))))));
};
exports["default"] = Queue;
