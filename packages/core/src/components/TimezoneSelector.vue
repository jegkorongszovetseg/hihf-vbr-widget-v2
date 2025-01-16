<script setup>
import { computed } from 'vue';
import { i18n, useI18n } from '../composables/useI18n';
import { useMainClass } from '../composables/useMainClass';
import { AVAILABLE_TIMEZONES_BY_COUNTRY } from '../constants.js';
import { getLocalTimezone, offsetName } from '../utils/datetime';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  currentZone: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['change']);

const { t } = useI18n();
const mainClass = useMainClass('timezone-selector');

const localZoneName = computed(() => offsetName(new Date(), null, props.locale));
const localTimeZone = getLocalTimezone();

const timezoneCountries = computed(() => {
  return Array.from(AVAILABLE_TIMEZONES_BY_COUNTRY.values()).map(item => ({
    ...item,
    isActive:
      offsetName(new Date(), props.currentZone, props.locale) === offsetName(new Date(), item.timezone, props.locale),
    zoneOffsetName: offsetName(new Date(), item.timezone, props.locale),
  }));
});

const onChangeTimezone = tz => emit('change', tz);
</script>

<template>
  <div :class="mainClass">
    <i18n path="common.selectTimezone" tag="span">
      <template #timezone>
        <a href="#" @click.prevent="onChangeTimezone(localTimeZone)">{{ localZoneName }}</a>
      </template>
    </i18n>
    <a
      v-for="country in timezoneCountries"
      :key="country.countryLabelKey"
      href="#"
      :class="{ 'is-active': country.isActive }"
      @click.prevent="onChangeTimezone(country.timezone)"
    >
      {{ t(`common.${country.countryLabelKey}`) }} ({{ country.zoneOffsetName }})
    </a>
  </div>
</template>
