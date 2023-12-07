import {Box, Button, Typography} from '@mui/material';
import {styled} from '@mui/system';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {ReactElement} from 'react';

import Header from '@/components/UI/Header';
import constants from '@/constants/ErrorPages/500';

const CustomTypography = styled(Typography)({
  '@media (max-width: 560px)': {
    fontSize: '12px',
    color: '#FFF',
    fontWeight: 500,
  },
});

function Custom500() {
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
    <section className="tw-flex tw-justify-center md:tw-justify-normal tw-w-full tw-h-screen tw-bg-no-repeat tw-bg-cover tw-bg-none md:tw-bg-error500 ">
      <Box className="tw-flex tw-justify-center md:tw-items-center tw-items-[normal] tw-w-full md:tw-w-1/2">
        <Box className="tw-flex tw-flex-col md:tw-items-start tw-items-[normal] md:tw-gap-y-2 tw-gap-y-10 md:tw-ml-64 md:tw-mr-52 tw-mx-none md:tw-my-0 tw-my-10">
          <Typography variant="h3" className="md:tw-text-left tw-text-center">
            {constants.TEXT.HEADER}
          </Typography>

          <Box className="tw-relative tw-h-full md:tw-block tw-grid tw-items-end">
            <Image
              src="/images/error500-mobile.png"
              alt="error"
              fill
              priority={false}
              className="tw-z-[-1] md:tw-hidden tw-object-cover"
            />

            <CustomTypography
              variant="body2"
              className="md:tw-mt-2 md:tw-mx-0 tw-mx-10 md:tw-mb-0 tw-mb-8 md:tw-text-left tw-text-center"
            >
              {constants.TEXT.PARAGRAPH}
            </CustomTypography>
          </Box>

          <Box className="md:tw-flex tw-hidden tw-items-start tw-mt-5 tw-gap-4 ">
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

          <Button
            onClick={goMain}
            variant="contained"
            className="md:tw-hidden tw-mx-14"
          >
            {constants.BUTTON_TEXT.BACK_HOME}
          </Button>
        </Box>
      </Box>
    </section>
  );
}

Custom500.getLayout = (page: ReactElement) => (
  <>
    <Header />
    {page}
  </>
);

export default Custom500;
