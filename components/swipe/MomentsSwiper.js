import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
import { myLoader } from "../../lib/media";
import "swiper/swiper-bundle.css";
import Image from "next/image";

SwiperCore.use([Autoplay]);

const MomentsSwiper = ({ moments }) => {
  return (
    <>
      <Swiper
        modules={[EffectCoverflow]}
        loop={true}
        autoplay={{ delay: 5000 }}
        centeredSlides={true}
        // centeredSlidesBounds={true}
        slidesPerView={"auto"}
        spaceBetween={8}
        // onSlideChange={(e) => console.log("slide change", e)}
        onSwiper={(swiper) => console.log(swiper)}
        coverflowEffect={{
          depth: 100,
          rotate: 50,
          slideShadows: true
        }}
      >
        {moments && moments.length > 0
          ? moments.map((moment) => {
              return (
                <SwiperSlide key={moment.id}>
                  <div className="relative w-full h-96 md:h-80 rounded-xl overflow-hidden shadow-2xl bg-gray-800">
                    <Image
                      className="object-cover"
                      loader={myLoader}
                      src={moment.momentImage.url}
                      layout="fill"
                      alt="photo profile"
                      unoptimized
                    />
                    <div className="absolute bottom-0 w-full z-20">
                      <div className="glassmorph1 py-5 px-4 m-2 rounded-xl space-y-1 h-24">
                        <h2 className="font-normal text-sm text-gray-200 font-poppins capitalize">
                          {moment.title}
                        </h2>
                        <p className="text-gray-200 text-xs font-light">
                          {moment.caption}
                        </p>
                      </div>
                    </div>
                    <div className="h-2/5 w-full opacity-1 bg-gradient-to-t from-gray-800 z-10 absolute -bottom-1 left-0"></div>
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
