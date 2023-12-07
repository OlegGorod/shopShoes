import {useQuery} from '@tanstack/react-query';

import {productAPI} from '@/api/product';
import {IPagination} from '@/types/product/pagination';
import {IProduct} from '@/types/product/product';

export function useGetAllProduct(
  token: string,
  initialData: {products: Array<IProduct>; pagination: IPagination},
  search: string | null,
  filters: {
    [title: string]: Array<string | number>;
  },
  page: number,
) {
  return useQuery({
    queryKey: ['get-all-products', search, token, filters, page],
    queryFn: () => productAPI.getAllProducts(token, search, filters, page),
    initialData,
  });
}
