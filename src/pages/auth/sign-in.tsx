import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {getServerSession} from 'next-auth';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

import AuthForm from '@/components/AuthPages/AuthForm';
import AuthLink from '@/components/AuthPages/AuthLink';
import AuthPageInfo from '@/components/AuthPages/AuthPageInfo';
import Layout from '@/components/AuthPages/Layout';
import constants from '@/constants/AuthPages';
import {signInValidationSchema} from '@/schemas/authValidation';
import {ISignInUser} from '@/types/auth/auth';

import {authOptions} from '../api/auth/[...nextauth]';

function ImageSide() {
  return (
    <section className="tw-fixed tw-bg-cover tw-h-screen tw-bg-shoe2 tw-bg-no-repeat tw-w-6/12 tw-left-1/2"></section>
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

export default function SignIn() {
  const {push} = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const action = async (user: ISignInUser) => {
    setLoadingStatus(true);
    setErrorMsg('');
    const res = await signIn('credentials', {
      ...user,
      redirect: false,
    });

    if (res && !res.ok) {
      setErrorMsg(res?.error || '');
    } else {
      push('/profile/my-products');
    }
    setLoadingStatus(false);
  };

  return (
    <Layout imageSide={<ImageSide />} isLoading={loadingStatus}>
      <>
        <Head>
          <title>Sign in</title>
        </Head>

        <AuthPageInfo
          title={constants.TITLE.SIGN_IN}
          info={constants.INFO.SIGN_IN}
        />

        <AuthForm
          type="sign-in"
          errorMsg={errorMsg}
          submitForm={action}
          validationSchema={signInValidationSchema}
        />

        <AuthLink
          text={constants.LINK.SIGN_UP}
          linkText="Sign up"
          link="/auth/sign-up"
        />
      </>
    </Layout>
  );
}
