import { VBR_API_BASE_URL } from '../constants';

export function getWebsocketURL(path) {
  return `${(VBR_API_BASE_URL || '').replace('https', 'ws').replace('/vbr', '')}${path}`;
}
