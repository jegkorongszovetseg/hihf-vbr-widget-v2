export function getWebsocketURL(path) {
  return `${(import.meta.env.VITE_VBR_API_URL || '').replace('https', 'ws').replace('/vbr', '')}${path}`;
}
