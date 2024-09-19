// import {
//     ActionType,
//     ModalForm,
//     ProColumns,
//     ProFormText,
//     ProTable,
//   } from '@ant-design/pro-components';
//   import {
//     Button,
//     Card,
//     Col,
//     Divider,
//     message,
//     Popconfirm,
//     Row,
//     Space,
//     Tooltip,
//     Typography,
//   } from 'antd';
//   import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//   import React, { useRef, useState } from 'react';
//   import moment from 'moment';
//   import { request } from 'umi';
  
//   const { Title } = Typography;
  
//   interface JobArea {
//     id: string;
//     job_area: string;
//     job_type: string;
//     modified_by: string;
//     modified_on: string | null;
//   }
  
//   const JobAreas: React.FC = () => {
//     const tableActionRef = useRef<ActionType>();
//     const [visible, setVisible] = useState(false);
//     const [formValues, setFormValues] = useState<JobArea | undefined>(undefined);
  
//     const handleEdit = (record: JobArea) => {
//       setFormValues(record);
//       setVisible(true);
//     };
  
//     const handleDelete = async (id: string) => {
//       try {
//         await request(`/job-lines/${id}`, { method: 'DELETE' });
//         message.success('Job Area deleted successfully.');
//         tableActionRef.current?.reload();
//       } catch (error) {
//         message.error('Failed to delete job area.');
//       }
//     };
  
