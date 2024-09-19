// import {
//     ActionType,
//     ModalForm,
//     ProColumns,
//     ProFormText,
//     ProTable,
//     ProFormSelect,
//   } from '@ant-design/pro-components';
//   import { Button, Card, Col, Divider, Input, message, Row, Space, Tooltip, Popconfirm, Typography } from 'antd';
//   import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//   import React, { useRef, useState } from 'react';
//   import moment from 'moment';
//   import { request, useRequest } from 'umi';
//   // import './Mapping.less';
  
//   const { Title } = Typography;
  
//   interface JobType {
//     id: string;
//     job_type: string;
//     created_by: string;
//     created_on: string;
//     modified_on: string;
//   }
  
//   const Mapping: React.FC = () => {
//     const tableActionRef = useRef<ActionType>();
//     const [visible, setVisible] = useState(false);
//     const [assignVisible, setAssignVisible] = useState(false);
//     const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
  
//     const { data: jobAreas } = useRequest(() => request('/job-areas'));
  
//     const handleEdit = (record: JobType) => {
//       setFormValues(record);
//       setVisible(true);
//     };
  
//     const handleDelete = async (id: string) => {
//       try {
//         await request(`/job-types/${id}`, { method: 'DELETE' });
//         message.success('Job Type deleted successfully.');
//         tableActionRef.current?.reload();
//       } catch (error) {
//         message.error('Failed to delete job type.');
//       }
//     };
  
//     const columns: ProColumns<JobType>[] = [
//       {
//         title: 'Job Type',
//         dataIndex: 'job_type',
//         key: 'job_type',
//       },
//       {
//         title: 'Created By',
//         dataIndex: 'created_by',
//         key: 'created_by',
//       },
//       {
//         title: 'Created On',
//         dataIndex: 'created_on',
//         key: 'created_on',
//         render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
//       },
//       {
//         title: 'Modified On',
//         dataIndex: 'modified_on',
//         key: 'modified_on',
//         render: (text: string) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
//       },
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Tooltip title="Edit">
//               <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
//             </Tooltip>
//             <Tooltip title="Delete">
//               <Popconfirm
//                 title="Are you sure you want to delete this job type?"
//                 onConfirm={() => handleDelete(record.id)}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <Button icon={<DeleteOutlined />} type="link" danger />
//               </Popconfirm>
//             </Tooltip>
//           </Space>
//         ),
//       },
//     ];
  
//     return (
//       <div className="mapping-page">
//         <Row gutter={16} className="mapping-stats">
//           <Col span={8}>
//             <Card bordered>
//               <Title level={4}>Job Types</Title>
//               <Divider />
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => setVisible(true)}
//                 style={{ width: '100%' }}
//               >
//                 Add Job Type
//               </Button>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card bordered>
//               <Title level={4}>Assign Tasks</Title>
//               <Divider />
//               <Button
//                 type="primary"
//                 onClick={() => setAssignVisible(true)}
//                 style={{ width: '100%' }}
//               >
//                 Assign Tasks to Job Types
//               </Button>
//             </Card>
//           </Col>
//         </Row>
  
//         <ProTable<JobType>
//           headerTitle="Job Types"
//           actionRef={tableActionRef}
//           rowKey="id"
//           search={false}
//           pagination={{ pageSize: 10 }}
//           request={async (params) => {
//             const response = await request('/job-types', { params });
//             return {
//               data: response.data || [],
//               total: response.total || 0,
//             };
//           }}
//           columns={columns}
//           toolBarRender={false}
//           bordered
//         />
  
