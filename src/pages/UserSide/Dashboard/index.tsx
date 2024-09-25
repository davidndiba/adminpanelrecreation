import React from 'react';
import { PageHeader, ProCard } from '@ant-design/pro-components';
import { Row, Col, Card, Statistic, Progress, Select, DatePicker, Calendar } from 'antd';
import { Bar } from '@ant-design/charts';
import { CheckCircleOutlined, StopOutlined, SyncOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const { RangePicker } = DatePicker;

  // Data for job statuses
  const jobStatuses = [
    { title: 'Complete', value: 38, percent: 70, icon: '✅' },
    { title: 'In Progress', value: 80, percent: 20, icon: '⚙️' },
    { title: 'Dispensed', value: 50, percent: 10, icon: '🚚' },
    { title: 'On Hold', value: 5, percent: 5, icon: '🛑' },
  ];

  const packJobs = [
    { title: 'Pack Job 1', value: 10, percent: 80, icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
    { title: 'Pack Job 2', value: 15, percent: 60, icon: <SyncOutlined style={{ color: 'orange' }} /> },
    { title: 'Pack Job 3', value: 20, percent: 90, icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
    { title: 'Pack Job 4', value: 5, percent: 50, icon: <StopOutlined style={{ color: 'red' }} /> },
    { title: 'Pack Job 5', value: 12, percent: 70, icon: <SyncOutlined style={{ color: 'orange' }} /> },
  ];

  const bulkJobs = [
    { title: 'Bulk Job 1', value: 20, percent: 90, icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
    { title: 'Bulk Job 2', value: 30, percent: 50, icon: <SyncOutlined style={{ color: 'orange' }} /> },
    { title: 'Bulk Job 3', value: 40, percent: 75, icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
    { title: 'Bulk Job 4', value: 25, percent: 60, icon: <SyncOutlined style={{ color: 'orange' }} /> },
    { title: 'Bulk Job 5', value: 18, percent: 80, icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
  ];

  return (
    <div>
      {/* Header and Filters */}
      <PageHeader
        title="Planner Dashboard"
        subTitle="Hi, welcome back! Here's your summary of job schedules."
      />
      <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <RangePicker />
        </Col>
        <Col span={8}>
          <Select placeholder="Select Job Category" style={{ width: '100%' }}>
            <Select.Option value="pack">Pack Jobs</Select.Option>
            <Select.Option value="bulk">Bulk Jobs</Select.Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Scheduled Jobs Card with Circular Graph */}
        <Col span={8}>
          <ProCard title="Scheduled Jobs" bordered>
            <Statistic title="Total Jobs Today" value={100} />
            <Progress type="circle" percent={75} strokeColor={{ '0%': '#FFD700', '100%': '#808080' }} />
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Statistic title="Completed" value="75%" />
              <Statistic title="Remaining" value="25%" />
            </div>
          </ProCard>
        </Col>

        {/* Pack Jobs and Bulk Jobs Section */}
        <Col span={16}>
          {/* Pack Jobs Section */}
          <ProCard title="Pack Jobs" bordered style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              {packJobs.map((job, index) => (
                <Col span={4} key={index}>
                  <Card>
                    <Statistic
                      title={job.title}
                      value={job.value}
                      prefix={job.icon}
                      valueStyle={{ fontSize: '16px' }}
                    />
                    <Progress percent={job.percent} />
                  </Card>
                </Col>
              ))}
            </Row>
          </ProCard>

          {/* Bulk Jobs Section */}
          <ProCard title="Bulk Jobs" bordered>
            <Row gutter={[16, 16]}>
              {bulkJobs.map((job, index) => (
                <Col span={4} key={index}>
                  <Card>
                    <Statistic
                      title={job.title}
                      value={job.value}
                      prefix={job.icon}
                      valueStyle={{ fontSize: '16px' }}
                    />
                    <Progress percent={job.percent} />
                  </Card>
                </Col>
              ))}
            </Row>
          </ProCard>
        </Col>
      </Row>

      {/* Job Progress Graph and Scheduled vs Unscheduled Jobs */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <ProCard title="Scheduled Job Progress" bordered>
            <Bar
              data={[
                { type: 'January', value: 80 },
                { type: 'February', value: 20 },
                { type: 'March', value: 50 },
                { type: 'April', value: 30 },
                { type: 'May', value: 90 },
                { type: 'June', value: 60 },
                { type: 'July', value: 70 },
                { type: 'August', value: 40 },
                { type: 'September', value: 80 },
                { type: 'October', value: 30 },
                { type: 'November', value: 70 },
                { type: 'December', value: 60 },
              ]}
              xField="type"
              yField="value"
              seriesField="type"
              color={['#4CAF50', '#FF9F00', '#1890FF', '#FF4D4F']}
            />
          </ProCard>
        </Col>

        <Col span={12}>
          <ProCard title="Scheduled vs Unscheduled Jobs" bordered>
            {/* Empty section, no graph */}
          </ProCard>
        </Col>
      </Row>

      <footer style={{ textAlign: 'center', marginTop: 16 }}>
        © 2024 TRT Manufacturing Ltd
        <br />
        Powered by: Microvision Innovations Ltd
      </footer>
    </div>
  );
};

export default Dashboard;
