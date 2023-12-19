import { reactive } from 'vue';

export function useState() {
  const state = reactive({
    apiKey: '',
  });

  function set(apiKey) {
    state.apiKey = apiKey;
  }

  return { ...state, set };
}
