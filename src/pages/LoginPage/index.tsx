import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { history, request } from 'umi';
import './login.less';

const LoginPage: React.FC = () => {
  const handleFinish = async (values: any) => {
    const { username, password } = values;
    try {
      const response = await request(`/auth/login`, {
        method: 'POST',
        data: { username, password },
      });

      if (response.success) {
        message.success('Login successful!');
        // Store token or user info in localStorage or state
        localStorage.setItem('token', response.token);
        // Redirect to the settings or home page
        history.push('/settings');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <ProForm title="Login" onFinish={handleFinish} layout="vertical">
        <ProFormText
          name="username"
          label="Username"
          placeholder="Enter your username"
          rules={[{ required: true, message: 'Username is required' }]}
        />
        <ProFormText.Password
          name="password"
          label="Password"
          placeholder="Enter your password"
          rules={[{ required: true, message: 'Password is required' }]}
        />
        <ProForm.Item>
          <button type="submit" className="login-button">
            Login
          </button>
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default LoginPage;
