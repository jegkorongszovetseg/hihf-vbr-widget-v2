<template>
  <ul class="mjsz-vbr-pagination" v-if="pageCount > 1">
    <li :class="{ 'is-disabled': page === 1 }">
      <a href="#" @click.prevent="pageStep(-1)">
        <slot name="prev">
          <IconLeft class="icon paginator-left"></IconLeft>
        </slot>
      </a>
    </li>
    <li v-if="!isCompact" :class="{ 'is-disabled': page === 1 }">
      <a href="#" type="button" @click.prevent="goTo(1)">
        1
      </a>
    </li>
    <li v-if="!isCompact" class="is-extended">
      <span>...</span>
    </li>
    <li v-for="n in range" :key="n" :class="{ 'is-active': n === page }">
      <a href="#" @click.prevent="goTo(n)">
        {{ n }}
      </a>
    </li>
    <li v-if="!isCompact" class="is-extended">
      <span>...</span>
    </li>
    <li v-if="!isCompact" :class="{ 'is-disabled': page === pageCount }">
      <a href="#" @click.prevent="goTo(pageCount)">
        {{ pageCount }}
      </a>
    </li>
    <li :class="{ 'is-disabled': page === pageCount }">
      <a href="#" @click.prevent="pageStep(1)">
        <slot name="next">
          <IconRight class="icon paginator-left"></IconRight>
        </slot>
      </a>
    </li>
  </ul>
</template>
<script>
import IconLeft from './icons/IconLeft.vue';
import IconRight from './icons/IconRight.vue';

export default {
  name: 'Paginator',

  components: {
    IconLeft,
    IconRight
  },

  props: {
    page: {
      type: Number,
      required: false,
      default: 0,
      validator: value => {
        return value >= 0;
      }
    },

    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
      validator: value => {
        return value > 0;
      }
    },

    totalItems: {
      type: Number,
      required: true,
      validator: value => {
        return value >= 0;
      }
    },

    rangeLength: {
      type: Number,
      default: 3,
      validator: value => {
        return value >= 2;
      }
    },

    isCompact: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    range() {
      const page = this.page - 1;
      const range = Array.from({ length: this.pageCount }, (_, i) => i + 1);
      const minus = Math.floor(this.rangeLength / 2);

      let startIndex = Math.max(page - minus, 0);
      if (startIndex + this.rangeLength >= this.pageCount) {
        startIndex = Math.max(this.pageCount - this.rangeLength, 0);
      }
      return range.slice(startIndex, startIndex + this.rangeLength);
    }
  },

  methods: {
    pageStep(v) {
      const page = this.page + v;
      if (this.validPage(page)) this.$emit('change', page);
    },

    goTo(page) {
      if (this.validPage(page)) this.$emit('change', page);
    },

    validPage(page) {
      return page <= this.pageCount && page > 0;
    }
  }
};
</script>