//         <ModalForm
//           formRef={tableActionRef}
//           title={formValues ? 'Edit Job Type' : 'Add Job Type'}
//           visible={visible}
//           onVisibleChange={setVisible}
//           onFinish={async (values) => {
//             try {
//               if (formValues?.id) {
//                 await request(`/job-types/${formValues.id}`, { method: 'PUT', data: values });
//                 message.success('Job Type updated successfully.');
//               } else {
//                 await request('/job-types', { method: 'POST', data: values });
//                 message.success('Job Type added successfully.');
//               }
//               setVisible(false);
//               tableActionRef.current?.reload();
//             } catch (error) {
//               message.error('Failed to save job type.');
//             }
//           }}
//         >
//           <ProFormText
//             name="job_type"
//             label="Job Type"
//             placeholder="Enter job type"
//             rules={[{ required: true, message: 'Job Type is required.' }]}
//           />
//         </ModalForm>
  
//         <ModalForm
//           title="Assign Tasks to Job Type"
//           visible={assignVisible}
//           onVisibleChange={setAssignVisible}
//           onFinish={async (values) => {
//             try {
//               await request('/assign-tasks', { method: 'POST', data: values });
//               message.success('Tasks assigned successfully.');
//               setAssignVisible(false);
//             } catch (error) {
//               message.error('Failed to assign tasks.');
//             }
//           }}
//         >
//           <ProFormSelect
//             name="job_area"
//             label="Job Area"
//             placeholder="Select job area"
//             options={jobAreas?.map((area: any) => ({
//               label: area.name,
//               value: area.id,
//             }))}
//             rules={[{ required: true, message: 'Job Area is required.' }]}
//           />
//           <ProFormSelect
//             name="task"
//             label="Task"
//             placeholder="Select task"
//             options={jobAreas?.map((area: any) => ({
//               label: area.task,
//               value: area.task_id,
//             }))}
//             rules={[{ required: true, message: 'Task is required.' }]}
//           />
//         </ModalForm>
//       </div>
//     );
//   };
  
//   export default Mapping;
  

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProFormText,
//   ProTable,
// } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Col,
//   Divider,
//   message,
//   Popconfirm,
//   Row,
//   Space,
//   Tooltip,
//   Typography,
// } from 'antd';
// import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import moment from 'moment';

// const { Title } = Typography;

// interface JobType {
//   id: string;
//   job_type: string;
//   created_by: string;
//   created_on: string;
//   modified_on: string;
// }

// const Mapping: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
//   const [jobTypes, setJobTypes] = useState<JobType[]>([]); // Initialize as an empty array

//   // Fetch job types on component mount
//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         if (Array.isArray(response.data)) {
//           setJobTypes(response.data);
//         } else {
//           message.error('Job types data is not in the expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };

//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record: JobType) => {
//     setFormValues(record);
//     setVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-types/${id}`, { method: 'DELETE' });
//       message.success('Job Type deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job type.');
//     }
//   };

//   const columns: ProColumns<JobType>[] = [
//     {
//       title: 'Job Type',
//       dataIndex: 'job_type',
//       key: 'job_type',
//       sorter: (a, b) => a.job_type.localeCompare(b.job_type),
//       render: (text) => <strong>{text}</strong>,
//     },
//     {
// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProFormText,
//   ProTable,
// } from '@ant-design/pro-components';
// import {
//   Button,
//   Card,
//   Col,
//   Divider,
//   message,
//   Popconfirm,
//   Row,
//   Space,
//   Tooltip,
//   Typography,
// } from 'antd';
// import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import moment from 'moment';

// const { Title } = Typography;

// interface JobType {
//   id: string;
//   job_type: string;
//   created_by: string;
//   created_on: string;
//   modified_on: string;
// }

// const Mapping: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
//   const [jobTypes, setJobTypes] = useState<JobType[]>([]); // Initialize as an empty array

//   // Fetch job types on component mount
//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         if (Array.isArray(response.data)) {
//           setJobTypes(response.data);
//         } else {
//           message.error('Job types data is not in the expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };

//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record: JobType) => {
//     setFormValues(record);
//     setVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-types/${id}`, { method: 'DELETE' });
//       message.success('Job Type deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job type.');
//     }
//   };

