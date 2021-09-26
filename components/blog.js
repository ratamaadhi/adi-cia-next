import { useContext, useEffect, useRef, useState } from "react";
import Moment from "moment";
import Image from "next/image";
import { getStrapiMedia, myLoader } from "../lib/media";
import { shimmer, toBase64 } from "../util/toBase64";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MenuBottomCtx } from "../appContext/store";

function Blog({ articles, categories }) {
  const dragRef = useRef(null);
  const dragItem = useRef(null);

  const { changeActiveMenu } = useContext(MenuBottomCtx);

  const [getCategories, setCategories] = useState("");
  const [canDrag, setCanDrag] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.35,
  });

  const animating = useAnimation();
  const animatingCategory = useAnimation();

  const animations = {
    off: {
      opacity: 0,
    },
    desktopOn: {
      y: 0,
      opacity: 1,
    },
    mobileOnLeft: {
      x: 0,
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
  };

  useEffect(() => {
    dragRef.current.clientWidth < dragItem.current.clientWidth
      ? setCanDrag(true)
      : setCanDrag(false);
  }, [dragRef, dragItem]);

  useEffect(() => {
    if (inView) {
      animating.start(animations.desktopOn);
      animatingCategory.start(animations.mobileOnLeft);
      changeActiveMenu("Blog");
      console.log("Blog", inView);
    }
    if (!inView) {
      animating.start(animations.destopOffBottom);
      animatingCategory.start(animations.mobileOffLeft);
    }
  }, [inView]);

  return (
    <div
      id="Blog"
      ref={ref}
      className="relative w-11/12 mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 pt-24"
    >
      <div className="px-3">
        <motion.div
          initial={animations.mobileOffLeft}
          animate={animatingCategory}
          transition={{
            type: "spring",
            bounce: 0.2,
            delay: 0.1,
            duration: 1.5,
          }}
          className={`flex items-center text-2xl md:text-4xl font-semibold dark:font-normal py-3 md:py-5`}
        >
          <h1>Blogs</h1>
        </motion.div>
        <div
          ref={dragRef}
          className="relative flex items-center py-5 overflow-x-hidden"
        >
          <motion.div
            ref={dragItem}
            drag={"x"}
            dragConstraints={canDrag ? dragRef : dragItem}
            className={`absolute top-1 left-0 flex items-center space-x-1`}
          >
            <motion.div
              initial={animations.mobileOffLeft}
              animate={animatingCategory}
              transition={{
                type: "spring",
                bounce: 0.2,
                delay: 0.3,
                duration: 1.5,
              }}
              onClick={() => setCategories("all")}
              className={`${
                "all" == getCategories
                  ? "bg-gray-700 dark:bg-gray-300 text-gray-300 dark:text-gray-800"
                  : "text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800"
              } cursor-pointer no-underline focus:no-underline text-sm tracking-wide w-20 flex justify-center items-center py-1 px-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-300 shadow-lg`}
            >
              all
            </motion.div>
            {categories &&
              categories.map((category, i) => {
                const { name, slug, id } = category;
                return (
                  <motion.div
                    key={id}
                    initial={animations.mobileOffLeft}
                    animate={animatingCategory}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      delay: 0.3,
                      duration: 1.5,
                    }}
                    onClick={() => setCategories(id)}
                    className={`${
                      id == getCategories
                        ? "bg-gray-700 dark:bg-gray-300 text-gray-300 dark:text-gray-800"
                        : "text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800"
                    } cursor-pointer no-underline focus:no-underline text-sm tracking-wide w-20 flex justify-center items-center py-1 px-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-300 shadow-lg`}
                  >
                    {name.toLowerCase()}
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
        <div
          className={`${
            articles.length > 6 ? "gallery" : "grid grid-cols-3 "
          } gap-2 w-full pt-1 mx-auto`}
        >
          {articles &&
            articles.map((article, i) => {
              const { id, title, author, slug, category, image, published_at } =
                article;
              return (
                <motion.div
                  initial={animations.destopOffBottom}
                  animate={animating}
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    delay: (i / articles.length),
                    duration: 1.5,
                  }}
                  key={id}
                  className={
                    "inline-block align-middle overflow-hidden w-full rounded-xl h-auto mb-2 p-1.5 md:p-2.5 bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 "
                  }
                >
                  {image ? (
                    <div
                      className={`relative flex justify-center md:max-h-52 max-h-40 rounded-lg overflow-hidden shadow-md`}
                    >
                      <Image
                        loader={myLoader}
                        src={getStrapiMedia(image.formats.medium)}
                        alt={image.hash}
                        layout="intrinsic"
                        width={image.width}
                        height={image.height}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(
                            image.formats.thumbnail.width,
                            image.formats.thumbnail.height
                          )
                        )}`}
                        className={`absolute top-0 left-0 hover:scale-110 cursor-pointer object-cover transition duration-300 ease-in-out rounded-lg`}
                      />
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-col p-1.5 space-y-1 md:space-y-2 tracking-wide`}
                  >
                    <div
                      className={`text-xs md:text-sm line-clamp-3 font-semibold leading-tight`}
                    >
                      {title}
                    </div>
                    <div className={`flex items-center space-x-2 md:space-x-3`}>
                      <div
                        className={`relative flex justify-center h-5 w-5 md:w-7 md:h-7 rounded-full overflow-hidden shadow-md`}
                      >
                        <Image
                          loader={myLoader}
                          src={getStrapiMedia(author.picture.formats.thumbnail)}
                          alt={author.picture.formats.thumbnail.hash}
                          layout="intrinsic"
                          width={author.picture.formats.thumbnail.width}
                          height={author.picture.formats.thumbnail.height}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(
                              author.picture.formats.thumbnail.width,
                              author.picture.formats.thumbnail.height
                            )
                          )}`}
                          className={`absolute top-0 left-0 hover:scale-110 cursor-pointer object-cover transition duration-300 ease-in-out rounded-lg`}
                        />
                      </div>
                      <div className={`text-xss md:text-xs font-semibold `}>
                        <div>{author.name}</div>
                        <div
                          className={`text-gray-300 dark:text-gray-600 font-normal`}
                        >
                          {Moment(published_at).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
