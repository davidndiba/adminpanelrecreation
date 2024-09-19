import React from 'react';
import { Card, Col, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-components';

const Dashboard: React.FC = () => {
  return (
    <div>
      <PageHeader title="Dashboard" subTitle="Overview of all activities" />
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Contentsss
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