//   const columns: ProColumns<JobType>[] = [
//     {
//       title: 'Job Type',
//       dataIndex: 'job_type',
//       key: 'job_type',
//       sorter: (a, b) => a.job_type.localeCompare(b.job_type),
//       render: (text) => <strong>{text}</strong>,
//     },
//     {
//       title: 'Created By',
//       dataIndex: 'created_by',
//       key: 'created_by',
//       sorter: (a, b) => a.created_by.localeCompare(b.created_by),
//     },
//     {
//       title: 'Created On',
//       dataIndex: 'created_on',
//       key: 'created_on',
//       sorter: (a, b) => moment(a.created_on).unix() - moment(b.created_on).unix(),
//       render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       sorter: (a, b) => moment(a.modified_on).unix() - moment(b.modified_on).unix(),
//       render: (text: string) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//               type="link"
//               style={styles.actionButton}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job type?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button
//                 icon={<DeleteOutlined />}
//                 type="link"
//                 danger
//                 style={styles.actionButton}
//               />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       {/* Hero Section */}
//       <div style={styles.heroSection}>
//         <Title style={styles.heroTitle}>Job Types Management</Title>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setFormValues(undefined);
//             setVisible(true);
//           }}
//           style={styles.addJobTypeButton}
//         >
//           Add Job Type
//         </Button>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={16} style={styles.statsRow}>
//         <Col xs={24} sm={12} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Total Job Types</Title>
//             <Title level={2}>{jobTypes.length}</Title>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Latest Job Type</Title>
//             <Title level={5}>
//               {jobTypes.length > 0
//                 ? jobTypes[jobTypes.length - 1].job_type
//                 : 'N/A'}
//             </Title>
//           </Card>
//         </Col>
//         <Col xs={24} sm={24} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Last Modified</Title>
//             <Title level={5}>
//               {jobTypes.length > 0
//                 ? moment(jobTypes[jobTypes.length - 1].modified_on).format('DD-MMM-YYYY HH:mm')
//                 : 'N/A'}
//             </Title>
//           </Card>
//         </Col>
//       </Row>

//       {/* Job Types Table */}
//       <ProTable<JobType>
//         headerTitle="Job Types List"
//         actionRef={tableActionRef}
//         rowKey="id"
//         search={false}
//         pagination={{ pageSize: 10 }}
//         request={async (params) => {
//           try {
//             const response = await request('/job-types', { params });
//             return {
//               data: Array.isArray(response.data) ? response.data : [],
//               total: response.total || 0,
//             };
//           } catch (error) {
//             message.error('Failed to fetch job types.');
//             console.error(error);
//             return {
//               data: [],
//               total: 0,
//             };
//           }
//         }}
//         columns={columns}
//         toolBarRender={false}
//         bordered
//         style={styles.table}
//       />

//       {/* Add/Edit Job Type Modal */}
//       <ModalForm
//         title={formValues ? 'Edit Job Type' : 'Add Job Type'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         onFinish={async (values) => {
//           try {
//             if (formValues?.id) {
//               await request(`/job-types/${formValues.id}`, { method: 'PUT', data: values });
//               message.success('Job Type updated successfully.');
//             } else {
//               await request('/job-types', { method: 'POST', data: values });
//               message.success('Job Type added successfully.');
//             }
//             setVisible(false);
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save job type.');
//           }
//         }}
//         modalProps={{
//           destroyOnClose: true,
//         }}
//         layout="vertical"
//       >
//         <ProFormText
//           name="job_type"
//           label="Job Type"
//           placeholder="Enter job type"
//           rules={[{ required: true, message: 'Job Type is required.' }]}
//         />
//       </ModalForm>
//     </div>
//   );
// };

// // Inline Styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f4f6f9',
//     minHeight: '100vh',
//   },
//   heroSection: {
//     textAlign: 'center',
//     background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
//     color: 'white',
//     padding: '40px 20px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//   },
//   heroTitle: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   addJobTypeButton: {
//     backgroundColor: '#ff4d4f',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   statsRow: {
//     marginBottom: '20px',
//   },
//   statCard: {
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//   },
//   table: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   actionButton: {
//     padding: '0',
//   },
// };

