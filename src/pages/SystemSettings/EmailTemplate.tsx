// import React, { useState, useEffect } from 'react';
// import { Table, Button, Switch, message } from 'antd';
// import { request } from 'umi';

// const EmailTemplate = () => {
//   const [templates, setTemplates] = useState([]);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await request('/templates');
//         setTemplates(response.data);
//       } catch (error) {
//         message.error('Failed to fetch templates');
//       }
//     };

//     fetchTemplates();
//   }, []);

//   const handleDelete = async (templateId) => {
//     try {
//       await request(`/templates/${templateId}`, { method: 'DELETE' });
//       message.success('Template deleted successfully');
//       setTemplates(templates.filter(template => template.id !== templateId));
//     } catch (error) {
//       message.error('Failed to delete template');
//     }
//   };

//   const handleStatusChange = async (templateId, checked) => {
//     try {
//       await request(`/templates/${templateId}/status`, {
//         method: 'PATCH',
//         data: { status: checked ? 'Active' : 'Inactive' },
//       });
//       message.success('Status updated successfully');
//     } catch (error) {
//       message.error('Failed to update status');
//     }
//   };

//   const templateColumns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     {
//       title: 'Status',
//       render: (text, record) => (
//         <Switch
//           checked={record.status === 'Active'}
//           onChange={(checked) => handleStatusChange(record.id, checked)}
//         />
//       ),
//     },
//     {
//       title: 'Option',
//       render: (text, record) => (
//         <>
//           <Button>Edit</Button>
//           <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Table columns={templateColumns} dataSource={templates} />
//   );
// };

// export default EmailTemplate;
import React, { useState, useEffect } from 'react';
import { Table, Button, Switch, message, Modal, Form, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from 'umi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EmailTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await request('/templates');
      setTemplates(response.data);
    } catch (error) {
      message.error('Failed to fetch templates');
    }
  };

  const handleCreateTemplate = async (values) => {
    try {
      const response = await request('/templates', {
        method: 'POST',
        data: values,
      });
      message.success(response.message || 'Template created successfully');
      setIsModalVisible(false);
      fetchTemplates();
    } catch (error) {
      message.error('Failed to create template');
    }
  };

  const handleDelete = async (templateId) => {
    try {
      await request(`/templates/${templateId}`, { method: 'DELETE' });
      message.success('Template deleted successfully');
      setTemplates(templates.filter((template) => template.id !== templateId));
    } catch (error) {
      message.error('Failed to delete template');
    }
  };

  const handleStatusChange = async (templateId, checked) => {
    try {
      await request(`/templates/${templateId}/status`, {
        method: 'PATCH',
        data: { status: checked ? 'Active' : 'Inactive' },
      });
      message.success('Status updated successfully');
      fetchTemplates();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setIsViewModalVisible(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setIsEditModalVisible(true);
    form.setFieldsValue(template);
  };

  const templateColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      render: (text, record) => (
        <Switch
          checked={record.status === 'Active'}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Button icon={<EyeOutlined />} onClick={() => handleViewTemplate(record)}>View</Button>
          <Button icon={<EditOutlined />} onClick={() => handleEditTemplate(record)}>Edit</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      title="Email Template Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Create Template
        </Button>
      }
    >
      <Table columns={templateColumns} dataSource={templates} rowKey="id" />

      {/* Create Template Modal */}
      <Modal
        title="Create Email Template"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateTemplate}>
          <Form.Item label="Template Name" name="name" rules={[{ required: true, message: 'Please enter the template name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the body' }]}>
            <ReactQuill theme="snow" />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Template Modal */}
      {selectedTemplate && (
        <Modal
          title="View Template"
          visible={isViewModalVisible}
          onCancel={() => setIsViewModalVisible(false)}
          footer={null}
        >
          <h3>{selectedTemplate.name}</h3>
          <p><strong>Subject:</strong> {selectedTemplate.subject}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedTemplate.body }} />
        </Modal>
      )}

      {/* Edit Template Modal */}
      {selectedTemplate && (
        <Modal
          title="Edit Email Template"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={async (values) => {
              try {
                await request(`/templates/${selectedTemplate.id}`, {
                  method: 'PUT',
                  data: values,
                });
                message.success('Template updated successfully');
                setIsEditModalVisible(false);
                fetchTemplates();
              } catch (error) {
                message.error('Failed to update template');
              }
            }}
          >
            <Form.Item label="Template Name" name="name" rules={[{ required: true, message: 'Please enter the template name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter the body' }]}>
              <ReactQuill theme="snow" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </PageContainer>
  );
};

export default EmailTemplate;
