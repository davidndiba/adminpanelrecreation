// import React from 'react';
// import {  Table } from 'antd';
// import { PageHeader } from '@ant-design/pro-components';

// const DataSheet: React.FC = () => {
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//   ];

//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//     },
   
//   ];

//   return (
//     <div>
//       <PageHeader title="Data Sheet" subTitle="Manage and view data" />
//       <Table columns={columns} dataSource={data} />
//     </div>
//   );
// };

// export default DataSheet;
// import React, { useState, useEffect } from 'react';
// import { PageHeader, ProCard } from '@ant-design/pro-components';
// import { Row, Col, DatePicker, Select, Button, Table, Tabs } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import AddJobModal from '../Planner/AddJobModal';
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



// import React from "react";
// import { Table, Button } from "antd";
// import "./ScheduleTable.less"; // Optional: for custom styling

// // Sample data
// const scheduleData = [
//   {
//     key: "1",
//     day: "Monday",
//     date: "07 Oct 2024",
//     shifts: [
//       { time: "Day", a1: "FREE", a2: "FREE", a3: "FREE" },
//       { time: "Night", a1: "FREE", a2: "FREE", a3: "FREE" },
//     ],
//   },
//   {
//     key: "2",
//     day: "Tuesday",
//     date: "08 Oct 2024",
//     shifts: [
//       { time: "Day", a1: "FREE", a2: "FREE", a3: "FREE" },
//       { time: "Night", a1: "FREE", a2: "FREE", a3: "FREE" },
//     ],
//   },
//   // Add more days here as needed...
// ];

// // Function to render nested tables for each shift
// const ShiftTable = ({ shifts }) => {
//   const columns = [
//     {
//       title: "Shift",
//       dataIndex: "time",
//       key: "time",
//     },
//     {
//       title: "A1",
//       dataIndex: "a1",
//       key: "a1",
//       render: (text) => (
//         <Button type="text" className="shift-button">
//           {text}
//         </Button>
//       ),
//     },
//     {
//       title: "A2",
//       dataIndex: "a2",
//       key: "a2",
//       render: (text) => (
//         <Button type="text" className="shift-button">
//           {text}
//         </Button>
//       ),
//     },
//     {
//       title: "A3",
//       dataIndex: "a3",
//       key: "a3",
//       render: (text) => (
//         <Button type="text" className="shift-button">
//           {text}
//         </Button>
//       ),
//     },
//   ];

//   return <Table columns={columns} dataSource={shifts} pagination={false} />;
// };

// const ScheduleTable = () => {
//   const columns = [
//     {
//       title: "Day",
//       dataIndex: "day",
//       key: "day",
//       render: (text, record) => (
//         <div>
//           <b>{text}</b>
//           <br />
//           <small className="text-muted">{record.date}</small>
//         </div>
//       ),
//     },
//     {
//       title: "Shifts",
//       dataIndex: "shifts",
//       key: "shifts",
//       render: (shifts) => <ShiftTable shifts={shifts} />,
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={scheduleData}
//       bordered
//       pagination={false}
//       className="custom-schedule-table"
//     />
//   );
// };

// export default ScheduleTable;

