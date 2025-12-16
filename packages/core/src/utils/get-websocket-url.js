import { VBR_API_WEBSOCKET_BASE_URL } from '../constants';

export function getWebsocketURL(path) {
  return `${(VBR_API_WEBSOCKET_BASE_URL || '')}${path}`;
}
