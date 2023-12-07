import {useContext, useReducer} from 'react';

import {BagContext, bagReducer} from '@/store/Bag';
import {IBagStore, IChartProducts} from '@/types/store/bag';

export function useBagStore(): IBagStore {
  const [state, dispatch] = useReducer(bagReducer, null);

  const removeProduct = (id: number, size?: number): void => {
    dispatch({type: 'REMOVE_PRODUCT', payload: {id, size}});
  };

  const addProduct = (id: number, size: number): void => {
    dispatch({type: 'ADD_PRODUCT', payload: {id, size}});
  };

  const changeProductAmount = (
    id: number,
    size: number,
    amount: number,
  ): void => {
    dispatch({type: 'CHANGE_PRODUCT_AMOUNT', payload: {id, size, amount}});
  };

  const setProducts = (products: IChartProducts): void => {
    dispatch({type: 'SET_PRODUCTS', payload: products});
  };

  return {state, removeProduct, addProduct, changeProductAmount, setProducts};
}

export function useBagContext(): IBagStore {
  const bagContext = useContext(BagContext);

  if (!bagContext)
    throw Error('BagContext context was used outside of provider');

  return bagContext;
}
