import React from 'react';
import { shimmer, toBase64 } from '../../../util/toBase64';
import Image from 'next/image';
import { myLoader } from '../../../lib/media';
import { motion } from 'framer-motion';
import { BsEnvelopePaperHeart } from 'react-icons/bs';

function InvitationPopup({ setOpen = () => {}, open = true, name = '', data }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="fixed z-10 h-screen w-full bg-violet-900/30 antialiased"
    >
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
        className={`absolute top-0 left-0 hover:scale-110 cursor-pointer object-cover transition duration-300 ease-in-out`}
      />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        exit={{ opacity: 0, y: 100, scale: 6, transition: { duration: 1.25 } }}
        className="absolute inset-0 z-10 bg-violet-900/30 h-full w-full p-6 flex flex-col justify-center items-center text-white gap-2 font-poppins"
      >
        <div>Dear, </div>
        <div className="font-semibold text-xl">{name ?? ''}</div>
        <div className="mb-12">You Are Invited!</div>
        <div className="">The Wedding Celebration of</div>
        <div className="text-4xl font-satisfy">Adhi & Cia</div>
        <div>#ItWillAlwaysYou</div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 absolute w-[90%] lg:w-auto bottom-24 rounded-md shadow-md bg-violet-200 border border-violet-950 text-violet-950 flex items-center justify-center gap-2"
        >
          <BsEnvelopePaperHeart size={16} /> <span>Open Invitation</span>
        </button>
      </motion.div>
      <div className="h-1/4 w-full absolute bottom-0 bg-gradient-to-t from-slate-950 via-violet-900/30" />
    </motion.div>
  );
}

export default InvitationPopup;
