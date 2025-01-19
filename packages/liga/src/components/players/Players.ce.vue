<script setup>
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  Paginator,
  SeasonSelector,
} from '@mjsz-vbr-elements/core/components';
import { externalPlayerLinkResolver, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import PlayersDataTable from '../common/PlayersDataTable.vue';
import { COLUMNS_PLAYERS } from '../internal';
import DataProvider from './DataProvider.vue';

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

  externalTeamResolver: {
    type: [String, Function],
    default: '',
  },
});

const messages = { en, hu };

const tooltipContainer = ref(null);

const externalPlayerLink = params => externalPlayerLinkResolver(props.externalPlayerResolver, params);
const externalTeamLink = params => externalTeamLinkResolver(props.externalTeamResolver, params);
</script>

<template>
  <div>
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          v-slot="{
            range,
            players,
            seasons,
            isLoading,
            championshipId,
            page,
            query,
            changeSeason,
            sort,
            onSort,
            onPaginatorChange,
            onInput,
          }"
          :api-key="props.apiKey"
          :locale="locale"
          :championship-name="championshipName"
          :limit="limit"
        >
          <SeasonSelector
            :seasons="seasons"
            :championship-id="championshipId"
            is-section-selection-disabled
            @on-change-season="changeSeason"
          >
            <div>
              <label for="player" class="label">{{ t('selection.filterName') }}</label>
              <input id="player" type="text" class="base-input" :value="query" @input="onInput">
            </div>
          </SeasonSelector>

          <PlayersDataTable
            :columns="COLUMNS_PLAYERS"
            :rows="players.rows"
            :append-to="tooltipContainer"
            :sort="sort"
            :is-loading="isLoading"
            :championship-id="championshipId"
            :player-resolver="externalPlayerLink"
            :team-resolver="externalTeamLink"
            @sort="onSort"
          />

          <div style="display: flex; justify-content: space-between; align-items: center">
            <Paginator
              :page="page"
              :items-per-page="props.limit"
              :total-items="players.totalItems"
              :range-length="5"
              @change="onPaginatorChange"
            />
            <div v-if="players.totalItems > 0">
              {{ range.join('-') }} / {{ players.totalItems }}
            </div>
          </div>

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/grid.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>
