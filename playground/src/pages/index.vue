<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter();
const routes = computed(() =>
  router.getRoutes().filter((route) => route.path !== '/' && !route.path.includes(':') && !route.children.length)
);
const elements = computed(() => routes.value.filter((route) => route.name.includes('/Elements')));
const liga = computed(() => routes.value.filter((route) => route.name.includes('/Liga')));
const gamecenter = computed(() => routes.value.filter((route) => route.name.includes('/GameCenter')));
const extended = computed(() => routes.value.filter((route) => route.name.includes('/Extended')));
</script>

<template>
  <div class="flex">
    <ul class="flex-1 p-5">
      <li v-for="route in elements">
        <RouterLink :to="{ name: route.name }" v-slot="{ href }">{{ href }}</RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in extended">
        <RouterLink :to="{ name: route.name }" v-slot="{ href }">{{ href }}</RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in liga">
        <RouterLink :to="{ name: route.name }" v-slot="{ href }">{{ href }}</RouterLink>
      </li>
    </ul>
    <ul class="flex-1 p-5">
      <li v-for="route in gamecenter">
        <RouterLink :to="{ name: route.name }" v-slot="{ href }">{{ href }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
