import Image from "next/image";
import { RiArrowLeftSLine, RiTimeLine } from "react-icons/ri";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getStrapiMedia, myLoader } from "../lib/media";
import MdFormat from "../util/md";
import { shimmer, toBase64 } from "../util/toBase64";
import Moment from "moment";
import Footer from "./footer";
import { toSlugPage } from "../util/navigations";
import { useRouter } from "next/router";
import { fetchAPI } from "../lib/api";
import useSWR from "swr";

function Slug({slug}) {
  const { data : selectedBlog } = useSWR("/articles/"+slug, fetchAPI)
  const pageRoute = useRouter();
  return (
    <div
      className={`relative w-11/12 min-h-screen mx-auto md:w-10/12 lg:w-8/12 flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800`}
    >
      <div
        onClick={() => pageRoute.back()}
        className="w-full mx-auto flex flex-1 justify-start items-center p-2"
      >
        <div className="p-1 dark:text-gray-200 text-gray-800 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out duration-300">
          <RiArrowLeftSLine size={26}></RiArrowLeftSLine>
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-gray-200 dark:bg-gray-800 px-4 pt-6">
        <div className="w-full sm:w-8/12 h-auto mx-auto flex justify-between items-center mb-6">
          <div className="text-xs sm:text-sm tracking-wide w-20 flex justify-center items-center py-1 px-2 rounded-xl dark:bg-gray-200 bg-gray-800 text-gray-200 dark:text-gray-800">
            {selectedBlog && selectedBlog.category && selectedBlog.category.slug}
          </div>
          <div className="text-xs sm:text-sm tracking-wide flex justify-center items-center py-1 px-2 dark:text-gray-400 text-gray-600">
            <span className="mr-1">
              <RiTimeLine />
            </span>
            {selectedBlog && Moment(selectedBlog.published_at).fromNow()}
          </div>
        </div>
        <div onClick={() => toSlugPage(selectedBlog.slug)} className="w-full sm:w-8/12 h-auto mx-auto flex justify-between items-center mb-2 dark:text-gray-200 text-gray-800">
          <h2 className="font-bold text-4xl font-poppins">
            {selectedBlog && selectedBlog.title}
          </h2>
        </div>
        <div className="w-full sm:w-8/12 h-auto mx-auto flex justify-between items-center mb-4 dark:text-gray-200 text-gray-800">
          <h3 className="font-light text-sm font-poppins">
            {selectedBlog && selectedBlog.description}
          </h3>
        </div>
        <div
          className={`w-full sm:w-8/12 h-auto mx-auto flex items-center mb-6 dark:text-gray-200 text-gray-800 space-x-2 md:space-x-3`}
        >
          <div
            className={`relative flex justify-center h-6 w-6 md:w-7 md:h-7 rounded-full overflow-hidden shadow-md`}
          >
            <Image
              loader={myLoader}
              src={getStrapiMedia(
                selectedBlog.author.picture.formats.thumbnail
              )}
              alt={selectedBlog.author.picture.formats.thumbnail.hash}
              layout="intrinsic"
              width={selectedBlog.author.picture.formats.thumbnail.width}
              height={selectedBlog.author.picture.formats.thumbnail.height}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  selectedBlog.author.picture.formats.thumbnail.width,
                  selectedBlog.author.picture.formats.thumbnail.height
                )
              )}`}
              className={`absolute top-0 left-0 hover:scale-110 cursor-pointer object-cover transition duration-300 ease-in-out rounded-lg`}
            />
          </div>
          <div className={`text-xss md:text-xs font-semibold `}>
            <div>{selectedBlog.author.name}</div>
            <div className={`dark:text-gray-400 text-gray-600 font-normal`}>
              {selectedBlog.author.email}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-8/12 mx-auto flex justify-between items-center mb-6">
          <div className="relative h-44 sm:h-64 md:h-96 w-full flex justify-center rounded-lg overflow-hidden">
            <Image
              loader={myLoader}
              src={getStrapiMedia(selectedBlog.image)}
              alt={selectedBlog.image.hash}
              layout="fill"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  selectedBlog.image.formats.thumbnail.width,
                  selectedBlog.image.formats.thumbnail.height
                )
              )}`}
              className={`object-cover filter blur-sm`}
            />
          </div>
        </div>
        <div className="markdown-container h-full sm:w-8/12 mx-auto prose max-w-none prose-sm md:prose-lg">
          {selectedBlog && (
            <MdFormat
              markdown={selectedBlog.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Slug;
