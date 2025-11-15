<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables';
import BaseSelect from './BaseSelect.vue';
import FormField from './FormField.vue';

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

  isSectionSelectionDisabled: {
    type: Boolean,
    default: false,
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
  <div class="flex-container mb-md">
    <FormField :label="t('selection.season')" name="season">
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </FormField>
    <slot />
  </div>
  <nav v-if="!isSectionSelectionDisabled" class="tabs underlined mb-md">
    <div role="tablist" :aria-label="t('selection.sections')">
      <button
        v-for="section in sections"
        :key="section.phaseId"
        role="tab"
        type="button"
        :aria-selected="section.phaseName === sectionId"
        @click="changeSection(section)"
      >
        {{ section.phaseName }}
      </button>
    </div>
  </nav>
</template>
