import React, { useContext, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { MenuBottomCtx } from "../appContext/store";
import MomentsSwiper from "./swipe/MomentsSwiper";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { fetchAPI } from "../lib/api";
import useSWR from "swr";

function Banner() {
  const { data : moments } = useSWR("/moments", fetchAPI)
  const { data : homepage } = useSWR("/homepage", fetchAPI)
  const { changeActiveMenu } = useContext(MenuBottomCtx)

  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  const animating = useAnimation();
  const animatingSwipper = useAnimation();
  const animatingSwipperMobile = useAnimation();
  const animations = {
    off: {
      opacity: 0,
    },
    desktopOn: {
      x: 0,
      opacity: 1,
    },
    destopOff: {
      x: "-20%",
      opacity: 0,
    },
    destopOffLeft: {
      x: "20%",
      opacity: 0,
    },
    mobileOffLeft: {
      x: "5%",
      opacity: 0,
    },
    transition1: {
      duration: 1.5,
      delay: 0.2,
      type: "spring",
      bounce: 0.2,
    },
    transition2: {
      duration: 1.5,
      delay: 0.5,
      type: "spring",
      bounce: 0.2,
    },
    transition3: {
      duration: 1.5,
      delay: 0.9,
      type: "spring",
      bounce: 0.2,
    },
  };

  useEffect(() => {
    if (inView) {
      animating.start(animations.desktopOn);
      animatingSwipper.start(animations.desktopOn);
      animatingSwipperMobile.start(animations.desktopOn);
      changeActiveMenu("#")
    }
    if (!inView) {
      animating.start(animations.destopOff);
      animatingSwipper.start(animations.destopOffLeft);
      animatingSwipperMobile.start(animations.mobileOffLeft);
    }
  }, [inView]);

  return (
    <div className="flex flex-col w-full h-screen-banner" ref={ref}>
      <div className="relative hidden md:flex flex-row-reverse justify-between w-11/12 mx-auto md:w-10/12 lg:w-8/12 md:h-full md:mb-14 z-20">
        <div className="relative w-1/2 md:h-5/6 md:my-auto">
          <motion.div
            initial={animations.destopOffLeft}
            animate={animatingSwipper}
            transition={animations.transition1}
            className="absolute right-6 top-8 md:top-10 md:right-12 w-54 h-96 rounded-xl overflow-hidden shadow-2xl z-20"
          >
            <MomentsSwiper moments={moments} />
          </motion.div>
          <motion.div
            initial={animations.destopOffLeft}
            animate={animatingSwipper}
            transition={animations.transition3}
            className="absolute right-3 top-2 h-28 w-28 rounded-3xl glassmorph z-10"
          ></motion.div>
          <motion.div
            initial={animations.destopOffLeft}
            animate={animatingSwipper}
            transition={animations.transition2}
            style={{ right: "14rem", top: "23.5rem" }}
            className="absolute h-20 w-20 rounded-3xl glassmorph z-10"
          ></motion.div>
        </div>
        <div className="w-1/2 px-3 pt-8 md:h-1/2 md:pt-0 md:my-auto">
          <motion.h2
            initial={animations.destopOff}
            animate={animating}
            transition={animations.transition1}
            className="font-semibold text-lg md:text-4xl text-white font-poppins capitalize "
          >
            {homepage.hero.content}
          </motion.h2>
          <motion.p
            initial={animations.destopOff}
            animate={animating}
            transition={animations.transition2}
            className="text-white text-sm"
          >
            {homepage.hero.description}
          </motion.p>
          <a href="#About" className="no-underline">
            <motion.button
              initial={animations.destopOff}
              animate={animating}
              transition={animations.transition3}
              className="hidden md:flex items-center mt-2 md:mt-4 px-3 py-2 uppercase bg-gray-800 text-white text-sm md:text-base rounded-xl space-x-2 cursor-pointer"
            >
              <span>more</span> <RiArrowDownSLine />
            </motion.button>
          </a>
        </div>
      </div>
      <motion.div
        initial={animations.mobileOffLeft}
        animate={animatingSwipperMobile}
        transition={animations.transition1}
        className="md:hidden w-54 h-96 mx-auto z-20"
      >
        <MomentsSwiper moments={moments} />
        {/* <div className="relative w-56 h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-800" >
          <Image className="object-cover" loader={myLoader} src={`/img/adiCiaPangalengan.png`} layout='fill' alt="photo profile" unoptimized/>
          <div className="absolute bottom-0 w-full">
            <div className="glassmorph1 py-5 px-4 m-2 rounded-xl space-y-1">
              <h2 className="font-normal text-sm text-gray-200 font-poppins capitalize">{homepage.hero.content}</h2>
              <p className="text-gray-200 text-xs font-light">{homepage.hero.description}</p>
            </div>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}

export default Banner;
