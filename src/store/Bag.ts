import {createContext} from 'react';

import {IAction, IBagStore, IChartProducts} from '@/types/store/bag';

export const bagReducer = (
  state: IChartProducts | null,
  {type, payload}: IAction,
) => {
  switch (type) {
    case 'SET_PRODUCTS':
      return payload;

    case 'ADD_PRODUCT':
      if (state && state[payload.id] && state[payload.id][payload.size]) {
        return {
          ...state,
          [payload.id]: {
            ...state[payload.id],
            [payload.size]: state[payload.id][payload.size] + 1,
          },
        };
      } else if (state && state[payload.id]) {
        return {
          ...state,
          [payload.id]: {
            ...state[payload.id],
            [payload.size]: 1,
          },
        };
      }

      return {
        ...state,
        [payload.id]: {
          [payload.size]: 1,
        },
      };

    case 'REMOVE_PRODUCT':
      if (
        state &&
        state[payload.id] &&
        (!payload.size || Object.keys(state[payload.id]).length === 1)
      ) {
        const newState = {...state};
        delete newState[payload.id];
        return newState;
      }

      if (state && payload.size) {
        const sizes = {...state[payload.id]};
        delete sizes[payload.size];

        return {
          ...state,
          [payload.id]: {...sizes},
        };
      }

    case 'CHANGE_PRODUCT_AMOUNT':
      if (state && 'amount' in payload) {
        return {
          ...state,
          [payload.id]: {...state[payload.id], [payload.size]: payload.amount},
        };
      }

      return state;

    default:
      return state;
  }
};

export const BagContext = createContext<IBagStore | null>(null);
