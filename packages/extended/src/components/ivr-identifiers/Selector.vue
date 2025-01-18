<script setup>
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { useVModels } from '@vueuse/core';

const props = defineProps({
  seasonsList: {
    type: Array,
    default: () => [],
  },

  seasonId: {
    type: Number,
    default: null,
  },

  championshipList: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:seasonId', 'update:championshipId']);

const { t } = useI18n();

const { seasonId, championshipId } = useVModels(props, emit);
</script>

<template>
  <div class="is-mb-5">
    <label for="season" class="label">{{ t('selection.seasons') }}</label>
    <BaseSelect id="season" v-model="seasonId">
      <option v-for="season in seasonsList" :key="season.id" :value="season.id">
        {{ season.seasonName }}
      </option>
    </BaseSelect>
  </div>
  <div>
    <label for="season" class="label">{{ t('selection.championships') }}</label>
    <BaseSelect id="season" v-model="championshipId">
      <option
        v-for="championship in championshipList"
        :key="championship.championshipId"
        :value="championship.championshipId"
      >
        {{ championship.championshipName }}
      </option>
    </BaseSelect>
  </div>
</template>
