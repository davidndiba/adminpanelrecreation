
import React, { useEffect, useRef, useState } from 'react';
import {
  ActionType,
  ProColumns,
  ProTable,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Button, Card, Divider, message, Popconfirm, Row, Space, Tooltip, Typography, Tabs, Col } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { request } from 'umi';

const { Title } = Typography;
const { TabPane } = Tabs;

interface LineTank {
  id: string;
  job_area: string;
  tank: string;
  created_on: string;
  job_type_id: string;
}

const LinesAndTanks: React.FC = () => {
  const tableActionRef = useRef<ActionType>();
  const [data, setData] = useState<LineTank[]>([]);
  const [total, setTotal] = useState(0);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobAreas, setJobAreas] = useState([]);
  const [activeJobType, setActiveJobType] = useState<string | undefined>(undefined);
  const [newTank, setNewTank] = useState({ job_area: '', tank: '', job_type_id: '' });

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await request('/job-types');
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
        if (response.data.data.length > 0) {
          setActiveJobType(response.data.data[0].id); // Set default job type
        }
      } catch (error) {
        message.error('Failed to fetch job types.');
      }
    };
    fetchJobTypes();
  }, []);

  useEffect(() => {
    const fetchJobAreas = async () => {
      if (!activeJobType) return;
      try {
        const response = await request(`/job-areas?job_type_id=${activeJobType}`);
        setJobAreas(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        message.error('Failed to fetch job areas.');
      }
    };
    fetchJobAreas();
  }, [activeJobType]);

  const fetchData = async (params: any) => {
    try {
      const response = await request('/job-lines', { params });
      if (Array.isArray(response.data)) {
        setData(response.data);
        setTotal(response.total || response.data.length);
      } else {
        console.error('Expected array but got:', response.data);
        setData([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setData([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  const handleAddTank = async () => {
    try {
      await request('/job-lines', { method: 'POST', data: newTank });
      message.success('Line/Tank added successfully.');
      fetchData({});
      setNewTank({ job_area: '', tank: '', job_type_id: '' });
    } catch (error) {
      message.error('Failed to add line/tank.');
    }
  };

  const columns: ProColumns<LineTank>[] = [
    {
      title: 'Job Area',
      dataIndex: 'job_area',
      key: 'job_area',
    },
    {
      title: 'Tank',
      dataIndex: 'tank',
      key: 'tank',
    },
    {
      title: 'Created At',
      dataIndex: 'created_on',
      key: 'created_on',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} type="link" />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this line/tank?"
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

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Lines & Tanks</Title>
      
      <Tabs activeKey={activeJobType} onChange={setActiveJobType}>
        {jobTypes.map(type => (
          <TabPane tab={type.name} key={type.id} />
        ))}
      </Tabs>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card bordered={false} style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
            <Row justify="space-between" style={{ marginBottom: '20px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddTank}
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
              >
                Add Line/Tank
              </Button>
            </Row>
            <Divider />
            <ProTable<LineTank>
              headerTitle={false}
              actionRef={tableActionRef}
              rowKey="id"
              dataSource={data}
              pagination={{ total, pageSize: 10 }}
              columns={columns}
              bordered
            />
            <Divider />
            <Title level={4}>Add a New Tank</Title>
            <ProFormSelect
              name="job_type_id"
              label="Job Type"
              options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
              onChange={value => setNewTank({ ...newTank, job_type_id: value })}
              rules={[{ required: true, message: 'Job Type is required.' }]}
              style={{ marginBottom: '10px' }}
            />
            <ProFormSelect
              name="job_area"
              label="Job Area"
              options={jobAreas.map(area => ({ label: area.name, value: area.id }))}
              onChange={value => setNewTank({ ...newTank, job_area: value })}
              rules={[{ required: true, message: 'Job Area is required.' }]}
              style={{ marginBottom: '10px' }}
            />
            <ProFormText
              name="tank"
              label="Tank"
              value={newTank.tank}
              onChange={e => setNewTank({ ...newTank, tank: e.target.value })}
              placeholder="Enter tank"
              rules={[{ required: true, message: 'Tank is required.' }]}
              style={{ marginBottom: '10px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LinesAndTanks;
