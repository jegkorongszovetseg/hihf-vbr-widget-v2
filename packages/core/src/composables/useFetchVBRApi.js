import { isEmpty } from 'ramda';
import { unref } from 'vue';
import { VBR_API_BASE_URL } from '../constants';

export async function fetchVBRData(route, apiKey, data) {
  const url = `${VBR_API_BASE_URL}/vbr${unref(route)}${isEmpty(data) ? '' : `?${new URLSearchParams(data)}`}`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': resolveApiKey(apiKey),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.error)
    throw json;
  if (json.data.message)
    throw json.data;
  return json.data;
}

function resolveApiKey(apiKey) {
  if (apiKey)
    return apiKey;
  if (window.__MJSZ_VBR_WIDGET__?.apiKey)
    return window.__MJSZ_VBR_WIDGET__.apiKey;
  return '';
}
