import {ImageListType} from 'react-images-uploading';

import {IProductImage} from './image';

export interface TAddProductData {
  name: string;
  price: number;
  brand: string;
  color: string;
  gender: string;
  userID?: string;
  sizes: string[];
  images: string[];
  teamName: 'team-2';
  description: string;
}

export interface TProductData {
  name: string;
  price: number;
  description: string;
  brand: string | number;
  color: string | number;
  gender: string | number;
  sizes: Array<string | number>;
  categories: Array<string | number>;
  images: ImageListType[] | IProductImage[];
}
