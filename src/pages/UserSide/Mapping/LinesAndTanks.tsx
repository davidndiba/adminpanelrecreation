
// import React, { useEffect, useRef, useState } from 'react';
// import { ActionType, ProColumns, ProFormText, ProFormSelect, ProTable } from '@ant-design/pro-components';
// import { Button, Card, Divider, message, Popconfirm, Row, Space, Tooltip, Typography, Tabs, Col } from 'antd';
// import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
// import { request } from 'umi';

// const { Title } = Typography;
// const { TabPane } = Tabs;

// interface LineTank {
//   id: string;
//   job_area_id: string;
//   tank: string;
//   created_on: string;
//   job_type_id: string;
// }

// const LinesAndTanks: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [data, setData] = useState<LineTank[]>([]);
//   const [total, setTotal] = useState(0);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [activeJobType, setActiveJobType] = useState<string | undefined>(undefined);
//   const [newTank, setNewTank] = useState({ job_area_id: '', name: '', job_type_id: '' });

//   // Fetch job types and set default
//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//         if (response.data.data.length > 0) {
//           setActiveJobType(response.data.data[0].id);
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);

//   // Fetch job areas based on selected job type
//   useEffect(() => {
//     const fetchJobAreas = async () => {
//       if (!activeJobType) return;
//       try {
//         const response = await request(`/job-areas?job_type_id=${activeJobType}`);
//         setJobAreas(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         message.error('Failed to fetch job areas.');
//       }
//     };
//     fetchJobAreas();
//   }, [activeJobType]);

//   // Fetch lines and tanks data
//   const fetchData = async (params: any) => {
//     try {
//       const response = await request('/job-lines', { params });
//       if (Array.isArray(response.data)) {
//         setData(response.data);
//         setTotal(response.total || response.data.length);
//       } else {
//         setData([]);
//         setTotal(0);
//       }
//     } catch (error) {
//       setData([]);
//       setTotal(0);
//     }
//   };

//   useEffect(() => {
//     fetchData({});
//   }, []);

//   // Handle Add Tank
//   const handleAddTank = async () => {
//     try {
//       await request('/job-lines', { method: 'POST', data: newTank });
//       message.success('Line/Tank added successfully.');
//       fetchData({});
//       setNewTank({ job_area_id: '', name: '', job_type_id: '' });
//     } catch (error) {
//       message.error('Failed to add line/tank.');
//     }
//   };

//   // Delete line/tank
//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Line/Tank deleted successfully.');
//       fetchData({});
//     } catch (error) {
//       message.error('Failed to delete line/tank.');
//     }
//   };

//   // Define table columns
//   const columns: ProColumns<LineTank>[] = [
//     {
//       title: 'Job Area',
//       dataIndex: 'job_area',
//       key: 'job_area_id',
//     },
//     {
//       title: 'Tank',
//       dataIndex: 'name',
//       key: 'tank',
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'created_on',
//       key: 'created_on',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button icon={<EditOutlined />} type="link" />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this line/tank?"
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
//     <div style={{ padding: '20px', backgroundColor: '#fff' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Lines & Tanks</Title>
      
//       <Tabs activeKey={activeJobType} onChange={setActiveJobType}>
//         {jobTypes.map(type => (
//           <TabPane tab={type.name} key={type.id} />
//         ))}
//       </Tabs>

//       <Row gutter={16} style={{ marginTop: '20px' }}>
//         <Col span={16}>
//           <ProTable<LineTank>
//             headerTitle="Lines and Tanks"
//             actionRef={tableActionRef}
//             rowKey="id"
//             dataSource={data}
//             columns={columns}
//             pagination={{ total, pageSize: 10 }}
//             bordered
//             search={false}
//           />
//         </Col>

