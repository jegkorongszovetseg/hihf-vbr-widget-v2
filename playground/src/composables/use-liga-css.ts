import { onMounted, onUnmounted } from 'vue';

export function useLigaCss() {
  onMounted(() => document.body.classList.add('liga'));
  onUnmounted(() => document.body.classList.remove('liga'));
}
