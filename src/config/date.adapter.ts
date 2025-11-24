import dayjs from 'dayjs';

export const dateAdapter = {
  isValid: (date: any): boolean => {
    return dayjs(date).isValid();
  },
  toDate: (date: any): Date => {
    return dayjs(date).toDate();
  },
};
