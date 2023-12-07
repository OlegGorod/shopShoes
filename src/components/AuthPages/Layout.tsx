import {Backdrop, CircularProgress, useMediaQuery} from '@mui/material';
import {useIsMutating} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {ReactElement} from 'react';

interface IProps {
  isLoading?: boolean;
  children: ReactElement;
  imageSide: ReactElement;
}

export default function Layout({isLoading, imageSide, children}: IProps) {
  const matches = useMediaQuery('(max-width:960px)');
  const isSignUp = useIsMutating({mutationKey: ['sign-up']});
  const isResetPassword = useIsMutating({mutationKey: ['reset-password']});
  const isForgotPassword = useIsMutating({mutationKey: ['forgot-password']});

  return (
    <>
      <Backdrop
        open={isLoading || !!(isSignUp || isResetPassword || isForgotPassword)}
        sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <main className="tw-flex tw-flex-row">
        <section
          className={`${
            matches ? 'tw-w-full' : 'tw-w-6/12'
          } tw-flex-col tw-flex tw-mx-2.5`}
        >
          <header className="tw-px-8 tw-py-10">
            <Link href="/">
              <Image
                width={40}
                height={30}
                alt="Company logo"
                src="/icons/logo.svg"
              />
            </Link>
          </header>

          <section className="tw-flex-col tw-flex tw-justify-center tw-items-center tw-my-4">
            {children}
          </section>
        </section>
        {!matches && imageSide}
      </main>
    </>
  );
}
