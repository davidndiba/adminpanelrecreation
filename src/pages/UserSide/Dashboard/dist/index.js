"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var Dashboard = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(pro_components_1.PageHeader, { title: "Dashboard", subTitle: "Overview of all activities" }),
        react_1["default"].createElement(antd_1.Row, { gutter: 16 },
            react_1["default"].createElement(antd_1.Col, { span: 8 },
                react_1["default"].createElement(antd_1.Card, { title: "Card Title", bordered: false }, "Content")),
            react_1["default"].createElement(antd_1.Col, { span: 8 },
                react_1["default"].createElement(antd_1.Card, { title: "Card Title", bordered: false }, "Content")),
            react_1["default"].createElement(antd_1.Col, { span: 8 },
                react_1["default"].createElement(antd_1.Card, { title: "Card Title", bordered: false }, "Content")))));
};
exports["default"] = Dashboard;
