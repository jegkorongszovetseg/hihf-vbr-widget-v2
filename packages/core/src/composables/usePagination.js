import { noop } from '@vueuse/core';
import { computed, unref } from 'vue';

export default function usePagination({ currentPage, itemsPerPage = 20, totalItems, rangeLength = 5, update = noop }) {
  const pageCount = computed(() => Math.ceil(unref(totalItems) / itemsPerPage));

  const range = computed(() => {
    const page = unref(currentPage) - 1;
    const range = Array.from({ length: pageCount.value }, (_, i) => i + 1);
    const minus = Math.floor(rangeLength / 2);

    let startIndex = Math.max(page - minus, 0);
    if (startIndex + rangeLength >= pageCount.value) {
      startIndex = Math.max(pageCount.value - rangeLength, 0);
    }
    return range.slice(startIndex, startIndex + rangeLength);
  });

  const pageStep = (v) => {
    const page = unref(currentPage) + v;
    if (validPage(page))
      update(page);
  };

  const goTo = (page) => {
    if (validPage(page))
      update(page);
  };

  function validPage(page) {
    return page <= pageCount.value && page > 0;
  }

  return {
    page: currentPage,
    range,
    pageCount,
    goTo,
    pageStep,
  };
}
