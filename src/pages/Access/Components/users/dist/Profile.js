"use strict";
// import { Button, Card, Descriptions, Form, Input, Spin, message } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { request, useParams } from 'umi';
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
// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: { name: string };
//   roles: string[];
//   last_login: string;
//   login_count: number;
// }
// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data); 
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id, form]);
//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };
//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };
//   if (loading) {
//     return <Spin />;
//   }
//   return (
//     <Card title="User Profile">
//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered>
//             <Descriptions.Item label="ID">{profile.id}</Descriptions.Item>
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item
//                   name="display_name"
//                   rules={[
//                     { required: true, message: 'Display Name is required' },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     {
//                       type: 'email',
//                       message: 'The input is not valid E-mail!',
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">
//               {profile.ip_address}
//             </Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {profile.status?.name || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Roles">
//               {profile.roles?.length ? profile.roles.join(', ') : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile.last_login || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">
//               {profile.login_count || 'N/A'}
//             </Descriptions.Item>
//           </Descriptions>
//           {editing && (
//             <Form.Item>
//               <Button type="primary" onClick={handleSave}>
//                 Save
//               </Button>
//               <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           )}
//           {!editing && (
//             <Button type="primary" onClick={() => setEditing(true)}>
//               Edit
//             </Button>
//           )}
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };
// export default Profile;
// import { Button, Card, Col, Descriptions, Form, Input, Row, Spin, Typography, message } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { request, useParams, history } from 'umi';
// const { Title } = Typography;
// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: string; // Assume this is an ID for status
//   last_login: string | null; // Could be null if not available
//   login_count: number;
//   [key: string]: any; // Handle other fields dynamically
// }
// // Assuming you have a mapping for status names
// const statusMap: Record<string, string> = {
//   'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
//   // Add other status IDs and their names here
// };
// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data);
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id, form]);
//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };
//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };
//   const handleBack = () => {
//     history.push('/'); // Replace '/' with the path you want to navigate to
//   };
//   if (loading) {
//     return <Spin />;
//   }
//   return (
//     <Card
//       title={<Title level={2}>User Profile</Title>}
//       bordered={false}
//       style={{ maxWidth: 1000, margin: 'auto' }}
//     >
//       <Button
//         type="default"
//         style={{ marginBottom: 16 }}
//         onClick={handleBack}
//       >
//         Back
//       </Button>
//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered column={1} size="large">
//             {/* <Descriptions.Item label="ID">{profile.id}</Descriptions.Item> */}
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item  
//                   name="display_name"
//                   rules={[{ required: true, message: 'Display Name is required' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">{profile.ip_address || 'N/A'}</Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {statusMap[profile.status] || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile?.last_login ? new Date(profile?.last_login).toLocaleString() : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">{profile?.login_count || 'N/A'}</Descriptions.Item>
//           </Descriptions>
//           <Form.Item>
//             {editing ? (
//               <>
//                 <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>
//                   Save
//                 </Button>
//                 <Button onClick={handleCancel}>Cancel</Button>
//               </>
//             ) : (
//               <Button type="primary" onClick={() => setEditing(true)}>
//                 Edit
//               </Button>
//             )}
//           </Form.Item>
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };
// export default Profile;
// import { Button, Card, Col, Descriptions, Form, Input, Row, Spin, Typography, message } from 'antd';
// import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import React, { useEffect, useState } from 'react';
// import { request, useParams, history } from 'umi';
// const { Title } = Typography;
// interface ProfileData {
//   id: string;
//   display_name: string;
//   email: string;
//   ip_address: string;
//   status: string; // Assume this is an ID for status
//   last_login: string | null; // Could be null if not available
//   login_count: number;
//   [key: string]: any; // Handle other fields dynamically
// }
// // Assuming you have a mapping for status names
// const statusMap: Record<string, string> = {
//   'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active',
//   // Add other status IDs and their names here
// };
// const Profile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form] = Form.useForm();
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await request(`/users/${id}`);
//         if (response.data) {
//           setProfile(response.data);
//           form.setFieldsValue(response.data);
//         } else {
//           message.error('No data found');
//         }
//       } catch (error) {
//         message.error('Failed to fetch user profile');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id, form]);
//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       await request(`/users/${id}`, {
//         method: 'PUT',
//         data: values,
//       });
//       message.success('Profile updated successfully');
//       setProfile(values);
//       setEditing(false);
//     } catch (error) {
//       message.error('Failed to update profile');
//     }
//   };
//   const handleCancel = () => {
//     form.setFieldsValue(profile);
//     setEditing(false);
//   };
//   const handleBack = () => {
//     history.push('/'); // Replace '/' with the path you want to navigate to
//   };
//   if (loading) {
//     return <Spin />;
//   }
//   return (
//     <Card
//       title={<Title level={2}>User Profile</Title>}
//       bordered={false}
//       style={{ maxWidth: 1000, margin: 'auto', position: 'relative' }}
//     >
//       {profile ? (
//         <Form form={form} layout="vertical">
//           <Descriptions bordered column={1} size="large">
//             {/* <Descriptions.Item label="ID">{profile.id}</Descriptions.Item> */}
//             <Descriptions.Item label="Display Name">
//               {editing ? (
//                 <Form.Item
//                   name="display_name"
//                   rules={[{ required: true, message: 'Display Name is required' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.display_name
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               {editing ? (
//                 <Form.Item
//                   name="email"
//                   rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
//                   style={{ margin: 0 }}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 profile.email
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="IP Address">{profile.ip_address || 'N/A'}</Descriptions.Item>
//             <Descriptions.Item label="Status">
//               {statusMap[profile.status] || 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Last Login">
//               {profile.last_login ? new Date(profile.last_login).toLocaleString() : 'N/A'}
//             </Descriptions.Item>
//             <Descriptions.Item label="Login Count">{profile.login_count || 'N/A'}</Descriptions.Item>
//           </Descriptions>
//           <Form.Item style={{ textAlign: 'right' }}>
//             {editing ? (
//               <>
//                 <Button
//                   type="primary"
//                   onClick={handleSave}
//                   style={{ marginRight: 8 }}
//                 >
//                   Save
//                 </Button>
//                 <Button onClick={handleCancel}>Cancel</Button>
//               </>
//             ) : (
//               <Button
//                 type="link"
//                 icon={<EditOutlined />}
//                 style={{ color: '#1890ff' }} // Darker blue color
//                 onClick={() => setEditing(true)}
//               >
//                 Edit
//               </Button>
//             )}
//           </Form.Item>
//           {/* Back Button positioned at the bottom left */}
//           <Button
//             type="default"
//             icon={<ArrowLeftOutlined />}
//             style={{ position: 'absolute', bottom: 16, left: 16 }}
//             onClick={handleBack}
//           >
//             Back
//           </Button>
//         </Form>
//       ) : (
//         <p>No profile data available</p>
//       )}
//     </Card>
//   );
// };
// export default Profile;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
// Assuming you have a mapping for status names
var statusMap = {
    'bfd022d1-655e-42fe-8aec-cb8eead81e54': 'Active'
};
var Profile = function () {
    var id = umi_1.useParams().id;
    var _a = react_1.useState(null), profile = _a[0], setProfile = _a[1];
    var _b = react_1.useState([]), activityLogs = _b[0], setActivityLogs = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), editing = _d[0], setEditing = _d[1];
    var form = antd_1.Form.useForm()[0];
    react_1.useEffect(function () {
        var fetchProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, umi_1.request("/users/" + id)];
                    case 1:
                        response = _a.sent();
                        if (response.data) {
                            setProfile(response.data.user);
                            setActivityLogs(response.data.activity_logs);
                            form.setFieldsValue(response.data.user);
                        }
                        else {
                            antd_1.message.error('No data found');
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch user profile');
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchProfile();
    }, [id, form]);
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var values, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, form.validateFields()];
                case 1:
                    values = _a.sent();
                    return [4 /*yield*/, umi_1.request("/users/" + id, {
                            method: 'PUT',
                            data: values
                        })];
                case 2:
                    _a.sent();
                    antd_1.message.success('Profile updated successfully');
                    setProfile(values);
                    setEditing(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to update profile');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCancel = function () {
        form.setFieldsValue(profile);
        setEditing(false);
    };
    var handleBack = function () {
        umi_1.history.push('/'); // Replace '/' with the path you want to navigate to
    };
    if (loading) {
        return react_1["default"].createElement(antd_1.Spin, null);
    }
    var columns = [
        { title: 'Action', dataIndex: 'action', key: 'action' },
        { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
    ];
    return (react_1["default"].createElement(antd_1.Card, { title: react_1["default"].createElement(Title, { level: 2 }, "User Profile"), bordered: false, style: { maxWidth: 1000, margin: 'auto', position: 'relative' } },
        profile ? (react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical" },
            react_1["default"].createElement(antd_1.Descriptions, { bordered: true, column: 1, size: "large" },
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Display Name" }, editing ? (react_1["default"].createElement(antd_1.Form.Item, { name: "display_name", rules: [{ required: true, message: 'Display Name is required' }], style: { margin: 0 } },
                    react_1["default"].createElement(antd_1.Input, null))) : (profile.display_name || 'N/A')),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Email" }, editing ? (react_1["default"].createElement(antd_1.Form.Item, { name: "email", rules: [{ type: 'email', message: 'The input is not valid E-mail!' }], style: { margin: 0 } },
                    react_1["default"].createElement(antd_1.Input, null))) : (profile.email || 'N/A')),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "IP Address" }, profile.ip_address || 'N/A'),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Status" }, statusMap[profile.status] || 'N/A'),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Last Login" }, profile.last_login ? new Date(profile.last_login).toLocaleString() : 'N/A'),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Login Count" }, profile.login_count || 'N/A')),
            react_1["default"].createElement(antd_1.Form.Item, { style: { textAlign: 'right' } }, editing ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: handleSave, style: { marginRight: 8 } }, "Save"),
                react_1["default"].createElement(antd_1.Button, { onClick: handleCancel }, "Cancel"))) : (react_1["default"].createElement(antd_1.Button, { type: "link", icon: react_1["default"].createElement(icons_1.EditOutlined, null), style: { color: '#1890ff' }, onClick: function () { return setEditing(true); } }, "Edit"))),
            react_1["default"].createElement(antd_1.Button, { type: "default", icon: react_1["default"].createElement(icons_1.ArrowLeftOutlined, null), style: { position: 'absolute', bottom: 16, left: 16 }, onClick: handleBack }, "Back"))) : (react_1["default"].createElement("p", null, "No profile data available")),
        activityLogs.length > 0 && (react_1["default"].createElement(antd_1.Card, { title: "Activity Logs", style: { marginTop: 24 } },
            react_1["default"].createElement(antd_1.Table, { columns: columns, dataSource: activityLogs, rowKey: "id", pagination: false })))));
};
exports["default"] = Profile;
