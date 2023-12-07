import {IUser} from '../user/user';
import {IBrand, ICategory, IColor, IGender, ISize} from './filters';
import {IProductImage} from './image';

export interface IProduct {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    teamName: string;
    images: {
      data: IProductImage[];
    };
    brand: {
      data: IBrand;
    };
    categories: {
      data: ICategory[];
    };
    color: {
      data: IColor;
    };
    gender: {
      data: IGender;
    };
    sizes: {
      data: ISize[];
    };
    userID?: {
      data: IUser;
    };
  };
}
