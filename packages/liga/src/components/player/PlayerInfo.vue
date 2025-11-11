<script setup>
import { FloatingPanel, Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { flagResolver, isEmpty } from '@mjsz-vbr-elements/core/utils';

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
    <h2 v-once class="is-heading-2">
      {{ data.name }} <span class="italic">#{{ data.jerseyNr }}</span>
    </h2>
    <div style="display: flex; align-items: center; justify-content: center">
      {{ data.birthDate }} ({{ t('players.age', { years: data.age }) }}) /&nbsp;
      <template v-for="flag in data.player.nationality" :key="flag">
        <FloatingPanel
          v-slot="{ setRef, show, hide }"
          placement="top"
          :content="t(`nationality.${flag}`)"
          :append-to="appendTo"
        >
          <span :ref="setRef" class="is-rounded" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
            <Image :src="flagResolver(flag)" />
          </span>
        </FloatingPanel>
      </template>&nbsp; {{ data.birthPlace }} / {{ data.position }} / &nbsp;<Image
        :key="data.team?.id"
        class="is-logo-image is-w-7"
        :src="data.team?.logo"
      />&nbsp;{{ data.team?.longName }}
    </div>
  </div>
</template>
