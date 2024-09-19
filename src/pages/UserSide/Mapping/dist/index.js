"use strict";
exports.__esModule = true;
var react_1 = require("react");
var umi_1 = require("umi");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var umi_2 = require("umi");
var DataBackupAndSystemInfo = function () {
    var location = umi_2.useLocation();
    return (react_1["default"].createElement(pro_components_1.PageContainer, null,
        react_1["default"].createElement("div", { style: { display: 'flex' } },
            react_1["default"].createElement(antd_1.Menu, { mode: "inline", selectedKeys: [location.pathname], style: { width: 200 } },
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/mapping/managejobtypes" },
                    react_1["default"].createElement(umi_2.Link, { to: "/mapping/managejobtypes" }, "Manage Job Types"),
                    " "),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/mapping/jobareas" },
                    react_1["default"].createElement(umi_2.Link, { to: "/mapping/jobareas" }, "Job Areas"),
                    " "),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/mapping/linesandtanks" },
                    react_1["default"].createElement(umi_2.Link, { to: "/mapping/linesandtanks" }, "Lines & Tanks"),
                    " ")),
            react_1["default"].createElement("div", { style: { flex: 1, marginLeft: 24 } },
                react_1["default"].createElement(umi_1.Outlet, null),
                " "))));
};
exports["default"] = DataBackupAndSystemInfo;
