import Image from 'next/image';
import React from 'react';
import { myLoader } from '../lib/media';
import { shimmer, toBase64 } from '../util/toBase64';
import { MdClose } from 'react-icons/md';

function PreviewImage({
  src = '',
  alt = '',
  width = 0,
  height = 0,
  onClose = () => {},
  ...props
}) {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-full h-full mx-auto backdrop-blur-lg z-50 ">
      <div className="w-full sm:w-11/12 mx-auto flex justify-end mt-2">
        <div className='p-2' onClick={onClose}>
          <MdClose size={24} className='text-white'/>
        </div>
      </div>
      <div className="relative w-full max-w-screen-sm mx-auto h-auto my-auto">
        <Image
          src={src}
          alt={alt}
          layout={'responsive'}
          loader={myLoader}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
          className={`w-full h-full object-cover`}
          {...props}
        />
      </div>
    </div>
  );
}

export default PreviewImage;
