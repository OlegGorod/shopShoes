import * as Yup from 'yup';

const QuantityValidationSchema = Yup.number()
  .typeError('Numbers only')
  .min(1, 'Too few!')
  .max(99, 'Too much!')
  .integer('integers only')
  .nonNullable();

export default QuantityValidationSchema;
