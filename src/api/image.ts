import axios from 'axios';
import {ImageListType, ImageType} from 'react-images-uploading';

class ImageAPI {
  constructor(private readonly url: string) {}

  async deleteImages(
    imagesToDelete: Array<number>,
    token: string,
  ): Promise<void> {
    try {
      await Promise.all(
        imagesToDelete.map(id =>
          axios.delete(`${this.url}/files/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-type': 'application/json',
            },
          }),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImage(token: string, avatar: File) {
    const formData = new FormData();
    formData.append('files', avatar);
    const {data} = await axios.post(this.url, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return data[0].id;
  }

  async uploadImages(
    images: Array<ImageListType>,
    token: string,
  ): Promise<Array<number> | undefined> {
    try {
      const formData = new FormData();
      const imagesIds: Array<number> = [];

      images.forEach((image: ImageType) => {
        image.file && formData.append('files', image.file);
      });

      const {data} = await axios.post(this.url, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      data.forEach((image: {id: number}) => imagesIds.push(image.id));

      return imagesIds;
    } catch (error) {
      console.log(error);
    }
  }
}

export const imageAPI = new ImageAPI(`${process.env.NEXT_PUBLIC_URL}/upload`);