// export default Mapping;
//       title: 'Created By',
//       dataIndex: 'created_by',
//       key: 'created_by',
//       sorter: (a, b) => a.created_by.localeCompare(b.created_by),
//     },
//     {
//       title: 'Created On',
//       dataIndex: 'created_on',
//       key: 'created_on',
//       sorter: (a, b) => moment(a.created_on).unix() - moment(b.created_on).unix(),
//       render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       sorter: (a, b) => moment(a.modified_on).unix() - moment(b.modified_on).unix(),
//       render: (text: string) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//               type="link"
//               style={styles.actionButton}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job type?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button
//                 icon={<DeleteOutlined />}
//                 type="link"
//                 danger
//                 style={styles.actionButton}
//               />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       {/* Hero Section */}
//       <div style={styles.heroSection}>
//         <Title style={styles.heroTitle}>Job Types Management</Title>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setFormValues(undefined);
//             setVisible(true);
//           }}
//           style={styles.addJobTypeButton}
//         >
//           Add Job Type
//         </Button>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={16} style={styles.statsRow}>
//         <Col xs={24} sm={12} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Total Job Types</Title>
//             <Title level={2}>{jobTypes.length}</Title>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Latest Job Type</Title>
//             <Title level={5}>
//               {jobTypes.length > 0
//                 ? jobTypes[jobTypes.length - 1].job_type
//                 : 'N/A'}
//             </Title>
//           </Card>
//         </Col>
//         <Col xs={24} sm={24} md={8}>
//           <Card style={styles.statCard}>
//             <Title level={4}>Last Modified</Title>
//             <Title level={5}>
//               {jobTypes.length > 0
//                 ? moment(jobTypes[jobTypes.length - 1].modified_on).format('DD-MMM-YYYY HH:mm')
//                 : 'N/A'}
//             </Title>
//           </Card>
//         </Col>
//       </Row>

//       {/* Job Types Table */}
//       <ProTable<JobType>
//         headerTitle="Job Types List"
//         actionRef={tableActionRef}
//         rowKey="id"
//         search={false}
//         pagination={{ pageSize: 10 }}
//         request={async (params) => {
//           try {
//             const response = await request('/job-types', { params });
//             return {
//               data: Array.isArray(response.data) ? response.data : [],
//               total: response.total || 0,
//             };
//           } catch (error) {
//             message.error('Failed to fetch job types.');
//             console.error(error);
//             return {
//               data: [],
//               total: 0,
//             };
//           }
//         }}
//         columns={columns}
//         toolBarRender={false}
//         bordered
//         style={styles.table}
//       />

//       {/* Add/Edit Job Type Modal */}
//       <ModalForm
//         title={formValues ? 'Edit Job Type' : 'Add Job Type'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         onFinish={async (values) => {
//           try {
//             if (formValues?.id) {
//               await request(`/job-types/${formValues.id}`, { method: 'PUT', data: values });
//               message.success('Job Type updated successfully.');
//             } else {
//               await request('/job-types', { method: 'POST', data: values });
//               message.success('Job Type added successfully.');
//             }
//             setVisible(false);
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save job type.');
//           }
//         }}
//         modalProps={{
//           destroyOnClose: true,
//         }}
//         layout="vertical"
//       >
//         <ProFormText
//           name="job_type"
//           label="Job Type"
//           placeholder="Enter job type"
//           rules={[{ required: true, message: 'Job Type is required.' }]}
//         />
//       </ModalForm>
//     </div>
//   );
// };

// // Inline Styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f4f6f9',
//     minHeight: '100vh',
//   },
//   heroSection: {
//     textAlign: 'center',
//     background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
//     color: 'white',
//     padding: '40px 20px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//   },
//   heroTitle: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   addJobTypeButton: {
//     backgroundColor: '#ff4d4f',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   statsRow: {
//     marginBottom: '20px',
//   },
//   statCard: {
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//   },
//   table: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   actionButton: {
//     padding: '0',
//   },
// };

