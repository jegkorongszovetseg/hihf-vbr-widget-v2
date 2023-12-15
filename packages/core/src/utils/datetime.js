import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import _isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import _isBetween from 'dayjs/plugin/isBetween';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/hu';
import { LOCALE_FOR_LANG } from '@mjsz-vbr-elements/core/constants';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(_isSameOrBefore);
dayjs.extend(_isBetween);

export const getLocalTimezone = () => dayjs.tz.guess();

export const format = (datetime = '', format = '', timezone = '', locale = 'hu') => {
  timezone = timezone ? timezone : dayjs.tz.guess();
  return dayjs(datetime).isValid() ? dayjs(datetime).tz(timezone).locale(locale).format(format) : '';
};

export const offsetName = (datetime = '', timezone = '', lang = 'hu') => {
  if (!dayjs(datetime).isValid()) return '';
  timezone = timezone ? timezone : dayjs.tz.guess();
  const dtf = new Intl.DateTimeFormat(getLocaleForLang(lang), {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const result = dtf.formatToParts(new Date(datetime)).find((o) => o.type === 'timeZoneName');
  return result && result.value;
};

const getLocaleForLang = (lang) => {
  return LOCALE_FOR_LANG.get(lang);
};

export const convertMinToSec = (minutes) => {
  const splitted = minutes.split(':');
  return parseInt(splitted[0], 10) * 60 + parseInt(splitted[1], 10);
};

export const convertSecToMin = (duration) => {
  const mins = ~~(duration / 60);
  const secs = ~~duration % 60;
  return [mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':');
};

export const convertMinToMinSec = (duration) => {
  const minutes = Math.trunc(duration);
  const seconds = Math.round(((duration - minutes) / 10) * 60 * 10);
  return [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(':');
};

export const isSameOrBefore = (date, unit = 'day') => {
  return dayjs().isSameOrBefore(dayjs(date), unit);
};

export const isBetween = (date, startDate, endDate) => {
  return dayjs(date).isBetween(startDate, dayjs(endDate));
};

export const isSame = (date, compareDate, unit = 'month') => {
  return dayjs(date).isSame(compareDate, unit);
};

export const yearToNow = (date, locale = 'hu') => {
  return dayjs(date).locale(locale).toNow(true);
};
