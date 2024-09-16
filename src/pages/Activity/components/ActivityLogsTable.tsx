// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination } from 'antd';
// import { request } from 'umi';
// import './ActivityLogs.less'; // Add this for custom styles

// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();

//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });

//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id,
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));

//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           ids: selectedRows.map(row => row.key).join(','),
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <span className="description-cell">{text}</span>
//       ),
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//     },
//   ];

//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Delete Selected Logs
//         </Button>
//       </Popconfirm>

//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false}
//       />

//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page);
//         }}
//         showSizeChanger
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };

// export default ActivityLogs;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination, Tooltip } from 'antd';
// import { request } from 'umi';
// import { format } from 'date-fns'; // Import date-fns for date formatting
// import './ActivityLogs.less'; // Custom styles

// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();

//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });

//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id,
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));

//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);

//   // Handle single delete
//   // const handleSingleDelete = async (id) => {
//   //   try {
//   //     await request(`/audits/${id}`, {
//   //       method: 'DELETE',
//   //     });
//   //     message.success('Log deleted successfully');
//   //     fetchData(pagination.current);
//   //   } catch (error) {
//   //     message.error('Failed to delete log');
//   //   }
//   // };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           ids: selectedRows.map(row => row.key).join(','),
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <Tooltip title={text} placement="topLeft">
//           <div className="description-cell">
//             {text}
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//       render: (text) => (
//         <span className="date-cell">{format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}</span>
//       ),
//     },
//     // {
//     //   title: 'Action',
//     //   key: 'action',
//     //   render: (_, record) => (
//     //     <Button
//     //       type="link"
//     //       onClick={() => handleSingleDelete(record.key)}
//     //     >
//     //       Delete
//     //     </Button>
//     //   ),
//     // },
//   ];

//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker format="YYYY-MM-DD" />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Delete Selected Logs
//         </Button>
//       </Popconfirm>

//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false}
//       />

//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page);
//         }}
//         showSizeChanger
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };

// export default ActivityLogs;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination, Tooltip } from 'antd';
// import { request } from 'umi';
// import { format } from 'date-fns'; // Import date-fns for date formatting
// import './ActivityLogs.less'; // Custom styles

// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();

//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });

//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id,
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));

//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     try {
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           ids: selectedRows.map(row => row.key).join(','),
//         },
//       });
//       message.success('Selected logs deleted successfully');
//       fetchData(pagination.current);
//       setSelectedRows([]);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <Tooltip title={text} placement="topLeft">
//           <div className="description-cell">
//             {text}
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//       render: (text) => (
//         <span className="date-cell">{format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}</span>
//       ),
//     },
//   ];

//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//               // Add actual user options here
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker format="YYYY-MM-DD" />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//               // Add actual module options here
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* Bulk Delete Button */}
//       <Popconfirm
//         title="Are you sure you want to delete selected logs?"
//         onConfirm={handleBulkDelete}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button
//           type="primary"
//           style={{ marginBottom: 16 }}
//           disabled={selectedRows.length === 0}
//         >
//           Delete Selected Logs
//         </Button>
//       </Popconfirm>

//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false}
//       />

//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page);
//         }}
//         showSizeChanger
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };

// export default ActivityLogs;
// import React, { useState, useEffect } from 'react';
// import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
// import { Button, message, Popconfirm, Form, Pagination, Tooltip } from 'antd';
// import { request } from 'umi';
// import { format } from 'date-fns'; // Import date-fns for date formatting
// import './ActivityLogs.less'; // Custom styles

