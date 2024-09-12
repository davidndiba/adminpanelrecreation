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
// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Modal, Form, Input, message, Button, Divider, TimePicker } from 'antd'; // Import from antd
// import { useState } from 'react';
// import dayjs from 'dayjs';

// const { Title } = Typography;

// const GeneralSettings = () => {
//   // State management for settings
//   const [location, setLocation] = useState('Factory Location');
//   const [websiteURL, setWebsiteURL] = useState('http://example.com');
//   const [contactEmail, setContactEmail] = useState('contact@example.com');
//   const [supportPhone, setSupportPhone] = useState('+1234567890');
//   const [operatingHours, setOperatingHours] = useState('09:00 - 17:00');
//   const [maintenanceSchedule, setMaintenanceSchedule] = useState('Weekly');
//   const [productionCapacity, setProductionCapacity] = useState('1000 units/day');

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSetting, setSelectedSetting] = useState('');
//   const [newValue, setNewValue] = useState('');

//   const showModal = (setting) => {
//     setSelectedSetting(setting);
//     setNewValue(setting === 'Operating Hours' ? '' : ''); // Custom handling for time picker
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     switch (selectedSetting) {
//       case 'Factory Location':
//         setLocation(newValue);
//         break;
//       case 'Website URL':
//         setWebsiteURL(newValue);
//         break;
//       case 'Contact Email':
//         setContactEmail(newValue);
//         break;
//       case 'Support Phone Number':
//         setSupportPhone(newValue);
//         break;
//       case 'Operating Hours':
//         setOperatingHours(newValue);
//         break;
//       case 'Maintenance Schedule':
//         setMaintenanceSchedule(newValue);
//         break;
//       case 'Production Capacity':
//         setProductionCapacity(newValue);
//         break;
//       default:
//         break;
//     }
//     setIsModalVisible(false);
//     message.success('Settings updated successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>General Settings</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {/* Factory Location */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Factory Location: {location}</div>
//               <Button type="primary" onClick={() => showModal('Factory Location')}>Change Location</Button>
//             </div>
//           </ProCard>

//           {/* Website URL */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Website URL: {websiteURL}</div>
//               <Button type="primary" onClick={() => showModal('Website URL')}>Change URL</Button>
//             </div>
//           </ProCard>

//           {/* Contact Email */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Contact Email: {contactEmail}</div>
//               <Button type="primary" onClick={() => showModal('Contact Email')}>Change Email</Button>
//             </div>
//           </ProCard>

//           {/* Support Phone Number */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Support Phone Number: {supportPhone}</div>
//               <Button type="primary" onClick={() => showModal('Support Phone Number')}>Change Phone</Button>
//             </div>
//           </ProCard>

//           {/* Operating Hours */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Operating Hours: {operatingHours}</div>
//               <Button type="primary" onClick={() => showModal('Operating Hours')}>Change Hours</Button>
//             </div>
//           </ProCard>

//           {/* Maintenance Schedule */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Maintenance Schedule: {maintenanceSchedule}</div>
//               <Button type="primary" onClick={() => showModal('Maintenance Schedule')}>Update Schedule</Button>
//             </div>
//           </ProCard>

//           {/* Production Capacity */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Production Capacity: {productionCapacity}</div>
//               <Button type="primary" onClick={() => showModal('Production Capacity')}>Update Capacity</Button>
//             </div>
//           </ProCard>
//         </div>
//       </div>

//       {/* Modal for Changing Setting */}
//       <Modal
//         title={`Change ${selectedSetting}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label={`New ${selectedSetting}`}>
//             {selectedSetting === 'Operating Hours' ? (
//               <TimePicker.RangePicker 
//                 format="HH:mm" 
//                 value={newValue ? [dayjs(newValue.split(' - ')[0]), dayjs(newValue.split(' - ')[1])] : []} 
//                 onChange={(values) => setNewValue(values ? `${values[0].format('HH:mm')} - ${values[1].format('HH:mm')}` : '')} 
//               />
//             ) : (
//               <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
//             )}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default GeneralSettings;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Modal, Form, Input, message, Button, Select } from 'antd';
// import { request } from 'umi';

// const { Title } = Typography;
// const { Option } = Select;



// const GeneralSettings = () => {
//   // State management for settings
//   const [systemStatus, setSystemStatus] = useState('Online');
//   const [systemName, setSystemName] = useState('My System');
//   const [contactEmail, setContactEmail] = useState('contact@example.com');
//   const [contactPhone, setContactPhone] = useState('+1234567890');
//   const [systemTimezone, setSystemTimezone] = useState('');
//   const [languagePreference, setLanguagePreference] = useState('English');
//   const [timezones, setTimezones] = useState<string[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSetting, setSelectedSetting] = useState<string>('');
//   const [newValue, setNewValue] = useState<any>('');

//   // Fetch the default timezone and list of timezones
//   useEffect(() => {
//     // Fetch current system timezone
//     request(`/timezones`, { method: 'GET' })
//       .then((response: any) => {
//         if (response.success && response.data) {
//           setSystemTimezone(response.data.timezone); // Set default timezone
//           setNewValue(response.data.timezone); // Set the initial value for the modal
//         } else {
//           message.error('Failed to fetch system timezone');
//         }
//       })
//       .catch(() => message.error('Failed to fetch system timezone'));

//     // Fetch available timezones
//     request(`/timezones`, { method: 'GET' })
//       .then((response: any) => {
//         if (Array.isArray(response)) {
//           setTimezones(response);
//         } else {
//           message.error('Timezone data is not in the expected format');
//         }
//       })
//       .catch(() => message.error('Failed to fetch timezones'));
//   }, []);

//   const showModal = (setting: string) => {
//     setSelectedSetting(setting);
//     if (setting === 'System Timezone') {
//       setNewValue(systemTimezone); // Set to current timezone if available
//     } else {
//       setNewValue(''); // Default for other settings
//     }
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     switch (selectedSetting) {
//       case 'System Status':
//         // System status update logic here
//         break;
//       case 'System Name':
//         setSystemName(newValue);
//         break;
//       case 'Contact Email':
//         setContactEmail(newValue);
//         break;
//       case 'Contact Phone Number':
//         setContactPhone(newValue);
//         break;
//       case 'System Timezone':
//         setSystemTimezone(newValue);
//         break;
//       case 'Language Preference':
//         setLanguagePreference(newValue);
//         break;
//       default:
//         break;
//     }
//     setIsModalVisible(false);
//     message.success('Settings updated successfully');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <ProCard title="" bordered>
//       <div style={{ padding: '16px' }}>
//         <Title level={4} style={{ marginBottom: '16px' }}>General Settings</Title>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {/* System Status */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>System Status: {systemStatus}</div>
//               <Button type="primary" onClick={() => showModal('System Status')}>Change Status</Button>
//             </div>
//           </ProCard>

//           {/* System Name */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>System Name: {systemName}</div>
//               <Button type="primary" onClick={() => showModal('System Name')}>Change Name</Button>
//             </div>
//           </ProCard>

//           {/* Contact Email */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Contact Email: {contactEmail}</div>
//               <Button type="primary" onClick={() => showModal('Contact Email')}>Change Email</Button>
//             </div>
//           </ProCard>

//           {/* Contact Phone Number */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Contact Phone Number: {contactPhone}</div>
//               <Button type="primary" onClick={() => showModal('Contact Phone Number')}>Change Phone</Button>
//             </div>
//           </ProCard>

//           {/* System Timezone */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>System Timezone: {systemTimezone}</div>
//               <Button type="primary" onClick={() => showModal('System Timezone')}>Change Timezone</Button>
//             </div>
//           </ProCard>

//           {/* Language Preference */}
//           <ProCard bordered>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>Language Preference: {languagePreference}</div>
//               <Button type="primary" onClick={() => showModal('Language Preference')}>Change Language</Button>
//             </div>
//           </ProCard>
//         </div>
//       </div>

//       {/* Modal for Changing Setting */}
//       <Modal
//         title={`Change ${selectedSetting}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form layout="vertical">
//           <Form.Item label={`New ${selectedSetting}`}>
//             {selectedSetting === 'System Status' ? (
//               <Select
//                 value={newValue}
//                 onChange={(value) => setNewValue(value)}
//               >
//                 <Option value="Online">Online</Option>
//                 <Option value="Offline">Offline</Option>
//               </Select>
//             ) : selectedSetting === 'System Timezone' ? (
//               <Select
//                 value={newValue}
//                 onChange={(value) => setNewValue(value)}
//               >
//                 {Array.isArray(timezones) && timezones.map((timezone) => (
//                   <Option key={timezone} value={timezone}>{timezone}</Option>
//                 ))}
//               </Select>
//             ) : selectedSetting === 'Language Preference' ? (
//               <Select
//                 value={newValue}
//                 onChange={(value) => setNewValue(value)}
//               >
//                 <Option value="English">English</Option>
//                 <Option value="Spanish">Spanish</Option>
//                 <Option value="French">French</Option>
//                 {/* Add more languages as needed */}
//               </Select>
//             ) : (
//               <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
//             )}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ProCard>
//   );
// };

// export default GeneralSettings;
import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, Select, Typography, Switch } from 'antd';
import { request } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const GeneralSettings = () => {
  const [systemStatus, setSystemStatus] = useState('Online');
  const [systemName, setSystemName] = useState('My System');
  const [contactEmail, setContactEmail] = useState('contact@example.com');
  const [contactPhone, setContactPhone] = useState('+1234567890');
  const [systemTimezone, setSystemTimezone] = useState('');
  const [languagePreference, setLanguagePreference] = useState('English');
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    // Fetch current system settings
    request(`/system-settings`, { method: 'GET' })
      .then((response: any) => {
        if (response) {
          const {
            system_status,
            system_name,
            contact_email,
            contact_phone,
            timezone,
            language_preference,
          } = response;
          setSystemStatus(system_status);
          setSystemName(system_name);
          setContactEmail(contact_email);
          setContactPhone(contact_phone);
          setSystemTimezone(timezone);
          setLanguagePreference(language_preference);
        } else {
          message.error('Failed to fetch system settings');
        }
      })
      .catch(() => message.error('Failed to fetch system settings'));

    // Fetch available timezones
    request(`/timezones`, { method: 'GET' })
      .then((response: any) => {
        if (Array.isArray(response)) {
          setTimezones(response);
        } else {
          message.error('Timezone data is not in the expected format');
        }
      })
      .catch(() => message.error('Failed to fetch timezones'));
  }, []);

  const handleUpdateSettings = (updatedData: any) => {
    request(`/system-settings`, {
      method: 'PUT',
      data: updatedData,
    })
      .then((response: any) => {
        if (response.message === 'Settings updated successfully') {
          message.success('Settings updated successfully');
        } else {
          message.error('Failed to update settings');
        }
      })
      .catch(() => message.error('Failed to update settings'));
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>General Settings</Title>
      <Form layout="vertical">
        {/* System Status */}
        <Form.Item label="System Status">
          <Switch
            checked={systemStatus === 'Online'}
            onChange={(checked) => {
              const newStatus = checked ? 'Online' : 'Offline';
              setSystemStatus(newStatus);
              handleUpdateSettings({ system_status: newStatus });
            }}
            checkedChildren="Online"
            unCheckedChildren="Offline"
          />
        </Form.Item>

        {/* System Name */}
        <Form.Item label="System Name">
          <Input
            value={systemName}
            onChange={(e) => {
              setSystemName(e.target.value);
              handleUpdateSettings({ system_name: e.target.value });
            }}
          />
        </Form.Item>

        {/* Contact Email */}
        <Form.Item label="Contact Email">
          <Input
            value={contactEmail}
            onChange={(e) => {
              setContactEmail(e.target.value);
              handleUpdateSettings({ contact_email: e.target.value });
            }}
          />
        </Form.Item>

        {/* Contact Phone Number */}
        <Form.Item label="Contact Phone Number">
          <Input
            value={contactPhone}
            onChange={(e) => {
              setContactPhone(e.target.value);
              handleUpdateSettings({ contact_phone: e.target.value });
            }}
          />
        </Form.Item>

        {/* System Timezone */}
        <Form.Item label="System Timezone">
          <Select
            value={systemTimezone}
            onChange={(value) => {
              setSystemTimezone(value);
              handleUpdateSettings({ timezone: value });
            }}
          >
            {timezones.map((timezone) => (
              <Option key={timezone} value={timezone}>
                {timezone}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Language Preference */}
        <Form.Item label="Language Preference">
          <Select
            value={languagePreference}
            onChange={(value) => {
              setLanguagePreference(value);
              handleUpdateSettings({ language_preference: value });
            }}
          >
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="French">French</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralSettings;
