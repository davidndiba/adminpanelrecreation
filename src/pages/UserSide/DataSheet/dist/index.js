"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var DataSheet = function () {
    var columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
    ];
    var data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
    ];
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(pro_components_1.PageHeader, { title: "Data Sheet", subTitle: "Manage and view data" }),
        react_1["default"].createElement(antd_1.Table, { columns: columns, dataSource: data })));
};
exports["default"] = DataSheet;
