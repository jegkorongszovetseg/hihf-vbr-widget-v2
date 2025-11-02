<script setup>
import { useColorMode, useCycleList } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import { useIcehockeyClasses } from '../composables/use-icehockey-classes';
import { store } from '../store.js';

const isIcehockeyClassesActive = ref(false);

const mode = useColorMode({ emitAuto: true });

const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: mode });

watchEffect(() => mode.value = state.value);

useIcehockeyClasses(isIcehockeyClassesActive);
</script>

<template>
  <header class="flex items-center gap-5 p-3 bg-slate-900 dark:bg-slate-100 mb-5">
    <RouterLink to="/" class="text-slate-300 dark:text-slate-700">
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
    <button type="button" class="text-slate-300 dark:text-slate-700 capitalize" @click="next()">
      Color Mode: {{ mode }}
    </button>
    <div>
      <input id="icehockey" v-model="isIcehockeyClassesActive" type="checkbox">
      <label for="icehockey" class="text-slate-300 dark:text-slate-700 ml-2">Use Icehockey Classes</label>
    </div>
  </header>
</template>
