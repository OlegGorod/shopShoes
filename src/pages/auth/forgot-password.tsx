import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {getServerSession} from 'next-auth';

import AuthForm from '@/components/AuthPages/AuthForm';
import AuthPageInfo from '@/components/AuthPages/AuthPageInfo';
import Layout from '@/components/AuthPages/Layout';
import ReturnLinkUI from '@/components/UI/ReturnLinkUI';
import constants from '@/constants/AuthPages';
import {useForgotPassword} from '@/hooks/auth/forgotPassword';
import {forgotPasswordValidationSchema} from '@/schemas/authValidation';

import {authOptions} from '../api/auth/[...nextauth]';

function ImageSide() {
  return (
    <section className="tw-fixed tw-w-6/12 tw-left-1/2 tw-h-screen tw-bg-cover tw-bg-shoe3 tw-bg-no-repeat"></section>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/profile/my-products',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function ForgotPassword() {
  const {error, mutate} = useForgotPassword();

  return (
    <Layout imageSide={<ImageSide />}>
      <>
        <Head>
          <title>Forgot password</title>
        </Head>

        <AuthPageInfo
          title={constants.TITLE.FORGOT_PASSWORD}
          info={constants.INFO.FORGOT_PASSWORD}
        />

        <AuthForm
          type="forgot-password"
          submitForm={({email}) => mutate({email})}
          validationSchema={forgotPasswordValidationSchema}
          errorMsg={error?.error.message || ''}
        />

        <ReturnLinkUI text={constants.LINK.LOG_IN} link="/auth/sign-in" />
      </>
    </Layout>
  );
}
