import { VBR_API_BASE_URL } from '../constants';

export function getWebsocketURL(path) {
  const wsProtocol = import.meta.env.MODE === 'localhost' ? 'ws' : 'wss';
  return `${(VBR_API_BASE_URL || '').replace(/^https?/, wsProtocol).replace('/vbr', '/socket/vbr')}${path}`;
}
