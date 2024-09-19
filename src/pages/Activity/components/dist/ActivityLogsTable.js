"use strict";
// import {
//   ProFormDateRangePicker,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import {
//   Button,
//   Form,
//   message,
//   Pagination,
//   Popconfirm,
//   Spin,
//   Tooltip,
// } from 'antd';
// import { format } from 'date-fns';
// import { useEffect, useState } from 'react';
// import { request } from 'umi';
// import './ActivityLogs.less';
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// interface LogData {
//   key: number;
//   user: string;
//   description: string;
//   module: string;
//   ip_address: string;
//   updated_at: string;
// }
// const ActivityLogs = () => {
//   const [data, setData] = useState<LogData[]>([]);
//   const [selectedRows, setSelectedRows] = useState<LogData[]>([]);
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
//   const [users, setUsers] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await request('/users');
//         const userOptions = response.data.data.map((user) => ({
//           value: user.display_name || user.username,
//           label: user.display_name || user.username,
//         }));
//         setUsers(userOptions);
//       } catch (error) {
//         message.error('Failed to fetch users');
//       }
//     };
//     fetchUsers();
//   }, []);
//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         const response = await request('/modules');
//         const moduleOptions = response.data.map((module) => ({
//           value: module,
//           label: module,
//         }));
//         setModules(moduleOptions);
//       } catch (error) {
//         message.error('Failed to fetch modules');
//       }
//     };
//     fetchModules();
//   }, []);
//   const fetchData = async (page = 1) => {
//     setLoading(true);
//     try {
//       const { start_date, end_date, user, module } = filters;
//       const response = await request('/audits', {
//         params: {
//           page,
//           per_page: pagination.pageSize,
//           start_date: start_date || undefined,
//           end_date: end_date || undefined,
//           user: user || undefined,
//           module: module || undefined,
//         },
//       });
//       if (response.data && response.data.data) {
//         const mappedData = response.data.data.map((log) => ({
//           key: log.id,
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
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits/bulk-delete', {
//         method: 'DELETE',
//         data: {
//           ...filters,
//         },
//       });
//       message.success('Logs deleted successfully based on the filters');
//       fetchData(pagination.current);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };
//   const handleDeleteSelected = async () => {
//     if (selectedRows.length === 0) {
//       message.error('No logs selected for deletion');
//       return;
//     }
//     const selectedIds = selectedRows.map((log) => log.key);
//     try {
//       await request('/audits/bulk-delete-selected', {
//         method: 'DELETE',
//         data: {
//           ids: selectedIds,
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete selected logs');
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
//       render: (text: string) => (
//         <Tooltip title={text} placement="topLeft">
//           <div className="description-cell">{text}</div>
//         </Tooltip>
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
//       render: (text: string) => (
//         <span className="date-cell">
//           {format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}
//         </span>
//       ),
//     },
//   ];
//   const handleFormValuesChange = (changedValues: any, allValues: any) => {
//     const { dateRange } = allValues;
//     let startDate = '';
//     let endDate = '';
//     if (dateRange && dateRange.length === 2) {
//       startDate = format(dateRange[0].toDate(), 'yyyy-MM-dd');
//       endDate = format(dateRange[1].toDate(), 'yyyy-MM-dd');
//       if (new Date(startDate) > new Date(endDate)) {
//         message.error('Start date must be earlier than end date');
//         return;
//       }
//     }
//     const newFilters = {
//       ...filters,
//       user: allValues.user || '',
//       module: allValues.module || '',
//       start_date: startDate,
//       end_date: endDate,
//     };
//     setFilters(newFilters);
//   };
//   return (
//     <>
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onValuesChange={handleFormValuesChange}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[{ value: '', label: 'All Users' }, ...users]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker format="YYYY-MM-DD" />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[{ value: '', label: 'All Modules' }, ...modules]}
//           />
//         </Form.Item>
//       </Form>
//       <div style={{ marginBottom: 16 }}>
//         <Popconfirm
//           title="Are you sure you want to delete logs based on the filters?"
//           onConfirm={handleBulkDelete}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="primary" disabled={pagination.total === 0}>
//             Bulk Delete
//           </Button>
//         </Popconfirm>
//         <Button
//           type="danger"
//           style={{ marginLeft: 8 }}
//           disabled={selectedRows.length === 0}
//           onClick={handleDeleteSelected}
//         >
//           Delete Selected
//         </Button>
//       </div>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <ProTable
//           columns={columns}
//           dataSource={data}
//           search={false}
//           rowKey="key"
//           rowSelection={{
//             type: 'checkbox',
//             onChange: (selectedRowKeys, selectedRows) => {
//               setSelectedRows(selectedRows as LogData[]);
//             },
//           }}
//           pagination={false}
//         />
//       )}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => setPagination({ ...pagination, current: page })}
//         style={{ marginTop: 16 }}
//       />
//     </>
//   );
// };
// export default ActivityLogs;
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var date_fns_1 = require("date-fns");
var react_1 = require("react");
var umi_1 = require("umi");
require("./ActivityLogs.less");
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
    var _e = react_1.useState([]), users = _e[0], setUsers = _e[1];
    var _f = react_1.useState([]), modules = _f[0], setModules = _f[1];
    var _g = react_1.useState(false), loading = _g[0], setLoading = _g[1];
    var form = antd_1.Form.useForm()[0];
    react_1.useEffect(function () {
        var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, userOptions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/users')];
                    case 1:
                        response = _a.sent();
                        userOptions = response.data.data.map(function (user) { return ({
                            value: user.display_name || user.username,
                            label: user.display_name || user.username
                        }); });
                        setUsers(userOptions);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch users');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchUsers();
    }, []);
    react_1.useEffect(function () {
        var fetchModules = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, moduleOptions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/modules')];
                    case 1:
                        response = _a.sent();
                        moduleOptions = response.data.map(function (module) { return ({
                            value: module,
                            label: module
                        }); });
                        setModules(moduleOptions);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        antd_1.message.error('Failed to fetch modules');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchModules();
    }, []);
    var fetchData = function (page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var start_date, end_date, user, module_1, response, mappedData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        start_date = filters.start_date, end_date = filters.end_date, user = filters.user, module_1 = filters.module;
                        return [4 /*yield*/, umi_1.request('/audits', {
                                params: {
                                    page: page,
                                    per_page: pagination.pageSize,
                                    start_date: start_date || undefined,
                                    end_date: end_date || undefined,
                                    user: user || undefined,
                                    module: module_1 || undefined
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.data && response.data.data) {
                            mappedData = response.data.data.map(function (log) { return ({
                                key: log.id,
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
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        antd_1.message.error('Failed to fetch data');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    react_1.useEffect(function () {
        fetchData(pagination.current);
    }, [filters, pagination.current]);
    var handleBulkDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/audits/bulk-delete', {
                            method: 'DELETE',
                            data: __assign({}, filters)
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Logs deleted successfully based on the filters');
                    fetchData(pagination.current);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to delete logs');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteSelected = function () { return __awaiter(void 0, void 0, void 0, function () {
        var selectedIds, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedRows.length === 0) {
                        antd_1.message.error('No logs selected for deletion');
                        return [2 /*return*/];
                    }
                    selectedIds = selectedRows.map(function (log) { return log.key; });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request('/audits/bulk-delete-selected', {
                            method: 'DELETE',
                            data: {
                                ids: selectedIds
                            }
                        })];
                case 2:
                    _a.sent();
                    antd_1.message.success('Selected logs deleted successfully');
                    fetchData(pagination.current);
                    setSelectedRows([]);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    antd_1.message.error('Failed to delete selected logs');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
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
            render: function (text) { return (React.createElement(antd_1.Tooltip, { title: text, placement: "topLeft" },
                React.createElement("div", { className: "description-cell" }, text))); }
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
            render: function (text) { return (React.createElement("span", { className: "date-cell" }, date_fns_1.format(new Date(text), 'yyyy-MM-dd HH:mm:ss'))); }
        },
    ];
    var handleFormValuesChange = function (changedValues, allValues) {
        var dateRange = allValues.dateRange;
        var startDate = '';
        var endDate = '';
        if (dateRange && dateRange.length === 2) {
            startDate = date_fns_1.format(dateRange[0].toDate(), 'yyyy-MM-dd');
            endDate = date_fns_1.format(dateRange[1].toDate(), 'yyyy-MM-dd');
            if (new Date(startDate) > new Date(endDate)) {
                antd_1.message.error('Start date must be earlier than end date');
                return;
            }
        }
        var newFilters = __assign(__assign({}, filters), { user: allValues.user || '', module: allValues.module || '', start_date: startDate, end_date: endDate });
        setFilters(newFilters);
    };
    var buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px'
    };
    var deleteSelectedButtonStyle = {
        marginRight: '16px',
        // backgroundColor: '#ff4d4f',  // Red background color  
        // borderColor: '#ff4d4f',      // Red border color 
        color: '#ff4d4f'
    };
    var clearAllButtonStyle = {
        marginLeft: 'auto',
        // backgroundColor: '#ff4d4f',  // Red background color
        borderColor: '#ff4d4f',
        color: '#ff4d4f'
    };
    // Optionally, you can add styles for hover states
    var buttonHoverStyle = {
        backgroundColor: '#d93025',
        borderColor: '#d93025'
    };
    return (React.createElement("div", { className: "activity-logs-container" },
        React.createElement(antd_1.Form, { form: form, layout: "inline", style: { marginBottom: 16 }, onValuesChange: handleFormValuesChange },
            React.createElement(antd_1.Form.Item, { name: "user", label: "User", style: { width: '30%', marginRight: '16px' } },
                React.createElement(pro_components_1.ProFormSelect, { options: __spreadArrays([{ value: '', label: 'All Users' }], users), fieldProps: {
                        showSearch: true,
                        filterOption: function (input, option) { return option === null || option === void 0 ? void 0 : option.label.toLowerCase().includes(input.toLowerCase()); },
                        // Detect when the search input is cleared
                        onSearch: function (value) {
                            if (value === '') {
                                form.setFieldsValue({ user: '' });
                                setFilters(__assign(__assign({}, filters), { user: '' }));
                                fetchData(); // Re-fetch data with empty user filter
                            }
                        },
                        // Detect when a selection is made from the dropdown
                        onSelect: function (value) {
                            setFilters(__assign(__assign({}, filters), { user: value }));
                            fetchData(); // Re-fetch data with the selected user
                        }
                    } })),
            React.createElement(antd_1.Form.Item, { name: "dateRange", label: "Date Range", style: { width: '30%', marginRight: '16px' } },
                React.createElement(pro_components_1.ProFormDateRangePicker, { fieldProps: {
                        format: "YYYY-MM-DD"
                    } })),
            React.createElement(antd_1.Form.Item, { name: "module", label: "Module", style: { width: '30%' } },
                React.createElement(pro_components_1.ProFormSelect, { options: __spreadArrays([{ value: '', label: 'All Modules' }], modules), fieldProps: {
                        showSearch: true,
                        filterOption: function (input, option) { return option === null || option === void 0 ? void 0 : option.label.toLowerCase().includes(input.toLowerCase()); },
                        onSearch: function (value) {
                            if (value === '') {
                                form.setFieldsValue({ module: '' });
                                setFilters(__assign(__assign({}, filters), { module: '' }));
                                fetchData(); // Re-fetch data with empty module filter
                            }
                        },
                        onSelect: function (value) {
                            setFilters(__assign(__assign({}, filters), { module: value }));
                            fetchData(); // Re-fetch data with the selected module
                        }
                    } }))),
        React.createElement("div", { style: buttonContainerStyle },
            React.createElement(antd_1.Button, { type: "danger", onClick: handleDeleteSelected, style: deleteSelectedButtonStyle }, "Delete Selected"),
            React.createElement(antd_1.Popconfirm, { title: "Are you sure you want to clear all logs based on the filters?", onConfirm: handleBulkDelete, okText: "Yes", cancelText: "No" },
                React.createElement(antd_1.Button, { type: "danger", style: clearAllButtonStyle }, "Clear All"))),
        loading ? (React.createElement(antd_1.Spin, { size: "large" })) : (React.createElement(pro_components_1.ProTable, { columns: columns, dataSource: data, search: false, rowKey: "key", rowSelection: {
                type: 'checkbox',
                onChange: function (selectedRowKeys, selectedRows) {
                    setSelectedRows(selectedRows);
                }
            }, pagination: false })),
        React.createElement(antd_1.Pagination, { current: pagination.current, pageSize: pagination.pageSize, total: pagination.total, onChange: function (page) { return setPagination(__assign(__assign({}, pagination), { current: page })); }, style: { marginTop: 16 } })));
};
exports["default"] = ActivityLogs;
