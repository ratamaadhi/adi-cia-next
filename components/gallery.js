import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, myLoader } from "../lib/media";
import { shimmer, toBase64 } from "../util/toBase64";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { MenuBottomCtx } from "../appContext/store";

function Gallery({ galleries }) {
  const photoGalleries =
    galleries &&
    galleries.sort((a, b) => a.urutan - b.urutan).filter((x, i) => i < 8);
  
  const { changeActiveMenu } = useContext(MenuBottomCtx)

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.25,
  });

  const animating = useAnimation();

  const animations = {
    off: {
      opacity: 0,
    },
    desktopOn: {
      y: 0,
      opacity: 1,
    },
    destopOff: {
      y: "-20%",
      opacity: 0,
    },
    destopOffBottom: {
      y: "20%",
      opacity: 0,
    },
    transition1: {
      duration: 1.5,
      delay: 0.2,
      type: "spring",
      bounce: 0.2,
    },
  };

  useEffect(() => {
    if (inView) {
      animating.start(animations.desktopOn);
      changeActiveMenu("Gallery")
      console.log("Gallery",inView)
    }
    if (!inView) {
      animating.start(animations.destopOffBottom);
    }
  }, [inView]);

  const showImage = (image) => {
    setIsOpen(!isOpen);
    setSelected(image);
  };

  return (
    <>
      {isOpen ? (
        <div
          className={`fixed inset-0 h-screen w-auto z-50 flex justify-center items-center bg-gray-200 dark:bg-gray-800`}
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {selected && (
              <img
                src={getStrapiMedia(selected.media)}
                alt={selected.media.hash}
                className={`cursor-pointer block box-border h-auto max-h-full w-auto max-w-full object-cover transition duration-300 ease-in-out`}
              />
            )}
          </div>
        </div>
      ) : null}
      <div
        id="Gallery"
        ref={ref}
        className="w-11/12 mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 dark:bg-gray-800 pt-24 pb-12"
      >
        <div className="gallery gap-2 w-full">
          {photoGalleries &&
            photoGalleries
              .sort((a, b) => a.urutan - b.urutan)
              .filter((x, i) => i < 8)
              .map((item, i) => {
                return (
                  <motion.div
                    initial={animations.destopOffBottom}
                    animate={animating}
                    transition={{
                      type: "spring",
                      bounce: 0.5,
                      delay: i / photoGalleries.length,
                      duration: 1.5
                    }}
                    key={item.id}
                    onClick={() => showImage(item)}
                    className={`inline-block align-middle overflow-hidden w-full rounded-xl h-auto mb-2`}
                  >
                    <Image
                      key={item.id}
                      loader={myLoader}
                      src={getStrapiMedia(item.media)}
                      alt={item.media.hash}
                      layout="responsive"
                      width={item.media.width}
                      height={item.media.height}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(
                          item.media.formats.thumbnail.width,
                          item.media.formats.thumbnail.height
                        )
                      )}`}
                      className={`hover:scale-110 cursor-pointer w-full h-auto object-cover transition duration-300 ease-in-out rounded-xl`}
                    />
                  </motion.div>
                );
              })}
        </div>
        <div className="flex justify-center items-center w-full mt-2">
          <Link href="/">
            <motion.a 
              initial={animations.destopOffBottom}
              animate={animating}
              transition={{
                type: "spring",
                bounce: 0.5,
                delay: 1,
                duration: 1.5
              }}
              className="px-3 py-2 uppercase rounded-xl bg-gray-800 dark:bg-gray-200 dark:text-gray-800 text-gray-200">
              more
            </motion.a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Gallery;
