
import React, { useRef, useState, useEffect } from 'react';
import {
  ActionType,
  ProColumns,
  ProFormText,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Row, Col, message, Popconfirm, Space, Tooltip, Typography, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from 'umi';

const { Title } = Typography;
const { TabPane } = Tabs;

const JobAreas: React.FC = () => {
  const tableActionRef = useRef<ActionType>();
  const [formValues, setFormValues] = useState(undefined);
  const [jobTypes, setJobTypes] = useState([]);
  const [newJobArea, setNewJobArea] = useState('');
  const [selectedJobType, setSelectedJobType] = useState(undefined);
  const [activeJobType, setActiveJobType] = useState(undefined);
  const [filteredJobAreas, setFilteredJobAreas] = useState([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await request('/job-types');
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
        // Set the default active job type
        if (response.data.data.length > 0) {
          setActiveJobType(response.data.data[0].id);
        }
      } catch (error) {
        message.error('Failed to fetch job types.');
      }
    };
    fetchJobTypes();
  }, []);

  useEffect(() => {
    const fetchJobAreas = async () => {
      try {
        const response = await request(`/job-areas`);
        // Filter job areas based on the selected job type
        const areas = response.data.data || [];
        const filteredAreas = areas.filter(area => area.job_type_id === activeJobType);
        setFilteredJobAreas(filteredAreas);
      } catch (error) {
        message.error('Failed to fetch job areas.');
      }
    };
    if (activeJobType) {
      fetchJobAreas();
    }
  }, [activeJobType]);

  const handleEdit = (record) => {
    setFormValues(record);
    setNewJobArea(record.name);
    setSelectedJobType(record.job_type_id);
  };

  const handleDelete = async (id) => {
    try {
      await request(`/job-areas/${id}`, { method: 'DELETE' });
      message.success('Job Area deleted successfully.');
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to delete job area.');
    }
  };

  const columns: ProColumns[] = [
    {
      title: 'Job Areas',
      dataIndex: 'name',
      key: 'job_area',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'modified_on',
      render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
      sorter: (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} type="link" />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this job area?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAddJobArea = async () => {
    if (!newJobArea || !selectedJobType) {
      message.error('Both fields are required.');
      return;
    }
    try {
      await request(`/job-areas`, {
        method: 'POST',
        data: {
          name: newJobArea,
          job_type_id: selectedJobType,
        },
      });
      message.success('Job Area added successfully.');
      setNewJobArea('');
      setSelectedJobType(undefined);
      tableActionRef.current?.reload();
    } catch (error) {
      message.error('Failed to add job area.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Job Areas Management</Title>

      <Tabs activeKey={activeJobType} onChange={setActiveJobType}>
        {jobTypes.map(type => (
          <TabPane tab={type.name} key={type.id}>
            {/* The tab content can be customized further if needed */}
          </TabPane>
        ))}
      </Tabs>

      <Row gutter={16}>
        <Col span={16}>
          <ProTable
            actionRef={tableActionRef}
            rowKey="id"
            dataSource={filteredJobAreas}
            columns={columns}
            bordered
            search={false}
            pagination={{ pageSize: 15 }}
          />
        </Col>
        <Col span={8} style={{ paddingLeft: '20px' }}>
          <Title level={4}>Add Job Area</Title>
          <div>
            <label>Job Area</label>
            <ProFormText
              value={newJobArea}
              onChange={(e) => setNewJobArea(e.target.value)}
              placeholder="Enter job area"
              rules={[{ required: true, message: 'Job Area is required.' }]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Job Type</label>
            <ProFormSelect
              value={selectedJobType}
              onChange={(value) => setSelectedJobType(value)}
              options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
              rules={[{ required: true, message: 'Job Type is required.' }]}
            />
          </div>
          <Button
            type="primary"
            onClick={handleAddJobArea}
            style={{ marginTop: '20px' }}
          >
            Add Job Area
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default JobAreas;
