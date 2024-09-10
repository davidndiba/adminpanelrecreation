import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Button, Modal, Form, Input, message, Divider } from 'antd'; // Import from antd

const { Title } = Typography;

const SecuritySettings = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [newSettingValue, setNewSettingValue] = React.useState('');
  const [settingType, setSettingType] = React.useState('');

  const showModal = (type) => {
    setSettingType(type);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Implement save settings logic here
    message.success(`${settingType} updated successfully`);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ProCard title="" bordered>
      <div style={{ padding: '16px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>Security Settings</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Two-Factor Authentication */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Two-Factor Authentication</div>
              <Button type="primary" onClick={() => showModal('Two-Factor Authentication')}>Configure</Button>
            </div>
          </ProCard>

          {/* Password Strength Policy */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Password Strength Policy</div>
              <Button type="primary" onClick={() => showModal('Password Strength Policy')}>Update Policy</Button>
            </div>
          </ProCard>

          {/* Login Attempt Limits */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Login Attempt Limits</div>
              <Button type="primary" onClick={() => showModal('Login Attempt Limits')}>Set Limits</Button>
            </div>
          </ProCard>

          {/* IP Whitelisting */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>IP Whitelisting</div>
              <Button type="primary" onClick={() => showModal('IP Whitelisting')}>Manage IPs</Button>
            </div>
          </ProCard>

          {/* Session Timeout */}
          <ProCard bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Session Timeout</div>
              <Button type="primary" onClick={() => showModal('Session Timeout')}>Configure Timeout</Button>
            </div>
          </ProCard>

        </div>
      </div>

      {/* Modal for Changing Settings */}
      <Modal
        title={`Configure ${settingType}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label={`New ${settingType}`}>
            <Input value={newSettingValue} onChange={(e) => setNewSettingValue(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
};

export default SecuritySettings;
