import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().positive().required(),
  gender: Yup.number().required(),
  brand: Yup.number().required(),
  description: Yup.string().max(300),
  sizes: Yup.array().of(Yup.string()).min(1),
  color: Yup.number().required(),
  categories: Yup.array().of(Yup.string()).min(1),
  images: Yup.array().min(1),
});
