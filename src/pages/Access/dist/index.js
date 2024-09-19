"use strict";
// import React,{ useState } from 'react';
// import { Segmented, Space } from 'antd';
// import { PageContainer } from '@ant-design/pro-components';
// import Users from './Components/users';
// import Roles from './Components/roles';
// import Permissions from './Components/permissions';
exports.__esModule = true;
// const AdminPanel: React.FC = () => {
//   const [current, setCurrent] = useState('Users');
//   const handleTabChange = (value: string) => {
//     setCurrent(value);
//   };
//   return (
//     <PageContainer title={`Admin ${current}`}>
//       <div style={{ marginBottom: 16 }}>
//         <Segmented
//           size="middle"
//           onChange={handleTabChange}
//           style={{ fontWeight: 700 }}
//           options={['Users', 'Roles', 'Permissions']}
//         />
//       </div>
//       <Space direction="vertical" style={{ width: '100%' }}>
//         {current === 'Users' && <Users />}
//         {current === 'Roles' && <Roles />}
//         {current === 'Permissions' && <Permissions />}
//       </Space>
//     </PageContainer>
//   );
// };
// export default AdminPanel;
var react_1 = require("react");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var users_1 = require("./Components/users");
var roles_1 = require("./Components/roles");
var permissions_1 = require("./Components/permissions");
var TabPane = antd_1.Tabs.TabPane;
var AdminPanel = function () {
    return (react_1["default"].createElement(pro_components_1.ProCard, { title: "User Management", bordered: true },
        react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1" },
            react_1["default"].createElement(TabPane, { tab: "Users", key: "1" },
                react_1["default"].createElement(users_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: "Roles", key: "2" },
                react_1["default"].createElement(roles_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: "Permissions", key: "3" },
                react_1["default"].createElement(permissions_1["default"], null)))));
};
exports["default"] = AdminPanel;
