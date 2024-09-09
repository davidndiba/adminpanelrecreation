// // // import React, { useState } from 'react';
// // // import { ProCard, Button, Divider, Modal, message } from '@ant-design/pro-components';
// // // import { Typography, Form, Input } from 'antd'; // Correctly import Input and Form
// // // import { useNavigate } from 'react-router-dom';

// // // const { Title } = Typography;

// // // const EmailSettings = () => {
// // //   const navigate = useNavigate();
// // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // //   const [emailTemplate, setEmailTemplate] = useState('<h1>Email Template</h1>');
// // //   const [password, setPassword] = useState('');
// // //   const [testResult, setTestResult] = useState('');

// // //   const showChangePasswordModal = () => {
// // //     setIsModalVisible(true);
// // //   };

// // //   const handlePasswordChange = () => {
// // //     // Implement password change logic here
// // //     setIsModalVisible(false);
// // //     message.success('Password changed successfully');
// // //   };

// // //   const handleTestSettings = () => {
// // //     // Implement test settings logic here
// // //     setTestResult('Test successful'); // Example result
// // //     message.success('Test settings successful');
// // //   };

// // //   return (
// // //     <ProCard title="Email Settings" bordered>
// // //       <Title level={4}>Email Setup</Title>
// // //       <ProCard bordered>
// // //         <div>
// // //           <div>Example email setup format:</div>
// // //           <pre>{`SMTP Server: smtp.example.com\nPort: 587\nUsername: user@example.com\nPassword: ********`}</pre>
// // //         </div>
// // //       </ProCard>
// // //       <Divider />
// // //       <Title level={4}>Change Password</Title>
// // //       <ProCard bordered>
// // //         <Button type="primary" onClick={showChangePasswordModal}>
// // //           Change Password
// // //         </Button>
// // //         <Modal
// // //           title="Change Password"
// // //           visible={isModalVisible}
// // //           onOk={handlePasswordChange}
// // //           onCancel={() => setIsModalVisible(false)}
// // //         >
// // //           <Form layout="vertical">
// // //             <Form.Item label="New Password">
// // //               <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
// // //             </Form.Item>
// // //           </Form>
// // //         </Modal>
// // //       </ProCard>
// // //       <Divider />
// // //       <Title level={4}>Email Template</Title>
// // //       <ProCard bordered>
// // //         <div>
// // //           <div>Email Template:</div>
// // //           <pre>{emailTemplate}</pre>
// // //         </div>
// // //       </ProCard>
// // //       <Divider />
// // //       <Title level={4}>Email Logs/Queue</Title>
// // //       <ProCard bordered>
// // //         <Button type="primary" onClick={() => navigate('/email-logs')}>
// // //           View Email Logs
// // //         </Button>
// // //       </ProCard>
// // //       <Divider />
// // //       <Title level={4}>Compose Email</Title>
// // //       <ProCard bordered>
// // //         <Button type="primary" onClick={() => navigate('/compose-email')}>
// // //           Compose Email
// // //         </Button>
// // //       </ProCard>
// // //       <Divider />
// // //       <Title level={4}>Test Settings</Title>
// // //       <ProCard bordered>
// // //         <Button type="primary" onClick={handleTestSettings}>
// // //           Test Settings
// // //         </Button>
// // //         {testResult && <div>{testResult}</div>}
// // //       </ProCard>
// // //     </ProCard>
// // //   );
// // // };

// // // export default EmailSettings;
// //   import React from 'react';
// //   import { ProCard, Button, Divider, Modal, message } from '@ant-design/pro-components';
// //   import { Typography, Form, Input } from 'antd';
// //   // import { useNavigate } from 'react-router-dom';

// //   const { Title } = Typography;

// //   const EmailSettings = () => {
// //     const [isModalVisible, setIsModalVisible] = React.useState(false);
// //     const [password, setPassword] = React.useState('');
// //   //   const navigate = useNavigate();

// //     const handlePasswordChange = () => {
// //       // Implement password change logic
// //       message.success('Password changed successfully');
// //       setIsModalVisible(false);
// //     };

// //     return (
// //       <ProCard>
// //         <Title level={2}>Email Settings</Title>
// //         <ProCard title="Email Setup" bordered>
// //           <Button onClick={() => setIsModalVisible(true)}>View Email Setup</Button>
// //         </ProCard>
// //         <ProCard title="Change Password" bordered>
// //           <Button onClick={() => setIsModalVisible(true)}>Change Password</Button>
// //           <Modal
// //             title="Change Password"
// //             visible={isModalVisible}
// //             onOk={handlePasswordChange}
// //             onCancel={() => setIsModalVisible(false)}
// //           >
// //             <Form layout="vertical">
// //               <Form.Item label="New Password">
// //                 <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
// //               </Form.Item>
// //             </Form>
// //           </Modal>
// //         </ProCard>
// //         <ProCard title="Email Template" bordered>
// //           <Button>View Template</Button>
// //         </ProCard>
// //         <ProCard title="Email Logs/Queue" bordered>
// //           <Button onClick={() => navigate('/email-logs')}>View Logs/Queue</Button>
// //         </ProCard>
// //         <ProCard title="Compose Email" bordered>
// //           <Button>Compose Email</Button>
// //         </ProCard>
// //         <ProCard title="Test Settings" bordered>
// //           <Button>Test Settings</Button>
// //         </ProCard>
// //       </ProCard>
// //     );
// //   };

