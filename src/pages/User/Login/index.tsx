import { GoogleOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, message, Modal } from 'antd';
import React, { useState } from 'react';
import { history, request } from 'umi';
import './login.less';

const LoginPage: React.FC = () => {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);

  const handleFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const response = await request(`/auth/login`, {
        method: 'POST',
        data: { login: email, password },
      });

      if (response.success) {
        message.success('Login successful!');
        localStorage.setItem('planner_t', response.token);
        history.push('/');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await request('/auth/forgot-password', {
        method: 'POST',
        data: { email },
      });

      if (response.success) {
        message.success('Password reset link sent to your email!');
        setIsResetPasswordVisible(false); // Close the reset password modal
      } else {
        message.error('Failed to send password reset link.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleSignUp = async (values: any) => {
    try {
      const response = await request('/auth/register', {
        method: 'POST',
        data: {
          email: values.email,
          display_name: values.displayName,
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          timezone: 'UTC',
          role: '9cffe655-dc69-4d80-b4b3-2dde5f0cfb85',
        },
      });

      if (response.success) {
        message.success('Sign-up successful! Please log in.');
        setTimeout(() => setIsSignUpVisible(false), 300);
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <ProCard bordered className="login-card">
        <div className="login-content">
          <div className="login-left">
            <img src="/logo.png" alt="Company Logo" className="login-logo" />
            <h2 className="login-title">Planner Admin Dashboard</h2>
          </div>
          <div className="login-right">
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            <Divider plain>or</Divider>
            <ProForm
              onFinish={handleFinish}
              layout="vertical"
              submitter={{
                render: () => null, // Remove default submit and reset buttons
              }}
            >
              <ProFormText
                name="email"
                label="Email"
                placeholder="Enter your email"
                rules={[{ required: true, message: 'Email is required' }]}
              />
              <ProFormText.Password
                name="password"
                label="Password"
                placeholder="Enter your password"
                rules={[{ required: true, message: 'Password is required' }]}
              />
              <ProForm.Item>
                <Button
                  type="link"
                  className="forgot-password-link"
                  onClick={() => setIsResetPasswordVisible(true)}
                >
                  Forgot Password?
                </Button>
                <Button
                  type="link"
                  className="signup-link"
                  onClick={() => setIsSignUpVisible(true)}
                >
                  Sign Up
                </Button>
              </ProForm.Item>
              <ProForm.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                >
                  Login
                </Button>
              </ProForm.Item>
            </ProForm>
          </div>
        </div>
      </ProCard>

      {/* Sign-Up Modal */}
      <Modal
        title="Sign Up"
        visible={isSignUpVisible}
        onCancel={() => setIsSignUpVisible(false)}
        footer={null}
        className="signup-modal"
      >
        <ProForm
          onFinish={handleSignUp}
          layout="vertical"
          submitter={{
            render: (props) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >
                <Button
                  type="default"
                  onClick={() => props?.reset?.()} // Reset fields on button click
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </div>
            ),
          }}
        >
          <ProFormText
            name="email"
            label="Email"
            placeholder="Enter your email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
          <ProFormText
            name="displayName"
            label="Display Name"
            placeholder="Enter your display name"
            rules={[{ required: true, message: 'Display Name is required' }]}
          />
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
          <ProFormText.Password
            name="passwordConfirmation"
            label="Confirm Password"
            placeholder="Confirm your password"
            rules={[
              { required: true, message: 'Password confirmation is required' },
            ]}
          />
        </ProForm>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        title="Reset Password"
        visible={isResetPasswordVisible}
        onCancel={() => setIsResetPasswordVisible(false)}
        footer={null}
        className="reset-password-modal"
      >
        <ProForm
          onFinish={(values) => handleForgotPassword(values.email)}
          layout="vertical"
          submitter={{
            render: (props) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >
                <Button
                  type="default"
                  onClick={() => props?.reset?.()} // Reset fields on button click
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Send Reset Link
                </Button>
              </div>
            ),
          }}
        >
          <ProFormText
            name="email"
            label="Email"
            placeholder="Enter your email"
            rules={[{ required: true, message: 'Email is required' }]}
          />
        </ProForm>
      </Modal>
    </div>
  );
};

export default LoginPage;
