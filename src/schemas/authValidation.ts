import {object, ref, string} from 'yup';

export const signInValidationSchema = object({
  email: string().required('No email provided.').email('Must be a valid email'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

export const signUpValidationSchema = object({
  name: string().required('No name provided.'),
  email: string().required('No email provided.').email('Must be a valid email'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirmation: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords must match'),
});

export const resetPasswordValidationSchema = object({
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirmation: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords must match'),
});

export const forgotPasswordValidationSchema = object({
  email: string().required('No email provided.').email('Must be a valid email'),
});
