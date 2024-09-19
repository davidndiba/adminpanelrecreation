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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// src/pages/Users.tsx
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var pro_components_1 = require("@ant-design/pro-components");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var Users = function () {
    var _a = react_1.useState(false), isModalVisible = _a[0], setIsModalVisible = _a[1];
    var _b = react_1.useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = react_1.useState(null), selectedUser = _c[0], setSelectedUser = _c[1];
    var _d = react_1.useState([]), statuses = _d[0], setStatuses = _d[1];
    var _e = react_1.useState([]), users = _e[0], setUsers = _e[1];
    var form = antd_1.Form.useForm()[0];
    react_1.useEffect(function () {
        // Fetch statuses from the API
        umi_1.request('/statuses')
            .then(function (response) {
            setStatuses(response.data);
        })["catch"](function (error) {
            console.error('Failed to fetch statuses:', error);
        });
        // Fetch users from the API
        umi_1.request('/users')
            .then(function (response) {
            setUsers(response.data);
        })["catch"](function (error) {
            console.error('Failed to fetch users:', error);
        });
    }, []);
    var columns = [
        { title: 'Display Name', dataIndex: 'display_name', key: 'display_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: function (status) { return (status === null || status === void 0 ? void 0 : status.name) || 'N/A'; } },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), onClick: function () {
                        setIsEditing(true);
                        setSelectedUser(record);
                        form.setFieldsValue(record);
                        setIsModalVisible(true);
                    } }),
                react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.DeleteOutlined, null), onClick: function () { return handleDelete(record.id); } }))); }
        },
    ];
    var handleOk = function () {
        form.validateFields().then(function (values) {
            if (isEditing && selectedUser) {
                // Handle edit user
                umi_1.request("/api/users/" + selectedUser.id, {
                    method: 'PUT',
                    data: values
                })
                    .then(function () {
                    setUsers(function (prev) { return prev.map(function (user) { return (user.id === selectedUser.id ? __assign(__assign({}, user), values) : user); }); });
                    setIsModalVisible(false);
                })["catch"](function (error) { return console.error('Failed to update user:', error); });
            }
            else {
                // Handle add new user
                umi_1.request('/api/users', {
                    method: 'POST',
                    data: values
                })
                    .then(function (newUser) {
                    setUsers(function (prev) { return __spreadArrays(prev, [newUser]); });
                    setIsModalVisible(false);
                })["catch"](function (error) { return console.error('Failed to add user:', error); });
            }
        });
    };
    var handleCancel = function () {
        setIsModalVisible(false);
    };
    var handleDelete = function (userId) {
        antd_1.Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this user?',
            onOk: function () {
                umi_1.request("/api/users/" + userId, { method: 'DELETE' })
                    .then(function () {
                    setUsers(function (prev) { return prev.filter(function (user) { return user.id !== userId; }); });
                })["catch"](function (error) { return console.error('Failed to delete user:', error); });
            }
        });
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.Row, { gutter: 16 },
            react_1["default"].createElement(antd_1.Col, { span: 6 },
                react_1["default"].createElement(antd_1.Card, null,
                    react_1["default"].createElement(Title, { level: 4 }, "Total Users"),
                    react_1["default"].createElement(icons_1.UserOutlined, { style: { fontSize: '36px', color: '#1890ff' } })))),
        react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), onClick: function () {
                setIsEditing(false);
                setSelectedUser(null);
                form.resetFields();
                setIsModalVisible(true);
            } }, "Add User"),
        react_1["default"].createElement(pro_components_1.ProTable, { columns: columns, dataSource: users, rowKey: "id" }),
        react_1["default"].createElement(antd_1.Modal, { title: isEditing ? 'Edit User' : 'Add User', visible: isModalVisible, onOk: handleOk, onCancel: handleCancel },
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical" },
                react_1["default"].createElement(antd_1.Form.Item, { name: "display_name", label: "Display Name", rules: [{ required: true, message: 'Please enter display name' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { name: "email", label: "Email", rules: [{ required: true, message: 'Please enter email' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { name: "status", label: "Status", rules: [{ required: true, message: 'Please select status' }] },
                    react_1["default"].createElement(antd_1.Select, null, statuses.map(function (status) { return (react_1["default"].createElement(antd_1.Select.Option, { key: status.id, value: status.id }, status.name)); })))))));
};
exports["default"] = Users;
