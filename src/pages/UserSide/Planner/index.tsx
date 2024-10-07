  import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
  import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
  import { request, useRequest } from '@umijs/max';
  import { Button,Card,Col,DatePicker,Divider,Dropdown,Empty, Flex, Menu,message, Modal,Row, Select, Space, Spin,Tabs,Tooltip,} from 'antd';
  import moment from 'moment';
  import React, { useState } from 'react';
  import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
  import AddJobModal from './AddJobModal';
import JobDetailsModal from './JobDetailsModal';
import ChangeStatusModal from './ChangeStatusModal';
  // import { request } from '@umijs/max';
  const { RangePicker } = DatePicker;
  const ManufacturingPlanner = () => {
    const [isJobDetailsModalVisible, setJobDetailsModalVisible] = useState(false);
    const [selectedJobData, setSelectedJobData] = useState(null);
    const [isChangeStatusModalVisible, setChangeStatusModalVisible] = useState(false);
    const [selectedJobForStatusChange, setSelectedJobForStatusChange] = useState(null);  
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [ setIsModalVisible] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [draggedJob, setDraggedJob] = useState(null);
    const [scheduledJobs, setScheduledJobs] = useState<any[]>([]);
      // Handle status change
  const handleChangeJobStatus = async (jobId, newStatus) => {
    try {
      await request(`/schedules/${jobId}`, {
        method: 'PUT',
        body: JSON.stringify({ schedule_status_id: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      message.success('Job status updated successfully.');
      refreshSchedules(); // Refresh the job data after updating status
    } catch (error) {
      console.error('Error updating job status:', error);
      message.error('Failed to update job status. Please try again.');
    }
  };
    const { data: schedules = [], refresh:refreshSchedules } = useRequest(() =>
      request('/schedules').then((res) => ({ data: res?.original?.data })),
    );
    const { data: shifts = [] } = useRequest(() =>
      request('/shifts').then((res) => ({ data: res?.data?.data })),
    );
    // Ensure that schedules and shifts are defined and are arrays
    if (!Array.isArray(schedules) || !Array.isArray(shifts)) {
      console.error('Schedules or shifts are not defined or not arrays');
      return; // Early return or handle as necessary
    }
    // Safely find shift IDs
    const dayShiftId = shifts.find((shift: any) => shift?.name === 'Day Shift')?.id;
    const nightShiftId = shifts.find((shift: any) => shift?.name === 'Night Shift')?.id;
    // Filter schedules safely
    const dayShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === dayShiftId);
    const nightShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === nightShiftId);
    // Debug logging
    console.log('Schedules:', schedules);
    console.log('Shifts:', shifts);
    console.log('Day Shift Schedules:', dayShiftSchedules);
    console.log('Night Shift Schedules:', nightShiftSchedules);  
    const handleAddJob = async  (newJob: any) => {
      // Log the incoming new job data
      console.log('New Job Data:', newJob);
      // Create a new object with the relevant information
      const addedJob = {
        id: newJob.id,
        schedule_job_id: newJob.schedule_job_id,
        job_line_id: newJob.job_line_id,
        shift_id: newJob.shift_id,
        schedule_date: newJob.schedule_date,
        capacity: newJob.capacity,
        booked_qty: newJob.booked_qty,
        comments: newJob.comments,
        schedule_status_id: newJob.schedule_status_id,
      };
      setScheduledJobs((prevJobs) => [...prevJobs, newJob]);
      try {;
      setModalVisible(true);
        refreshSchedules();
        console.log('Added Job Object:', addedJob);
      } catch (error) {
        console.error('Error adding job:', error);
      }
    };
    const handleModalClose = () => {
      setModalVisible(false); // Close the modal
    }; 
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [dateRange, setDateRange] = useState<any>([
      moment().startOf('day'),
      moment().endOf('day'),
    ]);
    console.log(selectedSlot);
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
    const handleSlotClick = (
      record: any,
      hour: any,
      lineId: string,
      shiftId: string,
      job?: any,
    ) => {
      setSelectedSlot({
        schedule_date: record.date, // Store the selected day (date)
        hour, // Store the time (hour)
        job_line_id: lineId, // Store the job line ID
        shift_id: shiftId, // Store the shift ID
        ...(job ? {
          schedule_job_id: job.schedule_job_id,
          capacity: job.capacity,
          booked_qty: job.booked_qty,
          comments: job.comments,
          schedule_status_id: job.schedule_status_id,
        } : {}), // Only add these if job is defined
      });
      setModalVisible(true);
      // Move the console logs here
      console.log('Job Line ID:', lineId);
      console.log('Shift ID:', shiftId);
      console.log('Slot clicked:', { record, hour, lineId, shiftId });
      console.log('Selected Slot:', {
        schedule_date: record.date,
        hour,
        job_line_id: lineId,
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
    // Define the columns for the table (days + job lines + shifts)
    const daysOfWeek = getDaysOfWeek();
    const { data: jobTypes } = useRequest(() =>
      request('/job-types').then((res) => ({ data: res?.data?.data })),
    );
    const [jobType, setJobType] = useState<any>();
    const [jobAreaPid, setJobAreaPid] = React.useState<any>();
    const { data: jobAreas, loading: jobAreasLoading } = useRequest(
      async () => {
        if (!jobType) return;
        const resp: any = await request(`/job-types/${jobType}`).then((res) => ({
          data: res?.data?.job_areas,
        }));
        console.log(resp?.data?.[0]?.id);
        setJobAreaPid(resp?.data?.[0]?.id);
        return resp;
      },
      { refreshDeps: [jobType] },
    );
    const { data: jobLines, loading: jobLinesLoading } = useRequest(
      async () => {
        if (!jobAreaPid) return;
        return await request(`/job-areas/${jobAreaPid}`).then(
          (res) => ({
            data: res?.data?.job_lines,
          }),
        );
      },
      { refreshDeps: [jobAreaPid] },
    );
    const handleDragStart = (e, job) => {
      setDraggedJob(job);
      e.dataTransfer.setData("text", job); // Set the data that will be transferred during the drag
    };
    const handleDragOver = (e) => {
      e.preventDefault(); // Allow the drop
    };
    const handleDrop = (e) => {
      e.preventDefault();
      // Handle what happens after the drop (e.g., you can display the dragged job on the card)
      console.log(`Dropped: ${draggedJob}`);
      // You can also use this space to update some state, or display in the card:
      alert(`Job dropped: ${draggedJob}`);
    };
  const onDragEnd = async (result: any) => {
    if (!result.destination) {
        return; // Dropped outside the list
    }
    const { source, destination } = result;
    // Check if the indices are out of bounds
    if (
        source.index < 0 ||
        source.index >= scheduledJobs.length ||
        destination.index < 0 ||
        destination.index >= scheduledJobs.length
    ) {
        console.error("Invalid indices for drag and drop");
        return; // Early return if indices are out of bounds
    }
    // Handle moving jobs in the scheduledJobs state
    const updatedJobs = Array.from(scheduledJobs);
    const [movedJob] = updatedJobs.splice(source.index, 1);
    // Check if movedJob is defined
    if (!movedJob) {
        console.error("Moved job is undefined");
        return; // Early return if movedJob is not found
    }
    movedJob.schedule_date = destination.droppableId.split('-')[0]; // Update schedule date
    updatedJobs.splice(destination.index, 0, movedJob);
    setScheduledJobs(updatedJobs);
    // Make the API request to update the moved job
    try {
        const response = await request(`/schedules/${movedJob.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movedJob),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await response.json(); // Await the response to ensure it's processed
        console.log('Updated Job Object:', movedJob);
    } catch (error) {
        console.error('Error updating job:', error);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSlot(null); // Reset selected slot on close
  };
   // The delete function will now delete based on the selectedSlot
   const handleDeleteSchedule = async () => {
    console.log('Delete Schedule initiated with selectedSlot:', selectedSlot);

    if (!selectedSlot || !selectedSlot.schedule_job_id) {
      message.error('No schedule selected for deletion.');
      console.error('No schedule selected for deletion.');
      return;
    }
    try {
      const confirm = window.confirm('Are you sure you want to delete this schedule?');
      if (confirm) {
        await request(`/schedules/${selectedSlot.schedule_job_id}`, {
          method: 'DELETE',
        });
        message.success('Schedule deleted successfully.');
        console.log('Schedule deleted successfully for job ID:', selectedSlot.schedule_job_id);
        // Refresh the schedule data
        refreshSchedules();
        handleModalClose(); // Close modal after deletion
      }
    } catch (error) {
      message.error('Failed to delete schedule. Please try again.');
      console.error('Delete Schedule Error:', error);
    }
  };
  const menu = (
    <Menu>
      {/* <Menu.Item key="1" onClick={() => handleAddJob(selectedSlot)}>Add New Schedule</Menu.Item> */}
      {/* <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Change Job Status</a>
      </Menu.Item> */}
       <Menu.Item key="2" onClick={() => {
      setSelectedJobForStatusChange(selectedSlot); // assuming selectedSlot is the currently selected job
      setChangeStatusModalVisible(true);
    }}>
      Change Job Status
    </Menu.Item>
      <Menu.Item key="3" disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">Reschedule (disabled)</a>
        </Menu.Item>
      {/* Only show delete option if a slot is selected */}
    </Menu>
  );
    const renderJobSlot = (
      record: any,
      hour: any,
      lineId: string,
      shiftId: string,
      scheduledJobs: any[],
    ) => {
      const scheduledJobsForHour = scheduledJobs.filter(
        (job: any) =>
          job?.job_line_id === lineId &&
          job?.shift_id === shiftId &&
          moment(job?.schedule_date).format('YYYY-MM-DD') === record?.date,
        // job.schedule_time === hour,
      );
  // Determine if there are any jobs scheduled for this slot
  const hasScheduledJobs = scheduledJobsForHour.length > 0;
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
        backgroundColor: hasScheduledJobs ? '#FFFFFF' : '#F8F4FE',
        position: 'relative',
        minHeight: '100px',
      }}
      onClick={() => !hasScheduledJobs && handleSlotClick(record, hour, lineId, shiftId)}
    >
      {hasScheduledJobs && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Button
  type="primary" // Changes to a primary button
  style={{
    backgroundColor: '#4CAF50', // Green background color
    borderColor: '#4CAF50', // Match border color to the background
    color: '#fff', // White text color
    padding: '0 10px', // Add padding for better spacing
    fontWeight: 'bold', // Keep the text bold
    display: 'block', // Ensure the button takes up the full width for alignment if needed
  }}
  onClick={() => {
    handleSlotClick(record, hour, lineId, shiftId);
  }}
>
  Add New Job
</Button>

              </div>
            )}
      {scheduledJobsForHour.length === 0 ? (
        <Card
          onClick={() => {
            console.log('Rendering Job Slot Clicked:');
            console.log('Line ID:', lineId);
            console.log('Shift ID:', shiftId);
            handleSlotClick(record, hour, lineId, shiftId);
          }}
        >
          FREE
        </Card>
      ) : (
        scheduledJobsForHour.map((job: any, index: any) => (
          <Draggable key={job.id} draggableId={job.id} index={index}>
            {(provided) => (
              <Card
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{
                  marginBottom: '10px',
                  background: job.status_background_color || 'red',
                  color: job.status_text_color || '#000',
                  position: 'relative',
                  padding: '8px',
                  maxHeight: '110px', // Set your desired max height here
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={onDragEnd}
              >
                {/* Job Details Here */}
                {job.job_validation_required && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="yellow" // Star color
                          width="1.5em" // Adjust size as needed
                          height="1.5em"
                          style={{
                            position: 'absolute',
                            top: 8, // Adjust position as needed
                            left: 8, // Adjust position as needed
                          }}
                        >
                          <path d="M12 .587l3.668 7.431L23 9.587l-5.5 5.356L18.816 23 12 19.688 5.184 23 6.5 14.943 1 9.587l7.332-1.569L12 .587z" />
                        </svg>
                      )}
                      {/* Job Number */}
                      <span style={{ fontWeight: 'bold', color: 'black' }}>
                        {job.schedule_job_number}
                      </span> 
                      {/* Capacity */}
                      <span style={{ marginLeft: '10px', color: '#007bff', textDecoration: 'underline' }}>
                        {job.capacity}
                      </span>

                      {/* Tooltip for Job Description */}
                      <Tooltip title={job.job_description} placement="top">
                        <div style={{ color: 'grey', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                          {job.job_description.split(' ').slice(0, 3).join(' ') + (job.job_description.split(' ').length > 3 ? '...' : '')}
                        </div>
                      </Tooltip>
                      {/* More Details Button */}
                      <Button
                        type="link"
                        style={{
                          marginTop: '0',
                          marginBottom: '10px',
                          color: '#ff5733',
                          whiteSpace: 'nowrap', // Prevent wrapping
                          overflow: 'hidden', // Hide overflow
                          textOverflow: 'ellipsis', // Show ellipsis if it overflows
                        }}
                        onClick={() => {
                          setSelectedJobData(job);
                          setJobDetailsModalVisible(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 1024 1024"
                          style={{ fill: 'currentColor', marginRight: '4px' }}
                        >
                          <path d="M512 100c-227 0-412 185-412 412s185 412 412 412 412-185 412-412S739 100 512 100zm0 736c-179 0-324-145-324-324S333 188 512 188s324 145 324 324-145 324-324 324zm-75-387h150v150H437V449zm150 277h-150v-54h150v54z" />
                        </svg>
                        More Details
                      </Button>
                      {/* Dropdown Menu */}
                      <Dropdown overlay={menu} trigger={['click']}>
                        <div
                          style={{
                            position: 'absolute',
                            top: 16, // Adjust as needed
                            right: 16, // Adjust as needed
                            cursor: 'pointer', // Changes the cursor on hover
                          }}
                          aria-label="More options"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 1024 1024"
                            style={{
                              fill: 'currentColor', // Inherit the current color
                              fontSize: '1.5em', // Adjust the size as needed
                            }}
                          >
                            <path d="M456 231a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0" />
                          </svg>
                        </div>
                      </Dropdown>
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
    const jobLineColumns = jobLines?.map((line: any, index: any) => ({
      title: line?.name,
      key: line?.id,
      width: 200,
      render: (text: any, record: any) => {
        return (
          <DragDropContext onDragEnd={onDragEnd}>
            <Row>
            {renderJobSlot(
              record,
              `h${index + 1}`,
              line.id,
              shifts?.[0]?.id,
              dayShiftSchedules,
            )}
            </Row>
            {/* Day Shift */}
            <Divider style={{ margin: '20px 10px',borderColor:'black',borderWidth:'1px' }} />{' '}
            <Row>
            {renderJobSlot(
              record,
              `h${index + 1}-night`,
              line.id,
              shifts?.[1]?.id,
              nightShiftSchedules,
            )}{' '}
            {/* Night Shift */}
            </Row>
          </DragDropContext>
        );
      },
    }));
    return (
      <ProCard>
        <PageHeader
          title="Manufacturing Planner"
          subTitle="Manage your production schedules effectively"
        />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Select
              options={jobTypes?.map((job: any) => ({
                label: job?.name,
                value: job?.id,
              }))}
              placeholder="Select Job Type"
              style={{ width: '100%' }}
              onChange={(value) => {
                setJobType(value);
              }}
            />
          </Col>
          <Col span={8}>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={24}>
            {jobAreasLoading ? (
              <Flex
                align="center"
                justify="center"
                style={{ width: '100%', height: '240px' }}
              >
                <Spin />
              </Flex>
            ) : jobAreas?.length <= 0 ? (
              <Flex
                align="center"
                justify="center"
                style={{ width: '100%', height: '240px' }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No job areas found"
                />
              </Flex>
            ) : (
            <Tabs
            defaultActiveKey="1"
            items={jobAreas?.map((jobArea: any) => ({
              key: jobArea?.id,
              label: jobArea?.name,
              children: (
                  <ProTable
      toolBarRender={false}
      search={false}
      dataSource={daysOfWeek}
      scroll={{ x: 1400, y: 1400 }} // Ensure both scroll.x and scroll.y are set
      loading={jobLinesLoading}
      virtual // Enable virtual scrolling
      columns={[
        {
          title: 'Day',
          key: 'day',
          render: (text) => (
            <div style={{ textAlign: 'center',alignSelf:'center' }}>
              <div>{text.day}</div>
              <div style={{ fontSize: '1.1em' }}>
                {moment(text.date).format('DD MMM YYYY')} {/* This formats the date as Month abbreviation and day */}
              </div>
            </div>
          ),
          align: 'center',
          fixed: true,
          width: 100,
        },
        {
          title: 'Shift',
          key: 'jobLines',
          align: 'center',
          render: (_, record) => {
            console.log('Record:', record);
            console.log('Shifts:', shifts);

            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {shifts?.map((shift: any) => {
                  // Check if jobLines is defined and is an array
                  const jobLineForShift = Array.isArray(record.jobLines) 
                    ? record.jobLines.find((line: any) => line.shiftId === shift.id)
                    : undefined;

                  return (
                    <div key={shift.id} style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>{shift?.name}</strong>: {/* Shift name */}
                      <span>{jobLineForShift ? jobLineForShift.value : '-'}</span> {/* Display job line value or placeholder */}
                    </div>
                  );
                })}
              </div>
            );
          },
          width: 100, // Adjust width as necessary
        },
        ...(jobLines ? jobLineColumns : []),
      ]}
    />
              ),
            }))}
            onChange={(value) => {
              console.log(value);
              setJobAreaPid(value);
            }}
          />
            )}
          </Col>
        </Row>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          style={{ marginTop: 16 }}
        >
          Export
        </Button>
        <AddJobModal
          visible={isModalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => setModalVisible(false)}
          selectedSlot={selectedSlot}
          onAddJob={handleAddJob}
          // onAddJob={(newJob) => setScheduledJobs((prevJobs) => [...prevJobs, newJob])}
        />
         <JobDetailsModal
        visible={isJobDetailsModalVisible}
        jobData={selectedJobData}
        onClose={() => setJobDetailsModalVisible(false)}
      />
       <ChangeStatusModal
      visible={isChangeStatusModalVisible}
      onClose={() => setChangeStatusModalVisible(false)}
      jobData={selectedJobForStatusChange}
      onChangeStatus={handleChangeJobStatus}
    />
      </ProCard>
    );
  };
  export default ManufacturingPlanner;
  


// import { DownloadOutlined } from '@ant-design/icons';
// import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
// import { request, useRequest } from '@umijs/max';
// import {
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Divider,
//   Dropdown,
//   Empty,
//   Flex,
//   Menu,
//   Row,
//   Select,
//   Space,
//   Spin,
//   Tabs,
// } from 'antd';
// import moment from 'moment';
// import React, { useState } from 'react';
// import AddJobModal from './AddJobModal';

// const { RangePicker } = DatePicker;

// const ManufacturingPlanner = () => {
//   const [scheduledJobs, setScheduledJobs] = useState<any[]>([]);
//   const { data: schedules = [], refresh: refreshSchedules } = useRequest(() =>
//     request('/schedules').then((res) => ({ data: res?.original?.data })),
//   );

//   const { data: shifts = [] } = useRequest(() =>
//     request('/shifts').then((res) => ({ data: res?.data?.data })),
//   );

//   if (!Array.isArray(schedules) || !Array.isArray(shifts)) {
//     console.error('Schedules or shifts are not defined or not arrays');
//     return; 
//   }

//   const dayShiftId = shifts.find((shift: any) => shift?.name === 'Day Shift')?.id;
//   const nightShiftId = shifts.find((shift: any) => shift?.name === 'Night Shift')?.id;

//   const dayShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === dayShiftId);
//   const nightShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === nightShiftId);

//   console.log('Schedules:', schedules);
//   console.log('Shifts:', shifts);
//   console.log('Day Shift Schedules:', dayShiftSchedules);
//   console.log('Night Shift Schedules:', nightShiftSchedules);

//   const handleAddJob = async (newJob: any) => {
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
//     setScheduledJobs((prevJobs) => [...prevJobs, newJob]);

//     try {
//       setModalVisible(true);
//       refreshSchedules();
//       console.log('Added Job Object:', addedJob);
//     } catch (error) {
//       console.error('Error adding job:', error);
//     }
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//   };

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [dateRange, setDateRange] = useState<any>([
//     moment().startOf('day'),
//     moment().endOf('day'),
//   ]);

//   console.log(selectedSlot);

//   const getDaysOfWeek = () => {
//     const startOfWeek = moment().startOf('week').add(1, 'day');
//     const days = [];
//     for (let i = 0; i < 6; i++) {
//       days.push({
//         day: startOfWeek.clone().add(i, 'days').format('dddd'),
//         date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
//       });
//     }
//     return days;
//   };

//   const handleSlotClick = (
//     record: any,
//     hour: any,
//     lineId: string,
//     shiftId: string,
//     job?: any,
//   ) => {
//     setSelectedSlot({
//       schedule_date: record.date,
//       hour,
//       job_line_id: lineId,
//       shift_id: shiftId,
//       ...(job
//         ? {
//             schedule_job_id: job.schedule_job_id,
//             capacity: job.capacity,
//             booked_qty: job.booked_qty,
//             comments: job.comments,
//             schedule_status_id: job.schedule_status_id,
//           }
//         : {}),
//     });
//     setModalVisible(true);

//     console.log('Job Line ID:', lineId);
//     console.log('Shift ID:', shiftId);
//     console.log('Selected Slot:', {
//       schedule_date: record.date,
//       hour,
//     });
//   };

//   const daysOfWeek = getDaysOfWeek();

//   const { data: jobTypes } = useRequest(() =>
//     request('/job-types').then((res) => ({ data: res?.data?.data })),
//   );

//   const [jobType, setJobType] = useState<any>();
//   const [jobAreaPid, setJobAreaPid] = React.useState<any>();

//   const { data: jobAreas, loading: jobAreasLoading } = useRequest(
//     async () => {
//       if (!jobType) return;
//       const resp: any = await request(`/job-types/${jobType}`).then((res) => ({
//         data: res?.data?.job_areas,
//       }));
//       console.log(resp?.data?.[0]?.id);
//       setJobAreaPid(resp?.data?.[0]?.id);
//       return resp;
//     },
//     { refreshDeps: [jobType] },
//   );

//   const { data: jobLines, loading: jobLinesLoading } = useRequest(
//     async () => {
//       if (!jobAreaPid) return;
//       return await request(`/job-lines?job_area_id=${jobAreaPid}`).then((res) => ({
//         data: res?.data?.data,
//       }));
//     },
//     { refreshDeps: [jobAreaPid] },
//   );

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" onClick={() => handleAddJob(selectedSlot)}>
//         Add New Schedule
//       </Menu.Item>
//       <Menu.Item key="2">
//         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//           Change Job Status
//         </a>
//       </Menu.Item>
//       <Menu.Item key="3" disabled>
//         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//           Reschedule (disabled)
//         </a>
//       </Menu.Item>
//       <Menu.Item key="4" danger>
//         a danger item
//       </Menu.Item>
//     </Menu>
//   );

//   const renderJobSlot = (
//     record: any,
//     hour: any,
//     lineId: string,
//     shiftId: string,
//     scheduledJobs: any,
//   ) => {
//     const scheduledJobsForHour = scheduledJobs.filter(
//       (job: any) =>
//         job?.job_line_id === lineId &&
//         job?.shift_id === shiftId &&
//         moment(job?.schedule_date).format('YYYY-MM-DD') === record?.date,
//     );
    
//     return (
//       <div
//         style={{
//           padding: '10px',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           textAlign: 'center',
//           backgroundColor:
//             scheduledJobsForHour.length === 0 ? '#F8F4FE' : '#FFFFFF',
//         }}
//       >
//         {scheduledJobsForHour.length === 0 ? (
//           <Card
//             onClick={() => {
//               console.log('Rendering Job Slot Clicked:');
//               console.log('Line ID:', lineId);
//               console.log('Shift ID:', shiftId);
//               handleSlotClick(record, hour, lineId, shiftId);
//             }}
//           >
//             FREE
//           </Card>
//         ) : (
//           scheduledJobsForHour?.map((job: any, index: any) => (
//             <Card
//               key={job.id}
//               style={{
//                 marginBottom: '10px',
//                 background: job.status_background_color || 'red',
//                 color: job.status_text_color || '#000',
//               }}
//             >
//               <div>
//                 {`Job: ${job.schedule_job_id}`}
//                 <br />
//                 {`Booked Quantity: ${job.booked_qty}`}
//                 <br />
//                 {`Capacity: ${job.capacity}`}
//                 <br />
//                 {`Status: ${job.schedule_status_id}`}
//               </div>
//               <Dropdown overlay={menu} trigger={['click']}>
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 16,
//                     right: 16,
//                     cursor: 'pointer',
//                   }}
//                   aria-label="More options"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="1em"
//                     height="1em"
//                     viewBox="0 0 1024 1024"
//                     style={{
//                       fill: 'currentColor',
//                       fontSize: '1.5em',
//                     }}
//                   >
//                     <path d="M456 231a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0"/>
//                   </svg>
//                 </div>
//               </Dropdown>
//             </Card>
//           ))
//         )}
//       </div>
//     );
//   };

//   // Define jobLineColumns
//   const jobLineColumns = jobLines?.map((line: any, index: any) => ({
//     title: line?.name,
//     key: line?.id,
//     width: 200,
//     render: (text: any, record: any) =>
//       renderJobSlot(record, index + 1, line?.id, dayShiftId, scheduledJobs),
//   }));
//   return (
//     <div>
//       {/* Your component's main structure */}
//       <ProCard>
//        <PageHeader
//         title="Manufacturing Planner"
//         subTitle="Manage your production schedules effectively"
//       />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <Select
//             options={jobTypes?.map((job: any) => ({
//               label: job?.name,
//               value: job?.id,
//             }))}
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               setJobType(value);
//             }}
//           />
//         </Col>
//         <Col span={8}>
//           <RangePicker
//             value={dateRange}
//             onChange={(dates) => setDateRange(dates)}
//             style={{ width: '100%' }}
//           />
//         </Col>
//         <Col span={24}>
//           {jobAreasLoading ? (
//             <Flex
//               align="center"
//               justify="center"
//               style={{ width: '100%', height: '240px' }}
//             >
//               <Spin />
//             </Flex>
//           ) : jobAreas?.length <= 0 ? (
//             <Flex
//               align="center"
//               justify="center"
//               style={{ width: '100%', height: '240px' }}
//             >
//               <Empty
//                 image={Empty.PRESENTED_IMAGE_SIMPLE}
//                 description="No job areas found"
//               />
//             </Flex>
//           ) : (
//             <Tabs
//               defaultActiveKey="1"
//               items={jobAreas?.map((jobArea: any) => ({
//                 key: jobArea?.id,
//                 label: jobArea?.name,
//                 children: (
//                   <ProTable
//                     toolBarRender={false}
//                     search={false}
//                     dataSource={daysOfWeek}
//                     scroll={{ x: 1400 }}
//                     loading={jobLinesLoading}
//                     columns={[
//                       {
//                         title: 'Day',
//                         // dataIndex: 'day',
//                         key: 'day',
//                         renderText: (text) => `${text.day} (${text.date})`,
//                         align: 'left',
//                         fixed: true,
//                         width: 100,
//                       },
//                       {
//                         title: 'Shift',
//                         dataIndex: 'shift',
//                         fixed: true,
//                         width: 100,
//                         key: 'shift',
//                         render: () => (
//                           <div>
//                             {shifts?.map((shift: any, index: any) => (
//                               <div key={index} style={{}}>
//                                 {shift?.name}
//                               </div>
//                             ))}
//                           </div>
//                         ),
//                       },
//                       ...(jobLines ? jobLineColumns : []),
//                     ]}
//                   />
//                 ),
//               }))}
//               onChange={(value) => {
//                 console.log(value);
//                 setJobAreaPid(value);
//               }}
//             />
//           )}
//         </Col>
//       </Row>

//       <Button
//         type="primary"
//         icon={<DownloadOutlined />}
//         style={{ marginTop: 16 }}
//       >
//         Export
//       </Button>
//       <AddJobModal
//         visible={isModalVisible}
//         onCancel={() => setModalVisible(false)}
//         onOk={() => setModalVisible(false)}
//         selectedSlot={selectedSlot}
//         onAddJob={handleAddJob}
//         // onAddJob={(newJob) => setScheduledJobs((prevJobs) => [...prevJobs, newJob])}
//       />
//     </ProCard>
//     </div>
//   );
// };

// export default ManufacturingPlanner;


// import { DownloadOutlined } from '@ant-design/icons';
// import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
// import { request, useRequest } from '@umijs/max';
// import {
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Divider,
//   Dropdown,
//   Empty,
//   Flex,
//   Menu,
//   Row,
//   Select,
//   Space,
//   Spin,
//   Tabs,
// } from 'antd';
// import moment from 'moment';
// import React, { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import AddJobModal from './AddJobModal';
// // import { request } from '@umijs/max';


// const { RangePicker } = DatePicker;

// const ManufacturingPlanner = () => {
//   const [scheduledJobs, setScheduledJobs] = useState<any[]>([]);
//    const { data: schedules = [], refresh:refreshSchedules } = useRequest(() =>
//     request('/schedules').then((res) => ({ data: res?.original?.data })),
//   );

//   const { data: shifts = [] } = useRequest(() =>
//     request('/shifts').then((res) => ({ data: res?.data?.data })),
//   );

//    // Ensure that schedules and shifts are defined and are arrays
//    if (!Array.isArray(schedules) || !Array.isArray(shifts)) {
//     console.error('Schedules or shifts are not defined or not arrays');
//     return; // Early return or handle as necessary
//   }

//   // Safely find shift IDs
//   const dayShiftId = shifts.find((shift: any) => shift?.name === 'Day Shift')?.id;
//   const nightShiftId = shifts.find((shift: any) => shift?.name === 'Night Shift')?.id;

//   // Filter schedules safely
//   const dayShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === dayShiftId);
//   const nightShiftSchedules = schedules.filter((schedule: any) => schedule?.shift_id === nightShiftId);

//   // Debug logging
//   console.log('Schedules:', schedules);
//   console.log('Shifts:', shifts);
//   console.log('Day Shift Schedules:', dayShiftSchedules);
//   console.log('Night Shift Schedules:', nightShiftSchedules);

//   const handleAddJob = async  (newJob: any) => {
//     // Log the incoming new job data
//     console.log('New Job Data:', newJob);

//     // Create a new object with the relevant information
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
//     setScheduledJobs((prevJobs) => [...prevJobs, newJob]);
//     // await request.post('/schedules', { data: addedJob });
//     try {
//     //   const response = await request('/schedules', {
//     //     method: 'POST',
//     //    data:addedJob
//     //     // body: JSON.stringify(addedJob),
//     //   });
//      setModalVisible(true);
//       refreshSchedules();
//       console.log('Added Job Object:', addedJob);
//     } catch (error) {
//       console.error('Error adding job:', error);
//     }
//   };
//   const handleModalClose = () => {
//     setModalVisible(false); // Close the modal
//   };

//   const [isModalVisible, setModalVisible] = useState(false);

//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [dateRange, setDateRange] = useState<any>([
//     moment().startOf('day'),
//     moment().endOf('day'),
//   ]);
//   console.log(selectedSlot);
//   // Generate the days of the current week (Monday to Saturday)
//   const getDaysOfWeek = () => {
//     const startOfWeek = moment().startOf('week').add(1, 'day');
//     const days = [];
//     for (let i = 0; i < 6; i++) {
//       days.push({
//         day: startOfWeek.clone().add(i, 'days').format('dddd'),
//         date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
//       });
//     }
//     return days;
//   };
//   const handleSlotClick = (
//     record: any,
//     hour: any,
//     lineId: string,
//     shiftId: string,
//     job?: any,
//   ) => {
//     setSelectedSlot({
//       schedule_date: record.date, // Store the selected day (date)
//       hour, // Store the time (hour)
//       job_line_id: lineId, // Store the job line ID
//       shift_id: shiftId, // Store the shift ID
//       ...(job ? {
//         schedule_job_id: job.schedule_job_id,
//         capacity: job.capacity,
//         booked_qty: job.booked_qty,
//         comments: job.comments,
//         schedule_status_id: job.schedule_status_id,
//       } : {}), // Only add these if job is defined
//     });
//     setModalVisible(true);

//     // Move the console logs here
//     console.log('Job Line ID:', lineId);
//     console.log('Shift ID:', shiftId);
//     console.log('Selected Slot:', {
//       schedule_date: record.date,
//       hour,
//     });
//   };

//   // Define the columns for the table (days + job lines + shifts)
//   const daysOfWeek = getDaysOfWeek();

//   const { data: jobTypes } = useRequest(() =>
//     request('/job-types').then((res) => ({ data: res?.data?.data })),
//   );
//   const [jobType, setJobType] = useState<any>();
//   const [jobAreaPid, setJobAreaPid] = React.useState<any>();
//   const { data: jobAreas, loading: jobAreasLoading } = useRequest(
//     async () => {
//       if (!jobType) return;
//       const resp: any = await request(`/job-types/${jobType}`).then((res) => ({
//         data: res?.data?.job_areas,
//       }));
//       console.log(resp?.data?.[0]?.id);
//       setJobAreaPid(resp?.data?.[0]?.id);
//       return resp;
//     },
//     { refreshDeps: [jobType] },
//   );
//   const { data: jobLines, loading: jobLinesLoading } = useRequest(
//     async () => {
//       if (!jobAreaPid) return;
//       return await request(`/job-lines?job_area_id=${jobAreaPid}`).then(
//         (res) => ({
//           data: res?.data?.data,
//         }),
//       );
//     },
//     { refreshDeps: [jobAreaPid] },
//   );
// const onDragEnd = async (result: any) => {
//   if (!result.destination) {
//       return; // Dropped outside the list
//   }
//   const { source, destination } = result;
//   // Check if the indices are out of bounds
//   if (
//       source.index < 0 ||
//       source.index >= scheduledJobs.length ||
//       destination.index < 0 ||
//       destination.index >= scheduledJobs.length
//   ) {
//       console.error("Invalid indices for drag and drop");
//       return; // Early return if indices are out of bounds
//   }

//   // Handle moving jobs in the scheduledJobs state
//   const updatedJobs = Array.from(scheduledJobs);
//   const [movedJob] = updatedJobs.splice(source.index, 1);

//   // Check if movedJob is defined
//   if (!movedJob) {
//       console.error("Moved job is undefined");
//       return; // Early return if movedJob is not found
//   }

//   movedJob.schedule_date = destination.droppableId.split('-')[0]; // Update schedule date
//   updatedJobs.splice(destination.index, 0, movedJob);
//   setScheduledJobs(updatedJobs);

//   // Make the API request to update the moved job
//   try {
//       const response = await request(`/schedules/${movedJob.id}`, {
//           method: 'PATCH',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(movedJob),
//       });

//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }

//       await response.json(); // Await the response to ensure it's processed
//       console.log('Updated Job Object:', movedJob);
//   } catch (error) {
//       console.error('Error updating job:', error);
//   }
// };


// const menu = (
//   <Menu>
//     {/* <Menu.Item key="1">
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">Add New Schedule</a>
//     </Menu.Item> */}
//       {/* <Menu.Item key="1" onClick={handleAddJob}>Add New Schedule</Menu.Item> */}
//       <Menu.Item key="1" onClick={() => handleAddJob(selectedSlot)}>Add New Schedule</Menu.Item>
//     <Menu.Item key="2">
//       <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Change Job Status</a>
//     </Menu.Item>
//     <Menu.Item key="3" disabled>
//       <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">Reschedule (disabled)</a>
//     </Menu.Item>
//     <Menu.Item key="4" danger>
//       a danger item
//     </Menu.Item>
//   </Menu>
// );



//   const renderJobSlot = (
//     record: any,
//     hour: any,
//     lineId: string,
//     shiftId: string,
//     scheduledJobs: any,
//   ) => {
//     const scheduledJobsForHour = scheduledJobs.filter(
//       (job: any) =>
//         job?.job_line_id === lineId &&
//         job?.shift_id === shiftId &&
//         moment(job?.schedule_date).format('YYYY-MM-DD') === record?.date,
//       // job.schedule_time === hour,
//     );
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
//               backgroundColor:
//                 scheduledJobsForHour.length === 0 ? '#F8F4FE' : '#FFFFFF',
//             }}
//           >
//             {scheduledJobsForHour.length === 0 ? (
//               <Card
//                 onClick={() => {
//                   console.log('Rendering Job Slot Clicked:');
//                   console.log('Line ID:', lineId);
//                   console.log('Shift ID:', shiftId);
//                   handleSlotClick(record, hour, lineId, shiftId);
//                 }}
//               >
//                 FREE
//               </Card>
//             ) : (
//               scheduledJobsForHour?.map((job: any, index: any) => (
//                 <Draggable key={job.id} draggableId={job.id} index={index}>
//                   {(provided) => (
//                     <Card
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       ref={provided.innerRef}
//                       // style={{ marginBottom: '10px' ,background:'red'}}
//                       style={{ 
//                         marginBottom: '10px', 
//                         background: job.status_background_color || 'red', 
//                         color: job.status_text_color || '#000' 
//                       }}
//                       // onClick={() => {
//                       //   handleSlotClick(record, hour, lineId, shiftId, job); 
//                       // }}
//                     >
//                       <div>
//       {`Job: ${job.schedule_job_id}`}
//       <br />
//       {`Booked Quantity: ${job.booked_qty}`}
//       <br />
//       {`Capacity: ${job.capacity}`}
//       <br />
//       {`Status: ${job.schedule_status_id}`}
//     </div>
//      <Dropdown overlay={menu} trigger={['click']}>
//         <div
//           style={{
//             position: 'absolute',
//             top: 16, // Adjust as needed
//             right: 16, // Adjust as needed
//             cursor: 'pointer', // Changes the cursor on hover
//           }}
//           aria-label="More options"
//         >
//           {/* SVG Icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="1em"
//             height="1em"
//             viewBox="0 0 1024 1024"
//             style={{
//               fill: 'currentColor', // Inherit the current color
//               fontSize: '1.5em', // Adjust the size as needed
//             }}
//           >
//             <path d="M456 231a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0"/>
//           </svg>
//         </div>
//       </Dropdown>
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

//   const jobLineColumns = jobLines?.map((line: any, index: any) => ({
//     title: line?.name,
//     key: line?.id,
//     width: 200,
//     render: (text: any, record: any) => {
//       return (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Row>
//           {renderJobSlot(
//             record,
//             `h${index + 1}`,
//             line.id,
//             shifts?.[0]?.id,
//             dayShiftSchedules,
//           )}
//           {/* Day Shift */}
//           <Divider style={{ margin: '10px 0' }} />{' '}
//           {renderJobSlot(
//             record,
//             `h${index + 1}-night`,
//             line.id,
//             shifts?.[1]?.id,
//             nightShiftSchedules,
//           )}{' '}
//           {/* Night Shift */}
//           </Row>
//         </DragDropContext>
//       );
//     },
//   }));

//   return (
//     <ProCard>
//       <PageHeader
//         title="Manufacturing Planner"
//         subTitle="Manage your production schedules effectively"
//       />
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <Select
//             options={jobTypes?.map((job: any) => ({
//               label: job?.name,
//               value: job?.id,
//             }))}
//             placeholder="Select Job Type"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               setJobType(value);
//             }}
//           />
//         </Col>
//         <Col span={8}>
//           <RangePicker
//             value={dateRange}
//             onChange={(dates) => setDateRange(dates)}
//             style={{ width: '100%' }}
//           />
//         </Col>
//         <Col span={24}>
//           {jobAreasLoading ? (
//             <Flex
//               align="center"
//               justify="center"
//               style={{ width: '100%', height: '240px' }}
//             >
//               <Spin />
//             </Flex>
//           ) : jobAreas?.length <= 0 ? (
//             <Flex
//               align="center"
//               justify="center"
//               style={{ width: '100%', height: '240px' }}
//             >
//               <Empty
//                 image={Empty.PRESENTED_IMAGE_SIMPLE}
//                 description="No job areas found"
//               />
//             </Flex>
//           ) : (
//             <Tabs
//               defaultActiveKey="1"
//               items={jobAreas?.map((jobArea: any) => ({
//                 key: jobArea?.id,
//                 label: jobArea?.name,
//                 children: (
//                   <ProTable
//                     toolBarRender={false}
//                     search={false}
//                     dataSource={daysOfWeek}
//                     scroll={{ x: 1400 }}
//                     loading={jobLinesLoading}
//                     columns={[
//                       {
//                         title: 'Day',
//                         // dataIndex: 'day',
//                         key: 'day',
//                         renderText: (text) => `${text.day} (${text.date})`,
//                         align: 'left',
//                         fixed: true,
//                         width: 100,
//                       },
//                       {
//                         title: 'Shift',
//                         dataIndex: 'shift',
//                         fixed: true,
//                         width: 100,
//                         key: 'shift',
//                         render: () => (
//                           <div>
//                             {shifts?.map((shift: any, index: any) => (
//                               <div key={index} style={{}}>
//                                 {shift?.name}
//                               </div>
//                             ))}
//                           </div>
//                         ),
//                       },
//                       ...(jobLines ? jobLineColumns : []),
//                     ]}
//                   />
//                 ),
//               }))}
//               onChange={(value) => {
//                 console.log(value);
//                 setJobAreaPid(value);
//               }}
//             />
//           )}
//         </Col>
//       </Row>

//       <Button
//         type="primary"
//         icon={<DownloadOutlined />}
//         style={{ marginTop: 16 }}
//       >
//         Export
//       </Button>
//       <AddJobModal
//         visible={isModalVisible}
//         onCancel={() => setModalVisible(false)}
//         onOk={() => setModalVisible(false)}
//         selectedSlot={selectedSlot}
//         onAddJob={handleAddJob}
//         // onAddJob={(newJob) => setScheduledJobs((prevJobs) => [...prevJobs, newJob])}
//       />
//     </ProCard>
//   );
// };

// export default ManufacturingPlanner;