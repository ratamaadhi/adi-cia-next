import React from "react";
import { SWRConfig } from "swr";
import { MenuBottomProv } from "../../appContext/store";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Slug from "../../components/slug";
import { fetchAPI } from "../../lib/api";

function SlugPage({ fallback, slug, homepage, ...props }) {
  return (
    <MenuBottomProv>
      <SWRConfig value={{ fallback }}>
        <Layout>
          <Seo seo={homepage.seo} />
          <Slug slug={slug}/>
          <Footer />
        </Layout>
      </SWRConfig>
    </MenuBottomProv>
  );
}
export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // Run API calls in parallel
  const [selectedBlog, homepage] = await Promise.all([
    fetchAPI("/articles/" + slug),
    fetchAPI("/homepage"),
  ]);

  return {
    props: {
      fallback: {
        ["/articles/" + slug]: selectedBlog,
      },
      homepage,
      slug,
    },
    revalidate: 1,
  };
}

export default SlugPage;
