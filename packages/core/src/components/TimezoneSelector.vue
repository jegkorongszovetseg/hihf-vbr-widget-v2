<script setup>
import { computed } from 'vue';
import { i18n, useI18n } from '../composables/useI18n';
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
  <div class="timezone-selector">
    <i18n path="common.selectTimezone" tag="span">
      <template #timezone>
        <button type="button" data-variant="link" @click="onChangeTimezone(localTimeZone)">
          {{ localZoneName }}
        </button>
      </template>
    </i18n>
    <button
      v-for="country in timezoneCountries"
      :key="country.countryLabelKey"
      type="button"
      data-variant="link"
      :class="{ 'is-active': country.isActive }"
      @click.prevent="onChangeTimezone(country.timezone)"
    >
      {{ t(`common.${country.countryLabelKey}`) }} ({{ country.zoneOffsetName }})
    </button>
  </div>
</template>
