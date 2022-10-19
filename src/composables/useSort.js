import { createMachine } from '@xstate/fsm';
import { reactive } from 'vue';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constants';

const sortMachine = createMachine({
  id: 'sort',
  initial: SORT_STATE_ORIGINAL,
  states: {
    [SORT_STATE_ORIGINAL]: {
      on: {
        DIRECTION1: SORT_STATE_DESCEND,
        DIRECTION2: SORT_STATE_ASCEND,
      },
    },
    [SORT_STATE_DESCEND]: {
      on: {
        DIRECTION1: SORT_STATE_ASCEND,
        DIRECTION2: SORT_STATE_ORIGINAL,
      },
    },
    [SORT_STATE_ASCEND]: {
      on: {
        DIRECTION1: SORT_STATE_ORIGINAL,
        DIRECTION2: SORT_STATE_DESCEND,
      },
    },
  },
});

const transitionOrderState = (originalSortState, sortState) => {
  const direction = sortState === SORT_STATE_ASCEND ? 'DIRECTION2' : 'DIRECTION1';
  return sortMachine.transition(originalSortState, direction).value;
};

export default function useSort({ sortTarget = null, orders = [] }) {
  const sort = reactive({ sortTarget, orders });

  const change = ({ target, orders }) => {
    if (sort.sortTarget !== target) {
      sort.sortTarget = target;
      sort.orders = orders;
      return;
    }
    const nextOrders = orders.map((order, index) => ({
      ...order,
      direction: transitionOrderState(sort.orders[index].direction, order.direction),
    }));

    sort.sortTarget = target;
    sort.orders = nextOrders;
  };

  return {
    sort,
    change,
  };
}
