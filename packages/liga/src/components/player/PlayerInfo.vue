<script setup>
import { FloatingPanel, Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { flagResolver, format, isNotEmpty, yearToNow } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },

  isBirthYearOnly: {
    type: Boolean,
    default: false,
  },
});

const { locale, t } = useI18n();

const dateOfBirth = computed(() => {
  return props.isBirthYearOnly ? format(props.data.birthDate, 'YYYY') : format(props.data.birthDate, 'LL', null, locale.value);
});

const age = computed(() => yearToNow(props.data.birthDate, locale.value));
</script>

<template>
  <div v-if="isNotEmpty(data)" class="grid justify-center">
    <h2 v-once>
      {{ data.name }} <span class="italic">#{{ data.jerseyNr }}</span>
    </h2>
    <ul class="unordered-list centered">
      <li>
        {{ dateOfBirth }} <template v-if="!isBirthYearOnly">
          ({{ t('players.age', { years: age }) }})
        </template>
      </li>
      <li>
        <template v-for="flag in data.player.nationality" :key="flag">
          <FloatingPanel
            v-slot="{ setRef, events }"
            placement="top"
            :content="t(`nationality.${flag}`)"
            :append-to="appendTo"
          >
            <span :ref="setRef" class="avatar" v-bind="events">
              <Image :src="flagResolver(flag)" />
            </span>
          </FloatingPanel>
          {{ data.birthPlace }}
        </template>
      </li>
      <li>
        {{ data.position }}
      </li>
      <li>
        <Image
          :key="data.team?.id"
          class="is-logo-image is-w-7"
          style="width: var(--size-24)"
          :src="data.team?.logo"
        />&nbsp;{{ data.team?.longName }}
      </li>
    </ul>
  </div>
</template>
