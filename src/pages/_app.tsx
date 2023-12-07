import '@mui/material/styles';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material/styles';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {SessionProvider} from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import {ReactElement, ReactNode, useState} from 'react';
import {ToastContainer} from 'react-toastify';

import {BagContextProvider} from '@/Providers/BagContext';
import {theme} from '@/styles/theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || (page => page);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Head>
        <title>Shoes shop</title>
      </Head>

      <NextNProgress color="#FE645E" height={5} showOnShallow={true} />

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <BagContextProvider>
              <>
                <ToastContainer
                  draggable
                  rtl={false}
                  closeOnClick
                  pauseOnHover
                  theme="light"
                  pauseOnFocusLoss
                  autoClose={5000}
                  newestOnTop={false}
                  position="top-right"
                  hideProgressBar={false}
                />
                {getLayout(<Component {...pageProps} />)}
              </>
            </BagContextProvider>
          </SessionProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
