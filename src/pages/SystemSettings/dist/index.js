"use strict";
// import React from 'react';
// import { PageContainer } from '@ant-design/pro-components';
// import SystemSettings from './Components/SystemSetting';
// import GeneralSettings from './Components/GeneralSettings';
// import EmailSettings from './Components/EmailSetting';
exports.__esModule = true;
// const Settings = () => (
//   <PageContainer>
//     {/* System Settings at the top */}
//     <SystemSettings />
//     {/* General Settings below the System Settings */}
//     <div style={{ marginTop: 24 }}>
//       <GeneralSettings />
//     </div>
//     {/* Email Settings below the General Settings */}
//     <div style={{ marginTop: 24 }}>
//       <EmailSettings />
//     </div>
//   </PageContainer>
// );
// export default Settings;
// import { PageContainer } from '@ant-design/pro-components';
// import SystemSettings from './SystemSetting'; // Ensure the path is correct
// import GeneralSettings from './GeneralSettings'; // Ensure the path is correct
// import EmailSettings from './EmailSettings'; // Ensure the path is correct
// import SecuritySettings from './SecuritySettings';
// const Settings = () => (
//   <PageContainer>
//     {/* System Settings at the top */}
//     <SystemSettings />
//     {/* General Settings below the System Settings */}
//     <div style={{ marginTop: 24 }}>
//       <GeneralSettings />
//     </div>
//     {/* Email Settings below the General Settings */}
//     <div style={{ marginTop: 24 }}>
//       <EmailSettings />
//     </div>
//      {/* Security Settings below the General Settings */}
//      <div style={{ marginTop: 24 }}>
//       <SecuritySettings />
//     </div>
//   </PageContainer>
// );
// export default Settings;
var react_1 = require("react");
var umi_1 = require("umi");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var umi_2 = require("umi");
var SystemSettingsLayout = function () {
    var location = umi_2.useLocation();
    return (react_1["default"].createElement(pro_components_1.PageContainer, null,
        react_1["default"].createElement("div", { style: { display: 'flex' } },
            react_1["default"].createElement(antd_1.Menu, { mode: "inline", selectedKeys: [location.pathname], style: { width: 200 } },
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/system-settings/generalsettings" },
                    react_1["default"].createElement(umi_2.Link, { to: "/system-settings/generalsettings" }, "General Settings")),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/system-settings/emailsettings" },
                    react_1["default"].createElement(umi_2.Link, { to: "/system-settings/emailsettings" }, "Email Settings")),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/system-settings/securitysettings" },
                    react_1["default"].createElement(umi_2.Link, { to: "/system-settings/securitysettings" }, "Security Settings"))),
            react_1["default"].createElement("div", { style: { flex: 1, marginLeft: 24 } },
                react_1["default"].createElement(umi_1.Outlet, null),
                " "))));
};
exports["default"] = SystemSettingsLayout;
