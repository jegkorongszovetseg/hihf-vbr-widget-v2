<script setup>
import { BaseSelect, FormField } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';

const props = defineProps({
  seasons: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  sections: {
    type: Array,
    default: () => [],
  },

  sectionId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['onChangeSeason', 'onChangeSection']);

const { t } = useI18n();

const championshipId = computed({
  get() {
    return props.championshipId;
  },
  set(value) {
    emit('onChangeSeason', value);
  },
});

function changeSection(id) {
  emit('onChangeSection', id);
}
</script>

<template>
  <div class="g-row">
    <FormField :label="t('selection.season')" name="season" class="mb-md">
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </FormField>
  </div>
  <nav class="tabs underlined mb-md">
    <div role="tablist" :aria-label="t('selection.sections')">
      <button
        v-for="section in sections"
        :key="section.phaseId"
        role="tab"
        :aria-selected="section.sectionId === sectionId"
        @click="changeSection(section)"
      >
        {{ section.sectionName }}
      </button>
    </div>
  </nav>
</template>
