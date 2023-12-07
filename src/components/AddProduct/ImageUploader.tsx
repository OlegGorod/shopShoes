import {useTheme} from '@mui/material';
import {Box, Button, IconButton, Typography} from '@mui/material';
import Image from 'next/image';
import ImageUploading, {ImageListType} from 'react-images-uploading';

import AlertDialog from '@/components/UI/AlertDialog';
import constants from '@/constants/AddProduct';

import styles from './imageUploader.module.css';

export default function ImageUploader({
  handleChange,
  label,
  images,
  maxNumber,
}: {
  handleChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined,
  ) => void;
  label: string;
  images: ImageListType;
  maxNumber: number;
}) {
  const theme = useTheme();

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={handleChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({imageList, onImageUpload, onImageRemove, isDragging, dragProps}) => (
        <Box className="tw-flex tw-flex-wrap tw-gap-8 tw-items-end tw-w-full tw-justify-items-center">
          <Box>
            <Typography className="tw-mb-6 tw-text-black">{label}</Typography>

            <Box
              className={styles.box}
              sx={{
                bgcolor: isDragging
                  ? theme.palette.customColors.lightRed
                  : theme.palette.primary.contrastText,
              }}
              {...dragProps}
            >
              <Button
                id="images"
                name="images"
                onClick={onImageUpload}
                className={`tw-w-full tw-h-full tw-z-10`}
              />

              <Box className="tw-absolute tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-gap-2 tw-text-sm">
                <Image
                  src="/icons/gallery.svg"
                  width={38}
                  height={38}
                  alt="upload image"
                />

                <Typography className=" tw-w-2/3">
                  {constants.IMAGE_UPLOADER.TEXT}
                </Typography>
              </Box>
            </Box>
          </Box>

          {imageList.map((image, index) => {
            return (
              <Box
                key={index}
                className={`${styles.shieldBox} tw-relative tw-cursor-pointer`}
                width={320}
                height={380}
              >
                <Box className={styles.imageBox}>
                  <Image
                    width={320}
                    height={380}
                    src={image['data_url'] ?? image.attributes.url}
                    alt={image.file?.name ?? image.attributes.name}
                    className="tw-object-cover"
                  />
                </Box>

                <AlertDialog
                  message={`Delete ${
                    image.file?.name ?? image.attributes.name
                  } ?`}
                  handleAgree={() => onImageRemove(index)}
                >
                  <IconButton className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2">
                    <Image
                      src="/icons/trash.svg"
                      width={80}
                      height={80}
                      alt="delete image"
                      className={`${styles.deleteIcon} tw-bg-white tw-rounded-full tw-p-6`}
                    />
                  </IconButton>
                </AlertDialog>
              </Box>
            );
          })}
        </Box>
      )}
    </ImageUploading>
  );
}