// //   export default EmailSettings;
// // import React from 'react';
// // import { ProCard} from '@ant-design/pro-components';
// // import { Typography, Form, Input, Button,Modal, message } from 'antd'; // Import from antd
// // const { Title } = Typography;

// // const EmailSettings = () => {
// //   const [isModalVisible, setIsModalVisible] = React.useState(false);
// //   const [password, setPassword] = React.useState('');

// //   const handlePasswordChange = () => {
// //     // Implement password change logic
// //     message.success('Password changed successfully');
// //     setIsModalVisible(false);
// //   };

// //   return (
// //     <ProCard>
// //       <Title level={2}>Email Settings</Title>
// //       <ProCard title="Email Setup" bordered>
// //         <Button onClick={() => setIsModalVisible(true)}>View Email Setup</Button>
// //       </ProCard>
// //       <ProCard title="Change Password" bordered>
// //         <Button onClick={() => setIsModalVisible(true)}>Change Password</Button>
// //         <Modal
// //           title="Change Password"
// //           visible={isModalVisible}
// //           onOk={handlePasswordChange}
// //           onCancel={() => setIsModalVisible(false)}
// //         >
// //           <Form layout="vertical">
// //             <Form.Item label="New Password">
// //               <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
// //             </Form.Item>
// //           </Form>
// //         </Modal>
// //       </ProCard>
// //       <ProCard title="Email Template" bordered>
// //         <Button>View Template</Button>
// //       </ProCard>
// //       <ProCard title="Email Logs/Queue" bordered>
// //         <Button>View Logs/Queue</Button>
// //       </ProCard>
// //       <ProCard title="Compose Email" bordered>
// //         <Button>Compose Email</Button>
// //       </ProCard>
// //       <ProCard title="Test Settings" bordered>
// //         <Button>Test Settings</Button>
// //       </ProCard>
// //     </ProCard>
// //   );
// // };

// // export default EmailSettings;
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Form, Input, Button, Modal, message } from 'antd'; // Import from antd
// const { Title } = Typography;

// const EmailSettings = () => {
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [password, setPassword] = React.useState('');

//   const handlePasswordChange = () => {
//     // Implement password change logic here
//     message.success('Password changed successfully');
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="Email Settings" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>Email Settings</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
//           {/* Email Setup */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Setup</div>
//               <Button onClick={() => setIsModalVisible(true)}>View Email Setup</Button>
//             </div>
//           </ProCard>

//           {/* Change Password */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Change Password</div>
//               <Button onClick={() => setIsModalVisible(true)}>Change Password</Button>
//             </div>
//           </ProCard>

//           {/* Email Template */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Template</div>
//               <Button>View Template</Button>
//             </div>
//           </ProCard>

//           {/* Email Logs/Queue */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Email Logs/Queue</div>
//               <Button>View Logs/Queue</Button>
//             </div>
//           </ProCard>

//           {/* Compose Email */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Compose Email</div>
//               <Button>Compose Email</Button>
//             </div>
//           </ProCard>

//           {/* Test Settings */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Test Settings</div>
//               <Button>Test Settings</Button>
//             </div>
//           </ProCard>

//         </div>
//       </div>

//       {/* Modal for Changing Password */}
//       <Modal
//         title="Change Password"
//         visible={isModalVisible}
//         onOk={handlePasswordChange}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Password">
//             <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default EmailSettings;
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Form, Input, Button, Modal, message } from 'antd'; // Import from antd
const { Title } = Typography;

const EmailSettings = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const handlePasswordChange = () => {
    // Implement password change logic here
    message.success('Password changed successfully');
    setIsModalVisible(false);
  };

  return (
    <ProCard title="" bordered>
      <div style={{ padding: '16px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>Email Settings</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Email Setup */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Email Setup</div>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>View Email Setup</Button>
            </div>
          </ProCard>

          {/* Change Password */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Change Password</div>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>Change Password</Button>
            </div>
          </ProCard>

          {/* Email Template */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Email Template</div>
              <Button type="primary">View Template</Button>
            </div>
          </ProCard>

          {/* Email Logs/Queue */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Email Logs/Queue</div>
              <Button type="primary">View Logs/Queue</Button>
            </div>
          </ProCard>

          {/* Compose Email */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Compose Email</div>
              <Button type="primary">Compose Email</Button>
            </div>
          </ProCard>

          {/* Test Settings */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Test Settings</div>
              <Button type="primary">Test Settings</Button>
            </div>
          </ProCard>

        </div>
      </div>

      {/* Modal for Changing Password */}
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handlePasswordChange}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="New Password">
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
};

export default EmailSettings;
