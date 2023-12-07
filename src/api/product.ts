import axios, {AxiosError} from 'axios';
import {getSession} from 'next-auth/react';
import {ImageListType, ImageType} from 'react-images-uploading';

import {IResponse} from '@/types/api/response';
import {TPopularSearchTerm} from '@/types/header';
import {TProductData} from '@/types/product/addProduct';
import {IProductImage} from '@/types/product/image';
import {IPagination} from '@/types/product/pagination';
import {IProduct} from '@/types/product/product';
import {IChartProducts} from '@/types/store/bag';

import {imageAPI} from './image';

class ProductAPI {
  constructor(private readonly url: string) {}

  async getAllProducts(
    token?: string,
    search?: string | null,
    filters?: {
      [title: string]: Array<string | number>;
    },
    page: number = 1,
    pageSize: number = 4,
  ): Promise<{
    products: Array<IProduct>;
    pagination: IPagination;
  }> {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        }
      : {};

    let url = `${this.url}/?filters[teamName][$eq]=team-2&populate=*`;

    if (search) {
      url += `&filters[name][$containsi]=${search}`;
    }

    let filtersVal = '';
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (key !== 'Price' && key !== 'Category' && key !== 'Size') {
          filters[key].forEach((val, ind) => {
            filtersVal += `&filters[${key.toLowerCase()}][name][$in][${ind}]=${val}`;
          });
        } else if (key === 'Price') {
          filtersVal += `&filters[price][$gte]=${filters[key][0]}&filters[price][$lte]=${filters[key][1]}`;
        } else if (key === 'Category' || key === 'Size') {
          filters[key].forEach((val, ind) => {
            filtersVal += `&filters[$and][${ind}][${
              key === 'Category' ? 'categories' : 'sizes'
            }][${key === 'Category' ? 'name' : 'value'}][$in][${ind}]=${val}`;
          });
        }
      });
    }

    const paginationVals = `&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;

    const {data} = await axios.get(
      url + filtersVal + paginationVals,

      {
        params: {
          sort: {
            createdAt: 'desc',
          },
        },
        headers,
      },
    );

    return {products: data.data, pagination: data.meta.pagination};
  }

  async deleteProduct(productId: string): Promise<IResponse> {
    try {
      const session = await getSession();
      const token = session!.jwt!;
      await axios.delete(`${this.url}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      return {
        status: 200,
        message: 'Product was deleted',
      };
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getProduct(productId: string): Promise<IProduct | null> {
    try {
      const response = await axios.get(`${this.url}/${productId}`, {
        params: {
          populate: '*',
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  }

  async addProduct(productData: TProductData): Promise<IResponse> {
    try {
      const session = await getSession();
      const token = session!.jwt!;

      const imagesIds = await imageAPI.uploadImages(
        productData.images as ImageListType[],
        token,
      );

      const dataJSON = JSON.stringify({
        data: {
          ...productData,
          images: imagesIds,
          userID: session?.user?.id,
          teamName: 'team-2',
        },
      });

      const response = await axios.post(
        this.url,

        dataJSON,

        {
          headers: {
            'Content-type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        data: response,
        status: 200,
        message: 'Product added !',
      };
    } catch (error: unknown) {
      throw (error as AxiosError).response?.data;
    }
  }

  async getChartProducts(products: IChartProducts): Promise<IProduct[] | void> {
    try {
      const productsKeys: string[] = Object.keys(products);

      if (productsKeys.length) {
        const response = await axios.get(`${this.url}`, {
          params: {
            populate: '*',
            pagination: {
              withCount: true,
            },
            filters: {
              id: Object.keys(products),
            },
          },
        });
        return response.data.data;
      }
      return [];
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async editProduct(productData: TProductData, id: number): Promise<IResponse> {
    try {
      const session = await getSession();
      const token = session!.jwt!;

      const imagesToUpload = productData.images.filter(
        (image: ImageType) => image.data_url,
      );
      const imagesIds = (productData.images as IProductImage[])
        .map((image: IProductImage) => image.id)
        .filter(Boolean);

      if (imagesToUpload.length) {
        const ids = await imageAPI.uploadImages(
          imagesToUpload as ImageListType[],
          token,
        );
        ids && imagesIds.push(...ids);
      }

      const dataJSON = JSON.stringify({
        data: {
          ...productData,
          images: imagesIds,
          userID: session?.user?.id,
          teamName: 'team-2',
        },
      });

      const response = await axios.put(`${this.url}/${id}`, dataJSON, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: response,
        status: 200,
        message: 'Product edited !',
      };
    } catch (error: unknown) {
      throw (error as AxiosError).response?.data;
    }
  }

  async getAllProductsNames(): Promise<Array<TPopularSearchTerm> | null> {
    try {
      const response = await axios.get(
        `${this.url}?filters[teamName][$eq]=team-2&populate=name`,
      );

      return response.data.data;
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  }

  async getUsersProducts(
    userId: string,
    token?: string,
  ): Promise<IProduct[] | void> {
    try {
      if (!token) {
        const session = await getSession();
        token = session!.jwt!;
      }
      const response = await axios.get(`${this.url}`, {
        params: {
          populate: '*',
          filters: {
            userID: {
              id: {
                $eq: userId,
              },
            },
          },
          sort: {
            createdAt: 'desc',
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      console.error(error);
    }
  }
}

export const productAPI = new ProductAPI(
  `${process.env.NEXT_PUBLIC_URL}/products`,
);
