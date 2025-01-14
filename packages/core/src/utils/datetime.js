import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import _isBetween from 'dayjs/plugin/isBetween';
import _isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import _isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import _minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import _weekday from 'dayjs/plugin/weekday';
import { LOCALE_FOR_LANG } from '../constants.js';
import 'dayjs/locale/hu';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(_isSameOrBefore);
dayjs.extend(_isBetween);
dayjs.extend(_isToday);
dayjs.extend(_weekday);
dayjs.extend(_minMax);

export const getLocalTimezone = () => dayjs.tz.guess();

export function format(datetime = '', format = '', timezone = '', locale = 'hu') {
  timezone = timezone || dayjs.tz.guess();
  return dayjs(datetime).isValid() ? dayjs(datetime).tz(timezone).locale(locale).format(format) : '';
}

export function offsetName(datetime = '', timezone = '', lang = 'hu') {
  if (!dayjs(datetime).isValid())
    return '';
  timezone = timezone || dayjs.tz.guess();
  const dtf = new Intl.DateTimeFormat(getLocaleForLang(lang), {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const result = dtf.formatToParts(new Date(datetime)).find(o => o.type === 'timeZoneName');
  return result && result.value;
}

function getLocaleForLang(lang) {
  return LOCALE_FOR_LANG.get(lang);
}

export function convertMinToSec(minutes) {
  const splitted = minutes.split(':');
  return Number.parseInt(splitted[0], 10) * 60 + Number.parseInt(splitted[1], 10);
}

export function convertSecToMin(duration) {
  const mins = ~~(duration / 60);
  const secs = ~~duration % 60;
  return [mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':');
}

export function convertMinToMinSec(duration) {
  const minutes = Math.trunc(duration);
  const seconds = Math.round(((duration - minutes) / 10) * 60 * 10);
  return [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(':');
}

export function isSameOrBefore(date, unit = 'day') {
  return dayjs().isSameOrBefore(dayjs(date), unit);
}

export function isBetween(date, startDate, endDate, inclusivity = '[]') {
  return dayjs(date).isBetween(startDate, dayjs(endDate), 'day', inclusivity);
}

export function isSame(date, compareDate, unit = 'month') {
  return dayjs(date).isSame(compareDate, unit);
}

export function yearToNow(date, locale = 'hu') {
  return dayjs(date).locale(locale).toNow(true);
}

export function isBefore(date, compareDate, unit = 'day') {
  return dayjs(date).isBefore(compareDate, unit);
}

export function isAfter(date, compareDate, unit = 'day') {
  return dayjs(date).isAfter(compareDate, unit);
}

export function isToday(date) {
  return dayjs(date).isToday();
}

export function currentWeek(date) {
  const startDate = dayjs().weekday(1);
  const endDate = dayjs().weekday(7);
  return isBetween(date, startDate, endDate);
}

export function currentWeekStartEnd(date) {
  const startDate = dayjs(date).weekday(1);
  const endDate = dayjs(date).weekday(7);
  return { startDate, endDate };
}

export function subtractDays(date, day) {
  return dayjs(date).subtract(day, 'day');
}

export function addDays(date, day) {
  return dayjs(date).add(day, 'day');
}

export function startOfMonth(date) {
  return dayjs(date).startOf('month');
}

export function endOfMonth(date) {
  return dayjs(date).endOf('month');
}

export function min(dates) {
  if (Array.isArray(dates)) {
    dates = dates.map(date => dayjs(date));
  }
  return dayjs.min(dates);
}

export function max(dates) {
  if (Array.isArray(dates)) {
    dates = dates.map(date => dayjs(date));
  }
  return dayjs.max(...dates);
}
