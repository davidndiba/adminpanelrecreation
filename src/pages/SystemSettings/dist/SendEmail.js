"use strict";
// import React, { useState } from 'react';
// import { Form, Modal, Button, message } from 'antd';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
exports.__esModule = true;
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
var react_1 = require("react");
var antd_1 = require("antd");
var ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
var ckeditor5_build_classic_1 = require("@ckeditor/ckeditor5-build-classic");
var umi_1 = require("umi");
var moment_1 = require("moment"); // Import moment for date formatting
var Option = antd_1.Select.Option;
var SendEmail = function () {
    var _a = react_1.useState(''), editorContent = _a[0], setEditorContent = _a[1];
    var _b = react_1.useState(false), isComposeEmailModalVisible = _b[0], setIsComposeEmailModalVisible = _b[1];
    var _c = react_1.useState([]), templates = _c[0], setTemplates = _c[1];
    var form = antd_1.Form.useForm()[0];
    var _d = react_1.useState([]), emails = _d[0], setEmails = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    react_1.useEffect(function () {
        fetchTemplates();
        fetchEmails();
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
    var fetchEmails = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/emails')];
                case 1:
                    response = _a.sent();
                    setEmails(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to fetch emails');
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
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Adjusting the payload to match expected API fields
                    return [4 /*yield*/, umi_1.request('/compose-email', {
                            method: 'POST',
                            data: {
                                to: values.recipient,
                                template_id: values.template,
                                placeholders: values.placeholders || {},
                                body: editorContent
                            }
                        })];
                case 2:
                    // Adjusting the payload to match expected API fields
                    _a.sent();
                    antd_1.message.success('Email sent successfully');
                    setIsComposeEmailModalVisible(false);
                    setEditorContent('');
                    form.resetFields();
                    fetchEmails(); // Refresh email list
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to send email');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleTemplateChange = function (templateId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, template, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!templateId)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request("/templates/" + templateId)];
                case 2:
                    response = _a.sent();
                    template = response.data;
                    setEditorContent(template.body);
                    form.setFieldsValue({
                        subject: template.subject || ''
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to fetch template');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var emailColumns = [
        { title: 'Recipient', dataIndex: 'to', key: 'recipient' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        { title: 'Date Sent', dataIndex: 'sent_at', key: 'dateSent', render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD'); } },
    ];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setIsComposeEmailModalVisible(true); } }, "Compose Email"),
        react_1["default"].createElement(antd_1.Modal, { title: "Compose Email", visible: isComposeEmailModalVisible, onCancel: function () { return setIsComposeEmailModalVisible(false); }, footer: null },
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: handleComposeEmail },
                react_1["default"].createElement(antd_1.Form.Item, { label: "To", name: "recipient" // Ensure this field name is used correctly in payload
                    , rules: [{ required: true, message: 'Please enter the recipient email!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: true, message: 'Please enter the subject!' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Select Template", name: "template" },
                    react_1["default"].createElement(antd_1.Select, { onChange: handleTemplateChange, placeholder: "Select a template" }, templates.map(function (template) { return (react_1["default"].createElement(Option, { key: template.id, value: template.id }, template.name)); }))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [{ required: true, message: 'Please enter the email body!' }] },
                    react_1["default"].createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor5_build_classic_1["default"], data: editorContent, onChange: function (event, editor) {
                            var data = editor.getData();
                            setEditorContent(data);
                        } })),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", loading: loading }, "Send Email")))),
        react_1["default"].createElement(antd_1.Table, { columns: emailColumns, dataSource: emails, rowKey: "id", pagination: { pageSize: 10 } })));
};
exports["default"] = SendEmail;
