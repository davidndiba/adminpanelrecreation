// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
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
//               status: jobDetails.status,
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
//       backgroundColor: isCompleted ? '#F9D4D3' : isInProgress ? '#FFF6E0' : isFree ? '#F8F4FE' : '#FFFFFF',
//       color: isCompleted ? '#CD2A21' : isInProgress ? '#D77F1E' : isFree ? '#6200EE' : '#000000',
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
//             onChange={fetchJobAreas} // Now fetchJobAreas is correctly referenced here
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
//     const destinationAreaId = activeTab; // This can be adjusted to allow moving between areas if needed

//     const sourceJobs = areaData[sourceAreaId][source.index][source.droppableId] || [];
//     const destinationJobs = areaData[destinationAreaId][destination.index][destination.droppableId] || [];

//     const movedJob = sourceJobs[source.index];

//     // Remove the job from the source slot
//     const updatedSourceJobs = sourceJobs.filter((_, index) => index !== source.index);

//     // Add the job to the destination slot
//     const updatedDestinationJobs = [...destinationJobs, movedJob];

//     // Update the areaData state
//     setAreaData(prevState => ({
//       ...prevState,
//       [sourceAreaId]: prevState[sourceAreaId].map((row, index) => {
//         if (index === source.index) {
//           return { ...row, [source.droppableId]: updatedSourceJobs };
//         }
//         if (index === destination.index) {
//           return { ...row, [destination.droppableId]: updatedDestinationJobs };
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
//       <Droppable droppableId={`${record.key}-${hour}`}>
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
//                   {
//                     title: 'Job 1',
//                     dataIndex: 'h1',
//                     key: 'h1',
//                     render: (text, record) => renderJobSlot(text, record, 'h1'),
//                   },
//                   {
//                     title: 'Job 2',
//                     dataIndex: 'h2',
//                     key: 'h2',
//                     render: (text, record) => renderJobSlot(text, record, 'h2'),
//                   },
//                   {
//                     title: 'Job 3',
//                     dataIndex: 'h3',
//                     key: 'h3',
//                     render: (text, record) => renderJobSlot(text, record, 'h3'),
//                   },
//                   {
//                     title: 'Job 4',
//                     dataIndex: 'h4',
//                     key: 'h4',
//                     render: (text, record) => renderJobSlot(text, record, 'h4'),
//                   },
//                 ]}
//                 pagination={false}
//               />
//             </TabPane>
//           ))}
//         </Tabs>
//       </DragDropContext>
//       <AddJobModal
//         isModalVisible={isModalVisible}
//         handleCancel={handleCancel}
//         handleOk={handleOk}
//         selectedSlot={selectedSlot}
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const initialAreaData = {
  tab1: [
    { key: 'day1-slot1', slot1: [{ id: 'job1', name: 'Job 1' }], slot2: [] },
    { key: 'day1-slot2', slot1: [], slot2: [{ id: 'job2', name: 'Job 2' }] },
  ],
  tab2: [
    { key: 'day2-slot1', slot1: [{ id: 'job3', name: 'Job 3' }], slot2: [] },
    { key: 'day2-slot2', slot1: [], slot2: [{ id: 'job4', name: 'Job 4' }] },
  ],
};

