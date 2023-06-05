<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter();
const routes = computed(() =>
  router.getRoutes().filter((route) => route.path !== '/' && !route.path.includes(':') && !route.children.length)
);
</script>

<template>
  <ul class="p-5">
    <li v-for="route in routes">
      <RouterLink :to="{ name: route.name }" v-slot="{ href }">{{ href }}</RouterLink>
    </li>
  </ul>
</template>
