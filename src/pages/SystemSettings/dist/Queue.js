"use strict";
// import React, { useEffect, useState } from 'react';
// import { Table, Checkbox, Button, message } from 'antd';
// import { request } from 'umi';
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
    // Fetch email logs
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
    // Fetch email templates
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
    // Fetch single template by ID
    var fetchTemplateById = function (templateId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/templates/" + templateId)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to fetch template');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle date filter
    var handleDateFilter = function (dates) { return __awaiter(void 0, void 0, void 0, function () {
        var start_date, end_date;
        return __generator(this, function (_a) {
            start_date = dates ? dates[0].format('YYYY-MM-DD') : undefined;
            end_date = dates ? dates[1].format('YYYY-MM-DD') : undefined;
            fetchEmails({ start_date: start_date, end_date: end_date });
            return [2 /*return*/];
        });
    }); };
    // Handle bulk delete
    var handleBulkDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/emails/bulk-delete', {
                            method: 'DELETE',
                            data: { ids: selectedEmails }
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Bulk delete successful');
                    fetchEmails(); // Refresh the list
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to delete selected emails');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle delete selected
    var handleDeleteSelected = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all(selectedEmails.map(function (emailId) {
                            return umi_1.request("/emails/" + emailId, { method: 'DELETE' });
                        }))];
                case 1:
                    _a.sent();
                    antd_1.message.success('Selected emails deleted successfully');
                    fetchEmails(); // Refresh the list
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to delete selected emails');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle single delete
    var handleSingleDelete = function (emailId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/emails/" + emailId, { method: 'DELETE' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Email deleted successfully');
                    fetchEmails(); // Refresh the list
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    antd_1.message.error('Failed to delete email');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle resend
    var handleResend = function (emailId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/emails/" + emailId + "/resend", { method: 'POST' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Email resent successfully');
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    antd_1.message.error('Failed to resend email');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Handle compose email
    var handleComposeEmail = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var recipient, subject, payload, error_8;
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
                    setSelectedTemplate(null); // Reset template selection
                    fetchEmails(); // Refresh the list
                    return [3 /*break*/, 5];
                case 3:
                    error_8 = _a.sent();
                    antd_1.message.error('Failed to send email');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false); // Hide loader
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Handle template selection
    var handleTemplateChange = function (templateId) { return __awaiter(void 0, void 0, void 0, function () {
        var selected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!templateId)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetchTemplateById(templateId)];
                case 1:
                    selected = _a.sent();
                    if (selected) {
                        setEditorContent(selected.body);
                        setSelectedTemplate(templateId);
                        form.setFieldsValue({
                            subject: selected.subject || '' // Update form subject field
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var emailColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Checkbox, { onChange: function (e) {
                    var checked = e.target.checked;
                    setSelectedEmails(function (prevSelectedEmails) { return checked
                        ? __spreadArrays(prevSelectedEmails, [record.id]) : prevSelectedEmails.filter(function (id) { return id !== record.id; }); });
                } })); }
        },
        { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD'); } },
    ];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { style: { marginBottom: '16px' } },
            react_1["default"].createElement(RangePicker, { onChange: handleDateFilter })),
        react_1["default"].createElement("div", { style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return setEmailFormVisible(true); }, style: { marginRight: '8px' } }, "Compose Email"),
            react_1["default"].createElement(antd_1.Button, { danger: true, onClick: handleDeleteSelected, style: { marginRight: '8px' } }, "Delete Selected"),
            react_1["default"].createElement(antd_1.Button, { danger: true, onClick: handleBulkDelete }, "Bulk Delete")),
        react_1["default"].createElement(antd_1.Table, { columns: emailColumns, dataSource: emails, rowKey: "id" }),
        react_1["default"].createElement(antd_1.Modal, { title: "Compose Email", visible: emailFormVisible, onCancel: function () { return setEmailFormVisible(false); }, footer: null },
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: handleComposeEmail },
                react_1["default"].createElement(antd_1.Form.Item, { label: "To", name: "recipient", rules: [{ required: true, message: 'Please enter the recipient email!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: !selectedTemplate, message: 'Please enter the subject!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Select Template", name: "template", rules: [{ required: false }] },
                    react_1["default"].createElement(antd_1.Select, { onChange: handleTemplateChange, placeholder: "Select a template" }, templates.map(function (template) { return (react_1["default"].createElement(Option, { key: template.id, value: template.id }, template.name)); }))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [{ required: true, message: 'Please enter the email body!' }] },
                    react_1["default"].createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor5_build_classic_1["default"], data: editorContent, onChange: function (event, editor) {
                            var data = editor.getData();
                            setEditorContent(data);
                        } })),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", loading: loading }, "Send Email"))))));
};
exports["default"] = Queue;
