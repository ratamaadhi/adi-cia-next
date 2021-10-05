import React from 'react'
import { getStrapiMedia, myLoader } from '../lib/media'
import Image from 'next/image'

function Hero({homepage}) {
  const imageUrl = getStrapiMedia(homepage.seo.shareImage)
  return (
    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 w-full h-screen">
      <Image loader={myLoader} src={imageUrl} alt="nature unplash" layout="fill" className="w-full h-full object-cover" unoptimized/>
      <div className="h-1/2 w-full opacity-1 bg-gradient-to-t from-gray-200 dark:from-gray-800 z-10 absolute bottom-0 left-0"></div>
    </div>
  )
}

export default Hero
