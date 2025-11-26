"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animation Container */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-800 opacity-10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold text-[var(--orgin-color)] animate-bounce">
              4<span className="text-[#faa560] animate-pulse">0</span>4
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          صفحه مورد نظر یافت نشد!
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن
          تغییر کرده است.
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-gray-600">انتقال خودکار به صفحه اصلی در</span>
            <span className="text-2xl font-bold text-[var(--orgin-color)] w-8">
              {countdown}
            </span>
            <span className="text-gray-600">ثانیه</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-white hover:bg-gray-50 text-[var(--orgin-color)] border border-[var(--orgin-color)] px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            صفحه اصلی
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-4 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[var(--orgin-color)] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-200 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-40 blur-lg"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
