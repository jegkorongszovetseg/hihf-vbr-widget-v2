<script setup>
import { isEmpty } from 'ramda';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image, FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { flagResolver } from '@mjsz-vbr-elements/core/utils';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },
});

const { t } = useI18n();
</script>
<template>
  <div v-if="!isEmpty(data)" style="text-align: center">
    <h2 class="is-heading-2" v-once>{{ data.name }} <span class="is-text-italic">#{{ data.jerseyNr }}</span></h2>
    <div style="display: flex; align-items: center; justify-content: center">
      {{ data.birthDate }} ({{ t('players.age', { years: data.age }) }}) /&nbsp;
      <template v-for="flag in data.player.nationality" :kay="flag">
        <FloatingPanel
          placement="top"
          :content="t(`nationality.${flag}`)"
          :append-to="appendTo"
          v-slot:default="{ setRef, show, hide }"
        >
          <span :ref="setRef" class="is-rounded" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
            <Image :src="flagResolver(flag)" />
          </span>
        </FloatingPanel> </template
      >&nbsp; {{ data.birthPlace }} / {{ data.position }} / &nbsp;<Image
        class="is-logo-image is-w-7"
        :src="data.team?.logo"
        :key="data.team?.id"
      />&nbsp;{{ data.team?.longName }}
    </div>
  </div>
</template>
