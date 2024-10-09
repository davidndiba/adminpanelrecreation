import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import { Button, Card, DatePicker, Space, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';

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

  const transformData = (schedules: any) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const shifts: any[] = shiftsFromApi?.map((shift: any) => shift?.name);

    const transformedData: any[] = [];

    daysOfWeek.forEach((day, dayIndex) => {
      shifts?.forEach((shift) => {
        const date = moment(currentWeek).add(dayIndex, 'days');
        const schedulesForDayShift = schedules?.filter(
          (s: any) =>
            moment(s?.schedule_date).isSame(date, 'day') &&
            s.shift_name === shift,
        );

        transformedData.push({
          key: `${day}-${shift}`,
          day: date.format('ll'),
          shift,
          jobs: schedulesForDayShift?.map((schedule: any) => ({
            id: schedule?.schedule_job_id,
            job_count: schedule?.booked_qty,
            job_description: schedule?.job_description,
            job_line_id: schedule?.job_line_id,
            // add other required fields you need here i.e background colors
            bgColor: schedule?.status_background_color,
            textColor: schedule?.status_text_color,
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
                <ModalForm
                  title={
                    <>
                      You are viewing{' '}
                      <span style={{ color: clickedSchedule?.textColor }}>
                        {clickedSchedule?.job_description}
                      </span>
                    </>
                  }
                  submitter={false}
                  trigger={
                    <div style={{ cursor: 'pointer' }}>
                      {jobs
                        ?.filter((j: any) => j?.job_line_id === job?.id)
                        ?.map((job: any) => (
                          <Card
                            key={job?.id}
                            size="small"
                            style={{
                              background: job?.bgColor || 'transparent',
                              width: '100%',
                              color: job?.textColor,
                              borderRadius: 0,
                              marginBottom: 1,
                            }}
                            onClick={() => setClickedSchedule(job)}
                          >
                            {job?.job_description} (Count: {job?.job_count})
                          </Card>
                        ))}
                    </div>
                  }
                >
                  {/* More details about the clicked schedule */}
                  Content HERE
                </ModalForm>
                {jobs?.filter((j: any) => j?.job_line_id === job?.id)?.length <=
                  3 && (
                  <ModalForm
                    title="Add Job"
                    submitter={{
                      searchConfig: {
                        submitText: 'Add Job',
                        resetText: 'Cancel',
                      },
                    }}
                    trigger={
                      <Button style={{ width: '100%', borderRadius: 0 }}>
                        FREE
                      </Button>
                    }
                    onFinish={async (values: any) => {
                      console.log(values);

                      const getShiftId = shiftsFromApi?.find(
                        (shift: any) => shift?.name === record?.shift,
                      );

                      // // you have the day here with the standard format
                      console.log(moment(record?.day).format('YYYY-MM-DD'));

                      // // you have the shift id here
                      console.log(getShiftId?.id);

                      // Do your POST here for Adding a new job
                      try {
                        // await request('/schedules', {
                        //   method: 'POST',
                        //   data: {
                        //     ...values,
                        //     shift_id: getShiftId?.id,
                        //     schedule_date: record?.day,
                        //   },
                        // })

                        // you have success MESSAGE here and REFRESH the schedules on the table i.e

                        // this keeps modal open when success
                        return true;
                      } catch (error) {
                        // CATCH ERROR
                        // console.error('Error adding job:', error);

                        // this keeps modal open when there is an error
                        return false;
                      }
                    }}
                  >
                    {/* Replace here with content for the form i.e Job Number, booked qty, ...rest */}
                    <ProFormText name="name" label="Job Number" />
                  </ModalForm>
                )}
              </Space>
            );
          },
        }))
      : []),
  ];

  const handleWeekChange = (date: any) => {
    setCurrentWeek(date.startOf('isoWeek'));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).add(1, 'week'));
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <DatePicker
          disabled
          picker="week"
          value={currentWeek}
          onChange={handleWeekChange}
          format="YYYY-wo"
        />
        <Button onClick={handleNextWeek}>Next Week</Button>
      </Space>
      <Table
        loading={loading}
        columns={columns}
        dataSource={transformData(data || [])}
        bordered
        rowKey="key"
        scroll={{ x: 1400 }}
        pagination={{
          onChange: (page) => {
            const date = moment()
              .startOf('isoWeek')
              .add((page - 1) * 10, 'days');
            console.log(date.format('YYYY-MM-DD'));
          },
          pageSize: 10,
        }}
        rowClassName={(record) =>
          record.shift === 'Night Shift' ? 'night-shift-row' : ''
        }
      />
    </div>
  );
};

export default DataSheet;
