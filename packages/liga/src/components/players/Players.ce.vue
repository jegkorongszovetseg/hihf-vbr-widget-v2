<script setup>
import { ref } from 'vue';
import {
  Paginator,
  ErrorNotice,
  I18NProvider,
  ErrorProvider,
  SeasonSelector,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import PlayersDataTable from '../common/PlayersDataTable.vue';
import { COLUMNS_PLAYERS } from '../internal';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

const messages = { en, hu };

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipName: {
    type: String,
    default: '',
  },

  limit: {
    type: Number,
    default: 40,
  },

  externalPlayerResolver: {
    type: [String, Function],
    default: '',
  },
});

const tooltipContainer = ref(null);

const externalTeamLink = (teamId) => externalTeamLinkResolver(props.externalPlayerResolver, teamId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :championship-name="championshipName"
          :limit="limit"
          v-slot="{ players, seasons, isLoading, championshipId, page, changeSeason, sort, onSort, onPaginatorChange }"
        >
          <SeasonSelector
            :seasons="seasons"
            :championship-id="championshipId"
            is-section-selection-disabled
            @on-change-season="changeSeason"
          />

          <LoadingIndicator v-if="isLoading" />

          <PlayersDataTable
            :columns="COLUMNS_PLAYERS"
            :rows="players.rows"
            :append-to="tooltipContainer"
            :sort="sort"
            @sort="onSort"
          />

          <Paginator
            :page="page"
            :items-per-page="props.limit"
            :total-items="players.totalItems"
            :range-length="5"
            @change="onPaginatorChange"
          />

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
