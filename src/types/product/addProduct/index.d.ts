export type TAddProductData = {
  name: string;
  price: number;
  gender: string;
  brand: string;
  description: string;
  sizes: Array<string>;
  color: string;
  images: Array<string>;
  userID?: string;
  teamName: 'team-2';
};

export type TProductData = {
  name: string;
  price: number;
  gender: string | number;
  brand: string | number;
  description: string;
  sizes: Array<string | numbers>;
  color: string | number;
  categories: Array<string | numbers>;
  images: ImageListType | [];
};

export interface IProductPageProps {
  brands: Array<IBrandsData>;
  colors: Array<IColorData>;
  sizes: Array<ISizesData>;
  genders: Array<IGendersData>;
  categories: Array<ICategoriesData>;
}

export interface IBrandsData {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
export interface ISizesData {
  id: number;
  attributes: {
    value: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IGendersData extends IBrandsData {}
export interface ICategoriesData extends IBrandsData {}
export interface IColorData extends IBrandsData {}
