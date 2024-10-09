import { request, useRequest } from '@umijs/max';
import { Button, DatePicker, Space, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import AddNewJob from './components/AddNewJob';
import { ViewCurrentScheduleModal } from './components/ViewCurrentSchedule';
import {
  handleNextWeek,
  handlePreviousWeek,
  handleWeekChange,
} from './handlers';
import { transformData } from './utils/transformer';

const DataSheet = () => {
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));

  const [clickedSchedule, setClickedSchedule] = useState<any>(null);

  const { data, loading } = useRequest(() =>
    request('/schedules').then((res) => ({ data: res?.original?.data })),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobAreaPid, setJobAreaPid] = useState<any>(
    '9d198046-7cf7-463a-9759-ade3f9b311aa',
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: jobLines, loading: jobLinesLoading } = useRequest(
    async () => {
      if (!jobAreaPid) return;
      return await request(`/job-areas/${jobAreaPid}`).then((res) => ({
        data: res?.data?.job_lines,
      }));
    },
    { refreshDeps: [jobAreaPid] },
  );

  const { data: shiftsFromApi } = useRequest(() =>
    request('/shifts').then((res) => ({ data: res?.data?.data })),
  );

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      render: (text: string, record: any, index: number) => {
        const rowSpan = index % 2 === 0 ? 2 : 0;
        return {
          children: text,
          props: {
            rowSpan,
          },
        };
      },
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
    },
    ...(jobLines?.length
      ? jobLines?.map((job: any) => ({
          title: job?.name,
          dataIndex: 'jobs',
          width: 300,
          render: (jobs: any, record: any) => {
            return (
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <ViewCurrentScheduleModal
                  jobs={jobs}
                  job={job}
                  setClickedSchedule={setClickedSchedule}
                  clickedSchedule={clickedSchedule}
                />
                <AddNewJob
                  job={job}
                  shiftsFromApi={shiftsFromApi}
                  record={record}
                  jobs={jobs}
                  key={job?.id}
                />
              </Space>
            );
          },
        }))
      : []),
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => handlePreviousWeek(setCurrentWeek)}>
          Previous Week
        </Button>
        <DatePicker
          disabled
          picker="week"
          value={currentWeek}
          onChange={() => handleWeekChange(currentWeek, setCurrentWeek)}
          format="YYYY-wo"
        />
        <Button onClick={() => handleNextWeek(setCurrentWeek)}>
          Next Week
        </Button>
      </Space>
      <Table
        loading={loading}
        columns={columns}
        dataSource={transformData(data || [], shiftsFromApi, currentWeek)}
        bordered
        rowKey="key"
        scroll={{ x: 1400 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        rowClassName={(record) =>
          record.shift === 'Night Shift' ? 'night-shift-row' : ''
        }
      />
    </div>
  );
};

export default DataSheet;
