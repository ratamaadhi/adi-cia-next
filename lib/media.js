import { getStrapiURL } from "./api";
import AdiCiaLogo from '../public/AdiCiaLogo-removebg-preview.png'

export function getStrapiMedia(media) {
  const imageUrl = media !== null ? media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url : AdiCiaLogo;
  return imageUrl;
}

export function myLoader(load) {
    return `${load.src}`;
}