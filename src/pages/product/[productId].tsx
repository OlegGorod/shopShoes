import {Button, Container, Stack, Typography} from '@mui/material';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import {ReactElement, useContext, useState} from 'react';

import {productAPI} from '@/api/product';
import {productFiltersAPI} from '@/api/productFilters';
import ImageGallery from '@/components/product/ImageGallery';
import SizeBadge from '@/components/product/SizeBadge';
import Header from '@/components/UI/Header';
import constants from '@/constants/Product';
import {BagContext} from '@/store/Bag';
import {ISize} from '@/types/product/filters';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [product, sizes] = await Promise.all([
    productAPI.getProduct(`${ctx.params?.productId}`),
    productFiltersAPI.getSizes(),
  ]);

  if (!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {props: {product, sizes}};
};

const ProductPage = ({
  product,
  sizes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const bagContext = useContext(BagContext);
  const [selectedSize, setSelectedSize] = useState<
    string | number | undefined
  >();

  const addToChart = (): void => {
    bagContext?.addProduct(product.id, +selectedSize!);
  };

  return (
    <Container
      maxWidth="lg"
      component="section"
      className="tw-py-6 tw-flex tw-flex-wrap xl:tw-flex-nowrap tw-justify-center tw-gap-16"
    >
      <Head>
        <title>{product.attributes.name}</title>

        <meta
          name="description"
          content={product.attributes.description}
        ></meta>
      </Head>

      <div className="tw-relative">
        <ImageGallery
          className="tw-sticky tw-top-28"
          images={product.attributes.images.data}
        />
      </div>

      <div className="tw-flex-grow tw-max-w-full xl:tw-max-w-[40%]">
        <div className="tw-flex tw-items-end tw-justify-between">
          <Typography
            variant="h3"
            component="h1"
            className="tw-font-semibold tw-text-wrap"
          >
            {product.attributes.name}
          </Typography>
          <Typography variant="h6" className="tw-font-semibold">
            {product.attributes.price}$
          </Typography>
        </div>

        <Typography
          variant="subtitle1"
          className="tw-text-[#5C5C5C] tw-font-semibold tw-mt-4"
        >
          {product.attributes.gender.data.attributes.name}&apos;s Shoes
        </Typography>

        <Typography
          variant="subtitle1"
          className="tw-text-[#5C5C5C] tw-font-semibold tw-mt-9"
        >
          {constants.TEXT.SIZE}
        </Typography>

        <Stack className="tw-grid tw-grid-cols-[repeat(auto-fill,80px)] tw-gap-4 tw-justify-between tw-mt-4">
          {sizes.map(({id, attributes}: ISize) => {
            return (
              <SizeBadge
                key={id}
                size={attributes.value}
                onSelect={setSelectedSize}
                selected={attributes.value === selectedSize}
                available={product.attributes.sizes.data.some(
                  (el: ISize) => el.id === id,
                )}
              />
            );
          })}
        </Stack>

        <Stack
          direction="row"
          className="tw-gap-5 xl:tw-justify-between tw-mt-9"
        >
          <Button
            variant="outlined"
            className="tw-px-6 tw-py-3 md:tw-w-1/2 md:tw-py-4 tw-hidden"
          >
            {constants.BUTTON_TEXT.FAVORITE}
          </Button>

          <Button
            variant="contained"
            onClick={addToChart}
            className="tw-shadow-none tw-px-6 tw-py-3 md:tw-w-1/2 md:tw-py-4"
            disabled={!selectedSize}
          >
            {constants.BUTTON_TEXT.CHART}
          </Button>
        </Stack>

        <Typography
          variant="subtitle1"
          className="tw-text-[#5C5C5C] tw-font-semibold tw-mt-16"
        >
          {constants.TEXT.DESCRIPTION_HEADER}
        </Typography>

        <Typography variant="body1" className="tw-mt-4">
          {product.attributes.description}
        </Typography>
      </div>
    </Container>
  );
};

ProductPage.getLayout = (page: ReactElement) => (
  <>
    <Header />
    {page}
  </>
);

export default ProductPage;
