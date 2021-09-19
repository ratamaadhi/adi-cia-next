import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, myLoader } from "../lib/media";

function Gallery({ galleries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
        className="w-11/12 mx-auto md:w-10/12 lg:w-8/12 bg-gray-200 dark:bg-gray-800 pt-24"
      >
        <div className="gallery gap-2 w-full">
          {galleries &&
            galleries.sort((a,b) => a.urutan - b.urutan ).filter((x,i) => i < 10).map((item, i) => {
              return (
                <div
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
                    className={`hover:scale-110 cursor-pointer w-full h-auto object-cover transition duration-300 ease-in-out rounded-xl`}
                  />
                </div>
              )
            })}
        </div>
        <div className="flex justify-center items-center w-full mt-2">
          <Link href="/">
            <a className="px-3 py-2 uppercase rounded-xl bg-gray-800 dark:bg-gray-200 dark:text-gray-800 text-gray-200">
              view more
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Gallery;
