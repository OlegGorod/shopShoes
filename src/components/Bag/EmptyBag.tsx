import {Box, Button, IconButton, Typography, useTheme} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import constants from '@/constants/Bag';

export default function EmptyBag() {
  const theme = useTheme();

  return (
    <Box className="tw-pl-8 lg:tw-pl-24 tw-pt-8">
      <Typography variant="h3" sx={{color: theme.palette.text.primary}}>
        {constants.EMPTY_BAG_CONTENT.HEADER}
      </Typography>

      <Box className="tw-flex tw-flex-col tw-items-center tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-text-center">
        <IconButton className="tw-p-7" aria-label="return to the shop">
          <Image
            src="/icons/bag-tick.svg"
            width={20}
            height={20}
            alt="Basket"
          />
        </IconButton>

        <Typography variant="subtitle1">
          {constants.EMPTY_BAG_CONTENT.SYBTITLE1}
        </Typography>

        <Typography variant="subtitle2">
          {constants.EMPTY_BAG_CONTENT.SYBTITLE2}
        </Typography>

        <Link href="/">
          <Button variant="contained" className="tw-mt-7 tw-px-6 tw-rounded-lg">
            {constants.EMPTY_BAG_CONTENT.BUTTON_TEXT}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
