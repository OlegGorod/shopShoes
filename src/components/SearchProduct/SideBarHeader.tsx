import {Box, Divider, Typography, useMediaQuery} from '@mui/material';
import Image from 'next/image';

import constants from '@/constants/SearchProduct';

interface IProps {
  search: string | null;
  productsFound: number;
  closeMenu: () => void;
}

export default function SideBarHeader({
  search,
  productsFound,
  closeMenu,
}: IProps) {
  const matches = useMediaQuery('(max-width:750px)');

  if (matches) {
    return (
      <Box className="tw-pt-12">
        <Image
          width={15}
          height={15}
          alt="close"
          onClick={closeMenu}
          src="/icons/close.svg"
          className="tw-right-6 tw-top-6 tw-absolute tw-cursor-pointer"
        />
      </Box>
    );
  } else {
    return (
      <>
        <Box className="tw-px-5 tw-pt-5 tw-mb-4">
          <Typography variant="subtitle1" className="tw-text-[15px]">
            {constants.TEXT.CATEGORY}
            {search ?? 'All'}
          </Typography>
          <Typography
            sx={{
              '@media (max-width:376px)': {
                fontSize: 20,
              },
            }}
            variant="h3"
            className="tw-text-[20px]"
          >
            {search ?? 'All'} {productsFound > 0 && `(${productsFound})`}
          </Typography>
        </Box>
        <Divider className="tw-w-full" />
      </>
    );
  }
}