// export default Mapping;



// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProFormText,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import {
//   Button,
//   Space,
//   Tooltip,
//   Popconfirm,
//   message,
//   Typography,
// } from 'antd';
// import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import moment from 'moment';

// const { Title } = Typography;

// interface JobType {
//   id: string;
//   job_type: string;
//   symbol: string;
//   created_by: string;
//   created_on: string;
//   modified_on: string;
//   status_id?: string;
// }

// const Mapping: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
//   const [jobTypes, setJobTypes] = useState<JobType[]>([]);
//   const [statuses, setStatuses] = useState<{ label: string; value: string }[]>([]);

//   // Fetch job types and statuses on component mount
//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         if (Array.isArray(response.data)) {
//           setJobTypes(response.data);
//         } else {
//           message.error('Job types data is not in the expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };

//     const fetchStatuses = async () => {
//       try {
//         const response = await request('/statuses');
//         if (Array.isArray(response.data)) {
//           setStatuses(response.data.map(status => ({
//             label: status.name,
//             value: status.id,
//           })));
//         } else {
//           message.error('Statuses data is not in the expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch statuses.');
//       }
//     };

//     fetchJobTypes();
//     fetchStatuses();
//   }, []);

//   const handleEdit = (record: JobType) => {
//     setFormValues(record);
//     setVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-types/${id}`, { method: 'DELETE' });
//       message.success('Job Type deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job type.');
//     }
//   };

//   const columns: ProColumns<JobType>[] = [
//     {
//       title: 'Job Type',
//       dataIndex: 'job_type',
//       key: 'job_type',
//       sorter: (a, b) => a.job_type.localeCompare(b.job_type),
//       render: (text) => <strong>{text}</strong>,
//     },
//     {
//       title: 'Symbol',
//       dataIndex: 'symbol',
//       key: 'symbol',
//     },
//     {
//       title: 'Created By',
//       dataIndex: 'created_by',
//       key: 'created_by',
//     },
//     {
//       title: 'Created On',
//       dataIndex: 'created_on',
//       key: 'created_on',
//       render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       render: (text: string) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//               type="link"
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job type?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button
//                 icon={<DeleteOutlined />}
//                 type="link"
//                 danger
//               />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       <div style={styles.heroSection}>
//         <Title style={styles.heroTitle}>Job Types Management</Title>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setFormValues(undefined);
//             setVisible(true);
//           }}
//         >
//           Add Job Type
//         </Button>
//       </div>

//       {/* Job Types Table */}
//       <ProTable<JobType>
//         headerTitle="Job Types List"
//         actionRef={tableActionRef}
//         rowKey="id"
//         search={false}
//         pagination={{ pageSize: 10 }}
//         request={async (params) => {
//           try {
//             const response = await request('/job-types', { params });
//             return {
//               data: Array.isArray(response.data) ? response.data : [],
//               total: response.total || 0,
//             };
//           } catch (error) {
//             message.error('Failed to fetch job types.');
//             return {
//               data: [],
//               total: 0,
//             };
//           }
//         }}
//         columns={columns}
//         toolBarRender={false}
//       />

//       {/* Add/Edit Job Type Modal */}
//       <ModalForm
//         title={formValues ? 'Edit Job Type' : 'Add Job Type'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         onFinish={async (values) => {
//           try {
//             const payload = {
//               name: values.job_type,
//               symbol: values.symbol,
//               // status_id: values.status_id,
//             };
//             if (formValues?.id) {
//               await request(`/job-types/${formValues.id}`, { method: 'PUT', data: payload });
//               message.success('Job Type updated successfully.');
//             } else {
//               await request('/job-types', { method: 'POST', data: payload });
//               message.success('Job Type added successfully.');
//             }
//             setVisible(false);
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save job type.');
//           }
//         }}
//         modalProps={{
//           destroyOnClose: true,
//         }}
//         layout="vertical"
//       >
//         <ProFormText
//           name="job_type"
//           label="Job Type"
//           placeholder="Enter job type"
//           rules={[{ required: true, message: 'Job Type is required.' }]}
//         />
//         <ProFormText
//           name="symbol"
//           label="Symbol"
//           placeholder="Enter symbol"
//           rules={[{ required: true, message: 'Symbol is required.' }]}
//         />
//         {/* <ProFormSelect
//           name="status_id"
//           label="Status"
//           placeholder="Select status"
//           options={statuses}
//           rules={[{ required: true, message: 'Status is required.' }]}
//         /> */}
//       </ModalForm>
//     </div>
//   );
// };

