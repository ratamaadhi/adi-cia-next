import React, { useRef, useState } from 'react';
import useSWR from 'swr';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import InvitationPopup from './InvitationPopup';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import LoadingPageWedding from './LoadingPageWedding';
import Image from 'next/image';
import { myLoader } from '../../lib/media';
import { shimmer, toBase64 } from '../../util/toBase64';
import MdFormat from '../../util/md';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import flowerFrame1 from '../../public/img/wedding/flowerFrame1.svg';

function WeddingComp({ data }) {
  console.log('WeddingComp data', data);

  // const { data: dataWeddingAPI, isValidating: isValidateWeddingAPI } = useSWR(
  //   '/wedding',
  //   fetchAPI
  // );

  const [openInvite, SetOpenInvite] = useState(false);

  const route = useRouter();
  const { query, isReady } = route;

  function isLoadingPage() {
    return !isReady;
  }

  const heroReff = useRef(null);
  const { scrollYProgress: scrlYHero } = useScroll({
    target: heroReff,
    offset: ['start start', 'end end'],
  });

  const scaleTextHero = useTransform(scrlYHero, [0, 0.4], ['100%', '250%']);
  const scaleFrameFlower = useTransform(scrlYHero, [0, 0.4], ['100%', '400%']);
  const opacityTextHero = useTransform(scrlYHero, [0, 0.4], ['100%', '0%']);
  const opacityTextHeroMin = useTransform(scrlYHero, [0, 0.4], ['-100%', '200%']);
  const lineTextHeroPlus = useTransform(scrlYHero, [0, 0.4], ['', '400%']);
  const opacityTextHeroBlur = useTransform(scrlYHero, [0, 1], ['100%', '0%']);
  const blurTextHero = useTransform(scrlYHero, [0.4, 1], ['0%', '100%']);
  const lineTextHero = useTransform(scrlYHero, [0.4, 1], ['0px', '180px']);
  const scaleImgSec1 = useTransform(scrlYHero, [0, 1], ['100%', '120%']);
  const opacityImgSec1 = useTransform(scrlYHero, [0.8, 1], ['100%', '0%']);

  return (
    <div className="relative bg-slate-950 min-h-screen w-full">
      <section className="max-w-screen-sm w-full mx-auto">
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
              style={{
                scale: scaleImgSec1,
                opacity: opacityImgSec1,
                willChange: 'transform',
              }}
            >
              <motion.div className="relative w-full h-full filter blur-[0.75px]">
                <div className="absolute w-full h-5/6 bottom-0 left-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/30" />
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

            {/* <motion.div
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
            </motion.div> */}
            <motion.div
              className="w-full h-screen absolute inset-0 -top-6 z-10 text-white text-center flex flex-col justify-center items-center gap-1"
              style={{
                willChange: 'transform',
              }}
            >
              <div className="absolute z-[9] top-0 left-0 w-full h-full">
                <div className="relative w-auto h-full flex items-center justify-center">
                  <motion.img
                    src={'/img/wedding/flowerFrame1.svg'}
                    alt="flower frame 1"
                    style={{
                      width: '100%',
                      opacity: opacityTextHeroBlur,
                      willChange: 'transform',
                      scale: scaleFrameFlower,
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <motion.h5
                  className="text-sm sm:text-base"
                  style={{
                    opacity: opacityTextHero,
                    scale: scaleTextHero,
                    willChange: 'transform',
                  }}
                >
                  Our Wedding
                </motion.h5>
              </div>
              <div className="relative text-center">
                <motion.div
                  className="h-[1px] bg-slate-50"
                  style={{
                    width: opacityTextHero,
                    translateX: opacityTextHeroMin,
                    opacity: opacityTextHero,
                    willChange: 'transform',
                  }}
                />
                <motion.h2
                  className="font-satisfy text-5xl sm:text-6xl md:text-7xl drop-shadow-sm"
                  style={{
                    opacity: opacityTextHero,
                    willChange: 'transform',
                    scale: scaleTextHero,
                  }}
                >
                  Adhi & Cia
                </motion.h2>
                <motion.div
                  className="h-[1px] bg-slate-50"
                  style={{
                    width: opacityTextHero,
                    translateX: opacityTextHero,
                    opacity: opacityTextHero,
                    willChange: 'transform',
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute w-full text-zinc-300 top-1/3 "
              style={{
                opacity: blurTextHero,
                willChange: 'transform',
              }}
            >
              <div className="text-center text-sm w-11/12 mx-auto prose max-w-none prose-sm md:prose-lg px-6 py-4 text-slate-50 rounded-sm">
                {/* {data?.Quotes[0]?.quoteText} */}
                <MdFormat
                  markdown={data?.Quotes[0]?.quoteText}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
                <p className="font-semibold">{data?.Quotes[0]?.authorQuote}</p>
              </div>
              <motion.div className="flex justify-center w-full">
                <motion.div
                  style={{
                    width: 1,
                    height: lineTextHero,
                    willChange: 'transform',
                  }}
                  className="bg-slate-50 h-full"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute md:hidden bottom-6 aspect-1 z-30 flex justify-center w-full h-[75px]"
              style={{
                opacity: opacityTextHero,
                willChange: 'transform',
              }}
            >
              <Image
                src="/gif/swipeUpWhite.gif"
                alt="swipeUpWhite"
                layout="fixed"
                width={75}
                height={75}
                className="object-cover opacity-50"
              />
            </motion.div>
            <motion.div
              className="absolute hidden bottom-6 aspect-1 z-30 md:flex justify-center w-full h-[75px]"
              style={{
                opacity: opacityTextHero,
                willChange: 'transform',
              }}
            >
              <Image
                src="/gif/scrollDownWhite.gif"
                alt="scrollDownWhite"
                layout="fixed"
                width={75}
                height={75}
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section className="max-w-screen-sm w-full bg-slate-950 text-zinc-300 mx-auto min-h-screen py-8">
        <div className="text-center text-sm w-11/12 mx-auto prose max-w-none prose-sm md:prose-lg bg-zinc-500 px-6 py-4 text-slate-50 rounded-sm">
          <p className="font-semibold">Section 2</p>
        </div>
      </section>
    </div>
  );
}

export default WeddingComp;
