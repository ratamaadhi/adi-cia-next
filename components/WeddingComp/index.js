import React, { useState } from 'react';
import useSWR from 'swr';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import InvitationPopup from './InvitationPopup';
import { AnimatePresence } from 'framer-motion';
import LoadingPageWedding from './LoadingPageWedding';

function WeddingComp({ data }) {
  console.log('WeddingComp data', data);

  // const { data: dataWeddingAPI, isValidating: isValidateWeddingAPI } = useSWR(
  //   '/wedding',
  //   fetchAPI
  // );

  const [openInvite, SetOpenInvite] = useState(false);

  const route = useRouter();
  const { query, isReady } = route;
  console.log('route', route);
  console.log('isReady', isReady);
  console.log('query', query);

  function isLoadingPage() {
    return !isReady;
  }

  return (
    <div className="bg-slate-950 min-h-screen w-full">
      {isLoadingPage() && <LoadingPageWedding data={data} />}

      <AnimatePresence initial={false}>
        {query?.invite && !openInvite && (
          <InvitationPopup
            setOpen={SetOpenInvite}
            name={query?.invite}
            open={openInvite}
            data={data}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default WeddingComp;
