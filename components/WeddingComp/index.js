import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import InvitationPopup from './InvitationPopup';
import {
  AnimatePresence,
  motion,
  useAnimation,
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
import { useInView } from 'react-intersection-observer';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md';

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
  const opacityTextHeroMin = useTransform(
    scrlYHero,
    [0, 0.4],
    ['-100%', '200%']
  );
  const opacityTextHeroBlur = useTransform(scrlYHero, [0, 1], ['100%', '0%']);
  const blurTextHero = useTransform(scrlYHero, [0.4, 1], ['0%', '100%']);
  const lineTextHero = useTransform(scrlYHero, [0.4, 1], ['0px', '180px']);
  const scaleImgSec1 = useTransform(scrlYHero, [0, 1], ['100%', '120%']);
  const opacityImgSec1 = useTransform(scrlYHero, [0.8, 1], ['100%', '0%']);

  const imageSection2Inview = useInView({ threshold: 0.8 });
  const imageSection2Control = useAnimation();

  const variantImageSection = {
    imageSection2Init: {
      opacity: 0,
      y: 200,
    },
    imageSection2Off: {
      opacity: 0,
      y: 200,
    },
    imageSection2On: {
      opacity: 1,
      y: 0,
    },
    transition1: {
      duration: 1,
      delay: 0.5,
      type: 'spring',
      bounce: 0.2,
    },
    transition2: {
      duration: 1.5,
      delay: 0.1,
      type: 'spring',
      bounce: 0.2,
    },
  };

  useEffect(() => {
    if (imageSection2Inview.inView) {
      imageSection2Control.start(variantImageSection.imageSection2On);
      imageSection2Control.start(variantImageSection.imageSection2On);
    } else {
      imageSection2Control.start(variantImageSection.imageSection2Off);
      imageSection2Control.start(variantImageSection.imageSection2Off);
    }
  }, [imageSection2Inview]);

  const imageCPPInview = useInView({ threshold: 0.5, triggerOnce: true });
  const imageCPPControl = useAnimation();

  const imageCPWInview = useInView({ threshold: 0.5, triggerOnce: true });
  const imageCPWControl = useAnimation();

  const variantimageCPP = {
    imageSectionInit: {
      opacity: 0,
      x: 200,
    },
    imageSectionOff: {
      opacity: 0,
      x: 200,
    },
    imageSectionOn: {
      opacity: 1,
      x: 0,
    },
    imageSection2Init: {
      opacity: 0,
      x: -200,
    },
    imageSection2Off: {
      opacity: 0,
      x: -200,
    },
    imageSection2On: {
      opacity: 1,
      x: 0,
    },
    transition1: {
      duration: 1,
      delay: 0.5,
      type: 'spring',
      bounce: 0.2,
    },
    transition2: {
      duration: 0.7,
      delay: 0.8,
      type: 'spring',
      bounce: 0.2,
    },
    transition3: {
      duration: 0.3,
      delay: 1.2,
      type: 'spring',
      bounce: 0.2,
    },
  };

  useEffect(() => {
    if (imageCPPInview.inView) {
      imageCPPControl.start(variantimageCPP.imageSection2On);
      imageCPPControl.start(variantimageCPP.imageSection2On);
    } else {
      imageCPPControl.start(variantimageCPP.imageSection2Off);
      imageCPPControl.start(variantimageCPP.imageSection2Off);
    }

    if (imageCPWInview.inView) {
      imageCPWControl.start(variantimageCPP.imageSectionOn);
      imageCPWControl.start(variantimageCPP.imageSectionOn);
    } else {
      imageCPWControl.start(variantimageCPP.imageSectionOff);
      imageCPWControl.start(variantimageCPP.imageSectionOff);
    }
  }, [imageCPPInview.inView, imageCPWInview.inView]);

  useEffect(() => {
    document
      .querySelector('html')
      .classList.add(
        ['scrollbar-thin'],
        ['scrollbar-thumb-palette-slate/70'],
        ['scrollbar-track-palette-slate/30'],
        ['scrollbar-thumb-rounded-md']
      );
  }, []);

  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupAudio = async () => {
      const newAudio = new Audio(data?.songPage?.url);
      setAudio(newAudio);
    };

    setupAudio();

    return () => {
      // Clean up the audio when the component unmounts
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  useEffect(() => {
    // Start playing when the component mounts
    const playAudio = () => {
      if (openInvite && audio && audio.readyState >= 3) {
        // Check if audio is not null and is ready to play
        audio.play();
      }
    };

    playAudio();

    if (audio) {
      const handleAudioPlay = () => {
        setIsPlaying(true);
      };

      const handleAudioPause = () => {
        setIsPlaying(false);
      };

      const handleAudioEnd = () => {
        // Reset the audio to the beginning when it ends
        audio.currentTime = 0;
        // Play again
        audio.play();
      };

      // Set up event listeners for the "playing" and "pause" events
      audio.addEventListener('playing', handleAudioPlay);
      audio.addEventListener('pause', handleAudioPause);

      // Set up event listener for the "ended" event
      audio.addEventListener('ended', handleAudioEnd);

      // Clean up the audio and remove the event listener when the component unmounts
      return () => {
        audio.pause();
        audio.removeEventListener('ended', handleAudioEnd);
        audio.removeEventListener('playing', handleAudioPlay);
        audio.removeEventListener('pause', handleAudioPause);
        audio.pause();
      };
    }
  }, [audio, openInvite]);

  return (
    <div className="relative bg-palette-stone min-h-screen w-full">
      {audio && (
        <div
          className={`fixed bottom-8 left-6 z-40 rounded-full bg-emerald-50 border border-palette-slate text-palette-slate w-7 h-7 flex justify-center items-center ${
            isPlaying > 0 ? 'animate-spin' : ''
          }`}
          onClick={() => (isPlaying ? audio.pause() : audio.play())}
        >
          {!isPlaying && (
            <MdOutlineMusicNote size={24} />
          )}
          {isPlaying && (
            <MdOutlineMusicOff size={24} />
          )}
        </div>
      )}
      <AnimatePresence initial={false}>
        {!openInvite && (
          <InvitationPopup
            setOpen={SetOpenInvite}
            name={query?.invite}
            open={openInvite}
            data={data}
          />
        )}
      </AnimatePresence>
      <section className="max-w-screen-sm w-full mx-auto">
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
                <div className="absolute w-full h-5/6 bottom-0 left-0 z-10 bg-gradient-to-t from-palette-stone via-palette-zinc/30" />
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
                    // className='blur-sm'
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
                  className="text-sm sm:text-base font-poppins"
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
                  className="font-playFair text-5xl sm:text-6xl md:text-7xl drop-shadow-sm"
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
              {data?.Quotes[0]?.quoteText && (
                <div className="text-center text-sm w-11/12 mx-auto prose max-w-none prose-sm md:prose-lg px-6 py-4 text-slate-50 rounded-sm">
                  {/* {data?.Quotes[0]?.quoteText} */}
                  <MdFormat
                    markdown={data?.Quotes[0]?.quoteText}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  />
                  {data?.Quotes[0]?.authorQuote && (
                    <p className="font-semibold">
                      {data?.Quotes[0]?.authorQuote}
                    </p>
                  )}
                </div>
              )}
              <motion.div className="flex justify-center w-full">
                <motion.div
                  style={{
                    width: 1,
                    height: lineTextHero,
                    willChange: 'transform',
                  }}
                  className="bg-slate-50"
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
      <section className="w-full bg-gradient-to-b from-palette-stone to-palette-zinc text-zinc-300 mx-auto relative pb-60">
        <div className="max-w-screen-sm w-full h-[416px] sm:h-[716px] mx-auto relative pb-8 ">
          <div className="absolute bottom-24 sm:bottom-28 left-[50%] translate-x-[-50%] w-7/12 mx-auto z-20">
            <motion.div
              initial={variantImageSection.imageSection2Init}
              animate={imageSection2Control}
              exit={variantImageSection.imageSection2Off}
              transition={variantImageSection.transition2}
              className="aspect-h-16 aspect-w-9 relative border-[16px] border-emerald-50 shadow-xl"
              ref={imageSection2Inview.ref}
            >
              <Image
                src={data.imageSection2.url}
                loader={myLoader}
                alt={data.imageSection2.hash}
                layout="fill"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(
                    data.imageSection2.formats.thumbnail.width,
                    data.imageSection2.formats.thumbnail.height
                  )
                )}`}
                className={`w-full h-full object-cover`}
              />
            </motion.div>
          </div>
          <AnimatePresence>
            {data?.Quotes[1]?.quoteText && (
              <motion.div
                initial={variantImageSection.imageSection2Init}
                animate={imageSection2Control}
                exit={variantImageSection.imageSection2Off}
                transition={variantImageSection.transition1}
                className="text-center text-sm w-full font-poppins prose max-w-none prose-sm md:prose-lg bg-white px-6 pb-6 pt-32 text-palette-slate z-10 absolute bottom-0 left-0"
              >
                <MdFormat
                  markdown={data?.Quotes[1]?.quoteText}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
                {data?.Quotes[1]?.authorQuote && (
                  <p className="font-semibold">
                    {data?.Quotes[1]?.authorQuote}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <section className="w-full min-h-screen bg-palette-zinc pb-60">
        <div className="max-w-screen-sm w-full h-full mx-auto relative pb-8 pt-16 bg-white">
          <div className="w-full flex flex-col gap-4">
            {/* mempelai pria */}
            <div
              className="w-full flex flex-col grow gap-3"
              ref={imageCPPInview.ref}
            >
              <motion.div
                initial={variantimageCPP.imageSection2Init}
                animate={imageCPPControl}
                exit={variantimageCPP.imageSection2Off}
                transition={variantimageCPP.transition1}
                className="w-48 h-auto border-[16px] bg-palette-zinc border-emerald-50 self-center relative shadow-lg"
              >
                <Image
                  src={data.fotoCPP.url}
                  loader={myLoader}
                  alt={data.fotoCPP.hash}
                  width={data.fotoCPP.width}
                  height={data.fotoCPP.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(
                      data.fotoCPP.formats.thumbnail.width,
                      data.fotoCPP.formats.thumbnail.height
                    )
                  )}`}
                  className={`w-full h-full object-cover`}
                />
              </motion.div>
              <motion.div
                initial={variantimageCPP.imageSection2Init}
                animate={imageCPPControl}
                exit={variantimageCPP.imageSection2Off}
                transition={variantimageCPP.transition2}
                className="w-full flex flex-col"
              >
                <div className="relative">
                  <div className="text-5xl text-center font-sacramento text-palette-slate font-semibold">
                    Adhi
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-6xl opacity-15 font-playFair text-palette-slate">
                    Ratama
                  </div>
                </div>
                <div className="text-center text-lg font-poppins font-semibold tracking-wide text-palette-slate">
                  {data?.nameCPPria}
                </div>
                <div className="text-center text-sm font-poppins text-palette-slate w-3/4 mx-auto">
                  {data.sonOf.split('\n').map((chr, idxCPP) => (
                    <p key={`idxCPP_${idxCPP}`} className="m-0">
                      {chr}
                    </p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="self-center"
                initial={variantimageCPP.imageSection2Init}
                animate={imageCPPControl}
                exit={variantimageCPP.imageSection2Off}
                transition={variantimageCPP.transition3}
              >
                <a
                  href={`https://instagram.com/${data?.igCPPria}`}
                  target="_blank"
                  className="no-underline text-palette-slate flex items-center gap-2 bg-emerald-50 border border-palette-slate rounded-md px-2 py-1 text-sm shadow-palette-slate/20 shadow-lg"
                >
                  <FaInstagram size={24} /> <span>{data?.igCPPria}</span>
                </a>
              </motion.div>
            </div>

            <div className="text-palette-slate w-full h-24 flex justify-center items-center">
              <span className="h-[1px] flex-1 bg-palette-slate" />
              <span className="font-playFair text-6xl">&</span>
              <span className="h-[1px] flex-1 bg-palette-slate" />
            </div>

            {/* mempelai wanita */}
            <div
              className="w-full flex flex-col grow gap-3"
              ref={imageCPWInview.ref}
            >
              <motion.div
                initial={variantimageCPP.imageSectionInit}
                animate={imageCPWControl}
                exit={variantimageCPP.imageSection2Off}
                transition={variantimageCPP.transition1}
                className="w-48 h-auto border-[16px] bg-palette-zinc border-emerald-50 self-center relative shadow-lg"
              >
                <Image
                  src={data.fotoCPW.url}
                  loader={myLoader}
                  alt={data.fotoCPW.hash}
                  width={data.fotoCPW.width}
                  height={data.fotoCPW.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(
                      data.fotoCPW.formats.thumbnail.width,
                      data.fotoCPW.formats.thumbnail.height
                    )
                  )}`}
                  className={`w-full h-full object-cover`}
                />
              </motion.div>
              <motion.div
                initial={variantimageCPP.imageSectionInit}
                animate={imageCPWControl}
                exit={variantimageCPP.imageSectionOff}
                transition={variantimageCPP.transition2}
                className="w-full flex flex-col"
              >
                <div className="relative">
                  <div className="text-5xl text-center font-sacramento text-palette-slate font-semibold">
                    Cia
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-6xl opacity-15 font-playFair text-palette-slate">
                    Aprilia
                  </div>
                </div>
                <div className="text-center text-lg font-poppins font-semibold tracking-wide text-palette-slate">
                  {data?.nameCPWanita}
                </div>
                <div className="text-center text-sm font-poppins text-palette-slate w-3/4 mx-auto">
                  {data.daughterOf.split('\n').map((chr, idxCPW) => (
                    <p key={`idxCPW_${idxCPW}`} className="m-0">
                      {chr}
                    </p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="self-center"
                initial={variantimageCPP.imageSectionInit}
                animate={imageCPWControl}
                exit={variantimageCPP.imageSectionOff}
                transition={variantimageCPP.transition3}
              >
                <a
                  href={`https://instagram.com/${data?.igCPWanita}`}
                  target="_blank"
                  className="no-underline text-palette-slate flex items-center gap-2 bg-emerald-50 border border-palette-slate rounded-md px-2 py-1 text-sm shadow-palette-slate/20 shadow-lg"
                >
                  <FaInstagram size={24} /> <span>{data?.igCPWanita}</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WeddingComp;
