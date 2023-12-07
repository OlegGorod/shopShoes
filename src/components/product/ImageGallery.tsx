import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton, ImageList, ImageListItem} from '@mui/material';
import Image from 'next/image';
import {useState} from 'react';

import {IProductImage} from '@/types/product/image';

import styles from './ImageGallery.module.css';

interface IProps {
  images: IProductImage[];
  className?: string;
}

export default function ImageGallery({images, className}: IProps) {
  const [selectedImgIndx, setSelectedImgIndx] = useState<number>(0);

  const onNextImg = () => {
    setSelectedImgIndx(prev => {
      if (prev < images.length - 1) return prev + 1;
      return 0;
    });
  };

  const onPrevImg = () => {
    setSelectedImgIndx(prev => {
      if (prev > 1) return prev - 1;
      return images.length - 1;
    });
  };

  return (
    <div
      className={`tw-flex tw-w-full xl:tw-w-fit tw-justify-center ${className}`}
    >
      <ImageList
        className={`${styles.imageSelect} tw-hidden sm:tw-grid tw-h-[314px] md:tw-h-[628px]`}
        sx={{
          maxWidth: 76,
          marginRight: '14px',
          gridTemplateRows: `repeat(${images.length}, 76px)`,
        }}
        gap={14}
        cols={1}
      >
        {images.map(({id, attributes}: IProductImage, indx: number) => (
          <ImageListItem
            key={id}
            onMouseEnter={() => setSelectedImgIndx(indx)}
            className="tw-items-center"
          >
            <Image
              className="tw-object-cover"
              width={76}
              height={76}
              alt="product image"
              src={attributes.url}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <div className="tw-w-[300px] tw-h-[314px] md:tw-w-[588px] md:tw-h-[628px] tw-relative">
        <Image
          fill
          className="tw-object-cover"
          sizes="md:588px"
          alt="selected image"
          src={images[selectedImgIndx].attributes.url}
        />

        <div className="tw-absolute tw-z-10 tw-flex tw-gap-6 tw-bottom-6 tw-right-8">
          <IconButton
            onClick={onPrevImg}
            className="tw-bg-white tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-cursor-pointer"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={onNextImg}
            className="tw-bg-white tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-cursor-pointer"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
