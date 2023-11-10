<script setup>
import { isEmpty } from 'ramda';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { flagResolver } from '@mjsz-vbr-elements/core/utils';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const { t } = useI18n();
</script>
<template>
  <div v-if="!isEmpty(data)">
    <h2 v-once>{{ data.name }} #{{ data.jerseyNr }}</h2>
    <div style="display: flex;">
      {{ data.birthDate }} ({{ t('players.age', { years: data.age }) }}) /
      <span v-for="flag in data.nationality">
        <Image :src="flagResolver(flag)" />
      </span>
      {{ data.birthPlace }} / {{ data.position }} /
      <Image class="is-logo-image" :src="data.team?.logo" :key="data.team?.id" /> {{ data.team?.longName }}
    </div>
  </div>
</template>
