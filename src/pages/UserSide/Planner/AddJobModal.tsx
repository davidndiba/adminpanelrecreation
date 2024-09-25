// import React, { useState } from 'react';
// import { Modal, Input, Form, Select, Table, Row, Col, Typography } from 'antd';
// import moment from 'moment';

// const { Option } = Select;
// const { Title } = Typography;

// const AddJobModal = ({ isModalVisible, handleOk, handleCancel, jobAreas }) => {
//   const [form] = Form.useForm();
//   const [searchQuery, setSearchQuery] = useState('');

//   const jobData = [
//     { key: '1', jobNumber: 'UL2409144', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
//     { key: '2', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
//     { key: '3', jobNumber: 'UL2409139', size: '7,344', itemDetails: 'Organics Kids STBY 2 in 1 6x400ml' },
//     { key: '4', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '5', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '6', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
//     { key: '7', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
//   ];

//   const filteredJobs = jobData.filter(job => job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()));

//   const columns = [
//     { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
//     { title: 'Size', dataIndex: 'size', key: 'size' },
//     { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
//   ];

//   return (
//     <Modal
//       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
//       visible={isModalVisible}
//       onOk={() => {
//         form.validateFields()
//           .then(values => {
//             handleOk(values); // Pass form values back to handleOk
//             form.resetFields(); // Reset the form fields after submission
//           })
//           .catch(info => {
//             console.error('Validate Failed:', info);
//           });
//       }}
//       onCancel={handleCancel}
//       width={800}
//       okText="Add Job"
//       cancelText="Cancel"
//       footer={null}
//     >
//       <Form form={form} layout="vertical">
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Date" name="date" initialValue={moment().format('YYYY-MM-DD')}>
//               <Input disabled />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Time" name="time" initialValue="Day Shift">
//               <Input disabled />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Job Type" name="jobType" rules={[{ required: true, message: 'Please select a job type!' }]}>
//               <Select placeholder="Select Job Type">
//                 <Option value="Pack">Production (Pack)</Option>
//                 <Option value="Bulk">Production (Bulk)</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Job Area" name="jobArea" rules={[{ required: true, message: 'Please select a job area!' }]}>
//               <Select placeholder="Select Job Area">
//                 {jobAreas.map(area => (
//                   <Option key={area.id} value={area.id}>{area.name}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
//               <Input.Search
//                 placeholder="Search Job Number"
//                 onSearch={(value) => setSearchQuery(value)}
//                 enterButton
//               />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Table
//           columns={columns}
//           dataSource={filteredJobs}
//           pagination={false}
//           style={{ marginTop: 16 }}
//           onRow={(record) => ({
//             onClick: () => {
//               form.setFieldsValue({ jobNumber: record.jobNumber });
//               handleOk(record.jobNumber); // Pass selected job number
//             },
//           })}
//         />
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
// import React, { useState } from 'react';
// import { Modal, Input, Form, Select, Table, Row, Col, Typography } from 'antd';

// const { Option } = Select;
// const { Title } = Typography;

// const AddJobModal = ({ isModalVisible, handleOk, handleCancel, jobAreas }) => {
//   const [form] = Form.useForm();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedJob, setSelectedJob] = useState(null);

//   const jobData = [
//     // Your job data here...
//     { key: '1', jobNumber: 'UL2409144', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
//      { key: '2', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
//      { key: '3', jobNumber: 'UL2409139', size: '7,344', itemDetails: 'Organics Kids STBY 2 in 1 6x400ml' },
//      { key: '4', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//      { key: '5', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//      { key: '6', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
//      { key: '7', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
//   ];

//   const filteredJobs = jobData.filter(job => job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()));

//   const handleJobNumberChange = (value) => {
//     const selected = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(selected);
//     form.setFieldsValue({ bookedQuantity: '', size: selected ? selected.size : '' });
//   };

//   const columns = [
//     { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
//     { title: 'Size', dataIndex: 'size', key: 'size' },
//     { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
//   ];

