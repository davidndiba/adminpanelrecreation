import { Button, Card, Descriptions, Form, Input, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { request, useParams } from 'umi';

interface ProfileData {
  id: string;
  display_name: string;
  email: string;
  ip_address: string;
  status: { name: string };
  roles: string[];
  last_login: string;
  login_count: number;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request(`/users/${id}`);
        if (response.data) {
          setProfile(response.data);
          form.setFieldsValue(response.data); 
        } else {
          message.error('No data found');
        }
      } catch (error) {
        message.error('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await request(`/users/${id}`, {
        method: 'PUT',
        data: values,
      });
      message.success('Profile updated successfully');
      setProfile(values);
      setEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(profile); // Reset form fields to original profile data
    setEditing(false);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title="User Profile">
      {profile ? (
        <Form form={form} layout="vertical">
          <Descriptions bordered>
            <Descriptions.Item label="ID">{profile.id}</Descriptions.Item>
            <Descriptions.Item label="Display Name">
              {editing ? (
                <Form.Item
                  name="display_name"
                  rules={[
                    { required: true, message: 'Display Name is required' },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                profile.display_name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {editing ? (
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                profile.email
              )}
            </Descriptions.Item>
            <Descriptions.Item label="IP Address">
              {profile.ip_address}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {profile.status?.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Roles">
              {profile.roles?.length ? profile.roles.join(', ') : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">
              {profile.last_login || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Login Count">
              {profile.login_count || 'N/A'}
            </Descriptions.Item>
          </Descriptions>

          {editing && (
            <Form.Item>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          )}
          {!editing && (
            <Button type="primary" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </Form>
      ) : (
        <p>No profile data available</p>
      )}
    </Card>
  );
};

export default Profile;
