import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, PageHeader } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation, history, request } from 'umi';

const ResetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Extract token and email from the URL query params
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (token && email) {
      setToken(token);
      setEmail(email);
      setLoading(false);
    } else {
      message.error('Invalid or missing token.');
      history.push('/login');
    }
  }, [location.search]);

  const handleResetPassword = async (values: any) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }

    try {
      const response = await request('/auth/reset-password', {
        method: 'POST',
        data: { email, token, password },
      });

      if (response.success) {
        message.success('Password reset successful. Please log in.');
        history.push('/login');
      } else {
        message.error('Password reset failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <PageHeader title="Reset Password" />
      <ProForm
        onFinish={handleResetPassword}
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Reset Password
              </Button>
            </div>
          ),
        }}
      >
        <ProFormText.Password
          name="password"
          label="New Password"
          placeholder="Enter your new password"
          rules={[{ required: true, message: 'New password is required' }]}
        />
        <ProFormText.Password
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          rules={[{ required: true, message: 'Password confirmation is required' }]}
        />
      </ProForm>
    </div>
  );
};

export default ResetPasswordPage;
