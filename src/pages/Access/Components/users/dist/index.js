"use strict";
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
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var moment_1 = require("moment");
var react_1 = require("react");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var Users = function () {
    var addUserRef = react_1.useRef();
    var tableActionRef = react_1.useRef();
    var _a = react_1.useState([]), selectedRowKeys = _a[0], setSelectedRowKeys = _a[1];
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = react_1.useState(0), totalUsers = _c[0], setTotalUsers = _c[1];
    var _d = react_1.useState(0), activeUsers = _d[0], setActiveUsers = _d[1];
    var _e = react_1.useState(0), inactiveUsers = _e[0], setInactiveUsers = _e[1];
    var _f = react_1.useState(0), pendingActivation = _f[0], setPendingActivation = _f[1];
    var _g = react_1.useState(false), visible = _g[0], setVisible = _g[1]; // Corrected visible state
    var _h = react_1.useState(undefined), formValues = _h[0], setFormValues = _h[1]; // Corrected formValues state
    var statuses = umi_1.useRequest(function () { return umi_1.request('/statuses'); }).data;
    // [visible, setVisible] = useState<boolean>(false), // Corrected visible state
    // [formValues, setFormValues] = useState<User | undefined>(undefined); // Corrected formValues state
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
                            // Set statistics using the response data
                            setTotalUsers((_b = statistics === null || statistics === void 0 ? void 0 : statistics.total_users) !== null && _b !== void 0 ? _b : 0);
                            setActiveUsers((_d = (_c = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _c === void 0 ? void 0 : _c.Active) !== null && _d !== void 0 ? _d : 0);
                            setInactiveUsers(((_f = (_e = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _e === void 0 ? void 0 : _e.Deactivated) !== null && _f !== void 0 ? _f : 0) +
                                ((_h = (_g = statistics === null || statistics === void 0 ? void 0 : statistics.user_counts_by_status) === null || _g === void 0 ? void 0 : _g.Deleted) !== null && _h !== void 0 ? _h : 0));
                            setPendingActivation((_k = (_j = response.data) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.reduce(function (acc, user) { return acc + (user.login_count || 0); }, 0));
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
        // Trigger table reload on search
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
                    // Set the form values
                    // addUserRef.current?.setFieldsValue(userData);
                    (_a = addUserRef.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(__assign(__assign({}, user), { status: { key: user.status } }));
                    // Open the modal form
                    // addUserRef.current?.open();
                    setFormValues(user);
                    setVisible(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: function (text, record) { return (react_1["default"].createElement("a", { href: "/users/" + record.id, style: {
                    color: '#1890ff',
                    textDecoration: 'none',
                    cursor: 'pointer'
                }, onClick: function (e) {
                    e.preventDefault(); // Prevent default anchor behavior
                    umi_1.history.push("/users/" + record.id); // Use history for navigation
                } }, text)); }
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'IP Address', dataIndex: 'ip_address', key: 'ip_address' },
        {
            title: 'Status',
            dataIndex: ['status', 'name'],
            key: 'status'
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: function (r) { return r === null || r === void 0 ? void 0 : r.join(', '); }
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'last_login',
            // render: (text: any) => moment(text).format('ll'),
            render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD HH:mm:ss'); }
        },
        { title: 'Login Count', dataIndex: 'login_count', key: 'login_count' },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: function (text) { return moment_1["default"](text).format('YYYY-MM-DD HH:mm:ss'); }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () { return handleEdit(record); }, type: "link" }, "Edit"))); }
        },
    ];
    return (react_1["default"].createElement("div", { style: { padding: '24px', backgroundColor: '#fff' } },
        react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#e6f7ff', color: '#1890ff' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Total Users"),
                    react_1["default"].createElement(antd_1.Statistic, { title: "Total Users", value: totalUsers, prefix: react_1["default"].createElement(icons_1.UserOutlined, { style: { color: '#1890ff', fontSize: '24px' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#f6ffed', color: '#52c41a' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Active Users"),
                    react_1["default"].createElement(antd_1.Statistic, { title: "Active Users", value: activeUsers, prefix: react_1["default"].createElement(icons_1.TeamOutlined, { style: { color: '#52c41a', fontSize: '24px' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fff7e6', color: '#fa8c16' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Inactive Users"),
                    react_1["default"].createElement(antd_1.Statistic, { title: "Inactive Users", value: inactiveUsers, prefix: react_1["default"].createElement(icons_1.UserOutlined, { style: { color: '#fa8c16', fontSize: '24px' } }) }))),
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, { bordered: true, style: { backgroundColor: '#fffbe6', color: '#faad14' } },
                    react_1["default"].createElement(Title, { level: 4 }, "Pending Activation"),
                    react_1["default"].createElement(antd_1.Statistic, { title: "Pending Activation", value: pendingActivation, prefix: react_1["default"].createElement(icons_1.LoginOutlined, { style: { color: '#faad14', fontSize: '24px' } }) })))),
        react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginBottom: '16px' } },
            react_1["default"].createElement(antd_1.Col, { span: 24 },
                react_1["default"].createElement(antd_1.Input, { placeholder: "Search Users", value: searchTerm, onChange: function (e) {
                        var value = e.target.value;
                        setSearchTerm(value);
                        // If input is cleared, reload the table
                        if (value === '') {
                            handleSearch();
                        }
                    }, onPressEnter: handleSearch, style: { width: 200, marginBottom: '16px' }, allowClear // Add a clear button
                    : true }))),
        react_1["default"].createElement("div", { style: {
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '16px'
            } },
            react_1["default"].createElement(pro_components_1.ModalForm, { formRef: addUserRef, title: formValues ? 'Edit User' : 'Add New User', visible: visible, onVisibleChange: setVisible, onFinish: function (values) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_2;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 5, , 6]);
                                if (!(formValues === null || formValues === void 0 ? void 0 : formValues.id)) return [3 /*break*/, 2];
                                // Update existing user
                                return [4 /*yield*/, umi_1.request("/users/" + formValues.id, {
                                        method: 'PUT',
                                        data: values
                                    })];
                            case 1:
                                // Update existing user
                                _c.sent();
                                antd_1.message.success('User updated successfully');
                                return [3 /*break*/, 4];
                            case 2: 
                            // Create new user
                            return [4 /*yield*/, umi_1.request('/auth/admin/register', {
                                    method: 'POST',
                                    data: values
                                })];
                            case 3:
                                // Create new user
                                _c.sent();
                                antd_1.message.success('User added successfully');
                                _c.label = 4;
                            case 4:
                                (_a = addUserRef.current) === null || _a === void 0 ? void 0 : _a.resetFields();
                                setVisible(false); // Close the modal
                                (_b = tableActionRef.current) === null || _b === void 0 ? void 0 : _b.reload(); // Refresh the table data
                                return [3 /*break*/, 6];
                            case 5:
                                error_2 = _c.sent();
                                antd_1.message.error('Failed to save user');
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }, initialValues: formValues, trigger: react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), style: {
                        backgroundColor: '#6c5ce7',
                        color: '#ffffff',
                        borderColor: '#6c5ce7'
                    }, onClick: function () {
                        setFormValues(undefined); // Reset form values
                        setVisible(true); // Show the modal for new user
                    } }, "Add New User") },
                react_1["default"].createElement(pro_components_1.ProFormText, { label: "Display Name", name: "display_name", rules: [{ required: true }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { label: "Email", name: "email", rules: [
                        { required: true },
                        { type: 'email', message: 'Invalid email address' },
                    ] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { label: "Phone Number", name: "phone" }),
                react_1["default"].createElement(pro_components_1.ProFormText, { label: "Username", name: "username", rules: [{ required: true }] }),
                react_1["default"].createElement(pro_components_1.ProFormSelect, { label: "Status", name: ['status', 'name'], options: (statuses === null || statuses === void 0 ? void 0 : statuses.map(function (status) { return ({ label: status.name, value: status.name }); })) || [], rules: [{ required: true }] }),
                react_1["default"].createElement(pro_components_1.ProFormSelect, { request: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var resp;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, umi_1.request('/roles')];
                                case 1:
                                    resp = _b.sent();
                                    return [2 /*return*/, (_a = resp === null || resp === void 0 ? void 0 : resp.data) !== null && _a !== void 0 ? _a : []];
                            }
                        });
                    }); }, fieldProps: {
                        fieldNames: {
                            label: 'name',
                            value: 'id'
                        }
                    }, label: "Role", name: "role", rules: [{ required: true }] }))),
        react_1["default"].createElement(pro_components_1.ProTable, { columns: columns, actionRef: tableActionRef, rowKey: "id", rowSelection: { selectedRowKeys: selectedRowKeys, onChange: handleRowSelection }, pagination: {
                defaultCurrent: 1,
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                hideOnSinglePage: true
            }, search: false, request: function (params) { return __awaiter(void 0, void 0, void 0, function () {
                var resp;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, umi_1.request('/users', {
                                params: __assign(__assign({}, params), { search: searchTerm })
                            })];
                        case 1:
                            resp = _c.sent();
                            return [2 /*return*/, {
                                    data: (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.data,
                                    total: (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.total,
                                    success: true
                                }];
                    }
                });
            }); }, components: {
                header: {
                    cell: function (props) { return (react_1["default"].createElement("th", __assign({}, props, { style: {
                            borderBottom: '2px solid #d9d9d9'
                        } }))); }
                },
                body: {
                    cell: function (props) { return (react_1["default"].createElement("td", __assign({}, props, { style: {
                            borderBottom: '1px solid #d9d9d9'
                        } }))); }
                }
            }, footer: function () { return (react_1["default"].createElement(antd_1.Space, { split: react_1["default"].createElement(antd_1.Divider, { type: "vertical" }) }, statuses === null || statuses === void 0 ? void 0 : statuses.map(function (status) { return (react_1["default"].createElement(antd_1.Button, { size: "small", key: status.id, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        selectedRowKeys === null || selectedRowKeys === void 0 ? void 0 : selectedRowKeys.forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, umi_1.request("/users/" + id, {
                                            method: 'PUT',
                                            data: { status: status.id }
                                        })];
                                    case 1:
                                        _c.sent();
                                        (_b = (_a = tableActionRef === null || tableActionRef === void 0 ? void 0 : tableActionRef.current) === null || _a === void 0 ? void 0 : _a.reload) === null || _b === void 0 ? void 0 : _b.call(_a);
                                        antd_1.message.success("User status updated to " + status.name);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); }, disabled: selectedRowKeys.length === 0 }, status.name)); }))); }, onRow: function () { return ({}); }, rowSelection: {
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelection
            } })));
};
exports["default"] = Users;
