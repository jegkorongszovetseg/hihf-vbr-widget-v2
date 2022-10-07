import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/hu';
import { LOCALE_FOR_LANG } from '../constants.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

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
