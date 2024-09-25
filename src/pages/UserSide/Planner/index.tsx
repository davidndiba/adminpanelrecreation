// // import React, { useState, useEffect } from 'react';
// // import { PageHeader, ProCard } from '@ant-design/pro-components';
// // import { Row, Col, DatePicker, Select, Button, Table, Modal, Form, Tabs } from 'antd';
// // import { DownloadOutlined } from '@ant-design/icons';
// // import moment from 'moment';
// // import AddJobModal from './AddJobModal';
// // import { request } from 'umi';

// // const { RangePicker } = DatePicker;
// // const { TabPane } = Tabs;

// // const Planner = () => {
// //   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
// //   const [dataSource, setDataSource] = useState([]);
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [form] = Form.useForm();
// //   const [jobTypes, setJobTypes] = useState([]);
// //   const [jobAreas, setJobAreas] = useState([]);
// //   const [areaData, setAreaData] = useState({});
// //   const [activeTab, setActiveTab] = useState(null);

// //   const freeColor = '#F8F4FE';
// //   const freeTextColor = '#6B59F8';

// //   const generateWeeklyData = (start) => {
// //     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// //     let data = [];

// //     days.forEach((day, index) => {
// //       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
// //       data.push(
// //         {
// //           key: `${day}-Day`,
// //           day: `${day}, ${date}`,
// //           shift: 'Day',
// //           h1: 'FREE',
// //           h2: 'FREE',
// //           h3: 'FREE',
// //           h4: 'FREE',
// //         },
// //         {
// //           key: `${day}-Night`,
// //           day: `${day}, ${date}`,
// //           shift: 'Night',
// //           h1: 'FREE',
// //           h2: 'FREE',
// //           h3: 'FREE',
// //           h4: 'FREE',
// //         }
// //       );
// //     });
// //     return data;
// //   };

// //   const fetchJobTypes = async () => {
// //     try {
// //       const response = await request('/job-types');
// //       const jobTypeData = response.data?.data || [];
// //       setJobTypes(jobTypeData);

// //       // Automatically select the first job type on mount
// //       if (jobTypeData.length > 0) {
// //         const firstJobTypeId = jobTypeData[0].id;
// //         fetchJobAreas(firstJobTypeId);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch job types:', error);
// //     }
// //   };

// //   const fetchJobAreas = async (jobTypeId) => {
// //     try {
// //       const response = await request(`/job-types/${jobTypeId}`);
// //       const areas = response.data?.job_areas || [];
// //       setJobAreas(areas);

// //       // Prepare data for each job area
// //       const newAreaData = {};
// //       areas.forEach(area => {
// //         newAreaData[area.id] = generateWeeklyData(startDate);
// //       });
// //       setAreaData(newAreaData);

// //       // Automatically set the first job area as active tab
// //       if (areas.length > 0) {
// //         setActiveTab(areas[0].id);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch job areas:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     // setDataSource(generateWeeklyData(startDate));
// //     fetchJobTypes(); // Fetch job types and select the first one
// //   }, [startDate]);

// //   const columns = [
// //     {
// //       title: 'Day',
// //       dataIndex: 'day',
// //       key: 'day',
// //     },
// //     {
// //       title: 'Shift',
// //       dataIndex: 'shift',
// //       key: 'shift',
// //     },
// //     {
// //       title: 'H1',
// //       dataIndex: 'h1',
// //       key: 'h1',
// //       render: (text, record) => renderSlot(text, record, 'h1'),
// //     },
// //     {
// //       title: 'H2',
// //       dataIndex: 'h2',
// //       key: 'h2',
// //       render: (text, record) => renderSlot(text, record, 'h2'),
// //     },
// //     {
// //       title: 'H3',
// //       dataIndex: 'h3',
// //       key: 'h3',
// //       render: (text, record) => renderSlot(text, record, 'h3'),
// //     },
// //     {
// //       title: 'H4',
// //       dataIndex: 'h4',
// //       key: 'h4',
// //       render: (text, record) => renderSlot(text, record, 'h4'),
// //     },
// //   ];

