import { SWRConfig } from "swr";
import { MenuBottomProv } from "../appContext/store";
import Footer from "../components/footer";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI, getStrapiURL } from "../lib/api";

const Galleries = ({ fallback, homepage, galleries, ...props }) => {
  return (
    <MenuBottomProv>
      <SWRConfig value={{fallback}}>
        <Layout>
          <Seo seo={homepage.seo} />
          <Gallery />
          <Footer />
        </Layout>
      </SWRConfig>
    </MenuBottomProv>
  );
};


export async function getStaticProps() {
  // Run API calls in parallel
  const [homepage, galleries] = await Promise.all([
    fetchAPI("/homepage"),
    fetchAPI("/galleries"),
  ]);

  return {
    props: {
      fallback: {
        '/galleries': galleries,
      },
      homepage,
    },
    revalidate: 1,
  };
}

export default Galleries;
