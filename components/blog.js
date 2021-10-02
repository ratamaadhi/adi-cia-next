import { useContext, useEffect, useRef, useState } from "react";
import Moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, myLoader } from "../lib/media";
import { shimmer, toBase64 } from "../util/toBase64";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MenuBottomCtx } from "../appContext/store";
import ModalBlog from "./modalBlog";
import { useRouter } from "next/router";

function Blog({ articles, categories }) {
  const pageRoute = useRouter();
  const dragRef = useRef(null);
  const dragItem = useRef(null);

  const { changeActiveMenu } = useContext(MenuBottomCtx);

  const [getCategories, setCategories] = useState("");
  const [canDrag, setCanDrag] = useState(true);
  const [articleByCategory, setArticleByCategory] = useState(articles);
  const [mdScreen, setMdScreen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.25,
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
    const md = window.matchMedia("(min-width: 768px)");
    if (!md.matches) {
      setMdScreen(true);
    }
  }, []);

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

  const handleCategory = (slug) => {
    setCategories(slug);
    const all = articles;
    if (slug != "all") {
      const selectedCategory = all.filter(
        (article, i) => article.category.slug == slug
      );
      setArticleByCategory(selectedCategory);
    } else {
      setArticleByCategory(articles);
    }
  };

  const showBlog = (article) => {
    setOpenBlog(true);
    setSelectedBlog(article);
  };

  return (
    <>
      {openBlog ? (
        <ModalBlog selectedBlog={selectedBlog} setOpenBlog={setOpenBlog} />
      ) : null}
      <div
        id="Blog"
        ref={ref}
        className={`relative w-11/12 sm:h-full sm:min-h-full min-h-screen mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 overflow-hidden ${
          pageRoute.route == "/" ? "pt-24" : "pt-20"
          // 'pt-24'
        }`}
      >
        <div className="">
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
                onClick={() => handleCategory("all")}
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
                      onClick={() => handleCategory(slug)}
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
          <AnimatePresence>
            <motion.div
              initial={animations.destopOffBottom}
              animate={animating}
              transition={{
                type: "spring",
                bounce: 0.5,
                delay: 0.2,
                duration: 1.5,
              }}
              exit={animations.destopOffBottom}
              key={1}
              className={`${
                articleByCategory.length == 0 ? "w-full" : "gallery"
              } gap-x-2 w-full pt-1 mx-auto`}
            >
              {articleByCategory && articleByCategory.length == 0 ? (
                <motion.div
                  initial={animations.destopOffBottom}
                  animate={animations.desktopOn}
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    delay: 0.2,
                    duration: 1.5,
                  }}
                  exit={animations.destopOffBottom}
                  className={
                    "inline-block align-middle overflow-hidden w-full rounded-xl h-auto mb-2 p-1.5 md:p-2.5 bg-gray-700 text-gray-200 dark:bg-gray-400 dark:text-gray-800 "
                  }
                >
                  <div
                    className={`relative flex justify-center rounded-lg overflow-hidden`}
                  >
                    no blog with this category
                  </div>
                </motion.div>
              ) : null}
              {articleByCategory &&
                articleByCategory
                  .filter((x, i) => i < (pageRoute.route == "/" ? 8 :articleByCategory.length))
                  .map((article, i) => {
                    const {
                      id,
                      title,
                      author,
                      slug,
                      category,
                      image,
                      published_at,
                    } = article;
                    return (
                      <motion.div
                        initial={animations.destopOffBottom}
                        animate={animations.desktopOn}
                        transition={{
                          type: "spring",
                          bounce: 0.5,
                          delay: i / articleByCategory.length,
                          duration: 1.5,
                        }}
                        exit={animations.destopOffBottom}
                        key={id}
                        className={
                          "inline-block align-middle overflow-hidden w-full cursor-pointer rounded-xl h-auto mb-2 p-1.5 md:p-2.5 bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 "
                        }
                        onClick={() => showBlog(article)}
                      >
                        {image ? (
                          <div
                            className={`relative flex justify-center md:max-h-40 max-h-32 rounded-lg overflow-hidden shadow-md`}
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
                          <div
                            className={`flex items-center space-x-2 md:space-x-3`}
                          >
                            <div
                              className={`relative flex justify-center h-5 w-5 md:w-7 md:h-7 rounded-full overflow-hidden shadow-md`}
                            >
                              <Image
                                loader={myLoader}
                                src={getStrapiMedia(
                                  author.picture.formats.thumbnail
                                )}
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
                            <div
                              className={`text-xss md:text-xs font-semibold `}
                            >
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
            </motion.div>
            {pageRoute.route == "/" ? (
              <motion.div
                key={2}
                initial={animations.destopOffBottom}
                animate={animating}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  delay: 1.5,
                  duration: 1.5,
                }}
                exit={animations.destopOffBottom}
                className={"flex justify-center items-center w-full mt-2"}
              >
                <Link href={`/blog`}>
                  <a
                    className={`px-3 py-2 uppercase rounded-xl bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 cursor-pointer`}
                  >
                    more
                  </a>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Blog;
