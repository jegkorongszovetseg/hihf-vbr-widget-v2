<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import { offsetName } from '../utils/datetime';
import { useI18n, i18n } from '../composables/useI18n';
import { AVAILABLE_TIMEZONES_BY_COUNTRY } from '../constants.js';
import { useMainClass } from '../composables/useMainClass';

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
const localTimeZone = dayjs.tz.guess();

const timezoneCountries = computed(() => {
  return Array.from(AVAILABLE_TIMEZONES_BY_COUNTRY.values()).map((item) => ({
    ...item,
    isActive:
      offsetName(new Date(), props.localTimezone, props.locale) === offsetName(new Date(), item.timezone, props.locale),
    zoneOffsetName: offsetName(new Date(), item.timezone, props.locale),
  }));
});

const onChangeTimezone = (tz) => emit('change', tz);
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
