import {Box, Button, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {ReactElement} from 'react';

import Header from '@/components/UI/Header';
import constants from '@/constants/ErrorPages/404';
import {theme} from '@/styles/theme';

function Custom404() {
  const {push, back} = useRouter();
  const {status} = useSession();

  const goBack = () => {
    back();
  };

  const goMain = () => {
    if (status === 'authenticated') {
      push('/');
    } else {
      push('/auth/sign-in');
    }
  };

  return (
    <Box className="md:tw-flex-row tw-flex tw-flex-col-reverse tw-h-screen tw-relative">
      <Box className="tw-flex tw-justify-center tw-items-center md:tw-w-1/2">
        <Box className="tw-flex tw-flex-col tw-w-3/4 lg:tw-w-1/2 md:tw-items-start tw-items-center tw-mx-5 md:tw-mx-0">
          <Box
            className="md:tw-static tw-absolute tw-top-0 tw-z-10 tw-w-full tw-px-6 md:tw-p-0 tw-pt-20 tw-text-center md:tw-text-left md:tw-bg-inherit"
            sx={{backgroundColor: theme.palette.customColors.background404}}
          >
            <Typography variant="h3">{constants.TEXT.HEADER}</Typography>

            <Typography variant="body2" className="tw-mt-2">
              {constants.TEXT.PARAGRAPH}
            </Typography>
          </Box>

          <Box className="tw-flex tw-gap-4 tw-items-start md:tw-mt-5 tw-mt-9 tw-mb-10">
            <Button
              onClick={goBack}
              variant="outlined"
              className="tw-w-36 tw-rounded-lg"
            >
              {constants.BUTTON_TEXT.RETURN}
            </Button>

            <Button
              onClick={goMain}
              variant="contained"
              className="tw-w-36 tw-rounded-lg"
            >
              {constants.BUTTON_TEXT.HOME}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="tw-relative tw-h-full md:tw-w-1/2 tw-max-w-full md:tw-mt-0 tw-mt-36">
        <Image
          src="/images/error-mobile.jpeg"
          fill
          alt="error"
          className="tw-rounded-b-[39px] md:tw-rounded-none tw-object-cover"
        />
      </Box>
    </Box>
  );
}

Custom404.getLayout = (page: ReactElement) => (
  <>
    <Header />
    {page}
  </>
);

export default Custom404;
