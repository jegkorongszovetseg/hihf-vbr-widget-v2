import { inject, provide, ref, computed, onErrorCaptured } from 'vue';
import { toKebabCase } from '../utils/string';

const ErrorProviderContext = Symbol('ErrorProviderContext');

export const useErrorProvider = () => {
  const errorMessage = ref('');
  const errorObject = ref({});

  const onError = (error) => {
    console.log({ error });
    errorMessage.value = error.message;
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
    console.log('WINDOW_ONERROR:', e);
  };

  onErrorCaptured((error, vm, info) => {
    console.log('onErrorCaptured:', error, vm, info);
  });

  return {
    hasError: computed(() => errorMessage.value.length > 0),
    message: errorMessage,
    error: errorObject,
    onError,
  };
};

export const useError = () => {
  const api = useErrorProviderContext();
  return {
    onError: api.onError,
    reset: api.reset,
  };
};

const useErrorProviderContext = () => {
  const api = inject(ErrorProviderContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
};
