<script setup>
import { reactive } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import { useServices, useSection, useTeams } from '@/composables/useServices';
import { useError } from '@/composables/useErrors';
import { transformSeasons } from '@/components/widgets/extended/internal';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  limit: {
    type: Number,
    default: 20,
  },

  apiKey: {
    type: String,
    default: '',
  },
});

const state = reactive({
  championshipName: props.championshipName,
  loading: false,
  seasons: [],
  championshipId: 0,
  sections: [],
  section: null,
  teams: [],
});

const { onError } = useError();

const { execute: fetchSeasons } = useServices({
  options: {
    path: '/v1/championshipSeasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
  },
  transform: (res) => transformSeasons(res, state),
  onError,
});
const { execute: fetchSection } = useSection({ apiKey: props.apiKey, state, onError: (error) => onError(error) });
const { execute: fetchTeams } = useTeams({ apiKey: props.apiKey, state, onError: (error) => onError(error) });

// const fetchSeasons = async () => {
//   try {
//     state.loading = true;
//     const seasons = await fetchVBRData('/v1/championshipSeasons', props.apiKey, {
//       championshipName: props.championshipName,
//     });
//     if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
//     state.seasons = convertSeasons(seasons);
//     if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
//   } catch (error) {
//     // onError(error);
//   } finally {
//     state.loading = false;
//   }
// };

// const fetchSection = async () => {
//   try {
//     state.loading = true;
//     const sections = await fetchVBRData('/v1/championshipSections', props.apiKey, {
//       championshipId: state.championshipId,
//     });
//     state.sections = sections.sectionName;
//     if (state.sections && !state.sections.includes(state.section)) {
//       state.section = head(state.sections);
//     }
//   } catch (error) {
//     // onError(error);
//   } finally {
//     state.loading = false;
//   }
// };

// const init = async () => {
//   await fetchSeasons();
//   await fetchSection();
// };
useAsyncQueue([fetchSeasons, fetchSection, fetchTeams]);

// init();
</script>

<template>
  <slot v-bind="{ ...state }"></slot>
</template>