// //   const renderSlot = (text, record, hour) => (
// //     <div
// //       style={{
// //         backgroundColor: text === 'FREE' ? freeColor : 'transparent',
// //         color: text === 'FREE' ? freeTextColor : 'black',
// //         textAlign: 'center',
// //         padding: '8px',
// //         borderRadius: '4px',
// //       }}
// //       onClick={() => handleSlotClick(record, hour)}
// //     >
// //       {text}
// //     </div>
// //   );

// //   const handleSlotClick = (record, hour) => {
// //     setSelectedSlot({ ...record, hour });
// //     setIsModalVisible(true);
// //   };

// //   const handleCancel = () => {
// //     setIsModalVisible(false);
// //     form.resetFields();
// //   };

// //   const handleOk = (jobNumber) => {
// //     if (selectedSlot) {
// //       const updatedDataSource = dataSource.map(item => {
// //         if (item.key === selectedSlot.key) {
// //           return { ...item, [selectedSlot.hour]: jobNumber };
// //         }
// //         return item;
// //       });
// //       setDataSource(updatedDataSource);
// //     }
// //     handleCancel();
// //   };

// //   return (
// //     <ProCard>
// //       <PageHeader title="Weekly Planner" />
// //       <Row gutter={[16, 16]}>
// //         <Col span={8}>
// //           <RangePicker
// //             value={[startDate, startDate.clone().add(4, 'days')]}
// //             onChange={(dates) => setStartDate(dates[0])}
// //             picker="week"
// //           />
// //         </Col>
// //         <Col span={8}>
// //           <Select
// //             placeholder="Select Job Type"
// //             style={{ width: '100%' }}
// //             options={jobTypes.map((job) => ({ label: job.name, value: job.id }))}
// //             onChange={fetchJobAreas}
// //             // Automatically select the first job type
// //             value={jobTypes.length > 0 ? jobTypes[0].id : undefined}
// //           />
// //         </Col>
// //         <Col span={8}>
// //           <Button icon={<DownloadOutlined />} type="primary">
// //             Download Schedule
// //           </Button>
// //         </Col>
// //       </Row>

// //       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
// //         <Col span={24}>
// //           <ProCard title="Weekly Schedule">
// //             <Table
// //               columns={columns}
// //               dataSource={dataSource}
// //               pagination={false}
// //               onRow={(record) => ({
// //                 onClick: () => handleSlotClick(record, 'hour'),
// //               })}
// //             />
// //           </ProCard>
// //         </Col>
// //       </Row>

// //       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
// //         <Col span={24}>
// //           <Tabs activeKey={activeTab} onChange={setActiveTab}>
// //             {jobAreas.length > 0 ? (
// //               jobAreas.map(area => (
// //                 <TabPane tab={area.name} key={area.id}>
// //                   <Table columns={columns} dataSource={areaData[area.id] || []} pagination={false} />
// //                 </TabPane>
// //               ))
// //             ) : (
// //               <TabPane tab="No Job Areas" key="no-areas">
// //                 <p>Please select a job type to view available job areas.</p>
// //               </TabPane>
// //             )}
// //           </Tabs>
// //         </Col>
// //       </Row>

// //       <AddJobModal
// //         isModalVisible={isModalVisible}
// //         handleOk={handleOk}
// //         handleCancel={handleCancel}
// //         jobAreas={jobAreas}
// //       />
// //     </ProCard>
// //   );
// // };

// // export default Planner;
// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Modal, Form, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
//   const [dataSource, setDataSource] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [form] = Form.useForm();
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [areaData, setAreaData] = useState({});
//   const [activeTab, setActiveTab] = useState(null);

//   const freeColor = '#F8F4FE';
//   const freeTextColor = '#6B59F8';

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     let data = [];

//     days.forEach((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       data.push(
//         {
//           key: `${day}-Day`,
//           day: `${day}, ${date}`,
//           shift: 'Day',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         },
//         {
//           key: `${day}-Night`,
//           day: `${day}, ${date}`,
//           shift: 'Night',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         }
//       );
//     });
//     return data;
//   };

//   const fetchJobTypes = async () => {
//     try {
//       const response = await request('/job-types');
//       const jobTypeData = response.data?.data || [];
//       setJobTypes(jobTypeData);

