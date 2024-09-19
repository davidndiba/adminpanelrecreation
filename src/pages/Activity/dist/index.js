"use strict";
exports.__esModule = true;
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var HeatMap_1 = require("./components/HeatMap");
var Statistics_1 = require("./components/Statistics");
var ActivityLogsTable_1 = require("./components/ActivityLogsTable");
var Dashboard = function () { return (react_1["default"].createElement(pro_components_1.PageContainer, null,
    react_1["default"].createElement(Statistics_1["default"], null),
    react_1["default"].createElement("div", { style: { marginTop: 24 } },
        react_1["default"].createElement(HeatMap_1["default"], null)),
    react_1["default"].createElement("div", { style: { marginTop: 24 } },
        react_1["default"].createElement(ActivityLogsTable_1["default"], null)))); };
exports["default"] = Dashboard;
