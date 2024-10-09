import moment from 'moment';

export const handleWeekChange = (date: any, setCurrentWeek: any) => {
  setCurrentWeek(date.startOf('isoWeek'));
};

export const handlePreviousWeek = (setCurrentWeek: any) => {
  setCurrentWeek((prevWeek: any) => moment(prevWeek).subtract(1, 'week'));
};

export const handleNextWeek = (setCurrentWeek: any) => {
  setCurrentWeek((prevWeek: any) => moment(prevWeek).add(1, 'week'));
};
