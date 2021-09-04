import { getStrapiMedia, myLoader } from "../lib/media"
import Image from 'next/image'

const AboutUs = ({homepage}) => {
  const imageCia = getStrapiMedia(homepage.AboutCia.profilePic)
  const imageAdi = getStrapiMedia(homepage.AboutAdi.profilePic)

  console.log("homepage",homepage)

  return (
    <div id="About" className="relative min-h-screen w-full px-6 bg-gray-800" >
      <div className="absolute top-0 left-0 w-full h-full filter grayscale blur-sm contrast-50">
        <Image loader={myLoader} src={imageCia} alt="nature unplash" layout="fill" className="w-full h-full object-cover" unoptimized/>
      </div>
      <div className="h-full w-full opacity-100 bg-gradient-to-b from-gray-200 dark:from-gray-800 z-10 absolute top-0 left-0"></div>
    </div>
  )
}

export default AboutUs
