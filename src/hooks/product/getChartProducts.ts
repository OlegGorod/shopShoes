import {useQuery} from '@tanstack/react-query';

import {productAPI} from '@/api/product';

import {useBagContext} from '../store/bag';

export function useGetChartProducts() {
  const {state} = useBagContext();
  const keys = state && Object.keys(state);

  return useQuery({
    queryKey: ['chart-products', keys],
    queryFn: () => productAPI.getChartProducts(state || {}),
  });
}
