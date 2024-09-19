"use strict";
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
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var umi_1 = require("umi");
var pro_components_1 = require("@ant-design/pro-components");
var moment_1 = require("moment");
var Paragraph = antd_1.Typography.Paragraph;
var Option = antd_1.Select.Option;
var SystemBackup = function () {
    var _a = react_1.useState(false), isBackupModalVisible = _a[0], setIsBackupModalVisible = _a[1];
    var _b = react_1.useState(false), isScheduleBackupVisible = _b[0], setIsScheduleBackupVisible = _b[1];
    var _c = react_1.useState('weekly'), selectedFrequency = _c[0], setSelectedFrequency = _c[1];
    var _d = react_1.useState([]), backupHistory = _d[0], setBackupHistory = _d[1];
    // Fetch backup history
    var fetchBackupHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/backup/history', { method: 'GET' })];
                case 1:
                    response = _a.sent();
                    setBackupHistory(response.data || []);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    antd_1.message.error('Failed to fetch backup history');
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchBackupHistory();
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
                    // Re-fetch the backup history after backup is done
                    fetchBackupHistory();
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
    var handleDownloadBackup = function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var response, url, link, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/backup/download/" + fileName, {
                            method: 'GET',
                            responseType: 'blob'
                        })];
                case 1:
                    response = _b.sent();
                    url = window.URL.createObjectURL(new Blob([response]));
                    link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    // Cleanup
                    (_a = link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    antd_1.message.error('Failed to download backup file');
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Schedule backup based on selected frequency
    var handleScheduleBackup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
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
                    antd_1.message.success('Backup scheduled successfully');
                    setIsScheduleBackupVisible(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to schedule backup');
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Delete backup
    var handleDeleteBackup = function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/backups/" + fileName, { method: 'DELETE' })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Backup deleted successfully.');
                    fetchBackupHistory();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to delete backup');
                    console.error(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Table columns with formatted date
    var columns = [
        {
            title: 'Backup Name',
            dataIndex: 'file_name',
            key: 'file_name'
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD HH:mm:ss'); }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, null,
                react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.DownloadOutlined, null), onClick: function () { return handleDownloadBackup(record.file_name); } }, "Download"),
                react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure to delete this backup?", onConfirm: function () { return handleDeleteBackup(record.file_name); }, okText: "Yes", cancelText: "No" },
                    react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.DeleteOutlined, null), danger: true }, "Delete")))); }
        },
    ];
    return (react_1["default"].createElement("div", { style: { padding: '10px', backgroundColor: '#fff' } },
        react_1["default"].createElement(pro_components_1.ProCard, { title: "Data Backup", bordered: true, extra: react_1["default"].createElement(antd_1.Space, null,
                react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.CloudUploadOutlined, null), onClick: function () { return setIsBackupModalVisible(true); } }, "Start Manual Backup"),
                react_1["default"].createElement(antd_1.Button, { type: "default", icon: react_1["default"].createElement(icons_1.ClockCircleOutlined, null), style: { backgroundColor: '#1890ff', color: '#ffffff' }, onClick: function () { return setIsScheduleBackupVisible(true); } }, "Schedule Backup")) },
            react_1["default"].createElement(antd_1.Table, { dataSource: backupHistory, columns: columns, rowKey: "file_name", pagination: false, bordered: true })),
        react_1["default"].createElement(antd_1.Modal, { title: "Confirm Data Backup", visible: isBackupModalVisible, onOk: handleManualBackup, onCancel: function () { return setIsBackupModalVisible(false); } },
            react_1["default"].createElement(Paragraph, null, "Are you sure you want to start the manual data backup process? This may take some time depending on the size of your data.")),
        react_1["default"].createElement(antd_1.Modal, { title: "Schedule Data Backup", visible: isScheduleBackupVisible, onOk: handleScheduleBackup, onCancel: function () { return setIsScheduleBackupVisible(false); } },
            react_1["default"].createElement(Paragraph, null, "Select how often you want to schedule the backup:"),
            react_1["default"].createElement(antd_1.Select, { value: selectedFrequency, onChange: function (value) { return setSelectedFrequency(value); }, style: { width: '100%' } },
                react_1["default"].createElement(Option, { value: "daily" }, "Daily"),
                react_1["default"].createElement(Option, { value: "weekly" }, "Weekly"),
                react_1["default"].createElement(Option, { value: "monthly" }, "Monthly"),
                react_1["default"].createElement(Option, { value: "yearly" }, "Yearly")))));
};
exports["default"] = SystemBackup;
// import React, { useState, useEffect } from 'react';
// import { CloudUploadOutlined, ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
// import { Button, Modal, Space, Typography, Select, message, Table } from 'antd';
// import { request } from 'umi';
// import { ProCard } from '@ant-design/pro-components';
// const { Paragraph } = Typography;
// const { Option } = Select;
// const SystemBackup = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
//   const [isScheduleBackupVisible, setIsScheduleBackupVisible] = useState(false);
//   const [selectedFrequency, setSelectedFrequency] = useState<string>('weekly');
//   const [backupHistory, setBackupHistory] = useState([]);
//   const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
//   // Fetch backup history
//   const fetchBackupHistory = async () => {
//     try {
//       const response = await request('/backup/history', { method: 'GET' });
//       setBackupHistory(response.data || []);
//     } catch (error) {
//       message.error('Failed to fetch backup history');
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchBackupHistory();
//   }, []);
//   const handleManualBackup = async () => {
//     try {
//       await request('/backup/manual', { method: 'POST' });
//       message.success('Manual backup initiated successfully.');
//       // Re-fetch the backup history after backup is done
//       fetchBackupHistory();
//     } catch (error) {
//       message.error('Failed to initiate manual backup');
//       console.error(error);
//     }
//     setIsBackupModalVisible(false);
//   };
//   const handleDownloadBackup = async (fileName: string) => {
//     try {
//       const response = await request(`/backup/download/${fileName}`, {
//         method: 'GET',
//         responseType: 'blob', // This ensures the response is treated as a binary file
//       });
//       // Create a URL for the blob
//       const url = window.URL.createObjectURL(new Blob([response]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName); // Set the downloaded file's name
//       document.body.appendChild(link);
//       link.click();
//       // Cleanup
//       link.parentNode?.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       message.error('Failed to download backup file');
//       console.error(error);
//     }
//   };
//   const columns = [
//     {
//       title: 'Backup Name',
//       dataIndex: 'file_name',
//       key: 'file_name',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'created_at',
//       key: 'created_at',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<DownloadOutlined />}
//             onClick={() => handleDownloadBackup(record.file_name)}
//           >
//             Download
//           </Button>
//         </Space>
//       ),
//     },
//   ];
//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       <ProCard
//         title="Data Backup"
//         bordered
//         extra={
//           <Space>
//             <Button
//               type="primary"
//               icon={<CloudUploadOutlined />}
//               onClick={() => setIsBackupModalVisible(true)}
//             >
//               Start Manual Backup
//             </Button>
//             <Button
//               type="default"
//               icon={<ClockCircleOutlined />}
//               style={{ backgroundColor: '#1890ff', color: '#ffffff' }}
//               onClick={() => setIsScheduleBackupVisible(true)}
//             >
//               Schedule Backup
//             </Button>
//           </Space>
//         }
//       >
//         {/* Backup History Table */}
//         <Table
//           dataSource={backupHistory}
//           columns={columns}
//           rowKey="file_name"
//           pagination={false}
//           bordered
//         />
//       </ProCard>
//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleManualBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the manual data backup process? This may take some time
//           depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };
// export default SystemBackup;
