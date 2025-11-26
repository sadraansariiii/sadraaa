"use client";

import { useState } from "react";
import { useSessionStore } from "@/src/store/sessionStore";
import { useNameStore } from "@/src/store/userNameStore";

const CompanyInfoAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { clientId, token } = useSessionStore();
  const { userName } = useNameStore();

  const getProfile = async () => {
    if (!clientId || !token || !userName) {
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        setUserProfile({
          about: {
            coname: "شرکت نمونه",
            c_number: "12345",
            r_number: "67890",
            postcode: "1234567890",
            address: "آدرس نمونه شرکت",
            website: "www.example.com",
            cophone: "02112345678",
            rabet_phone: "09123456789",
            coemail: "info@example.com",
          },
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (!isOpen && !userProfile) {
      await getProfile();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleToggle}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg border border-orange-500/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
              در حال بارگذاری...
            </>
          ) : (
            <>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isOpen ? "بستن" : "نمایش اطلاعات شرکت"}
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="animate-fadeIn">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : userProfile ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">نام شرکت</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.coname || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">شماره ثبت</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.c_number || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">شماره اقتصادی</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.r_number || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">کد پستی</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.postcode || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center xl:col-span-2 bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">آدرس</span>
                <span className="text-white font-semibold text-sm leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {userProfile?.about?.address || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">وب‌سایت</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.website || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">تلفن شرکت</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.cophone || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">تلفن رابط</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.rabet_phone || "نامشخص"}
                </span>
              </div>

              <div className="h-20 text-center bg-gray-800/60 rounded-2xl px-6 py-2 border border-gray-700 shadow-lg shadow-black/20 flex justify-between items-center">
                <span className="text-gray-300 mb-1">ایمیل</span>
                <span className="text-white font-semibold text-lg">
                  {userProfile?.about?.coemail || "نامشخص"}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8 bg-gray-800/50 rounded-xl border border-gray-700">
              <p>خطا در بارگذاری اطلاعات شرکت</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyInfoAccordion;