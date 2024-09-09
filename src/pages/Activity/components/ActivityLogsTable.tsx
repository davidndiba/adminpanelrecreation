// import React, { useRef } from 'react';
// import { ProTable, ActionType } from '@ant-design/pro-components';
// import { Button, Input } from 'antd';

// const ActivityLogsTable: React.FC = () => {
//   const actionRef = useRef<ActionType>();

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       valueType: 'text',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       valueType: 'text',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       valueType: 'dateTime',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ipAddress',
//       valueType: 'text',
//     },
//   ];

//   return (
//     <ProTable
//       headerTitle="User Activity Logs"
//       actionRef={actionRef}
//       rowKey="id"
//       search={{
//         labelWidth: 120,
//       }}
//       toolBarRender={() => [
//         <Input.Search
//           placeholder="Search by user"
//           onSearch={(value) => {
//             actionRef.current?.reload();
//           }}
//         />,
//         <Button type="primary" onClick={() => actionRef.current?.reload()}>
//           Refresh
//         </Button>,
//       ]}
//       request={async (params) => {
//         // Replace with your API request
//         const data = await fetchActivityLogs(params);
//         return {
//           data: data.logs || [],
//           success: true,
//         };
//       }}
//       columns={columns}
//     />
//   );
// };

// // Replace with your actual data fetching function
// async function fetchActivityLogs(params) {
//   // Simulate fetching data
//   return {
//     logs: [
//       {
//         id: '1',
//         user: 'John Doe',
//         action: 'Login',
//         date: '2023-09-06 12:00:00',
//         ipAddress: '192.168.1.1',
//       },
//       {
//         id: '2',
//         user: 'Jane Smith',
//         action: 'Logout',
//         date: '2023-09-06 12:30:00',
//         ipAddress: '192.168.1.2',
//       },
//     ],
//   };
// }

// export default ActivityLogsTable;
import React from 'react';
import { ProTable, ProFormSelect } from '@ant-design/pro-components';

const ActivityLogs = () => {
  // Define the columns for the table
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
    },
  ];

  // Mock data
  const data = [
    { user: 'John Doe', action: 'Login', timestamp: '2024-09-06 12:00' },
    { user: 'Jane Smith', action: 'Logout', timestamp: '2024-09-06 12:30' },
    // Add more data here
  ];

  return (
    <>
      {/* Filters */}
      <ProFormSelect
        name="user"
        label="Filter by User"
        options={[
          { value: 'John Doe', label: 'John Doe' },
          { value: 'Jane Smith', label: 'Jane Smith' },
        ]}
      />
      {/* Activity Logs Table */}
      <ProTable columns={columns} dataSource={data} rowKey="timestamp" />
    </>
  );
};

export default ActivityLogs;
