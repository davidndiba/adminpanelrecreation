

import React, { useState, useEffect } from 'react';
import { ProCard, PageContainer } from '@ant-design/pro-components';
import { Typography, Switch, message, Space, Form, InputNumber, Button, Collapse, Row, Col } from 'antd';
import { request } from 'umi';

const { Title } = Typography;
const { Panel } = Collapse;

const PasswordSettings = () => {
  const [passwordRules, setPasswordRules] = useState<any>({
    min_length: 8,
    max_length: 20,
    require_uppercase: true,
    require_lowercase: true,
    require_number: true,
    require_special_character: true,
    disallow_repeated_characters: false,
    disallow_spaces: true,
    disallow_common_passwords: true,
    disallow_sequential_characters: true,
    disallow_palindromes: false,
    disallow_username_in_password: true,
    enforce_password_history: 5,
  });
  const [rememberMe, setRememberMe] = useState(true);

  // Fetch current password rules when the component mounts
  useEffect(() => {
    request(`/password-rules`, {
      method: 'GET'
    })
      .then((data) => setPasswordRules(data))
      .catch(() => message.error('Failed to fetch password rules'));
  }, []);

  // Handle API updates
  const handlePasswordRulesChange = (field: string, value: any) => {
    setPasswordRules((prev) => ({ ...prev, [field]: value }));
    request(`/password-rules`, {
      method: 'POST',
      data: { [field]: value },
    })
      .then(() => message.success('Password setting updated successfully'))
      .catch(() => message.error('Failed to update setting'));
  };

  const handleForcePasswordReset = () => {
    request(`/admin/reset-all-passwords`, {
      method: 'POST'
    })
      .then(() => message.success('All user passwords have been reset'))
      .catch(() => message.error('Failed to force password reset'));
  };

  return (
    <PageContainer
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        padding: '24px',
      }}
      title="Security Settings" // Single title for the page
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <ProCard title="Password Settings" bordered style={{ width: '100%', maxWidth: '800px' }}>
          <div style={{ padding: '16px' }}>
            <Title level={4} style={{ marginBottom: '24px' }}>Password Management</Title>
            <Collapse defaultActiveKey={['1', '2', '3']} accordion>
              {/* Password Strength Settings */}
              <Panel header="Password Strength Settings" key="1">
                <Form layout="vertical" size="small">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Minimum Password Length">
                        <InputNumber
                          min={1}
                          value={passwordRules.min_length}
                          onChange={(value) => handlePasswordRulesChange('min_length', value)}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Maximum Password Length">
                        <InputNumber
                          min={1}
                          value={passwordRules.max_length}
                          onChange={(value) => handlePasswordRulesChange('max_length', value)}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Panel>

              {/* Password Options Toggles */}
              <Panel header="Password Options" key="2">
                <Row gutter={16}>
                  {Object.keys(passwordRules)
                    .filter(key => typeof passwordRules[key] === 'boolean' && !['require_uppercase', 'require_lowercase'].includes(key))
                    .map((key) => (
                      <Col span={12} key={key} style={{ marginBottom: '16px' }}>
                        <Row align="middle">
                          <Col span={12}>
                            <Form.Item style={{ margin: 0 }}>
                              <span>{formatLabel(key)}</span>
                            </Form.Item>
                          </Col>
                          <Col span={12} style={{ textAlign: 'right' }}>
                            <Switch
                              checked={passwordRules[key]}
                              onChange={(checked) => handlePasswordRulesChange(key, checked)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    ))}
                </Row>
                <Row gutter={16}>
                  {Object.keys(passwordRules)
                    .filter(key => typeof passwordRules[key] === 'number')
                    .map((key) => (
                      <Col span={12} key={key} style={{ marginBottom: '16px' }}>
                        <Form.Item label={formatLabel(key)} style={{ margin: 0 }}>
                          <InputNumber
                            min={1}
                            value={passwordRules[key]}
                            onChange={(value) => handlePasswordRulesChange(key, value)}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    ))}
                </Row>
              </Panel>

              {/* Remember Me Option */}
              <Panel header="Remember Me Option" key="3">
                <Form layout="vertical" size="small">
                  <Form.Item>
                    <Space>
                      <div>Allow "Remember Me" Option</div>
                      <Switch checked={rememberMe} onChange={(checked) => setRememberMe(checked)} />
                    </Space>
                  </Form.Item>
                </Form>
              </Panel>

              {/* Force Password Reset */}
              <Panel header="Force Password Reset" key="4">
                <Form layout="vertical" size="small">
                  <Form.Item>
                    <Button type="primary" danger onClick={handleForcePasswordReset}>
                      Reset All Passwords
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>
            </Collapse>
          </div>
        </ProCard>
      </div>
    </PageContainer>
  );
};

// Helper function to format labels for form fields
const formatLabel = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/Password$/, 'Password');
};

export default PasswordSettings;
