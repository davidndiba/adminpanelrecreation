"use strict";
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Divider, Card, List, Button, Space, Modal, message } from 'antd'; // Import from antd
// import { CloudUploadOutlined } from '@ant-design/icons';
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
// const { Title, Paragraph } = Typography;
// const DataBackupAndSystemInfo = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = React.useState(false);
//   const handleBackup = () => {
//     // Implement backup initiation logic here
//     setIsBackupModalVisible(false);
//     message.success('Backup process initiated successfully.');
//   };
//   const showBackupModal = () => {
//     setIsBackupModalVisible(true);
//   };
//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <List
//           size="small"
//           bordered
//           dataSource={[
//             'Identify the critical data that needs to be backed up.',
//             'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
//             'Schedule regular backups to ensure data is up-to-date.',
//             'Test your backups periodically to ensure they can be restored successfully.',
//             'Keep backups secure and accessible, with encryption if possible.'
//           ]}
//           renderItem={item => <List.Item>{item}</List.Item>}
//           style={{ marginBottom: '16px' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             icon={<CloudUploadOutlined />}
//             size="large"
//             onClick={showBackupModal}
//           >
//             Start Data Backup
//           </Button>
//         </Space>
//       </ProCard>
//       <Divider />
//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         <Card style={{ marginBottom: '16px' }}>
//           <Title level={4}>Tech Stack</Title>
//           <List
//             size="small"
//             bordered
//             dataSource={[
//               'Frontend: React with Ant Design Pro',
//               'Backend: Node.js with Express',
//               'Database: MongoDB',
//               'Server: Nginx',
//               'Cloud Provider: AWS'
//             ]}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Card>
//         <Card>
//           <Title level={4}>Deployment Details</Title>
//           <List
//             size="small"
//             bordered
//             dataSource={[
//               'Version Control: Git',
//               'CI/CD Pipeline: GitHub Actions',
//               'Monitoring: New Relic',
//               'Logging: Loggly'
//             ]}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Card>
//       </ProCard>
//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the data backup process? This may take some time depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };
// export default DataBackupAndSystemInfo;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Divider, Card, List, Button, Space, Modal, message } from 'antd';
// import { CloudUploadOutlined } from '@ant-design/icons';
// import { request } from 'umi'; // Import request from umi for API calls
// const { Title, Paragraph } = Typography;
// const DataBackupAndSystemInfo = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
//   const [systemInfo, setSystemInfo] = useState<any>(null);
//   // Fetch system information from the endpoint
//   useEffect(() => {
//     const fetchSystemInfo = async () => {
//       try {
//         const response = await request('/system-info');
//         if (response.success === "true") {
//           setSystemInfo(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch system information');
//         }
//       } catch (error) {
//         message.error('Failed to fetch system information');
//         console.error(error);
//       }
//     };
//     fetchSystemInfo();
//   }, []);
//   const handleBackup = () => {
//     // Implement backup initiation logic here
//     setIsBackupModalVisible(false);
//     message.success('Backup process initiated successfully.');
//   };
//   const showBackupModal = () => {
//     setIsBackupModalVisible(true);
//   };
//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <List
//           size="small"
//           bordered
//           dataSource={[
//             'Identify the critical data that needs to be backed up.',
//             'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
//             'Schedule regular backups to ensure data is up-to-date.',
//             'Test your backups periodically to ensure they can be restored successfully.',
//             'Keep backups secure and accessible, with encryption if possible.'
//           ]}
//           renderItem={item => <List.Item>{item}</List.Item>}
//           style={{ marginBottom: '16px' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             icon={<CloudUploadOutlined />}
//             size="large"
//             onClick={showBackupModal}
//           >
//             Start Data Backup
//           </Button>
//         </Space>
//       </ProCard>
//       <Divider />
//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         {systemInfo ? (
//           <>
//             <Card style={{ marginBottom: '16px' }}>
//               <Title level={4}>Tech Stack</Title>
//               <List
//                 size="small"
//                 bordered
//                 dataSource={[
//                   `Document Root Folder: ${systemInfo.document_root_folder}`,
//                   `Laravel Version: ${systemInfo.laravel_version}`,
//                   `PHP Version: ${systemInfo.php_version}`,
//                   `IP Address: ${systemInfo.ip_address}`,
//                   `System Server Host: ${systemInfo.system_server_host}`,
//                   `System Version: ${systemInfo.system_version}`,
//                   `Application Environment: ${systemInfo.application_environment}`,
//                   `Database Type: ${systemInfo.database_type}`,
//                   `Database Version: ${systemInfo.database_version}`
//                 ]}
//                 renderItem={item => <List.Item>{item}</List.Item>}
//               />
//             </Card>
//           </>
//         ) : (
//           <Paragraph>Loading system information...</Paragraph>
//         )}
//       </ProCard>
//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the data backup process? This may take some time depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };
// export default DataBackupAndSystemInfo;
// import { CloudUploadOutlined } from '@ant-design/icons';
// import { ProCard } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Divider,
//   List,
//   Modal,
//   Space,
//   Typography,
//   message,
// } from 'antd';
// import { useEffect, useState } from 'react';
// import { request } from 'umi'; // Import request from umi for API calls
// const { Title, Paragraph } = Typography;
// const DataBackupAndSystemInfo = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
//   const [systemInfo, setSystemInfo] = useState<any>(null);
//   // Fetch system information from the endpoint
//   useEffect(() => {
//     const fetchSystemInfo = async () => {
//       try {
//         const response = await request('/system-info');
//         if (response.success === 'true') {
//           setSystemInfo(response.data);
//         } else {
//           message.error(
//             response.message || 'Failed to fetch system information',
//           );
//         }
//       } catch (error) {
//         message.error('Failed to fetch system information');
//         console.error(error);
//       }
//     };
//     fetchSystemInfo();
//   }, []);
//   const handleBackup = () => {
//     // Implement backup initiation logic here
//     setIsBackupModalVisible(false);
//     message.success('Backup process initiated successfully.');
//   };
//   const showBackupModal = () => {
//     setIsBackupModalVisible(true);
//   };
//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and
//           integrity of your data. Regular backups protect against data loss
//           caused by system failures, accidental deletions, or cyber-attacks.
//           Implementing a robust backup strategy helps in quick recovery and
//           minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <List
//           size="small"
//           bordered
//           dataSource={[
//             'Identify the critical data that needs to be backed up.',
//             'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
//             'Schedule regular backups to ensure data is up-to-date.',
//             'Test your backups periodically to ensure they can be restored successfully.',
//             'Keep backups secure and accessible, with encryption if possible.',
//           ]}
//           renderItem={(item) => (
//             <List.Item
//               style={{
//                 padding: '16px',
//                 border: '1px solid #d9d9d9',
//                 borderRadius: '4px',
//               }}
//             >
//               {item}
//             </List.Item>
//           )}
//           style={{ backgroundColor: '#ffffff' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             icon={<CloudUploadOutlined />}
//             size="large"
//             onClick={showBackupModal}
//           >
//             Start Data Backup
//           </Button>
//         </Space>
//       </ProCard>
//       <Divider />
//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         {systemInfo ? (
//           <>
//             <Card style={{ marginBottom: '16px' }}>
//               <Title level={4}>Tech Stack</Title>
//               <List
//                 size="small"
//                 bordered
//                 dataSource={[
//                   `Document Root Folder: ${systemInfo.document_root_folder}`,
//                   `Laravel Version: ${systemInfo.laravel_version}`,
//                   `PHP Version: ${systemInfo.php_version}`,
//                   `IP Address: ${systemInfo.ip_address}`,
//                   `System Server Host: ${systemInfo.system_server_host}`,
//                   `System Version: ${systemInfo.system_version}`,
//                   `Application Environment: ${systemInfo.application_environment}`,
//                   `Database Type: ${systemInfo.database_type}`,
//                   `Database Version: ${systemInfo.database_version}`,
//                 ]}
//                 renderItem={(item) => (
//                   <List.Item
//                     style={{
//                       padding: '16px',
//                       border: '1px solid #d9d9d9',
//                       borderRadius: '4px',
//                       marginBottom: '8px',
//                       backgroundColor: '#fafafa',
//                     }}
//                   >
//                     {item}
//                   </List.Item>
//                 )}
//                 style={{ backgroundColor: '#ffffff' }}
//               />
//             </Card>
//           </>
//         ) : (
//           <Paragraph>Loading system information...</Paragraph>
//         )}
//       </ProCard>
//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the data backup process? This may take
//           some time depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };
// export default DataBackupAndSystemInfo;
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title, Paragraph = antd_1.Typography.Paragraph;
var Option = antd_1.Select.Option;
var DataBackupAndSystemInfo = function () {
    var _a = react_1.useState(false), isBackupModalVisible = _a[0], setIsBackupModalVisible = _a[1];
    var _b = react_1.useState(false), isScheduleBackupVisible = _b[0], setIsScheduleBackupVisible = _b[1];
    var _c = react_1.useState(null), systemInfo = _c[0], setSystemInfo = _c[1];
    var _d = react_1.useState('weekly'), selectedFrequency = _d[0], setSelectedFrequency = _d[1];
    // Fetch system information from the endpoint
    react_1.useEffect(function () {
        var fetchSystemInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/system-info')];
                    case 1:
                        response = _a.sent();
                        if (response.success === 'true') {
                            setSystemInfo(response.data);
                        }
                        else {
                            antd_1.message.error(response.message || 'Failed to fetch system information');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch system information');
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchSystemInfo();
    }, []);
    var handleManualBackup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/backup/manual', { method: 'POST' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Manual backup initiated successfully.');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to initiate manual backup');
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3:
                    setIsBackupModalVisible(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleScheduleBackup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/backup/schedule', {
                            method: 'POST',
                            data: { frequency: selectedFrequency }
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Scheduled backup initiated successfully.');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to schedule backup');
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3:
                    setIsScheduleBackupVisible(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var showBackupModal = function () {
        setIsBackupModalVisible(true);
    };
    var showScheduleBackupModal = function () {
        setIsScheduleBackupVisible(true);
    };
    return (react_1["default"].createElement("div", { style: { padding: '24px', backgroundColor: '#f0f2f5' } },
        react_1["default"].createElement(pro_components_1.ProCard, { title: "Data Backup", bordered: true },
            react_1["default"].createElement(Title, { level: 3 }, "Why Data Backup is Crucial"),
            react_1["default"].createElement(Paragraph, null, "Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime."),
            react_1["default"].createElement(Title, { level: 4 }, "How to Perform Data Backup"),
            react_1["default"].createElement(antd_1.List, { size: "small", bordered: true, dataSource: [
                    'Identify the critical data that needs to be backed up.',
                    'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
                    'Schedule regular backups to ensure data is up-to-date.',
                    'Test your backups periodically to ensure they can be restored successfully.',
                    'Keep backups secure and accessible, with encryption if possible.',
                ], renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { style: {
                        padding: '16px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px'
                    } }, item)); }, style: { backgroundColor: '#ffffff' } }),
            react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.CloudUploadOutlined, null), size: "large", onClick: showBackupModal }, "Start Manual Backup"),
                react_1["default"].createElement(antd_1.Button, { type: "default", icon: react_1["default"].createElement(icons_1.ClockCircleOutlined, null), size: "large", style: { backgroundColor: '#1890ff', color: '#ffffff' }, onClick: showScheduleBackupModal }, "Schedule Backup"))),
        react_1["default"].createElement(antd_1.Divider, null),
        react_1["default"].createElement(pro_components_1.ProCard, { title: "System Information", bordered: true },
            react_1["default"].createElement(Title, { level: 3 }, "System Overview"),
            systemInfo ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Card, { style: { marginBottom: '16px' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Tech Stack"),
                    react_1["default"].createElement(antd_1.List, { size: "small", bordered: true, dataSource: [
                            "Document Root Folder: " + systemInfo.document_root_folder,
                            "Laravel Version: " + systemInfo.laravel_version,
                            "PHP Version: " + systemInfo.php_version,
                            "IP Address: " + systemInfo.ip_address,
                            "System Server Host: " + systemInfo.system_server_host,
                            "System Version: " + systemInfo.system_version,
                            "Application Environment: " + systemInfo.application_environment,
                            "Database Type: " + systemInfo.database_type,
                            "Database Version: " + systemInfo.database_version,
                        ], renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { style: {
                                padding: '16px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                backgroundColor: '#fafafa'
                            } }, item)); }, style: { backgroundColor: '#ffffff' } })))) : (react_1["default"].createElement(Paragraph, null, "Loading system information..."))),
        react_1["default"].createElement(antd_1.Modal, { title: "Confirm Data Backup", visible: isBackupModalVisible, onOk: handleManualBackup, onCancel: function () { return setIsBackupModalVisible(false); } },
            react_1["default"].createElement(Paragraph, null, "Are you sure you want to start the manual data backup process? This may take some time depending on the size of your data.")),
        react_1["default"].createElement(antd_1.Modal, { title: "Schedule Data Backup", visible: isScheduleBackupVisible, onOk: handleScheduleBackup, onCancel: function () { return setIsScheduleBackupVisible(false); } },
            react_1["default"].createElement(Paragraph, null, "Select the frequency for the scheduled data backup:"),
            react_1["default"].createElement(antd_1.Select, { value: selectedFrequency, style: { width: '100%' }, onChange: function (value) { return setSelectedFrequency(value); } },
                react_1["default"].createElement(Option, { value: "daily" }, "Daily"),
                react_1["default"].createElement(Option, { value: "weekly" }, "Weekly"),
                react_1["default"].createElement(Option, { value: "bi-weekly" }, "Bi-Weekly"),
                react_1["default"].createElement(Option, { value: "monthly" }, "Monthly"),
                react_1["default"].createElement(Option, { value: "quarterly" }, "Quarterly"),
                react_1["default"].createElement(Option, { value: "yearly" }, "Yearly")))));
};
exports["default"] = DataBackupAndSystemInfo;