//     const columns: ProColumns<JobArea>[] = [
//       {
//         title: 'Job Areas',
//         dataIndex: 'job_area',
//         key: 'job_area',
//       },
//       {
//         title: 'Job Types',
//         dataIndex: 'job_type',
//         key: 'job_type',
//       },
//       {
//         title: 'Modified By',
//         dataIndex: 'modified_by',
//         key: 'modified_by',
//       },
//       {
//         title: 'Modified On',
//         dataIndex: 'modified_on',
//         key: 'modified_on',
//         render: (text: string | null) => (text ? moment(text).format('DD-MMM-YYYY hh:mm A') : 'N/A'),
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
//                 title="Are you sure you want to delete this job area?"
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
//       <div style={{ padding: '20px' }}>
//         <Row gutter={16} style={{ marginBottom: '20px' }}>
//           <Col span={24}>
//             <Card bordered style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
//               <Title level={3} style={{ color: '#1890ff' }}>Job Areas Management</Title>
//               <Divider />
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => {
//                   setFormValues(undefined);
//                   setVisible(true);
//                 }}
//                 style={{ width: '200px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//               >
//                 Add Job Area
//               </Button>
//             </Card>
//           </Col>
//         </Row>
  
//         <ProTable<JobArea>
//           headerTitle="Job Areas List"
//           actionRef={tableActionRef}
//           rowKey="id"
//           search={false}
//           pagination={{ pageSize: 10 }}
//           request={async (params) => {
//             try {
//               const response = await request(`/job-areas`, { params });
//               return {
//                 data: Array.isArray(response.data) ? response.data : [],
//                 total: response.total || 0,
//               };
//             } catch (error) {
//               message.error('Failed to fetch job areas.');
//               console.error(error);
//               return {
//                 data: [],
//                 total: 0,
//               };
//             }
//           }}
//           columns={columns}
//           toolBarRender={false}
//           bordered
//           style={{ backgroundColor: '#fff', borderRadius: '4px' }}
//         />
  
//         <ModalForm
//           title={formValues ? 'Edit Job Area' : 'Add Job Area'}
//           visible={visible}
//           onVisibleChange={setVisible}
//           onFinish={async (values) => {
//             try {
//               if (formValues?.id) {
//                 await request(`/job-lines/${formValues.id}`, { method: 'PUT', data: values });
//                 message.success('Job Area updated successfully.');
//               } else {
//                 await request(`/job-lines`, { method: 'POST', data: values });
//                 message.success('Job Area added successfully.');
//               }
//               setVisible(false);
//               tableActionRef.current?.reload();
//             } catch (error) {
//               message.error('Failed to save job area.');
//             }
//           }}
//         >
//           <ProFormText
//             name="job_area"
//             label="Job Area"
//             placeholder="Enter job area"
//             rules={[{ required: true, message: 'Job Area is required.' }]}
//           />
//           <ProFormText
//             name="job_type"
//             label="Job Type"
//             placeholder="Enter job type"
//             rules={[{ required: true, message: 'Job Type is required.' }]}
//           />
//         </ModalForm>
//       </div>
//     );
//   };
  
//   export default JobAreas;
  

// import {
//     ActionType,
//     ModalForm,
//     ProColumns,
//     ProFormText,
//     ProFormSelect,
//     ProTable,
//   } from '@ant-design/pro-components';
//   import {
//     Button,
//     Card,
//     Col,
//     Divider,
//     message,
//     Popconfirm,
//     Row,
//     Space,
//     Tooltip,
//     Typography,
//   } from 'antd';
//   import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//   import React, { useRef, useState, useEffect } from 'react';
//   import moment from 'moment';
//   import { request } from 'umi';
  
//   const { Title } = Typography;
  
//   interface JobArea {
//     id: string;
//     job_area: string;
//     job_type: string;
//     modified_by: string;
//     modified_on: string | null;
//   }
  
//   const JobAreas: React.FC = () => {
//     const tableActionRef = useRef<ActionType>();
//     const [visible, setVisible] = useState(false);
//     const [formValues, setFormValues] = useState<JobArea | undefined>(undefined);
//     const [jobTypes, setJobTypes] = useState<{ id: string; name: string }[]>([]); // Initialize as an empty array
  
//     // Fetch job types on component mount
//     useEffect(() => {
//       const fetchJobTypes = async () => {
//         try {
//           const response = await request('/job-types');
//           if (Array.isArray(response.data)) {
//             setJobTypes(response.data);
//           } else {
//             message.error('Job types data is not in expected format.');
//           }
//         } catch (error) {
//           message.error('Failed to fetch job types.');
//         }
//       };
  
//       fetchJobTypes();
//     }, []);
  
//     const handleEdit = (record: JobArea) => {
//       setFormValues(record);
//       setVisible(true);
//     };
  
//     const handleDelete = async (id: string) => {
//       try {
//         await request(`/job-lines/${id}`, { method: 'DELETE' });
//         message.success('Job Area deleted successfully.');
//         tableActionRef.current?.reload();
//       } catch (error) {
//         message.error('Failed to delete job area.');
//       }
//     };
  
//     const columns: ProColumns<JobArea>[] = [
//       {
//         title: 'Job Areas',
//         dataIndex: 'job_area',
//         key: 'job_area',
//       },
//       {
//         title: 'Job Types',
//         dataIndex: 'job_type',
//         key: 'job_type',
//       },
//       {
//         title: 'Modified By',
//         dataIndex: 'modified_by',
//         key: 'modified_by',
//       },
//       {
//         title: 'Modified On',
//         dataIndex: 'modified_on',
//         key: 'modified_on',
//         render: (text: string | null) => (text ? moment(text).format('DD-MMM-YYYY hh:mm A') : 'N/A'),
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
//                 title="Are you sure you want to delete this job area?"
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
//       <div style={{ padding: '20px' }}>
//         <Row gutter={16} style={{ marginBottom: '20px' }}>
//           <Col span={24}>
//             <Card bordered style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
//               <Title level={3} style={{ color: '#1890ff' }}>Job Areas Management</Title>
//               <Divider />
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => {
//                   setFormValues(undefined);
//                   setVisible(true);
//                 }}
//                 style={{ width: '200px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//               >
//                 Add Job Area
//               </Button>
//             </Card>
//           </Col>
//         </Row>
  
//         <ProTable<JobArea>
//           headerTitle="Job Areas List"
//           actionRef={tableActionRef}
//           rowKey="id"
//           search={false}
//           pagination={{ pageSize: 10 }}
//           request={async (params) => {
//             try {
//               const response = await request(`/job-areas`, { params });
//               return {
//                 data: Array.isArray(response.data) ? response.data : [],
//                 total: response.total || 0,
//               };
//             } catch (error) {
//               message.error('Failed to fetch job areas.');
//               console.error(error);
//               return {
//                 data: [],
//                 total: 0,
//               };
//             }
//           }}
//           columns={columns}
//           toolBarRender={false}
//           bordered
//           style={{ backgroundColor: '#fff', borderRadius: '4px' }}
//         />
  
//         <ModalForm
//           title={formValues ? 'Edit Job Area' : 'Add Job Area'}
//           visible={visible}
//           onVisibleChange={setVisible}
//           onFinish={async (values) => {
//             try {
//               if (formValues?.id) {
//                 await request(`/job-lines/${formValues.id}`, { method: 'PUT', data: values });
//                 message.success('Job Area updated successfully.');
//               } else {
//                 await request(`/job-lines`, { method: 'POST', data: values });
//                 message.success('Job Area added successfully.');
//               }
//               setVisible(false);
//               tableActionRef.current?.reload();
//             } catch (error) {
//               message.error('Failed to save job area.');
//             }
//           }}
//         >
//           <ProFormText
//             name="job_area"
//             label="Job Area"
//             placeholder="Enter job area"
//             rules={[{ required: true, message: 'Job Area is required.' }]}
//           />
//           <ProFormSelect
//             name="job_type"
//             label="Job Type"
//             placeholder="Select job type"
//             options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//             rules={[{ required: true, message: 'Job Type is required.' }]}
//           />
//         </ModalForm>
//       </div>
//     );
//   };
  
//   export default JobAreas;
  

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProFormText,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography } from 'antd';
// import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';

// const { Title } = Typography;

// const JobAreas: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState(undefined);
//   const [jobTypes, setJobTypes] = useState([]);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         if (Array.isArray(response.data)) {
//           setJobTypes(response.data);
//         } else {
//           message.error('Job types data is not in expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record) => {
//     setFormValues(record);
//     setVisible(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Job Area deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job area.');
//     }
//   };

//   const columns: ProColumns[] = [
//     {
//       title: 'Job Areas',
//       dataIndex: 'job_area',
//       key: 'job_area',
//     },
//     {
//       title: 'Job Types',
//       dataIndex: 'job_type',
//       key: 'job_type',
//     },
//     {
//       title: 'Modified By',
//       dataIndex: 'modified_by',
//       key: 'modified_by',
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job area?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       <div style={styles.heroSection}>
//         <Title style={styles.heroTitle}>Job Areas Management</Title>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setFormValues(undefined);
//             setVisible(true);
//           }}
//           style={styles.addJobAreaButton}
//         >
//           Add Job Area
//         </Button>
//       </div>

//       <Row gutter={16}>
//         <Col span={12}>
//           <Card style={styles.statCard}>Total Job Areas: {/* Fetch and display total */}</Card>
//         </Col>
//         <Col span={12}>
//           <Card style={styles.statCard}>Active Job Types: {/* Fetch and display active job types */}</Card>
//         </Col>
//       </Row>

//       <ProTable
//         actionRef={tableActionRef}
//         rowKey="id"
//         request={async (params) => {
//           try {
//             const response = await request(`/job-areas`, { params });
//             return {
//               data: Array.isArray(response.data) ? response.data : [],
//               total: response.total || 0,
//             };
//           } catch (error) {
//             message.error('Failed to fetch job areas.');
//             return { data: [], total: 0 };
//           }
//         }}
//         columns={columns}
//         bordered
//         style={styles.table}
//         search={false}
//       />

//       <ModalForm
//         title={formValues ? 'Edit Job Area' : 'Add Job Area'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         onFinish={async (values) => {
//           try {
//             if (formValues?.id) {
//               await request(`/job-lines/${formValues.id}`, { method: 'PUT', data: values });
//               message.success('Job Area updated successfully.');
//             } else {
//               await request(`/job-lines`, { method: 'POST', data: values });
//               message.success('Job Area added successfully.');
//             }
//             setVisible(false);
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save job area.');
//           }
//         }}
//       >
//         <ProFormText
//           name="job_area"
//           label="Job Area"
//           placeholder="Enter job area"
//           rules={[{ required: true, message: 'Job Area is required.' }]}
//         />
//         <ProFormSelect
//           name="job_type"
//           label="Job Type"
//           placeholder="Select job type"
//           options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//           rules={[{ required: true, message: 'Job Type is required.' }]}
//         />
//       </ModalForm>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f4f6f9',
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
//   addJobAreaButton: {
//     backgroundColor: '#ff4d4f',
//     border: 'none',
//     borderRadius: '4px',
//   },
//   statCard: {
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//     marginBottom: '20px',
//     fontSize: '20px',
//   },
//   table: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//   },
// };

// export default JobAreas;
// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ProColumns,
//   ProFormText,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';

// const { Title } = Typography;

// const JobAreas: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [formValues, setFormValues] = useState(undefined);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [newJobArea, setNewJobArea] = useState('');
//   const [selectedJobType, setSelectedJobType] = useState(undefined);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         setJobTypes(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record) => {
//     setFormValues(record);
//     setNewJobArea(record.job_area);
//     setSelectedJobType(record.job_type);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Job Area deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job area.');
//     }
//   };

//   const columns: ProColumns[] = [
//     {
//       title: 'Job Areas',
//       dataIndex: 'job_area',
//       key: 'job_area',
//       sorter: (a, b) => a.job_area.localeCompare(b.job_area), // Sort alphabetically
//     },
//     {
//       title: 'Job Types',
//       dataIndex: 'job_type',
//       key: 'job_type',
//       sorter: (a, b) => a.job_type.localeCompare(b.job_type), // Sort alphabetically
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
//       sorter: (a, b) => new Date(a.modified_on).getTime() - new Date(b.modified_on).getTime(), // Sort by date
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job area?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const handleAddJobArea = async () => {
//     if (!newJobArea || !selectedJobType) {
//       message.error('Both fields are required.');
//       return;
//     }
//     try {
//       await request(`/job-lines`, {
//         method: 'POST',
//         data: {
//           job_area: newJobArea,
//           job_type: selectedJobType,
//         },
//       });
//       message.success('Job Area added successfully.');
//       setNewJobArea('');
//       setSelectedJobType(undefined);
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to add job area.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Job Areas Management</Title>

//       <Row gutter={16}>
//         <Col span={16}>
//           <ProTable
//             actionRef={tableActionRef}
//             rowKey="id"
//             request={async (params) => {
//               try {
//                 const response = await request(`/job-areas`, { params });
//                 return {
//                   data: Array.isArray(response.data) ? response.data : [],
//                   total: response.total || 0,
//                 };
//               } catch (error) {
//                 message.error('Failed to fetch job areas.');
//                 return { data: [], total: 0 };
//               }
//             }}
//             columns={columns}
//             bordered
//             search={false}
//           />
//         </Col>
//         <Col span={8} style={{ paddingLeft: '20px' }}>
//           <Title level={4}>Add Job Area</Title>
//           <div>
//             <label>Job Area</label>
//             <ProFormText
//               value={newJobArea}
//               onChange={(e) => setNewJobArea(e.target.value)}
//               placeholder="Enter job area"
//               rules={[{ required: true, message: 'Job Area is required.' }]}
//             />
//           </div>
//           <div style={{ marginTop: '10px' }}>
//             <label>Job Type</label>
//             <ProFormSelect
//               value={selectedJobType}
//               onChange={(value) => setSelectedJobType(value)}
//               options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//               rules={[{ required: true, message: 'Job Type is required.' }]}
//             />
//           </div>
//           <Button
//             type="primary"
//             onClick={handleAddJobArea}
//             style={{ marginTop: '20px' }}
//           >
//             Add Job Area
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default JobAreas;
// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ProColumns,
//   ProFormText,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';

// const { Title } = Typography;

// const JobAreas: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [formValues, setFormValues] = useState(undefined);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [newJobArea, setNewJobArea] = useState('');
//   const [selectedJobType, setSelectedJobType] = useState(undefined);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         // Access the 'data.data' field to get the actual job types array
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record) => {
//     setFormValues(record);
//     setNewJobArea(record.job_area);
//     setSelectedJobType(record.job_type);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Job Area deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job area.');
//     }
//   };

//   const columns: ProColumns[] = [
//     {
//       title: 'Job Areas',
//       dataIndex: 'job_area',
//       key: 'job_area',
//       sorter: (a, b) => a.job_area.localeCompare(b.job_area), // Sort alphabetically
//     },
//     {
//       title: 'Job Types',
//       dataIndex: 'job_type',
//       key: 'job_type',
//       sorter: (a, b) => a.job_type.localeCompare(b.job_type), // Sort alphabetically
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'modified_on',
//       key: 'modified_on',
//       render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
//       sorter: (a, b) => new Date(a.modified_on).getTime() - new Date(b.modified_on).getTime(), // Sort by date
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job area?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const handleAddJobArea = async () => {
//     if (!newJobArea || !selectedJobType) {
//       message.error('Both fields are required.');
//       return;
//     }
//     try {
//       await request(`/job-areas`, {
//         method: 'POST',
//         data: {
//           name: newJobArea,
//           job_type_id   : selectedJobType,
//         },
//       });
//       message.success('Job Area added successfully.');
//       setNewJobArea('');
//       setSelectedJobType(undefined);
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to add job area.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Job Areas Management</Title>

//       <Row gutter={16}>
//         <Col span={16}>
//           <ProTable
//             actionRef={tableActionRef}
//             rowKey="id"
//             request={async (params) => {
//               try {
//                 const response = await request(`/job-areas`, { params });
//                 return {
//                   data: Array.isArray(response.data) ? response.data : [],
//                   total: response.total || 0,
//                 };
//               } catch (error) {
//                 message.error('Failed to fetch job areas.');
//                 return { data: [], total: 0 };
//               }
//             }}
//             columns={columns}
//             bordered
//             search={false}
//           />
//         </Col>
//         <Col span={8} style={{ paddingLeft: '20px' }}>
//           <Title level={4}>Add Job Area</Title>
//           <div>
//             <label>Job Area</label>
//             <ProFormText
//               value={newJobArea}
//               onChange={(e) => setNewJobArea(e.target.value)}
//               placeholder="Enter job area"
//               rules={[{ required: true, message: 'Job Area is required.' }]}
//             />
//           </div>
//           <div style={{ marginTop: '10px' }}>
//             <label>Job Type</label>
//             <ProFormSelect
//               value={selectedJobType}
//               onChange={(value) => setSelectedJobType(value)}
//               options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//               rules={[{ required: true, message: 'Job Type is required.' }]}
//             />
//           </div>
//           <Button
//             type="primary"
//             onClick={handleAddJobArea}
//             style={{ marginTop: '20px' }}
//           >
//             Add Job Area
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default JobAreas;


// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActionType,
//   ProColumns,
//   ProFormText,
//   ProFormSelect,
//   ProTable,
// } from '@ant-design/pro-components';
// import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { request } from 'umi';

// const { Title } = Typography;

// const JobAreas: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [formValues, setFormValues] = useState(undefined);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [newJobArea, setNewJobArea] = useState('');
//   const [selectedJobType, setSelectedJobType] = useState(undefined);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         // Access the 'data.data' field to get the actual job types array
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);

//   const handleEdit = (record) => {
//     setFormValues(record);
//     setNewJobArea(record.job_area);
//     setSelectedJobType(record.job_type);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await request(`/job-areas/${id}`, { method: 'DELETE' });
//       message.success('Job Area deleted successfully.');
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete job area.');
//     }
//   };

//   const columns: ProColumns[] = [
//     {
//       title: 'Job Areas',
//       dataIndex: 'name', // Updated to 'name' to match the response structure
//       key: 'job_area',
//       sorter: (a, b) => a.name.localeCompare(b.name), // Sort alphabetically by job area name
//     },
//     {
//       title: 'Job Types',
//       dataIndex: 'job_type', // Assuming the job_type field exists in the data or can be formatted
//       key: 'job_type',
//       sorter: (a, b) => a.job_type?.localeCompare(b.job_type), // Sort alphabetically
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'updated_at',
//       key: 'modified_on',
//       render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
//       sorter: (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(), // Sort by date
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this job area?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const handleAddJobArea = async () => {
//     if (!newJobArea || !selectedJobType) {
//       message.error('Both fields are required.');
//       return;
//     }
//     try {
//       await request(`/job-areas`, {
//         method: 'POST',
//         data: {
//           name: newJobArea,
//           job_type_id: selectedJobType,
//         },
//       });
//       message.success('Job Area added successfully.');
//       setNewJobArea('');
//       setSelectedJobType(undefined);
//       tableActionRef.current?.reload(); // Reload the table to show the new job area
//     } catch (error) {
//       message.error('Failed to add job area.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Job Areas Management</Title>

//       <Row gutter={16}>
//         <Col span={16}>
//           <ProTable
//             actionRef={tableActionRef}
//             rowKey="id"
//             request={async (params) => {
//               try {
//                 const response = await request(`/job-areas`, { params });
//                 return {
//                   data: response.data.data || [], // Correctly access the job areas
//                   total: response.data.total || 0, // Access the total count for pagination
//                   success: true,
//                 };
//               } catch (error) {
//                 message.error('Failed to fetch job areas.');
//                 return { data: [], total: 0 };
//               }
//             }}
//             columns={columns}
//             bordered
//             search={false}
//             pagination={{ pageSize: 15 }} // Set pagination size to 15
//           />
//         </Col>
//         <Col span={8} style={{ paddingLeft: '20px' }}>
//           <Title level={4}>Add Job Area</Title>
//           <div>
//             <label>Job Area</label>
//             <ProFormText
//               value={newJobArea}
//               onChange={(e) => setNewJobArea(e.target.value)}
//               placeholder="Enter job area"
//               rules={[{ required: true, message: 'Job Area is required.' }]}
//             />
//           </div>
//           <div style={{ marginTop: '10px' }}>
//             <label>Job Type</label>
//             <ProFormSelect
//               value={selectedJobType}
//               onChange={(value) => setSelectedJobType(value)}
//               options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//               rules={[{ required: true, message: 'Job Type is required.' }]}
//             />
//           </div>
//           <Button
//             type="primary"
//             onClick={handleAddJobArea}
//             style={{ marginTop: '20px' }}
//           >
//             Add Job Area
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default JobAreas;
import React, { useRef, useState, useEffect } from 'react';
import {
  ActionType,
  ProColumns,
  ProFormText,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from 'umi';

const { Title } = Typography;
const { TabPane } = Tabs;

const JobAreas: React.FC = () => {
  const tableActionRef = useRef<ActionType>();
  const [formValues, setFormValues] = useState(undefined);
  const [jobTypes, setJobTypes] = useState([]);
  const [newJobArea, setNewJobArea] = useState('');
  const [selectedJobType, setSelectedJobType] = useState(undefined);
  const [activeJobType, setActiveJobType] = useState(undefined);
  const [filteredJobAreas, setFilteredJobAreas] = useState([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await request('/job-types');
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
        // Set the default active job type
        if (response.data.data.length > 0) {
          setActiveJobType(response.data.data[0].id);
        }
      } catch (error) {
        message.error('Failed to fetch job types.');
      }
    };
    fetchJobTypes();
  }, []);

  useEffect(() => {
    const fetchJobAreas = async () => {
      try {
        const response = await request(`/job-areas`);
        // Filter job areas based on the selected job type
        const areas = response.data.data || [];
        const filteredAreas = areas.filter(area => area.job_type_id === activeJobType);
        setFilteredJobAreas(filteredAreas);
      } catch (error) {
        message.error('Failed to fetch job areas.');
      }
    };
    if (activeJobType) {
      fetchJobAreas();
    }
  }, [activeJobType]);

  const handleEdit = (record) => {
    setFormValues(record);
    setNewJobArea(record.name);
    setSelectedJobType(record.job_type_id);
  };

  const handleDelete = async (id) => {
    try {
      await request(`/job-areas/${id}`, { method: 'DELETE' });
      message.success('Job Area deleted successfully.');
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to delete job area.');
    }
  };

  const columns: ProColumns[] = [
    {
      title: 'Job Areas',
      dataIndex: 'name',
      key: 'job_area',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'modified_on',
      render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
      sorter: (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this job area?"
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

  const handleAddJobArea = async () => {
    if (!newJobArea || !selectedJobType) {
      message.error('Both fields are required.');
      return;
    }
    try {
      await request(`/job-areas`, {
        method: 'POST',
        data: {
          name: newJobArea,
          job_type_id: selectedJobType,
        },
      });
      message.success('Job Area added successfully.');
      setNewJobArea('');
      setSelectedJobType(undefined);
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to add job area.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Job Areas Management</Title>

      <Tabs activeKey={activeJobType} onChange={setActiveJobType}>
        {jobTypes.map(type => (
          <TabPane tab={type.name} key={type.id}>
            {/* The tab content can be customized further if needed */}
          </TabPane>
        ))}
      </Tabs>

      <Row gutter={16}>
        <Col span={16}>
          <ProTable
            actionRef={tableActionRef}
            rowKey="id"
            dataSource={filteredJobAreas}
            columns={columns}
            bordered
            search={false}
            pagination={{ pageSize: 15 }}
          />
        </Col>
        <Col span={8} style={{ paddingLeft: '20px' }}>
          <Title level={4}>Add Job Area</Title>
          <div>
            <label>Job Area</label>
            <ProFormText
              value={newJobArea}
              onChange={(e) => setNewJobArea(e.target.value)}
              placeholder="Enter job area"
              rules={[{ required: true, message: 'Job Area is required.' }]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Job Type</label>
            <ProFormSelect
              value={selectedJobType}
              onChange={(value) => setSelectedJobType(value)}
              options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
              rules={[{ required: true, message: 'Job Type is required.' }]}
            />
          </div>
          <Button
            type="primary"
            onClick={handleAddJobArea}
            style={{ marginTop: '20px' }}
          >
            Add Job Area
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default JobAreas;
