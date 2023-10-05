<script setup>
import { useVModels } from '@vueuse/core';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { BaseSelect } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  seasons: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:championshipId']);

const { t } = useI18n();

const { championshipId } = useVModels(props, emit);

const baseLabelClass = useMainClass('label');
</script>
<template>
  <div class="g-row">
    <div>
      <label for="season" :class="baseLabelClass">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
  </div>
</template>
