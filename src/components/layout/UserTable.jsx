import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import {
  FiEye,
  FiEdit,
  FiMessageSquare,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const UserTable = ({ image, name, email, phone, company, park }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full min-h-[72px] bg-gradient-to-r from-white/0 via-white/30 to-white/0 flex items-center p-2">
      {/* آواتار کاربر */}
      <div className="flex-shrink-0 relative mr-2">
        <div className="w-8 h-8 rounded-md overflow-hidden border border-white/20">
          <Image
            src={image}
            alt={name || "کاربر"}
            className="w-full h-full object-cover"
            width={32}
            height={32}
          />
        </div>
      </div>

      {/* اطلاعات کاربر */}
      <div className="flex-1 flex items-center gap-2 mr-2 min-w-0">
        {/* اطلاعات اصلی */}
        <div className="flex-1 max-w-[250px]">
          <div className="flex items-center gap-1">
            <h3 className="text-[var(--text-color)] font-bold text-[16px] truncate">
              {name}
            </h3>
          </div>
          <p className="text-gray-300 text-[12px] truncate mt-0.5">{email}</p>

          {/* اطلاعات موبایل */}
          <div className="xl:hidden flex flex-wrap gap-1 mt-1">
            <div className="flex items-center text-[12px] text-[var(--text-color)] bg-[var(--orgin-color)] px-1.5 py-0.5 rounded truncate">
              {phone}
            </div>
            <div className="flex items-center text-[12px] text-[var(--text-color)] bg-[var(--orgin-color)] px-1.5 py-0.5 rounded truncate">
              {company}
            </div>
            <div className="flex items-center text-[12px] text-[var(--text-color)] bg-[var(--orgin-color)] px-1.5 py-0.5 rounded truncat">
              {park}
            </div>
          </div>
        </div>

        {/* اطلاعات دسکتاپ */}
        <div className="hidden xl:grid xl:grid-cols-3 items-center gap-3 text-[10px] min-w-0 flex-1">
          {/* تلفن */}
          <div className="min-w-[70px]">
            <div className="text-gray-300 font-medium truncate  text-[16px]">
              {phone}
            </div>
          </div>

          {/* شرکت */}
          <div className="min-w-[80px] ">
            <div className="text-gray-300 font-medium truncate  text-[16px]">
              {company}
            </div>
          </div>

          {/* پارک */}
          <div className="min-w-[60px] ">
            <div className="text-gray-300 font-medium truncate  text-[16px]">
              {park}
            </div>
          </div>
        </div>
      </div>

      {/* منو */}
      <div className="relative flex-shrink-0" ref={menuRef}>
        {/* دکمه منو */}
        <button
          className={`flex items-center justify-center w-6 h-6 rounded transition-all duration-200 ${
            showMenu
              ? "bg-[var(--orgin-color)] text-white transform scale-105"
              : "text-gray-200 hover:bg-white/10 hover:text-white"
          }`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <IoIosMore size={"1.8rem"} />
        </button>

        {/* منوی آبشاری */}
        {showMenu && (
          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[140px] xl:min-w-[250px] py-0.5 animate-scaleIn origin-top-right">
            {/* پیکان */}
            <div className="absolute -top-1 left-2 w-2 h-2 bg-white border-t border-l border-gray-200 rotate-45"></div>

            {/* آیتم‌های منو */}
            <button className="w-full px-2 py-1.5 text-right text-[10px] xl:text-[18px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-1.5 group">
              <FiEye className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">مشاهده پروفایل</span>
            </button>

            <button className="w-full px-2 py-1.5 text-right text-[10px] xl:text-[18px] text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 flex items-center gap-1.5 group">
              <FiEdit className="text-xs text-gray-400 group-hover:text-green-600 transition-colors" />
              <span className="font-medium">ویرایش اطلاعات</span>
            </button>

            <button className="w-full px-2 py-1.5 text-right text-[10px] xl:text-[18px] text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 flex items-center gap-1.5 group">
              <FiMessageSquare className="text-xs text-gray-400 group-hover:text-purple-600 transition-colors" />
              <span className="font-medium">ارسال پیام</span>
            </button>

            <div className="border-t border-gray-100 my-0.5"></div>

            <button className="w-full px-2 py-1.5 text-right text-[10px] xl:text-[18px] text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-1.5 group">
              <FiTrash2 className="text-xs text-red-400 group-hover:text-red-600 transition-colors" />
              <span className="font-medium">حذف کاربر</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.1s ease-out;
        }
        .dir-ltr {
          direction: ltr;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default UserTable;