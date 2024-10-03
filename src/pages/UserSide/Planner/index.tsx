import { DownloadOutlined } from '@ant-design/icons';
import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Menu,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddJobModal from './AddJobModal';
// import { request } from '@umijs/max';


const { RangePicker } = DatePicker;

const ManufacturingPlanner = () => {
  const [jobs, setJobs] = useState([]);
  const [draggedJob, setDraggedJob] = useState(null);
  const [scheduledJobs, setScheduledJobs] = useState<any[]>([]);
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
    // await request.post('/schedules', { data: addedJob });
    try {
    //   const response = await request('/schedules', {
    //     method: 'POST',
    //    data:addedJob
    //     // body: JSON.stringify(addedJob),
    //   });
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
    console.log('Selected Slot:', {
      schedule_date: record.date,
      hour,
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


const menu = (
  <Menu>
    {/* <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">Add New Schedule</a>
    </Menu.Item> */}
      {/* <Menu.Item key="1" onClick={handleAddJob}>Add New Schedule</Menu.Item> */}
      <Menu.Item key="1" onClick={() => handleAddJob(selectedSlot)}>Add New Schedule</Menu.Item>
    <Menu.Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Change Job Status</a>
    </Menu.Item>
    <Menu.Item key="3" disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">Reschedule (disabled)</a>
    </Menu.Item>
    <Menu.Item key="4" danger>
      a danger item
    </Menu.Item>
  </Menu>
);



  const renderJobSlot = (
    record: any,
    hour: any,
    lineId: string,
    shiftId: string,
    scheduledJobs: any,
  ) => {
    const scheduledJobsForHour = scheduledJobs.filter(
      (job: any) =>
        job?.job_line_id === lineId &&
        job?.shift_id === shiftId &&
        moment(job?.schedule_date).format('YYYY-MM-DD') === record?.date,
      // job.schedule_time === hour,
    );
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
              backgroundColor:
                scheduledJobsForHour.length === 0 ? '#F8F4FE' : '#FFFFFF',
            }}
          >
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
              scheduledJobsForHour?.map((job: any, index: any) => (
                <Draggable key={job.id} draggableId={job.id} index={index}>
                  {(provided) => (
                    <Card
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      // style={{ marginBottom: '10px' ,background:'red'}}
                      style={{ 
                        marginBottom: '10px', 
                        background: job.status_background_color || 'red', 
                        color: job.status_text_color || '#000' ,
                        position: 'relative'  
                      }}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onDragEnd={onDragEnd}
                      // onClick={() => {
                      //   handleSlotClick(record, hour, lineId, shiftId, job); 
                      // }}
                    >
                      
                   {/*  */}
                      <div>
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
      {`Job: ${job.schedule_job_number}`}
      <br />
      {` ${job.job_description}`}
      <br />
      {/* {`Capacity: ${job.capacity}`} */}
      <br />
      {`Status: ${job.schedule_status_name}`}
    </div>
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
          {/* SVG Icon */}
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
            <path d="M456 231a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0"/>
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
          {/* Day Shift */}
          <Divider style={{ margin: '10px 0' }} />{' '}
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
                    scroll={{ x: 1400 }}
                    loading={jobLinesLoading}
                    columns={[
                      {
                        title: 'Day',
                        // dataIndex: 'day',
                        key: 'day',
                        renderText: (text) => `${text.day} (${text.date})`,
                        align: 'left',
                        fixed: true,
                        width: 100,
                      },
                      {
                        title: 'Shift',
                        dataIndex: 'shift',
                        fixed: true,
                        width: 100,
                        key: 'shift',
                        render: () => (
                          <div>
                            {shifts?.map((shift: any, index: any) => (
                              <div key={index} style={{}}>
                                {shift?.name}
                              </div>
                            ))}
                          </div>
                        ),
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
    </ProCard>
  );
};

export default ManufacturingPlanner;
