import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {getServerSession} from 'next-auth';

import AuthForm from '@/components/AuthPages/AuthForm';
import AuthPageInfo from '@/components/AuthPages/AuthPageInfo';
import Layout from '@/components/AuthPages/Layout';
import ReturnLinkUI from '@/components/UI/ReturnLinkUI';
import constants from '@/constants/AuthPages';
import {useResetPassword} from '@/hooks/auth/resetPassword';
import {resetPasswordValidationSchema} from '@/schemas/authValidation';

import {authOptions} from '../api/auth/[...nextauth]';

function ImageSide() {
  return (
    <section className="tw-fixed tw-w-6/12 tw-left-1/2 tw-h-screen tw-bg-cover tw-bg-shoe3 tw-bg-no-repeat"></section>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {query} = context;
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/profile/my-products',
        permanent: false,
      },
    };
  }

  if (!query.code) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default function ResetPassword() {
  const {query} = useRouter();
  const {mutate} = useResetPassword();

  return (
    <Layout imageSide={<ImageSide />}>
      <>
        <Head>
          <title>Reset password</title>
        </Head>

        <AuthPageInfo
          title={constants.TITLE.RESET_PASSWORD}
          info={constants.INFO.RESET_PASSWORD}
        />

        <AuthForm
          type="reset-password"
          submitForm={({password, passwordConfirmation}) => {
            mutate({
              passwordConfirmation,
              password,
              code: query.code as string,
            });
          }}
          errorMsg=""
          validationSchema={resetPasswordValidationSchema}
        />

        <ReturnLinkUI text={constants.LINK.LOG_IN} link="/auth/sign-in" />
      </>
    </Layout>
  );
}
