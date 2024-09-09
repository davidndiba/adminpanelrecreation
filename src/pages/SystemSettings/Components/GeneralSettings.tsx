// import React from 'react';
// import { ProCard, Button, Divider, Input } from '@ant-design/pro-components';
// import { Typography, Modal, Form, message } from 'antd'; // Import from antd

// const { Title } = Typography; // Correct import from antd

// const GeneralSettings = () => {
//   // State management for general settings
//   const [setting1, setSetting1] = React.useState('Value 1');
//   const [setting2, setSetting2] = React.useState('Value 2');
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [newSettingValue, setNewSettingValue] = React.useState('');

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     // Implement save settings logic here
//     setIsModalVisible(false);
//     message.success('Settings updated successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="General Settings" bordered>
//       <Title level={4}>Setting 1</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>Current Value: {setting1}</div>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Setting 2</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>Current Value: {setting2}</div>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>

//       {/* Modal for Changing Setting */}
//       <Modal
//         title="Change Setting"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Value">
//             <Input value={newSettingValue} onChange={(e) => setNewSettingValue(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default GeneralSettings;
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Modal, Form, Input, message, Button, Divider } from 'antd'; // Import from antd
// const { Title } = Typography;

// const GeneralSettings = () => {
//   // State management for general settings
//   const [setting1, setSetting1] = React.useState('Value 1');
//   const [setting2, setSetting2] = React.useState('Value 2');
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [newSettingValue, setNewSettingValue] = React.useState('');

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     // Implement save settings logic here
//     setIsModalVisible(false);
//     message.success('Settings updated successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="General Settings" bordered>
//       <Title level={4}>Setting 1</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>Current Value: {setting1}</div>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>
//       <Divider />
//       <Title level={4}>Setting 2</Title>
//       <ProCard bordered>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>Current Value: {setting2}</div>
//           <Button type="primary" onClick={showModal}>
//             Change Setting
//           </Button>
//         </div>
//       </ProCard>

//       {/* Modal for Changing Setting */}
//       <Modal
//         title="Change Setting"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label="New Value">
//             <Input value={newSettingValue} onChange={(e) => setNewSettingValue(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default GeneralSettings;
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Modal, Form, Input, message, Button, Divider, TimePicker } from 'antd'; // Import from antd
import { useState } from 'react';
import dayjs from 'dayjs';

const { Title } = Typography;

const GeneralSettings = () => {
  // State management for settings
  const [location, setLocation] = useState('Factory Location');
  const [websiteURL, setWebsiteURL] = useState('http://example.com');
  const [contactEmail, setContactEmail] = useState('contact@example.com');
  const [supportPhone, setSupportPhone] = useState('+1234567890');
  const [operatingHours, setOperatingHours] = useState('09:00 - 17:00');
  const [maintenanceSchedule, setMaintenanceSchedule] = useState('Weekly');
  const [productionCapacity, setProductionCapacity] = useState('1000 units/day');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState('');
  const [newValue, setNewValue] = useState('');

  const showModal = (setting) => {
    setSelectedSetting(setting);
    setNewValue(setting === 'Operating Hours' ? '' : ''); // Custom handling for time picker
    setIsModalVisible(true);
  };

  const handleOk = () => {
    switch (selectedSetting) {
      case 'Factory Location':
        setLocation(newValue);
        break;
      case 'Website URL':
        setWebsiteURL(newValue);
        break;
      case 'Contact Email':
        setContactEmail(newValue);
        break;
      case 'Support Phone Number':
        setSupportPhone(newValue);
        break;
      case 'Operating Hours':
        setOperatingHours(newValue);
        break;
      case 'Maintenance Schedule':
        setMaintenanceSchedule(newValue);
        break;
      case 'Production Capacity':
        setProductionCapacity(newValue);
        break;
      default:
        break;
    }
    setIsModalVisible(false);
    message.success('Settings updated successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ProCard title="" bordered>
      <div style={{ padding: '16px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>General Settings</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Factory Location */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Factory Location: {location}</div>
              <Button type="primary" onClick={() => showModal('Factory Location')}>Change Location</Button>
            </div>
          </ProCard>

          {/* Website URL */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Website URL: {websiteURL}</div>
              <Button type="primary" onClick={() => showModal('Website URL')}>Change URL</Button>
            </div>
          </ProCard>

          {/* Contact Email */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Contact Email: {contactEmail}</div>
              <Button type="primary" onClick={() => showModal('Contact Email')}>Change Email</Button>
            </div>
          </ProCard>

          {/* Support Phone Number */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Support Phone Number: {supportPhone}</div>
              <Button type="primary" onClick={() => showModal('Support Phone Number')}>Change Phone</Button>
            </div>
          </ProCard>

          {/* Operating Hours */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Operating Hours: {operatingHours}</div>
              <Button type="primary" onClick={() => showModal('Operating Hours')}>Change Hours</Button>
            </div>
          </ProCard>

          {/* Maintenance Schedule */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Maintenance Schedule: {maintenanceSchedule}</div>
              <Button type="primary" onClick={() => showModal('Maintenance Schedule')}>Update Schedule</Button>
            </div>
          </ProCard>

          {/* Production Capacity */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Production Capacity: {productionCapacity}</div>
              <Button type="primary" onClick={() => showModal('Production Capacity')}>Update Capacity</Button>
            </div>
          </ProCard>
        </div>
      </div>

      {/* Modal for Changing Setting */}
      <Modal
        title={`Change ${selectedSetting}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label={`New ${selectedSetting}`}>
            {selectedSetting === 'Operating Hours' ? (
              <TimePicker.RangePicker 
                format="HH:mm" 
                value={newValue ? [dayjs(newValue.split(' - ')[0]), dayjs(newValue.split(' - ')[1])] : []} 
                onChange={(values) => setNewValue(values ? `${values[0].format('HH:mm')} - ${values[1].format('HH:mm')}` : '')} 
              />
            ) : (
              <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
};

export default GeneralSettings;
