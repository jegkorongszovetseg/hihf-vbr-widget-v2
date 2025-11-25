<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter();
const routes = computed(() =>
  router.getRoutes().filter(route => route.path !== '/' && !route.path.includes(':') && !route.children.length),
);
const elements = computed(() => routes.value.filter(route => route.name.includes('/Elements')));
const liga = computed(() => routes.value.filter(route => route.name.includes('/Liga')));
const gamecenter = computed(() => routes.value.filter(route => route.name.includes('/GameCenter')));
const extended = computed(() => routes.value.filter(route => route.name.includes('/Extended')));
const internal = computed(() => routes.value.filter(route => route.name.includes('/Internal')));
</script>

<template>
  <div class="flex">
    <ul class="flex-1 p-5">
      <li v-for="route in elements" :key="route.name">
        <RouterLink v-slot="{ href }" :to="{ name: route.name }" class="text-slate-600 dark:text-slate-300">
          {{ href }}
        </RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in extended" :key="route.name">
        <RouterLink v-slot="{ href }" :to="{ name: route.name }" class="text-slate-600 dark:text-slate-300">
          {{ href }}
        </RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in liga" :key="route.name">
        <RouterLink v-slot="{ href }" :to="{ name: route.name }" class="text-slate-600 dark:text-slate-300">
          {{ href }}
        </RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in gamecenter" :key="route.name">
        <RouterLink v-slot="{ href }" :to="{ name: route.name }" class="text-slate-600 dark:text-slate-300">
          {{ href }}
        </RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in internal" :key="route.name">
        <RouterLink v-slot="{ href }" :to="{ name: route.name }" class="text-slate-600 dark:text-slate-300">
          {{ href }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
