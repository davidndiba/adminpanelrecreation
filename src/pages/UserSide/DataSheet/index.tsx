import { request, useRequest } from '@umijs/max';
import { Card, Space, Table } from 'antd';
import moment from 'moment';
import React from 'react';

const DataSheet = () => {
  const { data } = useRequest(() =>
    request('/schedules').then((res) => ({ data: res?.original?.data })),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobAreaPid, setJobAreaPid] = React.useState<any>(
    '9d198046-7cf7-463a-9759-ade3f9b311aa',
  );

  console.log(data?.slice(0, 5));
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
  const transformData = (schedules: any) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const shifts = ['Day Shift', 'Night Shift'];

    const transformedData: any[] = [];

    daysOfWeek.forEach((day) => {
      shifts.forEach((shift) => {
        const schedulesForDayShift = schedules.filter(
          (s: any) =>
            moment(s.schedule_date).format('dddd') === day &&
            s.shift_name === shift,
        );

        transformedData.push({
          key: `${day}-${shift}`,
          day,
          shift,
          jobs: schedulesForDayShift?.map((schedule: any) => ({
            id: schedule?.schedule_job_id,
            job_count: schedule?.booked_qty,
            job_description: schedule?.job_description,
            job_line_id: schedule?.job_line_id,
          })),
        });
      });
    });

    return transformedData;
  };

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      onCell: (_: any, index: any) => {
        const rowSpan = index % 2 === 0 ? 2 : 0;
        return { rowSpan };
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
          render: (jobs: any) => {
            console.log(jobs);
            return (
              <Space direction="vertical" size="middle">
                {jobs
                  ?.filter((j: any) => j.job_line_id === job.id)
                  ?.map((job: any) => (
                    <Card
                      key={job.id}
                      size="small"
                      style={{ background: 'red', width: '100%' }}
                    >
                      {job?.job_description} (Count: {job?.job_count})
                    </Card>
                  ))}
              </Space>
            );
          },
        }))
      : []),
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={transformData(data || [])}
        bordered
        rowKey="key"
        pagination={{
          onChange: (page) => {
            const date = moment()
              .startOf('week')
              .add((page - 1) * 10, 'days');
            console.log(date.format('YYYY-MM-DD'));
          },
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default DataSheet;
