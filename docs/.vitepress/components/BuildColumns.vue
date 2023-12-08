<script setup>
import * as Columns from '@mjsz-vbr-elements/core/columns';
import hu from '../../../packages/core/src/locales/hu.json';
import { path, split, omit } from 'ramda';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  remove: {
    type: Array,
    default: () => [],
  },
});

const excludedColumns = omit(props.remove, path([props.name], Columns));

const cols = Object.keys(excludedColumns).reduce((acc, columnName) => {
  const localePath = Columns[props.name][columnName].tooltip || '';
  acc.push({
    name: columnName,
    description: path(split('.', localePath), hu) || '',
  });
  return acc;
}, []);
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Oszlop név</th>
          <th>Leírás</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in cols">
          <td>{{ col.name }}</td>
          <td>{{ col.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
