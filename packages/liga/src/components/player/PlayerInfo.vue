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
  <div v-if="!isEmpty(data)" style="text-align: center;">
    <h2 class="is-heading-1" v-once>{{ data.name }} #{{ data.jerseyNr }}</h2>
    <div style="display: flex; align-items: center; justify-content: center;">
      {{ data.birthDate }} ({{ t('players.age', { years: data.age }) }}) /
      <span v-for="flag in data.player.nationality">
        <Image :src="flagResolver(flag)" />
      </span>
      {{ data.birthPlace }} / {{ data.position }} /
      <Image class="is-logo-image" :src="data.team?.logo" :key="data.team?.id" /> {{ data.team?.longName }}
    </div>
  </div>
</template>
