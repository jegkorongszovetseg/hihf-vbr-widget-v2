import { inject, provide, ref, computed } from 'vue';

const ErrorProviderContext = Symbol('ErrorProviderContext');

export const useErrorProvider = () => {
  const errorMessage = ref('');
  const errorObject = ref({});

  const onError = (error) => {
    console.log({ error });
    errorMessage.value = error.message;
    errorObject.value = {
      message: error.message,
      key: error.key,
      cause: error.cause,
    };
  };

  const reset = () => {
    errorMessage.value = '';
    errorObject.value = {};
  };

  const api = {
    message: errorMessage,
    onError,
    reset,
  };

  provide(ErrorProviderContext, api);

  window.onerror = (e) => {
    console.log('window-error:', e);
  };

  return {
    hasError: computed(() => Boolean(errorMessage.value)),
    message: errorMessage,
    errorObj: errorObject,
  };
};

export const useError = () => {
  const api = useErrorProviderContext();
  return {
    message: api.message,
    onError: api.onError,
  };
};

const useErrorProviderContext = () => {
  const api = inject(ErrorProviderContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
};
