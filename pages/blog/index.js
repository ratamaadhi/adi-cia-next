import React from 'react'
import { MenuBottomProv } from '../../appContext/store'
import Blog from '../../components/blog'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'

function BlogsPage({homepage, articles, categories}) {
  return (
    <MenuBottomProv>
      <Layout>
        <Seo seo={homepage.seo} />
        <Blog articles={articles} categories={categories} />
        <Footer />
      </Layout>
    </MenuBottomProv>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] =
    await Promise.all([
      fetchAPI("/articles"),
      fetchAPI("/categories"),
      fetchAPI("/homepage"),
    ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default BlogsPage
