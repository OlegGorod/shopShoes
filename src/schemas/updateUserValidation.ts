import {object, string} from 'yup';

export const updateUserValidationSchema = object({
  username: string().required('No name provided.'),
  email: string().required('No email provided.').email(),
  phoneNumber: string()
    .required('No phone provided.')
    .matches(/^\d{10}$/, 'Invalid number'),
});
