import {useMutation, useQueryClient} from '@tanstack/react-query';

import {productAPI} from '@/api/product';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string): Promise<IResponse> =>
      productAPI.deleteProduct(productId),
    onError: (error: IError) => {
      ToastifyCaller(IStatuses.error, error.error.message);
    },
    onSuccess: (data: IResponse) => {
      queryClient.invalidateQueries({queryKey: ['chart-products']});
      queryClient.invalidateQueries({queryKey: ['user-products']});
      queryClient.invalidateQueries({queryKey: ['all-products']});
      ToastifyCaller(IStatuses.success, data.message);
    },
    mutationKey: ['delete-product'],
  });
}
