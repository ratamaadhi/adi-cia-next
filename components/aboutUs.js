import { getStrapiMedia, myLoader } from "../lib/media";
import Image from "next/image";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const AboutUs = ({ homepage }) => {
  const imageCiaCover = getStrapiMedia(homepage.AboutCia.cover);
  const imageCia = getStrapiMedia(homepage.AboutCia.profilePic);
  const imageAdiCover = getStrapiMedia(homepage.AboutAdi.cover);
  const imageAdi = getStrapiMedia(homepage.AboutAdi.profilePic);

  const [switchAbout, setSwitchAbout] = useState("cia");

  return (
    <div id="About" className="relative min-h-screen flex flex-col md:flex-row justify-between w-full overflow-hidden">
      <div id="AboutCia" className={`relative text-gray-800 dark:text-gray-200 z-20`}>
        {/* <div className={`absolute top-0 left-0 w-full h-full filter grayscale blur-sm contrast-50 z-0`}>
          <Image
            loader={myLoader}
            src={imageCiaCover}
            alt="nature unplash"
            layout="fill"
            className={`w-full h-full object-cover`}
            unoptimized
          />
        </div> */}
        <div className="relative px-6 md:px-0 md:pl-20 lg:pl-32 flex flex-col justify-between min-h-screen w-full pb-20">
          <div className={`pt-24 lg:pt-28 pb-2`}>
            <div className={`text-4xl font-bold uppercase`}>{homepage.AboutCia.title}</div>
            <div className={`text-sm`}>{homepage.AboutCia.description}</div>
            <div className={`text-xs italic font-semibold tracking-wide dark:tracking-wider`}>{homepage.AboutCia.content}</div>
          </div>
          <div className={`h-full w-full flex justify-evenly md:justify-start items-end space-x-2 lg:pb-20`}>
            <div className={`relative w-48 h-60 md:w-60 md:h-96 rounded-xl overflow-hidden`}>
              <Image
                loader={myLoader}
                src={imageCia}
                alt="nature unplash"
                layout="fill"
                className={`w-full h-full object-cover`}
                unoptimized
              />
              <div className="h-1/3 w-full opacity-100 bg-gradient-to-t from-gray-200 dark:from-gray-800 z-10 absolute bottom-0 left-0"></div>
            </div>
            <div className="md:hidden">
              <a href="#AboutAdi" className={`flex justify-evenly items-center py-2 px-3 rounded-lg bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 animate-pulse`}>Adi <RiArrowDownSLine /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden md:flex lg:w-72 w-64 justify-center items-center z-20">
        <div className="px-3 py-2 rounded-lg glassmorph1 lg:text-3xl text-xl text-center text-gray-900">
          About us
        </div>
      </div>
      <div id="AboutAdi" className={`relative text-gray-800 dark:text-gray-200 z-20`}>
        {/* <div className={` absolute top-0 left-0 w-full h-full filter grayscale blur-sm contrast-50`}>
          <Image
            loader={myLoader}
            src={imageAdi}
            alt="nature unplash"
            layout="fill"
            className={`w-full h-full object-cover`}
            unoptimized
          />
        </div> */}
        <div className="relative px-6 md:px-0 md:pr-20 lg:pr-32 flex flex-col justify-between  min-h-screen w-full pb-20">
          <div className={`pt-24 lg:pt-28 pb-2 text-right`}>
            <div className={`text-4xl font-bold uppercase`}>{homepage.AboutAdi.title}</div>
            <div className={`text-sm`}>{homepage.AboutAdi.description}</div>
            <div className={`text-xs italic font-semibold tracking-wide dark:tracking-wider`}>{homepage.AboutAdi.content}</div>
          </div>
          <div className={`h-full w-full flex justify-evenly md:justify-end items-end space-x-2 lg:pb-20`}>
            <div className="md:hidden">
              <a href="#AboutCia" className={`flex justify-evenly items-center py-2 px-3 rounded-lg bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 animate-pulse`}>Cia <RiArrowUpSLine /></a>
            </div>
            <div className={`relative w-48 h-60 md:w-60 md:h-96 rounded-xl overflow-hidden`}>
              <Image
                loader={myLoader}
                src={imageAdi}
                alt="Adi"
                layout="fill"
                className={`w-full h-full object-cover`}
                unoptimized
              />
              <div className="h-1/3 w-full opacity-100 bg-gradient-to-t from-gray-200 dark:from-gray-800 z-10 absolute bottom-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute top-0 left-0 w-full h-1/2 md:h-full md:w-1/2 filter grayscale blur-sm contrast-50`}>
        <Image
          loader={myLoader}
          src={imageCiaCover}
          alt="nature unplash"
          layout="fill"
          className={`w-full h-full object-cover`}
          unoptimized
        />
      </div>
      <div className={`absolute bottom-0 right-0 w-full h-1/2 md:h-full md:w-1/2 filter grayscale blur-sm contrast-50`}>
        <Image
          loader={myLoader}
          src={imageAdiCover}
          alt="nature unplash"
          layout="fill"
          className={`w-full h-full object-cover`}
          unoptimized
        />
      </div>
      <div className="h-1/3 w-full opacity-100 bg-gradient-to-b from-gray-200 dark:from-gray-800 z-10 absolute top-0 left-0"></div>
      <div className="h-1/3 w-full opacity-100 bg-gradient-to-t from-gray-200 dark:from-gray-800 z-10 absolute bottom-0 left-0"></div>
    </div>
  );
};

export default AboutUs;
