<script setup>
import { BaseSelect, FormField } from '@mjsz-vbr-elements/core/components';
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
  <FormField :label="t('selection.seasons')" name="season" class="full-width mb-md">
    <BaseSelect id="season" v-model="seasonId">
      <option v-for="season in seasonsList" :key="season.id" :value="season.id">
        {{ season.seasonName }}
      </option>
    </BaseSelect>
  </FormField>
  <FormField :label="t('selection.championships')" name="championship" class="full-width">
    <BaseSelect id="championship" v-model="championshipId">
      <option
        v-for="championship in championshipList"
        :key="championship.championshipId"
        :value="championship.championshipId"
      >
        {{ championship.championshipName }}
      </option>
    </BaseSelect>
  </FormField>
</template>