// const ActivityLogs = () => {
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filters, setFilters] = useState({
//     user: '',
//     start_date: '',
//     end_date: '',
//     module: '',
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 15,
//     total: 0,
//   });
//   const [form] = Form.useForm();

//   // Fetch activity logs data with filters and pagination
//   const fetchData = async (page = 1) => {
//     try {
//       const response = await request('/audits', {
//         params: {
//           ...filters,
//           page,
//           per_page: pagination.pageSize,
//         },
//       });

//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         const mappedData = response.data.data.map(log => ({
//           key: log.auditable_id,
//           user: log.user,
//           description: log.description,
//           module: log.module,
//           ip_address: log.ip_address,
//           updated_at: log.auditable_record.updated_at,
//         }));

//         setData(mappedData);
//         setPagination({
//           ...pagination,
//           current: page,
//           total: response.data.total,
//         });
//       } else {
//         message.error('No data found');
//       }
//     } catch (error) {
//       message.error('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData(pagination.current);
//   }, [filters, pagination.current]);

//   // Handle bulk delete using the filters
//   const handleBulkDelete = async () => {
//     try {
//       const { start_date, end_date, user, module } = filters;
//       await request('/audits', {
//         method: 'DELETE',
//         params: {
//           start_date,
//           end_date,
//           name: user,
//           module,
//         },
//       });
//       message.success('Logs deleted successfully based on filters');
//       fetchData(pagination.current);
//     } catch (error) {
//       message.error('Failed to delete logs');
//     }
//   };

//   // Handle selected rows deletion
//   const handleSelectedDelete = async () => {
//     if (selectedRows.length === 0) {
//       message.error('No logs selected for deletion');
//       return;
//     }

//     try {
//       // Iterate over selected rows and delete each log
//       await Promise.all(
//         selectedRows.map(async (row) => {
//           await request(`/audits/${row.key}`, {
//             method: 'DELETE',
//           });
//         })
//       );
//       message.success('Selected logs deleted successfully');
//       setSelectedRows([]); // Clear selected rows
//       fetchData(pagination.current); // Refresh the table data
//     } catch (error) {
//       message.error('Failed to delete selected logs');
//     }
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (text) => (
//         <Tooltip title={text} placement="topLeft">
//           <div className="description-cell">
//             {text}
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'ip_address',
//       key: 'ip_address',
//     },
//     {
//       title: 'Updated At',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
//       render: (text) => (
//         <span className="date-cell">{format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}</span>
//       ),
//     },
//   ];

//   return (
//     <>
//       {/* Filters Form */}
//       <Form
//         form={form}
//         layout="inline"
//         style={{ marginBottom: 16 }}
//         onFinish={values => {
//           setFilters({
//             ...values,
//             start_date: values.dateRange?.[0]?.format('YYYY-MM-DD') || '',
//             end_date: values.dateRange?.[1]?.format('YYYY-MM-DD') || '',
//           });
//         }}
//       >
//         <Form.Item name="user" label="User">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Users' },
//               // Add actual user options here
//             ]}
//           />
//         </Form.Item>
//         <Form.Item name="dateRange" label="Date Range">
//           <ProFormDateRangePicker format="YYYY-MM-DD" />
//         </Form.Item>
//         <Form.Item name="module" label="Module">
//           <ProFormSelect
//             options={[
//               { value: '', label: 'All Modules' },
//               // Add actual module options here
//             ]}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Apply Filters
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* Bulk Delete and Single Delete Buttons */}
//       <div style={{ marginBottom: 16 }}>
//         <Popconfirm
//           title="Are you sure you want to delete logs based on filters?"
//           onConfirm={handleBulkDelete}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="primary" style={{ marginRight: 16 }} disabled={!filters.start_date && !filters.end_date}>
//             Delete Logs Based on Filters
//           </Button>
//         </Popconfirm>

//         <Popconfirm
//           title="Are you sure you want to delete the selected logs?"
//           onConfirm={handleSelectedDelete}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="primary" disabled={selectedRows.length === 0}>
//             Delete Selected Logs
//           </Button>
//         </Popconfirm>
//       </div>

//       {/* Activity Logs Table */}
//       <ProTable
//         columns={columns}
//         dataSource={data}
//         rowKey="key"
//         rowSelection={{
//           onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
//         }}
//         pagination={false} // Disable built-in pagination; we're using external
//         bordered
//       />

//       {/* Pagination Controls */}
//       <Pagination
//         current={pagination.current}
//         pageSize={pagination.pageSize}
//         total={pagination.total}
//         onChange={(page) => {
//           setPagination({
//             ...pagination,
//             current: page,
//           });
//           fetchData(page); // Fetch new page data
//         }}
//         showSizeChanger={false}
//         pageSizeOptions={[15]}
//         hideOnSinglePage
//       />
//     </>
//   );
// };

// export default ActivityLogs;
import React, { useState, useEffect } from 'react';
import { ProTable, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Form, Pagination, Tooltip, Spin } from 'antd';
import { request } from 'umi';
import { format } from 'date-fns'; // Import date-fns for date formatting
import './ActivityLogs.less'; // Custom styles

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filters, setFilters] = useState({
    user: '',
    start_date: '',
    end_date: '',
    module: '',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await request('/users');
        setUsers(response.data.map(user => ({ value: user.id, label: user.name })));
      } catch (error) {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Fetch activity logs data with filters and pagination
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      console.log('Fetching data with filters:', filters, 'and page:', page); // Debugging
      const response = await request('/audits', {
        params: {
          ...filters,
          page,
          per_page: pagination.pageSize,
        },
      });

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        const mappedData = response.data.data.map((log, index) => ({
          key: index,
          user: log.user,
          description: log.description,
          module: log.module,
          ip_address: log.ip_address,
          updated_at: log.auditable_record.updated_at,
        }));

        setData(mappedData);
        setPagination({
          ...pagination,
          current: page,
          total: response.data.total,
        });
      } else {
        message.error('No data found');
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current);
  }, [filters, pagination.current]);

  // Handle bulk delete using the filters
  const handleBulkDelete = async () => {
    try {
      const { start_date, end_date, user, module } = filters;
      await request('/audits', {
        method: 'DELETE',
        params: {
          start_date,
          end_date,
          user,
          module,
        },
      });
      message.success('Logs deleted successfully based on filters');
      fetchData(pagination.current);
    } catch (error) {
      message.error('Failed to delete logs');
    }
  };

  // Handle selected row deletion
  const handleSelectedDelete = async () => {
    if (!selectedRow) {
      message.error('No log selected for deletion');
      return;
    }

    try {
      await request(`/audits/${selectedRow.key}`, {
        method: 'DELETE',
      });
      message.success('Selected log deleted successfully');
      setSelectedRow(null); // Clear selected row
      fetchData(pagination.current); // Refresh the table data
    } catch (error) {
      message.error('Failed to delete selected log');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div className="description-cell">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => (
        <span className="date-cell">{format(new Date(text), 'yyyy-MM-dd HH:mm:ss')}</span>
      ),
    },
  ];

  return (
    <>
      {/* Filters Form */}
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
        onValuesChange={(changedValues) => {
          const newFilters = {
            ...filters,
            ...changedValues,
            start_date: changedValues.dateRange?.[0]?.format('YYYY-MM-DD') || filters.start_date,
            end_date: changedValues.dateRange?.[1]?.format('YYYY-MM-DD') || filters.end_date,
          };
          console.log('Filters updated:', newFilters); 
          setFilters(newFilters);
        }}
      >
        <Form.Item name="user" label="User">
          <ProFormSelect
            options={[
              { value: '', label: 'All Users' },
              ...users,
            ]}
          />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <ProFormDateRangePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="module" label="Module">
          <ProFormSelect
            options={[
              { value: '', label: 'All Modules' },
              // Add actual module options here
            ]}
          />
        </Form.Item>
      </Form>

      {/* Bulk Delete and Single Delete Buttons */}
      <div style={{ marginBottom: 16 }}>
        <Popconfirm
          title="Are you sure you want to delete logs based on filters?"
          onConfirm={handleBulkDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" style={{ marginRight: 16 }} disabled={!filters.start_date && !filters.end_date}>
            Delete Logs Based on Filters
          </Button>
        </Popconfirm>

        <Popconfirm
          title="Are you sure you want to delete the selected log?"
          onConfirm={handleSelectedDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" disabled={!selectedRow}>
            Delete Selected Log
          </Button>
        </Popconfirm>
      </div>

      {/* Activity Logs Table */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <ProTable
          columns={columns}
          dataSource={data}
          search={false}
          rowKey="key"
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRow(selectedRows[0] || null); 
            },
            selectedRowKeys: selectedRow ? [selectedRow.key] : [],
          }}
          pagination={false} 
          bordered
        />
      )}

      {/* Pagination Controls */}
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page) => {
          setPagination({
            ...pagination,
            current: page,
          });
          fetchData(page); // Fetch new page data
        }}
        showSizeChanger={false}
        pageSizeOptions={[15]}
        hideOnSinglePage
      />
    </>
  );
};

export default ActivityLogs;
