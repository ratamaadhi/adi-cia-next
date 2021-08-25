import { useContext, useEffect } from 'react'
import Link from "next/link";
import { useState } from "react";
import { HiX, HiMenuAlt4 } from "react-icons/hi";
import {RiArticleLine, RiGalleryLine, RiHeart2Line, RiTimeLine} from 'react-icons/ri'
import { GlobalContext, navMenu } from '../appContext/store'

function Navbar({ categories }) {

  const { siteName } = useContext(GlobalContext)
  
  const logoName = siteName.split(" ")
  const [toggle, setToggle] = useState(false);
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.onscroll = function() {scrollFunction()};
  }, [])


  function scrollFunction(){
    document.body.scrollTop > 30 || document.documentElement.scrollTop > 30 ? setScroll(true) : setScroll(false)
  }

  return (
    <div className={`sticky inset-0 z-50 w-full text-gray-100 ${scroll || toggle ? "bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg" : "" }`}>
      <div className={`flex justify-between  items-center transition-all duration-300 delay-100 ease-linear ${scroll ? "py-4" : "py-6 px-2"} w-11/12 mx-auto md:w-10/12`}>
        <div className="cursor-pointer">
          <Link href="/">
            <a className="hover:text-gray-400 focus:no-underline focus:text-gray-300 uppercase text-xl"><span className="font-semibold">{logoName[0]}</span> {logoName[1]}</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          {navMenu.map(menu => 
              <a href="#" key={menu.id + "dekstop"} className="py-1 px-3 rounded-lg focus:no-underline focus:text-gray-300 focus:bg-gray-600 hover:bg-gray-600 hover:text-gray-300 transition-all delay-75 duration-200 ease-in-out">{menu.name}</a>
            )}
        </div>
        {/* <div className={`${scroll || toggle ? "bg-gray-500 shadow-lg" : ""} p-2 flex justify-center items-center rounded-xl md:hidden`} onClick={() => setToggle(!toggle)}>
          {!toggle ? <HiMenuAlt4 /> : <HiX/>}
        </div> */}
      </div>
      <div className={`absolute py-4 space-y-1 z-10 w-full h-screen-menu ${scroll || toggle ? "bg-gradient-to-br from-gray-800 to-gray-700 border-t-2 border-gray-700" : ""} md:hidden shadow-lg ${!toggle ? 'hidden' : 'right-0'}`}>
        {navMenu.map(menu =>
            <Link href="/" key={menu.id + "mobile"}>
              <a className="flex items-center mx-2 py-3 px-4 text-sm font-light focus:no-underline focus:text-gray-300 focus:bg-gray-600 hover:bg-gray-600 hover:text-gray-300 rounded-xl transition-all delay-75 duration-200 ease-in-out"><span className="block p-2 mr-2 text-base rounded-xl bg-gray-500">{menu.icon}</span>{menu.name}</a>
            </Link>
          )}
      </div>
    </div>
  );
}

export default Navbar;