//   return (
//     <Modal
//       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
//       visible={isModalVisible}
//       onOk={() => {
//         form.validateFields()
//           .then(values => {
//             handleOk(values);
//             form.resetFields();
//             setSelectedJob(null);
//           })
//           .catch(info => console.error('Validate Failed:', info));
//       }}
//       onCancel={handleCancel}
//       width={800}
//       okText="Add Job"
//       cancelText="Cancel"
//     >
//       <Form form={form} layout="vertical">
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
//               <Select placeholder="Select Job Number" onChange={handleJobNumberChange} showSearch>
//                 {filteredJobs.map(job => (
//                   <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Booked Quantity" name="bookedQuantity" rules={[{ required: true, message: 'Please enter the booked quantity!' }]}>
//               <Input placeholder="Booked Quantity" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Size" name="size">
//               <Input disabled placeholder="Size" value={selectedJob ? selectedJob.size : ''} />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status!' }]}>
//               <Select placeholder="Select Status">
//                 <Option value="Booked">Booked</Option>
//                 <Option value="Pending">Pending</Option>
//                 <Option value="Completed">Completed</Option>
//                 <Option value="Canceled">Canceled</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Form.Item label="Job Details" name="details">
//           <Input.TextArea rows={4} placeholder="Enter Job Details" />
//         </Form.Item>
//         <Form.Item>
//           <Input placeholder="Search Job Number" onChange={e => setSearchQuery(e.target.value)} />
//         </Form.Item>
//         <Table columns={columns} dataSource={filteredJobs} pagination={false} rowKey="key" scroll={{ y: 240 }} />
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
// import React, { useState } from 'react';
// import { Modal, Input, Form, Select, Table, Row, Col, Typography, DatePicker } from 'antd';

// const { Option } = Select;
// const { Title } = Typography;

// const AddJobModal = ({ isModalVisible, handleOk, handleCancel, existingJobs = [] }) => {
//   const [form] = Form.useForm();
//   const [selectedJob, setSelectedJob] = useState(null);
  
//   const jobData = [
//     { key: '1', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
//     { key: '2', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '3', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
//     { key: '4', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
//     { key: '5', jobNumber: 'UL2409143', size: '6,000', itemDetails: 'Lifebuoy BW Total 5x750ml' },
//     { key: '6', jobNumber: 'UL2409138', size: '4,986', itemDetails: 'Dove Men BCRM Hydrating 6x400ml' },
//     { key: '7', jobNumber: 'UL2409130', size: '7,843', itemDetails: 'Lifebuoy BW Lemon 5x750ml' },
//   ];

//   const handleJobNumberChange = (value) => {
//     const selected = jobData.find(job => job.jobNumber === value);
//     setSelectedJob(selected);
//     form.setFieldsValue({
//       bookedQuantity: '',
//       size: selected ? selected.size : '',
//       itemDetails: selected ? selected.itemDetails : '',
//     });
//   };

