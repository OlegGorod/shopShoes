import axios, {AxiosError} from 'axios';

import {
  IBrand,
  ICategory,
  IColor,
  IGender,
  ISize,
} from '@/types/product/filters';

class ProductFiltersAPI {
  constructor(private readonly url: string) {}

  async getBrands(): Promise<IBrand[]> {
    try {
      const response = await axios.get(`${this.url}/brands`, {
        params: {
          fields: 'name',
          'pagination[withCount]': true,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getCategories(): Promise<ICategory[]> {
    try {
      const response = await axios.get(`${this.url}/categories`, {
        params: {
          fields: 'name',
          'pagination[withCount]': true,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getColors(): Promise<IColor[]> {
    try {
      const response = await axios.get(`${this.url}/colors`, {
        params: {
          fields: 'name',
          'pagination[withCount]': true,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getGenders(): Promise<IGender[]> {
    try {
      const response = await axios.get(`${this.url}/genders`, {
        params: {
          fields: 'name',
          'pagination[withCount]': true,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getSizes(): Promise<ISize[]> {
    try {
      const response = await axios.get(`${this.url}/sizes`, {
        params: {
          fields: 'value',
          'pagination[withCount]': true,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getMaxPrice(): Promise<number> {
    try {
      const response = await axios.get(`${this.url}/products`, {
        params: {
          sort: 'price:desc',
          'pagination[page]': 1,
          'pagination[pageSize]': 1,
          'filters[teamName][$eq]': 'team-2',
        },
      });
      return response.data.data[0].attributes.price;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export const productFiltersAPI = new ProductFiltersAPI(
  `${process.env.NEXT_PUBLIC_URL}`,
);