//       // Automatically select the first job type on mount
//       if (jobTypeData.length > 0) {
//         const firstJobTypeId = jobTypeData[0].id;
//         fetchJobAreas(firstJobTypeId);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job types:', error);
//     }
//   };

//   const fetchJobAreas = async (jobTypeId) => {
//     try {
//       const response = await request(`/job-types/${jobTypeId}`);
//       const areas = response.data?.job_areas || [];
//       setJobAreas(areas);

//       // Prepare data for each job area
//       const newAreaData = {};
//       areas.forEach(area => {
//         newAreaData[area.id] = generateWeeklyData(startDate);
//       });
//       setAreaData(newAreaData);

//       // Automatically set the first job area as active tab
//       if (areas.length > 0) {
//         setActiveTab(areas[0].id);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   useEffect(() => {
//     fetchJobTypes(); // Fetch job types and select the first one
//   }, []);

//   const handleSlotClick = (record, hour) => {
//     setSelectedSlot({ ...record, hour });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//     setSelectedSlot(null); // Reset the selected slot
//   };

//   const handleOk = (jobNumber) => {
//     if (selectedSlot) {
//       const updatedDataSource = dataSource.map(item => {
//         if (item.key === selectedSlot.key) {
//           return { ...item, [selectedSlot.hour]: jobNumber };
//         }
//         return item;
//       });
//       setDataSource(updatedDataSource);
//     }
//     handleCancel();
//   };

//   return (
//     <ProCard>
//       <PageHeader title="Weekly Planner" />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <RangePicker
//             value={[startDate, startDate.clone().add(4, 'days')]}
//             onChange={(dates) => setStartDate(dates[0])}
//             picker="week"
//           />
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             options={jobTypes.map((job) => ({ label: job.name, value: job.id }))}
//             onChange={fetchJobAreas}
//             value={jobTypes.length > 0 ? jobTypes[0].id : undefined}
//           />
//         </Col>
//         <Col span={8}>
//           <Button icon={<DownloadOutlined />} type="primary">
//             Download Schedule
//           </Button>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//         <Col span={24}>
//           <ProCard title="Weekly Schedule">
//             <Table
//               columns={[
//                 {
//                   title: 'Day',
//                   dataIndex: 'day',
//                   key: 'day',
//                 },
//                 {
//                   title: 'Shift',
//                   dataIndex: 'shift',
//                   key: 'shift',
//                 },
//                 {
//                   title: 'H1',
//                   dataIndex: 'h1',
//                   key: 'h1',
//                   render: (text, record) => renderSlot(text, record, 'h1'),
//                 },
//                 {
//                   title: 'H2',
//                   dataIndex: 'h2',
//                   key: 'h2',
//                   render: (text, record) => renderSlot(text, record, 'h2'),
//                 },
//                 {
//                   title: 'H3',
//                   dataIndex: 'h3',
//                   key: 'h3',
//                   render: (text, record) => renderSlot(text, record, 'h3'),
//                 },
//                 {
//                   title: 'H4',
//                   dataIndex: 'h4',
//                   key: 'h4',
//                   render: (text, record) => renderSlot(text, record, 'h4'),
//                 },
//               ]}
//               dataSource={dataSource}
//               pagination={false}
//             />
//           </ProCard>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//         <Col span={24}>
//           <Tabs activeKey={activeTab} onChange={setActiveTab}>
//             {jobAreas.length > 0 ? (
//               jobAreas.map(area => (
//                 <TabPane tab={area.name} key={area.id}>
//                   <Table columns={columns} dataSource={areaData[area.id] || []} pagination={false} />
//                 </TabPane>
//               ))
//             ) : (
//               <TabPane tab="No Job Areas" key="no-areas">
//                 <p>Please select a job type to view available job areas.</p>
//               </TabPane>
//             )}
//           </Tabs>
//         </Col>
//       </Row>

//       <AddJobModal
//         isModalVisible={isModalVisible}
//         handleOk={handleOk}
//         handleCancel={handleCancel}
//         jobAreas={jobAreas}
//       />
//     </ProCard>
//   );
// };

// export default Planner;
// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Modal, Form, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
//   const [dataSource, setDataSource] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [form] = Form.useForm();
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [areaData, setAreaData] = useState({});
//   const [activeTab, setActiveTab] = useState(null);

