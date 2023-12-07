import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {signOut} from 'next-auth/react';
import {useSession} from 'next-auth/react';

import constants from '@/constants/Profile';

const ProfileSideBar = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const {data: session} = useSession();

  const pathname = usePathname();
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:768px)');

  const logOut = () => {
    signOut();
  };

  return (
    <>
      <Drawer
        anchor={matches ? 'right' : 'left'}
        variant={matches ? 'temporary' : 'persistent'}
        onClose={close}
        open={isOpen || !matches}
        className={`${!matches && ' tw-z-20'} tw-w-[280px]`}
        sx={{
          '& .MuiPaper-root': {
            top: 'auto',
          },
        }}
      >
        {matches && (
          <Box className="tw-h-20 tw-relative">
            <Image
              src="/icons/close.svg"
              width={15}
              height={15}
              alt="close"
              className="tw-right-6 tw-top-6 tw-absolute tw-cursor-pointer"
              onClick={close}
            />
          </Box>
        )}

        {!matches && (
          <>
            <Box className="tw-flex tw-mt-14 tw-items-center tw-gap-4 tw-px-10 ">
              <Image
                src={session?.user?.avatar ?? '/images/defaultAvatar.jpg'}
                className="tw-object-cover tw-rounded-full"
                width={64}
                height={64}
                alt="avatar"
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  className="tw-font-medium tw-text-sm"
                >
                  {constants.TEXT.GREETING}
                </Typography>

                <Typography
                  variant="subtitle1"
                  className="tw-font-medium tw-text-base"
                >
                  {session?.user?.name}
                </Typography>
              </Box>
            </Box>

            <Divider className="tw-my-8" />
          </>
        )}

        <nav>
          <ul className="tw-list-none tw-flex tw-flex-col tw-gap-9 tw-px-10">
            <li>
              <Link
                href="/profile/my-products"
                onClick={close}
                className="tw-flex tw-gap-4 tw-items-center tw-cursor-pointer"
                style={{
                  color:
                    pathname === '/profile/my-products'
                      ? theme.palette.primary.main
                      : 'inherit',
                }}
              >
                <Image
                  src="/icons/bag-tick.svg"
                  alt="my-products"
                  width={20}
                  height={20}
                  style={{
                    filter:
                      pathname === '/profile/my-products'
                        ? 'invert(62%) sepia(54%) saturate(3555%) hue-rotate(323deg) brightness(102%) contrast(99%)'
                        : 'inherit',
                  }}
                />

                <Typography
                  variant="subtitle1"
                  className="tw-font-medium tw-text-base"
                >
                  {constants.LINK_TEXT.MY_PRODUCTS}
                </Typography>
              </Link>
            </li>

            <li>
              <Link
                href="/profile/settings"
                onClick={close}
                className="tw-flex tw-gap-4 tw-items-center"
                style={{
                  color:
                    pathname === '/profile/settings'
                      ? theme.palette.primary.main
                      : 'inherit',
                }}
              >
                <Image
                  src="/icons/setting.svg"
                  alt="settings"
                  width={20}
                  height={20}
                  style={{
                    filter:
                      pathname === '/profile/settings'
                        ? 'invert(62%) sepia(54%) saturate(3555%) hue-rotate(323deg) brightness(102%) contrast(99%)'
                        : 'inherit',
                  }}
                />
                <Typography
                  variant="subtitle1"
                  className="tw-font-medium tw-text-base"
                >
                  {constants.LINK_TEXT.SETTINGS}
                </Typography>
              </Link>
            </li>

            <li
              className="tw-flex tw-gap-4 tw-items-center tw-cursor-pointer"
              onClick={logOut}
            >
              <Image
                src="/icons/logout.svg"
                alt="logout"
                width={20}
                height={20}
              />
              <Typography
                variant="subtitle1"
                className="tw-font-medium tw-text-base"
              >
                {constants.LINK_TEXT.LOG_OUT}
              </Typography>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default ProfileSideBar;
