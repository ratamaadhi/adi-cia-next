import React, { useContext } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { GlobalContext } from "../appContext/store";
import MomentsSwiper from "./swipe/MomentsSwiper";

function Banner({ moments, homepage }) {
  const global = useContext(GlobalContext);

  return (
    <div className="flex flex-col w-full h-screen-banner">
      <div className="relative hidden md:flex flex-row-reverse justify-between w-11/12 mx-auto md:w-10/12 lg:w-8/12 md:h-full md:mb-14 z-20">
        <div className="relative w-1/2 md:h-5/6 md:my-auto">
          <div className="absolute right-6 top-8 md:top-10 md:right-12 w-28 h-40 md:w-56 md:h-80 rounded-xl overflow-hidden shadow-2xl z-20">
            <MomentsSwiper moments={moments} />
            {/* <Image className="object-cover" loader={myLoader} src={`/img/adiCiaPangalengan.png`} layout='fill' alt="photo profile" unoptimized /> */}
          </div>
          <div className="absolute right-3 top-2 h-20 w-20 md:h-28 md:w-28 rounded-3xl glassmorph z-10"></div>
          <div
            style={{ right: "14rem", top: "19.5rem" }}
            className="absolute right-24 top-40 md:right-56 md:top-80 h-16 w-16 md:h-20 md:w-20 rounded-3xl glassmorph z-10"
          ></div>
        </div>
        <div className="w-1/2 px-3 pt-8 md:h-1/2 md:pt-0 md:my-auto">
          <h2 className="font-semibold text-lg md:text-4xl text-white font-poppins capitalize ">
            {homepage.hero.content}
          </h2>
          <p className="text-white text-sm">{homepage.hero.description}</p>
          <a href="#About" className="no-underline">
            <button className="hidden md:flex items-center mt-2 md:mt-4 px-3 py-2 uppercase bg-gray-800 text-white text-sm md:text-base rounded-xl space-x-2 cursor-pointer">
              <span>more</span> <RiArrowDownSLine />
            </button>
          </a>
        </div>
      </div>
      <div className="md:hidden w-60 h-80 mx-auto z-20">
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
      </div>
    </div>
  );
}

export default Banner;
