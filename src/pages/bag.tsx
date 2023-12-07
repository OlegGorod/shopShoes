import {CircularProgress} from '@mui/material';
import Head from 'next/head';
import {ReactElement, useEffect} from 'react';

import Bag from '@/components/Bag';
import EmptyBag from '@/components/Bag/EmptyBag';
import Header from '@/components/UI/Header';
import {useGetChartProducts} from '@/hooks/product/getChartProducts';
import {useBagContext} from '@/hooks/store/bag';

export default function BagPage() {
  const {data, isLoading, isError} = useGetChartProducts();
  const context = useBagContext();

  useEffect(() => {
    if (data && !isLoading && !isError && context.state) {
      const availableIds = data.map(el => el.id);
      const bagItemsIds = Object.keys(context.state).map(Number);

      bagItemsIds.forEach(id => {
        if (!availableIds.includes(id)) {
          context.removeProduct(id);
        }
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <CircularProgress
        style={{
          position: 'fixed',
          top: '45%',
          left: '50%',
        }}
        color="primary"
      />
    );
  }

  let bag = <EmptyBag />;
  if (data && data.length) {
    bag = <Bag items={data} />;
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      {bag}
    </>
  );
}

BagPage.getLayout = (page: ReactElement) => (
  <>
    <Header />
    {page}
  </>
);
