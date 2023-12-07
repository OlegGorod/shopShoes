import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

import {userAPI} from '@/api/user';
import ToastifyCaller, {IStatuses} from '@/components/UI/toastify';
import {IUpdateUser} from '@/types/user/updateUser';

export function useUpdateProfile() {
  const {update} = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      userData,
      avatar,
      userId,
      token,
    }: {
      userData: IUpdateUser;
      avatar: File | undefined | null;
      userId: string | number;
      token: string;
    }) => {
      return userAPI.updateUser(userId, avatar, userData, token);
    },
    onSuccess: user => {
      update(user).finally(() =>
        update().then(() => router.push('/profile/my-products')),
      );
    },
    onError: () => {
      ToastifyCaller(IStatuses.error, "User data couldn't be updated");
    },
  });
}
