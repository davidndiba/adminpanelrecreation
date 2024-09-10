// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';

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
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';

interface StatisticData {
  title: string;
  value: number | string;
  description?: string;
}

const data: StatisticData[] = [
  { title: 'Total Sales', value: '$12,345', description: 'Total sales in the current month' },
  { title: 'New Users', value: '123', description: 'New users registered in the current month' },
  { title: 'Active Orders', value: '456', description: 'Orders currently in progress' },
  { title: 'Customer Satisfaction', value: '88%', description: 'Overall customer satisfaction percentage' },
];

const Statistics: React.FC = () => {
  return (
    <ProCard
      title="Statistics Overview"
      style={{ marginBottom: 24 }}
      bordered
      bodyStyle={{ padding: 24 }}
    >
      <Row gutter={16}>
        {data.map((item, index) => (
          <Col span={6} key={index}> {/* Adjust the span here */}
            <Card
              title={item.title}
              bordered={false}
              style={{
                marginBottom: 16,
                borderRadius: 8,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                // Ensure the card fits well within the column
                width: '100%',
                height: '100px', // Adjust the height as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px', // Adjust padding if needed
              }}
            >
              <h2 style={{ fontSize: '16px', marginBottom: '8px' }}>{item.value}</h2> {/* Adjust font size if needed */}
              {item.description && <p style={{ color: '#888', fontSize: '12px' }}>{item.description}</p>} {/* Adjust font size if needed */}
            </Card>
          </Col>
        ))}
      </Row>
    </ProCard>
  );
};

export default Statistics;
