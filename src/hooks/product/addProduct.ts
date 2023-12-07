import {useMutation} from '@tanstack/react-query';

import {productAPI} from '@/api/product';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';
import {TProductData} from '@/types/product/addProduct';

export function useAddProduct() {
  return useMutation({
    mutationFn: (productData: TProductData): Promise<IResponse> =>
      productAPI.addProduct(productData),

    onError: (error: IError) => {
      return error;
    },

    onSuccess: (success: IResponse) => {
      ToastifyCaller(IStatuses.success, success.message);
    },

    mutationKey: ['add-product'],
  });
}
