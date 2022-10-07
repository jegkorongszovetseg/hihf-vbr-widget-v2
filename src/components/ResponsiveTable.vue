<template>
  <div class="table-responsive"><slot /></div>
</template>

<style>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.table-responsive table {
  width: 100%;
}
</style>
