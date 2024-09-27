import { DownloadOutlined } from '@ant-design/icons';
import { PageHeader, ProCard, ProTable } from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Flex,
  Row,
  Select,
  Spin,
  Tabs,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddJobModal from './AddJobModal';

const { RangePicker } = DatePicker;

const ManufacturingPlanner = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>([
    moment().startOf('day'),
    moment().endOf('day'),
  ]);
  console.log(selectedSlot);
  // Generate the days of the current week (Monday to Saturday)
  const getDaysOfWeek = () => {
    const startOfWeek = moment().startOf('week').add(1, 'day');
    const days = [];
    for (let i = 0; i < 6; i++) {
      days.push({
        day: startOfWeek.clone().add(i, 'days').format('dddd'),
        date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
      });
    }
    return days;
  };

  const handleSlotClick = (r: any, hour: any) => {
    setSelectedSlot({ r, hour });
    setModalVisible(true);
  };

  // Render cards inside the job slot, allow up to 4 tasks per slot
  const renderJobSlot = (record: any, hour: any) => {
    const slotJobs = record[hour] || [];
    return (
      <Droppable droppableId={`${record.day}-${hour}`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: slotJobs.length === 0 ? '#F8F4FE' : '#FFFFFF',
            }}
          >
            {slotJobs.length === 0 ? (
              <Card onClick={() => handleSlotClick(record, hour)}>FREE</Card>
            ) : (
              slotJobs.map((job: any, index: any) => (
                <Draggable key={job.id} draggableId={job.id} index={index}>
                  {(provided) => (
                    <Card
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{ marginBottom: '10px' }}
                    >
                      {job.name} ({job.status})
                    </Card>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  // Define the columns for the table (days + job lines + shifts)
  const daysOfWeek = getDaysOfWeek();

  const { data: jobTypes } = useRequest(() =>
    request('/job-types').then((res) => ({ data: res?.data?.data })),
  );

  const [jobType, setJobType] = useState<any>();
  const [jobAreaPid, setJobAreaPid] = React.useState<any>();

  const { data: jobAreas, loading: jobAreasLoading } = useRequest(
    async () => {
      if (!jobType) return;
      const resp: any = await request(`/job-types/${jobType}`).then((res) => ({
        data: res?.data?.job_areas,
      }));
      console.log(resp?.data?.[0]?.id);
      setJobAreaPid(resp?.data?.[0]?.id);
      return resp;
    },
    { refreshDeps: [jobType] },
  );

  const { data: shifts } = useRequest(() =>
    request('/shifts').then((res) => ({ data: res?.data?.data })),
  );

  const { data: jobLines, loading: jobLinesLoading } = useRequest(
    async () => {
      if (!jobAreaPid) return;
      return await request(`/job-lines?job_area_id=${jobAreaPid}`).then(
        (res) => ({
          data: res?.data?.data,
        }),
      );
    },
    { refreshDeps: [jobAreaPid] },
  );

  const jobLineColumns = jobLines?.map((line: any, index: any) => ({
    title: line?.name,
    key: line?.id,
    width: 200,
    render: (text: any, record: any) => (
      <DragDropContext
        onDragEnd={() => {
          /* Handle drag and drop functionality */
        }}
      >
        {renderJobSlot(record, `h${index + 1}`)} {/* Day Shift */}
        <Divider style={{ margin: '10px 0' }} />{' '}
        {/* Divider for day and night shifts */}
        {renderJobSlot(record, `h${index + 1}-night`)} {/* Night Shift */}
      </DragDropContext>
    ),
  }));

  return (
    <ProCard>
      <PageHeader
        title="Manufacturing Planner"
        subTitle="Manage your production schedules effectively"
      />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Select
            options={jobTypes?.map((job: any) => ({
              label: job?.name,
              value: job?.id,
            }))}
            placeholder="Select Job Type"
            style={{ width: '100%' }}
            onChange={(value) => {
              setJobType(value);
            }}
          />
        </Col>
        <Col span={8}>
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={24}>
          {jobAreasLoading ? (
            <Flex
              align="center"
              justify="center"
              style={{ width: '100%', height: '240px' }}
            >
              <Spin />
            </Flex>
          ) : jobAreas?.length <= 0 ? (
            <Flex
              align="center"
              justify="center"
              style={{ width: '100%', height: '240px' }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No job areas found"
              />
            </Flex>
          ) : (
            <Tabs
              defaultActiveKey="1"
              items={jobAreas?.map((jobArea: any) => ({
                key: jobArea?.id,
                label: jobArea?.name,
                children: (
                  <ProTable
                    toolBarRender={false}
                    search={false}
                    dataSource={daysOfWeek}
                    scroll={{ x: 1400 }}
                    loading={jobLinesLoading}
                    columns={[
                      {
                        title: 'Day',
                        // dataIndex: 'day',
                        key: 'day',
                        renderText: (text) => `${text.day} (${text.date})`,
                        align: 'left',
                        fixed: true,
                        width: 100,
                      },
                      {
                        title: 'Shift',
                        dataIndex: 'shift',
                        fixed: true,
                        width: 100,
                        key: 'shift',
                        render: () => (
                          <div>
                            {shifts?.map((shift: any, index: any) => (
                              <div key={index} style={{}}>
                                {shift?.name}
                              </div>
                            ))}
                          </div>
                        ),
                      },
                      ...(jobLines ? jobLineColumns : []),
                    ]}
                  />
                ),
              }))}
              onChange={(value) => {
                console.log(value);
                setJobAreaPid(value);
              }}
            />
          )}
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        style={{ marginTop: 16 }}
      >
        Export
      </Button>
      <AddJobModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </ProCard>
  );
};

export default ManufacturingPlanner;
