// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, message } from 'antd';
// import { request } from 'umi';

// const { Option } = Select;

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, onAddJob }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [schedules, setSchedules] = useState([]); // State for schedules
//   const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']); // Static job statuses

//   useEffect(() => {
//     // Fetch job numbers from the API when the modal is opened
//     if (visible) {
//       fetchJobData();
      
//       fetchSchedules(); // Fetch schedules when the modal opens
//     }

//     return () => {
//       form.resetFields(); // Reset form fields on unmount
//       setSelectedJob(null); // Reset selected job
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
//       const response = await request('/schedules'); // Adjust endpoint as needed
//       if (response.success) {
//         setSchedules(response.data.data); // Update state with the schedules data
//       } else {
//         message.error('Failed to fetch schedules');
//       }
//     } catch (error) {
//       console.error('Error fetching schedules:', error);
//       message.error('Error fetching schedules');
//     }
//   };

//   useEffect(() => {
//     if (visible && selectedSlot) {
//       form.setFieldsValue({
//         date: selectedSlot?.r?.scheduleDate || '', // Pre-fill date from slot
//         time: selectedSlot?.hour || '',            // Pre-fill time from slot
//         bookedQuantity: selectedSlot?.bookedQuantity || '', // Pre-fill booked quantity
//         jobType: selectedSlot?.r?.jobType || '',   // Pre-fill job type
//         jobArea: selectedSlot?.r?.jobArea || '',   // Pre-fill job area
//       });
//     }
//   }, [selectedSlot, visible, form]);

//   const handleFinish = async (values:any) => {
//     const selectedSlotData = selectedSlot;

//     // Ensure values for job_line_id, shift_id, schedule_date, schedule_status_id, capacity, and booked_qty
//     const payload = {
//       schedule_job_id: selectedJob?.key || '', // From selected slot
//       job_line_id: selectedSlotData?.job_line_id, // From selected slot
//       shift_id: selectedSlotData?.shift_id, // From selected slot
//       schedule_date: selectedSlotData.schedule_date || new Date().toISOString(), // Ensure valid date format
//       schedule_status_id: selectedSlotData.schedule_status_id, // From selected slot
//       booked_qty: values.bookedQuantity , // Get from form or slot
//       capacity: values.capacity || selectedSlotData.capacity , // Get from form or slot
//       comments: values.comments, // From form
//       schedule_time: selectedSlotData.schedule_time || values.schedule_time // From slot or form
//     };

//     try {
//       const response = await request('/schedules', {
//         method: 'POST',
//         data: payload,
//       });
//       // if (response.success) {
//         onAddJob({
//           ...payload,
//           id: response?.data, 
//         });
//         console.log(response?.data?.id)
//         message.success('Job added successfully');
//         onOk(values);
//         form.resetFields();
//         setSelectedJob(null);
//         fetchSchedules(); // Fetch the updated schedules after adding the job
//       // } else {
//       //   message.error('Failed to submit job: ' + response.message);
//       // }
//       return true
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit job');
//     }
//   };

//   const handleJobNumberChange = (value) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job); // Set the selected job
//     if (job) {
//       form.setFieldsValue({
//         capacity: job.capacity,  // Pre-fill the booked quantity to match job capacity
//         jobType: job.jobType,          // Set job type from the selected job
//         jobArea: job.jobArea,          // Set job area from the selected job
//       });
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       title="Add Job"
//       onCancel={onCancel}
//       footer={null}
//       width={800}
//     >
//       <Form form={form} onFinish={handleFinish}>
//         <Form.Item
//           name="jobNumber"
//           label="Job Number"
//           rules={[{ required: true, message: 'Please select a job number!' }]}
//         >
//           <Select
//             placeholder="Search for a job"
//             onChange={handleJobNumberChange}
//             showSearch
//             filterOption={(input, option) =>
//               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//             style={{ width: '100%' }}
//           >
//             {jobData.map((job) => (
//               <Option key={job.key} value={job.jobNumber}>
//                 {job.jobNumber} - {job.itemDetails}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="jobStatus"
//           label="Job Status"
//           rules={[{ required: true, message: 'Please select a job status!' }]}
//         >
//           <Checkbox.Group>
//             {jobStatuses.map((status) => (
//               <Checkbox key={status} value={status}>
//                 {status}
//               </Checkbox>
//             ))}
//           </Checkbox.Group>
//         </Form.Item>

//         <Form.Item
//           name="bookedQuantity"
//           label="Capacity"
//           rules={[{ required: true, message: 'Please enter booked quantity!' }]}
//         >
//           <Input placeholder="Enter booked quantity" />
//         </Form.Item>

//         <Form.Item
//           name="capacity"
//           label="Booked Quantity"
//           // rules={[
//           //   { required: true, message: 'Please enter capacity!' },
//           //   ({ getFieldValue }) => ({
//           //     validator(_, value) {
//           //       const bookedQuantity = getFieldValue('bookedQuantity');
//           //       if (value && Number(value) > Number(bookedQuantity)) {
//           //         return Promise.reject(new Error('Capacity cannot exceed booked quantity!'));
//           //       }
//           //       return Promise.resolve();
//           //     },
//           //   }),
//           // ]}
//         >
//           <Input placeholder="Enter set quantity" />
//         </Form.Item>
        
//         <Form.Item name="comments" label="Comments">
//           <Input.TextArea rows={4} placeholder="Additional comments (optional)" />
//         </Form.Item>

//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { request } from 'umi';

const { Option } = Select;

const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, onAddJob }) => {
  const [form] = Form.useForm();
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']);
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

  const handleFinish = async (values) => {
    const selectedSlotData = selectedSlot;

    const payloads = jobForms.map((_, index) => ({
      schedule_job_id: selectedJob?.key || '',
      job_line_id: selectedSlotData?.job_line_id,
      shift_id: selectedSlotData?.shift_id,
      schedule_date: selectedSlotData.schedule_date || new Date().toISOString(),
      schedule_status_id: selectedSlotData.schedule_status_id,
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
                  <Select
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
                  <Checkbox.Group>
                    {jobStatuses.map((status) => (
                      <Checkbox key={status} value={status}>
                        {status}
                      </Checkbox>
                    ))}
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
