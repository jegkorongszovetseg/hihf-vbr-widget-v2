<script setup>
import { store } from '../store.js';
</script>

<template>
  <header class="flex items-center p-3 bg-slate-900 mb-5">
    <RouterLink to="/" class="text-slate-300 mr-10">Back</RouterLink>
    <ul class="flex gap-3">
      <li v-for="locale in store.locales">
        <a
          href="#"
          :class="['text-slate-300', { 'text-white font-bold': store.locale === locale }]"
          @click.prevent="store.setLocale(locale)"
        >
          {{ locale }}
        </a>
      </li>
    </ul>
  </header>
</template>
