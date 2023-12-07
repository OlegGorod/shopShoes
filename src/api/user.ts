import axios from 'axios';

import {IUpdateUser} from '@/types/user/updateUser';

import {imageAPI} from './image';

class UserAPI {
  constructor(private readonly url: string) {}

  async getAvatar(token: string): Promise<string | null> {
    const {
      data: {avatar},
    } = await axios.get(`${this.url}/me?populate=avatar`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return avatar ? avatar.url : null;
  }

  async updateUser(
    userId: string | number,
    avatar: File | null | undefined,
    values: IUpdateUser,
    token: string,
  ): Promise<void> {
    let updatedAvar;
    if (Object.is(avatar, null)) updatedAvar = null;
    else if (avatar) {
      avatar = await imageAPI.uploadImage(token, avatar);
    }

    const userData: any = {...values};
    if (!Object.is(avatar, undefined)) userData.avatar = avatar;

    const {data} = await axios.put(`${this.url}/${userId}`, userData, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export const userAPI = new UserAPI(`${process.env.NEXT_PUBLIC_URL}/users`);
