import {IAuthUser} from '../auth/user';

export interface IResponse {
  data?: unknown;
  status: number;
  message: string;
}

export interface IResponseData {
  jwt: string;
  user: IAuthUser;
}

export interface IResponseAddProduct {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      uniqueID: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      teamName: string;
    };
  };
}
