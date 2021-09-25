import { getStrapiURL } from "./api";
import AdiCiaLogo from '../public/AdiCiaLogo-removebg-preview.png'

function getStrapiMedia(media) {
  const imageUrl = media !== null ? media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url : AdiCiaLogo;
  return imageUrl;
}

function myLoader(load) {
    return `${load.src}?w=${load.width}&q=${load.quality || 75}`;
}

export { getStrapiMedia, myLoader }