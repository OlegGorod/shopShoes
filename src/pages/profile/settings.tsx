import {CircularProgress, Typography} from '@mui/material';
import Head from 'next/head';
import {ReactElement, useState} from 'react';

import SettingsForm from '@/components/Profile/SettingsForm';
import Header from '@/components/UI/Header';
import ProfileLayout from '@/components/UI/ProfileLayout';
import constants from '@/constants/Profile';
import {useUpdateProfile} from '@/hooks/user/updateProfile';
import {IUpdateUser} from '@/types/user/updateUser';

import {NextPageWithLayout} from '../_app';

const SettingsPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useUpdateProfile();

  const submitForm = (
    userData: IUpdateUser,
    avatar: File | null | undefined,
    userId: string | number,
    token: string,
  ) => {
    setIsLoading(true);
    mutation.mutate({userData, avatar, userId, token});
  };

  return (
    <section className="tw-p-14 tw-flex-grow">
      <Head>
        <title>Profile settings</title>
      </Head>

      <Typography variant="h3" component="h1">
        {constants.TEXT.MY_PROFILE_SETTINGS_HEADER}
      </Typography>

      {isLoading ? (
        <div className="tw-flex tw-justify-center tw-mt-10">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <SettingsForm className="tw-mt-10" submitForm={submitForm} />
      )}
    </section>
  );
};

SettingsPage.getLayout = (page: ReactElement) => (
  <>
    <Header />
    <ProfileLayout>{page}</ProfileLayout>
  </>
);

export default SettingsPage;
