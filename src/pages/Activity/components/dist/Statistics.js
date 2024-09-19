"use strict";
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
exports.__esModule = true;
// const Statistics = () => (
//   <ProCard split="vertical" style={{ marginBottom: 24 }}>
//     <ProCard title="Top 5 Users" colSpan="25%">
//       {/* Add User stats here */}
//     </ProCard>
//     <ProCard title="Top 5 Modules" colSpan="25%">
//       {/* Add Module stats here */}
//     </ProCard>
//     <ProCard title="Other Stat 1" colSpan="25%">
//       {/* Add Other Stat 1 here */}
//     </ProCard>
//     <ProCard title="Other Stat 2" colSpan="25%">
//       {/* Add Other Stat 2 here */}
//     </ProCard>
//   </ProCard>
// );
// export default Statistics;
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Card, Col, Row } from 'antd';
// interface StatisticData {
//   title: string;
//   value: number | string;
//   description?: string;
// }
// const data: StatisticData[] = [
//   { title: 'Total Sales', value: '$12,345', description: 'Total sales in the current month' },
//   { title: 'New Users', value: '123', description: 'New users registered in the current month' },
//   { title: 'Active Orders', value: '456', description: 'Orders currently in progress' },
//   { title: 'Customer Satisfaction', value: '88%', description: 'Overall customer satisfaction percentage' },
// ];
// const Statistics: React.FC = () => {
//   return (
//     <ProCard
//       title="Statistics Overview"
//       style={{ marginBottom: 24 }}
//       bordered
//       bodyStyle={{ padding: 24 }}
//     >
//       <Row gutter={16}>
//         {data.map((item, index) => (
//           <Col span={8} key={index}>
//             <Card
//               title={item.title}
//               bordered={false}
//               style={{
//                 marginBottom: 16,
//                 borderRadius: 8,
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{item.value}</h2>
//               {item.description && <p style={{ color: '#888' }}>{item.description}</p>}
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </ProCard>
//   );
// };
// export default Statistics;
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var data = [
    { title: 'Total Sales', value: '$12,345', description: 'Total sales in the current month' },
    { title: 'New Users', value: '123', description: 'New users registered in the current month' },
    { title: 'Active Orders', value: '456', description: 'Orders currently in progress' },
    { title: 'Customer Satisfaction', value: '88%', description: 'Overall customer satisfaction percentage' },
];
var Statistics = function () {
    return (react_1["default"].createElement(pro_components_1.ProCard, { title: "Statistics Overview", style: { marginBottom: 24 }, bordered: true, bodyStyle: { padding: 24 } },
        react_1["default"].createElement(antd_1.Row, { gutter: 16 }, data.map(function (item, index) { return (react_1["default"].createElement(antd_1.Col, { span: 6, key: index },
            " ",
            react_1["default"].createElement(antd_1.Card, { title: item.title, bordered: false, style: {
                    marginBottom: 16,
                    borderRadius: 8,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    // Ensure the card fits well within the column
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px'
                } },
                react_1["default"].createElement("h2", { style: { fontSize: '16px', marginBottom: '8px' } }, item.value),
                " ",
                item.description && react_1["default"].createElement("p", { style: { color: '#888', fontSize: '12px' } }, item.description),
                " "))); }))));
};
exports["default"] = Statistics;
