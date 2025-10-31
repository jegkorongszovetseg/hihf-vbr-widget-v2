<script setup>
import { useColorMode, useCycleList } from '@vueuse/core';
import { watchEffect } from 'vue';
import { store } from '../store.js';

const mode = useColorMode({ emitAuto: true });

const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: mode });

watchEffect(() => mode.value = state.value);
</script>

<template>
  <header class="flex items-center p-3 bg-slate-900 dark:bg-slate-100 mb-5">
    <RouterLink to="/" class="text-slate-300 dark:text-slate-700 mr-10">
      Back
    </RouterLink>
    <ul class="flex gap-3">
      <li v-for="locale in store.locales" :key="locale">
        <button
          type="button"
          class="text-slate-300 dark:text-slate-700" :class="[{ 'text-white font-bold': store.locale === locale }]"
          @click.prevent="store.setLocale(locale)"
        >
          {{ locale }}
        </button>
      </li>
    </ul>
    <button type="button" class="ml-10 text-slate-300 dark:text-slate-700 capitalize" @click="next()">
      Color Mode: {{ mode }}
    </button>
  </header>
</template>