//   const freeColor = '#F8F4FE';
//   const freeTextColor = '#6B59F8';

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     let data = [];

//     days.forEach((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       data.push(
//         {
//           key: `${day}-Day`,
//           day: `${day}, ${date}`,
//           shift: 'Day',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         },
//         {
//           key: `${day}-Night`,
//           day: `${day}, ${date}`,
//           shift: 'Night',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         }
//       );
//     });
//     return data;
//   };

//   const fetchJobTypes = async () => {
//     try {
//       const response = await request('/job-types');
//       const jobTypeData = response.data?.data || [];
//       setJobTypes(jobTypeData);

//       // Automatically select the first job type on mount
//       if (jobTypeData.length > 0) {
//         const firstJobTypeId = jobTypeData[0].id;
//         fetchJobAreas(firstJobTypeId);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job types:', error);
//     }
//   };

//   const fetchJobAreas = async (jobTypeId) => {
//     try {
//       const response = await request(`/job-types/${jobTypeId}`);
//       const areas = response.data?.job_areas || [];
//       setJobAreas(areas);

//       // Prepare data for each job area
//       const newAreaData = {};
//       areas.forEach(area => {
//         newAreaData[area.id] = generateWeeklyData(startDate);
//       });
//       setAreaData(newAreaData);

//       // Automatically set the first job area as active tab
//       if (areas.length > 0) {
//         setActiveTab(areas[0].id);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   const renderSlot = (text, record, hour) => (
//     <div
//       style={{
//         backgroundColor: text === 'FREE' ? freeColor : 'transparent',
//         color: text === 'FREE' ? freeTextColor : 'black',
//         textAlign: 'center',
//         padding: '8px',
//         borderRadius: '4px',
//       }}
//       onClick={() => handleSlotClick(record, hour)}
//     >
//       {text}
//     </div>
//   );

//   const columns = [
//     {
//       title: 'Day',
//       dataIndex: 'day',
//       key: 'day',
//     },
//     {
//       title: 'Shift',
//       dataIndex: 'shift',
//       key: 'shift',
//     },
//     {
//       title: 'H1',
//       dataIndex: 'h1',
//       key: 'h1',
//       render: (text, record) => renderSlot(text, record, 'h1'),
//     },
//     {
//       title: 'H2',
//       dataIndex: 'h2',
//       key: 'h2',
//       render: (text, record) => renderSlot(text, record, 'h2'),
//     },
//     {
//       title: 'H3',
//       dataIndex: 'h3',
//       key: 'h3',
//       render: (text, record) => renderSlot(text, record, 'h3'),
//     },
//     {
//       title: 'H4',
//       dataIndex: 'h4',
//       key: 'h4',
//       render: (text, record) => renderSlot(text, record, 'h4'),
//     },
//   ];

//   const handleSlotClick = (record, hour) => {
//     setSelectedSlot({ ...record, hour });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   const handleOk = (jobNumber) => {
//     if (selectedSlot) {
//       const updatedDataSource = dataSource.map(item => {
//         if (item.key === selectedSlot.key) {
//           return { ...item, [selectedSlot.hour]: jobNumber };
//         }
//         return item;
//       });
//       setDataSource(updatedDataSource);
//     }
//     handleCancel();
//   };

//   useEffect(() => {
//     fetchJobTypes();
//   }, [startDate]);

//   return (
//     <ProCard>
//       <PageHeader title="Weekly Planner" />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <RangePicker
//             value={[startDate, startDate.clone().add(4, 'days')]}
//             onChange={(dates) => setStartDate(dates[0])}
//             picker="week"
//           />
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             options={jobTypes.map((job) => ({ label: job.name, value: job.id }))}
//             onChange={fetchJobAreas}
//           />
//         </Col>
//         <Col span={8}>
//           <Button icon={<DownloadOutlined />} type="primary">
//             Download Schedule
//           </Button>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//         <Col span={24}>
//           <Tabs activeKey={activeTab} onChange={setActiveTab}>
//             {jobAreas.length > 0 ? (
//               jobAreas.map(area => (
//                 <TabPane tab={area.name} key={area.id}>
//                   <Table columns={columns} dataSource={areaData[area.id] || []} pagination={false} />
//                 </TabPane>
//               ))
//             ) : (
//               <TabPane tab="No Job Areas" key="no-areas">
//                 <p>Please select a job type to view available job areas.</p>
//               </TabPane>
//             )}
//           </Tabs>
//         </Col>
//       </Row>

