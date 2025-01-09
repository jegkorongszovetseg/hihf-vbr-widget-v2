import { unref } from 'vue';
import { isEmpty } from 'ramda';
import { VBR_API_BASE_URL } from '../constants';

export const fetchVBRData = async (route, apiKey, data) => {
  const url = `${VBR_API_BASE_URL}${unref(route)}${isEmpty(data) ? '' : `?${objectToQueryString(data)}`}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': resolveApiKey(apiKey),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) return reject(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
};

const resolveApiKey = (apiKey) => {
  if (apiKey) return apiKey;
  if (window.__MJSZ_VBR_WIDGET__?.apiKey) return window.__MJSZ_VBR_WIDGET__.apiKey;
  return '';
};
