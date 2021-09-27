import { useRouter } from "next/router";
import { useState } from "react";
import { MenuBottomProv } from "../appContext/store";
import AboutUs from "../components/aboutUs";
import Banner from "../components/banner";
import Blog from "../components/blog";
import Footer from "../components/footer";
import Gallery from "../components/gallery";
import Hero from "../components/hero";
import Layout from "../components/layout";
import Moment from "../components/moment";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({
  articles,
  categories,
  homepage,
  moments,
  galleries,
  ...props
}) => {
  return (
    <MenuBottomProv>
      <Layout>
        <Seo seo={homepage.seo} />
        <Hero homepage={homepage} />
        <Banner moments={moments} homepage={homepage} />
        <AboutUs homepage={homepage} />
        <Gallery galleries={galleries} />
        <Blog articles={articles} categories={categories} />
        <Moment moments={moments}/>
        <Footer />
      </Layout>
    </MenuBottomProv>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage, moments, galleries] =
    await Promise.all([
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

export default Home;
