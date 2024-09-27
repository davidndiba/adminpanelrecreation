// // import React, { useState } from 'react';
// // import { Modal, Input, Form, Select, Table, Row, Col, Typography } from 'antd';
// // import moment from 'moment';

// // const { Option } = Select;
// // const { Title } = Typography;

// // const AddJobModal = ({ isModalVisible, handleOk, handleCancel, jobAreas }) => {
// //   const [form] = Form.useForm();
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const jobData = [
// //     { key: '1', jobNumber: 'UL2409144', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
// //     { key: '2', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
// //     { key: '3', jobNumber: 'UL2409139', size: '7,344', itemDetails: 'Organics Kids STBY 2 in 1 6x400ml' },
// //     { key: '4', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //     { key: '5', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //     { key: '6', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
// //     { key: '7', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
// //   ];

// //   const filteredJobs = jobData.filter(job => job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()));

// //   const columns = [
// //     { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
// //     { title: 'Size', dataIndex: 'size', key: 'size' },
// //     { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
// //   ];

// //   return (
// //     <Modal
// //       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
// //       visible={isModalVisible}
// //       onOk={() => {
// //         form.validateFields()
// //           .then(values => {
// //             handleOk(values); // Pass form values back to handleOk
// //             form.resetFields(); // Reset the form fields after submission
// //           })
// //           .catch(info => {
// //             console.error('Validate Failed:', info);
// //           });
// //       }}
// //       onCancel={handleCancel}
// //       width={800}
// //       okText="Add Job"
// //       cancelText="Cancel"
// //       footer={null}
// //     >
// //       <Form form={form} layout="vertical">
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Date" name="date" initialValue={moment().format('YYYY-MM-DD')}>
// //               <Input disabled />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Time" name="time" initialValue="Day Shift">
// //               <Input disabled />
// //             </Form.Item>
// //           </Col>
// //         </Row>

// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Job Type" name="jobType" rules={[{ required: true, message: 'Please select a job type!' }]}>
// //               <Select placeholder="Select Job Type">
// //                 <Option value="Pack">Production (Pack)</Option>
// //                 <Option value="Bulk">Production (Bulk)</Option>
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Job Area" name="jobArea" rules={[{ required: true, message: 'Please select a job area!' }]}>
// //               <Select placeholder="Select Job Area">
// //                 {jobAreas.map(area => (
// //                   <Option key={area.id} value={area.id}>{area.name}</Option>
// //                 ))}
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>

// //         <Row gutter={16}>
// //           <Col span={24}>
// //             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
// //               <Input.Search
// //                 placeholder="Search Job Number"
// //                 onSearch={(value) => setSearchQuery(value)}
// //                 enterButton
// //               />
// //             </Form.Item>
// //           </Col>
// //         </Row>

// //         <Table
// //           columns={columns}
// //           dataSource={filteredJobs}
// //           pagination={false}
// //           style={{ marginTop: 16 }}
// //           onRow={(record) => ({
// //             onClick: () => {
// //               form.setFieldsValue({ jobNumber: record.jobNumber });
// //               handleOk(record.jobNumber); // Pass selected job number
// //             },
// //           })}
// //         />
// //       </Form>
// //     </Modal>
// //   );
// // };

// // export default AddJobModal;
// // import React, { useState } from 'react';
// // import { Modal, Input, Form, Select, Table, Row, Col, Typography } from 'antd';

// // const { Option } = Select;
// // const { Title } = Typography;

// // const AddJobModal = ({ isModalVisible, handleOk, handleCancel, jobAreas }) => {
// //   const [form] = Form.useForm();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedJob, setSelectedJob] = useState(null);

// //   const jobData = [
// //     // Your job data here...
// //     { key: '1', jobNumber: 'UL2409144', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
// //      { key: '2', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
// //      { key: '3', jobNumber: 'UL2409139', size: '7,344', itemDetails: 'Organics Kids STBY 2 in 1 6x400ml' },
// //      { key: '4', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //      { key: '5', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //      { key: '6', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
// //      { key: '7', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
// //   ];

// //   const filteredJobs = jobData.filter(job => job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()));

// //   const handleJobNumberChange = (value) => {
// //     const selected = jobData.find(job => job.jobNumber === value);
// //     setSelectedJob(selected);
// //     form.setFieldsValue({ bookedQuantity: '', size: selected ? selected.size : '' });
// //   };

// //   const columns = [
// //     { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
// //     { title: 'Size', dataIndex: 'size', key: 'size' },
// //     { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
// //   ];

// //   return (
// //     <Modal
// //       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
// //       visible={isModalVisible}
// //       onOk={() => {
// //         form.validateFields()
// //           .then(values => {
// //             handleOk(values);
// //             form.resetFields();
// //             setSelectedJob(null);
// //           })
// //           .catch(info => console.error('Validate Failed:', info));
// //       }}
// //       onCancel={handleCancel}
// //       width={800}
// //       okText="Add Job"
// //       cancelText="Cancel"
// //     >
// //       <Form form={form} layout="vertical">
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
// //               <Select placeholder="Select Job Number" onChange={handleJobNumberChange} showSearch>
// //                 {filteredJobs.map(job => (
// //                   <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
// //                 ))}
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Booked Quantity" name="bookedQuantity" rules={[{ required: true, message: 'Please enter the booked quantity!' }]}>
// //               <Input placeholder="Booked Quantity" />
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Size" name="size">
// //               <Input disabled placeholder="Size" value={selectedJob ? selectedJob.size : ''} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status!' }]}>
// //               <Select placeholder="Select Status">
// //                 <Option value="Booked">Booked</Option>
// //                 <Option value="Pending">Pending</Option>
// //                 <Option value="Completed">Completed</Option>
// //                 <Option value="Canceled">Canceled</Option>
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Form.Item label="Job Details" name="details">
// //           <Input.TextArea rows={4} placeholder="Enter Job Details" />
// //         </Form.Item>
// //         <Form.Item>
// //           <Input placeholder="Search Job Number" onChange={e => setSearchQuery(e.target.value)} />
// //         </Form.Item>
// //         <Table columns={columns} dataSource={filteredJobs} pagination={false} rowKey="key" scroll={{ y: 240 }} />
// //       </Form>
// //     </Modal>
// //   );
// // };

// // export default AddJobModal;
// // import React, { useState } from 'react';
// // import { Modal, Input, Form, Select, Table, Row, Col, Typography, DatePicker } from 'antd';

// // const { Option } = Select;
// // const { Title } = Typography;

// // const AddJobModal = ({ isModalVisible, handleOk, handleCancel, existingJobs = [] }) => {
// //   const [form] = Form.useForm();
// //   const [selectedJob, setSelectedJob] = useState(null);
  
// //   const jobData = [
// //     { key: '1', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
// //     { key: '2', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //     { key: '3', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
// //     { key: '4', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
// //     { key: '5', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
// //     { key: '6', jobNumber: 'UL2409138', size: '4,986', itemDetails: 'Dove Men BCRM Hydrating 6x400ml' },
// //     { key: '7', jobNumber: 'UL2409130', size: '7,843', itemDetails: 'Lifebuoy BW Lemon 5x750ml' },
// //   ];

// //   const handleJobNumberChange = (value) => {
// //     const selected = jobData.find(job => job.jobNumber === value);
// //     setSelectedJob(selected);
// //     form.setFieldsValue({
// //       bookedQuantity: '',
// //       size: selected ? selected.size : '',
// //       itemDetails: selected ? selected.itemDetails : '',
// //     });
// //   };

// //   return (
// //     <Modal
// //       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
// //       visible={isModalVisible}
// //       onOk={() => {
// //         form.validateFields()
// //           .then(values => {
// //             handleOk({
// //               date: values.date,
// //               time: values.time,
// //               jobType: values.jobType,
// //               jobArea: values.jobArea,
// //               line: values.line,
// //               jobNumber: values.jobNumber,
// //               bookedQuantity: values.bookedQuantity,
// //               comments: values.comments,
// //               jobValidation: values.jobValidation,
// //               jobStatus: values.jobStatus,
// //               size: selectedJob.size,
// //               itemDetails: selectedJob.itemDetails,
// //             });
// //             form.resetFields();
// //             setSelectedJob(null);
// //           })
// //           .catch(info => console.error('Validate Failed:', info));
// //       }}
// //       onCancel={handleCancel}
// //       width={800}
// //       okText="Add Job"
// //       cancelText="Cancel"
// //     >
// //       <Form form={form} layout="vertical">
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
// //               <DatePicker style={{ width: '100%' }} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time!' }]}>
// //               <Select placeholder="Select Time">
// //                 <Option value="Day Shift">Day Shift</Option>
// //                 <Option value="Night Shift">Night Shift</Option>
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Job Type" name="jobType" rules={[{ required: true, message: 'Please select a job type!' }]}>
// //               <Select placeholder="Select Job Type">
// //                 <Option value="Production (Pack)">Production (Pack)</Option>
// //                 {/* Add other job types as needed */}
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Job Area" name="jobArea" rules={[{ required: true, message: 'Please select a job area!' }]}>
// //               <Select placeholder="Select Job Area">
// //                 <Option value="Home Care (Area 1)">Home Care (Area 1)</Option>
// //                 {/* Add other job areas as needed */}
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Line" name="line" rules={[{ required: true, message: 'Please enter the line!' }]}>
// //               <Input placeholder="Line" />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
// //               <Select placeholder="Select Job Number" onChange={handleJobNumberChange}>
// //                 {jobData.map(job => (
// //                   <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
// //                 ))}
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Booked Quantity" name="bookedQuantity" rules={[{ required: true, message: 'Please enter the booked quantity!' }]}>
// //               <Input placeholder="Booked Quantity" />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Comments" name="comments">
// //               <Input.TextArea placeholder="Comments" />
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Row gutter={16}>
// //           <Col span={12}>
// //             <Form.Item label="Job Validation" name="jobValidation" rules={[{ required: true, message: 'Please select job validation!' }]}>
// //               <Select placeholder="Job Validation">
// //                 <Option value="Needs Validation">Needs Validation</Option>
// //                 <Option value="Validated">Validated</Option>
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item label="Job Status" name="jobStatus" rules={[{ required: true, message: 'Please select job status!' }]}>
// //               <Select placeholder="Job Status">
// //                 <Option value="Picked">Picked</Option>
// //                 <Option value="Online">Online</Option>
// //                 <Option value="Complete">Complete</Option>
// //                 <Option value="On Hold">On Hold</Option>
// //               </Select>
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         {/* Display existing jobs summary */}
// //         {existingJobs && existingJobs.length > 0 && (
// //           <div>
// //             <Title level={5}>Existing Jobs:</Title>
// //             <Table
// //               dataSource={existingJobs.map((job, index) => ({ key: index, ...job }))}
// //               columns={[
// //                 { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
// //                 { title: 'Booked Quantity', dataIndex: 'bookedQuantity', key: 'bookedQuantity' },
// //                 { title: 'Size', dataIndex: 'size', key: 'size' },
// //                 { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
// //               ]}
// //               pagination={false}
// //             />
// //           </div>
// //         )}
// //       </Form>
// //     </Modal>
// //   );
// // };

// // export default AddJobModal;
// import React, { useState } from 'react';
// import { Modal, Input, Form, Select, Table, Row, Col, Typography, DatePicker, Button } from 'antd';

// const { Option } = Select;
// const { Title } = Typography;

// const AddJobModal = ({ isModalVisible, handleOk, handleCancel }) => {
//   const [form] = Form.useForm();
//   const [selectedJob, setSelectedJob] = useState(null);
  
//   const jobData = [
//     { key: '1', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
//     { key: '2', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '3', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '4', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
//     { key: '5', jobNumber: 'UL2409143', size: '4,800', itemDetails: 'Dove Body Wash 5x750ml' },
//     { key: '6', jobNumber: 'UL2409144', size: '7,000', itemDetails: 'Tresemme RPL Shampoo 5x900ml' },
//   ];

//   const handleJobSelect = (job) => {
//     setSelectedJob(job);
//     form.setFieldsValue({
//       jobNumber: job.jobNumber,
//       size: job.size,
//     });
//   };

//   const onFinish = (values) => {
//     handleOk({
//       jobNumber: values.jobNumber,
//       bookedQuantity: values.bookedQuantity,
//       size: values.size,
//       comments: values.comments,
//       jobStatus: values.jobStatus,
//     });
//   };

//   return (
//     <Modal
//       title="Add Job"
//       visible={isModalVisible}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//       >
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Job Number" name="jobNumber" required>
//               <Select onChange={handleJobSelect} placeholder="Select Job">
//                 {jobData.map(job => (
//                   <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Booked Quantity" name="bookedQuantity" required>
//               <Input type="number" placeholder="Enter booked quantity" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Size" name="size" required>
//               <Input disabled />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Comments" name="comments">
//               <Input.TextArea rows={3} placeholder="Add comments" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Status" name="jobStatus" required>
//               <Select placeholder="Select Job Status">
//                 <Option value="Completed">Completed</Option>
//                 <Option value="In Progress">In Progress</Option>
//                 <Option value="Pending">Pending</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;

// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, message } from 'antd';
// import { request } from 'umi'; // Import request from UmiJS

// const { Option } = Select;

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']); // Static job statuses

//   useEffect(() => {
//     // Fetch job numbers from the API when the modal is opened
//     if (visible) {
//       request('/schedule-jobs')
//         .then(response => {
//           if (response.success) {
//             const jobs = response.data.data.map(job => ({
//               key: job.id,
//               jobNumber: job.job_number,
//               itemDetails: job.description,
//               capacity: job.capacity,
//               jobType: job.job_type,
//               jobArea: job.job_area,
//             }));
//             setJobData(jobs);
//           } else {
//             message.error('Failed to fetch job data');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching job data:', error);
//           message.error('Error fetching job data');
//         });
//     }

//     return () => {
//       form.resetFields(); // Reset form fields on unmount
//       setSelectedJob(null); // Reset selected job
//     };
//   }, [visible, form]);

//   useEffect(() => {
//     if (selectedSlot && selectedJob) {
//       // Prefill form fields with selectedSlot and selectedJob data
//       form.setFieldsValue({
//         date: selectedSlot.scheduleDate || '',
//         time: selectedSlot.scheduleTime || '',
//         bookedQuantity: selectedJob?.produced_qty || '',
//         size: selectedJob?.capacity || '',
//         jobType: selectedJob?.jobType || '',
//         jobArea: selectedJob?.jobArea || '',
//       });
//     }
//   }, [selectedSlot, selectedJob, form]);

//   const handleFinish = async (values) => {
//     const payload = {
//       schedule_job_id: selectedSlot.jobId,
//       job_line_id: selectedSlot.lineId,
//       shift_id: selectedSlot.shiftId,
//       schedule_date: values.date,
//       schedule_time: values.time,
//       capacity: selectedJob?.capacity,
//       booked_qty: values.bookedQuantity,
//       comments: values.comments,
//       schedule_status_id: values.jobStatus.join(', '),
//     };

//     try {
//       await request(`/schedules`, {
//         method: 'POST',
//         data: payload,
//       });
//       message.success('Job added successfully');
//       onOk(values);
//       form.resetFields();
//       setSelectedJob(null);
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit job');
//     }
//   };

//   const handleJobNumberChange = (value) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job);
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
//         {/* <Form.Item
//           name="date"
//           label="Date"
//           rules={[{ required: true, message: 'Please select a date!' }]}
//         >
//           <Input placeholder="Enter date" disabled />
//         </Form.Item>
//         <Form.Item
//           name="time"
//           label="Time"
//           rules={[{ required: true, message: 'Please select a time!' }]}
//         >
//           <Input placeholder="Enter time" disabled />
//         </Form.Item> */}
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
//           name="bookedQuantity"
//           label="Booked Quantity"
//           rules={[{ required: true, message: 'Please enter the booked quantity!' }]}
//         >
//           <Input type="number" placeholder="Enter booked quantity" min={1} />
//         </Form.Item>
//         <Form.Item
//           name="size"
//           label="Size"
//           rules={[{ required: true, message: 'Please enter the size!' }]}
//         >
//           <Input placeholder="Enter size" />
//         </Form.Item>
//         {/* <Form.Item
//           name="jobType"
//           label="Job Type"
//           rules={[{ required: true, message: 'Please enter the job type!' }]}
//         >
//           <Input placeholder="Enter job type" disabled />
//         </Form.Item>
//         <Form.Item
//           name="jobArea"
//           label="Job Area"
//           rules={[{ required: true, message: 'Please enter the job area!' }]}
//         >
//           <Input placeholder="Enter job area" disabled />
//         </Form.Item> */}
//         <Form.Item
//           name="comments"
//           label="Comments"
//         >
//           <Input.TextArea placeholder="Enter comments" rows={4} />
//         </Form.Item>
//         <Form.Item label="Job Status" name="jobStatus" rules={[{ required: true, message: 'Please select at least one job status!' }]}>
//           <Checkbox.Group options={jobStatuses} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
//             Submit
//           </Button>
//           <Button onClick={onCancel}>Cancel</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;



// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, message } from 'antd';
// import { request } from 'umi'; // Import request from UmiJS

// const { Option } = Select;

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']); // Static job statuses

//   useEffect(() => {
//     // Fetch job numbers from the API when the modal is opened
//     if (visible) {
//       request('/schedule-jobs')
//         .then(response => {
//           if (response.success) {
//             const jobs = response.data.data.map(job => ({
//               key: job.id,
//               jobNumber: job.job_number,
//               itemDetails: job.description,
//               capacity: job.capacity,
//               jobType: job.job_type,
//               jobArea: job.job_area,
//             }));
//             setJobData(jobs);
//           } else {
//             message.error('Failed to fetch job data');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching job data:', error);
//           message.error('Error fetching job data');
//         });
//     }

//     return () => {
//       form.resetFields(); // Reset form fields on unmount
//       setSelectedJob(null); // Reset selected job
//     };
//   }, [visible, form]);

//   useEffect(() => {
//     if (selectedSlot && selectedJob) {
//       // Prefill form fields with selectedSlot and selectedJob data
//       form.setFieldsValue({
//         date: selectedSlot.scheduleDate || '',
//         time: selectedSlot.scheduleTime || '',
//         bookedQuantity: selectedJob?.produced_qty || '',
//         size: selectedJob?.capacity || '',
//         jobType: selectedJob?.jobType || '',
//         jobArea: selectedJob?.jobArea || '',
//       });
//     }
//   }, [selectedSlot, selectedJob, form]);

//   const handleFinish = async (values) => {
//     // Make sure you retrieve the necessary IDs from selectedSlot
//     const payload = {
//       schedule_job_id: selectedSlot?.jobId || '',  // Ensure this value is available
//       job_line_id: selectedSlot?.lineId || '',     // Ensure this value is available
//       shift_id: selectedSlot?.shiftId || '',       // Ensure this value is available
//       schedule_date: values.date,                   // Make sure this is a valid date
//       schedule_time: values.time || '',             // Add this if it needs to be included
//       capacity: selectedJob?.capacity || '',        // Ensure this is available
//       booked_qty: values.bookedQuantity,            // Directly from form values
//       comments: values.comments || '',               // Directly from form values
//       schedule_status_id: getScheduleStatusId(values.jobStatus), // Replace this function with the actual mapping to UUIDs
//     };

//     try {
//       await request(`/schedules`, {
//         method: 'POST',
//         data: payload,
//       });
//       message.success('Job added successfully');
//       onOk(values);
//       form.resetFields();
//       setSelectedJob(null);
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit job');
//     }
//   };

//   // Function to map job statuses to UUIDs (replace with your actual logic)
//   const getScheduleStatusId = (statuses) => {
//     const statusMapping = {
//       'Picked': 'uuid-for-picked',
//       'Online': 'uuid-for-online',
//       'Complete': 'uuid-for-complete',
//       'On Hold': 'uuid-for-on-hold',
//     };
//     return statuses.map(status => statusMapping[status]).filter(Boolean); // Get UUIDs and filter out undefined
//   };

//   const handleJobNumberChange = (value) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job);
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
//           name="bookedQuantity"
//           label="Booked Quantity"
//           rules={[{ required: true, message: 'Please enter the booked quantity!' }]}
//         >
//           <Input type="number" placeholder="Enter booked quantity" min={1} />
//         </Form.Item>
//         <Form.Item
//           name="size"
//           label="Size"
//           rules={[{ required: true, message: 'Please enter the size!' }]}
//         >
//           <Input placeholder="Enter size" />
//         </Form.Item>
//         <Form.Item
//           name="comments"
//           label="Comments"
//         >
//           <Input.TextArea placeholder="Enter comments" rows={4} />
//         </Form.Item>
//         <Form.Item label="Job Status" name="jobStatus" rules={[{ required: true, message: 'Please select at least one job status!' }]}>
//           <Checkbox.Group options={jobStatuses} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
//             Submit
//           </Button>
//           <Button onClick={onCancel}>Cancel</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;

import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Button, Checkbox, message } from 'antd';
import { request } from 'umi';

