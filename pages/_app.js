import '../styles/globals.css'
import 'swiper/swiper.scss';
import Head from 'next/head';
import App from "next/app";
import { GlobalContext } from '../appContext/store'
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
import { useContext, useEffect } from 'react';
function MyApp({ Component, pageProps }) {

  const { global } = pageProps;

  useEffect(() => {
    document.querySelector('html').classList.add(localStorage.getItem('theme'))
  }, [])

  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href={getStrapiMedia(global.favicon)} />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <GlobalContext.Provider value={global}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </>
    )
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp
