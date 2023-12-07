import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

import {productAPI} from '@/api/product';
import constants from '@/constants/Header';
import {useBagContext} from '@/hooks/store/bag';
import {TPopularSearchTerm} from '@/types/header';

import SearchInput from '../Header/SearchInput';
import ProfileSideBar from './ProfileSidebar';

export default function Header() {
  const matches = useMediaQuery('(min-width: 768px)');
  const {data, status} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [inputIsActive, setInputIsActive] = useState(false);
  const [popularSearchTerms, setPopularSearchTerms] = useState<
    Array<TPopularSearchTerm> | []
  >([]);

  const {state} = useBagContext();

  let productCount;

  if (state === null || !Object.keys(state).length) {
    productCount = 0;
  } else {
    productCount = Object.values(state)
      .flatMap(Object.values)
      .reduce((prev, cur) => cur + prev, 0);
  }

  useEffect(() => {
    (async () => {
      const response = await productAPI.getAllProductsNames();
      response && setPopularSearchTerms(response);
    })();
  }, []);

  return (
    <AppBar className="tw-sticky tw-top-0 tw-flex tw-justify-center tw-bg-none tw-shadow-none tw-bg-white">
      <Toolbar className="tw-flex tw-justify-between tw-items-center tw-py-4">
        <Box className="tw-flex tw-items-center tw-gap-8">
          <Link href="/">
            <Image src="/icons/logo.svg" alt="logo" width={40} height={30} />
          </Link>

          <Link
            href="/"
            className="tw-hidden md:tw-flex tw-font-medium tw-no-underline tw-text-black"
          >
            {constants.LINK_TEXT.PRODUCTS}
          </Link>
        </Box>

        <Box className="tw-flex tw-items-center tw-gap-8">
          {status === 'unauthenticated' && (
            <Link href="/auth/sign-in" className="tw-flex tw-no-underline">
              <Button variant="outlined" className="tw-w-36 tw-h-12">
                {constants.LINK_TEXT.SIGN_IN}
              </Button>
            </Link>
          )}

          <SearchInput
            inputIsActive={inputIsActive}
            setInputIsActive={setInputIsActive}
            popularSearchTerms={popularSearchTerms.filter(
              (value, index, arr) =>
                index === arr.findIndex(t => t.id === value.id),
            )}
          />

          <Box className="tw-flex tw-items-center tw-gap-4">
            <Link href="/bag">
              <Badge badgeContent={productCount} color="primary">
                <Image
                  src="/icons/bag.svg"
                  alt="shopping bag"
                  width={24}
                  height={24}
                />
              </Badge>
            </Link>

            {matches && status === 'authenticated' && (
              <Link
                href="/profile/my-products"
                className="tw-hidden md:tw-flex"
              >
                <Image
                  src={data?.user?.avatar || '/images/defaultAvatar.jpg'}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="tw-rounded-full tw-object-cover"
                />
              </Link>
            )}

            {!matches && status === 'authenticated' && (
              <Box className="md:tw-hidden tw-flex">
                <IconButton size="large" onClick={() => setIsOpen(!isOpen)}>
                  <MenuIcon />
                </IconButton>

                <ProfileSideBar
                  isOpen={isOpen}
                  close={() => setIsOpen(false)}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>

      <Divider />
    </AppBar>
  );
}
