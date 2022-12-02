import { reactive } from 'vue';

export function useRouter(options = {}) {
  const state = reactive({});

  function read() {
    return new URLSearchParams(getRawParams());
  }

  function getRawParams() {
    const hash = window.location.hash || '';
    const index = hash.indexOf('?');
    console.log({ index, hash, slice: hash.slice(index) });
    return index > 0 ? hash.slice(index) : '';
  }

  const initial = read();
  console.log(initial.keys().next().value);

  return state;
}
