import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {useTheme} from '@mui/system';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {getServerSession, User} from 'next-auth';
import {ReactElement} from 'react';

import {productAPI} from '@/api/product';
import {productFiltersAPI} from '@/api/productFilters';
import ProductCard from '@/components/product/ProductCard';
import Header from '@/components/UI/Header';
import ProfileLayout from '@/components/UI/ProfileLayout';
import constants from '@/constants/Profile';
import {useGetProduct} from '@/hooks/product/getUserProducts';
import {IProduct} from '@/types/product/product';

import {authOptions} from '../api/auth/[...nextauth]';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const userId = session?.user?.id;
  if (!userId || !session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }

  const [products, brands, categories, colors, genders, sizes] =
    await Promise.all([
      productAPI.getUsersProducts(userId, `${session.jwt}`),
      productFiltersAPI.getBrands(),
      productFiltersAPI.getCategories(),
      productFiltersAPI.getColors(),
      productFiltersAPI.getGenders(),
      productFiltersAPI.getSizes(),
    ]);

  return {
    props: {
      products: products || [],
      filters: {brands, categories, colors, genders, sizes},
      user: {...session.user, image: null},
    },
  };
};

const MyProductsPage = ({
  products,
  filters,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:750px)');
  const isMobile = useMediaQuery('(max-width:426px)');
  const {data, isLoading} = useGetProduct(`${user?.id}`, products);

  return (
    <section
      className={`${!matches && 'tw-px-8 tw-pt-8'} tw-pb-8 tw-flex-grow`}
    >
      <Head>
        <title>My products</title>
      </Head>

      <article>
        <Box className="tw-w-full tw-h-[150px] tw-bg-cover tw-bg-no-repeat tw-bg-profileCover"></Box>

        <Box className="tw-flex tw-items-center tw-gap-4 tw-px-10 tw-relative tw-mt-[-23px] tw-z-50">
          <Image
            width={90}
            height={90}
            alt="avatar"
            src={user?.avatar || '/images/defaultAvatar.jpg'}
            className="tw-rounded-bl-full tw-border-4 tw-border-solid tw-border-white tw-object-cover tw-rounded-full"
          />

          <Box className="tw-mt-5">
            <Typography
              variant="subtitle1"
              className="tw-font-medium tw-text-base"
            >
              {user?.name}
            </Typography>

            <Typography
              variant="subtitle2"
              className="tw-font-medium tw-text-sm"
            >
              {constants.TEXT.BONUS_DEFAULT}
            </Typography>
          </Box>
        </Box>
      </article>

      <article
        className={`${matches && 'tw-px-2.5'} ${
          isMobile ? 'tw-mt-[20px]' : 'tw-mt-[50px]'
        }`}
      >
        <Box className="tw-mb-6 tw-flex tw-justify-between tw-items-center">
          <Typography variant="h3" component="h1">
            {constants.TEXT.MY_PRODUCTS_HEADER}
          </Typography>

          <Link href="/product/add">
            <Button
              variant="contained"
              className={`${
                (isMobile || (data || []).length == 0) && 'tw-hidden'
              } tw-w-[152px] tw-h-10`}
            >
              {constants.BUTTON_TEXT.ADD_PRODUCT}
            </Button>
          </Link>

          <Link
            href="/product/add"
            style={{backgroundColor: theme.palette.primary.main}}
            className={`${
              !isMobile && 'tw-hidden'
            } tw-w-9 tw-h-9 tw-flex tw-rounded-full tw-items-center tw-justify-center`}
          >
            <AddRoundedIcon sx={{color: 'white'}} />
          </Link>
        </Box>

        <Box className="tw-justify-center tw-flex-wrap tw-flex">
          {isLoading ? (
            <CircularProgress className="tw-mt-10" color="primary" />
          ) : (
            (data || []).map((product: IProduct) => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  userId={`${(user as User).id}`}
                  authorId={`${product.attributes.userID?.data.id}`}
                  filters={filters}
                />
              );
            })
          )}

          {(data || []).length == 0 && !isLoading && (
            <Box className="tw-mt-2 tw-flex tw-flex-col tw-items-center tw-justify-center">
              <Box className="tw-flex tw-items-center tw-justify-center tw-bg-[#F9FAFB] tw-w-[72px] tw-h-[72px] tw-rounded-full">
                <Image
                  alt="add to bag"
                  className="tw-mb-1"
                  src="/icons/bag-add.svg"
                  width={!matches ? 20 : 15}
                  height={!matches ? 20 : 15}
                />
              </Box>

              <Typography variant="subtitle1" className="tw-my-1">
                {constants.TEXT.NO_PRODUCTS}
              </Typography>

              <Typography variant="subtitle2">{constants.TEXT.HINT}</Typography>

              <Link href="/product/add">
                <Button
                  variant="contained"
                  className={'tw-w-[152px] tw-h-10 tw-mt-8'}
                >
                  {constants.BUTTON_TEXT.ADD_PRODUCT}
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </article>
    </section>
  );
};

MyProductsPage.getLayout = (page: ReactElement) => (
  <>
    <Header />
    <ProfileLayout>{page}</ProfileLayout>
  </>
);

export default MyProductsPage;
