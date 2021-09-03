import { useRouter } from 'next/router'
import { useState } from 'react'
import Banner from '../components/banner'
import Footer from '../components/footer'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage, moments, ...props }) => {

  return (
    <Layout >
      <Seo seo={homepage.seo}/>
      <Hero homepage={homepage}/>
      <Banner moments={moments} homepage={homepage} />
      <Footer />
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage, moments] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
    fetchAPI("/moments"),
  ]);

  return {
    props: { articles, categories, homepage, moments },
    revalidate: 1,
  };
}

export default Home
