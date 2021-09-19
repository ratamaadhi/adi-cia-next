import { useRouter } from 'next/router'
import { useState } from 'react'
import AboutUs from '../components/aboutUs'
import Banner from '../components/banner'
import Footer from '../components/footer'
import Gallery from '../components/gallery'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage, moments, galleries, ...props }) => {

  return (
    <Layout >
      <Seo seo={homepage.seo}/>
      <Hero homepage={homepage}/>
      <Banner moments={moments} homepage={homepage} />
      <AboutUs homepage={homepage}/>
      <Gallery galleries={galleries}/>
      <Footer />
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage, moments, galleries] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
    fetchAPI("/moments"),
    fetchAPI("/galleries"),
  ]);

  return {
    props: { articles, categories, homepage, moments, galleries },
    revalidate: 1,
  };
}

export default Home
