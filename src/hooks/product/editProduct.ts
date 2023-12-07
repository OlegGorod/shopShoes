import {useMutation, useQueryClient} from '@tanstack/react-query';

import {productAPI} from '@/api/product';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';
import {TProductData} from '@/types/product/addProduct';

export function useEditProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productData,
      id,
    }: {
      productData: TProductData;
      id: number;
    }): Promise<IResponse> => productAPI.editProduct(productData, id),

    onError: (error: IError) => {
      return error;
    },

    onSuccess: (data: IResponse) => {
      queryClient.invalidateQueries({queryKey: ['chart-products']});
      queryClient.invalidateQueries({queryKey: ['user-products']});
      queryClient.invalidateQueries({queryKey: ['all-products']});
      ToastifyCaller(IStatuses.success, data.message);
    },

    mutationKey: ['edit-product'],
  });
}
