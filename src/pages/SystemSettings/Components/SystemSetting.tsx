// import React from 'react';
// import { ProCard, Button, Divider } from '@ant-design/pro-components';
// import { Typography, Switch, Modal, Input, Form, message } from 'antd'; // Import from antd
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography; 

// const SystemSettings = () => {
//   // State management for settings
//   const [isActive, setIsActive] = React.useState(true);
//   const [timezone, setTimezone] = React.useState('UTC');
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [newSetting, setNewSetting] = React.useState('');

//   const handleSwitchChange = (checked) => {
//     setIsActive(checked);
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     // Implement save settings logic here
//     setIsModalVisible(false);
//     message.success('Settings saved successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="System Settings" bordered>
//       <Title level={4}>System Status</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>System is currently {isActive ? 'Active' : 'Offline'}</div>
//           <Switch checked={isActive} onChange={handleSwitchChange} />
//         </div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Default Timezone</Title>
//       <ProCard bordered>
//         <div>Current timezone: {timezone}</div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Additional Setting</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>

//       {/* Modal for Additional Setting */}
//       <Modal
//         title="Change Setting"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Setting">
//             <Input value={newSetting} onChange={(e) => setNewSetting(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default SystemSettings;
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Switch, Modal, Input, Form, message , Button, Divider} from 'antd'; // Import from antd
// const { Title } = Typography; 

// const SystemSetting = () => {
//   // State management for settings
//   const [isActive, setIsActive] = React.useState(true);
//   const [timezone, setTimezone] = React.useState('UTC');
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [newSetting, setNewSetting] = React.useState('');

//   const handleSwitchChange = (checked) => {
//     setIsActive(checked);
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     // Implement save settings logic here
//     setIsModalVisible(false);
//     message.success('Settings saved successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="System Settings" bordered>
//       <Title level={4}>System Status</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>System is currently {isActive ? 'Active' : 'Offline'}</div>
//           <Switch checked={isActive} onChange={handleSwitchChange} />
//         </div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Default Timezone</Title>
//       <ProCard bordered>
//         <div>Current timezone: {timezone}</div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Additional Setting</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>

//       {/* Modal for Additional Setting */}
//       <Modal
//         title="Change Setting"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Setting">
//             <Input value={newSetting} onChange={(e) => setNewSetting(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default SystemSetting;
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Switch, Modal, Input, Form, message, Button, Divider, Select } from 'antd'; // Import from antd

const { Title } = Typography;
const { Option } = Select;

const SystemSetting = () => {
  // State management for settings
  const [isActive, setIsActive] = React.useState(true);
  const [timezone, setTimezone] = React.useState('UTC');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [newSetting, setNewSetting] = React.useState('');
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const handleSwitchChange = (checked) => {
    setIsActive(checked);
  };

  const handleEmailNotificationsChange = (checked) => {
    setEmailNotifications(checked);
  };

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Implement save settings logic here
    setIsModalVisible(false);
    message.success('Settings saved successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ProCard title="" bordered>
      <div style={{ padding: '16px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>System Settings</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* System Status */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>System is currently {isActive ? 'Active' : 'Offline'}</div>
              <Switch checked={isActive} onChange={handleSwitchChange} />
            </div>
          </ProCard>

          {/* Default Timezone */}
          <ProCard bordered>
            <div>Current timezone: {timezone}</div>
          </ProCard>

          {/* Additional Setting */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Additional Setting</div>
              <Button type="primary" onClick={showModal}>Change Setting</Button>
            </div>
          </ProCard>

          {/* Email Notifications */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Email Notifications</div>
              <Switch checked={emailNotifications} onChange={handleEmailNotificationsChange} />
            </div>
          </ProCard>

          {/* Change Password */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Change Password</div>
              <Button type="primary" onClick={() => message.info('Password change dialog to be implemented')}>Change Password</Button>
            </div>
          </ProCard>

          {/* API Settings */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>API Settings</div>
              <Button type="primary" onClick={() => message.info('API settings dialog to be implemented')}>Configure API</Button>
            </div>
          </ProCard>

          {/* Language Preference */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Language Preference</div>
              <Select value={selectedLanguage} onChange={handleLanguageChange} style={{ width: 200 }}>
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                {/* Add more languages as needed */}
              </Select>
            </div>
          </ProCard>
        </div>
      </div>

      {/* Modal for Additional Setting */}
      <Modal
        title="Change Setting"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="New Setting">
            <Input value={newSetting} onChange={(e) => setNewSetting(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
};

export default SystemSetting;
