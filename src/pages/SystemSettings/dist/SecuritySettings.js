"use strict";
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Button, Modal, Form, Input, message, Divider } from 'antd'; // Import from antd
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
// const SecuritySettings = () => {
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [newSettingValue, setNewSettingValue] = React.useState('');
//   const [settingType, setSettingType] = React.useState('');
//   const showModal = (type) => {
//     setSettingType(type);
//     setIsModalVisible(true);
//   };
//   const handleOk = () => {
//     // Implement save settings logic here
//     message.success(`${settingType} updated successfully`);
//     setIsModalVisible(false);
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   return (
//     <ProCard title="" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>Security Settings</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {/* Two-Factor Authentication */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Two-Factor Authentication</div>
//               <Button type="primary" onClick={() => showModal('Two-Factor Authentication')}>Configure</Button>
//             </div>
//           </ProCard>
//           {/* Password Strength Policy */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Password Strength Policy</div>
//               <Button type="primary" onClick={() => showModal('Password Strength Policy')}>Update Policy</Button>
//             </div>
//           </ProCard>
//           {/* Login Attempt Limits */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Login Attempt Limits</div>
//               <Button type="primary" onClick={() => showModal('Login Attempt Limits')}>Set Limits</Button>
//             </div>
//           </ProCard>
//           {/* IP Whitelisting */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>IP Whitelisting</div>
//               <Button type="primary" onClick={() => showModal('IP Whitelisting')}>Manage IPs</Button>
//             </div>
//           </ProCard>
//           {/* Session Timeout */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Session Timeout</div>
//               <Button type="primary" onClick={() => showModal('Session Timeout')}>Configure Timeout</Button>
//             </div>
//           </ProCard>
//         </div>
//       </div>
//       {/* Modal for Changing Settings */}
//       <Modal
//         title={`Configure ${settingType}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label={`New ${settingType}`}>
//             <Input value={newSettingValue} onChange={(e) => setNewSettingValue(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };
// export default SecuritySettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Button, Modal, Form, Input, message, Switch } from 'antd';
// import { request } from 'umi';
// const { Title } = Typography;
// const PasswordSettings = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [settingType, setSettingType] = useState('');
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
//     enforce_alphanumeric: true,
//     password_expiry_days: 90,
//     enforce_password_history: 5
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
//   const showModal = (type: string) => {
//     setSettingType(type);
//     setIsModalVisible(true);
//   };
//   const handleOk = () => {
//     request(`/password-rules`, {
//       method: 'POST',
//       data: passwordRules,
//     })
//       .then(() => {
//         message.success(`${settingType} updated successfully`);
//         setIsModalVisible(false);
//       })
//       .catch(() => message.error('Failed to update settings'));
//   };
//   const handleForcePasswordReset = () => {
//     request(`/admin/reset-all-passwords`, {
//       method: 'POST'
//     })
//       .then(() => message.success('All user passwords have been reset'))
//       .catch(() => message.error('Failed to force password reset'));
//   };
//   const handlePasswordRulesChange = (field: string, value: any) => {
//     setPasswordRules(prev => ({ ...prev, [field]: value }));
//   };
//   return (
//     <ProCard title="Password Settings" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>Password Management</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {/* Password Strength Settings */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Password Strength Settings</div>
//               <Button type="primary" onClick={() => showModal('Password Strength Settings')}>Configure</Button>
//             </div>
//           </ProCard>
//           {/* Remember Me Option */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Allow "Remember Me" Option</div>
//               <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//             </div>
//           </ProCard>
//           {/* Password Options */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Enable Password Options</div>
//               <Button type="primary" onClick={() => showModal('Password Options')}>Update Options</Button>
//             </div>
//           </ProCard>
//           {/* Password Strength */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Password Strength</div>
//               <Button type="primary" onClick={() => showModal('Password Strength')}>Update Strength</Button>
//             </div>
//           </ProCard>
//           {/* Force Password Reset */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Force Password Reset</div>
//               <Button type="primary" onClick={handleForcePasswordReset}>Force Reset</Button>
//             </div>
//           </ProCard>
//         </div>
//       </div>
//       {/* Modal for Changing Settings */}
//       <Modal
//         title={`Configure ${settingType}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Form layout="vertical">
//           {settingType === 'Password Strength Settings' && (
//             <>
//               <Form.Item label="Minimum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.min_length}
//                   onChange={(e) => handlePasswordRulesChange('min_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               <Form.Item label="Maximum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.max_length}
//                   onChange={(e) => handlePasswordRulesChange('max_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Uppercase">
//                 <Switch
//                   checked={passwordRules.require_uppercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_uppercase', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Lowercase">
//                 <Switch
//                   checked={passwordRules.require_lowercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_lowercase', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Number">
//                 <Switch
//                   checked={passwordRules.require_number}
//                   onChange={(checked) => handlePasswordRulesChange('require_number', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Special Character">
//                 <Switch
//                   checked={passwordRules.require_special_character}
//                   onChange={(checked) => handlePasswordRulesChange('require_special_character', checked)}
//                 />
//               </Form.Item>
//               {/* Add more fields as necessary */}
//             </>
//           )}
//           {/* Handle other setting types similarly */}
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };
// export default PasswordSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Button, Modal, Form, Input, message, Switch, Space } from 'antd';
// import { request } from 'umi';
// const { Title } = Typography;
// const PasswordSettings = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [settingType, setSettingType] = useState('');
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
//     // disallow_palindromes: false,
//     disallow_username_in_password: true,
//     // enforce_alphanumeric: true,
//     // password_expiry_days: 90,
//     enforce_password_history: 5
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
//   const showModal = (type: string) => {
//     setSettingType(type);
//     setIsModalVisible(true);
//   };
//   const handleOk = () => {
//     request(`/password-rules`, {
//       method: 'POST',
//       data: passwordRules,
//     })
//       .then(() => {
//         message.success(`${settingType} updated successfully`);
//         setIsModalVisible(false);
//       })
//       .catch(() => message.error('Failed to update settings'));
//   };
//   const handleForcePasswordReset = () => {
//     request(`/admin/reset-all-passwords`, {
//       method: 'POST'
//     })
//       .then(() => message.success('All user passwords have been reset'))
//       .catch(() => message.error('Failed to force password reset'));
//   };
//   const handlePasswordRulesChange = (field: string, value: any) => {
//     setPasswordRules(prev => ({ ...prev, [field]: value }));
//   };
//   return (
//     <ProCard title="Password Settings" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
//         <Space direction="vertical" size="large" style={{ width: '100%' }}>
//           {/* Password Strength Settings */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Password Strength Settings</div>
//               <Button type="primary" onClick={() => showModal('Password Strength Settings')}>Configure</Button>
//             </div>
//           </ProCard>
//           {/* Remember Me Option */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Allow "Remember Me" Option</div>
//               <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//             </div>
//           </ProCard>
//           {/* Password Options */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Enable Password Options</div>
//               <Button type="primary" onClick={() => showModal('Password Options')}>Update Options</Button>
//             </div>
//           </ProCard>
//           {/* Force Password Reset */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Force Password Reset</div>
//               <Button type="primary" onClick={handleForcePasswordReset}>Force Reset</Button>
//             </div>
//           </ProCard>
//         </Space>
//       </div>
//       {/* Modal for Changing Settings */}
//       <Modal
//         title={`Configure ${settingType}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText="Save"
//         cancelText="Cancel"
//       >
//         <Form layout="vertical">
//           {settingType === 'Password Strength Settings' && (
//             <>
//               <Form.Item label="Minimum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.min_length}
//                   onChange={(e) => handlePasswordRulesChange('min_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               <Form.Item label="Maximum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.max_length}
//                   onChange={(e) => handlePasswordRulesChange('max_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Uppercase">
//                 <Switch
//                   checked={passwordRules.require_uppercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_uppercase', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Lowercase">
//                 <Switch
//                   checked={passwordRules.require_lowercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_lowercase', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Number">
//                 <Switch
//                   checked={passwordRules.require_number}
//                   onChange={(checked) => handlePasswordRulesChange('require_number', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Require Special Character">
//                 <Switch
//                   checked={passwordRules.require_special_character}
//                   onChange={(checked) => handlePasswordRulesChange('require_special_character', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Disallow Repeated Characters">
//                 <Switch
//                   checked={passwordRules.disallow_repeated_characters}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_repeated_characters', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Disallow Spaces">
//                 <Switch
//                   checked={passwordRules.disallow_spaces}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_spaces', checked)}
//                 />
//               </Form.Item>
//               <Form.Item label="Disallow Common Passwords">
//                 <Switch
//                   checked={passwordRules.disallow_common_passwords}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_common_passwords', checked)}
//                 />
//               </Form.Item>
//               {/* <Form.Item label="Disallow Sequential Characters">
//                 <Switch
//                   checked={passwordRules.disallow_sequential_characters}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_sequential_characters', checked)}
//                 /> */}
//               {/* </Form.Item> */}
//               {/* <Form.Item label="Disallow Palindromes">
//                 <Switch
//                   checked={passwordRules.disallow_palindromes}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_palindromes', checked)}
//                 />
//               </Form.Item> */}
//               <Form.Item label="Disallow Username in Password">
//                 <Switch
//                   checked={passwordRules.disallow_username_in_password}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_username_in_password', checked)}
//                 />
//               </Form.Item>
//               {/* <Form.Item label="Enforce Alphanumeric">
//                 <Switch
//                   checked={passwordRules.enforce_alphanumeric}
//                   onChange={(checked) => handlePasswordRulesChange('enforce_alphanumeric', checked)}
//                 />
//               </Form.Item> */}
//               {/* <Form.Item label="Password Expiry Days">
//                 <Input
//                   type="number"
//                   value={passwordRules.password_expiry_days}
//                   onChange={(e) => handlePasswordRulesChange('password_expiry_days', Number(e.target.value))}
//                 />
//               </Form.Item> */}
//               <Form.Item label="Enforce Password History">
//                 <Input
//                   type="number"
//                   value={passwordRules.enforce_password_history}
//                   onChange={(e) => handlePasswordRulesChange('enforce_password_history', Number(e.target.value))}
//                 />
//               </Form.Item>
//             </>
//           )}
//           {settingType === 'Password Options' && (
//             <>
//               <Form.Item label="Minimum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.min_length}
//                   onChange={(e) => handlePasswordRulesChange('min_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               <Form.Item label="Maximum Length">
//                 <Input
//                   type="number"
//                   value={passwordRules.max_length}
//                   onChange={(e) => handlePasswordRulesChange('max_length', Number(e.target.value))}
//                 />
//               </Form.Item>
//               {/* Add additional password options fields here */}
//             </>
//           )}
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };
// export default PasswordSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Switch, message, Space, Form, InputNumber } from 'antd';
// import { request } from 'umi';
// const { Title } = Typography;
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
//     <ProCard title="Password Settings" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
//         <Space direction="vertical" size="large" style={{ width: '100%' }}>
//           {/* Password Strength Settings */}
//           <ProCard bordered>
//             <Space direction="vertical" style={{ width: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span>Minimum Password Length</span>
//                 <InputNumber
//                   min={1}
//                   value={passwordRules.min_length}
//                   onChange={(value) => handlePasswordRulesChange('min_length', value)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span>Maximum Password Length</span>
//                 <InputNumber
//                   min={1}
//                   value={passwordRules.max_length}
//                   onChange={(value) => handlePasswordRulesChange('max_length', value)}
//                 />
//               </div>
//             </Space>
//           </ProCard>
//           {/* Remember Me Option */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Allow "Remember Me" Option</div>
//               <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
//             </div>
//           </ProCard>
//           {/* Password Options Toggles */}
//           <ProCard bordered>
//             <Space direction="vertical" style={{ width: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Require Uppercase</span>
//                 <Switch
//                   checked={passwordRules.require_uppercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_uppercase', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Require Lowercase</span>
//                 <Switch
//                   checked={passwordRules.require_lowercase}
//                   onChange={(checked) => handlePasswordRulesChange('require_lowercase', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Require Numbers</span>
//                 <Switch
//                   checked={passwordRules.require_number}
//                   onChange={(checked) => handlePasswordRulesChange('require_number', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Require Special Characters</span>
//                 <Switch
//                   checked={passwordRules.require_special_character}
//                   onChange={(checked) => handlePasswordRulesChange('require_special_character', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Disallow Repeated Characters</span>
//                 <Switch
//                   checked={passwordRules.disallow_repeated_characters}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_repeated_characters', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Disallow Spaces</span>
//                 <Switch
//                   checked={passwordRules.disallow_spaces}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_spaces', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Disallow Common Passwords</span>
//                 <Switch
//                   checked={passwordRules.disallow_common_passwords}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_common_passwords', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Disallow Username in Password</span>
//                 <Switch
//                   checked={passwordRules.disallow_username_in_password}
//                   onChange={(checked) => handlePasswordRulesChange('disallow_username_in_password', checked)}
//                 />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span>Enforce Password History</span>
//                 <InputNumber
//                   min={1}
//                   value={passwordRules.enforce_password_history}
//                   onChange={(value) => handlePasswordRulesChange('enforce_password_history', value)}
//                 />
//               </div>
//             </Space>
//           </ProCard>
//           {/* Force Password Reset */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Force Password Reset</div>
//               <Switch onClick={handleForcePasswordReset} />
//             </div>
//           </ProCard>
//         </Space>
//       </div>
//     </ProCard>
//   );
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
        require_uppercase: true,
        require_lowercase: true,
        require_number: true,
        require_special_character: true,
        disallow_repeated_characters: false,
        disallow_spaces: true,
        disallow_common_passwords: true,
        disallow_sequential_characters: true,
        disallow_username_in_password: true,
        enforce_password_history: 5
    }), passwordRules = _a[0], setPasswordRules = _a[1];
    var _b = react_1.useState(true), rememberMe = _b[0], setRememberMe = _b[1];
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
        umi_1.request("/admin/reset-all-passwords", {
            method: 'POST'
        })
            .then(function () { return antd_1.message.success('All user passwords have been reset'); })["catch"](function () { return antd_1.message.error('Failed to force password reset'); });
    };
    return (react_1["default"].createElement("div", { style: { position: 'absolute', top: '20px', left: '20px', width: '100%', maxWidth: '800px' } },
        react_1["default"].createElement(pro_components_1.ProCard, { title: "Password Settings", bordered: true },
            react_1["default"].createElement("div", { style: { padding: '16px' } },
                react_1["default"].createElement(Title, { level: 4, style: { marginBottom: '24px' } }, "Password Management"),
                react_1["default"].createElement(antd_1.Collapse, { defaultActiveKey: ['1', '2', '3'], accordion: true },
                    react_1["default"].createElement(Panel, { header: "Password Strength Settings", key: "1" },
                        react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                            react_1["default"].createElement(antd_1.Row, { gutter: 16 },
                                react_1["default"].createElement(antd_1.Col, { span: 12 },
                                    react_1["default"].createElement(antd_1.Form.Item, { label: "Minimum Password Length" },
                                        react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules.min_length, onChange: function (value) { return handlePasswordRulesChange('min_length', value); }, style: { width: '100%' } }))),
                                react_1["default"].createElement(antd_1.Col, { span: 12 },
                                    react_1["default"].createElement(antd_1.Form.Item, { label: "Maximum Password Length" },
                                        react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules.max_length, onChange: function (value) { return handlePasswordRulesChange('max_length', value); }, style: { width: '100%' } })))))),
                    react_1["default"].createElement(Panel, { header: "Password Options", key: "2" },
                        react_1["default"].createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '16px' } }, Object.keys(passwordRules).map(function (key) {
                            if (typeof passwordRules[key] === 'boolean') {
                                return (react_1["default"].createElement("div", { key: key, style: { flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '8px' } },
                                    react_1["default"].createElement("span", { style: { flex: '1' } }, formatLabel(key)),
                                    react_1["default"].createElement(antd_1.Switch, { checked: passwordRules[key], onChange: function (checked) { return handlePasswordRulesChange(key, checked); } })));
                            }
                            if (typeof passwordRules[key] === 'number') {
                                return (react_1["default"].createElement("div", { key: key, style: { flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px' } },
                                    react_1["default"].createElement(antd_1.Form.Item, { label: formatLabel(key), style: { margin: 0 } },
                                        react_1["default"].createElement(antd_1.InputNumber, { min: 1, value: passwordRules[key], onChange: function (value) { return handlePasswordRulesChange(key, value); }, style: { width: '100%' } }))));
                            }
                            return null;
                        }))),
                    react_1["default"].createElement(Panel, { header: "Remember Me Option", key: "3" },
                        react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                            react_1["default"].createElement(antd_1.Form.Item, null,
                                react_1["default"].createElement(antd_1.Space, null,
                                    react_1["default"].createElement("div", null, "Allow \"Remember Me\" Option"),
                                    react_1["default"].createElement(antd_1.Switch, { checked: rememberMe, onChange: function (checked) { return setRememberMe(checked); } }))))),
                    react_1["default"].createElement(Panel, { header: "Force Password Reset", key: "4" },
                        react_1["default"].createElement(antd_1.Form, { layout: "vertical", size: "small" },
                            react_1["default"].createElement(antd_1.Form.Item, null,
                                react_1["default"].createElement(antd_1.Button, { type: "primary", danger: true, onClick: handleForcePasswordReset }, "Reset All Passwords")))))))));
};
// Helper function to format labels for form fields
var formatLabel = function (key) {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, function (char) { return char.toUpperCase(); })
        .replace(/Password$/, 'Password');
};
exports["default"] = PasswordSettings;
