import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
import { myLoader } from "../../lib/media";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import Moment from "moment";
import { useEffect, useState } from "react";

SwiperCore.use([Autoplay]);

const MomentsSwiper = ({ moments }) => {
  const [readMore, setReadMore] = useState([]);

  useEffect(() => {
    initReadmore();
  }, []);

  const handleReadMore = (id) => {
    const update = readMore.map((rm) => {
      return rm.id === id ? { ...rm, more: !rm.more } : rm;
    });
    setReadMore(update);
  };

  function initReadmore() {
    const init = [...moments];
    const rm = init.map((data) => {
      return {
        id: data.id,
        more: false,
      };
    });
    setReadMore(rm);
  }

  return (
    <>
      <Swiper
        modules={[EffectCoverflow]}
        loop={true}
        autoplay={{ delay: 5000 }}
        centeredSlides={true}
        // centeredSlidesBounds={true}
        slidesPerView={"auto"}
        spaceBetween={12}
        // onSlideChange={(e) => console.log("slide change", e)}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {moments && moments.length > 0
          ? moments.map((moment, i) => {
              return (
                <SwiperSlide key={moment.id}>
                  <div className="relative w-full h-96 md:h-80 rounded-xl overflow-hidden bg-gray-800">
                    <Image
                      className="object-cover"
                      loader={myLoader}
                      src={moment.momentImage.url}
                      layout="fill"
                      alt="photo profile"
                      unoptimized
                    />
                    <div className="absolute bottom-0 w-full z-20">
                      <div
                        className={`${
                          readMore[i] &&
                          readMore[i].id === moment.id &&
                          readMore[i].more
                            ? "h-full pb-8"
                            : "h-24"
                        } relative glassmorph1 dark:glassmorph1-dark py-2 pl-2 pr-3 m-2 rounded-xl space-y-1 text-gray-800 dark:text-gray-200`}
                      >
                        <h2 className="font-medium text-sm font-poppins capitalize">
                          {moment.title}
                        </h2>
                        <p 
                          className={`${
                            readMore[i] &&
                            readMore[i].id === moment.id &&
                            readMore[i].more
                              ? "line-clamp-none"
                              : "line-clamp-2"
                          } text-xs font-light`}
                        >
                          {moment.caption}
                        </p>
                        <span className="absolute bottom-2 left-2 px-1 py-0.5 text-xss rounded dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-gray-200">
                          {Moment(moment.date).fromNow()}
                        </span>
                        {moment.caption.length > 50 ? (
                          <span
                            onClick={() => handleReadMore(moment.id)}
                            className="absolute bottom-2 right-2 px-2 text-xss dark:text-gray-200 text-gray-800 hover:underline cursor-pointer"
                          >
                            {readMore[i] &&
                            readMore[i].id === moment.id &&
                            readMore[i].more
                              ? "less"
                              : "more"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={`${
                        readMore[i] &&
                        readMore[i].id === moment.id &&
                        readMore[i].more
                          ? "h-full"
                          : "h-2/5"
                      } w-full dark:opacity-100 bg-opacity-30 bg-gradient-to-t dark:from-gray-800 from-gray-200 z-10 absolute -bottom-1 left-0`}
                    ></div>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </>
  );
};

export default MomentsSwiper;
