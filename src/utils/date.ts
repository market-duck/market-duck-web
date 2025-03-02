import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getTimeDiff = (date: Date) => dayjs(date).fromNow();

export const getFormattedDate = (date: Date, format: string) => dayjs(date).format(format);
