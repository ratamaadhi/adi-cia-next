import { SWRConfig } from "swr";
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
  fallback,
  articles,
  categories,
  homepage,
  moments,
  galleries,
  ...props
}) => {
  return (
    <MenuBottomProv>
      <SWRConfig value={{fallback}}>
        <Layout>
          <Seo seo={homepage.seo} />
          <Hero homepage={homepage} />
          <Banner />
          <AboutUs />
          <Gallery />
          <Blog />
          <Moment />
          <Footer />
        </Layout>
      </SWRConfig>
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
    props: { fallback:{
      '/homepage' : homepage,
      '/articles' : articles,
      '/categories' : categories,
      '/moments' : moments,
      '/galleries' : galleries,
    }, homepage },
    revalidate: 1,
  };
}

export default Home;
