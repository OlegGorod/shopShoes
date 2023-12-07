import {getSession} from 'next-auth/react';

import {imageAPI} from '@/api/image';
import {TProductData} from '@/types/product/addProduct';
import {IProductImage} from '@/types/product/image';

export default async function deletePhotosFromServer(
  productData: TProductData,
  oldImagesIds: Array<number>,
) {
  try {
    const session = await getSession();
    const token = session!.jwt!;

    const imagesIds = (productData.images as IProductImage[])
      .map((image: IProductImage) => image.id)
      .filter(Boolean);
    const imagesToDelete = oldImagesIds.filter(id => !imagesIds.includes(id));

    if (imagesToDelete.length) {
      await imageAPI.deleteImages(imagesToDelete, token);
    }
  } catch {}
}
