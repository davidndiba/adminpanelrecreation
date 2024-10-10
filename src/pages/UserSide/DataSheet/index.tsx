import { Card, Space, Table, Row, Col, Select, Input, Typography, DatePicker, Tabs, Modal, Button, Form, Checkbox, message, Tooltip, Dropdown, Menu } from 'antd';
import { request, useRequest } from '@umijs/max';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const DataSheet = () => {
  // const [ setData] = useState([]);
  // const [data, setData] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null); 
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));
  const [jobType, setJobType] = useState<any>();
  const [jobAreaPid, setJobAreaPid] = useState<any>(null);
  const [jobAreas, setJobAreas] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null); 
  const [form] = Form.useForm();
  // const [jobData, setJobData] = useState([]);
  const [jobData, setJobData] = useState<any[]>([]);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [clickedSchedule, setClickedSchedule] = useState<any>(null);
  const [selectedJobLineId, setSelectedJobLineId] = useState(null);
  const [selectedScheduleJobId, setSelectedScheduleJobId] = useState(null);
  const [tableData, setTableData] = useState<any[]>([]);

  // Load job types on mount
  const { data: jobTypes, loading: jobTypesLoading } = useRequest(() =>
    request('/job-types').then((res) => ({ data: res?.data?.data }))
  );

  // Fetch job areas when the job type is changed
  const fetchJobAreas = async (jobTypeId: string) => {
    const res = await request(`/job-types/${jobTypeId}`);
    if (res?.data?.job_areas) {
      setJobAreas(res?.data?.job_areas);
      setJobAreaPid(res?.data?.job_areas[0]?.id);  
    }
  };

  // Fetch job lines for the selected job area
  const { data: jobLines, loading: jobLinesLoading } = useRequest(
    async () => {
      if (!jobAreaPid) return;
      return await request(`/job-areas/${jobAreaPid}`).then((res) => ({
        data: res?.data?.job_lines,
      }));
    },
    { refreshDeps: [jobAreaPid] }
  );
  const { data: shiftsFromApi } = useRequest(() =>
        request('/shifts').then((res) => ({ data: res?.data?.data })),
      );
  const { data, loading } = useRequest(() =>
        request('/schedules').then((res) => ({ data: res?.original?.data })),
      );
  // Transform the schedule data for the table display
  const transformData = (schedules: any) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
    const shifts = Array.isArray(shiftsFromApi) ? shiftsFromApi?.map((shift) => shift?.name) : [];


    const transformedData: any[] = [];

    daysOfWeek.forEach((day, dayIndex) => {
            shifts?.forEach((shift) => {
              const date = moment(currentWeek).add(dayIndex, 'days');
        const schedulesForDayShift = schedules?.filter(
                    (s: any) =>
                      moment(s?.schedule_date).isSame(date, 'day') &&
                      s.shift_name === shift,
                  );
        transformedData.push({
          key: `${day}-${shift}`,
          // day: date.format('ll'),
          // day: `${day}
          // (${date.format('MMM DD YYYY')})`, 
          day: (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>{day}</div>
              <div>{date.format('MMM DD YYYY')}</div>
            </div>
          ),
          shift,
          jobs: schedulesForDayShift?.map((schedule: any) => ({
            id: schedule?.schedule_job_id,
            // job_count: schedule?.booked_qty,
            job_description: schedule?.job_description,
            booked_qty: schedule?.booked_qty,
            schedule_job_number: schedule?.schedule_job_number,
            schedule_status_name: schedule?.schedule_status_name,
            job_line_id: schedule?.job_line_id,
            bgColor: schedule?.status_background_color,
            textColor: schedule?.status_text_color,
          })),
        });
      });
    });

    return transformedData;
  };
  const handleJobLineSelection = (value) => {
    setSelectedJobLineId(value); // Set job_line_id based on selection
  };
  
 // Handle Job Type Change (Dropdown)
  const handleJobTypeChange = (value: string) => {
    setJobType(value);
    fetchJobAreas(value); // Fetch the corresponding job areas
  };
  useEffect(() => {
    fetchJobData();  // Fetch job data when the component mounts or jobType changes
  }, [jobType]);  // Add jobType to the dependency array to refetch if jobType changes
  useEffect(() => {
    const fetchData = async () => {
      const res = await request('/schedules');
      const transformedSchedules = transformData(res?.data);
      setTableData(transformedSchedules)
      // setData(transformedSchedules);  // Update transformed data
    };
  
    fetchData();
  }, [currentWeek, data]);  // Add currentWeek dependency to refetch data when the week changes
  const fetchJobData = async () => {
    try {
      const response = await request("/schedule-jobs");
      console.log("Job Data Response:", response); 
      if (response.success) {
        setJobData(
          response.data.map((job) => ({
            key: job.id,
            jobNumber: job.job_number,
            itemDetails: job.description,
            capacity: job.capacity,
            jobType: job.job_type_id,
            jobArea: job.job_area,
          }))
        );
      } else {
        message.error("Failed to fetch job data");
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      message.error("Error fetching job data");
    }
  };
  
  const fetchJobStatuses = async (jobTypeId) => {
    try {
      const response = await request(`/schedule-statuses/job-type/${jobTypeId}`);
      if (response.success) {
        setJobStatuses(response.data);
      } else {
        message.error("Failed to fetch job statuses");
      }
    } catch (error) {
      console.error("Error fetching job statuses:", error);
      message.error("Error fetching job statuses");
    }
  };
  const handleJobNumberChange = (value) => {
    const job = jobData.find((job) => job.jobNumber === value);
    setSelectedJob(job);
    if (job) {
      form.setFieldsValue({
        // capacity: job.capacity,
        capacity: selectedJob?.capacity || 'default capacity value', 
      });
      setSelectedScheduleJobId(job.key);
      fetchJobStatuses(job.jobType);
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
  // Columns for the job line
  const columns = [
    {
            title: 'Day',
            dataIndex: 'day',
            render: (text: string, record: any, index: number) => {
              const rowSpan = index % 2 === 0 ? 2 : 0;
              return {
                children: text,
                props: {
                  rowSpan,
                },
              };
            },
          },
          {
            title: 'Shift',
            dataIndex: 'shift',
          },
  ...(jobLines?.length
          ? jobLines?.map((job: any) => ({
              title: job?.name,
              dataIndex: 'jobs',
              width: 300,
              render: (jobs: any, record: any) => {
                const filteredJobs = jobs?.filter((j: any) => j?.job_line_id === job?.id);
                return (
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <ModalForm
                      // title={
                        // <>
                        //   You are viewing{' '}
                        //   <span style={{ color: clickedSchedule?.textColor }}>
                        //     {clickedSchedule?.job_description}
                        //   </span>
                        // </>
                      // }
                      submitter={false}
                      trigger={
<div style={{ cursor: 'pointer' }}>
{filteredJobs.length > 0 && (
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    color: '#fff',
                    padding: '10px 0',
                    fontWeight: 'bold',
                    width: '80%',
                    textAlign: 'center',
                    display: 'block',
                  }}
                  onClick={() => {
                    // Handle adding a new job
                    setSelectedSlot(record);
                    setIsModalVisible(true);
                  }}
                >
                  Add New Job
                </Button>
              )}

  {jobs
    ?.filter((j: any) => j?.job_line_id === job?.id)
    ?.map((job: any) => (
<Card
  key={job?.id}
  size="small"
  style={{
    background: job?.bgColor || 'transparent',
    width: '80%',
    color: job?.status_text_Color,
    borderRadius: 5,
    marginBottom: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }}
  onClick={() => {
    setClickedSchedule(job);
    setSelectedSlot(job); // Update the slot status when clicking
  }}
>
  <div style={{ textAlign: 'center' }}>
    {/* Schedule job number in bold and black */}
    <div style={{ fontWeight: 'bold', color: '#000' }}>
      {job?.schedule_job_number}
    </div>
    <Tooltip title={job.job_description} placement="top">
                        <div style={{ color: 'grey', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                          {job.job_description.split(' ').slice(0, 3).join(' ') + (job.job_description.split(' ').length > 3 ? '...' : '')}
                        </div>
                      </Tooltip>

    {/* Status name with dynamic color */}
    <div style={{ color: job?.statusColor || '#000', marginTop: '4px' }}>
      {job?.schedule_status_name}
    </div>
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
  </div>
</Card>

      
    ))}
</div>
                      }
                    >
                      {/* More details about the clicked schedule */}
                      Content HERE
                    </ModalForm>
                    {jobs?.filter((j: any) => j?.job_line_id === job?.id)?.length <=
                      3 && (
                      <ModalForm
                        title="Add Job"
                        submitter={{
                          searchConfig: {
                            submitText: 'Add Job',
                            resetText: 'Cancel',
                          },
                        }}
                        trigger={
                          // <Card style={{ width: '100%', borderRadius: 0 }}>
                          //   FREE
                          // </Card>
<Card
      style={{ width: '100%', borderRadius: 0, cursor: 'pointer' }}
      onClick={() => {
        setSelectedJobLineId(job?.id); // Update the selected job line
        const selectedShift = shiftsFromApi?.find(
          (shift) => shift.name === record?.shift
        );
        const selectedScheduleDate = moment(record?.day).format('YYYY-MM-DD'); // Capture the schedule date
        setClickedSchedule({
          job_line_id: job?.id,
          shift_id: selectedShift?.id,
          schedule_date: selectedScheduleDate,
          job_description: job?.job_description,
        });
        setIsModalVisible(true); // Open the modal
      }}
    >
      FREE
    </Card>
                        }
                        onFinish={async (values: any) => {
                          console.log(values);
    
                          const getShiftId = shiftsFromApi?.find(
                            (shift: any) => shift?.name === record?.shift,
                          );
    
                          // // you have the day here with the standard format
                          console.log(moment(record?.day).format('YYYY-MM-DD'));
    
                          // // you have the shift id here
                          console.log(getShiftId?.id);
    
                          // Do your POST here for Adding a new job
                          
                          const formattedScheduleDate = moment(values.schedule_date).format('YYYY-MM-DD');
                          try {
                            await request('/schedules', {
                              method: 'POST',
                              data: {
                                ...values,
                                job_line_id: selectedJobLineId, // Include the job_line_id
                                schedule_job_id: selectedScheduleJobId,
                                shift_id: getShiftId?.id,
                                // schedule_date: record?.day,
                                schedule_date: formattedScheduleDate,
                                capacity: selectedJob?.capacity || values.capacity,
                              },
                            })   
                            console.log({
                              job_line_id: selectedJobLineId,
                              schedule_job_id: selectedScheduleJobId,
                              shift_id: getShiftId?.id,
                              schedule_date: record?.day,
                              capacity: selectedJob?.capacity || values.capacity,
                            });

                            const updatedSchedules = await request('/schedules'); // Refetch the schedules data
                            const transformedSchedules = transformData(updatedSchedules?.data);
                            setJobData(updatedSchedules?.data);
                            data(transformedSchedules);

                            // you have success MESSAGE here and REFRESH the schedules on the table i.e
                            message.success('Job added successfully');
                            // this keeps modal open when success
                            setIsModalVisible(false);
                            return true;
                          } catch (error) {
                            // CATCH ERROR
                            // console.error('Error adding job:', error);
    
                            // this keeps modal open when there is an error
                            return false;
                          }
                        }}
                        // onVisibleChange={(visible) => setIsModalVisible(visible)}
                        onVisibleChange={async (visible) => {
                          setIsModalVisible(visible);
                          if (visible && selectedJobLineId) {
                              const selectedJob = jobData.find((job) => job.id === selectedJobLineId);
                              if (selectedJob) {
                                  await fetchJobStatuses(selectedJob.jobType); // Make sure to pass the job type ID
                              }
                          }
                      }}
                      
                      >
                        {/* Replace here with content for the form i.e Job Number, booked qty, ...rest */}
                        {/* <ProFormText name="name" label="Job Number" /> */}
                        <ProFormText name="job_number" label="Job Number">
                       <Select
          placeholder="Select Job Number"
          onChange={handleJobNumberChange}
          showSearch
          filterOption={(input, option) =>
            option.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {jobData?.length > 0 ? (
  jobData.map((job) => (
    <Option key={job.key} value={job.jobNumber}>
      {job.jobNumber} - {job.itemDetails}
    </Option>
  ))
) : (
  <p>No jobs available</p>
)}
        </Select>
                    </ProFormText>
                    <ProFormText name="booked_qty" label="Booked Quantity" />
                    {/* <ProFormText name="capacity" label="Capacity" /> */}
                    <ProFormText 
  name="capacity" 
  label="Capacity" 
  value={selectedJob?.capacity} // Ensure it's being populated correctly
  disabled={true} // Mark the field as read-only
/>
                    <ProFormText name="comments" label="Comments" />
                    
                    <Form.Item name="job_status" label="Job Status">
    <Select>
        {jobStatuses.map(status => (
            <Option key={status.id} value={status.value}>
                {status.name}
            </Option>
        ))}
    </Select>
</Form.Item>
                      </ModalForm>
                    )}
                  </Space>
                );
              },
            }))
          : []),
      ];    
  // Handle week change
  const handleWeekChange = (date: any) => {
    setCurrentWeek(date.startOf('isoWeek'));
  };
  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).subtract(1, 'week'));
  };
  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).add(1, 'week'));
  };
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <DatePicker
          disabled
          picker="week"
          value={currentWeek}
          onChange={handleWeekChange}
          format="YYYY-wo"
        />
        <Button onClick={handleNextWeek}>Next Week</Button>
      </Space>
      {/* Dropdown for Job Type Selection */}
      <Space style={{ marginBottom: 16 }}>
        <Select
          defaultValue={jobType}
          style={{ width: 200 }}
          onChange={handleJobTypeChange}
          loading={jobTypesLoading}
          placeholder="Select Job Type"
        >
          {jobTypes?.map((job: any) => (
            <Option key={job?.id} value={job?.id}>
              {job?.name}
            </Option>
          ))}
        </Select>
      </Space>
      {/* Tabs for Job Areas */}
      <Tabs
        defaultActiveKey={jobAreaPid?.toString()}
        onChange={(key) => setJobAreaPid(key)}
        style={{ marginBottom: 16 }}
      >
        {jobAreas?.map((jobArea: any) => (
          <TabPane tab={jobArea?.name} key={jobArea?.id}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={transformData(data || [])}
              bordered
              rowKey="key"
              scroll={{ x: 1400 }}
              pagination={{
                onChange: (page) => {
                  const date = moment()
                    .startOf('isoWeek')
                    .add((page - 1) * 10, 'days');
                  console.log(date.format('YYYY-MM-DD'));
                },
                pageSize: 10,
              }}
              rowClassName={(record) =>
                record.shift === 'Night Shift' ? 'night-shift-row' : ''
              }
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default DataSheet;
// import { ModalForm, ProFormText } from '@ant-design/pro-components';
// import { request, useRequest } from '@umijs/max';
// import { Button, Card, DatePicker, Space, Table } from 'antd';
// import moment from 'moment';
// import { useState } from 'react';

// const DataSheet = () => {
//   const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));

//   const [clickedSchedule, setClickedSchedule] = useState<any>(null);

//   const { data, loading } = useRequest(() =>
//     request('/schedules').then((res) => ({ data: res?.original?.data })),
//   );

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [jobAreaPid, setJobAreaPid] = useState<any>(
//     '9d198046-7cf7-463a-9759-ade3f9b311aa',
//   );

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { data: jobLines, loading: jobLinesLoading } = useRequest(
//     async () => {
//       if (!jobAreaPid) return;
//       return await request(`/job-areas/${jobAreaPid}`).then((res) => ({
//         data: res?.data?.job_lines,
//       }));
//     },
//     { refreshDeps: [jobAreaPid] },
//   );

//   const { data: shiftsFromApi } = useRequest(() =>
//     request('/shifts').then((res) => ({ data: res?.data?.data })),
//   );

//   const transformData = (schedules: any) => {
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     const shifts: any[] = shiftsFromApi?.map((shift: any) => shift?.name);

//     const transformedData: any[] = [];

//     daysOfWeek.forEach((day, dayIndex) => {
//       shifts?.forEach((shift) => {
//         const date = moment(currentWeek).add(dayIndex, 'days');
//         const schedulesForDayShift = schedules?.filter(
//           (s: any) =>
//             moment(s?.schedule_date).isSame(date, 'day') &&
//             s.shift_name === shift,
//         );

//         transformedData.push({
//           key: `${day}-${shift}`,
//           day: date.format('ll'),
//           shift,
//           jobs: schedulesForDayShift?.map((schedule: any) => ({
//             id: schedule?.schedule_job_id,
//             job_count: schedule?.booked_qty,
//             job_description: schedule?.job_description,
//             job_line_id: schedule?.job_line_id,
//             // add other required fields you need here i.e background colors
//             bgColor: schedule?.status_background_color,
//             textColor: schedule?.status_text_color,
//           })),
//         });
//       });
//     });

//     return transformedData;
//   };

//   const columns = [
//     {
//       title: 'Day',
//       dataIndex: 'day',
//       render: (text: string, record: any, index: number) => {
//         const rowSpan = index % 2 === 0 ? 2 : 0;
//         return {
//           children: text,
//           props: {
//             rowSpan,
//           },
//         };
//       },
//     },
//     {
//       title: 'Shift',
//       dataIndex: 'shift',
//     },
//     ...(jobLines?.length
//       ? jobLines?.map((job: any) => ({
//           title: job?.name,
//           dataIndex: 'jobs',
//           width: 300,
//           render: (jobs: any, record: any) => {
//             return (
//               <Space
//                 direction="vertical"
//                 size="middle"
//                 style={{ width: '100%' }}
//               >
//                 <ModalForm
//                   title={
//                     <>
//                       You are viewing{' '}
//                       <span style={{ color: clickedSchedule?.textColor }}>
//                         {clickedSchedule?.job_description}
//                       </span>
//                     </>
//                   }
//                   submitter={false}
//                   trigger={
//                     <div style={{ cursor: 'pointer' }}>
//                       {jobs
//                         ?.filter((j: any) => j?.job_line_id === job?.id)
//                         ?.map((job: any) => (
//                           <Card
//                             key={job?.id}
//                             size="small"
//                             style={{
//                               background: job?.bgColor || 'transparent',
//                               width: '100%',
//                               color: job?.textColor,
//                               borderRadius: 0,
//                               marginBottom: 1,
//                             }}
//                             onClick={() => setClickedSchedule(job)}
//                           >
//                             {job?.job_description} (Count: {job?.job_count})
//                           </Card>
//                         ))}
//                     </div>
//                   }
//                 >
//                   {/* More details about the clicked schedule */}
//                   Content HERE
//                 </ModalForm>
//                 {jobs?.filter((j: any) => j?.job_line_id === job?.id)?.length <=
//                   3 && (
//                   <ModalForm
//                     title="Add Job"
//                     submitter={{
//                       searchConfig: {
//                         submitText: 'Add Job',
//                         resetText: 'Cancel',
//                       },
//                     }}
//                     trigger={
//                       <Button style={{ width: '100%', borderRadius: 0 }}>
//                         FREE
//                       </Button>
//                     }
//                     onFinish={async (values: any) => {
//                       console.log(values);

//                       const getShiftId = shiftsFromApi?.find(
//                         (shift: any) => shift?.name === record?.shift,
//                       );

//                       // // you have the day here with the standard format
//                       console.log(moment(record?.day).format('YYYY-MM-DD'));

//                       // // you have the shift id here
//                       console.log(getShiftId?.id);

//                       // Do your POST here for Adding a new job
//                       try {
//                         // await request('/schedules', {
//                         //   method: 'POST',
//                         //   data: {
//                         //     ...values,
//                         //     shift_id: getShiftId?.id,
//                         //     schedule_date: record?.day,
//                         //   },
//                         // })

//                         // you have success MESSAGE here and REFRESH the schedules on the table i.e

//                         // this keeps modal open when success
//                         return true;
//                       } catch (error) {
//                         // CATCH ERROR
//                         // console.error('Error adding job:', error);

//                         // this keeps modal open when there is an error
//                         return false;
//                       }
//                     }}
//                   >
//                     {/* Replace here with content for the form i.e Job Number, booked qty, ...rest */}
//                     <ProFormText name="name" label="Job Number" />
//                   </ModalForm>
//                 )}
//               </Space>
//             );
//           },
//         }))
//       : []),
//   ];

//   const handleWeekChange = (date: any) => {
//     setCurrentWeek(date.startOf('isoWeek'));
//   };

//   const handlePreviousWeek = () => {
//     setCurrentWeek((prevWeek) => moment(prevWeek).subtract(1, 'week'));
//   };

//   const handleNextWeek = () => {
//     setCurrentWeek((prevWeek) => moment(prevWeek).add(1, 'week'));
//   };

//   return (
//     <div>
//       <Space style={{ marginBottom: 16 }}>
//         <Button onClick={handlePreviousWeek}>Previous Week</Button>
//         <DatePicker
//           disabled
//           picker="week"
//           value={currentWeek}
//           onChange={handleWeekChange}
//           format="YYYY-wo"
//         />
//         <Button onClick={handleNextWeek}>Next Week</Button>
//       </Space>
//       <Table
//         loading={loading}
//         columns={columns}
//         dataSource={transformData(data || [])}
//         bordered
//         rowKey="key"
//         scroll={{ x: 1400 }}
//         pagination={{
//           onChange: (page) => {
//             const date = moment()
//               .startOf('isoWeek')
//               .add((page - 1) * 10, 'days');
//             console.log(date.format('YYYY-MM-DD'));
//           },
//           pageSize: 10,
//         }}
//         rowClassName={(record) =>
//           record.shift === 'Night Shift' ? 'night-shift-row' : ''
//         }
//       />
//     </div>
//   );
// };

// export default DataSheet;