//   return (
//     <Modal
//       title={<Title level={4} style={{ color: '#1890ff' }}>Add New Job</Title>}
//       visible={isModalVisible}
//       onOk={() => {
//         form.validateFields()
//           .then(values => {
//             handleOk({
//               date: values.date,
//               time: values.time,
//               jobType: values.jobType,
//               jobArea: values.jobArea,
//               line: values.line,
//               jobNumber: values.jobNumber,
//               bookedQuantity: values.bookedQuantity,
//               comments: values.comments,
//               jobValidation: values.jobValidation,
//               jobStatus: values.jobStatus,
//               size: selectedJob.size,
//               itemDetails: selectedJob.itemDetails,
//             });
//             form.resetFields();
//             setSelectedJob(null);
//           })
//           .catch(info => console.error('Validate Failed:', info));
//       }}
//       onCancel={handleCancel}
//       width={800}
//       okText="Add Job"
//       cancelText="Cancel"
//     >
//       <Form form={form} layout="vertical">
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
//               <DatePicker style={{ width: '100%' }} />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time!' }]}>
//               <Select placeholder="Select Time">
//                 <Option value="Day Shift">Day Shift</Option>
//                 <Option value="Night Shift">Night Shift</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Job Type" name="jobType" rules={[{ required: true, message: 'Please select a job type!' }]}>
//               <Select placeholder="Select Job Type">
//                 <Option value="Production (Pack)">Production (Pack)</Option>
//                 {/* Add other job types as needed */}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Job Area" name="jobArea" rules={[{ required: true, message: 'Please select a job area!' }]}>
//               <Select placeholder="Select Job Area">
//                 <Option value="Home Care (Area 1)">Home Care (Area 1)</Option>
//                 {/* Add other job areas as needed */}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Line" name="line" rules={[{ required: true, message: 'Please enter the line!' }]}>
//               <Input placeholder="Line" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Job Number" name="jobNumber" rules={[{ required: true, message: 'Please select a job number!' }]}>
//               <Select placeholder="Select Job Number" onChange={handleJobNumberChange}>
//                 {jobData.map(job => (
//                   <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Booked Quantity" name="bookedQuantity" rules={[{ required: true, message: 'Please enter the booked quantity!' }]}>
//               <Input placeholder="Booked Quantity" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Comments" name="comments">
//               <Input.TextArea placeholder="Comments" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Job Validation" name="jobValidation" rules={[{ required: true, message: 'Please select job validation!' }]}>
//               <Select placeholder="Job Validation">
//                 <Option value="Needs Validation">Needs Validation</Option>
//                 <Option value="Validated">Validated</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Job Status" name="jobStatus" rules={[{ required: true, message: 'Please select job status!' }]}>
//               <Select placeholder="Job Status">
//                 <Option value="Picked">Picked</Option>
//                 <Option value="Online">Online</Option>
//                 <Option value="Complete">Complete</Option>
//                 <Option value="On Hold">On Hold</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         {/* Display existing jobs summary */}
//         {existingJobs && existingJobs.length > 0 && (
//           <div>
//             <Title level={5}>Existing Jobs:</Title>
//             <Table
//               dataSource={existingJobs.map((job, index) => ({ key: index, ...job }))}
//               columns={[
//                 { title: 'Job Number', dataIndex: 'jobNumber', key: 'jobNumber' },
//                 { title: 'Booked Quantity', dataIndex: 'bookedQuantity', key: 'bookedQuantity' },
//                 { title: 'Size', dataIndex: 'size', key: 'size' },
//                 { title: 'Item Details', dataIndex: 'itemDetails', key: 'itemDetails' },
//               ]}
//               pagination={false}
//             />
//           </div>
//         )}
//       </Form>
//     </Modal>
//   );
// };

// export default AddJobModal;
import React, { useState } from 'react';
import { Modal, Input, Form, Select, Table, Row, Col, Typography, DatePicker, Button } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const AddJobModal = ({ isModalVisible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobData = [
    { key: '1', jobNumber: 'UL2409145', size: '4,000', itemDetails: 'Lux Botan Skin Rebalance 5x750ml' },
    { key: '2', jobNumber: 'UL2409140', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
    { key: '3', jobNumber: 'UL2409141', size: '6,000', itemDetails: 'Lux BWash Sheer Twilight 5x750ml' },
    { key: '4', jobNumber: 'UL2409142', size: '6,600', itemDetails: 'Tresemme STYL Heat Def Spray 6x300ml' },
    { key: '5', jobNumber: 'UL2409143', size: '4,800', itemDetails: 'Dove Body Wash 5x750ml' },
    { key: '6', jobNumber: 'UL2409144', size: '7,000', itemDetails: 'Tresemme RPL Shampoo 5x900ml' },
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    form.setFieldsValue({
      jobNumber: job.jobNumber,
      size: job.size,
    });
  };

  const onFinish = (values) => {
    handleOk({
      jobNumber: values.jobNumber,
      bookedQuantity: values.bookedQuantity,
      size: values.size,
      comments: values.comments,
      jobStatus: values.jobStatus,
    });
  };

  return (
    <Modal
      title="Add Job"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Job Number" name="jobNumber" required>
              <Select onChange={handleJobSelect} placeholder="Select Job">
                {jobData.map(job => (
                  <Option key={job.key} value={job.jobNumber}>{job.jobNumber}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Booked Quantity" name="bookedQuantity" required>
              <Input type="number" placeholder="Enter booked quantity" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Size" name="size" required>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Comments" name="comments">
              <Input.TextArea rows={3} placeholder="Add comments" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status" name="jobStatus" required>
              <Select placeholder="Select Job Status">
                <Option value="Completed">Completed</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddJobModal;
