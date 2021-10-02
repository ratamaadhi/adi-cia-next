import { MenuBottomProv } from "../appContext/store";
import Footer from "../components/footer";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Galleries = ({
  homepage,
  galleries,
  ...props
}) => {
  return (
    <MenuBottomProv>
      <Layout>
        <Seo seo={homepage.seo} />
        <Gallery galleries={galleries} />
        <Footer />
      </Layout>
    </MenuBottomProv>
  )
}
export async function getStaticProps() {
  // Run API calls in parallel
  const [ homepage, galleries ] =
    await Promise.all([
      fetchAPI("/homepage"),
      fetchAPI("/galleries"),
    ]);

  return {
    props: { homepage, galleries },
    revalidate: 1,
  };
}

export default Galleries