//       <AddJobModal
//         isModalVisible={isModalVisible}
//         handleOk={handleOk}
//         handleCancel={handleCancel}
//         jobAreas={jobAreas}
//       />
//     </ProCard>
//   );
// };

// export default Planner;
// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Modal, Form, Tabs } from 'antd'; // Make sure Form is imported here
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
//   const [dataSource, setDataSource] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [form] = Form.useForm(); // Ensure Form is defined here
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [areaData, setAreaData] = useState({});
//   const [activeTab, setActiveTab] = useState(null);

//   const freeColor = '#F8F4FE';
//   const freeTextColor = '#6B59F8';
//   const bookedColor = '#F9D4D3';
//   const bookedTextColor = '#CD2C27';

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     let data = [];

//     days.forEach((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       data.push(
//         {
//           key: `${day}-Day`,
//           day: `${day}, ${date}`,
//           shift: 'Day',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         },
//         {
//           key: `${day}-Night`,
//           day: `${day}, ${date}`,
//           shift: 'Night',
//           h1: 'FREE',
//           h2: 'FREE',
//           h3: 'FREE',
//           h4: 'FREE',
//         }
//       );
//     });
//     return data;
//   };

//   const fetchJobTypes = async () => {
//     try {
//       const response = await request('/job-types');
//       const jobTypeData = response.data?.data || [];
//       setJobTypes(jobTypeData);

//       // Automatically select the first job type on mount
//       if (jobTypeData.length > 0) {
//         const firstJobTypeId = jobTypeData[0].id;
//         fetchJobAreas(firstJobTypeId);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job types:', error);
//     }
//   };

//   const fetchJobAreas = async (jobTypeId) => {
//     try {
//       const response = await request(`/job-types/${jobTypeId}`);
//       const areas = response.data?.job_areas || [];
//       setJobAreas(areas);

//       // Prepare data for each job area
//       const newAreaData = {};
//       areas.forEach(area => {
//         newAreaData[area.id] = generateWeeklyData(startDate);
//       });
//       setAreaData(newAreaData);

//       // Automatically set the first job area as active tab
//       if (areas.length > 0) {
//         setActiveTab(areas[0].id);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   const renderSlot = (text, record, hour) => {
//     const isBooked = text !== 'FREE'; // Check if the slot is booked
//     return (
//       <div
//         style={{
//           backgroundColor: isBooked ? bookedColor : freeColor,
//           color: isBooked ? bookedTextColor : freeTextColor,
//           textAlign: 'center',
//           padding: '8px',
//           borderRadius: '4px',
//         }}
//         onClick={() => !isBooked && handleSlotClick(record, hour)}
//       >
//         {text}
//       </div>
//     );
//   };

//   const columns = [
//     {
//       title: 'Day',
//       dataIndex: 'day',
//       key: 'day',
//     },
//     {
//       title: 'Shift',
//       dataIndex: 'shift',
//       key: 'shift',
//     },
//     {
//       title: 'H1',
//       dataIndex: 'h1',
//       key: 'h1',
//       render: (text, record) => renderSlot(text, record, 'h1'),
//     },
//     {
//       title: 'H2',
//       dataIndex: 'h2',
//       key: 'h2',
//       render: (text, record) => renderSlot(text, record, 'h2'),
//     },
//     {
//       title: 'H3',
//       dataIndex: 'h3',
//       key: 'h3',
//       render: (text, record) => renderSlot(text, record, 'h3'),
//     },
//     {
//       title: 'H4',
//       dataIndex: 'h4',
//       key: 'h4',
//       render: (text, record) => renderSlot(text, record, 'h4'),
//     },
//   ];

//   const handleSlotClick = (record, hour) => {
//     setSelectedSlot({ ...record, hour });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   const handleOk = (jobDetails) => {
//     if (selectedSlot) {
//       const updatedDataSource = dataSource.map(item => {
//         if (item.key === selectedSlot.key) {
//           return { 
//             ...item, 
//             [selectedSlot.hour]: jobDetails.jobNumber, 
//             bookedQuantity: jobDetails.size, 
//             status: 'Booked' 
//           };
//         }
//         return item;
//       });
//       setDataSource(updatedDataSource);
//     }
//     handleCancel();
//   };

