import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import InvitationPopup from './InvitationPopup';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { myLoader } from '../../lib/media';
import { shimmer, toBase64 } from '../../util/toBase64';
import MdFormat from '../../util/md';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaMapMarkerAlt, FaRegCopy } from 'react-icons/fa';
import { MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md';
import { HiOutlineCreditCard, HiOutlineGift } from 'react-icons/hi';
import { Svg1, Svg2 } from './svgs';
import moment from 'moment';
import 'moment/locale/id.js';
import Masonry from 'react-masonry-css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.css';
import PreviewImage from '../PreviewImage';
import ModalGift from './ModalGift';
import { useCopyToClipboard } from '../../util/hooks';

SwiperCore.use([Autoplay]);

moment.locale('id');

function WeddingComp({ data }) {
  const [openInvite, SetOpenInvite] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(false);
  const [showCountDown, SetShowCountDown] = useState(false);
  const [countDownDay, SetCountDownDay] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const route = useRouter();
  const { query, isReady } = route;

  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState();
  const addressGift =
    'Perumahan Pesona Alam Jatinangor Blok B2 no.18 Jatimukti Kec. Jatinangor, Kab. Sumedang Jawa Barat 45363';
  const accountBCA = 2801545094;
  const accountJenius = 90014169011;

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

  const imageSection2Inview = useInView({ threshold: 0.3 });
  const imageSection2Control = useAnimation();

  const imageSection3Inview = useInView({ threshold: 0.3 });
  const imageSection3Control = useAnimation();

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

    if (imageSection3Inview.inView) {
      imageSection3Control.start({
        scale: 1.05,
        transition: { duration: 1.03 },
      });
    } else {
      imageSection3Control.start({ scale: 1, transition: { duration: 0.5 } });
    }
  }, [imageSection2Inview.inView, imageSection3Inview.inView]);

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

  const akadInfoIinview = useInView({ threshold: 0.4, triggerOnce: true });
  const akadInfoControl = useAnimation();

  const akadInfoVariants = {
    hiddenLeft: {
      opacity: 0,
      x: -100,
    },
    hiddenRigt: {
      opacity: 0,
      x: 100,
    },
    hiddenTop: {
      opacity: 0,
      y: -100,
    },
    hiddenBottom: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    transition: {
      delay: 0.5,
      duration: 1,
      type: 'spring',
      bounce: 0.2,
    },
  };

  useEffect(() => {
    if (akadInfoIinview.inView) {
      akadInfoControl.start(akadInfoVariants.visible);
    }
  }, [akadInfoIinview.inView]);

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
    const timer = setInterval(function () {
      countDown(data?.akadTime);
    }, 1000);

    return () => {
      clearTimeout(timer);
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
      };
    }
  }, [audio, openInvite]);

  function countDown(time = new Date()) {
    var eventTime, currentTime, duration, interval, intervalId;

    interval = 1000; // 1 second

    // calculate difference between two times
    eventTime = moment(new Date());
    // based on time set in user's computer time / OS
    currentTime = moment(time);
    // get duration between two times
    duration = moment.duration(currentTime.diff(eventTime));

    // loop to countdown every 1 second
    // get updated duration
    duration = moment.duration(duration - interval, 'milliseconds');

    // if duration is >= 0
    if (duration.asSeconds() <= 0) {
      clearInterval(intervalId);
      SetShowCountDown(false);
    } else {
      SetShowCountDown(true);
      // otherwise, show the updated countdown
      SetCountDownDay({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }
  }

  function diffDateOneWeek() {
    const eventTime = moment(data?.akadTime);
    const currentTime = moment(new Date());
    const duration = moment.duration(currentTime.diff(eventTime));

    return duration;
  }

  function isDateNow() {
    const dateNow = moment(new Date());
    const dateAmplop = moment(data?.useAmplopDigitalUntil);
    return dateNow.isSameOrBefore(dateAmplop);
  }

  return (
    <div className="relative bg-palette-stone min-h-screen w-full">
      {audio && (
        <div
          className={`fixed bottom-8 left-6 z-40 rounded-full bg-emerald-50 border border-palette-slate text-palette-slate w-7 h-7 flex justify-center items-center ${
            isPlaying > 0 ? 'animate-spin' : ''
          }`}
          onClick={() => (isPlaying ? audio.pause() : audio.play())}
        >
          {!isPlaying && <MdOutlineMusicNote size={24} />}
          {isPlaying && <MdOutlineMusicOff size={24} />}
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
                  className="font-playFair text-4xl sm:text-6xl md:text-7xl drop-shadow-sm"
                  style={{
                    opacity: opacityTextHero,
                    willChange: 'transform',
                    scale: scaleTextHero,
                  }}
                >{`${data?.nickNameCPWanita} & ${data?.nickNameCPPria}`}</motion.h2>
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
              {data?.quotes[0]?.quoteText && (
                <div className="text-center text-sm w-11/12 mx-auto prose max-w-none prose-sm md:prose-lg px-6 py-4 text-slate-50 rounded-sm">
                  {/* {data?.quotes[0]?.quoteText} */}
                  <MdFormat
                    markdown={data?.quotes[0]?.quoteText}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  />
                  {data?.quotes[0]?.authorQuote && (
                    <p className="font-semibold">
                      {data?.quotes[0]?.authorQuote}
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
              className="fixed md:hidden bottom-6 left-0 aspect-1 z-30 flex justify-center w-full h-[75px]"
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
              className="fixed hidden bottom-6 left-0 aspect-1 z-30 md:flex justify-center w-full h-[75px]"
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
              className="aspect-h-6 aspect-w-4 relative border-[16px] border-emerald-50 shadow-xl"
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
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-palette-zinc/80 via-palette-stone/30 to-transparent" />
            </motion.div>
          </div>
          <AnimatePresence>
            {data?.quotes[1]?.quoteText && (
              <motion.div
                initial={variantImageSection.imageSection2Init}
                animate={imageSection2Control}
                exit={variantImageSection.imageSection2Off}
                transition={variantImageSection.transition1}
                className="text-center text-sm w-full prose max-w-none prose-sm md:prose-lg bg-white px-6 pb-6 pt-32 text-palette-slate z-10 absolute bottom-0 left-0 will-change-transform"
              >
                <MdFormat
                  markdown={data?.quotes[1]?.quoteText}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
                {data?.quotes[1]?.authorQuote && (
                  <p className="font-semibold">
                    {data?.quotes[1]?.authorQuote}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <section className="w-full min-h-screen bg-palette-zinc overflow-hidden">
        <div className="max-w-screen-sm w-full h-full mx-auto relative py-28 bg-white">
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
                className="w-48 h-60 border-[16px] bg-palette-zinc border-emerald-50 self-center relative shadow-lg will-change-transform"
              >
                <Image
                  src={data.fotoCPW.url}
                  loader={myLoader}
                  alt={data.fotoCPW.hash}
                  width={data.fotoCPW.width}
                  height={data.fotoCPW.height}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(
                      data.fotoCPW.formats.thumbnail.width,
                      data.fotoCPW.formats.thumbnail.height
                    )
                  )}`}
                  className={`w-full h-full object-contain`}
                />
              </motion.div>
              <motion.div
                initial={variantimageCPP.imageSection2Init}
                animate={imageCPPControl}
                exit={variantimageCPP.imageSection2Off}
                transition={variantimageCPP.transition2}
                className="w-full flex flex-col will-change-transform"
              >
                <div className="relative">
                  <div className="text-5xl text-center font-sacramento text-palette-slate font-semibold">
                    {data?.nickNameCPWanita}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-6xl opacity-15 font-playFair text-palette-slate">
                    {data?.nameCPWanita.split(' ')[0]}
                  </div>
                </div>
                <div className="text-center text-lg font-poppins font-semibold tracking-wide text-palette-slate">
                  {data?.nameCPWanita}
                </div>
                <div className="text-center text-sm font-poppins text-palette-slate w-3/4 mx-auto">
                  {data.daughterOf.split('\n').map((chr, idxCPP) => (
                    <p key={`idxCPP_${idxCPP}`} className="m-0">
                      {chr}
                    </p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="self-center will-change-transform"
                initial={variantimageCPP.imageSection2Init}
                animate={imageCPPControl}
                exit={variantimageCPP.imageSection2Off}
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
                className="w-48 h-60 border-[16px] bg-palette-zinc border-emerald-50 self-center relative shadow-lg will-change-transform"
              >
                <Image
                  src={data.fotoCPP.url}
                  loader={myLoader}
                  alt={data.fotoCPP.hash}
                  width={data.fotoCPP.width}
                  height={data.fotoCPP.height}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(
                      data.fotoCPP.formats.thumbnail.width,
                      data.fotoCPP.formats.thumbnail.height
                    )
                  )}`}
                  className={`w-full h-full object-contain`}
                />
              </motion.div>
              <motion.div
                initial={variantimageCPP.imageSectionInit}
                animate={imageCPWControl}
                exit={variantimageCPP.imageSectionOff}
                transition={variantimageCPP.transition2}
                className="w-full flex flex-col will-change-transform"
              >
                <div className="relative">
                  <div className="text-5xl text-center font-sacramento text-palette-slate font-semibold">
                    {data?.nickNameCPPria}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-6xl opacity-15 font-playFair text-palette-slate">
                    {data?.nameCPPria?.split(' ')[0]}
                  </div>
                </div>
                <div className="text-center text-lg font-poppins font-semibold tracking-wide text-palette-slate">
                  {data?.nameCPPria}
                </div>
                <div className="text-center text-sm font-poppins text-palette-slate w-3/4 mx-auto">
                  {data.sonOf.split('\n').map((chr, idxCPW) => (
                    <p key={`idxCPW_${idxCPW}`} className="m-0">
                      {chr}
                    </p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="self-center will-change-transform"
                initial={variantimageCPP.imageSectionInit}
                animate={imageCPWControl}
                exit={variantimageCPP.imageSectionOff}
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
          </div>
        </div>
      </section>
      <section className="w-full bg-gradient-to-b from-palette-zinc to-palette-slate text-zinc-300 pb-20 overflow-hidden">
        <div className="max-w-screen-sm w-full h-full mx-auto relative pt-16">
          {/* AKAD */}
          <motion.div
            ref={akadInfoIinview.ref}
            initial={akadInfoVariants.hiddenBottom}
            animate={akadInfoControl}
            exit={akadInfoVariants.hiddenBottom}
            transition={{ ...akadInfoVariants.transition, delay: 0.5 }}
            className="w-11/12 sm:w-full mx-auto bg-palette-stone px-4 py-8 will-change-transform"
          >
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col max-w-sm w-full mx-auto relative px-4 py-2">
                <motion.div
                  initial={akadInfoVariants.hiddenLeft}
                  animate={akadInfoControl}
                  exit={akadInfoVariants.hiddenLeft}
                  transition={akadInfoVariants.transition}
                  className="self-center relative will-change-transform"
                >
                  <span className="relative text-6xl font-poppins font-bold opacity-15">
                    AKAD
                  </span>
                  <span className="absolute left-2 text-4xl top-1 font-playFair">
                    Akad
                  </span>
                  <span className="absolute left-[4.5rem] top-5 text-4xl font-sacramento">
                    Nikah
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={akadInfoVariants.hiddenBottom}
                animate={akadInfoControl}
                exit={akadInfoVariants.hiddenBottom}
                transition={{ ...akadInfoVariants.transition, delay: 1.5 }}
                className="self-center font-playFair text-center tracking-wide will-change-transform"
              >
                <div>{moment(data?.akadTime).format('dddd, DD MMMM YYYY')}</div>
                <div>{moment(data?.akadTime).format('hh:mm')} - 13.00 WIB</div>
              </motion.div>
              <motion.div
                initial={akadInfoVariants.hiddenBottom}
                animate={akadInfoControl}
                exit={akadInfoVariants.hiddenBottom}
                transition={{ ...akadInfoVariants.transition, delay: 2 }}
                className="self-center font-playFair text-center tracking-wide flex flex-col gap-2 will-change-transform"
              >
                <div className="font-bold">{data?.akadPlaceName}</div>
                <div className="font-poppins text-xs">
                  {data?.akadPlaceNameDetail}
                </div>
                <div className="w-full flex justify-center mt-4">
                  <a
                    href={`${data?.akadPlaceGmap}`}
                    target="_blank"
                    className="no-underline text-palette-slate bg-emerald-50 border border-palette-slate rounded-md px-3 py-2 text-sm shadow-palette-slate/20 shadow-lg flex items-center gap-2"
                  >
                    <FaMapMarkerAlt size={16} />{' '}
                    <span className="font-poppins text-xs font-semibold">
                      Lihat Lokasi
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* END AKAD */}
          <div className="text-palette-slate w-full h-24 flex justify-center items-center">
            <span className="h-[1px] flex-1 bg-emerald-50" />
            <div className="w-16 h-16 mx-auto">
              <Svg1 />
            </div>
            <span className="h-[1px] flex-1 bg-emerald-50" />
          </div>

          {/* RESEPSI */}
          <motion.div
            // ref={akadInfoIinview.ref}
            initial={akadInfoVariants.hiddenBottom}
            animate={akadInfoControl}
            exit={akadInfoVariants.hiddenBottom}
            transition={{ ...akadInfoVariants.transition, delay: 0.5 }}
            className="w-11/12 sm:w-full mx-auto bg-palette-stone px-4 py-8 mb-8 will-change-transform"
          >
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col max-w-sm w-full mx-auto relative px-4 py-2">
                <motion.div
                  initial={akadInfoVariants.hiddenRigt}
                  animate={akadInfoControl}
                  exit={akadInfoVariants.hiddenRigt}
                  transition={akadInfoVariants.transition}
                  className="relative self-center"
                >
                  <span className="relative text-6xl font-poppins font-bold opacity-15">
                    RESEPSI
                  </span>
                  <span className="absolute -left-3 text-5xl top-1 font-sacramento">
                    Resepsi
                  </span>
                  <span className="absolute left-[6.7rem] top-5 text-3xl font-playFair">
                    Pernikahan
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={akadInfoVariants.hiddenBottom}
                animate={akadInfoControl}
                exit={akadInfoVariants.hiddenBottom}
                transition={{ ...akadInfoVariants.transition, delay: 1.5 }}
                className="self-center font-playFair text-center tracking-wide will-change-transform"
              >
                <div>
                  {moment(data?.resepsiTime).format('dddd, DD MMMM YYYY')}
                </div>
                <div>{moment(data?.resepsiTime).format('hh:mm')} WIB</div>
              </motion.div>
              <motion.div
                initial={akadInfoVariants.hiddenBottom}
                animate={akadInfoControl}
                exit={akadInfoVariants.hiddenBottom}
                transition={{ ...akadInfoVariants.transition, delay: 2 }}
                className="self-center font-playFair text-center tracking-wide flex flex-col gap-2 will-change-transform"
              >
                <div className="font-bold">{data?.resepsiPlaceName}</div>
                <div className="font-poppins text-xs">
                  {data?.resepsiPlaceNameDetail}
                </div>
                <div className="w-full flex justify-center mt-4">
                  <a
                    href={`${data?.resepsiPlaceGmap}`}
                    target="_blank"
                    className="no-underline text-palette-slate bg-emerald-50 border border-palette-slate rounded-md px-3 py-2 text-sm shadow-palette-slate/20 shadow-lg flex items-center gap-2"
                  >
                    <FaMapMarkerAlt size={16} />{' '}
                    <span className="font-poppins text-xs font-semibold">
                      Lihat Lokasi
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {data.imageSection3?.url && (
            <motion.div
              ref={imageSection3Inview.ref}
              initial={{
                scale: 1,
              }}
              animate={imageSection3Control}
              transition={{
                delay: 0.5,
              }}
              className="relative w-11/12 sm:w-full mx-auto h-auto overflow-hidden border-[16px] border-emerald-50 shadow-xl will-change-transform"
            >
              <Image
                src={data.imageSection3.url}
                loader={myLoader}
                alt={data.imageSection3.hash}
                layout="responsive"
                height={data.imageSection3.height}
                width={data.imageSection3.width}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(
                    data.imageSection3.formats.thumbnail.width,
                    data.imageSection3.formats.thumbnail.height
                  )
                )}`}
                className={`w-full h-full object-cover`}
              />
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-palette-slate/80 via-palette-zinc/30 to-transparent" />
            </motion.div>
          )}
          {/* END RESEPSI */}

          {showCountDown && (
            <div className="w-11/12 sm:w-full mx-auto bg-palette-stone px-4 pb-2 mt-8 pt-4 sm:pt-8 will-change-transform">
              <div className="font-playFair text-2xl tracking-wide text-center mb-4">
                Hari yang ditunggu
              </div>
              <div className="w-full flex gap-2 justify-center text-center font-playFair tracking-wide">
                <div className="px-2 py-1 bg-palette-slate/30 flex-1">
                  <div className="text-3xl">{countDownDay.days}</div>
                  <div className="">Days</div>
                </div>
                <div className="px-2 py-1 bg-palette-slate/30 flex-1">
                  <div className="text-3xl">{countDownDay.hours}</div>
                  <div className="">Hours</div>
                </div>
                <div className="px-2 py-1 bg-palette-slate/30 flex-1">
                  <div className="text-3xl">{countDownDay.minutes}</div>
                  <div className="">Mins</div>
                </div>
                <div className="px-2 py-1 bg-palette-slate/30 flex-1">
                  <div className="text-3xl">{countDownDay.seconds}</div>
                  <div className="">Secs</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="w-full bg-gradient-to-b from-palette-slate to-palette-navi text-zinc-300 pb-16 overflow-hidden">
        {data?.prewedPhoto && data?.prewedPhoto?.length > 0 && (
          <>
            <div className="w-16 h-16 mx-auto mb-3">
              <Svg2 />
            </div>
            <div className="self-center relative w-full max-w-screen-sm mx-auto flex justify-center mb-6 will-change-transform">
              <span className="relative text-6xl font-poppins font-bold opacity-15">
                Gallery
              </span>
              <span className="absolute left-[35%] sm:left-[40%] -translate-x-1/2 text-4xl top-1 font-playFair">
                Happy
              </span>
              <span className="absolute left-[55%] -translate-x-1/2 top-6 text-4xl font-sacramento">
                Moment
              </span>
            </div>
            <div className="relative w-full h-auto overflow-hidden max-w-screen-sm mx-auto pb-4">
              <Swiper
                modules={[EffectCoverflow]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={12}
              >
                {data?.prewedPhoto.map((photo) => {
                  return (
                    <SwiperSlide key={photo._id}>
                      <div
                        key={photo.hash}
                        className="relative aspect-w-3 aspect-h-4"
                      >
                        <Image
                          src={photo.url}
                          loader={myLoader}
                          alt={photo.hash}
                          layout="fill"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(
                              photo.formats.thumbnail.width,
                              photo.formats.thumbnail.height
                            )
                          )}`}
                          className={`w-full h-full object-cover`}
                        />
                        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-palette-navi/80 via-palette-slate/30 to-transparent" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-full sm:max-w-screen-sm mx-auto px-4 sm:px-0">
              <Masonry
                breakpointCols={2}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {data?.prewedPhoto.map((photo) => {
                  return (
                    <div
                      key={photo.hash}
                      className="relative w-full h-auto shadow-lg cursor-pointer"
                      onClick={() => setPreviewPhoto(photo)}
                    >
                      <Image
                        src={photo.url}
                        loader={myLoader}
                        alt={photo.hash}
                        width={photo.width}
                        height={photo.height}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(
                            photo.formats.thumbnail.width,
                            photo.formats.thumbnail.height
                          )
                        )}`}
                        className={`w-full h-full object-cover`}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </div>
          </>
        )}
      </section>

      <section className="w-full bg-gradient-to-b from-palette-navi to-palette-black text-zinc-300 pt-12 pb-16 overflow-hidden space-y-8">
        {isDateNow() && (
          <>
            <div className="self-center relative w-full max-w-screen-sm mx-auto flex justify-center will-change-transform">
              <span className="relative text-7xl font-playFair font-bold opacity-15 tracking-widest">
                Gift
              </span>
              <span className="absolute left-[37%] sm:left-[45%] -translate-x-1/2 text-4xl top-3 font-playFair">
                Amplop
              </span>
              <span className="absolute left-[62%] sm:left-[61%] -translate-x-1/2 top-8 text-4xl font-sacramento">
                Digital
              </span>
            </div>
            <div className="relative w-full max-w-screen-sm mx-auto mb-6 space-y-8">
              <div className="w-4/5 mx-auto text-center">
                <p className="text-xs font-poppins tracking-wide leading-relaxed">
                  Bagi keluarga dan sahabat yang ingin mengirimkan hadiah,
                  silakan mengirimkannya melalui tautan berikut:
                </p>
              </div>
              <div className="w-11/12 sm:w-5/6 mx-auto flex justify-evenly">
                {data?.isUseAddressGift?.length > 0 && (
                  <button
                    type="button"
                    className="text-palette-slate bg-emerald-50 border border-palette-slate rounded-md px-3 py-2 text-sm shadow-palette-slate/20 shadow-lg flex items-center gap-2"
                    onClick={() => {
                      setOpenAddress(true);
                      setOpenBank(false);
                    }}
                  >
                    <HiOutlineGift size={16} />
                    <span className="font-poppins text-xs font-semibold">
                      Kirim Hadiah
                    </span>
                  </button>
                )}

                {data?.isUseAccoutNumber?.length > 0 && (
                  <button
                    type="button"
                    className="text-palette-slate bg-emerald-50 border border-palette-slate rounded-md px-3 py-2 text-sm shadow-palette-slate/20 shadow-lg flex items-center gap-2"
                    onClick={() => {
                      setOpenAddress(false);
                      setOpenBank(true);
                    }}
                  >
                    <HiOutlineCreditCard size={16} />
                    <span className="font-poppins text-xs font-semibold">
                      Transfer Bank
                    </span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <section className="w-full pb-40 pt-16 bg-palette-black text-white font-poppins">
        <div className="text-xs text-center" onClick={() => route.push('/')}>
          <span className="font-semibold">{`${data?.nickNameCPWanita} & ${data?.nickNameCPPria}`}</span>{' '}
          &copy; {moment().format('yyyy')}
        </div>
        <div className="text-xs text-center">
          <span className="font-semibold">
            Song:{' '}
            {data?.songPage?.name
              ? data?.songPage?.name?.substring(
                  0,
                  data?.songPage?.name.lastIndexOf('.')
                )
              : ''}
          </span>
        </div>
      </section>

      <ModalGift
        isOpen={openAddress}
        closeModal={() => {
          setOpenAddress(false);
        }}
        title="Alamat Penerima"
      >
        <div className="max-w-screen-sm mx-auto w-11/12 flex flex-col gap-4 font-poppins text-sm leading-relaxed">
          <div className="text-center mb-4">
            <div>{data?.isUseAddressGift[0]?.namaAlamat}</div>
            <div>{data?.isUseAddressGift[0]?.nomorHpPenerima}</div>
          </div>
          <div className="text-center text-xs">
            {data?.isUseAddressGift[0]?.alamatDetail}
          </div>
          <div className="self-center">
            <button
              type="button"
              className="text-palette-slate bg-emerald-50 border border-palette-slate rounded-md px-3 py-2 text-sm shadow-palette-slate/20 shadow-lg flex items-center gap-2"
              onClick={() => {
                copyToClipboard(data?.isUseAddressGift[0]?.alamatDetail);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 500);
              }}
            >
              {!isCopied ? (
                <>
                  <FaRegCopy size={16} />
                  <span className="font-poppins text-xs font-semibold">
                    Copy Address
                  </span>
                </>
              ) : (
                <span className="font-poppins text-xs font-semibold opacity-55">
                  Copy to clipboard
                </span>
              )}
            </button>
          </div>
        </div>
      </ModalGift>

      <ModalGift
        isOpen={openBank}
        closeModal={() => {
          setOpenBank(false);
        }}
        title="Nomor Rekening"
      >
        <div className="max-w-screen-sm mx-auto w-11/12 flex flex-col gap-4 font-poppins text-sm leading-relaxed py-4">
          {data?.isUseAccoutNumber?.length > 0 &&
            data?.isUseAccoutNumber?.map((acc, idxAcc) => {
              return (
                <div
                  key={acc?._id}
                  className="aspect-h-4 w-full h-auto m-auto rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105"
                >
                  {idxAcc % 2 === 0 ? (
                    <img
                      className="relative object-cover w-full h-full rounded-xl"
                      src="https://res.cloudinary.com/ratamaadhi/image/upload/v1708767644/k_Gk_Sg1v_9112a5e1fc.png"
                    />
                  ) : (
                    <img
                      className="relative object-cover w-full h-full rounded-xl"
                      src="https://res.cloudinary.com/ratamaadhi/image/upload/v1708767644/Zi6v09_P_1498f5f8b8.png"
                    />
                  )}

                  <div className="w-full px-8 absolute top-3 sm:top-8">
                    <div className="flex justify-between">
                      <div className="">
                        <p className="font-light">Bank</p>
                        <p className="font-medium text-2xl tracking-widest">
                          {acc?.bankName}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="font-light">{acc?.AccountName}</p>
                      <p className="font-medium tracking-more-wider">
                        xxxxxxxxx
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0.5 sm:bottom-3 left-1/2 -translate-x-1/2">
                    <button
                      type="button"
                      className={`${
                        idxAcc % 2 === 0
                          ? 'text-blue-500 bg-blue-200 shadow-blue-200/20'
                          : 'text-orange-500 bg-orange-200 shadow-orange-300/20'
                      } rounded-md px-3 py-2 text-sm shadow-lg flex items-center gap-2 scale-75 sm:scale-100`}
                      onClick={() => {
                        copyToClipboard(acc?.accountNumber);
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 500);
                      }}
                    >
                      {isCopied && copiedText.text === accountBCA ? (
                        <span className="font-poppins text-xs font-semibold opacity-55">
                          Copy to clipboard
                        </span>
                      ) : (
                        <>
                          <FaRegCopy size={16} />
                          <span className="font-poppins text-xs font-semibold">
                            Copy Number
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </ModalGift>

      {previewPhoto && (
        <PreviewImage
          src={previewPhoto.url}
          alt={previewPhoto.hash}
          width={previewPhoto.width}
          height={previewPhoto.height}
          onClose={() => setPreviewPhoto(null)}
        />
      )}
    </div>
  );
}

export default WeddingComp;
