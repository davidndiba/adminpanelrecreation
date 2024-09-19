import React from 'react';
import {  List, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-components';

const Planner: React.FC = () => {
  return (
    <div>
      <PageHeader title="Planner" subTitle="Manage your tasks and schedules" />
      <List
        header={<div>Task List</div>}
        bordered
        dataSource={['Task 1', 'Task 2', 'Task 3']}
        renderItem={item => (
          <List.Item>
            {item}
            <Button type="link">Edit this none </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Planner;
