import React from 'react';
import { SWRConfig } from 'swr';
import { fetchAPI } from '../../lib/api';
import Seo from '../../components/seo';
import WeddingComp from '../../components/WeddingComp';

function WeddingPage({ fallback, wedding }) {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Seo seo={wedding.seoWedding} />
        <WeddingComp data={wedding} />
      </SWRConfig>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [wedding] = await Promise.all([fetchAPI('/wedding')]);

  return {
    props: {
      fallback: {
        '/wedding': wedding,
      },
      wedding,
    },
    revalidate: 1,
  };
}

export default WeddingPage;
