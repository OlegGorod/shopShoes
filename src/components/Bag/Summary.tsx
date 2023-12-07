import {
  Box,
  Button,
  Divider,
  Input,
  Typography,
  useMediaQuery,
} from '@mui/material';

import FieldInSummary from '@/components/Bag/FieldInSummary';
import CollapsibleArea from '@/components/UI/CollapsibleArea';
import constants from '@/constants/Bag';

export default function Summary({totalCoast}: {totalCoast: number}) {
  const matches = useMediaQuery('(min-width:1024px)');

  const countTotal = () => {
    return Math.ceil(
      +totalCoast + +constants.SHIPPING_PRICE + +constants.TAXES,
    );
  };

  return (
    <Box className="tw-flex tw-justify-start tw-flex-col lg:tw-gap-10 tw-gap-0">
      <Box className="tw-w-full">
        <Typography
          variant="h3"
          sx={{color: 'text.primary'}}
          className={`${!matches && 'tw-pb-4'} tw-pl-8`}
        >
          {constants.SUMMARY_CONTENT.HEADER}
        </Typography>

        {!matches && <Divider />}
      </Box>

      <Box className="tw-flex tw-flex-col tw-m-8">
        <CollapsibleArea
          className="tw-pl-0 tw-flex tw-justify-start tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
          title={constants.SUMMARY_CONTENT.TITLE_FOR_COLLAPSIBLE_AREA}
        >
          <Input
            autoFocus
            placeholder={constants.SUMMARY_CONTENT.INPUT_PLACEHOLDER}
            className="tw-w-full"
          />
        </CollapsibleArea>

        <Box className="tw-py-5">
          <FieldInSummary
            name="Subtotal"
            price={`${constants.DOLLAR_SIGN}${totalCoast}`}
          />

          <FieldInSummary
            name="Shipping"
            price={`${constants.DOLLAR_SIGN}${constants.SHIPPING_PRICE}`}
          />

          <FieldInSummary
            name="Tax"
            price={`${constants.DOLLAR_SIGN}${constants.TAXES}`}
          />
        </Box>

        <Divider />

        <FieldInSummary
          className="tw-font-semibold"
          name="Total"
          price={`${constants.DOLLAR_SIGN}${countTotal()}`}
        />

        <Divider />
      </Box>

      <Box className="tw-w-full tw-px-8 tw-my-10 lg:tw-my-0 ">
        <Button variant="contained" className="tw-w-full tw-rounded-lg">
          {matches
            ? constants.SUMMARY_CONTENT.BUTTON_TEXT
            : constants.BAG_CONTENT.CHECKOUT_BUTTON_TEXT}
        </Button>
      </Box>
    </Box>
  );
}