//   useEffect(() => {
//     fetchJobTypes();
//   }, [startDate]);

//   return (
//     <ProCard>
//       <PageHeader title="Weekly Planner" />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <RangePicker
//             value={[startDate, startDate.clone().add(4, 'days')]}
//             onChange={(dates) => setStartDate(dates[0])}
//             picker="week"
//           />
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             options={jobTypes.map((job) => ({ label: job.name, value: job.id }))}
//             onChange={fetchJobAreas}
//           />
//         </Col>
//         <Col span={8}>
//           <Button icon={<DownloadOutlined />} type="primary">
//             Download Schedule
//           </Button>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//         <Col span={24}>
//           <Tabs activeKey={activeTab} onChange={setActiveTab}>
//             {jobAreas.length > 0 ? (
//               jobAreas.map(area => (
//                 <TabPane tab={area.name} key={area.id}>
//                   <Table columns={columns} dataSource={areaData[area.id] || []} pagination={false} />
//                 </TabPane>
//               ))
//             ) : (
//               <TabPane tab="No Job Areas" key="no-areas">
//                 <p>Please select a job type to view available job areas.</p>
//               </TabPane>
//             )}
//           </Tabs>
//         </Col>
//       </Row>

//       <AddJobModal
//         isModalVisible={isModalVisible}
//         handleOk={handleOk}
//         handleCancel={handleCancel}
//         jobAreas={jobAreas}
//       />
//     </ProCard>
//   );
// };

// export default Planner;


