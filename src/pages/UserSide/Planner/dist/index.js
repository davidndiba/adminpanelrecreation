"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var Planner = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(pro_components_1.PageHeader, { title: "Planner", subTitle: "Manage your tasks and schedules" }),
        react_1["default"].createElement(antd_1.List, { header: react_1["default"].createElement("div", null, "Task List"), bordered: true, dataSource: ['Task 1', 'Task 2', 'Task 3'], renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, null,
                item,
                react_1["default"].createElement(antd_1.Button, { type: "link" }, "Edit"))); } })));
};
exports["default"] = Planner;