const Planner = () => {
  const [startDate, setStartDate] = useState(moment().startOf('week').add(1, 'days'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobAreas, setJobAreas] = useState([]);
  // const [areaData, setAreaData] = useState({});
  // const [activeTab, setActiveTab] = useState(null);
  const [areaData, setAreaData] = useState(initialAreaData);
  const [activeTab, setActiveTab] = useState('tab1');

  const generateWeeklyData = (start) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days.flatMap((day, index) => {
      const date = start.clone().add(index, 'days').format('ddd, D MMM YYYY');
      return [
        { key: `${day}-Day`, day: day, date: date, shift: 'Day', h1: [], h2: [], h3: [], h4: [] },
        { key: `${day}-Night`, day: day, date: date, shift: 'Night', h1: [], h2: [], h3: [], h4: [] },
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

      const updatedRows = updatedAreaData[areaId].map(row => {
        if (row.key === selectedSlot.key) {
          return {
            ...row,
            [selectedSlot.hour]: [
              ...row[selectedSlot.hour],  // Keep existing jobs
              {
                jobNumber: jobDetails.jobNumber,
                description: jobDetails.comments || 'No description',
                bookedQuantity: jobDetails.bookedQuantity,
                size: jobDetails.size,
                status: jobDetails.jobStatus,
              },
            ],
          };
        }
        return row;
      });

      setAreaData({
        ...areaData,
        [areaId]: updatedRows,
      });
    }
    handleCancel();
  };

  // Function to handle the drag end event
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
//       />
//     </ProCard>
//   );
// };

// export default Planner;
 const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceAreaId = activeTab; // Use the current active tab
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const sourceDroppableId = source.droppableId.split('-'); // Extracting day and shift
    const destinationDroppableId = destination.droppableId.split('-'); // Extracting day and shift

    const sourceDayKey = `${sourceDroppableId[0]}-${sourceDroppableId[1]}`;
    const destinationDayKey = `${destinationDroppableId[0]}-${destinationDroppableId[1]}`;

    const sourceRow = areaData[sourceAreaId].find(row => row.key === sourceDayKey);
    const destinationRow = areaData[sourceAreaId].find(row => row.key === destinationDayKey);

    const sourceJobs = sourceRow[sourceDroppableId[2]];
    const destinationJobs = destinationRow[destinationDroppableId[2]];

    const movedJob = sourceJobs[sourceIndex];

    // Remove the job from the source slot
    const updatedSourceJobs = [...sourceJobs.slice(0, sourceIndex), ...sourceJobs.slice(sourceIndex + 1)];

    // Add the job to the destination slot
    const updatedDestinationJobs = [
      ...destinationJobs.slice(0, destinationIndex),
      movedJob,
      ...destinationJobs.slice(destinationIndex),
    ];

    // Update the areaData state
    setAreaData(prevState => ({
      ...prevState,
      [sourceAreaId]: prevState[sourceAreaId].map((row) => {
        if (row.key === sourceDayKey) {
          return { ...row, [sourceDroppableId[2]]: updatedSourceJobs };
        }
        if (row.key === destinationDayKey) {
          return { ...row, [destinationDroppableId[2]]: updatedDestinationJobs };
        }
        return row;
      }),
    }));
  };

  const renderJobSlot = (jobData, record, hour) => {
    const slotJobs = jobData || [];

    // Define the styles based on each job's status
    const getJobStyle = (status) => {
      if (status === 'Completed') {
        return { backgroundColor: '#F9D4D3', color: '#CD2A21' };
      } else if (status === 'In Progress') {
        return { backgroundColor: '#FFF6E0', color: '#D77F1E' };
      } else {
        return { backgroundColor: '#F8F4FE', color: '#6200EE' };
      }
    };

    return (
      <Droppable droppableId={`${record.day}-${record.shift}-${hour}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
            }}
            onClick={() => handleSlotClick(record, hour)}
          >
            {slotJobs.length === 0 ? (
              'FREE'
            ) : (
              slotJobs.map((job, index) => (
                <Draggable key={job.id} draggableId={`${job.id}-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: '5px',
                        ...getJobStyle(job.status),
                        ...provided.draggableProps.style,
                      }}
                    >
                      {`${job.name} - ${job.description}`}
                    </div>
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
            onChange={fetchJobAreas}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" icon={<DownloadOutlined />}>Export</Button>
        </Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {jobAreas.map(area => (
            <TabPane tab={area.name} key={area.id}>
              <Table
                dataSource={areaData[area.id] || []}
                columns={[
                  { title: 'Day', dataIndex: 'day', key: 'day' },
                  { title: 'Shift', dataIndex: 'shift', key: 'shift' },
                  { title: 'H1', key: 'h1', render: (text, record) => renderJobSlot(record.h1, record, 'h1') },
                  { title: 'H2', key: 'h2', render: (text, record) => renderJobSlot(record.h2, record, 'h2') },
                  { title: 'H3', key: 'h3', render: (text, record) => renderJobSlot(record.h3, record, 'h3') },
                  { title: 'H4', key: 'h4', render: (text, record) => renderJobSlot(record.h4, record, 'h4') },
                ]}
                pagination={false}
                bordered
              />
            </TabPane>
          ))}
        </Tabs>
      </DragDropContext>
      <AddJobModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        selectedSlot={selectedSlot}
      />
    </ProCard>
  );
};

export default Planner;

// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
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
//         { key: `${day}-Day`, day: `${day}, ${date}`, shift: 'Day', h1: [], h2: [], h3: [], h4: [] },
//         { key: `${day}-Night`, day: `${day}, ${date}`, shift: 'Night', h1: [], h2: [], h3: [], h4: [] },
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
//                 description: jobDetails.details || 'No description',
//                 bookedQuantity: jobDetails.bookedQuantity,
//                 size: jobDetails.size,
//                 status: jobDetails.status,
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
//       <div
//         style={{
//           padding: '10px',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           textAlign: 'center',
//           backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
//         }}
//         onClick={() => handleSlotClick(record, hour)}
//       >
//         {slotJobs.length === 0 ? (
//           'FREE'
//         ) : (
//           slotJobs.map((job, index) => (
//             <div key={index} style={{ marginBottom: '5px', ...getJobStyle(job.status) }}>
//               {`${job.jobNumber} (${job.bookedQuantity}/${job.size}) - ${job.description}`}
//             </div>
//           ))
//         )}
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
