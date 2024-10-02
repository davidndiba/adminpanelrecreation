import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { request } from 'umi';

const { Option } = Select;

const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, onAddJob }) => {
  const [form] = Form.useForm();
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [jobStatuses, setJobStatuses] = useState([]); // State to hold statuses based on job type
  const [jobForms, setJobForms] = useState([{}]); // Array to store multiple forms

  useEffect(() => {
    if (visible) {
      fetchJobData();
      fetchSchedules();
    }
    return () => {
      form.resetFields();
      setSelectedJob(null);
      setJobForms([{}]); // Reset forms
      setJobStatuses([]); // Reset job statuses
    };
  }, [visible, form]);

  const fetchJobData = async () => {
    try {
      const response = await request('/schedule-jobs');
      if (response.success) {
        const jobs = response.data.map(job => ({
          key: job.id,
          jobNumber: job.job_number,
          itemDetails: job.description,
          capacity: job.capacity,
          jobType: job.job_type_id,
          jobArea: job.job_area,
        }));
        setJobData(jobs);
      } else {
        message.error('Failed to fetch job data');
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
      message.error('Error fetching job data');
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await request('/schedules');
      if (response.success) {
        setSchedules(response.data.data);
      } else {
        message.error('Failed to fetch schedules');
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      message.error('Error fetching schedules');
    }
  };

  const fetchJobStatuses = async (jobTypeId) => {
    try {
      const response = await request(`/schedule-statuses/job-type/${jobTypeId}`);
      if (response.success) {
        console.log('Job statuses fetched:', response?.data);
        setJobStatuses(response.data); // Set statuses based on job type
      } else {
        message.error('Failed to fetch job statuses');
      }
    } catch (error) {
      console.error('Error fetching job statuses:', error);
      message.error('Error fetching job statuses');
    }
  };

  const handleFinish = async (values) => {
    const selectedSlotData = selectedSlot;

    if (!selectedSlotData) {
      message.error('No selected slot data available.');
      return; // Exit if selectedSlotData is null
  }

    const payloads = jobForms.map((_, index) => ({
      schedule_job_id: selectedJob?.key || '',
      job_line_id: selectedSlotData?.job_line_id,
      shift_id: selectedSlotData?.shift_id,
      schedule_date: selectedSlotData.schedule_date || new Date().toISOString(),
      schedule_status_id: values[`jobStatus`], 
      booked_qty: values[`bookedQuantity_${index}`],
      capacity: values[`capacity_${index}`] || selectedSlotData.capacity,
      comments: values[`comments_${index}`],
      schedule_time: selectedSlotData.schedule_time || values.schedule_time,
    }));

    try {
      const promises = payloads.map(payload =>
        request('/schedules', {
          method: 'POST',
          data: payload,
        })
      );
      await Promise.all(promises);

      message.success('Jobs added successfully');
      onAddJob(payloads);
      onOk(values);
      form.resetFields();
      setSelectedJob(null);
      fetchSchedules();
      return true;
    } catch (error) {
      console.error('Error submitting job:', error);
      message.error('Failed to submit jobs');
    }
  };

  const handleJobNumberChange = (value, index) => {
    const job = jobData.find(job => job.jobNumber === value);
    setSelectedJob(job);
    if (job) {
      form.setFieldsValue({
        [`capacity_${index}`]: job.capacity,
        [`jobType_${index}`]: job.jobType,
        [`jobArea_${index}`]: job.jobArea,
      });

      // Fetch statuses based on the selected job type
      fetchJobStatuses(job.jobType);
    }
  };

  const addNewJobForm = () => {
    setJobForms([...jobForms, {}]);
  };

  return (
    <Modal
      visible={visible}
      title="Add Job"
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {jobForms.map((_, index) => (
          <div key={index} style={{ marginBottom: '24px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`jobNumber_${index}`}
                  label="Job Number"
                  rules={[{ required: true, message: 'Please select a job number!' }]}
                >
                  {/* <Select
                    placeholder="Search for a job"
                    onChange={(value) => handleJobNumberChange(value, index)}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: '100%' }}
                  >
                    {jobData.map((job) => (
                      <Option key={job.key} value={job.jobNumber}>
                        {job.jobNumber} - {job.itemDetails}
                      </Option>
                    ))}
                  </Select> */}
                  <Select
  placeholder="Search for a job"
  onChange={(value) => handleJobNumberChange(value, index)}
  showSearch
  filterOption={(input, option) => {
    const optionLabel = option.children instanceof Array ? option.children[0] : option.children;
    return optionLabel && optionLabel.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }}
  style={{ width: '100%' }}
>
  {jobData.map((job) => (
    <Option key={job.key} value={job.jobNumber}>
      {job.jobNumber} - {job.itemDetails}
    </Option>
  ))}
</Select>

                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name={`bookedQuantity_${index}`}
                  label="Booked Quantity"
                  rules={[{ required: true, message: 'Please enter booked quantity!' }]}
                >
                  <Input placeholder="Enter booked quantity" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`capacity_${index}`}
                  label="Capacity"
                  rules={[{ required: true, message: 'Please enter capacity!' }]}
                >
                  <Input placeholder="Enter capacity" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={`comments_${index}`} label="Comments">
                  <Input.TextArea rows={4} placeholder="Additional comments (optional)" />
                </Form.Item>
              </Col>
            </Row>

            {/* Move Job Status Field to the end */}
            <Row gutter={24}>
  <Col span={24}>
    <Form.Item
  name={`jobStatus_${index}`}
  label="Job Status"
  rules={[{ required: true, message: 'Please select a job status!' }]}
>
  <Checkbox.Group
    value={form.getFieldValue(`jobStatus_${index}`)}
    onChange={(checkedValue) => {
      // Only keep the latest selected value
      const selectedStatus = checkedValue.length ? [checkedValue[checkedValue.length - 1]] : [];
      form.setFieldsValue({ [`jobStatus_${index}`]: selectedStatus });
    }}
  >
    {Array.isArray(jobStatuses) && jobStatuses.length > 0 ? (
      jobStatuses.map((status) => (
        <Checkbox key={status?.id} value={status?.id}>
          {status.name}
        </Checkbox>
      ))
    ) : (
      <p>No job statuses available</p>
    )}
  </Checkbox.Group>
</Form.Item>

  </Col>
</Row>

          </div>
        ))}

        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <Button onClick={addNewJobForm} type="dashed" style={{ marginBottom: '16px' }}>
            Add New Job
          </Button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddJobModal;



// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, Row, Col, message } from 'antd';
// import { request } from 'umi';

// const { Option } = Select;

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, onAddJob }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [schedules, setSchedules] = useState([]);
//   const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']);
//   const [jobForms, setJobForms] = useState([{}]); // Array to store multiple forms

//   useEffect(() => {
//     if (visible) {
//       fetchJobData();
//       fetchSchedules();
//     }
//     return () => {
//       form.resetFields();
//       setSelectedJob(null);
//       setJobForms([{}]); // Reset forms
//     };
//   }, [visible, form]);

//   const fetchJobData = async () => {
//     try {
//       const response = await request('/schedule-jobs');
//       if (response.success) {
//         const jobs = response.data.map(job => ({
//           key: job.id,
//           jobNumber: job.job_number,
//           itemDetails: job.description,
//           capacity: job.capacity,
//           jobType: job.job_type_id,
//           jobArea: job.job_area,
//         }));
//         setJobData(jobs);
//       } else {
//         message.error('Failed to fetch job data');
//       }
//     } catch (error) {
//       console.error('Error fetching job data:', error);
//       message.error('Error fetching job data');
//     }
//   };

//   const fetchSchedules = async () => {
//     try {
//       const response = await request('/schedules');
//       if (response.success) {
//         setSchedules(response.data.data);
//       } else {
//         message.error('Failed to fetch schedules');
//       }
//     } catch (error) {
//       console.error('Error fetching schedules:', error);
//       message.error('Error fetching schedules');
//     }
//   };

//   const handleFinish = async (values) => {
//     const selectedSlotData = selectedSlot;

//     const payloads = jobForms.map((_, index) => ({
//       schedule_job_id: selectedJob?.key || '',
//       job_line_id: selectedSlotData?.job_line_id,
//       shift_id: selectedSlotData?.shift_id,
//       schedule_date: selectedSlotData.schedule_date || new Date().toISOString(),
//       schedule_status_id: selectedSlotData.schedule_status_id,
//       booked_qty: values[`bookedQuantity_${index}`],
//       capacity: values[`capacity_${index}`] || selectedSlotData.capacity,
//       comments: values[`comments_${index}`],
//       schedule_time: selectedSlotData.schedule_time || values.schedule_time,
//     }));

//     try {
//       const promises = payloads.map(payload =>
//         request('/schedules', {
//           method: 'POST',
//           data: payload,
//         })
//       );
//       await Promise.all(promises);

//       message.success('Jobs added successfully');
//       onAddJob(payloads);
//       onOk(values);
//       form.resetFields();
//       setSelectedJob(null);
//       fetchSchedules();
//       return true;
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit jobs');
//     }
//   };

//   const handleJobNumberChange = (value, index) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job);
//     if (job) {
//       form.setFieldsValue({
//         [`capacity_${index}`]: job.capacity,
//         [`jobType_${index}`]: job.jobType,
//         [`jobArea_${index}`]: job.jobArea,
//       });
//     }
//   };

//   const addNewJobForm = () => {
//     setJobForms([...jobForms, {}]);
//   };

//   return (
//     <Modal
//       visible={visible}
//       title="Add Job"
//       onCancel={onCancel}
//       footer={null}
//       width={800}
//     >
//       <Form form={form} onFinish={handleFinish} layout="vertical">
//         {jobForms.map((_, index) => (
//           <div key={index} style={{ marginBottom: '24px' }}>
//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name={`jobNumber_${index}`}
//                   label="Job Number"
//                   rules={[{ required: true, message: 'Please select a job number!' }]}
//                 >
//                   <Select
//                     placeholder="Search for a job"
//                     onChange={(value) => handleJobNumberChange(value, index)}
//                     showSearch
//                     filterOption={(input, option) =>
//                       option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     }
//                     style={{ width: '100%' }}
//                   >
//                     {jobData.map((job) => (
//                       <Option key={job.key} value={job.jobNumber}>
//                         {job.jobNumber} - {job.itemDetails}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name={`bookedQuantity_${index}`}
//                   label="Booked Quantity"
//                   rules={[{ required: true, message: 'Please enter booked quantity!' }]}
//                 >
//                   <Input placeholder="Enter booked quantity" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name={`capacity_${index}`}
//                   label="Capacity"
//                   rules={[{ required: true, message: 'Please enter capacity!' }]}
//                 >
//                   <Input placeholder="Enter capacity" />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name={`comments_${index}`} label="Comments">
//                   <Input.TextArea rows={4} placeholder="Additional comments (optional)" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             {/* Move Job Status Field to the end */}
//             <Row gutter={24}>
//               <Col span={24}>
//                 <Form.Item
//                   name={`jobStatus_${index}`}
//                   label="Job Status"
//                   rules={[{ required: true, message: 'Please select a job status!' }]}
//                 >
//                   <Checkbox.Group>
//                     {jobStatuses.map((status) => (
//                       <Checkbox key={status} value={status}>
//                         {status}
//                       </Checkbox>
//                     ))}
//                   </Checkbox.Group>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </div>
//         ))}

//         <div style={{ textAlign: 'right', marginBottom: '24px' }}>
//           <Button onClick={addNewJobForm} type="dashed" style={{ marginBottom: '16px' }}>
//             Add New Job
//           </Button>
//         </div>

//         <div style={{ textAlign: 'right' }}>
//           <Button onClick={onCancel} style={{ marginRight: 8 }}>
//             Cancel
//           </Button>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, Row, Col, message } from 'antd';
// import { request } from 'umi';

// const { Option } = Select;

// const jobStatusColors = {
//   Picked: {
//     backgroundColor: '#f50',
//     textColor: '#fff',
//   },
//   Online: {
//     backgroundColor: '#2db7f5',
//     textColor: '#fff',
//   },
//   Complete: {
//     backgroundColor: '#87d068',
//     textColor: '#fff',
//   },
//   'On Hold': {
//     backgroundColor: '#faad14',
//     textColor: '#000',
//   },
// };

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, onAddJob }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobForms, setJobForms] = useState([{}]);

//   const jobStatuses = ['Picked', 'Online', 'Complete', 'On Hold'];

//   useEffect(() => {
//     if (visible) {
//       fetchJobData();
//     }
//     return () => {
//       form.resetFields();
//       setSelectedJob(null);
//       setJobForms([{}]);
//     };
//   }, [visible, form]);

//   const fetchJobData = async () => {
//     try {
//       const response = await request('/schedule-jobs');
//       if (response.success) {
//         const jobs = response.data.map(job => ({
//           key: job.id,
//           jobNumber: job.job_number,
//           itemDetails: job.description,
//           capacity: job.capacity,
//           jobType: job.job_type_id,
//           jobArea: job.job_area,
//         }));
//         setJobData(jobs);
//       } else {
//         message.error('Failed to fetch job data');
//       }
//     } catch (error) {
//       console.error('Error fetching job data:', error);
//       message.error('Error fetching job data');
//     }
//   };

//   const handleFinish = async (values) => {
//     const selectedSlotData = selectedSlot;

//     const payloads = jobForms.map((_, index) => {
//       const selectedStatus = values[`jobStatus_${index}`]; // Checkbox will return an array
//       const statusColor = selectedStatus.map(status => jobStatusColors[status]); // Get colors for selected statuses

//       return {
//         schedule_job_id: selectedJob?.key || '',
//         job_line_id: selectedSlotData?.job_line_id,
//         shift_id: selectedSlotData?.shift_id,
//         schedule_date: selectedSlotData.schedule_date || new Date().toISOString(),
//         schedule_status_id: selectedSlotData.schedule_status_id,
//         booked_qty: values[`bookedQuantity_${index}`],
//         capacity: values[`capacity_${index}`] || selectedSlotData.capacity,
//         comments: values[`comments_${index}`],
//         schedule_time: selectedSlotData.schedule_time || values.schedule_time,
//         jobStatus: selectedStatus,
//         statusColors: statusColor, // Pass the background and text color to the payload
//       };
//     });

//     try {
//       const promises = payloads.map(payload =>
//         request('/schedules', {
//           method: 'POST',
//           data: payload,
//         })
//       );
//       await Promise.all(promises);

//       message.success('Jobs added successfully');
//       onAddJob(payloads);
//       onOk(values);
//       form.resetFields();
//       setSelectedJob(null);
//       return true;
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit jobs');
//     }
//   };

//   const handleJobNumberChange = (value, index) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job);
//     if (job) {
//       form.setFieldsValue({
//         [`capacity_${index}`]: job.capacity,
//         [`jobType_${index}`]: job.jobType,
//         [`jobArea_${index}`]: job.jobArea,
//       });
//     }
//   };

//   const addNewJobForm = () => {
//     setJobForms([...jobForms, {}]);
//   };

//   return (
//     <Modal
//       visible={visible}
//       title="Add Job"
//       onCancel={onCancel}
//       footer={null}
//       width={800}
//     >
//       <Form form={form} onFinish={handleFinish} layout="vertical">
//         {jobForms.map((_, index) => (
//           <div key={index} style={{ marginBottom: '24px' }}>
//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name={`jobNumber_${index}`}
//                   label="Job Number"
//                   rules={[{ required: true, message: 'Please select a job number!' }]}
//                 >
//                   <Select
//                     placeholder="Search for a job"
//                     onChange={(value) => handleJobNumberChange(value, index)}
//                     showSearch
//                     filterOption={(input, option) =>
//                       option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     }
//                     style={{ width: '100%' }}
//                   >
//                     {jobData.map((job) => (
//                       <Option key={job.key} value={job.jobNumber}>
//                         {job.jobNumber} - {job.itemDetails}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name={`bookedQuantity_${index}`}
//                   label="Booked Quantity"
//                   rules={[{ required: true, message: 'Please input the booked quantity!' }]}
//                 >
//                   <Input placeholder="Enter booked quantity" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name={`capacity_${index}`}
//                   label="Capacity"
//                   rules={[{ required: true, message: 'Please enter capacity!' }]}
//                 >
//                   <Input placeholder="Enter capacity" />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name={`comments_${index}`} label="Comments">
//                   <Input.TextArea placeholder="Enter comments" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={24}>
//               <Col span={24}>
//                 <Form.Item
//                   name={`jobStatus_${index}`}
//                   label="Job Status"
//                   rules={[{ required: true, message: 'Please select a job status!' }]}
//                 >
//                   <Checkbox.Group>
//                     <Row>
//                       {jobStatuses.map(status => (
//                         <Col span={6} key={status}>
//                           <Checkbox value={status}>{status}</Checkbox>
//                         </Col>
//                       ))}
//                     </Row>
//                   </Checkbox.Group>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </div>
//         ))}

//         <Button type="dashed" onClick={addNewJobForm} block>
//           Add Another Job
//         </Button>

//         <Form.Item style={{ marginTop: '24px' }}>
//           <Button type="primary" htmlType="submit" block>
//             Submit Jobs
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
