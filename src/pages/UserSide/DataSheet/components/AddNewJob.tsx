import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';

const AddNewJob = ({
  jobs,
  job,
  shiftsFromApi,
  record,
}: {
  jobs: any;
  job: any;
  shiftsFromApi: any;
  record: any;
}) => {
  return (
    <>
      {jobs?.filter((j: any) => j?.job_line_id === job?.id)?.length <= 3 && (
        <ModalForm
          title="Add Job"
          submitter={{
            searchConfig: {
              submitText: 'Add Job',
              resetText: 'Cancel',
            },
          }}
          trigger={
            <Button style={{ width: '100%', borderRadius: 0 }}>FREE</Button>
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
    </>
  );
};

export default AddNewJob;
