import {useQuery} from '@tanstack/react-query';

import {productAPI} from '@/api/product';
import {IProduct} from '@/types/product/product';

export function useGetProduct(userId: string, products: IProduct[]) {
  return useQuery({
    queryKey: ['user-products', userId],
    queryFn: () => productAPI.getUsersProducts(userId),
    initialData: products,
  });
}
