import React from 'react';
import { SWRConfig } from 'swr';
import { fetchAPI } from '../../lib/api';
import Seo from '../../components/seo';
import WeddingComp from '../../components/WeddingComp/WeddingClientComp';

function WeddingPage({ fallback, weddingCl }) {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Seo seo={weddingCl.seoWedding} />
        <WeddingComp data={weddingCl} />
      </SWRConfig>
    </>
  );
}

export async function getStaticPaths() {
  const weddingClients = await fetchAPI("/wedding-clients");
  const paths = weddingClients.map((weddCl) => ({
    params: { slug: weddCl.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // Run API calls in parallel
  const [weddingCl] = await Promise.all([fetchAPI(`/wedding-clients/${slug}`)]);

  return {
    props: {
      fallback: {
        ['/wedding-clients/'+ slug] : weddingCl,
      },
      weddingCl,
    },
    revalidate: 1,
  };
}

export default WeddingPage;
