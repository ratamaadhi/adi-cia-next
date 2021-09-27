import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import MomentJs from "moment";
import Image from "next/image";
import { shimmer, toBase64 } from "../util/toBase64";
import { myLoader } from "../lib/media";
import { useInView } from "react-intersection-observer";
import { MenuBottomCtx } from "../appContext/store";

function Moment({ moments }) {
  const { changeActiveMenu } = useContext(MenuBottomCtx);

  const momentRef = useRef(null);

  const [readMore, setReadMore] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    initReadmore();
  }, []);

  useEffect(() => {
    if(inView){
      changeActiveMenu("Moment");
      console.log("Moment", inView);
    }
  },[inView])

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

  const handleReadMore = (id) => {
    const update = readMore.map((rm) => {
      return rm.id === id ? { ...rm, more: !rm.more } : rm;
    });
    setReadMore(update);
  };

  return (
    <div
      id="Moment"
      ref={ref}
      className="relative w-11/12 min-h-screen mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 pt-24 overflow-x-hidden"
    >
      <div className="flex items-center text-2xl md:text-4xl font-semibold dark:font-normal py-3 md:py-5">
        <h1>Moments</h1>
      </div>
      <div
        ref={momentRef}
        className="relative flex items-center py-54"
      >
        <motion.div
          drag="x"
          dragConstraints={momentRef}
          className={`absolute top-1 left-0 grid grid-rows-1 grid-flow-col gap-x-3`}
        >
          {moments &&
            moments
              .filter((x, i) => i < 8)
              .map((moment, i) => {
                const { id, title, caption, date, momentImage } = moment;
                return (
                  <div
                    key={id}
                    className="relative w-45 h-80 rounded-xl overflow-hidden dark:bg-gray-800 bg-gray-200"
                  >
                    <Image
                      onMouseEnter={() => console.log("hover")}
                      onMouseLeave={() => console.log("hover leave")}
                      className="object-cover"
                      loader={myLoader}
                      src={momentImage.url}
                      layout="fill"
                      // width={momentImage.width}
                      // height={momentImage.height}
                      alt="photo profile"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(
                          momentImage.formats.thumbnail.width,
                          momentImage.formats.thumbnail.height
                        )
                      )}`}
                    />
                    <div className="absolute bottom-0 w-full z-20">
                      <div
                        className={`${
                          readMore[i] &&
                          readMore[i].id === id &&
                          readMore[i].more
                            ? "h-full pb-8"
                            : "h-24"
                        } relative glassmorph1 dark:glassmorph1-dark py-2 pl-2 pr-3 m-2 rounded-lg space-y-1 text-gray-800 dark:text-gray-200`}
                      >
                        <h2 className="font-medium text-sm font-poppins capitalize">
                          {title}
                        </h2>
                        <p
                          className={`${
                            readMore[i] &&
                            readMore[i].id === id &&
                            readMore[i].more
                              ? "line-clamp-none"
                              : "line-clamp-2"
                          } text-xs font-light transition-all ease-in-out duration-300`}
                        >
                          {caption}
                        </p>
                        <span className="absolute bottom-2 left-2 px-1 py-0.5 text-xss rounded dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-gray-200">
                          {MomentJs(date).fromNow()}
                        </span>
                        {caption.length > 50 ? (
                          <span
                            onClick={() => handleReadMore(id)}
                            className="absolute bottom-2 right-2 px-2 text-xss dark:text-gray-200 text-gray-800 hover:underline cursor-pointer"
                          >
                            {readMore[i] &&
                            readMore[i].id === id &&
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
                        readMore[i].id === id &&
                        readMore[i].more
                          ? "h-full"
                          : "h-2/5"
                      } w-full dark:opacity-100 bg-opacity-30 bg-gradient-to-t dark:from-gray-800 from-gray-200 z-10 absolute -bottom-1 left-0 transition-all ease-linear duration-300`}
                    ></div>
                  </div>
                );
              })}
        </motion.div>
      </div>
    </div>
  );
}

export default Moment;
