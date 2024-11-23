import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getTimeDiff = (date: Date) => {
  return dayjs(date).fromNow();
};
