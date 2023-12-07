import {
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {Box} from '@mui/system';
import Image from 'next/image';
import {useState} from 'react';
import * as Yup from 'yup';

import TrashCan from '@/../public/icons/trash.svg';
import QuantityInput from '@/components/Bag/QuantityInput';
import AlertDialog from '@/components/UI/AlertDialog';
import CollapsibleArea from '@/components/UI/CollapsibleArea';
import constants from '@/constants/Bag';
import {useBagContext} from '@/hooks/store/bag';
import QuantityValidationSchema from '@/schemas/quantityValidation';
import Link from 'next/link';

type TProps = {
  imageSrc: string;
  name: string;
  id: string;
  category: string;
  status: string;
  size: number;
  quantity: number;
  price: number;
  isLast: boolean;
};

export default function ItemInBag({
  imageSrc,
  name,
  id,
  quantity,
  category,
  status,
  size,
  price,
  isLast,
}: TProps) {
  const bagContext = useBagContext();
  const [inputError, setInputError] = useState<null | string>(null);

  const matches = useMediaQuery('(min-width:1280px)');
  const matchesLg = useMediaQuery('(min-width:1024px)');

  const theme = useTheme();

  const handleSetQuantity = async (value: number) => {
    setInputError(null);
    try {
      await QuantityValidationSchema.validate(value);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setInputError(error.message);
      }

      return;
    }

    bagContext.changeProductAmount(+id, size, value);
  };

  return (
    <Box className="tw-w-full tw-relative">
      <Box className="tw-flex lg:tw-gap-8 tw-gap-6 tw-p-6 tw-w-full">
        <Link href={`/product/${id}`}>
          <Box
            sx={{
              width: matchesLg
                ? constants.ITEM_IMAGE_SIZES.LARGE_WIDTH
                : constants.ITEM_IMAGE_SIZES.SMALL_WIDTH,
              height: matchesLg
                ? constants.ITEM_IMAGE_SIZES.LARGE_HEIGHT
                : constants.ITEM_IMAGE_SIZES.SMALL_HEIGHT,
              position: 'relative',
            }}
          >
            <Image
              loader={() => imageSrc}
              src={imageSrc}
              fill
              className="tw-object-cover"
              alt="item in chart photo"
            />
          </Box>
        </Link>

        <Box className="tw-flex tw-flex-col tw-justify-between tw-w-full">
          <Box className="tw-flex tw-justify-between tw-gap-6 tw-w-full">
            <Box className="tw-w-[30vw]">
              <Typography
                variant="h5"
                className="lg:tw-text-xl tw-text-base tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                {name}
              </Typography>

              <Typography>{`EU-${size}`}</Typography>

              <Typography
                variant="subtitle1"
                className="lg:tw-text-lg tw-text-base"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {category}
              </Typography>

              {matches && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.customColors.red,
                  }}
                  className="tw-font-semibold"
                >
                  {status}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography
                variant="h6"
                className="lg:tw-text-xl tw-text-base"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                {`${constants.DOLLAR_SIGN}${price}`}
              </Typography>
            </Box>
          </Box>

          <Box className="tw-flex xl:tw-justify-end tw-justify-between tw-items-end xl:tw-items-center tw-gap-3 ">
            {matches ? (
              <>
                <QuantityInput
                  quantity={quantity}
                  setQuantity={handleSetQuantity}
                  inputError={inputError}
                  setInputError={setInputError}
                />

                <Typography
                  variant="subtitle1"
                  sx={{color: theme.palette.text.secondary}}
                >
                  {constants.ITEM_IN_BAG_CONTENT.INPUT}
                </Typography>
              </>
            ) : (
              <CollapsibleArea
                title={constants.ITEM_IN_BAG_CONTENT.INPUT}
                className=" tw-pl-0"
              >
                <QuantityInput
                  quantity={quantity}
                  setQuantity={handleSetQuantity}
                  inputError={inputError}
                  setInputError={setInputError}
                />
              </CollapsibleArea>
            )}

            {matches && <Divider orientation="vertical" />}

            <AlertDialog
              message={constants.ITEM_IN_BAG_CONTENT.DIALOG_MESSAGE}
              handleAgree={() => bagContext.removeProduct(+id, size)}
            >
              <Button
                startIcon={
                  <Image
                    src={TrashCan}
                    alt={'delete'}
                    className="lg:tw-w-6 tw-w-4 tw-opacity-50"
                  />
                }
                variant="text"
                sx={{color: theme.palette.text.secondary}}
                className="tw-pr-0 lg:tw-p-2 "
              >
                <Typography
                  variant="subtitle1"
                  className="lg:tw-text-xl tw-text-base tw-opacity-50"
                >
                  {constants.BAG_CONTENT.DELETE_BUTTON_TEXT}
                </Typography>
              </Button>
            </AlertDialog>
          </Box>
        </Box>
      </Box>

      {!isLast && matches && <Divider />}
    </Box>
  );
}
