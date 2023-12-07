import axios, {AxiosError} from 'axios';

import {IResponse} from '@/types/api/response';
import {
  IForgotPassword,
  IResetPassword,
  ISignInUser,
  ISignUpUser,
} from '@/types/auth/auth';

class AuthAPI {
  constructor(private readonly url: string) {}

  async resetPassword(data: IResetPassword): Promise<IResponse> {
    try {
      await axios.post(`${this.url}/reset-password`, data);
      return {
        status: 200,
        message: "Password's been changed",
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async signUp({name, ...rest}: ISignUpUser): Promise<IResponse> {
    try {
      await axios.post(`${this.url}/local/register`, {
        username: name,
        ...rest,
      });
      return {
        status: 200,
        message: "You've been registered",
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async forgotPassword(data: IForgotPassword): Promise<IResponse> {
    try {
      await axios.post(`${this.url}/forgot-password`, data);
      return {
        status: 200,
        message: "We've sent you email",
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async signIn({email, password}: ISignInUser): Promise<IResponse> {
    try {
      const response = await axios.post(`${this.url}/local`, {
        identifier: email,
        password,
      });
      return {
        status: 200,
        data: response.data,
        message: "You've been signed in",
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export const authAPI = new AuthAPI(`${process.env.NEXT_PUBLIC_URL}/auth`);
