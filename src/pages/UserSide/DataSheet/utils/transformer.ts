import moment from 'moment';

export const transformData = (
  schedules: any,
  shiftsFromApi: any,
  currentWeek: any,
) => {
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
          schedule_status_id: schedule?.schedule_status_id,
        })),
      });
    });
  });

  return transformedData;
};
