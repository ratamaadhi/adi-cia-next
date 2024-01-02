import Image from 'next/image';
import React from 'react';
import { myLoader } from '../../../lib/media';
import { shimmer, toBase64 } from '../../../util/toBase64';

function LoadingPageWedding({ data }) {
  return (
    <div className="fixed z-20 h-screen w-full flex justify-center items-center text-white">
      <Image
        src={data.imageSection1.url}
        loader={myLoader}
        alt={data.imageSection1.hash}
        layout="fill"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(
            data.imageSection1.formats.thumbnail.width,
            data.imageSection1.formats.thumbnail.height
          )
        )}`}
        className={`absolute top-0 left-0 hover:scale-110 cursor-pointer object-cover`}
      />
      <div className="absolute inset-0 h-full w-full bg-violet-900/30" />
      <div className="h-1/4 w-full absolute bottom-0 bg-gradient-to-t from-slate-950 via-violet-900/30" />
      <div className="animate-bounce">Loading...</div>
    </div>
  );
}

export default LoadingPageWedding;
