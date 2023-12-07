import {Box, CircularProgress, Pagination, useMediaQuery} from '@mui/material';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {getServerSession, Session, User} from 'next-auth';
import {ReactElement, useEffect, useState} from 'react';

import {productAPI} from '@/api/product';
import {productFiltersAPI} from '@/api/productFilters';
import ProductCard from '@/components/product/ProductCard';
import ContentHeader from '@/components/SearchProduct/ContentHeader';
import FilterSideBar from '@/components/SearchProduct/FilterSideBar';
import Header from '@/components/UI/Header';
import {useGetAllProduct} from '@/hooks/product/getAllProducts';
import {IFilters} from '@/types/product/filters';
import {IPagination} from '@/types/product/pagination';
import {IProduct} from '@/types/product/product';

import {authOptions} from './api/auth/[...nextauth]';
import constants from '@/constants/SearchProduct';

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const [
    brands,
    categories,
    colors,
    genders,
    sizes,
    maxPrice,
    {products: initProducts, pagination: initPagination},
  ] = await Promise.all([
    productFiltersAPI.getBrands(),
    productFiltersAPI.getCategories(),
    productFiltersAPI.getColors(),
    productFiltersAPI.getGenders(),
    productFiltersAPI.getSizes(),
    productFiltersAPI.getMaxPrice(),
    session
      ? productAPI.getAllProducts(session.jwt)
      : productAPI.getAllProducts(),
  ]);

  if (session?.user) {
    session.user.image = null;
  }

  return {
    props: {
      filters: {brands, categories, colors, genders, sizes, maxPrice},
      initProducts,
      initPagination,
      session,
    },
  };
}) satisfies GetServerSideProps<{
  filters: IFilters;
  initProducts: Array<IProduct>;
  initPagination: IPagination;
  session: Session | null;
}>;

export default function Home({
  filters,
  initProducts,
  initPagination,
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {push} = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const [filterState, setFilterState] = useState<{
    [title: string]: Array<string | number>;
  }>({
    Gender: searchParams.get('Gender')?.split(',') || [],
    Brand: searchParams.get('Brand')?.split(',') || [],
    Category: searchParams.get('Category')?.split(',') || [],
    Color: searchParams.get('Color')?.split(',') || [],
    Size: searchParams.get('Size')?.split(',') || [],
    Price: searchParams.get('Price')?.split(',') || [
      0,
      filters.maxPrice ?? constants.PRICE_RANGE,
    ],
  });
  const [page, setPage] = useState(1);
  const search = searchParams.get('search');
  const {data, isFetching} = useGetAllProduct(
    session?.jwt!,
    {products: initProducts, pagination: initPagination},
    search,
    filterState,
    page,
  );

  const isMobile = useMediaQuery('(max-width:426px)');

  useEffect(() => {
    const params = new URLSearchParams();
    for (let key of Object.keys(filterState)) {
      if (filterState[key].length)
        params.append(key, filterState[key].join(','));
    }
    if (search) {
      params.append('search', search);
    }
    push({query: params.toString()}, undefined, {shallow: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState, search]);

  const toggleDrawer = () => {
    setIsOpen((state: boolean) => !state);
  };

  const onPriceChange = (newPrice: number[]) => {
    setFilterState(filters => {
      const newFilters = {...filters};
      newFilters.Price = newPrice;
      return newFilters;
    });
  };

  const onFilterChange = (category: string, value: string) => {
    setFilterState(filters => {
      const newFilters = {...filters};
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          name => name !== value,
        );
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilterState(filters => {
      const newFilters = {...filters};
      for (const key of Object.keys(newFilters)) {
        newFilters[key] = [];
        if (key === 'Price') {
          newFilters[key] = constants.PRICE_RANGE;
        }
      }
      return newFilters;
    });
  };

  const isChecked = (key: string, value: string) => {
    return filterState[key].includes(value);
  };

  return (
    <main className="tw-flex tw-relative tw-max-w-screen">
      <FilterSideBar
        isOpen={isOpen}
        search={search}
        filters={filters}
        productsFound={isFetching ? 0 : data.pagination.total}
        toggleDrawer={toggleDrawer}
        onFilterChange={onFilterChange}
        clearFilters={clearFilters}
        onPriceChange={onPriceChange}
        isChecked={isChecked}
        priceValue={
          filterState.Price.map(p => parseInt(p.toString())) as number[]
        }
      />

      <section
        className={`${!isOpen && 'tw-absolute'} ${
          !isMobile && 'tw-px-8'
        } tw-pt-8 tw-pb-8 tw-flex-grow tw-w-full`}
      >
        <ContentHeader
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          search={search}
          productsFound={isFetching ? 0 : data.pagination.total}
        />

        <Box className="tw-px-4 tw-justify-center tw-mt-2.5 tw-flex-wrap tw-flex">
          {isFetching && (
            <div className="tw-flex tw-justify-center tw-mt-10">
              <CircularProgress color="primary" />
            </div>
          )}

          {!isFetching && (
            <>
              {(data?.products).map((product: IProduct) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  userId={(session?.user as User)?.id}
                  authorId={product.attributes.userID?.data.id || ''}
                  filters={filters}
                />
              ))}
              {data?.products.length === 0 && (
                <p className="tw-mt-10">
                  Couldn&apos;t find anything for your request.
                </p>
              )}
            </>
          )}
        </Box>

        {!isFetching && data.pagination.pageCount > 1 && (
          <Box className="tw-flex tw-justify-center">
            <Pagination
              sx={{marginTop: '20px'}}
              page={page}
              onChange={(_, page) => setPage(page)}
              count={data.pagination.pageCount}
            />
          </Box>
        )}
      </section>
    </main>
  );
}

Home.getLayout = (page: ReactElement) => (
  <>
    <Header />
    {page}
  </>
);
