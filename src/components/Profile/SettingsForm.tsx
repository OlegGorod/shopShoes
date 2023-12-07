import {Button, CircularProgress} from '@mui/material';
import {useFormik} from 'formik';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

import AvatarUpload from '@/components/Profile/AvatarUpload';
import constants from '@/constants/Profile';
import {updateUserValidationSchema as validationSchema} from '@/schemas/updateUserValidation';
import {IUpdateUser} from '@/types/user/updateUser';

import InputUI from '../UI/InputUI';

const SettingsForm = ({
  className,
  submitForm,
}: {
  className?: string;
  submitForm: (
    user: IUpdateUser,
    avatar: File | null | undefined,
    userId: string | number,
    token: string,
  ) => void;
}) => {
  const {data: session} = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>();

  const formik = useFormik({
    initialValues: {
      username: session?.user?.name ?? '',
      email: session?.user?.email ?? '',
      phoneNumber: session?.user?.phoneNumber ?? '',
    },
    initialTouched: {
      username: false,
      email: false,
      phoneNumber: false,
    },
    onSubmit: values => {
      submitForm(
        values,
        selectedFile,
        session?.user?.id as string,
        session?.jwt as string,
      );
    },
    validationSchema,
  });

  const {setValues} = formik;

  useEffect(() => {
    if (session) {
      setValues({
        username: session.user?.name ?? '',
        email: session.user?.email ?? '',
        phoneNumber: session.user?.phoneNumber ?? '',
      });
    }
  }, [session, setValues]);

  const isError = () => {
    return Object.keys(formik.errors).length > 0;
  };

  if (!session) {
    return <CircularProgress color="primary" />;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`tw-flex tw-flex-col tw-w-full tw-max-w-[430px] ${className}`}
    >
      <AvatarUpload
        className="tw-mb-7"
        avatar={session?.user?.avatar ?? '/images/defaultAvatar.jpg'}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />

      <InputUI
        id="username"
        type="text"
        label={constants.INPUT_LABEL.USERNAME}
        required={true}
        value={formik.values.username}
        placeholder={constants.INPUT_PLACEHOLDER.USERNAME}
        errorMsg={formik.errors.username}
        changeText={formik.handleChange('username')}
        error={formik.touched.username && Boolean(formik.errors.username)}
        onBlur={formik.handleBlur}
      />

      <InputUI
        id="email"
        type="email"
        label={constants.INPUT_LABEL.EMAIL}
        required={true}
        value={formik.values.email}
        placeholder={constants.INPUT_PLACEHOLDER.EMAIL}
        errorMsg={formik.errors.email}
        changeText={formik.handleChange('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        onBlur={formik.handleBlur}
      />

      <InputUI
        id="phoneNumber"
        type="tel"
        label={constants.INPUT_LABEL.PHONE}
        required={true}
        value={formik.values.phoneNumber}
        placeholder={constants.INPUT_PLACEHOLDER.PHONE}
        errorMsg={formik.errors.phoneNumber}
        changeText={formik.handleChange('phoneNumber')}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        onBlur={formik.handleBlur}
      />

      <Button
        type="submit"
        variant="contained"
        className="tw-mt-10"
        disabled={isError()}
      >
        {constants.BUTTON_TEXT.SAVE}
      </Button>
    </form>
  );
};

export default SettingsForm;
