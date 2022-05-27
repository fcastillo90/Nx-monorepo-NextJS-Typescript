import { wrapper } from '@/store';
import { theme } from '@fcastillo90/netflix-ui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useGetMovieGenreListQuery, getMovieGenreList, getRunningOperationPromises as movieGetRunningOperationPromises } from '@/store/services/ApiMovieSlice';
import { useGetSerieGenreListQuery, getSerieGenreList, getRunningOperationPromises as serieGetRunningOperationPromises } from '@/store/services/ApiSerieSlice';
import { useRouter } from 'next/router';

// Server side Api calls
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
      store.dispatch(getMovieGenreList.initiate(null))
      store.dispatch(getSerieGenreList.initiate(null))
  
      await Promise.all([movieGetRunningOperationPromises(), serieGetRunningOperationPromises()]);
  
      return {
        props: {},
      };
    }
  );

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useGetMovieGenreListQuery(null, {
    skip: router.isFallback,
  });
  useGetSerieGenreListQuery(null, {
    skip: router.isFallback,
  });
  return (
    <>
      <Head>
        <title>Welcome to netflix!</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(App);
