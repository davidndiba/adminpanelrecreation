"use strict";
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form } from 'antd';
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
// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [form] = Form.useForm();
//   // Fetch activity logs data with filters
//   const fetchData = async () => {
//     try {
//       const response = await request('/audits', {
//         params: filters,
//       });
//       // Log the response to debug
//       console.log('API response:', response);
//       // Ensure response data is an array
//       if (Array.isArray(response.data)) {
//         setData(response.data);
//       } else {
//         message.error('Invalid data format received');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [filters]);
//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           start_date: filters.start_date,
//           end_date: filters.end_date,
//           name: selectedRows.map(row => row.user).join(','),
//           module: filters.module,
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(); 
//       setSelectedRows([]); 
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };
//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       key: 'action',
//     },
//     {
//       title: 'Timestamp',
//       dataIndex: 'timestamp',
//       key: 'timestamp',
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//   ];
//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//               // Add more user options dynamically if needed
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//               // Add more module options dynamically if needed
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>
//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Bulk Delete
//         </Button>
//       </Popconfirm>
//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="id" 
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//       />
//     </>
//   );
// };
// export default ActivityLogs;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination } from 'antd';
// import { request } from 'umi';
// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();
//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });
//       // Check if response has data and pagination info
//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id, // Ensure unique key for each row
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));
//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };
//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);
//   // Handle single log deletion
//   const handleDelete = async (id) => {
//     try {
//       await request(`/audits/${id}`, {
//         method: 'DELETE',
//       });
//       message.success('Log deleted successfully');
//       fetchData(pagination.current); 
//     } catch (error) {
//       message.error('Failed to delete log');
//     }
//   };
//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           ids: selectedRows.map(row => row.key).join(','),
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };
//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Popconfirm
//           title="Are you sure you want to delete this log?"
//           onConfirm={() => handleDelete(record.key)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="link">Delete</Button>
//         </Popconfirm>
//       ),
//     },
//   ];
//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//               // Add more user options dynamically if needed
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//               // Add more module options dynamically if needed
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>
//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Bulk Delete
//         </Button>
//       </Popconfirm>
//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false} // Disable ProTable's internal pagination
//       />
//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page);
//         }}
//         showSizeChanger
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };
// export default ActivityLogs;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination } from 'antd';
// import { request } from 'umi';
// import './ActivityLogs.less'; // Add this for custom styles
// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();
//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });
//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id,
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));
//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };
//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);
//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           ids: selectedRows.map(row => row.key).join(','),
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };
//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <span className="description-cell">{text}</span>
//       ),
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//     },
//   ];
//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>
//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Delete Selected Logs
//         </Button>
//       </Popconfirm>
//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false}
//       />
//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page);
//         }}
//         showSizeChanger
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };
// export default ActivityLogs;
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var umi_1 = require("umi");
var date_fns_1 = require("date-fns"); // Import date-fns for date formatting
require("./ActivityLogs.less"); // Custom styles
var ActivityLogs = function () {
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var _b = react_1.useState([]), selectedRows = _b[0], setSelectedRows = _b[1];
    var _c = react_1.useState({
        user: '',
        start_date: '',
        end_date: '',
        module: ''
    }), filters = _c[0], setFilters = _c[1];
    var _d = react_1.useState({
        current: 1,
        pageSize: 15,
        total: 0
    }), pagination = _d[0], setPagination = _d[1];
    var form = antd_1.Form.useForm()[0];
    // Fetch activity logs data with filters and pagination
    var fetchData = function (page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var response, mappedData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/audits', {
                                params: __assign(__assign({}, filters), { page: page, per_page: pagination.pageSize })
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.data && response.data.data && Array.isArray(response.data.data)) {
                            mappedData = response.data.data.map(function (log) { return ({
                                key: log.auditable_id,
                                user: log.user,
                                description: log.description,
                                module: log.module,
                                ip_address: log.ip_address,
                                updated_at: log.auditable_record.updated_at
                            }); });
                            setData(mappedData);
                            setPagination(__assign(__assign({}, pagination), { current: page, total: response.data.total }));
                        }
                        else {
                            antd_1.message.error('No data found');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch data');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    react_1.useEffect(function () {
        fetchData(pagination.current);
    }, [filters, pagination.current]);
    // Handle single delete
    // const handleSingleDelete = async (id) => {
    //   try {
    //     await request(`/audits/${id}`, {
    //       method: 'DELETE',
    //     });
    //     message.success('Log deleted successfully');
    //     fetchData(pagination.current);
    //   } catch (error) {
    //     message.error('Failed to delete log');
    //   }
    // };
    // Handle bulk delete
    var handleBulkDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/audits', {
                            method: 'DELETE',
                            params: {
                                ids: selectedRows.map(function (row) { return row.key; }).join(',')
                            }
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Selected logs deleted successfully');
                    fetchData(pagination.current);
                    setSelectedRows([]);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to delete logs');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: function (text) { return (react_1["default"].createElement(antd_1.Tooltip, { title: text, placement: "topLeft" },
                react_1["default"].createElement("div", { className: "description-cell" }, text))); }
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module'
        },
        {
            title: 'IP Address',
            dataIndex: 'ip_address',
            key: 'ip_address'
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: function (text) { return (react_1["default"].createElement("span", { className: "date-cell" }, date_fns_1.format(new Date(text), 'yyyy-MM-dd HH:mm:ss'))); }
        },
    ];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Form, { form: form, layout: "inline", style: { marginBottom: 16 }, onFinish: function (values) {
                var _a, _b, _c, _d;
                setFilters(__assign(__assign({}, values), { start_date: ((_b = (_a = values.dateRange) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.format('YYYY-MM-DD')) || '', end_date: ((_d = (_c = values.dateRange) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.format('YYYY-MM-DD')) || '' }));
            } },
            react_1["default"].createElement(antd_1.Form.Item, { name: "user", label: "User" },
                react_1["default"].createElement(pro_components_1.ProFormSelect, { options: [
                        { value: '', label: 'All Users' },
                    ] })),
            react_1["default"].createElement(antd_1.Form.Item, { name: "dateRange", label: "Date Range" },
                react_1["default"].createElement(pro_components_1.ProFormDateRangePicker, { format: "YYYY-MM-DD" })),
            react_1["default"].createElement(antd_1.Form.Item, { name: "module", label: "Module" },
                react_1["default"].createElement(pro_components_1.ProFormSelect, { options: [
                        { value: '', label: 'All Modules' },
                    ] })),
            react_1["default"].createElement(antd_1.Form.Item, null,
                react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Apply Filters"))),
        react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete selected logs?", onConfirm: handleBulkDelete, okText: "Yes", cancelText: "No" },
            react_1["default"].createElement(antd_1.Button, { type: "primary", style: { marginBottom: 16 }, disabled: selectedRows.length === 0 }, "Delete Selected Logs")),
        react_1["default"].createElement(pro_components_1.ProTable, { columns: columns, dataSource: data, rowKey: "key", rowSelection: {
                onChange: function (selectedRowKeys, selectedRows) { return setSelectedRows(selectedRows); }
            }, pagination: false }),
        react_1["default"].createElement(antd_1.Pagination, { current: pagination.current, pageSize: pagination.pageSize, total: pagination.total, onChange: function (page) {
                setPagination(__assign(__assign({}, pagination), { current: page }));
                fetchData(page);
            }, showSizeChanger: true, pageSizeOptions: [15], hideOnSinglePage: true })));
};
exports["default"] = ActivityLogs;
