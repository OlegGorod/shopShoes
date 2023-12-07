import {Box, Typography} from '@mui/material';
import {useIsMutating} from '@tanstack/react-query';
import Head from 'next/head';
import {ReactElement} from 'react';

import {productFiltersAPI} from '@/api/productFilters';
import Header from '@/components/UI/Header';
import ProductForm from '@/components/UI/ProductForm';
import ProfileLayout from '@/components/UI/ProfileLayout';
import constants from '@/constants/AddProduct';
import {useAddProduct} from '@/hooks/product/addProduct';
import {TProductData} from '@/types/product/addProduct';
import {IFilters} from '@/types/product/filters';

export const getServerSideProps = async () => {
  try {
    const [brands, categories, colors, genders, sizes] = await Promise.all([
      productFiltersAPI.getBrands(),
      productFiltersAPI.getCategories(),
      productFiltersAPI.getColors(),
      productFiltersAPI.getGenders(),
      productFiltersAPI.getSizes(),
    ]);
    return {
      props: {filters: {brands, categories, colors, genders, sizes}},
    };
  } catch (error) {
    console.log(error);
  }
};

const AddProduct = ({filters}: {filters: IFilters}) => {
  const {mutate} = useAddProduct();
  const isUpload = useIsMutating({mutationKey: ['add-product']});

  return (
    <main className="tw-flex tw-flex-col tw-items-center xl:tw-flex-row xl:tw-items-start tw-gap-16">
      <Head>
        <title>Add Product</title>
      </Head>

      <Box className="tw-flex tw-flex-col tw-gap-10 tw-p-6">
        <Box className="tw-flex tw-flex-col tw-max-w-3xl">
          <Typography variant="h3">{constants.FORM.HEADER_TEXT}</Typography>

          <Typography variant="subtitle2">
            {constants.FORM.PARAGRAPH}
          </Typography>
        </Box>

        <ProductForm
          initialValues={{
            name: '',
            price: 0,
            gender: filters.genders[0].id,
            brand: filters.brands[0].id,
            categories: [],
            description: '',
            sizes: [],
            color: '',
            images: [],
          }}
          submitForm={(product: TProductData) => mutate(product)}
          filters={filters}
          isUpload={!!isUpload}
        />
      </Box>
    </main>
  );
};

AddProduct.getLayout = (page: ReactElement) => (
  <>
    <Header />
    <ProfileLayout>{page}</ProfileLayout>
  </>
);

export default AddProduct;
