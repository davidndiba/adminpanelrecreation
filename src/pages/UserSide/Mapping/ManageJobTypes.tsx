

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
//   name: string;
//   symbol: string;
//   created_by: string;
//   created_at: string;
//   updated_at: string;
//   status_id?: string;
// }

// const Mapping: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<JobType | undefined>(undefined);
//   const [statuses, setStatuses] = useState<{ label: string; value: string }[]>([]);

//   // Fetch job types and statuses on component mount
//   useEffect(() => {
//     const fetchStatuses = async () => {
//       try {
//         const response = await request('/statuses');
//         if (Array.isArray(response.data)) {
//           setStatuses(
//             response.data.map((status: any) => ({
//               label: status.name,
//               value: status.id,
//             })),
//           );
//         } else {
//           message.error('Statuses data is not in the expected format.');
//         }
//       } catch (error) {
//         message.error('Failed to fetch statuses.');
//       }
//     };

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
//       dataIndex: 'name',
//       key: 'name',
//       sorter: (a, b) => a.name.localeCompare(b.name),
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
//       dataIndex: 'created_at',
//       key: 'created_at',
//       render: (text: string) => moment(text).format('DD-MMM-YYYY HH:mm'),
//     },
//     {
//       title: 'Modified On',
//       dataIndex: 'updated_at',
//       key: 'updated_at',
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
//               data: response.data.data || [],
//               total: response.data.total || 0,
//               success: true,
//             };
//           } catch (error) {
//             message.error('Failed to fetch job types.');
//             return {
//               data: [],
//               total: 0,
//               success: false,
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
//               name: values.name,
//               symbol: values.symbol,
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
//           name="name"
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
  ProColumns,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from 'umi';
import moment from 'moment';

const { Title, Paragraph } = Typography;

const JobTypeManagement: React.FC = () => {
  const tableActionRef = useRef<ActionType>();
  const [formValues, setFormValues] = useState(undefined);
  const [jobTypes, setJobTypes] = useState([]);
  const [newJobType, setNewJobType] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [statuses, setStatuses] = useState([]);

  // Fetch job types from the API
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await request('/job-types');
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        message.error('Failed to fetch job types.');
      }
    };
    fetchJobTypes();
  }, []);

  // Handle editing of a job type
  const handleEdit = (record) => {
    setFormValues(record);
    setNewJobType(record.name);
    setNewSymbol(record.symbol);
    setSelectedStatus(record.status_id);
  };

  // Handle deletion of a job type
  const handleDelete = async (id) => {
    try {
      await request(`/job-types/${id}`, { method: 'DELETE' });
      message.success('Job type deleted successfully.');
      setJobTypes(jobTypes.filter(jobType => jobType.id !== id)); // Remove job type from state
    } catch (error) {
      message.error('Failed to delete job type.');
    }
  };

  // Handle adding a new job type
  const handleAddJobType = async () => {
    if (!newJobType || !newSymbol) {
      message.error('Both Job Type Name and Symbol are required.');
      return;
    }
    try {
      const response = await request(`/job-types`, {
        method: 'POST',
        data: {
          name: newJobType,
          symbol: newSymbol,
          status_id: selectedStatus,
        },
      });

      if (response.success) {
        setJobTypes([...jobTypes, response.data]);
        message.success('Job type added successfully.');
        setNewJobType('');
        setNewSymbol('');
        setSelectedStatus(undefined);
      } else {
        message.error('Failed to add job type.');
      }
    } catch (error) {
      message.error('Failed to add job type.');
    }
  };

  // Define columns for the table
  const columns: ProColumns[] = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Job Type',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_on',
      render: (text) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'updated_on',
      render: (text) => (text ? moment(text).format('DD-MMM-YYYY HH:mm') : 'N/A'),
      sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
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
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: '20px' }}>
        {/* <Title level={3}>Home / Job Types</Title> */}
        <Title level={2} style={{ marginBottom: '0' }}>Job Types</Title>
        <Paragraph>Job Types are linked to job areas and lines.</Paragraph>
      </div>

      <Row gutter={16}>
        <Col span={16}>
          <ProTable
            actionRef={tableActionRef}
            rowKey="id"
            dataSource={jobTypes}
            columns={columns}
            bordered
            search={false}
            pagination={{ pageSize: 15 }}
            // Important: Ensure you have the editable features enabled if needed
            // editable={{ type: 'multiple' }} // Uncomment if you need inline editing
          />
        </Col>
        <Col span={8} style={{ paddingLeft: '20px' }}>
          <Card title="Add Job Type" bordered={true}>
            <ProFormText
              label="Job Type Name"
              placeholder="Enter Job Type Name"
              value={newJobType}
              onChange={(e) => setNewJobType(e.target.value)}
            />
            <ProFormText
              label="Symbol"
              placeholder="Enter Symbol"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
            />
            <Button type="primary" onClick={handleAddJobType} style={{ marginTop: '20px' }}>
              Add Job Type
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobTypeManagement;
