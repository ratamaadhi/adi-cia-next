import React from 'react'
import { SWRConfig } from 'swr'
import { MenuBottomProv } from '../../appContext/store'
import Blog from '../../components/blog'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'

function BlogsPage({ fallback, homepage, articles, categories}) {
  return (
    <MenuBottomProv>
      <SWRConfig value={{fallback}}>
        <Layout>
          <Seo seo={homepage.seo} />
          <Blog />
          <Footer />
        </Layout>
      </SWRConfig>
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
    props: { fallback: {
      '/articles' : articles,
      '/categories' : categories,
    }, homepage },
    revalidate: 1,
  };
}

export default BlogsPage