const { Option } = Select;

const AddJobModal = ({ visible, onCancel, onOk, selectedSlot }) => {
  const [form] = Form.useForm();
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']); // Static job statuses

  useEffect(() => {
    // Fetch job numbers from the API when the modal is opened
    if (visible) {
      request('/schedule-jobs')
        .then(response => {
          if (response.success) {
            const jobs = response.data.data.map(job => ({
              key: job.id,
              jobNumber: job.job_number,
              itemDetails: job.description,
              capacity: job.capacity,
              jobType: job.job_type,
              jobArea: job.job_area,
            }));
            setJobData(jobs);
          } else {
            message.error('Failed to fetch job data');
          }
        })
        .catch(error => {
          console.error('Error fetching job data:', error);
          message.error('Error fetching job data');
        });
    }

    return () => {
      form.resetFields(); // Reset form fields on unmount
      setSelectedJob(null); // Reset selected job
    };
  }, [visible, form]);

  useEffect(() => {
    if (visible && selectedSlot) {
      // Pre-fill form fields with selectedSlot data
      form.setFieldsValue({
        date: selectedSlot.scheduleDate || '',
        time: selectedSlot.scheduleTime || '',
        bookedQuantity: selectedSlot.bookedQuantity || '', // Pre-filling booked quantity from slot
        jobType: selectedSlot.jobType || '',
        jobArea: selectedSlot.jobArea || '',
      });
    }
  }, [selectedSlot, visible, form]);

  const handleFinish = async (values) => {
    // Ensure the necessary IDs are available from selectedSlot and selectedJob
    const payload = {
      schedule_job_id: selectedJob?.key || '',      // Job ID from selected job
      job_line_id: selectedSlot?.lineId || '',      // Line ID from selected slot
      shift_id: selectedSlot?.shiftId || '',        // Shift ID from selected slot
      schedule_date: selectedSlot?.scheduleDate || values.date, // Pre-filled date
      schedule_time: values.time || selectedSlot?.scheduleTime, // Pre-filled time
      capacity: selectedJob?.capacity || '',        // Capacity from selected job
      booked_qty: values.bookedQuantity || selectedSlot?.bookedQuantity, // Pre-filled quantity
      comments: values.comments || '',              // Comments field from form
      schedule_status_id: getScheduleStatusId(values.jobStatus), // Mapped status
    };

    try {
      const response = await request('/schedules', {
        method: 'POST',
        data: payload,
      });
      if (response.success) {
        message.success('Job added successfully');
        onOk(values);
        form.resetFields();
        setSelectedJob(null);
      } else {
        message.error('Failed to submit job: ' + response.message);
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      message.error('Failed to submit job');
    }
  };

  // Function to map job statuses to UUIDs (replace with your actual logic)
  const getScheduleStatusId = (statuses) => {
    const statusMapping = {
      'Picked': 'uuid-for-picked',
      'Online': 'uuid-for-online',
      'Complete': 'uuid-for-complete',
      'On Hold': 'uuid-for-on-hold',
    };
    return statuses.map(status => statusMapping[status]).filter(Boolean); // Get UUIDs and filter out undefined
  };

  const handleJobNumberChange = (value) => {
    const job = jobData.find(job => job.jobNumber === value);
    setSelectedJob(job);
    if (job) {
      form.setFieldsValue({
        bookedQuantity: job.capacity, // Set the booked quantity to match the job capacity
        jobType: job.jobType,         // Set the job type from the selected job
        jobArea: job.jobArea,         // Set the job area from the selected job
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Add Job"
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="jobNumber"
          label="Job Number"
          rules={[{ required: true, message: 'Please select a job number!' }]}
        >
          <Select
            placeholder="Search for a job"
            onChange={handleJobNumberChange}
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

        <Form.Item
          name="jobStatus"
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

        <Form.Item
          name="bookedQuantity"
          label="Booked Quantity"
          rules={[{ required: true, message: 'Please enter booked quantity!' }]}
        >
          <Input placeholder="Enter booked quantity" />
        </Form.Item>

        <Form.Item name="comments" label="Comments">
          <Input.TextArea rows={4} placeholder="Additional comments (optional)" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AddJobModal;


// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Input, Select, DatePicker } from 'antd';
// import moment from 'moment';

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot, jobTypes, jobAreas }) => {
//   const [form] = Form.useForm();
//   const [jobTypeId, setJobTypeId] = useState(null);
//   const [jobAreaId, setJobAreaId] = useState(null);

//   useEffect(() => {
//     if (visible && selectedSlot) {
//       form.setFieldsValue({
//         jobType: jobTypes[0]?.id,  // Set the first job type by default
//         jobArea: jobAreas[0]?.id,   // Set the first job area by default
//         date: moment(selectedSlot.date), // Set the date from selected slot
//         time: selectedSlot.hour,      // Set the time from selected slot
//       });
//       setJobTypeId(jobTypes[0]?.id);
//       setJobAreaId(jobAreas[0]?.id);
//     }
//   }, [visible, selectedSlot, jobTypes, jobAreas]);

//   const handleOk = () => {
//     form.validateFields().then(values => {
//       onOk({
//         jobNumber: values.jobType,
//         area: jobAreaId,
//         date: values.date,
//         time: values.time,
//         comments: values.comments,
//         bookedQuantity: values.bookedQuantity,
//         size: values.size,
//         jobStatus: 'Pending',  // Default status, can be adjusted as needed
//       });
//     });
//   };

//   return (
//     <Modal
//       title="Add Job"
//       visible={visible}
//       onCancel={onCancel}
//       onOk={handleOk}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           name="jobType"
//           label="Job Type"
//           rules={[{ required: true, message: 'Please select a job type!' }]}
//         >
//           <Select onChange={(value) => setJobTypeId(value)}>
//             {jobTypes.map(type => (
//               <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="jobArea"
//           label="Job Area"
//           rules={[{ required: true, message: 'Please select a job area!' }]}
//         >
//           <Select onChange={(value) => setJobAreaId(value)}>
//             {jobAreas.map(area => (
//               <Select.Option key={area.id} value={area.id}>{area.name}</Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="date"
//           label="Date"
//           rules={[{ required: true, message: 'Please select a date!' }]}
//         >
//           <DatePicker />
//         </Form.Item>
//         <Form.Item
//           name="time"
//           label="Time"
//           rules={[{ required: true, message: 'Please select a time!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item name="comments" label="Comments">
//           <Input.TextArea />
//         </Form.Item>
//         <Form.Item
//           name="bookedQuantity"
//           label="Booked Quantity"
//           rules={[{ required: true, message: 'Please input booked quantity!' }]}
//         >
//           <Input type="number" />
//         </Form.Item>
//         <Form.Item
//           name="size"
//           label="Size"
//           rules={[{ required: true, message: 'Please input size!' }]}
//         >
//           <Input />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;



// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Select, Input, Button, Checkbox, message } from 'antd';
// import { request } from 'umi'; // Import request from UmiJS

// const { Option } = Select;

// const AddJobModal = ({ visible, onCancel, onOk, selectedSlot }) => {
//   const [form] = Form.useForm();
//   const [jobData, setJobData] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobStatuses] = useState(['Picked', 'Online', 'Complete', 'On Hold']); // Static job statuses

//   useEffect(() => {
//     // Fetch job numbers from the API when the modal is opened
//     if (visible) {
//       request('/schedule-jobs')
//         .then(response => {
//           if (response.success) {
//             // Access the nested data correctly
//             const jobs = response.data.data.map(job => ({
//               key: job.id,
//               jobNumber: job.job_number,
//               itemDetails: job.description,
//               capacity: job.capacity,
//               jobType: job.job_type,  // Assuming this is the job type field
//               jobArea: job.job_area,  // Assuming this is the job area field
//             }));
//             setJobData(jobs);
//           } else {
//             message.error('Failed to fetch job data');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching job data:', error);
//           message.error('Error fetching job data');
//         });
//     }

//     return () => {
//       form.resetFields(); // Reset form fields on unmount
//       setSelectedJob(null); // Reset selected job
//     };
//   }, [visible, form]);

//   useEffect(() => {
//     if (selectedSlot && selectedSlot.jobId) {
//       const initialValues = {
//         date: selectedSlot.scheduleDate || '',
//         time: selectedSlot.scheduleTime || '',
//         jobNumber: selectedJob?.jobNumber || '',
//         bookedQuantity: selectedJob?.produced_qty || '',
//         size: selectedJob?.capacity || '',
//         jobType: selectedJob?.jobType || '',
//         jobArea: selectedJob?.jobArea || '',
//       };
//       form.setFieldsValue(initialValues);
//     }
//   }, [selectedSlot, selectedJob, form]);

//   const handleFinish = async (values) => {
//     const payload = {
//       schedule_job_id: selectedSlot.jobId,
//       job_line_id: selectedSlot.lineId,
//       shift_id: selectedSlot.shiftId,
//       schedule_date: values.date,
//       schedule_time: values.time,
//       capacity: selectedJob?.capacity,
//       booked_qty: values.bookedQuantity,
//       comments: values.comments,
//       schedule_status_id: values.jobStatus.join(', '),
//     };

//     try {
//       await request(`/schedules`, {
//         method: 'POST',
//         data: payload,
//       });
//       message.success('Job added successfully');
//       onOk(values);
//       form.resetFields();
//       setSelectedJob(null);
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       message.error('Failed to submit job');
//     }
//   };

//   const handleJobNumberChange = (value) => {
//     const job = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(job);
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
//           name="date"
//           label="Date"
//           rules={[{ required: true, message: 'Please select a date!' }]}
//         >
//           <Input placeholder="Enter date" disabled />
//         </Form.Item>
//         <Form.Item
//           name="time"
//           label="Time"
//           rules={[{ required: true, message: 'Please select a time!' }]}
//         >
//           <Input placeholder="Enter time" disabled />
//         </Form.Item>
//         <Form.Item
//           name="jobNumber"
//           label="Job Number"
//           rules={[{ required: true, message: 'Please select a job number!' }]}
//         >
//           <Select
//             placeholder="Select a job"
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
//           name="bookedQuantity"
//           label="Booked Quantity"
//           rules={[{ required: true, message: 'Please enter the booked quantity!' }]}
//         >
//           <Input type="number" placeholder="Enter booked quantity" min={1} />
//         </Form.Item>
//         <Form.Item
//           name="size"
//           label="Size"
//           rules={[{ required: true, message: 'Please enter the size!' }]}
//         >
//           <Input placeholder="Enter size" />
//         </Form.Item>
//         <Form.Item
//           name="jobType"
//           label="Job Type"
//           rules={[{ required: true, message: 'Please enter the job type!' }]}
//         >
//           <Input placeholder="Enter job type" disabled />
//         </Form.Item>
//         <Form.Item
//           name="jobArea"
//           label="Job Area"
//           rules={[{ required: true, message: 'Please enter the job area!' }]}
//         >
//           <Input placeholder="Enter job area" disabled />
//         </Form.Item>
//         <Form.Item
//           name="comments"
//           label="Comments"
//         >
//           <Input.TextArea placeholder="Enter comments" rows={4} />
//         </Form.Item>
//         <Form.Item label="Job Status" name="jobStatus" rules={[{ required: true, message: 'Please select at least one job status!' }]}>
//           <Checkbox.Group options={jobStatuses} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
//             Submit
//           </Button>
//           <Button onClick={onCancel}>Cancel</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
