import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';

import constants from '@/constants/SearchProduct';

interface IProps {
  search: string | null;
  productsFound: number;
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function ContentHeader({
  isOpen,
  search,
  productsFound,
  toggleDrawer,
}: IProps) {
  const isMobile = useMediaQuery('(max-width:426px)');

  if (isMobile) {
    return (
      <Box>
        <Typography variant="h3" className="tw-px-4">
          {constants.TEXT.HEADER}
        </Typography>

        <Divider className="tw-w-full tw-my-2.5" />
        <Box className="tw-flex tw-px-4 tw-justify-between tw-items-end">
          <Box>
            <Typography variant="subtitle1">
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
            >
              {search ?? 'All'} {productsFound > 0 && `(${productsFound})`}
            </Typography>
          </Box>

          <IconButton
            onClick={toggleDrawer}
            className="tw-rounded-lg tw-mb-[-5px] tw-p-[5px]"
          >
            <Typography variant="subtitle1">{constants.TEXT.FILTER}</Typography>

            <Image
              width={24}
              height={24}
              alt="Search filter"
              src="/icons/filter.svg"
              className="tw-ml-1 text-[#5C5C5C]"
            />
          </IconButton>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className="tw-mb-2.5 tw-flex tw-items-end tw-justify-between">
        <Typography variant="h3">{constants.TEXT.HEADER}</Typography>

        <IconButton onClick={toggleDrawer} className="tw-rounded-lg">
          <Typography variant="subtitle2">
            {isOpen ? 'Hide' : 'Open'} {constants.TEXT.FILTER}
          </Typography>

          <Image
            width={24}
            height={24}
            alt="Search filter"
            src="/icons/filter.svg"
            className="tw-ml-1 text-[#5C5C5C]"
          />
        </IconButton>
      </Box>
    );
  }
}
