import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {getServerSession} from 'next-auth';
import {useState} from 'react';

import AuthForm from '@/components/AuthPages/AuthForm';
import AuthLink from '@/components/AuthPages/AuthLink';
import AuthPageInfo from '@/components/AuthPages/AuthPageInfo';
import Comment from '@/components/AuthPages/Comment';
import Layout from '@/components/AuthPages/Layout';
import constants from '@/constants/AuthPages';
import {useSignUpUser} from '@/hooks/auth/signUp';
import {signUpValidationSchema} from '@/schemas/authValidation';
import {ISignUpUser} from '@/types/auth/auth';

import {authOptions} from '../api/auth/[...nextauth]';

function ImageSide() {
  const [currentCommentIndex, setCurrentCommentIndex] = useState<number>(0);

  return (
    <section className="tw-bg-cover tw-bg-shoe1 tw-h-screen tw-w-6/12 tw-left-1/2 tw-top-0 tw-right-0 tw-fixed tw-bg-no-repeat">
      <Comment
        rate={constants.comments[currentCommentIndex].rate}
        disablePrevBtn={currentCommentIndex === 0}
        author={constants.comments[currentCommentIndex].author}
        comment={constants.comments[currentCommentIndex].comment}
        location={constants.comments[currentCommentIndex].location}
        disableNextBtn={!(constants.comments.length - 1 > currentCommentIndex)}
        moveNext={() => setCurrentCommentIndex((state: number) => state + 1)}
        movePrev={() => setCurrentCommentIndex((state: number) => state - 1)}
      />
    </section>
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

export default function SignUp() {
  const {error, mutate} = useSignUpUser();

  return (
    <Layout imageSide={<ImageSide />}>
      <>
        <Head>
          <title>Sign up</title>
        </Head>

        <AuthPageInfo
          title={constants.TITLE.SIGN_UP}
          info={constants.INFO.SIGN_UP}
        />

        <AuthForm
          type="sign-up"
          errorMsg={error?.error.message || ''}
          validationSchema={signUpValidationSchema}
          submitForm={(user: ISignUpUser) => mutate(user)}
        />

        <AuthLink
          link="/auth/sign-in"
          text={constants.LINK.HAVE_ACCOUNT}
          linkText="Log in"
        />
      </>
    </Layout>
  );
}
