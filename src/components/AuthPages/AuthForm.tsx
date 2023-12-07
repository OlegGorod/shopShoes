import {Button, FormControl, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useFormik} from 'formik';
import Link from 'next/link';
import {FormEvent, useMemo, useState} from 'react';
import {AnyObject} from 'yup';

import InputUI from '@/components/UI/InputUI';
import constants from '@/constants/AuthPages';
import {ISignUpUser} from '@/types/auth/auth';

interface IProps {
  errorMsg: string;
  validationSchema: AnyObject;
  submitForm: (values: ISignUpUser) => void;
  type: 'sign-in' | 'sign-up' | 'reset-password' | 'forgot-password';
}

const btnTitle = {
  'sign-in': 'Sign in',
  'sign-up': 'Sign up',
  'reset-password': 'Reset password',
  'forgot-password': 'Reset password',
};

export default function AuthForm({
  errorMsg,
  submitForm,
  type,
  validationSchema,
}: IProps) {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: values => {
      submitForm(values);
      formik.resetForm();
    },
    validationSchema,
  });
  const matches = useMediaQuery('(max-width:425px)');
  const [apiErrorMsg, setApiErrorMsg] = useState<string>('');

  useMemo(() => {
    setApiErrorMsg(errorMsg);
  }, [errorMsg]);

  const btnErrorStatus = (): boolean => {
    switch (type) {
      case 'sign-in':
        return (
          !formik.isValid ||
          formik.values.email.length === 0 ||
          formik.values.password.length === 0
        );

      case 'sign-up':
        return (
          !formik.isValid ||
          Object.values(formik.values).some(
            (value: string) => value.length === 0,
          )
        );

      case 'forgot-password':
        return !formik.isValid || formik.values.email.length === 0;

      case 'reset-password':
        return (
          !formik.isValid ||
          formik.values.password.length === 0 ||
          formik.values.passwordConfirmation.length === 0
        );

      default:
        throw new Error(constants.ERROR.BUTTON_STATUS);
    }
  };

  const handelInputChange = (e: FormEvent<HTMLInputElement>): void => {
    formik.handleChange(e);
    errorMsg && setApiErrorMsg('');
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`tw-flex tw-flex-col tw-w-full ${
        matches ? 'tw-max-w-xs' : 'tw-max-w-[436px]'
      }`}
    >
      {type === 'sign-up' && (
        <InputUI
          id="name"
          type="text"
          label={constants.INPUT_LABEL.NAME}
          required={true}
          value={formik.values.name}
          placeholder={constants.INPUT_PLACEHOLDER.NAME}
          errorMsg={apiErrorMsg || formik.errors.name}
          changeText={handelInputChange}
          error={
            !!apiErrorMsg ||
            (formik.touched.name && Boolean(formik.errors.name))
          }
          onBlur={formik.handleBlur}
        />
      )}

      {(type === 'sign-up' ||
        type === 'sign-in' ||
        type === 'forgot-password') && (
        <InputUI
          id="email"
          type="email"
          label={constants.INPUT_LABEL.EMAIL}
          required={true}
          value={formik.values.email}
          errorMsg={apiErrorMsg || formik.errors.email}
          placeholder={constants.INPUT_PLACEHOLDER.EMAIL}
          changeText={handelInputChange}
          error={
            !!apiErrorMsg ||
            (formik.touched.email && Boolean(formik.errors.email))
          }
          onBlur={formik.handleBlur}
        />
      )}

      {(type === 'sign-up' ||
        type === 'sign-in' ||
        type === 'reset-password') && (
        <InputUI
          id="password"
          required={true}
          type="password"
          label={constants.INPUT_LABEL.PASSWORD}
          value={formik.values.password}
          changeText={handelInputChange}
          errorMsg={apiErrorMsg || formik.errors.password}
          placeholder={constants.INPUT_PLACEHOLDER.PASSWORD}
          error={
            !!apiErrorMsg ||
            (formik.touched.password && Boolean(formik.errors.password))
          }
          onBlur={formik.handleBlur}
        />
      )}

      {type === 'sign-in' && (
        <FormControl className="tw-flex tw-mt-1 tw-items-center tw-justify-end tw-flex-row">
          <Link
            href="/auth/forgot-password"
            className="tw-no-underline tw-text-base"
            style={{color: theme.palette.error.main}}
          >
            {constants.LINK.FORGOT_PASSWORD}
          </Link>
        </FormControl>
      )}

      {(type === 'sign-up' || type === 'reset-password') && (
        <InputUI
          id="passwordConfirmation"
          required={true}
          type="password"
          label={constants.INPUT_LABEL.PASSWORD_CONFIRMATION}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
          changeText={formik.handleChange}
          placeholder={constants.INPUT_PLACEHOLDER.PASSWORD_CONFIRMATION}
          errorMsg={constants.ERROR.PASSWORD_CONFIRMATION}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
        />
      )}

      <Button
        type="submit"
        variant="contained"
        className="tw-mt-10"
        disabled={btnErrorStatus()}
      >
        {btnTitle[type]}
      </Button>
    </form>
  );
}