import React, { useState, useEffect } from 'react';
import { PageHeader, ProCard } from '@ant-design/pro-components';
import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddJobModal from './AddJobModal';
import { request } from 'umi';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Planner = () => {
  const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobAreas, setJobAreas] = useState([]);
  const [areaData, setAreaData] = useState({});
  const [activeTab, setActiveTab] = useState(null);

  const generateWeeklyData = (start) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days.flatMap((day, index) => {
      const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
      return [
        { key: `${day}-Day`, day: `${day}, ${date}`, shift: 'Day', h1: {}, h2: {}, h3: {}, h4: {} },
        { key: `${day}-Night`, day: `${day}, ${date}`, shift: 'Night', h1: {}, h2: {}, h3: {}, h4: {} },
      ];
    });
  };

  const fetchJobTypes = async () => {
    try {
      const response = await request('/job-types');
      const jobTypeData = response.data?.data || [];
      setJobTypes(jobTypeData);
      if (jobTypeData.length > 0) fetchJobAreas(jobTypeData[0].id);
    } catch (error) {
      console.error('Failed to fetch job types:', error);
    }
  };

  const fetchJobAreas = async (jobTypeId) => {
    try {
      const response = await request(`/job-types/${jobTypeId}`);
      const areas = response.data?.job_areas || [];
      setJobAreas(areas);
      const newAreaData = {};
      areas.forEach(area => {
        newAreaData[area.id] = generateWeeklyData(startDate);
      });
      setAreaData(newAreaData);
      if (areas.length > 0) setActiveTab(areas[0].id);
    } catch (error) {
      console.error('Failed to fetch job areas:', error);
    }
  };

  const handleSlotClick = (record, hour) => {
    setSelectedSlot({ ...record, hour });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (jobDetails) => {
    if (selectedSlot) {
      const areaId = activeTab;
      const updatedAreaData = { ...areaData };

      // Find the correct day/shift to update
      const updatedRows = updatedAreaData[areaId].map(row => {
        if (row.key === selectedSlot.key) {
          return {
            ...row,
            [selectedSlot.hour]: {
              jobNumber: jobDetails.jobNumber,
              description: jobDetails.details || 'No description',
              bookedQuantity: jobDetails.bookedQuantity,
              size: jobDetails.size,
              status: jobDetails.status,
            },
          };
        }
        return row;
      });

      // Update the areaData state
      setAreaData({
        ...areaData,
        [areaId]: updatedRows,
      });
    }
    handleCancel();
  };

  const renderJobSlot = (jobData, record, hour) => {
    const isCompleted = jobData && jobData.status === 'Completed';
    const isInProgress = jobData && jobData.status === 'In Progress';
    const isFree = !jobData || !jobData.jobNumber;

    // Define the styles based on the job's status
    const slotStyle = {
      backgroundColor: isCompleted ? '#F9D4D3' : isInProgress ? '#FFF6E0' : isFree ? '#F8F4FE' : '#FFFFFF',
      color: isCompleted ? '#CD2A21' : isInProgress ? '#D77F1E' : isFree ? '#6200EE' : '#000000',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
    };

    // Render the job slot with the correct styles
    return (
      <div
        style={slotStyle}
        onClick={() => handleSlotClick(record, hour)}
      >
        {isFree
          ? 'FREE'
          : `${jobData.jobNumber} (${jobData.bookedQuantity}/${jobData.size}) - ${jobData.description}`
        }
      </div>
    );
  };

  useEffect(() => {
    fetchJobTypes();
  }, [startDate]);

  return (
    <ProCard>
      <PageHeader title="Weekly Planner" />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <RangePicker
            value={[startDate, startDate.clone().add(4, 'days')]}
            onChange={(dates) => setStartDate(dates[0])}
            picker="week"
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Select Job Type"
            style={{ width: '100%' }}
            options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
            onChange={fetchJobAreas} // Now fetchJobAreas is correctly referenced here
          />
        </Col>
        <Col span={8}>
          <Button type="primary" icon={<DownloadOutlined />}>Export</Button>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {jobAreas.map(area => (
          <TabPane tab={area.name} key={area.id}>
            <Table
              dataSource={areaData[area.id] || []}
              columns={[
                { title: 'Day', dataIndex: 'day', key: 'day' },
                { title: 'Shift', dataIndex: 'shift', key: 'shift' },
                {
                  title: 'Job 1',
                  dataIndex: 'h1',
                  key: 'h1',
                  render: (jobData, record) => renderJobSlot(jobData, record, 'h1'),
                },
                {
                  title: 'Job 2',
                  dataIndex: 'h2',
                  key: 'h2',
                  render: (jobData, record) => renderJobSlot(jobData, record, 'h2'),
                },
                {
                  title: 'Job 3',
                  dataIndex: 'h3',
                  key: 'h3',
                  render: (jobData, record) => renderJobSlot(jobData, record, 'h3'),
                },
                {
                  title: 'Job 4',
                  dataIndex: 'h4',
                  key: 'h4',
                  render: (jobData, record) => renderJobSlot(jobData, record, 'h4'),
                },
              ]}
              pagination={false}
            />
          </TabPane>
        ))}
      </Tabs>
      <AddJobModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        jobAreas={jobAreas}
      />
    </ProCard>
  );
};

export default Planner;



// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Modal, Form, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [areaData, setAreaData] = useState({});
//   const [activeTab, setActiveTab] = useState(null);

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     return days.flatMap((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       return [
//         { key: `${day}-Day`, day: `${day}, ${date}`, shift: 'Day', h1: {}, h2: {}, h3: {}, h4: {} },
//         { key: `${day}-Night`, day: `${day}, ${date}`, shift: 'Night', h1: {}, h2: {}, h3: {}, h4: {} },
//       ];
//     });
//   };

//   const fetchJobTypes = async () => {
//     try {
//       const response = await request('/job-types');
//       const jobTypeData = response.data?.data || [];
//       setJobTypes(jobTypeData);
//       if (jobTypeData.length > 0) fetchJobAreas(jobTypeData[0].id);
//     } catch (error) {
//       console.error('Failed to fetch job types:', error);
//     }
//   };

//   const fetchJobAreas = async (jobTypeId) => {
//     try {
//       const response = await request(`/job-types/${jobTypeId}`);
//       const areas = response.data?.job_areas || [];
//       setJobAreas(areas);
//       const newAreaData = {};
//       areas.forEach(area => {
//         newAreaData[area.id] = generateWeeklyData(startDate);
//       });
//       setAreaData(newAreaData);
//       if (areas.length > 0) setActiveTab(areas[0].id);
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   const handleSlotClick = (record, hour) => {
//     setSelectedSlot({ ...record, hour });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleOk = (jobDetails) => {
//     if (selectedSlot) {
//       const areaId = activeTab;
//       const updatedAreaData = { ...areaData };

//       // Find the correct day/shift to update
//       const updatedRows = updatedAreaData[areaId].map(row => {
//         if (row.key === selectedSlot.key) {
//           return {
//             ...row,
//             [selectedSlot.hour]: {
//               jobNumber: jobDetails.jobNumber,
//               description: jobDetails.details || 'No description',
//               bookedQuantity: jobDetails.bookedQuantity,
//               size: jobDetails.size,
//               status: jobDetails.status, // Assuming status is passed here
//             },
//           };
//         }
//         return row;
//       });

//       // Update the areaData state
//       setAreaData({
//         ...areaData,
//         [areaId]: updatedRows,
//       });
//     }
//     handleCancel();
//   };

//   const renderJobSlot = (jobData, record, hour) => {
//     const isCompleted = jobData && jobData.status === 'Completed';
//     const isInProgress = jobData && jobData.status === 'In Progress';
//     const isFree = !jobData || !jobData.jobNumber;

//     // Define the styles based on the job's status
//     const slotStyle = {
//       backgroundColor: isCompleted
//         ? '#F9D4D3'
//         : isInProgress
//         ? '#FFF6E0'
//         : isFree
//         ? '#F8F4FE'
//         : '#FFFFFF',
//       color: isCompleted
//         ? '#CD2A21'
//         : isInProgress
//         ? '#D77F1E'
//         : isFree
//         ? '#6200EE'
//         : '#000000',
//       padding: '10px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textAlign: 'center',
//     };

//     // Render the job slot with the correct styles
//     return (
//       <div
//         style={slotStyle}
//         onClick={() => handleSlotClick(record, hour)}
//       >
//         {isFree
//           ? 'FREE'
//           : `${jobData.jobNumber} (${jobData.bookedQuantity}/${jobData.size}) - ${jobData.description}`
//         }
//       </div>
//     );
//   };

//   useEffect(() => {
//     fetchJobTypes();
//   }, [startDate]);

//   return (
//     <ProCard>
//       <PageHeader title="Weekly Planner" />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <RangePicker
//             value={[startDate, startDate.clone().add(4, 'days')]}
//             onChange={(dates) => setStartDate(dates[0])}
//             picker="week"
//           />
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//             onChange={fetchJobAreas}
//           />
//         </Col>
//         <Col span={8}>
//           <Button type="primary" icon={<DownloadOutlined />}>Export</Button>
//         </Col>
//       </Row>
//       <Tabs activeKey={activeTab} onChange={setActiveTab}>
//         {jobAreas.map(area => (
//           <TabPane tab={area.name} key={area.id}>
//             <Table
//               dataSource={areaData[area.id] || []}
//               columns={[
//                 { title: 'Day', dataIndex: 'day', key: 'day' },
//                 { title: 'Shift', dataIndex: 'shift', key: 'shift' },
//                 {
//                   title: 'Job 1',
//                   dataIndex: 'h1',
//                   key: 'h1',
//                   render: (jobData, record) => renderJobSlot(jobData, record, 'h1'),
//                 },
//                 {
//                   title: 'Job 2',
//                   dataIndex: 'h2',
//                   key: 'h2',
//                   render: (jobData, record) => renderJobSlot(jobData, record, 'h2'),
//                 },
//                 {
//                   title: 'Job 3',
//                   dataIndex: 'h3',
//                   key: 'h3',
//                   render: (jobData, record) => renderJobSlot(jobData, record, 'h3'),
//                 },
//                 {
//                   title: 'Job 4',
//                   dataIndex: 'h4',
//                   key: 'h4',
//                   render: (jobData, record) => renderJobSlot(jobData, record, 'h4'),
//                 },
//               ]}
//               pagination={false}
//             />
//           </TabPane>
//         ))}
//       </Tabs>
//       <AddJobModal
//         isModalVisible={isModalVisible}
//         handleOk={handleOk}
//         handleCancel={handleCancel}
//         jobAreas={jobAreas}
//       />
//     </ProCard>
//   );
// };

// export default Planner;
