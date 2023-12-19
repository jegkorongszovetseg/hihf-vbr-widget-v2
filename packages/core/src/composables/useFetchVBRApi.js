import { unref } from 'vue';
import { VBR_API_BASE_URL } from '../constants';
import { useState } from './useState';

export const fetchVBRData = async (route, apiKey, data) => {
  const { apiKey: apiKey2 } = useState();
  console.log('apiKey2', apiKey2);
  const url = `${VBR_API_BASE_URL}${unref(route)}?${objectToQueryString(data)}`;
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
  if (import.meta.env.NODE_ENV !== 'production') return import.meta.env.VITE_VBR_API_KEY;
  return '';
};
