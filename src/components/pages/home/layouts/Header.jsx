"use client";

import Logo from "@/public/img/expot2.png";
import Image from "next/image";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

const Header = ({ userInfo }) => {
  // رنگ اصلی
  const ORANGE_COLOR = "#ff7300";
  const ORANGE_COLOR_500 = "#ff7300";
  const ORANGE_COLOR_600 = "#e66900";
  const GREEN_COLOR = "#10b981";
  const GREEN_COLOR_500 = "#10b981";
  const GREEN_COLOR_600 = "#059669";

  return (
    <header className="absolute top-0 left-0 h-fit right-0 z-50 bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-sm border-b border-gray-700/30">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center space-x-3 space-x-reverse">
            <Image src={Logo} className="h-16 xl:h-20 w-fit" alt="expot" />
          </div>
          <div className="flex items-center gap-2 space-x-4 space-x-reverse">
            {userInfo && userInfo.done ? (
              <Link
                href={
                  userInfo.data.r_form
                    ? "/dashboard"
                    : "/dashboard/companyprofilesetup"
                }
              >
                <button
                  className="text-white font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl border backdrop-blur-sm cursor-pointer "
                  style={{
                    background: `linear-gradient(to right, ${GREEN_COLOR_500}, ${GREEN_COLOR_600})`,
                    borderColor: `${GREEN_COLOR}40`,
                    boxShadow: `0 20px 25px -5px ${GREEN_COLOR}25, 0 10px 10px -5px ${GREEN_COLOR}10`,
                  }}
                >
                  <span className="flex justify-center items-center gap-2">
                    <span>{userInfo.data.name}</span>
                    <IoLogInOutline size={"1.4rem"} />
                  </span>
                </button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button
                  className="text-white font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl border backdrop-blur-sm cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
                    borderColor: `${ORANGE_COLOR}40`,
                    boxShadow: `0 20px 25px -5px ${ORANGE_COLOR}25, 0 10px 10px -5px ${ORANGE_COLOR}10`,
                  }}
                >
                  <span>ورود / ثبت نام</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
