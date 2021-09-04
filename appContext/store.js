import { createContext } from "react";
import { RiArticleLine, RiGalleryLine, RiHeart2Line, RiTimeLine } from "react-icons/ri";
export const GlobalContext = createContext({});

export const navMenu = [
  {id: 1, name: "About", icon: (<RiHeart2Line />)},
  {id: 2, name: "Gallery", icon: (<RiGalleryLine />)},
  {id: 3, name: "Blog", icon: (<RiArticleLine />) },
  {id: 4, name: "Moment", icon: (<RiTimeLine />)},
]