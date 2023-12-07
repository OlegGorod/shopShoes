export interface ISize {
  id: number;
  attributes: {
    value: string | number;
  };
}
export interface IBrand {
  id: number;
  attributes: {
    name: string;
  };
}
export interface IColor extends IBrand {}
export interface IGender extends IBrand {}
export interface ICategory extends IBrand {}

export interface IFilters {
  sizes: ISize[];
  brands: IBrand[];
  colors: IColor[];
  genders: IGender[];
  categories: ICategory[];
  maxPrice?: number;
}
