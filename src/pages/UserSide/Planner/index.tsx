// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;
// const initialAreaData = {
//   tab1: [
//     { key: 'day1-slot1', slot1: [{ id: 'job1', name: 'Job 1' }], slot2: [] },
//     { key: 'day1-slot2', slot1: [], slot2: [{ id: 'job2', name: 'Job 2' }] },
//   ],
//   tab2: [
//     { key: 'day2-slot1', slot1: [{ id: 'job3', name: 'Job 3' }], slot2: [] },
//     { key: 'day2-slot2', slot1: [], slot2: [{ id: 'job4', name: 'Job 4' }] },
//   ],
// };

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   // const [areaData, setAreaData] = useState({});
//   // const [activeTab, setActiveTab] = useState(null);
//   const [areaData, setAreaData] = useState(initialAreaData);
//   const [activeTab, setActiveTab] = useState('tab1');
//   const [jobData, setJobData] = useState([]);

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     return days.flatMap((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       return [
//         { key: `${day}-Day`, day: day, date: date, shift: 'Day', h1: [], h2: [], h3: [], h4: [] },
//         { key: `${day}-Night`, day: day, date: date, shift: 'Night', h1: [], h2: [], h3: [], h4: [] },
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

//       const updatedRows = updatedAreaData[areaId].map(row => {
//         if (row.key === selectedSlot.key) {
//           return {
//             ...row,
//             [selectedSlot.hour]: [
//               ...row[selectedSlot.hour],  // Keep existing jobs
//               {
//                 jobNumber: jobDetails.jobNumber,
//                 description: jobDetails.comments || 'No description',
//                 bookedQuantity: jobDetails.bookedQuantity,
//                 size: jobDetails.size,
//                 status: jobDetails.jobStatus,
//               },
//             ],
//           };
//         }
//         return row;
//       });

//       setAreaData({
//         ...areaData,
//         [areaId]: updatedRows,
//       });
//     }
//     handleCancel();
//   };

//   // Function to handle the drag end event
//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const sourceAreaId = activeTab; // Use the current active tab
//     const sourceIndex = source.index;
//      const destinationIndex = destination.index;
   
//      const sourceDroppableId = source.droppableId.split('-'); // Extracting day and shift
//     const destinationDroppableId = destination.droppableId.split('-'); // Extracting day and shift

//     const sourceDayKey = `${sourceDroppableId[0]}-${sourceDroppableId[1]}`;
//     const destinationDayKey = `${destinationDroppableId[0]}-${destinationDroppableId[1]}`;

//     const sourceRow = areaData[sourceAreaId].find(row => row.key === sourceDayKey);
//     const destinationRow = areaData[sourceAreaId].find(row => row.key === destinationDayKey);

//     const sourceJobs = sourceRow[sourceDroppableId[2]];
//     const destinationJobs = destinationRow[destinationDroppableId[2]];

//     const movedJob = sourceJobs[sourceIndex];

//     // Remove the job from the source slot
//     // const updatedSourceJobs = sourceJobs.filter((_, index) => index !== sourceIndex);

//     // Add the job to the destination slot
//     // const updatedDestinationJobs = [...destinationJobs, movedJob];
    
//    const updatedSourceJobs = [...sourceJobs.slice(0, sourceIndex), ...sourceJobs.slice(sourceIndex + 1)];

//     const updatedDestinationJobs = [
//       ...destinationJobs.slice(0, destinationIndex),
//       movedJob,
//       ...destinationJobs.slice(destinationIndex),
//     ];

//     // Update the areaData state
//     setAreaData(prevState => ({
//       ...prevState,
//       [sourceAreaId]: prevState[sourceAreaId].map((row) => {
//         if (row.key === sourceDayKey) {
//           return { ...row, [sourceDroppableId[2]]: updatedSourceJobs };
//         }
//         if (row.key === destinationDayKey) {
//           return { ...row, [destinationDroppableId[2]]: updatedDestinationJobs };
//         }
//         return row;
//       }),
//     }));
//   };

//   const renderJobSlot = (jobData, record, hour) => {
//     const slotJobs = jobData || [];

//     // Define the styles based on each job's status
//     const getJobStyle = (status) => {
//       if (status === 'Completed') {
//         return { backgroundColor: '#F9D4D3', color: '#CD2A21' };
//       } else if (status === 'In Progress') {
//         return { backgroundColor: '#FFF6E0', color: '#D77F1E' };
//       } else {
//         return { backgroundColor: '#F8F4FE', color: '#6200EE' };
//       }
//     };

//     return (
//       <Droppable droppableId={`${record.day}-${record.shift}-${hour}`}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             style={{
//               padding: '10px',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               textAlign: 'center',
//               backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
//             }}
//             onClick={() => handleSlotClick(record, hour)}
//           >
//             {slotJobs.length === 0 ? (
//               'FREE'
//             ) : (
//               slotJobs.map((job, index) => (
//                 <Draggable key={index} draggableId={`${job.jobNumber}-${index}`} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={{ 
//                         marginBottom: '5px', 
//                         ...getJobStyle(job.status), 
//                         ...provided.draggableProps.style 
//                       }}
//                     >
//                       {`${job.jobNumber} (${job.bookedQuantity}/${job.size}) - ${job.description}`}
//                     </div>
//                   )}
//                 </Draggable>
//               ))
//             )}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
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
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Tabs activeKey={activeTab} onChange={setActiveTab}>
//           {jobAreas.map(area => (
//             <TabPane tab={area.name} key={area.id}>
//               <Table
//                 dataSource={areaData[area.id] || []}
//                 columns={[
//                   { title: 'Day', dataIndex: 'day', key: 'day' },
//                   { title: 'Shift', dataIndex: 'shift', key: 'shift' },
//                   { title: 'H1', key: 'h1', render: (text, record) => renderJobSlot(record.h1, record, 'h1') },
//                   { title: 'H2', key: 'h2', render: (text, record) => renderJobSlot(record.h2, record, 'h2') },
//                   { title: 'H3', key: 'h3', render: (text, record) => renderJobSlot(record.h3, record, 'h3') },
//                   { title: 'H4', key: 'h4', render: (text, record) => renderJobSlot(record.h4, record, 'h4') },
//                 ]}
//                 pagination={false}
//                 bordered
//               />
//             </TabPane>
//           ))}
//         </Tabs>
//       </DragDropContext>
//       <AddJobModal
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         onOk={handleOk}
//         selectedSlot={selectedSlot}
//         jobTypes={jobTypes}
//         jobAreas={jobAreas}
//         // jobData={jobData} 
//       />
//     </ProCard>
//   );
// };

// export default Planner;


// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { request } from 'umi';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Planner = () => {
//   const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days')); // Start on Monday
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [areaData, setAreaData] = useState({});
//   const [activeTab, setActiveTab] = useState(null);
//   const [shiftData, setShiftData] = useState([]);
//   const [jobLines, setJobLines] = useState([]);

//   // Fetch shifts from the provided endpoint
//   const fetchShifts = async () => {
//     try {
//       const response = await request('/shifts');
//       const shifts = response.data?.data || [];
//       setShiftData(shifts);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//     }
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
//       if (areas.length > 0) setActiveTab(areas[0].id);
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   // Fetch job lines
//   const fetchJobLines = async (jobAreaId) => {
//     try {
//       const response = await request(`/job-lines?job_area_id=${jobAreaId}`);
//       const lines = response.data?.data || [];
//       setJobLines(lines);
//     } catch (error) {
//       console.error('Failed to fetch job lines:', error);
//     }
//   };

//   useEffect(() => {
//     if (activeTab) {
//       fetchJobLines(activeTab);
//     }
//   }, [activeTab]);

//   const generateWeeklyData = (start) => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const shiftTimes = { 'Day Shift': '08:00 AM - 04:00 PM', 'Night Shift': '04:00 PM - 12:00 AM' };

//     return days.flatMap((day, index) => {
//       const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
//       return [
//         {
//           key: `${day}-day`,
//           day: `${day}, ${date}`,
//           shiftType: 'Day Shift',
//           time: shiftTimes['Day Shift'],
//           shiftSlots: {},
//         },
//         {
//           key: `${day}-night`,
//           day: `${day}, ${date}`,
//           shiftType: 'Night Shift',
//           time: shiftTimes['Night Shift'],
//           shiftSlots: {},
//         },
//       ];
//     });
//   };

//   const handleSlotClick = (record, jobLineId) => {
//     setSelectedSlot({ ...record, jobLineId });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleOk = (jobDetails) => {
//     if (selectedSlot) {
//       const areaId = activeTab;
//       const updatedAreaData = { ...areaData };

//       const updatedRows = updatedAreaData[areaId].map((row) => {
//         if (row.key === selectedSlot.key) {
//           return {
//             ...row,
//             shiftSlots: {
//               ...row.shiftSlots,
//               [selectedSlot.jobLineId]: [
//                 ...row.shiftSlots[selectedSlot.jobLineId], // Keep existing jobs
//                 {
//                   jobNumber: jobDetails.jobNumber,
//                   description: jobDetails.comments || 'No description',
//                   bookedQuantity: jobDetails.bookedQuantity,
//                   size: jobDetails.size,
//                   status: jobDetails.jobStatus,
//                 },
//               ],
//             },
//           };
//         }
//         return row;
//       });

//       setAreaData({
//         ...areaData,
//         [areaId]: updatedRows,
//       });
//     }
//     setIsModalVisible(false);
//   };

//   const columns = jobLines.map((line) => ({
//     title: line.name,
//     dataIndex: `shiftSlots.${line.id}`,
//     key: line.id,
//     render: (jobs) =>
//       jobs ? (
//         jobs.map((job, index) => (
//           <div key={index}>
//             <strong>{job.jobNumber}</strong>: {job.description} ({job.size})
//           </div>
//         ))
//       ) : (
//         <Button onClick={() => handleSlotClick(line.id)}>Add Job</Button>
//       ),
//   }));

//   useEffect(() => {
//     fetchShifts();
//     fetchJobTypes();
//     setAreaData((prev) => ({
//       ...prev,
//       [activeTab]: generateWeeklyData(startDate),
//     }));
//   }, [startDate]);

//   const onTabChange = (key) => {
//     setActiveTab(key);
//   };

//   return (
//     <div>
//       <PageHeader title="Job Planner" />
//       <Tabs activeKey={activeTab} onChange={onTabChange}>
//         {jobAreas.map((area) => (
//           <TabPane tab={area.name} key={area.id}>
//             <Table
//               dataSource={areaData[area.id]}
//               columns={[
//                 {
//                   title: 'Day',
//                   dataIndex: 'day',
//                   key: 'day',
//                 },
//                 {
//                   title: 'Shift',
//                   dataIndex: 'shiftType',
//                   key: 'shiftType',
//                 },
//                 {
//                   title: 'Time',
//                   dataIndex: 'time',
//                   key: 'time',
//                 },
//                 ...columns,
//               ]}
//               pagination={false}
//             />
//           </TabPane>
//         ))}
//       </Tabs>

//       <AddJobModal
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         selectedSlot={selectedSlot}
//       />
//     </div>
//   );
// };

// export default Planner;
// import React, { useEffect, useState } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, Select, Button, Tabs, Table, DatePicker } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import AddJobModal from './AddJobModal';
// import moment from 'moment';

// const { Option } = Select;
// const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;

// const ManufacturingPlanner = () => {
//   const [jobTypes, setJobTypes] = useState([]);
//   const [selectedJobType, setSelectedJobType] = useState(null);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [selectedJobArea, setSelectedJobArea] = useState(null);
//   const [schedulerData, setSchedulerData] = useState([]);
//   const [jobLines, setJobLines] = useState([]);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [dateRange, setDateRange] = useState([moment().startOf('day'), moment().endOf('day')]);

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
//       if (areas.length > 0) {
//         setSelectedJobArea(areas[0].id);
//         fetchSchedulerData(areas[0].id); // Fetch shifts for the first area
//       }
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   const fetchSchedulerData = async (jobAreaId) => {
//     try {
//       const response = await request(`/shifts`); // Adjust this to the right endpoint if needed
//       setSchedulerData(response.data || []);
//     } catch (error) {
//       console.error('Failed to fetch scheduler data:', error);
//     }
//   };

//   const fetchJobLines = async () => {
//     if (!selectedJobArea) return;
//     try {
//       const response = await request(`/job-lines?job_area_id=${selectedJobArea}`);
//       setJobLines(response.data?.data || []);
//     } catch (error) {
//       console.error('Failed to fetch job lines:', error);
//     }
//   };

//   useEffect(() => {
//     fetchJobTypes();
//   }, []);

//   useEffect(() => {
//     fetchJobLines();
//   }, [selectedJobArea]);

//   const renderJobSlot = (record, hour) => {
//     const slotJobs = record[hour] || [];

//     return (
//       <div style={{
//         padding: '10px',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         textAlign: 'center',
//         backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
//       }} onClick={() => handleSlotClick(record, hour)}>
//         {slotJobs.length === 0 ? 'FREE' : slotJobs.map(job => (
//           <div key={job.id}>
//             {`${job.name} (${job.status})`}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const handleCancel = () => {
//     setModalVisible(false);
//   };

//   const handleOk = async () => {
//     setModalVisible(false);
//     fetchJobLines(); // Refresh job lines or scheduler data as needed
//   };

//   // Prepare dynamic columns
//   const columns = [
//     { title: 'Day', dataIndex: 'day', key: 'day' },
//     { title: 'Shift', dataIndex: 'shift', key: 'shift' },
//     ...jobLines.map((line, index) => ({
//       title: line.name, // Use line name from job lines
//       key: `h${index + 1}`,
//       render: (text, record) => renderJobSlot(record, `h${index + 1}`),
//     })),
//   ];

//   return (
//     <ProCard>
//       <PageHeader
//         title="Manufacturing Planner"
//         subTitle="Manage your production schedules effectively"
//         style={{ marginBottom: 24 }}
//       />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               setSelectedJobType(value);
//               fetchJobAreas(value);
//             }}
//           >
//             {jobTypes.map(type => <Option key={type.id} value={type.id}>{type.name}</Option>)}
//           </Select>
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Area"
//             style={{ width: '100%' }}
//             value={selectedJobArea}
//             onChange={(value) => {
//               setSelectedJobArea(value);
//               fetchSchedulerData(value); // Fetch shifts for the selected area
//             }}
//           >
//             {jobAreas.map(area => <Option key={area.id} value={area.id}>{area.name}</Option>)}
//           </Select>
//         </Col>
//         <Col span={8}>
//           <RangePicker
//             value={dateRange}
//             onChange={(dates) => setDateRange(dates)}
//             style={{ width: '100%' }}
//           />
//         </Col>
//         <Col span={8}>
//           <Button type="primary" icon={<DownloadOutlined />}>Export</Button>
//         </Col>
//       </Row>
//       <Tabs activeKey={selectedJobArea} onChange={setSelectedJobArea}>
//         {jobAreas.map(area => (
//           <TabPane tab={area.name} key={area.id}>
//             <Table
//               dataSource={schedulerData[area.id] || []} // Use the scheduler data for the selected job area
//               columns={columns}
//               pagination={false}
//               bordered
//             />
//           </TabPane>
//         ))}
//       </Tabs>
//       <AddJobModal
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         onOk={handleOk}
//         selectedSlot={selectedSlot}
//       />
//     </ProCard>
//   );
// };

// export default ManufacturingPlanner;
// import React, { useEffect, useState } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, Select, Button, Tabs, Table, DatePicker, Card } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// import moment from 'moment';
// import AddJobModal from './AddJobModal';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const { Option } = Select;
// const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;

// const ManufacturingPlanner = () => {
//   const [jobTypes, setJobTypes] = useState([]);
//   const [selectedJobType, setSelectedJobType] = useState(null);
//   const [jobAreas, setJobAreas] = useState([]);
//   const [selectedJobArea, setSelectedJobArea] = useState(null);
//   const [schedulerData, setSchedulerData] = useState([]);
//   const [jobLines, setJobLines] = useState([]);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [dateRange, setDateRange] = useState([moment().startOf('day'), moment().endOf('day')]);

//   // Fetch job types and areas
//   useEffect(() => {
//     fetchJobTypes();
//   }, []);

//   const fetchJobTypes = async () => {
//     try {
//       const response = await request('/job-types');
//       setJobTypes(response.data?.data || []);
//     } catch (error) {
//       console.error('Failed to fetch job types:', error);
//     }
//   };

//   const fetchJobAreas = async (jobTypeId) => {
//     try {
//       const response = await request(`/job-types/${jobTypeId}`);
//       setJobAreas(response.data?.job_areas || []);
//       if (response.data?.job_areas.length > 0) {
//         fetchJobLines(response.data.job_areas[0].id);
//       }
//     } catch (error) {
//       console.error('Failed to fetch job areas:', error);
//     }
//   };

//   const fetchJobLines = async (jobAreaId) => {
//     try {
//       const response = await request(`/job-lines?job_area_id=${jobAreaId}`);
//       setJobLines(response.data?.data || []);
//     } catch (error) {
//       console.error('Failed to fetch job lines:', error);
//     }
//   };

//   // Generate the days of the current week (Monday to Saturday)
//   const getDaysOfWeek = () => {
//     const startOfWeek = moment().startOf('week').add(1, 'day'); // Start on Monday
//     const days = [];
//     for (let i = 0; i < 6; i++) {
//       days.push({
//         day: startOfWeek.clone().add(i, 'days').format('dddd'),
//         date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
//       });
//     }
//     return days;
//   };

//   const handleSlotClick = (record, hour) => {
//     setSelectedSlot({ record, hour });
//     setModalVisible(true);
//   };

//   // Render cards inside the job slot, allow up to 4 tasks per slot
//   const renderJobSlot = (record, hour) => {
//     const slotJobs = record[hour] || [];
//     return (
//       <Droppable droppableId={`${record.day}-${hour}`}>
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={{
//               padding: '10px',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               textAlign: 'center',
//               backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
//             }}
//           >
//             {slotJobs.length === 0 ? (
//               <Card onClick={() => handleSlotClick(record, hour)}>FREE</Card>
//             ) : (
//               slotJobs.map((job, index) => (
//                 <Draggable key={job.id} draggableId={job.id} index={index}>
//                   {(provided) => (
//                     <Card
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       ref={provided.innerRef}
//                       style={{ marginBottom: '10px' }}
//                     >
//                       {job.name} ({job.status})
//                     </Card>
//                   )}
//                 </Draggable>
//               ))
//             )}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     );
//   };

//   // Define the columns for the table (days + job lines)
//   const daysOfWeek = getDaysOfWeek();
//   const columns = [
//     { title: 'Day', dataIndex: 'day', key: 'day', render: (_, record) => `${record.day} (${record.date})` },
//     { title: 'Shift', dataIndex: 'shift', key: 'shift' },
//     ...jobLines.map((line, index) => ({
//       title: line.name,
//       key: `line-${index}`,
//       render: (text, record) => renderJobSlot(record, `h${index + 1}`),
//     })),
//   ];

//   return (
//     <ProCard>
//       <PageHeader title="Manufacturing Planner" subTitle="Manage your production schedules effectively" />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               setSelectedJobType(value);
//               fetchJobAreas(value);
//             }}
//           >
//             {jobTypes.map((type) => (
//               <Option key={type.id} value={type.id}>
//                 {type.name}
//               </Option>
//             ))}
//           </Select>
//         </Col>
//         <Col span={8}>
//           <Select
//             placeholder="Select Job Area"
//             style={{ width: '100%' }}
//             onChange={(value) => setSelectedJobArea(value)}
//           >
//             {jobAreas.map((area) => (
//               <Option key={area.id} value={area.id}>
//                 {area.name}
//               </Option>
//             ))}
//           </Select>
//         </Col>
//         <Col span={8}>
//           <RangePicker value={dateRange} onChange={(dates) => setDateRange(dates)} style={{ width: '100%' }} />
//         </Col>
//       </Row>
//       <Button type="primary" icon={<DownloadOutlined />} style={{ marginTop: 16 }}>
//         Export
//       </Button>
//       <DragDropContext onDragEnd={() => { /* Handle drag and drop functionality */ }}>
//         <Table
//           dataSource={daysOfWeek}
//           columns={columns}
//           pagination={false}
//           bordered
//           style={{ marginTop: 16 }}
//         />
//       </DragDropContext>
//       <AddJobModal visible={isModalVisible} onCancel={() => setModalVisible(false)} />
//     </ProCard>
//   );
// };

// export default ManufacturingPlanner;
import React, { useEffect, useState } from 'react';
import { PageHeader, ProCard } from '@ant-design/pro-components';
import { Row, Col, Select, Button, Tabs, Table, DatePicker, Card, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { request } from 'umi';
import moment from 'moment';
import AddJobModal from './AddJobModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const ManufacturingPlanner = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [jobAreas, setJobAreas] = useState([]);
  const [selectedJobArea, setSelectedJobArea] = useState(null);
  const [schedulerData, setSchedulerData] = useState([]);
  const [jobLines, setJobLines] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dateRange, setDateRange] = useState([moment().startOf('day'), moment().endOf('day')]);

  // Fetch job types and areas
  useEffect(() => {
    fetchJobTypes();
  }, []);

  const fetchJobTypes = async () => {
    try {
      const response = await request('/job-types');
      setJobTypes(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch job types:', error);
    }
  };

  const fetchJobAreas = async (jobTypeId) => {
    try {
      const response = await request(`/job-types/${jobTypeId}`);
      setJobAreas(response.data?.job_areas || []);
      if (response.data?.job_areas.length > 0) {
        setSelectedJobArea(response.data.job_areas[0].id);
        fetchJobLines(response.data.job_areas[0].id);
        fetchShifts(response.data.job_areas[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch job areas:', error);
    }
  };

  const fetchJobLines = async (jobAreaId) => {
    try {
      const response = await request(`/job-lines?job_area_id=${jobAreaId}`);
      setJobLines(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch job lines:', error);
    }
  };

  const fetchShifts = async (jobAreaId) => {
    try {
      const response = await request(`/shifts?job_area_id=${jobAreaId}`);
      setShifts(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
    }
  };

  // Generate the days of the current week (Monday to Saturday)
  const getDaysOfWeek = () => {
    const startOfWeek = moment().startOf('week').add(1, 'day');
    const days = [];
    for (let i = 0; i < 6; i++) {
      days.push({
        day: startOfWeek.clone().add(i, 'days').format('dddd'),
        date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
      });
    }
    return days;
  };

  const handleSlotClick = (record, hour) => {
    setSelectedSlot({ record, hour });
    setModalVisible(true);
  };

  // Render cards inside the job slot, allow up to 4 tasks per slot
  const renderJobSlot = (record, hour) => {
    const slotJobs = record[hour] || [];
    return (
      <Droppable droppableId={`${record.day}-${hour}`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
            }}
          >
            {slotJobs.length === 0 ? (
              <Card onClick={() => handleSlotClick(record, hour)}>FREE</Card>
            ) : (
              slotJobs.map((job, index) => (
                <Draggable key={job.id} draggableId={job.id} index={index}>
                  {(provided) => (
                    <Card
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{ marginBottom: '10px' }}
                    >
                      {job.name} ({job.status})
                    </Card>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  // Define the columns for the table (days + job lines + shifts)
  const daysOfWeek = getDaysOfWeek();
  const columns = [
    { title: 'Day', dataIndex: 'day', key: 'day', render: (_, record) => `${record.day} (${record.date})` },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      render: (_, record) => (
        <div>
          {shifts.map((shift, index) => (
            <div key={index}>
              {shift.name}
              <Divider style={{ margin: '5px 0' }} /> {/* Horizontal line for each shift */}
            </div>
          ))}
        </div>
      ),
    },
    ...jobLines.map((line, index) => ({
      title: line.name,
      key: `line-${index}`,
      render: (text, record) => (
        <>
          {renderJobSlot(record, `h${index + 1}`)} {/* Day Shift */}
          <Divider style={{ margin: '10px 0' }} /> {/* Divider for day and night shifts */}
          {renderJobSlot(record, `h${index + 1}-night`)} {/* Night Shift */}
        </>
      ),
    })),
  ];

  return (
    <ProCard>
      <PageHeader title="Manufacturing Planner" subTitle="Manage your production schedules effectively" />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Select
            placeholder="Select Job Type"
            style={{ width: '100%' }}
            onChange={(value) => {
              setSelectedJobType(value);
              fetchJobAreas(value);
            }}
          >
            {jobTypes.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <RangePicker value={dateRange} onChange={(dates) => setDateRange(dates)} style={{ width: '100%' }} />
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="0" onChange={(key) => {
        setSelectedJobArea(key);
        fetchShifts(key);
      }}>
        {jobAreas.map((area) => (
          <TabPane tab={area.name} key={area.id}>
            <DragDropContext onDragEnd={() => { /* Handle drag and drop functionality */ }}>
              <Table
                dataSource={daysOfWeek}
                columns={columns}
                pagination={false}
                bordered
                style={{ marginTop: 16 }}
                rowClassName={() => 'row-class'} // Optional for custom styling
              />
              <Divider style={{ margin: '10px 0' }} /> {/* Divider for entire table */}
            </DragDropContext>
          </TabPane>
        ))}
      </Tabs>

      <Button type="primary" icon={<DownloadOutlined />} style={{ marginTop: 16 }}>
        Export
      </Button>
      <AddJobModal visible={isModalVisible} onCancel={() => setModalVisible(false)} />
    </ProCard>
  );
};

export default ManufacturingPlanner;
