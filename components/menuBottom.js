import Link from "next/link";
import React, { useState } from "react";
import { navMenu } from "../appContext/store";

const MenuBottom = () => {
  const [scroll, setScroll] = useState(false);

  return (
    <div
      className={`fixed md:hidden bottom-2 z-50 w-full`}
    >
      <div
        className={`flex justify-around items-center transition-all duration-300 delay-100 ease-linear w-11/12 p-1 mx-auto text-gray-100 bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg rounded-2xl`}
      >
        {navMenu.map((menu) => {
          return (
            <Link href="/" key={menu.id + "mobile"}>
              <a className="flex items-center p-1 font-light focus:no-underline focus:text-gray-300 focus:bg-gray-600 hover:bg-gray-600 hover:text-gray-300 rounded-xl transition-all delay-75 duration-200 ease-in-out">
                <span className="block p-1 text-2xl">
                  {menu.icon}
                </span>
              </a>
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default MenuBottom;
