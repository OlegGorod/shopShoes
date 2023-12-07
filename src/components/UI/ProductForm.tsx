import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {ImageListType} from 'react-images-uploading';

import ImageUploader from '@/components/AddProduct/ImageUploader';
import SizeBadge from '@/components/product/SizeBadge';
import TextArea from '@/components/UI/TextArea';
import constants from '@/constants/AddProduct';
import {productValidationSchema as validationSchema} from '@/schemas/productValidation';
import {TProductData} from '@/types/product/addProduct';
import {
  IBrand,
  ICategory,
  IColor,
  IFilters,
  IGender,
} from '@/types/product/filters';

import InputUI from './InputUI';
import SelectUI from './SelectUI';

interface TProps {
  initialValues: TProductData;
  submitForm: (value: TProductData) => void;
  filters: IFilters;
  isUpload: boolean;
  chosenSizes?: Array<string | number>;
}

export default function ProductForm({
  initialValues,
  submitForm,
  filters,
  isUpload,
  chosenSizes,
}: TProps) {
  const [sizesIdList, setSizesIdList] = useState<Array<string | number>>(
    initialValues.sizes || [],
  );
  const [chosenSizesValues, setChosenSizesValues] = useState<
    Array<string | number>
  >(chosenSizes ?? []);
  const [imagesList, setImagesList] = useState<ImageListType>(
    initialValues.images ?? [],
  );
  const media = useMediaQuery('(min-width:1280px)');

  const formik = useFormik({
    initialValues,

    onSubmit: values => {
      submitForm(values);
      formik.resetForm();
      setSizesIdList([]);
      setChosenSizesValues([]);
      setImagesList([]);
    },

    validationSchema,
  });

  const onSizeChanging = (value: string | number) => {
    const sizeId = filters.sizes.find(
      size => size.attributes.value === value,
    )!.id;

    if (sizesIdList.includes(sizeId)) {
      setChosenSizesValues([...chosenSizesValues].filter(el => el !== value));
      setSizesIdList([...sizesIdList].filter(el => el !== sizeId));
    } else {
      setChosenSizesValues([...chosenSizesValues, value]);
      setSizesIdList([...sizesIdList, sizeId]);
    }
  };

  const onImageChanging = (newImages: ImageListType) => {
    setImagesList(newImages);
  };

  useEffect(() => {
    formik.setFieldValue('sizes', sizesIdList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizesIdList]);

  useEffect(() => {
    formik.setFieldValue('images', imagesList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  return (
    <Box>
      <Backdrop
        open={isUpload}
        sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <form
        id="productForm"
        onSubmit={formik.handleSubmit}
        className="tw-flex tw-flex-col xl:tw-flex-row tw-justify-between tw-items-center lg:tw-items-start tw-gap-12"
      >
        <Box className="tw-flex tw-flex-col tw-w-full">
          <InputUI
            id="name"
            type="text"
            label={constants.INPUT_LABEL.NAME}
            value={formik.values.name}
            placeholder={constants.INPUT_PLACEHOLDER.NAME}
            errorMsg={formik.errors.name}
            changeText={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            onBlur={formik.handleBlur}
          />

          <InputUI
            id="price"
            type="number"
            label={constants.INPUT_LABEL.PRICE}
            value={`${formik.values.price > 0 ? formik.values.price : ''}`}
            placeholder={constants.INPUT_PLACEHOLDER.PRICE}
            errorMsg={formik.errors.price}
            changeText={formik.handleChange}
            error={formik.touched.price && !!formik.errors.price}
            onBlur={formik.handleBlur}
          />

          <Box className="tw-flex tw-gap-4">
            <SelectUI
              list={filters.genders as IGender[]}
              chosen={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="gender"
              label={constants.INPUT_LABEL.GENDER}
              isMulti={false}
            />

            <SelectUI
              list={filters.brands as IBrand[]}
              chosen={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="brand"
              label={constants.INPUT_LABEL.BRAND}
              isMulti={false}
            />
          </Box>

          <Box className="tw-flex tw-gap-4">
            <SelectUI
              list={filters.colors as IColor[]}
              chosen={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="color"
              label={constants.INPUT_LABEL.COLOR}
              isMulti={false}
            />

            <SelectUI
              list={filters.categories as ICategory[]}
              chosen={formik.values.categories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="categories"
              label={constants.INPUT_LABEL.CATEGORIES}
              isMulti={true}
            />
          </Box>

          <TextArea
            id="description"
            label={constants.INPUT_LABEL.DESCRIPTION}
            placeholder={constants.INPUT_PLACEHOLDER.DESCRIPTION}
            value={formik.values.description}
            error={!!formik.touched.description && !!formik.errors.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            minRows={6}
          />

          <Typography className="tw-my-6 tw-text-black">
            {constants.INPUT_LABEL.SIZES}
          </Typography>

          <Box className="tw-grid lg:tw-grid-cols-5 tw-grid-cols-3  tw-min-w-max tw-gap-4">
            {filters.sizes.map(size => (
              <SizeBadge
                key={size.id}
                size={size.attributes.value}
                available={true}
                selected={chosenSizesValues.includes(size.attributes.value)}
                onSelect={onSizeChanging}
              />
            ))}
          </Box>
        </Box>

        <ImageUploader
          handleChange={onImageChanging}
          label={constants.INPUT_LABEL.IMAGES}
          images={imagesList}
          maxNumber={10}
        />
      </form>

      <Button
        type="submit"
        variant="contained"
        className={
          media
            ? 'tw-absolute tw-top-0 tw-right-8 tw-px-14 tw-mt-10'
            : `tw-px-14 tw-my-10 tw-w-full tw-m-auto`
        }
        disabled={!formik.isValid}
        form="productForm"
      >
        {constants.FORM.BUTTON_TEXT}
      </Button>
    </Box>
  );
}
