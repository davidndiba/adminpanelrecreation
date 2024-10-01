import { DownloadOutlined } from '@ant-design/icons';
import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Flex,
  Row,
  Select,
  Spin,
  Tabs,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddJobModal from './AddJobModal';

const { RangePicker } = DatePicker;


const ManufacturingPlanner = () => {
  const [scheduledJobs, setScheduledJobs] = useState([]);
  // const handleAddJob = (newJob) => {
  //   // Create a new object with the relevant information
  //   const addedJob = {
  //     id: newJob.id,
  //     schedule_job_id: newJob.schedule_job_id,
  //     job_line_id: newJob.job_line_id,
  //     shift_id: newJob.shift_id,
  //     schedule_date: newJob.schedule_date,
  //     capacity: newJob.capacity,
  //     booked_qty: newJob.booked_qty,
  //     comments: newJob.comments,
  //     schedule_status_id: newJob.schedule_status_id,
  //   };
  
  //   // Update the state by adding the new job to the scheduled jobs
  //   setScheduledJobs((prevJobs) => [...prevJobs, addedJob]);
  // };
  const handleAddJob = (newJob: any) => {
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
  
    // Log the newly created job object
    console.log('Added Job Object:', addedJob);
  
    // Update the state by adding the new job to the scheduled jobs
    setScheduledJobs((prevJobs) => {
      const updatedJobs = [...prevJobs, addedJob];
      // Log the updated scheduled jobs array
      console.log('Updated Scheduled Jobs:', updatedJobs);
      return updatedJobs;
    });
  };
  
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<any>(null);
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
  const handleSlotClick = (record: any, hour: any, lineId: string, shiftId: string) => {
    setSelectedSlot({
        schedule_date: record.date, // Store the selected day (date)
        hour, // Store the time (hour)
        job_line_id: lineId, // Store the job line ID
        shift_id: shiftId, // Store the shift ID
    });
    setModalVisible(true);
    
    // Move the console logs here
    console.log("Job Line ID:", lineId);
    console.log("Shift ID:", shiftId);
    console.log("Selected Slot:", {
        schedule_date: record.date, 
        hour
    });
};

  const renderJobSlot = (record: any, hour: any, lineId: string, shiftId: string) => {
    const slotJobs = record[hour] || [];
    const scheduledJobsForHour = scheduledJobs.filter(
      (job) =>
        job.job_line_id === lineId &&
        job.shift_id === shiftId &&
        moment(job.schedule_date).format('YYYY-MM-DD') === record.date &&
        job.schedule_time === hour 
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
                //         backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
                //     }}
                // >
                //     {slotJobs.length === 0 ? (
                //         <Card onClick={() => {
                //             console.log("Rendering Job Slot Clicked:");
                //             console.log("Line ID:", lineId);
                //             console.log("Shift ID:", shiftId);
                //             handleSlotClick(record, hour, lineId, shiftId);
                //         }}>
                //             FREE
                //         </Card>
                backgroundColor: scheduledJobsForHour.length === 0 ? '#F8F4FE' : '#FFFFFF',
              }}
          >
              {scheduledJobsForHour.length === 0 ? (
                  <Card onClick={() => {
                      console.log("Rendering Job Slot Clicked:");
                      console.log("Line ID:", lineId);
                      console.log("Shift ID:", shiftId);
                      handleSlotClick(record, hour, lineId, shiftId);
                  }}>
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
                                        style={{ marginBottom: '10px' }}
                                    >
                                       {`Job: ${job.schedule_job_id}`}<br />
                                       {`Booked Quantity: ${job.booked_qty}`}<br />
                                       {`Capacity: ${job.capacity}`}<br />
                                       {`Status: ${job.schedule_status_id}`} 
                                       {/* {job.name} ({job.status}) */}
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

  const { data: shifts } = useRequest(() =>
    request('/shifts').then((res) => ({ data: res?.data?.data })),
  );

  const { data: jobLines, loading: jobLinesLoading } = useRequest(
    async () => {
      if (!jobAreaPid) return;
      return await request(`/job-lines?job_area_id=${jobAreaPid}`).then(
        (res) => ({
          data: res?.data?.data,
        }),
      );
    },
    { refreshDeps: [jobAreaPid] },
  );

  const jobLineColumns = jobLines?.map((line: any, index: any) => ({
    title: line?.name,
    key: line?.id,
    width: 200,
    render: (text: any, record: any) => (
      <DragDropContext
        onDragEnd={() => {
          /* Handle drag and drop functionality */
        }}
      >
        {renderJobSlot(record, `h${index + 1}`, line.id, shifts?.[0]?.id)} {/* Day Shift */}
      <Divider style={{ margin: '10px 0' }} />{' '}
      {renderJobSlot(record, `h${index + 1}-night`, line.id, shifts?.[1]?.id)} {/* Night Shift */}
      </DragDropContext>
    ),
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