// ScheduleTable.jsx

  // import React, { useState, useEffect } from "react";
  // import {
  //   Table,
  //   Button,
  //   Modal,
  //   message,
  //   Select,
  //   Row,
  //   Col,
  //   Input,
  //   Tabs,
  //   Card,
  // } from "antd";
  // import moment from "moment";
  // import { useRequest } from '@umijs/max';
  // import { request } from "umi"; // Adjust based on your setup
  // import "./ScheduleTable.less"; // Custom CSS for styling
  // import AddJobModal from "./AddJobModal";

  // const ScheduleTable = () => {
  //   const [currentDate, setCurrentDate] = useState(moment());
  //   const [scheduleData, setScheduleData] = useState([]);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [selectedCell, setSelectedCell] = useState(null);
  //   const [jobType, setJobType] = useState(null);
  //   const [jobAreas, setJobAreas] = useState([]);
  //   const [activeJobArea, setActiveJobArea] = useState(null);
  //   const [searchValue, setSearchValue] = useState("");
  //   const [jobLines, setJobLines] = useState([]); // New state for job lines
  //   const [jobData, setJobData] = useState({}); // Store job data for each slot
  //   const [currentCardData, setCurrentCardData] = useState({}); // Track current card data
  //   const [shifts, setShifts] = useState([]);

  //   useEffect(() => {
  //     const fetchShifts = async () => {
  //       try {
  //         const response = await request('/shifts');
  //         if (response.success) {
  //           setShifts(response.data.data); // Set the fetched shifts
  //         } else {
  //           message.error("Failed to load shifts");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching shifts:", error);
  //         message.error("Error fetching shifts");
  //       }
  //     };
  
  //     fetchShifts();
  //   }, []);


  //   const handleAddJob = async (newJob) => {
  //     // Log the incoming new job data
  //     console.log('New Job Data:', newJob);
  
  //     const addedJob = {
  //       id: newJob.id,
  //       schedule_job_id: newJob.schedule_job_id,
  //       job_line_id: newJob.job_line_id,
  //       shift_id: newJob.shift_id,
  //       schedule_date: newJob.schedule_date,
  //       capacity: newJob.capacity,
  //       booked_qty: newJob.booked_qty,
  //       comments: newJob.comments,
  //       schedule_status_id: newJob.schedule_status_id,
  //     };
  
  //     const key = `${selectedCell.schedule_date}-${selectedCell.job_line_id}`; 
  //     setJobData((prev) => ({
  //       ...prev,
  //       [key]: addedJob, // Update job data for the selected slot
  //     }));
  
  //     try {
  //       console.log('Added Job Object:', addedJob);
  //       // Call your API to add the job here, e.g. await request.post('/api/jobs', addedJob);
  //       // refreshSchedules(); // If needed to refresh data
  //       message.success("Job added successfully!");
  //       handleModalClose(); // Close modal after adding job
  //     } catch (error) {
  //       console.error('Error adding job:', error);
  //       message.error("Failed to add job");
  //     }
  //   };
  
  //   const handleModalClose = () => {
  //     setIsModalVisible(false);
  //     setSelectedCell(null); // Reset selected cell on modal close
  //   };
  //   const handleCellClick = (record, hour, lineId, shiftId, job) => {
  //     // Set selected slot with details for the modal
  //     setSelectedCell({
  //       schedule_date: record.date, // Store the selected day (date)
  //       hour, // Store the time (hour)
  //       job_line_id: lineId, // Store the job line ID
  //       job_line_name: lineId.name,
  //       shift_id: shiftId, // Store the shift ID
  //       ...(job ? {
  //         schedule_job_id: job.schedule_job_id,
  //         capacity: job.capacity,
  //         booked_qty: job.booked_qty,
  //         comments: job.comments,
  //         schedule_status_id: job.schedule_status_id,
  //       } : {}),
  //     });
      
  //     // Set modal visible
  //     setIsModalVisible(true);
  //     console.log('Slot clicked:', { record, hour, lineId, shiftId });
  //   };

  //   // Fetch job types
  //   const { data: jobTypes } = useRequest(() =>
  //     request('/job-types').then((res) => ({ data: res?.data?.data }))
  //   );

  //   // Load the first job type and fetch job areas if job types exist
  //   useEffect(() => {
  //     if (jobTypes && jobTypes.length > 0) {
  //       const firstJobTypeId = jobTypes[0].id;
  //       handleJobTypeChange(firstJobTypeId); // Automatically load the first job type
  //       setJobType(firstJobTypeId); // Set the job type state
  //     }
  //   }, [jobTypes]);

  //   const getDaysOfWeek = (selectedDate) => {
  //     const startOfWeek = moment(selectedDate).startOf("isoWeek");
  //     const days = [];
  //     for (let i = 0; i < 6; i++) {
  //       days.push({
  //         key: `${i}-day`,
  //         day: startOfWeek.clone().add(i, "days").format("dddd"),
  //         date: startOfWeek.clone().add(i, "days").format("DD MMM YYYY"),
  //       });
  //     }
  //     return days;
  //   };

  //   const generateInitialData = (days) => {
  //     const initialData = [];

  //     days.forEach((day, index) => {
  //       const dayShift = {
  //         key: `${index}-day`,
  //         day: day.day,
  //         date: day.date,
  //         shift: "Day",
  //         // Add your initial values for the job lines here
  //         rowSpan: 2,
  //       };

  //       const nightShift = {
  //         key: `${index}-night`,
  //         day: "",
  //         date: "",
  //         shift: "Night",
  //         rowSpan: 0,
  //       };

  //       initialData.push(dayShift);
  //       initialData.push(nightShift);
  //     });

  //     return initialData;
  //   };

  //   useEffect(() => {
  //     const days = getDaysOfWeek(currentDate);
  //     const initialData = generateInitialData(days);
  //     setScheduleData(initialData);
  //   }, [currentDate]);

  //   const handlePrevWeek = () => {
  //     setCurrentDate((prev) => prev.clone().subtract(1, "weeks"));
  //   };

  //   const handleNextWeek = () => {
  //     setCurrentDate((prev) => prev.clone().add(1, "weeks"));
  //   };

  //   // const handleCellClick = (day, shift, line) => {
  //   //   setSelectedCell({ day, shift, line });
  //   //   setIsModalVisible(true);
  //   // };

  //   // const handleModalClose = () => {
  //   //   setIsModalVisible(false);
  //   //   setSelectedCell(null);
  //   // };

  //   const handleStatusChange = () => {
  //     message.success("Status changed successfully!");
  //     handleModalClose();
  //   };

  //   // Columns that will remain static
  //   const staticColumns = [
  //     {
  //       title: "Day",
  //       dataIndex: "day",
  //       key: "day",
  //       fixed: "left",
  //       width: 150,
  //       render: (text, record) => ({
  //         children: (
  //           <div>
  //             <b>{text}</b>
  //             <br />
  //             <small className="text-muted">{record.date}</small>
  //           </div>
  //         ),
  //         props: {
  //           rowSpan: record.rowSpan,
  //         },
  //       }),
  //     },
  //     {
  //       title: "Shift",
  //       dataIndex: "shift",
  //       key: "shift",
  //       width: 100,
  //       render: (text) => <b>{text}</b>,
  //     },
  //   ];

  //   // Fetch job areas when job type is selected
  //   const handleJobTypeChange = async (value) => {
  //     setJobType(value);
  //     setActiveJobArea(null); // Reset active job area
  //     if (value) {
  //       const response = await request(`/job-types/${value}`);
  //       if (response.success) {
  //         setJobAreas(response.data.job_areas);
  //       } else {
  //         message.error("Failed to load job areas");
  //       }
  //     }
  //   };

  //   // Fetch job lines when the job area tab changes
  //   const handleTabChange = async (key) => {
  //     setActiveJobArea(key);
  //     const response = await request(`/job-areas/${key}`);
  //     if (response.success) {
  //       setJobLines(response.data.job_lines.map(line => line.name)); // Extract job line names
  //     } else {
  //       message.error("Failed to load job lines");
  //     }
  //   };
  //   // const generateDynamicColumns = () => {
  //   //   return jobLines.map((line, index) => ({
  //   //     title: line,
  //   //     dataIndex: line,
  //   //     key: line,
  //   //     width: 120,
  //   //     render: (text, record) => (
  //   //       <Card
  //   //         className={`shift-card ${text === "FREE"}`}
  //   //         onClick={() => handleCellClick(record.day, record.shift, line)}
  //   //         hoverable
  //   //         style={{
  //   //           width: "80px",
  //   //           height: "70px",
  //   //           display: "flex",
  //   //           alignItems: "center",
  //   //           justifyContent: "center",
  //   //           cursor: "pointer",
  //   //           border: "2px solid", // Ensures there's a visible border
  //   //           // borderColor: text === "FREE" ? "#6f42c1" : "#f00", // Different colors based on status
  //   //         }}
  //   //       >
  //   //         {text}
  //   //       </Card>
  //   //     ),
  //   //   }));
  //   // };
  //   const generateDynamicColumns = () => {
  //     return jobLines.map((line, index) => ({
  //       title: line,
  //       dataIndex: line,
  //       key: line,
  //       width: 120,
  //       render: (text, record) => (
  //         <Card
  //           className={`shift-card ${text === "FREE" ? "free-card" : "filled-card"}`}
  //           onClick={() => handleCellClick(record, record.hour, line, record.shift_id, jobData[`${record.date}-${line}`])} // Call the click handler with necessary data
  //           hoverable
  //           style={{
  //             width: "80px",
  //             height: "70px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             cursor: "pointer",
  //             border: "2px solid",
  //             borderColor: text === "FREE" ? "#6f42c1" : "#f00", // Different colors based on status
  //           }}
  //         >
  //           {text === "FREE" ? (
  //             <span style={{ textAlign: 'center', color: '#6f42c1' }}>{text}</span>
  //           ) : (
  //             <span style={{ textAlign: 'center', color: '#000' }}>{text}</span>
  //           )}
  //         </Card>
  //       ),
  //     }));
  //   };
  //   const columns = [...staticColumns, ...generateDynamicColumns()]; // Combine static and dynamic columns

  //   return (
  //     <div className="schedule-container">
  //       <Row gutter={16}>
  //         <Col span={12}>
  //           <h1>TRT Manufacturing Planner</h1>
  //           <p>Hi System Administrator, welcome back! Here's your planner summary.</p>
  //         </Col>
  //         <Col span={12} style={{ textAlign: 'right' }}>
  //           <b>Start Date: </b>
  //           <span>{currentDate.clone().startOf("isoWeek").format("DD MMM YYYY")}</span>
  //           <br />
  //           <b>End Date: </b>
  //           <span>{currentDate.clone().endOf("isoWeek").format("DD MMM YYYY")}</span>
  //         </Col>
  //       </Row>
  //       <Row gutter={16} style={{ marginTop: '10px' }}>
  //         <Col span={8}>
  //           <b>Job Type</b>
  //           <Select
  //             options={jobTypes?.map((job) => ({
  //               label: job?.name,
  //               value: job?.id,
  //             }))}
  //             placeholder="Select Job Type"
  //             style={{ width: '100%' }}
  //             onChange={handleJobTypeChange}
  //           />
  //         </Col>
  //         <Col span={8}>
  //           <b>Search</b>
  //           <Input
  //             placeholder="Search..."
  //             value={searchValue}
  //             onChange={(e) => setSearchValue(e.target.value)}
  //             style={{ width: '100%' }}
  //           />
  //         </Col>
  //       </Row>
  //       <Row gutter={16} style={{ marginTop: '20px' }}>
  //         <Col span={12}>
  //           <Button onClick={handlePrevWeek}>Previous Week</Button>
  //         </Col>
  //         <Col span={12} style={{ textAlign: 'right' }}>
  //           <Button onClick={handleNextWeek}>Next Week</Button>
  //         </Col>
  //       </Row>
  //       {jobAreas.length > 0 && (
  //         <Tabs
  //           defaultActiveKey={jobAreas[0].id}
  //           onChange={handleTabChange}
  //           style={{ marginTop: '20px' }}
  //         >
  //           {jobAreas.map((area) => (
  //             <Tabs.TabPane tab={area.name} key={area.id}>
  //               <Table
  //                 columns={columns}
  //                 dataSource={scheduleData}
  //                 bordered
  //                 pagination={false}
  //                 className="custom-schedule-table"
  //                 scroll={{ x: "max-content" }}
  //               />
  //             </Tabs.TabPane>
  //           ))}
  //         </Tabs>
  //       )}
  //       <Modal
  //         title="Shift Details"
  //         visible={isModalVisible}
  //         onCancel={handleModalClose}
  //         footer={null} // Handle the modal footer with AddJobModal
  //       >
  //         {selectedCell && (
  //           <AddJobModal
  //             visible={isModalVisible}
  //             onCancel={handleModalClose}
  //             selectedCell={selectedCell} // Pass the selected cell data
  //             onAddJob={handleAddJob} // Callback to handle job addition
  //           />
  //         )}
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default ScheduleTable;
  import React, { useState, useEffect } from "react";
  import {
    Table,
    Button,
    Modal,
    message,
    Select,
    Row,
    Col,
    Input,
    Tabs,
    Card,
  } from "antd";
  import moment from "moment";
  import { useRequest } from '@umijs/max';
  import { request } from "umi"; // Adjust based on your setup
  import "./ScheduleTable.less"; // Custom CSS for styling
  import AddJobModal from "./AddJobModal";
  
  const ScheduleTable = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [scheduleData, setScheduleData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const [jobType, setJobType] = useState(null);
    const [jobAreas, setJobAreas] = useState([]);
    const [activeJobArea, setActiveJobArea] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [jobLines, setJobLines] = useState([]); // New state for job lines
    const [jobData, setJobData] = useState({}); // Store job data for each slot
    const [currentCardData, setCurrentCardData] = useState({}); // Track current card data
    const [shifts, setShifts] = useState([]); // New state for shifts
    const [schedules, setSchedules] = useState([]);


    useEffect(() => {
      const fetchSchedules = async () => {
        try {
          const response = await request('/schedules');
          if (response.success) {
            setSchedules(response.data); // Store the fetched schedules
          } else {
            message.error("Failed to load schedules");
          }
        } catch (error) {
          console.error("Error fetching schedules:", error);
          message.error("Error fetching schedules");
        }
      };
    
      fetchSchedules();
    }, []);

    // Fetch shifts when the component mounts
    useEffect(() => {
      const fetchShifts = async () => {
        try {
          const response = await request('/shifts');
          if (response.success) {
            setShifts(response.data.data); // Set the fetched shifts
          } else {
            message.error("Failed to load shifts");
          }
        } catch (error) {
          console.error("Error fetching shifts:", error);
          message.error("Error fetching shifts");
        }
      };
  
      fetchShifts();
    }, []);
  
    // Fetch job types
    const { data: jobTypes } = useRequest(() =>
      request('/job-types').then((res) => ({ data: res?.data?.data }))
    );
  
    // Load the first job type and fetch job areas if job types exist
    useEffect(() => {
      if (jobTypes && jobTypes.length > 0) {
        const firstJobTypeId = jobTypes[0].id;
        handleJobTypeChange(firstJobTypeId); // Automatically load the first job type
        setJobType(firstJobTypeId); // Set the job type state
      }
    }, [jobTypes]);
  
    // Fetch job areas when job type is selected
    const handleJobTypeChange = async (value) => {
      setJobType(value);
      setActiveJobArea(null); // Reset active job area
      if (value) {
        const response = await request(`/job-types/${value}`);
        if (response.success) {
          setJobAreas(response.data.job_areas);
        } else {
          message.error("Failed to load job areas");
        }
      }
    };
  
    // Fetch job lines when the job area tab changes
    const handleTabChange = async (key) => {
      setActiveJobArea(key);
      const response = await request(`/job-areas/${key}`);
      if (response.success) {
        setJobLines(response.data.job_lines); // Store complete job line objects
      } else {
        message.error("Failed to load job lines");
      }
    };
  
    // Generate the days of the current week (Monday to Saturday)
    const getDaysOfWeek = (selectedDate) => {
      const startOfWeek = moment(selectedDate).startOf("isoWeek");
      const days = [];
      for (let i = 0; i < 6; i++) { // Monday to Saturday (6 days)
        const dayDate = startOfWeek.clone().add(i, "days");
        days.push({
          key: `${i}-day`,
          day: dayDate.format("dddd"),
          date: dayDate.format("YYYY-MM-DD"), // Change this to a standard format for easier comparisons
        });
      }
      return days;
    };
    
    // const generateInitialData = (days) => {
    //   const initialData = [];
  
    //   days.forEach((day, index) => {
    //     shifts.forEach(shift => { // Loop through each shift
    //       const dayShift = {
    //         key: `${index}-${shift.id}`, // Unique key for each shift per day
    //         day: day.day,
    //         date: day.date,
    //         shift: shift.name, // Use the shift name from the fetched data
    //         shift_id: shift.id, // Store the shift ID
    //         rowSpan: 1, // Each shift has its own row
    //       };
    //       initialData.push(dayShift);
    //     });
    //   });
  
    //   return initialData;
    // };
    const generateInitialData = (days) => {
      const initialData = [];
    
      days.forEach((day, index) => {
        shifts.forEach(shift => {
          // Find the corresponding schedule for the current day and shift
          const schedule = schedules.find(sched => 
            moment(sched.schedule_date).isSame(day.date, 'day') &&
            sched.shift_id === shift.id
          );
    
          // Log each schedule found for debugging
          console.log(`Schedule found for ${day.date} and shift ${shift.name}:`, schedule);
          
          const dayShift = {
            key: `${index}-${shift.id}`,
            day: day.day,
            date: day.date,
            shift: shift.name,
            shift_id: shift.id,
            rowSpan: 1,
            ...schedule && {
              schedule_job_id: schedule.schedule_job_id,
              capacity: schedule.capacity,
              booked_qty: schedule.booked_qty,
              comments: schedule.comments,
              schedule_status_id: schedule.schedule_status_id,
            },
          };
          initialData.push(dayShift);
        });
      });
    
      console.log("Initial Data Generated:", initialData); // Log initial data generated
      return initialData;
    };

    // const refreshSchedules = () => {
    //   const days = getDaysOfWeek(currentDate);
    //   const data = generateInitialData(days);
    //   setScheduleData(data); // Populate the scheduleData state with initial data
    // };
  
    // useEffect(() => {
    //   refreshSchedules(); // Initialize the schedule data when the component mounts or shifts change
    // }, [shifts, currentDate,schedules]);
    const refreshSchedules = () => {
      const days = getDaysOfWeek(currentDate);
      const data = generateInitialData(days); // Ensure this function correctly uses schedules
      console.log("Refreshing schedules with current date:", currentDate.format("YYYY-MM-DD"));
      console.log("Generated Schedule Data:", data); // Log the data being set
      setScheduleData(data); // Populate the scheduleData state with initial data
    };
    
    useEffect(() => {
      console.log("Fetched schedules:", schedules); // Log fetched schedules
      refreshSchedules(); // Call refresh after fetching schedules
    }, [shifts, currentDate, schedules]); // Adding schedules to the dependency array
    
    const handlePrevWeek = () => {
      setCurrentDate((prev) => prev.clone().subtract(1, "weeks"));
    };
  
    const handleNextWeek = () => {
      setCurrentDate((prev) => prev.clone().add(1, "weeks"));
    };
  //   const handleAddJob = async (newJob) => {
  //     // Log the incoming new job data
  //     console.log('New Job Data:', newJob);
  
  //     const formattedDate = moment(newJob.schedule_date, "DD MMM YYYY").format("YYYY-MM-DD");
  
  //     const addedJob = {
  //         id: newJob.id,
  //         schedule_job_id: newJob.schedule_job_id,
  //         job_line_id: newJob.job_line_id,
  //         shift_id: newJob.shift_id,
  //         schedule_date: formattedDate, // Use formatted date here
  //         capacity: newJob.capacity,
  //         booked_qty: newJob.booked_qty,
  //         comments: newJob.comments,
  //         schedule_status_id: newJob.schedule_status_id,
  //     };
  
  //     const key = `${selectedCell.schedule_date}-${selectedCell.job_line_id}-${selectedCell.shift_id}`; 
  //     setJobData((prevData) => {
  //         const existingJobs = prevData[key] || []; // Get existing jobs for this specific shift
  //         return {
  //             ...prevData,
  //             [key]: [...existingJobs, addedJob], // Add new job to the existing array
  //         };
  //     });
  
  
  //     try {
  //         console.log('Added Job Object:', addedJob);
  //         // Call your API to add the job here, e.g. await request.post('/api/jobs', addedJob);
  //         refreshSchedules(); // If needed to refresh data
  //         message.success("Job added successfully!");
  //         handleModalClose(); // Close modal after adding job
  //     } catch (error) {
  //         console.error('Error adding job:', error);
  //         message.error("Failed to add job");
  //     }
  // };
  
  const handleAddJob = async (newJob) => {
    console.log('New Job Data:', newJob);
    
    const formattedDate = moment(newJob.schedule_date, "DD MMM YYYY").format("YYYY-MM-DD");
    
    const addedJob = {
      id: newJob.id,
      schedule_job_id: newJob.schedule_job_id,
      job_line_id: newJob.job_line_id,
      shift_id: newJob.shift_id,
      schedule_date: formattedDate,
      capacity: newJob.capacity,
      booked_qty: newJob.booked_qty,
      comments: newJob.comments,
      schedule_status_id: newJob.schedule_status_id,
    };
  
    const key = `${selectedCell.schedule_date}-${selectedCell.job_line_id}-${selectedCell.shift_id}`; 
    setJobData((prevData) => {
        const existingJobs = prevData[key] || [];
        return {
            ...prevData,
            [key]: [...existingJobs, addedJob],
        };
    });
  
    try {
        console.log('Added Job Object:', addedJob);
        // await request.post('/api/jobs', addedJob); // Call your API to add the job
        // Refresh schedules to reflect the new job
        const response = await request('/schedules'); // Re-fetch schedules
        if (response.success) {
          setSchedules(response.data); // Update schedules with fresh data
          message.success("Job added successfully!");
        } else {
          message.error("Failed to load schedules after adding job.");
        }
        
        handleModalClose(); // Close modal after adding job
    } catch (error) {
        console.error('Error adding job:', error);
        message.error("Failed to add job");
    }
  };
  

    const handleModalClose = () => {
      setIsModalVisible(false);
      setSelectedCell(null); // Reset selected cell on modal close
    };
  
    const handleCellClick = (record, line, shiftId, job) => {
      // Ensure line is an object with id and name
      if (!line || !line.id || !line.name) {
        message.error("Invalid job line data.");
        return;
      }
  
      // Set selected slot with details for the modal
      setSelectedCell({
        schedule_date: record.date, // Store the selected day (date)
        job_line_id: line.id, // Store the job line ID
        job_line_name: line.name, // Store the job line name
        shift_id: shiftId, // Store the shift ID
        ...(job ? {
          schedule_job_id: job.schedule_job_id,
          capacity: job.capacity,
          booked_qty: job.booked_qty,
          comments: job.comments,
          schedule_status_id: job.schedule_status_id,
        } : {}),
      });
  
      // Set modal visible
      setIsModalVisible(true);
      console.log('Slot clicked:', { record, line, shiftId });
      console.log('Selected Slot:', {
        schedule_date: record.date,
        job_line_id: line.id,
        job_line_name: line.name,
        shift_id: shiftId,
        ...(job ? {
          schedule_job_id: job.schedule_job_id,
          capacity: job.capacity,
          booked_qty: job.booked_qty,
          comments: job.comments,
          schedule_status_id: job.schedule_status_id,
        } : {}),
      });
    };
  
    // Generate the days of the current week (Monday to Saturday)
    const daysOfWeek = getDaysOfWeek(currentDate);
  //   const generateDynamicColumns = () => {
  //     return jobLines.map((line) => ({
  //         title: line.name,
  //         dataIndex: line.name,
  //         key: line.id,
  //         width: 120,
  //         render: (text, record) => {
  //             // Create a unique key for the jobs for this specific shift
  //             const jobs = jobData[`${record.date}-${line.id}-${record.shift_id}`] || []; 
  //             return (
  //                 <Card
  //                     className={`shift-card ${jobs.length > 0 ? "filled-card" : "free-card"}`}
  //                     onClick={() => handleCellClick(record, line, record.shift_id, jobs)}
  //                     hoverable
  //                     style={{
  //                         width: "80px",
  //                         height: "70px",
  //                         display: "flex",
  //                         alignItems: "center",
  //                         justifyContent: "center",
  //                         cursor: "pointer",
  //                         border: "2px solid",
  //                         borderColor: jobs.length > 0 ? "#f00" : "#6f42c1",
  //                     }}
  //                 >
  //                     {jobs.length > 0 ? (
  //                         <div style={{ textAlign: 'center', color: '#000' }}>
  //                             {jobs.map(job => `${job.booked_qty} / ${job.capacity}`).join(", ")}
  //                         </div>
  //                     ) : (
  //                         <div style={{ textAlign: 'center', color: '#6f42c1' }}>
  //                             FREE
  //                         </div>
  //                     )}
  //                 </Card>
  //             );
  //         }
  //     }));
  // };  

  const generateDynamicColumns = () => {
    return jobLines.map((line) => ({
      title: line.name,
      dataIndex: line.name,
      key: line.id,
      width: 120,
      render: (text, record) => {
        // Create a unique key for the jobs for this specific shift
        const jobs = jobData[`${record.date}-${line.id}-${record.shift_id}`] || [];
        const schedule = schedules.find(schedule =>
          schedule.job_line_id === line.id &&
          schedule.shift_id === record.shift_id &&
          moment(schedule.schedule_date).isSame(record.date, 'day')
        );
  
        const backgroundColor = schedule ? schedule.status_background_color : 'transparent';
        const textColor = schedule ? schedule.status_text_color : '#000'; // Default to black
  
        return (
          <Card
            className={`shift-card ${jobs.length > 0 ? "filled-card" : "free-card"}`}
            onClick={() => handleCellClick(record, line, record.shift_id, jobs)}
            hoverable
            style={{
              width: "80px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid",
              borderColor: jobs.length > 0 ? "#f00" : "#6f42c1",
              backgroundColor: backgroundColor,
              color: textColor,
            }}
          >
            {jobs.length > 0 ? (
              <div style={{ textAlign: 'center', color: textColor }}>
                {jobs.map(job => `${job.booked_qty} / ${job.capacity}`).join(", ")}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: textColor }}>
                FREE
              </div>
            )}
          </Card>
        );
      }
    }));
  };
  

    const columns = [
      {
              title: "Day",
              dataIndex: "day",
              key: "day",
              fixed: "left",
              width: 150,
              render: (text, record) => ({
                children: (
                  <div>
                    <b>{text}</b>
                    <br />
                    <small className="text-muted">{record.date}</small>
                  </div>
                ),
                props: {
                  rowSpan: record.rowSpan,
                },
              }),
            },
      {
        title: "Shift",
        dataIndex: "shift",
        key: "shift",
        width: 100,
        render: (text) => <b>{text}</b>,
      },
      ...generateDynamicColumns(), // Generate columns dynamically based on job lines
    ];
  
    return (
      <div className="schedule-container">
        <Row gutter={16}>
          <Col span={12}>
            <h1>TRT Manufacturing Planner</h1>
            <p>Hi System Administrator, welcome back! Here's your planner summary.</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <b>Start Date: </b>
            <span>{currentDate.clone().startOf("isoWeek").format("DD MMM YYYY")}</span>
            <br />
            <b>End Date: </b>
            <span>{currentDate.clone().endOf("isoWeek").format("DD MMM YYYY")}</span>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '10px' }}>
          <Col span={8}>
            <b>Job Type</b>
            <Select
              options={jobTypes?.map((job) => ({
                label: job?.name,
                value: job?.id,
              }))}
              placeholder="Select Job Type"
              style={{ width: '100%' }}
              onChange={handleJobTypeChange}
            />
          </Col>
          <Col span={8}>
            <b>Search</b>
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Button onClick={handlePrevWeek}>Previous Week</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button onClick={handleNextWeek}>Next Week</Button>
          </Col>
        </Row>
        {jobAreas.length > 0 && (
          <Tabs
            defaultActiveKey={jobAreas[0].id}
            onChange={handleTabChange}
            style={{ marginTop: '20px' }}
          >
            {jobAreas.map((area) => (
              <Tabs.TabPane tab={area.name} key={area.id}>
                <Table
                  columns={columns}
                  dataSource={scheduleData}
                  bordered
                  pagination={false}
                  className="custom-schedule-table"
                  scroll={{ x: "max-content" }}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
        <Modal
          title="Shift Details"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null} // Handle the modal footer with AddJobModal
        >
          {selectedCell && (
            <AddJobModal
              visible={isModalVisible}
              onCancel={handleModalClose}
              selectedCell={selectedCell} // Pass the selected cell data
              onAddJob={handleAddJob} // Callback to handle job addition
            />
          )}
        </Modal>
      </div>
    );
  };
  
  export default ScheduleTable;
  