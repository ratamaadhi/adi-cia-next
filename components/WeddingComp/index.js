import React, { useRef, useState } from "react";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/router";
import InvitationPopup from "./InvitationPopup";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
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

  const heroReff = useRef(null);
  const { scrollYProgress: scrlYHero } = useScroll({
    target: heroReff,
    offset: ["start start", "end end"],
  });

  const scaleFrameFlower = useTransform(scrlYHero, [0, 1], ["100%", "250%"]);
  const opacityFrameFlower = useTransform(scrlYHero, [0.8, 1], ["100%", "0%"]);
  const scaleTextHero = useTransform(scrlYHero, [0, 0.4], ["100%", "200%"]);
  const opacityTextHero = useTransform(scrlYHero, [0, 0.4], ["100%", "0%"]);
  const blurTextHero = useTransform(scrlYHero, [0, 0.4], ["100%", "0%"]);
  const scaleImgSec1 = useTransform(scrlYHero, [0, 1], ["100%", "120%"]);
  const opacityImgSec1 = useTransform(scrlYHero, [0.8, 1], ["100%", "0%"]);
  console.log("opacityImgSec1", opacityImgSec1);

  return (
    <div className="relative bg-slate-950 min-h-screen w-full">
      <div className="max-w-screen-2xl mx-auto">
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

        {/* Hero section */}
        <motion.div
          className="relative w-full h-[250vh] mx-auto"
          ref={heroReff}
        >
          {/* Sticky container */}
          <div className="w-full h-screen sticky overflow-hidden top-0">
            <motion.div
              className="absolute z-0 top-0 left-0 w-full h-full"
              style={{ scale: scaleImgSec1, opacity: opacityImgSec1 }}
            >
              <motion.div className="relative w-full h-full filter blur-[0.75px]">
                <div className="absolute w-full h-full bg-violet-950/40 top-0 left-0 z-10" />
                <Image
                  src={data.imageSection1.formats.medium.url}
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
                  className={`w-full h-full object-cover`}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute z-20 top-0 left-0 w-full h-[100vh]"
              // style={{ scale: scrlYHero }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ scale: scaleFrameFlower, opacity: opacityFrameFlower }}
              >
                <Image
                  src="/img/frame_flower.png"
                  alt="Flower Frame"
                  layout="fill"
                  className="object-cover drop-shadow-xl blur-[2px] saturate-50"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full h-screen absolute inset-0 -top-6 z-10 text-white text-center flex flex-col justify-center items-center gap-4"
              style={{
                opacity: opacityTextHero,
                scale: scaleTextHero,
              }}
            >
              <motion.h5
                className="text-base"
                style={{
                  textShadow: `0 0 ${opacityTextHero}px white`,
                  color: "transparent",
                }}
              >
                The Wedding Celebration Of
              </motion.h5>
              <motion.h2
                className="font-satisfy text-6xl md:text-7xl drop-shadow-sm"
                style={{
                  textShadow: `0 0 32px white`,
                  color: "transparent",
                }}
              >
                Adhi & Cia
              </motion.h2>
            </motion.div>
          </div>
        </motion.div>
        {/* <div className="h-screen w-full bg-slate-950"></div> */}
      </div>
    </div>
  );
}

export default WeddingComp;