// // Inline Styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f4f6f9',
//     minHeight: '100vh',
//   },
//   heroSection: {
//     textAlign: 'center',
//     background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
//     color: 'white',
//     padding: '40px 20px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//   },
//   heroTitle: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
// };

// export default Mapping;

import React, { useRef, useState, useEffect } from 'react';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormText,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Space,
  Tooltip,
  Popconfirm,
  message,
  Typography,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from 'umi';
import moment from 'moment';

const { Title } = Typography;

interface JobType {
  id: string;
  name: string;
  symbol: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  status_id?: string;
}

const Mapping: React.FC = () => {
  const tableActionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
  const [statuses, setStatuses] = useState<{ label: string; value: string }[]>([]);

  // Fetch job types and statuses on component mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await request('/statuses');
        if (Array.isArray(response.data)) {
          setStatuses(
            response.data.map((status: any) => ({
              label: status.name,
              value: status.id,
            })),
          );
        } else {
          message.error('Statuses data is not in the expected format.');
        }
      } catch (error) {
        message.error('Failed to fetch statuses.');
      }
    };

    fetchStatuses();
  }, []);

  const handleEdit = (record: JobType) => {
    setFormValues(record);
    setVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await request(`/job-types/${id}`, { method: 'DELETE' });
      message.success('Job Type deleted successfully.');
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to delete job type.');
    }
  };

  const columns: ProColumns<JobType>[] = [
    {
      title: 'Job Type',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text: string) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              type="link"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this job type?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <Title style={styles.heroTitle}>Job Types Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFormValues(undefined);
            setVisible(true);
          }}
        >
          Add Job Type
        </Button>
      </div>

      {/* Job Types Table */}
      <ProTable<JobType>
        headerTitle="Job Types List"
        actionRef={tableActionRef}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        request={async (params) => {
          try {
            const response = await request('/job-types', { params });
            return {
              data: response.data.data || [],
              total: response.data.total || 0,
              success: true,
            };
          } catch (error) {
            message.error('Failed to fetch job types.');
            return {
              data: [],
              total: 0,
              success: false,
            };
          }
        }}
        columns={columns}
        toolBarRender={false}
      />

      {/* Add/Edit Job Type Modal */}
      <ModalForm
        title={formValues ? 'Edit Job Type' : 'Add Job Type'}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={async (values) => {
          try {
            const payload = {
              name: values.name,
              symbol: values.symbol,
            };
            if (formValues?.id) {
              await request(`/job-types/${formValues.id}`, { method: 'PUT', data: payload });
              message.success('Job Type updated successfully.');
            } else {
              await request('/job-types', { method: 'POST', data: payload });
              message.success('Job Type added successfully.');
            }
            setVisible(false);
            tableActionRef.current?.reload();
          } catch (error) {
            message.error('Failed to save job type.');
          }
        }}
        modalProps={{
          destroyOnClose: true,
        }}
        layout="vertical"
      >
        <ProFormText
          name="name"
          label="Job Type"
          placeholder="Enter job type"
          rules={[{ required: true, message: 'Job Type is required.' }]}
        />
        <ProFormText
          name="symbol"
          label="Symbol"
          placeholder="Enter symbol"
          rules={[{ required: true, message: 'Symbol is required.' }]}
        />
      </ModalForm>
    </div>
  );
};

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  heroSection: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
    color: 'white',
    padding: '40px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
};

export default Mapping;
