import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';

import {authAPI} from '@/api/auth';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';
import {IResetPassword} from '@/types/auth/auth';

export function useResetPassword() {
  const {push} = useRouter();

  return useMutation({
    mutationFn: (data: IResetPassword): Promise<IResponse> =>
      authAPI.resetPassword(data),
    onError: (error: IError) => {
      ToastifyCaller(IStatuses.error, error.error.message);
      push('/auth/sign-in');
    },
    onSuccess: (data: IResponse) => {
      ToastifyCaller(IStatuses.success, data.message);
      push('/auth/sign-in');
    },
    mutationKey: ['reset-password'],
  });
}
