import { computed, inject, onErrorCaptured, provide, ref } from 'vue';
import { toKebabCase } from '../utils/string';

const ErrorProviderContext = Symbol('ErrorProviderContext');

export function useErrorProvider() {
  const errorMessage = ref('');
  const errorObject = ref({});

  const onError = (error) => {
    console.error({ error });
    errorMessage.value = error.message || error.error.message;
    errorObject.value = {
      message: error.message,
      key: error.key || toKebabCase(error.message),
      cause: error.cause,
    };
  };

  const reset = () => {
    errorMessage.value = '';
    errorObject.value = {};
  };

  const api = {
    onError,
    reset,
  };

  provide(ErrorProviderContext, api);

  window.onerror = (e) => {
    console.error('WINDOW_ONERROR:', e);
  };

  onErrorCaptured((error, vm, info) => {
    console.error('onErrorCaptured:', error, vm, info);
  });

  return {
    hasError: computed(() => errorMessage.value.length > 0),
    message: errorMessage,
    error: errorObject,
    onError,
  };
}

export function useError() {
  const api = useErrorProviderContext();
  return {
    onError: api.onError,
    reset: api.reset,
  };
}

function useErrorProviderContext() {
  const api = inject(ErrorProviderContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
}
