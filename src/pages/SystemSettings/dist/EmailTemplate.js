"use strict";
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Switch, message, Modal, Form, Input, Card } from 'antd';
// import { PageContainer } from '@ant-design/pro-layout';
// import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
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
// const EmailTemplate = () => {
//   const [templates, setTemplates] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isViewModalVisible, setIsViewModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [form] = Form.useForm();
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
//   const handleCreateTemplate = async (values) => {
//     try {
//       const response = await request('/templates', {
//         method: 'POST',
//         data: values,
//       });
//       message.success(response.message || 'Template created successfully');
//       setIsModalVisible(false);
//       fetchTemplates();
//     } catch (error) {
//       message.error('Failed to create template');
//     }
//   };
//   const handleDelete = async (templateId) => {
//     try {
//       await request(`/templates/${templateId}`, { method: 'DELETE' });
//       message.success('Template deleted successfully');
//       setTemplates(templates.filter((template) => template.id !== templateId));
//     } catch (error) {
//       message.error('Failed to delete template');
//     }
//   };
//   const handleStatusChange = async (templateId, checked) => {
//     try {
//       await request(`/templates/${templateId}/status`, {
//         method: 'PATCH',
//         data: { status: checked ? 'Active' : 'Inactive' },
//       });
//       message.success('Status updated successfully');
//       fetchTemplates();
//     } catch (error) {
//       message.error('Failed to update status');
//     }
//   };
//   const handleViewTemplate = (template) => {
//     setSelectedTemplate(template);
//     setIsViewModalVisible(true);
//   };
//   const handleEditTemplate = (template) => {
//     setSelectedTemplate(template);
//     setIsEditModalVisible(true);
//     form.setFieldsValue(template);
//   };
//   const templateColumns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     {
//       title: 'Status',
//       render: (text, record) => (
//         <Switch
//           checked={record.status === 'Active'}
//           onChange={(checked) => handleStatusChange(record.id, checked)}
//         />
//       ),
//     },
//     {
//       title: 'Actions',
//       render: (text, record) => (
//         <>
//           <Button icon={<EyeOutlined />} onClick={() => handleViewTemplate(record)} style={{ marginRight: 8 }}>
//             View
//           </Button>
//           <Button icon={<EditOutlined />} onClick={() => handleEditTemplate(record)} style={{ marginRight: 8 }}>
//             Edit
//           </Button>
//           <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];
//   return (
//     <PageContainer
//       title={null} // Remove the title
//     >
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '40vh' }}>
//         <Card
//           style={{
//             width: '105%',
//             // maxWidth: '1200px',
//             // padding: '20px',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
//             <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
//               Create Template
//             </Button>
//           </div>
//           <Table
//             columns={templateColumns}
//             dataSource={templates}
//             rowKey="id"
//             bordered
//             pagination={{ pageSize: 10 }}
//             title={() => null} // Removes the default title
//           />
//           {/* Create Template Modal */}
//           <Modal
//             title="Create Email Template"
//             visible={isModalVisible}
//             onCancel={() => setIsModalVisible(false)}
//             onOk={() => form.submit()}
//             centered
//           >
//             <Form form={form} layout="vertical" onFinish={handleCreateTemplate}>
//               <Form.Item label="Template Name" name="name" rules={[{ required: true, message: 'Please enter the template name' }]}>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the body' }]}>
//                 <ReactQuill theme="snow" />
//               </Form.Item>
//             </Form>
//           </Modal>
//           {/* View Template Modal */}
//           {selectedTemplate && (
//             <Modal
//               title="View Template"
//               visible={isViewModalVisible}
//               onCancel={() => setIsViewModalVisible(false)}
//               footer={null}
//               centered
//             >
//               <h3>{selectedTemplate.name}</h3>
//               <p><strong>Subject:</strong> {selectedTemplate.subject}</p>
//               <div dangerouslySetInnerHTML={{ __html: selectedTemplate.body }} />
//             </Modal>
//           )}
//           {/* Edit Template Modal */}
//           {selectedTemplate && (
//             <Modal
//               title="Edit Email Template"
//               visible={isEditModalVisible}
//               onCancel={() => setIsEditModalVisible(false)}
//               onOk={() => form.submit()}
//               centered
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={async (values) => {
//                   try {
//                     await request(`/templates/${selectedTemplate.id}`, {
//                       method: 'PUT',
//                       data: values,
//                     });
//                     message.success('Template updated successfully');
//                     setIsEditModalVisible(false);
//                     fetchTemplates();
//                   } catch (error) {
//                     message.error('Failed to update template');
//                   }
//                 }}
//               >
//                 <Form.Item label="Template Name" name="name" rules={[{ required: true, message: 'Please enter the template name' }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the body' }]}>
//                   <ReactQuill theme="snow" />
//                 </Form.Item>
//               </Form>
//             </Modal>
//           )}
//         </Card>
//       </div>
//     </PageContainer>
//   );
// };
// export default EmailTemplate;
var react_1 = require("react");
var antd_1 = require("antd");
var pro_layout_1 = require("@ant-design/pro-layout");
var icons_1 = require("@ant-design/icons");
var umi_1 = require("umi");
var react_quill_1 = require("react-quill");
require("react-quill/dist/quill.snow.css");
require("./Email.less");
var EmailTemplate = function () {
    var _a = react_1.useState([]), templates = _a[0], setTemplates = _a[1];
    var _b = react_1.useState(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var _c = react_1.useState(false), isViewModalVisible = _c[0], setIsViewModalVisible = _c[1];
    var _d = react_1.useState(false), isEditModalVisible = _d[0], setIsEditModalVisible = _d[1];
    var _e = react_1.useState(null), selectedTemplate = _e[0], setSelectedTemplate = _e[1];
    var form = antd_1.Form.useForm()[0];
    react_1.useEffect(function () {
        fetchTemplates();
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
    var handleCreateTemplate = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/templates', {
                            method: 'POST',
                            data: values
                        })];
                case 1:
                    response = _a.sent();
                    antd_1.message.success(response.message || 'Template created successfully');
                    setIsModalVisible(false);
                    fetchTemplates();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to create template');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (templateId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/templates/" + templateId, { method: 'DELETE' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Template deleted successfully');
                    setTemplates(templates.filter(function (template) { return template.id !== templateId; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to delete template');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleStatusChange = function (templateId, checked) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/templates/" + templateId + "/status", {
                            method: 'PATCH',
                            data: { status: checked ? 'Active' : 'Inactive' }
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Status updated successfully');
                    fetchTemplates();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to update status');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleViewTemplate = function (template) {
        setSelectedTemplate(template);
        setIsViewModalVisible(true);
    };
    var handleEditTemplate = function (template) {
        setSelectedTemplate(template);
        setIsEditModalVisible(true);
        form.setFieldsValue(template);
    };
    var templateColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Status',
            render: function (text, record) { return (react_1["default"].createElement(antd_1.Switch, { checked: record.status === 'Active', onChange: function (checked) { return handleStatusChange(record.id, checked); } })); }
        },
        {
            title: 'Actions',
            fixed: 'right',
            render: function (text, record) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EyeOutlined, null), onClick: function () { return handleViewTemplate(record); }, style: { marginRight: 18, color: '#faad14', borderColor: '#faad14', borderRadius: '4px' } }, "View"),
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () { return handleEditTemplate(record); }, style: { marginRight: 18, color: '#1890ff', borderColor: '#1890ff', borderRadius: '4px' } }, "Edit"),
                react_1["default"].createElement(antd_1.Button, { danger: true, icon: react_1["default"].createElement(icons_1.DeleteOutlined, null), onClick: function () { return handleDelete(record.id); }, style: { color: '#ff4d4f', borderColor: '#ff4d4f', borderRadius: '4px' } }, "Delete"))); },
            className: 'column-actions'
        },
    ];
    return (react_1["default"].createElement(pro_layout_1.PageContainer, { title: null },
        react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '40vh' } },
            react_1["default"].createElement(antd_1.Card, { style: {
                    width: '105%',
                    // maxWidth: '1200px',
                    // padding: '20px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                } },
                react_1["default"].createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' } },
                    react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), onClick: function () { return setIsModalVisible(true); } }, "Create Template")),
                react_1["default"].createElement(antd_1.Table, { columns: templateColumns, dataSource: templates, rowKey: "id", bordered: true, pagination: { pageSize: 10 }, title: function () { return null; } }),
                react_1["default"].createElement(antd_1.Modal, { title: "Create Email Template", visible: isModalVisible, onCancel: function () { return setIsModalVisible(false); }, onOk: function () { return form.submit(); }, centered: true },
                    react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: handleCreateTemplate },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Template Name", name: "name", rules: [{ required: true, message: 'Please enter the template name' }] },
                            react_1["default"].createElement(antd_1.Input, null)),
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: true, message: 'Please enter the subject' }] },
                            react_1["default"].createElement(antd_1.Input, null)),
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [{ required: true, message: 'Please enter the body' }] },
                            react_1["default"].createElement(react_quill_1["default"], { theme: "snow" })))),
                selectedTemplate && (react_1["default"].createElement(antd_1.Modal, { title: "View Template", visible: isViewModalVisible, onCancel: function () { return setIsViewModalVisible(false); }, footer: null, centered: true },
                    react_1["default"].createElement("h3", null, selectedTemplate.name),
                    react_1["default"].createElement("p", null,
                        react_1["default"].createElement("strong", null, "Subject:"),
                        " ",
                        selectedTemplate.subject),
                    react_1["default"].createElement("div", { dangerouslySetInnerHTML: { __html: selectedTemplate.body } }))),
                selectedTemplate && (react_1["default"].createElement(antd_1.Modal, { title: "Edit Email Template", visible: isEditModalVisible, onCancel: function () { return setIsEditModalVisible(false); }, onOk: function () { return form.submit(); }, centered: true },
                    react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: function (values) { return __awaiter(void 0, void 0, void 0, function () {
                            var error_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, umi_1.request("/templates/" + selectedTemplate.id, {
                                                method: 'PUT',
                                                data: values
                                            })];
                                    case 1:
                                        _a.sent();
                                        antd_1.message.success('Template updated successfully');
                                        setIsEditModalVisible(false);
                                        fetchTemplates();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_5 = _a.sent();
                                        antd_1.message.error('Failed to update template');
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); } },
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Template Name", name: "name", rules: [{ required: true, message: 'Please enter the template name' }] },
                            react_1["default"].createElement(antd_1.Input, null)),
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Subject", name: "subject", rules: [{ required: true, message: 'Please enter the subject' }] },
                            react_1["default"].createElement(antd_1.Input, null)),
                        react_1["default"].createElement(antd_1.Form.Item, { label: "Body", name: "body", rules: [{ required: true, message: 'Please enter the body' }] },
                            react_1["default"].createElement(react_quill_1["default"], { theme: "snow" })))))))));
};
exports["default"] = EmailTemplate;
