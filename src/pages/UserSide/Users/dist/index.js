"use strict";
// import {
//     ActionType,
//     ModalForm,
//     ProColumns,
//     ProFormSelect,
//     ProFormText,
//     ProTable,
//   } from '@ant-design/pro-components';
//   import {
//     Button,
//     Card,
//     Col,
//     Divider,
//     Input,
//     message,
//     Row,
//     Space,
//     Typography,
//     Statistic,
//   } from 'antd';
//   import { UserOutlined, TeamOutlined, LoginOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
//   import moment from 'moment';
//   import React, { useRef, useState, useEffect } from 'react';
//   import { history, request, useRequest } from 'umi';
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
//   const { Title } = Typography;
//   interface User {
//     id: string;
//     display_name: string;
//     email: string;
//     ip_address: string;
//     status: { name: string };
//     roles: string[];
//     last_login: string;
//     login_count: number;
//     created_at: string;
//   }
//   const Users: React.FC = () => {
//     const addUserRef = useRef<any>();
//     const tableActionRef = useRef<ActionType>();
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [totalUsers, setTotalUsers] = useState<number>(0);
//     const [activeUsers, setActiveUsers] = useState<number>(0);
//     const [inactiveUsers, setInactiveUsers] = useState<number>(0);
//     const [totalLogins, setTotalLogins] = useState<number>(0);
//     const [visible, setVisible] = useState<boolean>(false); // Corrected visible state
//     const [formValues, setFormValues] = useState<User | undefined>(undefined); // Corrected formValues state
//     const { data: statuses } = useRequest(() => request('/statuses'));  
//       // [visible, setVisible] = useState<boolean>(false), // Corrected visible state
//       // [formValues, setFormValues] = useState<User | undefined>(undefined); // Corrected formValues state
//       useEffect(() => {
//         const fetchStats = async () => {
//           try {
//             // Fetch data from the /users endpoint
//             const response = await request('/users');
//             if (response?.success) {
//               const statistics = response.data?.statistics;
//               // Set statistics using the response data
//               setTotalUsers(statistics?.total_users ?? 0);
//               setActiveUsers(statistics?.user_counts_by_status?.Active ?? 0);
//               setInactiveUsers(
//                 (statistics?.user_counts_by_status?.Deactivated ?? 0) + 
//                 (statistics?.user_counts_by_status?.Deleted ?? 0)
//               );
//               setTotalLogins(response.data?.data?.reduce((acc, user) => acc + (user.login_count || 0), 0));
//             } else {
//               message.error('Failed to retrieve users statistics.');
//             }
//           } catch (error) {
//             message.error('Failed to fetch statistics');
//           }
//         };
//         fetchStats();
//       }, []);
//     const handleRowSelection = (selectedKeys: React.Key[]) => {
//       setSelectedRowKeys(selectedKeys);
//     };
//     const handleSearch = () => {
//       // Trigger table reload on search
//       tableActionRef.current?.reload();
//     };
//     const handleEdit = async (user: User) => {
//       // Fetch the user data if necessary
//       const response = await request(`/users/${user.id}`);
//       const userData = response?.data;
//       // Set the form values
//       // addUserRef.current?.setFieldsValue(userData);
//       addUserRef.current?.setFieldsValue({
//         ...user,
//         status: { key: user.status }, // Adjust if your statuses use different format
//       });
//       // Open the modal form
//       // addUserRef.current?.open();
//       setFormValues(user);
//       setVisible(true);
//     };
//     const columns: ProColumns<User>[] = [
//       {
//         title: 'Display Name',
//         dataIndex: 'display_name',
//         key: 'display_name',
//         render: (text, record) => (
//           <a
//             href={`/users/${record.id}`}
//             style={{
//               color: '#1890ff', // Blue color to indicate link
//               textDecoration: 'none', // Remove underline
//               cursor: 'pointer', // Pointer cursor on hover
//             }}
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default anchor behavior
//               history.push(`/users/${record.id}`); // Use history for navigation
//             }}
//           >
//             {text}
//           </a>
//         ),
//       },
//       { title: 'Email', dataIndex: 'email', key: 'email' },
//       { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
//       {
//         title: 'Status',
//         dataIndex: ['status', 'name'],
//         key: 'status',
//       },
//       {
//         title: 'Role',
//         dataIndex: 'roles',
//         key: 'roles',
//         render: (r: any) => r?.join(', '),
//       },
//       {
//         title: 'Last Login',
//         dataIndex: 'last_login',
//         key: 'last_login',
//         // render: (text: any) => moment(text).format('ll'),
//         render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
//       },
//       { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
//       {
//         title: 'Created At',
//         dataIndex: 'created_at',
//         key: 'created_at',
//         render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
//       },
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//               type="link"
//             >
//               Edit
//             </Button>
//           </Space>
//         ),
//       },
//     ];
//     return (
//       <div style={{ padding: '24px', backgroundColor: '#fff' }}>
//         <Row gutter={16} style={{ marginBottom: '16px' }}>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
//               <Title level={4}>Total Users</Title>
//               <Statistic
//                 title="Total Users"
//                 value={totalUsers}
//                 prefix={<UserOutlined style={{ color: '#1890ff', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
//               <Title level={4}>Active Users</Title>
//               <Statistic
//                 title="Active Users"
//                 value={activeUsers}
//                 prefix={<TeamOutlined style={{ color: '#52c41a', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
//               <Title level={4}>Inactive Users</Title>
//               <Statistic
//                 title="Inactive Users"
//                 value={inactiveUsers}
//                 prefix={<UserOutlined style={{ color: '#fa8c16', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered style={{ backgroundColor: '#fffbe6', color: '#faad14' }}>
//               <Title level={4}>Total Logins</Title>
//               <Statistic
//                 title="Total Logins"
//                 value={totalLogins}
//                 prefix={<LoginOutlined style={{ color: '#faad14', fontSize: '24px' }} />}
//               />
//             </Card>
//           </Col>
//         </Row>
//         {/* Search field above the table */}
//         <Row gutter={16} style={{ marginBottom: '16px' }}>
//           <Col span={24}>
//             <Input
//               placeholder="Search Users"
//               value={searchTerm}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSearchTerm(value);
//                 // If input is cleared, reload the table
//                 if (value === '') {
//                   handleSearch();
//                 }
//               }}
//               onPressEnter={handleSearch} // Trigger search on Enter
//               style={{ width: 200, marginBottom: '16px' }} // Make search field smaller
//               allowClear // Add a clear button
//             />
//           </Col>
//         </Row>
// <div
//         style={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           marginBottom: '16px',
//         }}
//       >
//         <ModalForm
//           formRef={addUserRef}
//           title={formValues ? 'Edit User' : 'Add New User'}
//           visible={visible}
//           onVisibleChange={setVisible} // Control modal visibility
//           onFinish={async (values) => {
//             try {
//               if (formValues?.id) {
//                 // Update existing user
//                 await request(`/users/${formValues.id}`, {
//                   method: 'PUT',
//                   data: values,
//                 });
//                 message.success('User updated successfully');
//               } else {
//                 // Create new user
//                 await request('/auth/admin/register', {
//                   method: 'POST',
//                   data: values,
//                 });
//                 message.success('User added successfully');
//               }
//               addUserRef.current?.resetFields();
//               setVisible(false); // Close the modal
//               tableActionRef.current?.reload(); // Refresh the table data
//             } catch (error) {
//               message.error('Failed to save user');
//             }
//           }}
//           initialValues={formValues} // Set initial form values
//           trigger={
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               style={{
//                 backgroundColor: '#6c5ce7',
//                 color: '#ffffff',
//                 borderColor: '#6c5ce7',
//               }}
//               onClick={() => {
//                 setFormValues(undefined); // Reset form values
//                 setVisible(true); // Show the modal for new user
//               }}
//             >
//               Add New User
//             </Button>
//           }
//         >
//           <ProFormText
//             label="Display Name"
//             name="display_name"
//             rules={[{ required: true }]}
//           />
//           <ProFormText
//             label="Email"
//             name="email"
//             rules={[
//               { required: true },
//               { type: 'email', message: 'Invalid email address' },
//             ]}
//           />
//           <ProFormText label="Phone Number" name="phone" />
//           <ProFormText
//             label="Username"
//             name="username"
//             rules={[{ required: true }]}
//           />
//           <ProFormSelect
//             label="Status"
//             name={['status', 'name']}
//             options={statuses?.map((status) => ({ label: status.name, value: status.name })) || []}
//             rules={[{ required: true }]}
//           />
//           <ProFormSelect
//             request={async () => {
//               const resp = await request('/roles');
//               return resp?.data ?? [];
//             }}
//             fieldProps={{
//               fieldNames: {
//                 label: 'name',
//                 value: 'id',
//               },
//             }}
//             label="Role"
//             name="role"
//             rules={[{ required: true }]}
//           />
//         </ModalForm>
//       </div>
//         <ProTable<User>
//           columns={columns}
//           actionRef={tableActionRef}
//           rowKey="id"
//           rowSelection={{ selectedRowKeys, onChange: handleRowSelection }}
//           pagination={{
//             defaultCurrent: 1,
//             defaultPageSize: 10,
//             showSizeChanger: true,
//             pageSizeOptions: ['10', '20', '50', '100'],
//             hideOnSinglePage: true,
//           }}
//           search={false}
//           request={async (params) => {
//             // Include search term as a query parameter
//             const resp = await request('/users', {
//               params: {
//                 ...params,
//                 search: searchTerm, // Pass search term
//               },
//             });
//             return {
//               data: resp?.data?.data,
//               total: resp?.data?.total,
//               success: true,
//             };
//           }}
//           components={{
//             header: {
//               cell: (props) => (
//                 <th
//                   {...props}
//                   style={{
//                     borderBottom: '2px solid #d9d9d9', // Customize the column line color
//                   }}
//                 />
//               ),
//             },
//             body: {
//               cell: (props) => (
//                 <td
//                   {...props}
//                   style={{
//                     borderBottom: '1px solid #d9d9d9', // Customize the row line color
//                   }}
//                 />
//               ),
//             },
//           }}
//           footer={() => (
//             <Space split={<Divider type="vertical" />}>
//               {statuses?.map((status: any) => (
//                 <Button
//                   size="small"
//                   key={status.id}
//                   onClick={async () => {
//                     selectedRowKeys?.forEach(async (id) => {
//                       await request(`/users/${id}`, {
//                         method: 'PUT',
//                         data: { status: status.id },
//                       });
//                       tableActionRef?.current?.reload?.();
//                       message.success(`User status updated to ${status.name}`);
//                     });
//                   }}
//                   disabled={selectedRowKeys.length === 0}
//                 >
//                   {status.name}
//                 </Button>
//               ))}
//             </Space>
//           )}
//           onRow={() => ({
//           })} 
//           rowSelection={{
//             selectedRowKeys,
//             onChange: handleRowSelection,
//           }}
//         />
//       </div>
//     );
//   };
//   export default Users;
// // import React from 'react';
// // import {  Table, Button } from 'antd';
// // import { PageHeader } from '@ant-design/pro-components';
// // const Users: React.FC = () => {
// //   const columns = [
// //     {
// //       title: 'Name',
// //       dataIndex: 'name',
// //       key: 'name',
// //     },
// //     {
// //       title: 'Email',
// //       dataIndex: 'email',
// //       key: 'email',
// //     },
// //     {
// //       title: 'Role',
// //       dataIndex: 'role',
// //       key: 'role',
// //     },
// //     {
// //       title: 'Action',
// //       key: 'action',
// //       render: () => (
// //         <Button type="link">Edit</Button>
// //       ),
// //     },
// //   ];
// //   const data = [
// //     {
// //       key: '1',
// //       name: 'John Brown',
// //       email: 'john.brown@example.com',
// //       role: 'Admin',
// //     },
// //     // more data here
// //   ];
// //   return (
// //     <div>
// //       <PageHeader title="Users" subTitle="Manage user accounts" />
// //       <Table columns={columns} dataSource={data} />
// //     </div>
// //   );
// // };
// // export default Users;
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var moment_1 = require("moment");
var react_1 = require("react");
var umi_1 = require("umi");
require("./Users.less"); // Assuming a custom CSS file for additional styling
var Title = antd_1.Typography.Title, Text = antd_1.Typography.Text;
var Users = function () {
    var addUserRef = react_1.useRef();
    var tableActionRef = react_1.useRef();
    var _a = react_1.useState([]), selectedRowKeys = _a[0], setSelectedRowKeys = _a[1];
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = react_1.useState(0), totalUsers = _c[0], setTotalUsers = _c[1];
    var _d = react_1.useState(0), activeUsers = _d[0], setActiveUsers = _d[1];
    var _e = react_1.useState(0), inactiveUsers = _e[0], setInactiveUsers = _e[1];
    var _f = react_1.useState(0), totalLogins = _f[0], setTotalLogins = _f[1];
    var _g = react_1.useState(false), visible = _g[0], setVisible = _g[1];
    var _h = react_1.useState(undefined), formValues = _h[0], setFormValues = _h[1];
    var statuses = umi_1.useRequest(function () { return umi_1.request('/statuses'); }).data;
    react_1.useEffect(function () {
        var fetchStats = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, statistics, error_1;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/users')];
                    case 1:
                        response = _l.sent();
                        if (response === null || response === void 0 ? void 0 : response.success) {
                            statistics = (_a = response.data) === null || _a === void 0 ? void 0 : _a.statistics;
                            setTotalUsers((_b = statistics === null || statistics === void 0 ? void 0 : statistics.total_users) !== null && _b !== void 0 ? _b : 0);
                            setActiveUsers((_d = (_c = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _c === void 0 ? void 0 : _c.Active) !== null && _d !== void 0 ? _d : 0);
                            setInactiveUsers(((_f = (_e = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _e === void 0 ? void 0 : _e.Deactivated) !== null && _f !== void 0 ? _f : 0) +
                                ((_h = (_g = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _g === void 0 ? void 0 : _g.Deleted) !== null && _h !== void 0 ? _h : 0));
                            setTotalLogins((_k = (_j = response.data) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.reduce(function (acc, user) { return acc + (user.login_count || 0); }, 0));
                        }
                        else {
                            antd_1.message.error('Failed to retrieve users statistics.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _l.sent();
                        antd_1.message.error('Failed to fetch statistics');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchStats();
    }, []);
    var handleRowSelection = function (selectedKeys) {
        setSelectedRowKeys(selectedKeys);
    };
    var handleSearch = function () {
        var _a;
        (_a = tableActionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
    };
    var handleEdit = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var response, userData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, umi_1.request("/users/" + user.id)];
                case 1:
                    response = _b.sent();
                    userData = response === null || response === void 0 ? void 0 : response.data;
                    (_a = addUserRef.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(__assign(__assign({}, user), { status: { key: user.status.name } }));
                    setFormValues(user);
                    setVisible(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request("/users/" + userId, { method: 'DELETE' })];
                case 1:
                    _b.sent();
                    antd_1.message.success('User deleted successfully');
                    (_a = tableActionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    antd_1.message.error('Failed to delete user');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            sorter: true,
            render: function (_, record) { return (react_1["default"].createElement(Text, { strong: true }, record.username)); }
        },
        {
            title: 'Full Names',
            dataIndex: 'full_name',
            key: 'full_name'
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: function (_, record) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", null,
                    "Email: ",
                    record.email),
                react_1["default"].createElement("div", null,
                    "Phone: ",
                    record.contact))); }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: function (role) { return react_1["default"].createElement(antd_1.Tag, { color: "blue" }, role); }
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'last_login',
            sorter: true,
            render: function (text) { return moment_1["default"](text).format('DD-MMM-YYYY HH:mm'); }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Tooltip, { title: "Edit" },
                    react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () { return handleEdit(record); }, type: "link", className: "edit-btn" })),
                react_1["default"].createElement(antd_1.Tooltip, { title: "Delete" },
                    react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete this user?", onConfirm: function () { return handleDelete(record.id); }, okText: "Yes", cancelText: "No" },
                        react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.DeleteOutlined, null), type: "link", danger: true, className: "delete-btn" }))))); }
        },
    ];
    return (react_1["default"].createElement("div", { className: "user-page" },
        react_1["default"].createElement(antd_1.Row, { gutter: [16, 16], className: "user-stats" },
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#e6f7ff' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Total Users"),
                    react_1["default"].createElement(antd_1.Statistic, { value: totalUsers, prefix: react_1["default"].createElement(icons_1.UserOutlined, { style: { color: '#1890ff' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#f6ffed' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Active Users"),
                    react_1["default"].createElement(antd_1.Statistic, { value: activeUsers, prefix: react_1["default"].createElement(icons_1.TeamOutlined, { style: { color: '#52c41a' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fff7e6' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Inactive Users"),
                    react_1["default"].createElement(antd_1.Statistic, { value: inactiveUsers, prefix: react_1["default"].createElement(icons_1.UserOutlined, { style: { color: '#fa8c16' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fffbe6' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Total Logins"),
                    react_1["default"].createElement(antd_1.Statistic, { value: totalLogins, prefix: react_1["default"].createElement(icons_1.LoginOutlined, { style: { color: '#faad14' } }) })))),
        react_1["default"].createElement(antd_1.Row, { gutter: [16, 16], className: "search-bar" },
            react_1["default"].createElement(antd_1.Col, { span: 24 },
                react_1["default"].createElement(antd_1.Input.Search, { placeholder: "Search Users", value: searchTerm, onChange: function (e) {
                        setSearchTerm(e.target.value);
                        if (e.target.value === '')
                            handleSearch();
                    }, onSearch: handleSearch, style: { width: 300, marginBottom: '16px' }, allowClear: true }))),
        react_1["default"].createElement("div", { className: "user-actions" },
            react_1["default"].createElement(pro_components_1.ModalForm, { formRef: addUserRef, title: formValues ? 'Edit User' : 'Add New User', visible: visible, onVisibleChange: setVisible, onFinish: function (values) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_3;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 5, , 6]);
                                if (!(formValues === null || formValues === void 0 ? void 0 : formValues.id)) return [3 /*break*/, 2];
                                return [4 /*yield*/, umi_1.request("/users/" + formValues.id, {
                                        method: 'PUT',
                                        data: values
                                    })];
                            case 1:
                                _c.sent();
                                antd_1.message.success('User updated successfully');
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, umi_1.request('/auth/admin/register', {
                                    method: 'POST',
                                    data: values
                                })];
                            case 3:
                                _c.sent();
                                antd_1.message.success('User added successfully');
                                _c.label = 4;
                            case 4:
                                (_a = addUserRef.current) === null || _a === void 0 ? void 0 : _a.resetFields();
                                setVisible(false);
                                (_b = tableActionRef.current) === null || _b === void 0 ? void 0 : _b.reload();
                                return [3 /*break*/, 6];
                            case 5:
                                error_3 = _c.sent();
                                antd_1.message.error('Failed to save user');
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); } },
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "username", label: "User Name", placeholder: "Enter user name", rules: [{ required: true, message: 'User Name is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "full_name", label: "Full Names", placeholder: "Enter full names", rules: [{ required: true, message: 'Full Names are required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "contact", label: "Contact", placeholder: "Enter contact number" }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "email", label: "Email", placeholder: "Enter email", rules: [{ required: true, message: 'Email is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "role", label: "Role", placeholder: "Enter role", rules: [{ required: true, message: 'Role is required' }] })),
            react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), onClick: function () {
                    setFormValues(undefined);
                    setVisible(true);
                } }, "Add New User")),
        react_1["default"].createElement(pro_components_1.ProTable, { rowSelection: {
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelection
            }, actionRef: tableActionRef, columns: columns, request: function (params) { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, umi_1.request('/users', {
                                params: {
                                    page: params.current,
                                    limit: params.pageSize,
                                    search: searchTerm
                                }
                            })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    data: response.data.data,
                                    success: response.success,
                                    total: response.data.total
                                }];
                    }
                });
            }); }, rowKey: "id", pagination: {
                showSizeChanger: true
            }, search: false, toolBarRender: false, options: false, dateFormatter: "string" })));
};
exports["default"] = Users;
