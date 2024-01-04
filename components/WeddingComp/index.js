import React, { useState } from "react";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/router";
import InvitationPopup from "./InvitationPopup";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPageWedding from "./LoadingPageWedding";
import Image from "next/image";
import { myLoader } from "../../lib/media";
import { shimmer, toBase64 } from "../../util/toBase64";

function WeddingComp({ data }) {
  console.log("WeddingComp data", data);

  // const { data: dataWeddingAPI, isValidating: isValidateWeddingAPI } = useSWR(
  //   '/wedding',
  //   fetchAPI
  // );

  const [openInvite, SetOpenInvite] = useState(false);

  const route = useRouter();
  const { query, isReady } = route;
  console.log("route", route);
  console.log("isReady", isReady);
  console.log("query", query);

  function isLoadingPage() {
    return !isReady;
  }

  return (
    <div className="relative bg-slate-950 min-h-screen w-full">
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

      {/* Sticky container */}
      <div className="w-full h-screen sticky overflow-hidden top-0">
        <motion.div className="absolute z-0 top-0 left-0 w-full h-full">
          <div className="relative w-full h-full">
            <div className="absolute w-full h-full bg-blend-color bg-violet-950/40 top-0 left-0 z-10" />
            <Image
              src={data.imageSection1.url}
              loader={myLoader}
              alt={data.imageSection1.hash}
              layout="fill"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  data.imageSection1.formats.thumbnail.width,
                  data.imageSection1.formats.thumbnail.height
                )
              )}`}
              className={`absolute top-0 left-0 hover:scale-110 z-0 cursor-pointer object-cover`}
            />
          </div>
        </motion.div>

        <motion.div className="absolute z-20 top-0 left-0 w-full h-[120vh]">
          <div className="relative w-full h-full">
            <Image
              src="/img/frame_flower.png"
              alt="Flower Frame"
              layout="fill"
              className="object-cover"
            />
          </div>
        </motion.div>
        <motion.div className="w-full h-screen absolute inset-0 -top-6 z-10 text-white text-center flex flex-col justify-center items-center gap-4">
          <h5 className="text-base">The Wedding Celebration Of</h5>
          <h2 className="font-satisfy text-6xl">Adhi & Cia</h2>
        </motion.div>
      </div>
    </div>
  );
}

export default WeddingComp;
