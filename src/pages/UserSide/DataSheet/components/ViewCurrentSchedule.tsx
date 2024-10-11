import { ModalForm } from '@ant-design/pro-components';
import { Card } from 'antd';

export const ViewCurrentScheduleModal = ({
  jobs,
  setClickedSchedule,
  clickedSchedule,
  job,
}: {
  jobs: any;
  job: any;
  setClickedSchedule: any;
  clickedSchedule: any;
}) => {
  return (
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
      {clickedSchedule?.schedule_status_id}
    </ModalForm>
  );
};
