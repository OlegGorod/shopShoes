import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';

import {authAPI} from '@/api/auth';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IError} from '@/types/api/error';
import {IResponse} from '@/types/api/response';
import {ISignUpUser} from '@/types/auth/auth';

export function useSignUpUser() {
  const {push} = useRouter();

  return useMutation({
    mutationFn: (data: ISignUpUser): Promise<IResponse> => authAPI.signUp(data),
    onError: (error: IError) => error,
    onSuccess: () => {
      ToastifyCaller(IStatuses.success, 'Letter was sent on your email');
      push('/auth/sign-in');
    },
    mutationKey: ['sign-up'],
  });
}
