import React from 'react'
import { MenuBottomProv } from '../../appContext/store'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import Slug from '../../components/slug'
import { fetchAPI } from '../../lib/api'
import { toBlogsPage } from '../../util/navigations'

function SlugPage({ selectedBlog, categories, homepage, ...props }) {
  return (
    <MenuBottomProv>
      <Layout>
        <Seo seo={homepage.seo} />
        <Slug selectedBlog={selectedBlog} />
        <Footer />
      </Layout>
    </MenuBottomProv>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  // Run API calls in parallel
  const [selectedBlog, categories, homepage] =
    await Promise.all([
      fetchAPI("/articles/"+slug),
      fetchAPI("/categories"),
      fetchAPI("/homepage"),
    ]);

  return {
    props: { selectedBlog, categories, homepage },
  };
}

export default SlugPage
