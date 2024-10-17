import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'umi';
import { Button, Typography, message, Spin, Input, Modal } from 'antd';
import { MailOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { request } from 'umi';

const { Title, Text } = Typography;
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
const ConfirmEmail = () => {
//   const { token } = useParams(); // Extract token from URL params
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const token = query.get('token');
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  // Handle email verification
  const handleConfirmEmail = async () => {
    setLoading(true);
    try {
      const response = await request(`/auth/confirm-email`, {
        method: 'GET',
      });
      message.success('Email successfully confirmed!');
      navigate('/user/login'); // Redirect to login page
    } catch (error) {
      message.error('Failed to confirm email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend confirmation email
  const handleResendConfirmation = async () => {
    if (!email) {
      message.error('Please enter an email address.');
      return;
    }

    setResendLoading(true);
    try {
      const response = await request('/auth/resend-confirmation-email', {
        method: 'POST',
        data: {
          email,
        },
      });
      message.success('Confirmation email has been resent. Please check your inbox.');
      setIsModalVisible(false); // Close modal after successful resend
    } catch (error) {
      message.error('Failed to resend confirmation email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Open modal to input email
  const showResendModal = () => {
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={styles.container}>
      <Spin spinning={loading || resendLoading}>
        <div style={styles.content}>
          <MailOutlined style={styles.icon} />
          <Title level={3} style={styles.title}>
            Confirm Your Email
          </Title>
          <Text style={styles.description}>
            To complete the email verification process, please click the button below to confirm your email address.
          </Text>

          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleConfirmEmail}
            style={styles.confirmButton}
            loading={loading}
          >
            Verify Email
          </Button>

          <Text style={styles.orText}>or</Text>

          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={showResendModal} // Open modal on click
            style={styles.resendButton}
          >
            Resend Confirmation Email
          </Button>
        </div>
      </Spin>

      {/* Modal for entering email */}
      <Modal
        title="Resend Confirmation Email"
        visible={isModalVisible}
        onOk={handleResendConfirmation}
        onCancel={handleCancel}
        confirmLoading={resendLoading}
      >
        <Input
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  content: {
    textAlign: 'center' as React.CSSProperties['textAlign'], // Explicitly typing textAlign
    padding: '40px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  icon: {
    fontSize: '48px',
    color: '#1890ff',
    marginBottom: '20px',
  },
  title: {
    marginBottom: '16px',
  },
  description: {
    marginBottom: '24px',
    color: '#595959',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    marginBottom: '16px',
  },
  orText: {
    display: 'block',
    marginBottom: '16px',
  },
  resendButton: {
    width: '100%',
  },
};

export default ConfirmEmail;
