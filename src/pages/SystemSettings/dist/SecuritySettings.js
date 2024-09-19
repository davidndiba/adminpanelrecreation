"use strict";
// import React, { useState, useEffect } from 'react';
// import { ProCard, PageContainer } from '@ant-design/pro-components';
// import { Typography, Switch, message, Space, Form, InputNumber, Button, Collapse, Row, Col } from 'antd';
// import { request } from 'umi';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// const { Title } = Typography;
// const { Panel } = Collapse;
// const PasswordSettings = () => {
//   const [passwordRules, setPasswordRules] = useState<any>({
//     min_length: 8,
//     max_length: 20,
//     require_uppercase: true,
//     require_lowercase: true,
//     require_number: true,
//     require_special_character: true,
//     disallow_repeated_characters: false,
//     disallow_spaces: true,
//     disallow_common_passwords: true,
//     disallow_sequential_characters: true,
//     disallow_palindromes: false,
//     disallow_username_in_password: true,
//     enforce_password_history: 5,
//   });
//   const [rememberMe, setRememberMe] = useState(true);
//   // Fetch current password rules when the component mounts
//   useEffect(() => {
//     request(`/password-rules`, {
//       method: 'GET'
//     })
//       .then((data) => setPasswordRules(data))
//       .catch(() => message.error('Failed to fetch password rules'));
//   }, []);
//   // Handle API updates
//   const handlePasswordRulesChange = (field: string, value: any) => {
//     setPasswordRules((prev) => ({ ...prev, [field]: value }));
//     request(`/password-rules`, {
//       method: 'POST',
//       data: { [field]: value },
//     })
//       .then(() => message.success('Password setting updated successfully'))
//       .catch(() => message.error('Failed to update setting'));
//   };
//   const handleForcePasswordReset = () => {
//     request(`/admin/reset-all-passwords`, {
//       method: 'POST'
//     })
//       .then(() => message.success('All user passwords have been reset'))
//       .catch(() => message.error('Failed to force password reset'));
//   };
//   return (
//     <PageContainer
//       style={{
//         backgroundColor: '#fff',
//         minHeight: '100vh',
//         padding: '24px',
//       }}
//       title="Security Settings" // Single title for the page
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '60vh',
//         }}
//       >
//         <ProCard title="Password Settings" bordered style={{ width: '100%', maxWidth: '800px' }}>
//           <div style={{ padding: '16px' }}>
//             <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
//             <Collapse defaultActiveKey={['1', '2', '3']} accordion>
//               {/* Password Strength Settings */}
//               <Panel header="Password Strength Settings" key="1">
//                 <Form layout="vertical" size="small">
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <Form.Item label="Minimum Password Length">
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.min_length}
//                           onChange={(value) => handlePasswordRulesChange('min_length', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item label="Maximum Password Length">
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.max_length}
//                           onChange={(value) => handlePasswordRulesChange('max_length', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </Form>
//               </Panel>
//               {/* Password Options Toggles */}
//               <Panel header="Password Options" key="2">
//                 <Row gutter={16}>
//                   {Object.keys(passwordRules)
//                     .filter(key => typeof passwordRules[key] === 'boolean' && !['require_uppercase', 'require_lowercase'].includes(key))
//                     .map((key) => (
//                       <Col span={12} key={key} style={{ marginBottom: '16px' }}>
//                         <Row align="middle">
//                           <Col span={12}>
//                             <Form.Item style={{ margin: 0 }}>
//                               <span>{formatLabel(key)}</span>
//                             </Form.Item>
//                           </Col>
//                           <Col span={12} style={{ textAlign: 'right' }}>
//                             <Switch
//                               checked={passwordRules[key]}
//                               onChange={(checked) => handlePasswordRulesChange(key, checked)}
//                             />
//                           </Col>
//                         </Row>
//                       </Col>
//                     ))}
//                 </Row>
//                 <Row gutter={16}>
//                   {Object.keys(passwordRules)
//                     .filter(key => typeof passwordRules[key] === 'number')
//                     .map((key) => (
//                       <Col span={12} key={key} style={{ marginBottom: '16px' }}>
//                         <Form.Item label={formatLabel(key)} style={{ margin: 0 }}>
//                           <InputNumber
//                             min={1}
//                             value={passwordRules[key]}
//                             onChange={(value) => handlePasswordRulesChange(key, value)}
//                             style={{ width: '100%' }}
//                           />
//                         </Form.Item>
//                       </Col>
//                     ))}
//                 </Row>
//               </Panel>
//               {/* Remember Me Option */}
//               <Panel header="Remember Me Option" key="3">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Space>
//                       <div>Allow "Remember Me" Option</div>
//                       <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//                     </Space>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//               {/* Force Password Reset */}
//               <Panel header="Force Password Reset" key="4">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Button type="primary" danger onClick={handleForcePasswordReset}>
//                       Reset All Passwords
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//             </Collapse>
//           </div>
//         </ProCard>
//       </div>
//     </PageContainer>
//   );
// };
// // Helper function to format labels for form fields
// const formatLabel = (key: string) => {
//   return key
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (char) => char.toUpperCase())
//     .replace(/Password$/, 'Password');
// };
// export default PasswordSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard, PageContainer } from '@ant-design/pro-components';
// import { Typography, Switch, message, Space, Form, InputNumber, Button, Collapse, Row, Col } from 'antd';
// import { request } from 'umi';
// const { Title } = Typography;
// const { Panel } = Collapse;
// const PasswordSettings = () => {
//   const [passwordRules, setPasswordRules] = useState<any>({
//     min_length: 8,
//     max_length: 20,
//     password_expiry_days: 90,
//     enforce_password_history: 5,
//     require_uppercase: true,
//     require_lowercase: true,
//     require_number: true,
//     require_special_character: true,
//     disallow_repeated_characters: false,
//     disallow_spaces: true,
//     disallow_common_passwords: true,
//     disallow_sequential_characters: true,
//     disallow_palindromes: false,
//     disallow_username_in_password: true,
//     enforce_alphanumeric: true,
//   });
//   const [rememberMe, setRememberMe] = useState(true);
//   // Fetch current password rules when the component mounts
//   useEffect(() => {
//     request(`/password-rules`, {
//       method: 'GET'
//     })
//       .then((data) => setPasswordRules(data))
//       .catch(() => message.error('Failed to fetch password rules'));
//   }, []);
//   // Handle API updates
//   const handlePasswordRulesChange = (field: string, value: any) => {
//     setPasswordRules((prev) => ({ ...prev, [field]: value }));
//     request(`/password-rules`, {
//       method: 'POST',
//       data: { [field]: value },
//     })
//       .then(() => message.success('Password setting updated successfully'))
//       .catch(() => message.error('Failed to update setting'));
//   };
//   const handleForcePasswordReset = () => {
//     request(`/admin/reset-all-passwords`, {
//       method: 'POST'
//     })
//       .then(() => message.success('All user passwords have been reset'))
//       .catch(() => message.error('Failed to force password reset'));
//   };
//   return (
//     <PageContainer
//       style={{
//         backgroundColor: '#fff',
//         minHeight: '100vh',
//         padding: '24px',
//       }}
//       title="Security Settings" // Single title for the page
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '60vh',
//         }}
//       >
//         <ProCard title="Password Settings" bordered style={{ width: '100%', maxWidth: '800px' }}>
//           <div style={{ padding: '16px' }}>
//             <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
//             <Collapse defaultActiveKey={['1', '2', '3', '4']} accordion>
//               {/* Password Strength Settings */}
//               <Panel header="Password Strength Settings" key="1">
//                 <Form layout="vertical" size="small">
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <Form.Item label="Minimum Password Length">
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.min_length}
//                           onChange={(value) => handlePasswordRulesChange('min_length', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item label="Maximum Password Length">
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.max_length}
//                           onChange={(value) => handlePasswordRulesChange('max_length', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row gutter={16} style={{ marginTop: '16px' }}>
//                     <Col span={12}>
//                       <Form.Item label="Password Expiry Days">
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.password_expiry_days}
//                           onChange={(value) => handlePasswordRulesChange('password_expiry_days', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item label="Enforce Password History">
//                         <InputNumber
//                           min={0}
//                           value={passwordRules.enforce_password_history}
//                           onChange={(value) => handlePasswordRulesChange('enforce_password_history', value)}
//                           style={{ width: '100%' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </Form>
//               </Panel>
//               {/* Password Options Toggles */}
//               <Panel header="Password Options" key="2">
//                 <Form layout="vertical" size="small">
//                   <Row gutter={16}>
//                     {Object.keys(passwordRules)
//                       .filter(key => typeof passwordRules[key] === 'boolean' && !['require_uppercase', 'require_lowercase'].includes(key))
//                       .map((key) => (
//                         <Col span={12} key={key} style={{ marginBottom: '16px' }}>
//                           <Row align="middle">
//                             <Col span={18}>
//                               <Form.Item style={{ margin: 0 }}>
//                                 <span>{formatLabel(key)}</span>
//                               </Form.Item>
//                             </Col>
//                             <Col span={6} style={{ textAlign: 'right' }}>
//                               <Switch
//                                 checked={passwordRules[key]}
//                                 onChange={(checked) => handlePasswordRulesChange(key, checked)}
//                                 style={{ width: '50%' }}
//                               />
//                             </Col>
//                           </Row>
//                         </Col>
//                       ))}
//                   </Row>
//                 </Form>
//               </Panel>
//               {/* Remember Me Option */}
//               <Panel header="Remember Me Option" key="3">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Space>
//                       <div>Allow "Remember Me" Option</div>
//                       <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//                     </Space>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//               {/* Force Password Reset */}
//               <Panel header="Force Password Reset" key="4">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Button type="primary" danger onClick={handleForcePasswordReset}>
//                       Reset All Passwords
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//             </Collapse>
//           </div>
//         </ProCard>
//       </div>
//     </PageContainer>
//   );
// };
// // Helper function to format labels for form fields
// const formatLabel = (key: string) => {
//   return key
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (char) => char.toUpperCase())
//     .replace(/Password$/, 'Password');
// };
// export default PasswordSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard, PageContainer } from '@ant-design/pro-components';
// import { Typography, Switch, message, Space, Form, InputNumber, Button, Collapse, Row, Col, Modal } from 'antd';
// import { request } from 'umi';
// const { Title } = Typography;
// const { Panel } = Collapse;
// const PasswordSettings = () => {
//   const [passwordRules, setPasswordRules] = useState<any>({
//     min_length: 8,
//     max_length: 20,
//     password_expiry_days: 90,
//     enforce_password_history: 5,
//     require_uppercase: true,
//     require_lowercase: true,
//     require_number: true,
//     require_special_character: true,
//     disallow_repeated_characters: false,
//     disallow_spaces: true,
//     disallow_common_passwords: true,
//     disallow_sequential_characters: true,
//     disallow_palindromes: false,
//     disallow_username_in_password: true,
//     enforce_alphanumeric: true,
//   });
//   const [rememberMe, setRememberMe] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   // Fetch current password rules when the component mounts
//   useEffect(() => {
//     request(`/password-rules`, {
//       method: 'GET'
//     })
//       .then((data) => setPasswordRules(data))
//       .catch(() => message.error('Failed to fetch password rules'));
//   }, []);
//   // Handle API updates
//   const handlePasswordRulesChange = (field: string, value: any) => {
//     setPasswordRules((prev) => ({ ...prev, [field]: value }));
//     request(`/password-rules`, {
//       method: 'POST',
//       data: { [field]: value },
//     })
//       .then(() => message.success('Password setting updated successfully'))
//       .catch(() => message.error('Failed to update setting'));
//   };
//   const handleForcePasswordReset = () => {
//     setIsModalVisible(true); // Show confirmation modal
//   };
//   const confirmForcePasswordReset = () => {
//     request(`/admin/reset-all-passwords`, {
//       method: 'POST'
//     })
//       .then(() => {
//         message.success('All user passwords have been reset');
//         setIsModalVisible(false); // Hide modal on success
//       })
//       .catch(() => message.error('Failed to force password reset'));
//   };
//   return (
//     <PageContainer
//       style={{
//         backgroundColor: '#fff',
//         minHeight: '100vh',
//         padding: '24px',
//       }}
//       title="Security Settings" // Single title for the page
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '60vh',
//         }}
//       >
//         <ProCard title="Password Settings" bordered style={{ width: '100%', maxWidth: '800px' }}>
//           <div style={{ padding: '16px' }}>
//             <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
//             <Collapse defaultActiveKey={['1', '2', '3', '4']} accordion>
//               {/* Password Strength Settings */}
//               <Panel header="Password Strength Settings" key="1">
//                 <Form layout="vertical" size="small">
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <Form.Item
//                         label="Minimum Password Length"
//                         style={{ marginBottom: '16px' }}
//                       >
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.min_length}
//                           onChange={(value) => handlePasswordRulesChange('min_length', value)}
//                           style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item
//                         label="Maximum Password Length"
//                         style={{ marginBottom: '16px' }}
//                       >
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.max_length}
//                           onChange={(value) => handlePasswordRulesChange('max_length', value)}
//                           style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row gutter={16} style={{ marginTop: '16px' }}>
//                     <Col span={12}>
//                       <Form.Item
//                         label="Password Expiry Days"
//                         style={{ marginBottom: '16px' }}
//                       >
//                         <InputNumber
//                           min={1}
//                           value={passwordRules.password_expiry_days}
//                           onChange={(value) => handlePasswordRulesChange('password_expiry_days', value)}
//                           style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item
//                         label="Enforce Password History"
//                         style={{ marginBottom: '16px' }}
//                       >
//                         <InputNumber
//                           min={0}
//                           value={passwordRules.enforce_password_history}
//                           onChange={(value) => handlePasswordRulesChange('enforce_password_history', value)}
//                           style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </Form>
//               </Panel>
//               {/* Password Options Toggles */}
//               <Panel header="Password Options" key="2">
//                 <Form layout="vertical" size="small">
//                   <Row gutter={16}>
//                     {Object.keys(passwordRules)
//                       .filter(key => typeof passwordRules[key] === 'boolean' && !['require_uppercase', 'require_lowercase'].includes(key))
//                       .map((key) => (
//                         <Col span={12} key={key} style={{ marginBottom: '16px' }}>
//                           <Row align="middle">
//                             <Col span={18}>
//                               <Form.Item style={{ margin: 0 }}>
//                                 <span>{formatLabel(key)}</span>
//                               </Form.Item>
//                             </Col>
//                             <Col span={6} style={{ textAlign: 'right' }}>
//                               <Switch
//                                 checked={passwordRules[key]}
//                                 onChange={(checked) => handlePasswordRulesChange(key, checked)}
//                                 style={{ width: '50%' }}
//                               />
//                             </Col>
//                           </Row>
//                         </Col>
//                       ))}
//                   </Row>
//                 </Form>
//               </Panel>
//               {/* Remember Me Option */}
//               <Panel header="Remember Me Option" key="3">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Space>
//                       <div>Allow "Remember Me" Option</div>
//                       <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//                     </Space>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//               {/* Force Password Reset */}
//               <Panel header="Force Password Reset" key="4">
//                 <Form layout="vertical" size="small">
//                   <Form.Item>
//                     <Button type="primary" danger onClick={handleForcePasswordReset}>
//                       Reset All Passwords
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               </Panel>
//             </Collapse>
//           </div>
//         </ProCard>
//       </div>
//       {/* Confirmation Modal for Reset Password */}
//       <Modal
//         title="Confirm Password Reset"
//         visible={isModalVisible}
//         onOk={confirmForcePasswordReset}
//         onCancel={() => setIsModalVisible(false)}
//         okText="Reset Passwords"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to reset all user passwords? This action cannot be undone.</p>
//       </Modal>
//     </PageContainer>
//   );
// };
// // Helper function to format labels for form fields
// const formatLabel = (key: string) => {
//   return key
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (char) => char.toUpperCase())
//     .replace(/Password$/, 'Password');
// };
// export default PasswordSettings;
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var Panel = antd_1.Collapse.Panel;
var PasswordSettings = function () {
    var _a = react_1.useState({
        min_length: 8,
        max_length: 20,
        password_expiry_days: 90,
        enforce_password_history: 5,
        require_uppercase: true,
        require_lowercase: true,
        require_number: true,
        require_special_character: true,
        disallow_repeated_characters: false,
        disallow_spaces: true,
        disallow_common_passwords: true,
        disallow_sequential_characters: true,
        disallow_palindromes: false,
        disallow_username_in_password: true,
        enforce_alphanumeric: true
    }), passwordRules = _a[0], setPasswordRules = _a[1];
    var _b = react_1.useState(true), rememberMe = _b[0], setRememberMe = _b[1];
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1];
    // Fetch current password rules when the component mounts
    react_1.useEffect(function () {
        umi_1.request("/password-rules", {
            method: 'GET'
        })
            .then(function (data) { return setPasswordRules(data); })["catch"](function () { return antd_1.message.error('Failed to fetch password rules'); });
    }, []);
    // Handle API updates
    var handlePasswordRulesChange = function (field, value) {
        var _a;
        setPasswordRules(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        umi_1.request("/password-rules", {
            method: 'POST',
            data: (_a = {}, _a[field] = value, _a)
        })
            .then(function () { return antd_1.message.success('Password setting updated successfully'); })["catch"](function () { return antd_1.message.error('Failed to update setting'); });
    };
    var handleForcePasswordReset = function () {
        setIsModalVisible(true); // Show confirmation modal
    };
    var confirmForcePasswordReset = function () {
        umi_1.request("/admin/reset-all-passwords", {
            method: 'POST'
        })
            .then(function () {
            antd_1.message.success('All user passwords have been reset');
            setIsModalVisible(false); // Hide modal on success
        })["catch"](function () { return antd_1.message.error('Failed to force password reset'); });
    };
    return (react_1["default"].createElement(pro_components_1.PageContainer, { style: {
            backgroundColor: '#fff',
            minHeight: '100vh',
            padding: '24px'
        }, title: "Security Settings" // Single title for the page
     },
        react_1["default"].createElement("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            } },
            react_1["default"].createElement(pro_components_1.ProCard, { title: "Password Settings", bordered: true, style: { width: '100%', maxWidth: '800px' } },
                react_1["default"].createElement("div", { style: { padding: '16px' } },
                    react_1["default"].createElement(Title, { level: 4, style: { marginBottom: '24px' } }, "Password Management"),
                    react_1["default"].createElement(antd_1.Collapse, { defaultActiveKey: ['1', '2', '3', '4'], accordion: true },
                        react_1["default"].createElement(Panel, { header: "Password Strength Settings", key: "1" },
                            react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                                react_1["default"].createElement(antd_1.Row, { gutter: 16 },
                                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                                        react_1["default"].createElement(antd_1.Form.Item, { label: "Minimum Password Length", style: { marginBottom: '16px' } },
                                            react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules.min_length, onChange: function (value) { return handlePasswordRulesChange('min_length', value); }, style: { width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '30px' } }))),
                                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                                        react_1["default"].createElement(antd_1.Form.Item, { label: "Maximum Password Length", style: { marginBottom: '16px' } },
                                            react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules.max_length, onChange: function (value) { return handlePasswordRulesChange('max_length', value); }, style: { width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '30px' } })))),
                                react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginTop: '16px' } },
                                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                                        react_1["default"].createElement(antd_1.Form.Item, { label: "Password Expiry Days", style: { marginBottom: '16px' } },
                                            react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules.password_expiry_days, onChange: function (value) { return handlePasswordRulesChange('password_expiry_days', value); }, style: { width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '30px' } }))),
                                    react_1["default"].createElement(antd_1.Col, { span: 12 },
                                        react_1["default"].createElement(antd_1.Form.Item, { label: "Enforce Password History", style: { marginBottom: '16px' } },
                                            react_1["default"].createElement(antd_1.InputNumber, { min: 0, value: passwordRules.enforce_password_history, onChange: function (value) { return handlePasswordRulesChange('enforce_password_history', value); }, style: { width: '100%', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '30px' } })))))),
                        react_1["default"].createElement(Panel, { header: "Password Options", key: "2" },
                            react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                                react_1["default"].createElement(antd_1.Row, { gutter: 16 }, Object.keys(passwordRules)
                                    .filter(function (key) { return typeof passwordRules[key] === 'boolean' && !['require_uppercase', 'require_lowercase'].includes(key); })
                                    .map(function (key) { return (react_1["default"].createElement(antd_1.Col, { span: 12, key: key, style: { marginBottom: '16px' } },
                                    react_1["default"].createElement(antd_1.Row, { align: "middle" },
                                        react_1["default"].createElement(antd_1.Col, { span: 18 },
                                            react_1["default"].createElement(antd_1.Form.Item, { style: { margin: 0 } },
                                                react_1["default"].createElement("span", null, formatLabel(key)))),
                                        react_1["default"].createElement(antd_1.Col, { span: 6, style: { textAlign: 'right' } },
                                            react_1["default"].createElement(antd_1.Switch, { checked: passwordRules[key], onChange: function (checked) { return handlePasswordRulesChange(key, checked); } }))))); })))),
                        react_1["default"].createElement(Panel, { header: "Remember Me Option", key: "3" },
                            react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                                react_1["default"].createElement(antd_1.Form.Item, null,
                                    react_1["default"].createElement(antd_1.Space, null,
                                        react_1["default"].createElement("div", null, "Allow \"Remember Me\" Option"),
                                        react_1["default"].createElement(antd_1.Switch, { checked: rememberMe, onChange: function (checked) { return setRememberMe(checked); } }))))),
                        react_1["default"].createElement(Panel, { header: "Force Password Reset", key: "4" },
                            react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                                react_1["default"].createElement(antd_1.Form.Item, null,
                                    react_1["default"].createElement(antd_1.Button, { type: "primary", danger: true, onClick: handleForcePasswordReset }, "Reset All Passwords")))))))),
        react_1["default"].createElement(antd_1.Modal, { title: "Confirm Password Reset", visible: isModalVisible, onOk: confirmForcePasswordReset, onCancel: function () { return setIsModalVisible(false); }, okText: "Reset Passwords", cancelText: "Cancel" },
            react_1["default"].createElement("p", null, "Are you sure you want to reset all user passwords? This action cannot be undone."))));
};
// Helper function to format labels for form fields
var formatLabel = function (key) {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, function (char) { return char.toUpperCase(); })
        .replace(/Password$/, 'Password');
};
exports["default"] = PasswordSettings;
