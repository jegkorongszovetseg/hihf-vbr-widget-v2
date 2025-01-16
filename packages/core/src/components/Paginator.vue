<script setup>
import IconLeft from '@mjsz-vbr-elements/shared/icons/IconLeft';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';
import { computed } from 'vue';
import { useMainClass } from '../composables/useMainClass';
import usePagination from '../composables/usePagination';

const props = defineProps({
  page: {
    type: Number,
    required: false,
    default: 0,
    validator: (value) => {
      return value >= 0;
    },
  },

  itemsPerPage: {
    type: Number,
    required: false,
    default: 10,
    validator: (value) => {
      return value > 0;
    },
  },

  totalItems: {
    type: Number,
    required: true,
    validator: (value) => {
      return value >= 0;
    },
  },

  rangeLength: {
    type: Number,
    default: 3,
    validator: (value) => {
      return value >= 2;
    },
  },

  isCompact: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change']);

const mainClassName = useMainClass('paginator');

const { page, pageCount, range, goTo, pageStep } = usePagination({
  currentPage: computed(() => props.page),
  totalItems: computed(() => props.totalItems),
  itemsPerPage: props.itemsPerPage,
  rangeLength: props.rangeLength,
  update: page => emit('change', page),
});
</script>

<template>
  <div v-if="pageCount > 1" :class="mainClassName">
    <button type="button" :disabled="page === 1" @click="pageStep(-1)">
      <slot name="prev">
        <IconLeft class="icon paginator-left" />
      </slot>
    </button>
    <button v-if="!isCompact" type="button" :disabled="page === 1" @click="goTo(1)">
      1
    </button>
    <div v-if="!isCompact" class="is-disabled">
      ...
    </div>
    <button
      v-for="n in range"
      :key="n"
      type="button"
      :class="{ 'is-active': n === page }"
      :disabled="n === page"
      @click="goTo(n)"
    >
      {{ n }}
    </button>
    <div v-if="!isCompact" class="is-disabled">
      <span>...</span>
    </div>
    <button v-if="!isCompact" type="button" :disabled="page === pageCount" @click="goTo(pageCount)">
      {{ pageCount }}
    </button>
    <button type="button" :disabled="page === pageCount" @click.prevent="pageStep(1)">
      <slot name="next">
        <IconRight class="icon paginator-left" />
      </slot>
    </button>
  </div>
</template>
