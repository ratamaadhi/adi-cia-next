import { useEffect, useRef, useState } from "react";
import Moment from "moment";
import Image from "next/image";
import { getStrapiMedia, myLoader } from "../lib/media";
import { shimmer, toBase64 } from "../util/toBase64";
import { motion } from "framer-motion";

function Blog({ articles, categories }) {
  const dragRef = useRef(null);
  const dragItem = useRef(null);
  const [getCategories, setCategories] = useState("");
  const [canDrag, setCanDrag] = useState(true);

  // console.log("articles", articles);
  // console.log("categories", categories);

  useEffect(() => {
    dragRef.current.clientWidth < dragItem.current.clientWidth
      ? setCanDrag(true)
      : setCanDrag(false);
  }, [dragRef, dragItem]);

  return (
    <div
      id="Blog"
      className="relative w-11/12 mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 pt-24"
    >
      {/* <div className="h-1/6 w-full opacity-110 bg-gradient-to-b from-gray-200 dark:from-gray-800 z-10 absolute top-0 left-0"></div> */}
      <div className="px-3">
        <div
          className={`flex items-center text-2xl md:text-4xl font-semibold dark:font-normal py-3 md:py-5`}
        >
          <h1>Blogs</h1>
        </div>
        <div
          ref={dragRef}
          className="relative flex items-center py-5 overflow-x-hidden"
        >
          <motion.div
            ref={dragItem}
            animate={{}}
            drag={"x"}
            dragConstraints={canDrag ? dragRef : dragItem}
            className={`absolute top-1 left-0 flex items-center space-x-1`}
          >
            <div
              onClick={() => setCategories("all")}
              className={`${
                "all" == getCategories
                ? "bg-gray-700 dark:bg-gray-300 text-gray-300 dark:text-gray-800"
                : "text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800"
              } cursor-pointer no-underline focus:no-underline text-sm tracking-wide w-20 flex justify-center items-center py-1 px-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-300 shadow-lg`}
            >
              all
            </div>
            {categories &&
              categories.map((category, i) => {
                const { name, slug, id } = category;
                return (
                  <div
                    key={id}
                    onClick={() => setCategories(id)}
                    className={`${
                      id == getCategories
                        ? "bg-gray-700 dark:bg-gray-300 text-gray-300 dark:text-gray-800"
                        : "text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800"
                    } cursor-pointer no-underline focus:no-underline text-sm tracking-wide w-20 flex justify-center items-center py-1 px-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-300 shadow-lg`}
                  >
                    {name.toLowerCase()}
                  </div>
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
              // console.log("image", image);
              return (
                <div
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
                  <div className={`flex flex-col p-1.5 space-y-1 md:space-y-2 tracking-wide`}>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
