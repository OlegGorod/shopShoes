import {useMutation} from '@tanstack/react-query';

import {authAPI} from '@/api/auth';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';
import {IForgotPassword} from '@/types/auth/auth';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: IForgotPassword): Promise<IResponse> =>
      authAPI.forgotPassword(data),
    onError: (error: IError) => {
      return error;
    },
    onSuccess: (data: IResponse) => {
      ToastifyCaller(IStatuses.success, data.message);
    },
    mutationKey: ['forgot-password'],
  });
}