//         <Col span={8}>
//           <Card bordered={false}>
//             <Title level={4}>Add a New Line/Tank</Title>
//             <ProFormSelect
//               name="job_type_id"
//               label="Job Type"
//               options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//               onChange={value => setNewTank({ ...newTank, job_type_id: value })}
//               rules={[{ required: true, message: 'Job Type is required.' }]}
//               style={{ marginBottom: '10px' }}
//             />
//             <ProFormSelect
//               name="job_area"
//               label="Job Area"
//               options={jobAreas.map(area => ({ label: area.name, value: area.id }))}
//               onChange={value => setNewTank({ ...newTank, job_area_id: value })}
//               rules={[{ required: true, message: 'Job Area is required.' }]}
//               style={{ marginBottom: '10px' }}
//             />
//             <ProFormText
//               name="tank"
//               label="Tank"
//               value={newTank.tank}
//               onChange={e => setNewTank({ ...newTank, name: e.target.value })}
//               placeholder="Enter tank"
//               rules={[{ required: true, message: 'Tank is required.' }]}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={handleAddTank}
//               style={{ width: '100%', marginTop: '10px' }}
//             >
//               Add Line/Tank
//             </Button>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default LinesAndTanks;
import React, { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Select, Button, Space, message, Popconfirm } from 'antd';
import request, { useRequest } from 'umi'; // Assuming you're using Umi for API calls
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const JobManagement = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [jobAreas, setJobAreas] = useState([]);
  const [jobLines, setJobLines] = useState([]);
  const [activeJobType, setActiveJobType] = useState(null);
  const [activeJobArea, setActiveJobArea] = useState(null);
  
  useEffect(() => {
    fetchJobTypes();
  }, []);

  useEffect(() => {
    if (activeJobType) {
      fetchJobAreas(activeJobType);
    }
  }, [activeJobType]);

  useEffect(() => {
    if (activeJobArea) {
      fetchJobLines(activeJobArea);
    }
  }, [activeJobArea]);

  const fetchJobTypes = async () => {
    try {
      const response = await useRequest('https://planner-dev-backend.microvision.co.ke/api/v1/job-types');
      setJobTypes(response.data.data || []);
      if (response.data.data.length > 0) {
        setActiveJobType(response.data.data[0].id); // Set default job type
      }
    } catch (error) {
      message.error('Failed to fetch job types.');
    }
  };

  const fetchJobAreas = async (jobTypeId) => {
    if (!jobTypeId) return;
    try {
      const response = await useRequest(`https://planner-dev-backend.microvision.co.ke/api/v1/job-types/${jobTypeId}`);
      setJobAreas(response.data.job_areas || []);
      if (response.data.job_areas.length > 0) {
        setActiveJobArea(response.data.job_areas[0].id); // Set default job area
      }
    } catch (error) {
      message.error('Failed to fetch job areas.');
    }
  };

  const fetchJobLines = async (jobAreaId) => {
    if (!jobAreaId) return;
    try {
      const response = await useRequest(`{{base_url}}/job-areas/${jobAreaId}`);
      setJobLines(response.data.lines || []); // Adjust based on actual response structure
    } catch (error) {
      message.error('Failed to fetch job lines.');
    }
  };

  const handleDelete = async (lineId) => {
    // Implement deletion logic here
    // You can call the delete endpoint and then refresh the job lines
    message.success('Job line deleted successfully.'); // Show success message after deletion
  };

  const columns = [
    {
      title: 'Job Area',
      dataIndex: 'job_area',
      key: 'job_area_id',
      render: (text, record) => record.job_area ? record.job_area.name : 'N/A',
    },
    {
      title: 'Tank',
      dataIndex: 'name',
      key: 'tank',
    },
    {
      title: 'Created At',
      dataIndex: 'created_on',
      key: 'created_on',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" />
          <Popconfirm
            title="Are you sure you want to delete this line/tank?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select Job Type"
        onChange={setActiveJobType}
        value={activeJobType}
      >
        {jobTypes.map((jobType) => (
          <Select.Option key={jobType.id} value={jobType.id}>
            {jobType.name}
          </Select.Option>
        ))}
      </Select>

      <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select Job Area"
        onChange={setActiveJobArea}
        value={activeJobArea}
      >
        {jobAreas.map((jobArea) => (
          <Select.Option key={jobArea.id} value={jobArea.id}>
            {jobArea.name}
          </Select.Option>
        ))}
      </Select>

      <ProTable
        columns={columns}
        dataSource={jobLines}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default JobManagement;
