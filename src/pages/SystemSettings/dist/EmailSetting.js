"use strict";
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Form, Input, Button, Modal, message } from 'antd';
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
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi"); // Import request from umi for API calls
var Title = antd_1.Typography.Title;
var Panel = antd_1.Collapse.Panel;
var EmailSettings = function () {
    var _a = react_1.useState(false), isModalVisible = _a[0], setIsModalVisible = _a[1];
    var _b = react_1.useState([]), emails = _b[0], setEmails = _b[1];
    var _c = react_1.useState(null), emailDetailsVisible = _c[0], setEmailDetailsVisible = _c[1];
    // Fetch emails for viewing
    react_1.useEffect(function () {
        var fetchEmails = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/emails')];
                    case 1:
                        response = _a.sent();
                        if (response.success === 'true') {
                            setEmails(response.data);
                        }
                        else {
                            antd_1.message.error(response.message || 'Failed to fetch emails');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch emails');
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchEmails();
    }, []);
    // Handle email deletion
    var handleDeleteEmail = function (emailId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/emails/" + emailId, { method: 'DELETE' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Email deleted successfully');
                    setEmails(emails.filter(function (email) { return email.id !== emailId; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to delete email');
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleComposeEmail = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/compose-email', {
                            method: 'POST',
                            data: values
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Email sent successfully');
                    setIsModalVisible(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to send email');
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var emailColumns = [
        {
            title: 'Recipient',
            dataIndex: 'recipient',
            key: 'recipient'
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Date Sent',
            dataIndex: 'dateSent',
            key: 'dateSent'
        },
        {
            title: 'Action',
            key: 'action',
            render: function (_, record) { return (React.createElement(antd_1.Space, { size: "middle" },
                React.createElement(antd_1.Button, { onClick: function () {
                        return setEmailDetailsVisible(record.id === emailDetailsVisible ? null : record.id);
                    } }, emailDetailsVisible === record.id
                    ? 'Hide Details'
                    : 'View Details'),
                React.createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete this email?", onConfirm: function () { return handleDeleteEmail(record.id); }, okText: "Yes", cancelText: "No" },
                    React.createElement(antd_1.Button, { danger: true }, "Delete")))); }
        },
    ];
    var emailDetails = emails.find(function (email) { return email.id === emailDetailsVisible; });
    return (React.createElement(pro_components_1.ProCard, { title: "", bordered: true },
        React.createElement("div", { style: { padding: '16px' } },
            React.createElement(Title, { level: 4, style: { marginBottom: '16px' } }, "Email Settings"),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Email Setup"),
                        React.createElement(antd_1.Button, { type: "primary", onClick: function () { return setIsModalVisible(true); } }, "Compose Email"))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Email Template"),
                        React.createElement(antd_1.Button, { type: "primary" }, "View Template"))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Email Logs/Queue"),
                        React.createElement(antd_1.Button, { type: "primary", onClick: function () { return setEmailDetailsVisible(null); } }, emailDetailsVisible ? 'Hide Logs/Queue' : 'View Logs/Queue')),
                    emailDetailsVisible === null && (React.createElement(antd_1.Table, { columns: emailColumns, dataSource: emails, rowKey: "id", pagination: { pageSize: 10 }, style: { marginTop: '16px' } })),
                    emailDetailsVisible && emailDetails && (React.createElement(antd_1.Collapse, { defaultActiveKey: ['1'], style: { marginTop: '16px' } },
                        React.createElement(Panel, { header: "Details for Email ID: " + emailDetails.id, key: "1" },
                            React.createElement("p", null,
                                React.createElement("strong", null, "Recipient:"),
                                " ",
                                emailDetails.recipient),
                            React.createElement("p", null,
                                React.createElement("strong", null, "Subject:"),
                                " ",
                                emailDetails.subject),
                            React.createElement("p", null,
                                React.createElement("strong", null, "Date Sent:"),
                                " ",
                                emailDetails.dateSent),
                            React.createElement("p", null,
                                React.createElement("strong", null, "Body:")),
                            React.createElement("div", null, emailDetails.body))))))),
        React.createElement(antd_1.Modal, { title: "Compose Email", visible: isModalVisible, onCancel: function () { return setIsModalVisible(false); }, footer: null },
            React.createElement(antd_1.Form, { layout: "vertical", onFinish: handleComposeEmail },
                React.createElement(antd_1.Form.Item, { label: "Recipient", name: "recipient", rules: [
                        { required: true, message: 'Please enter the recipient email!' },
                    ] },
                    React.createElement(antd_1.Input, null)),
                React.createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: true, message: 'Please enter the subject!' }] },
                    React.createElement(antd_1.Input, null)),
                React.createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [
                        { required: true, message: 'Please enter the email body!' },
                    ] },
                    React.createElement(antd_1.Input.TextArea, { rows: 4 })),
                React.createElement(antd_1.Form.Item, null,
                    React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Send Email"))))));
};
exports["default"] = EmailSettings;
