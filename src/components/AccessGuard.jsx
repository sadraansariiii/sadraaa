"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfoStore } from "../store/userInfoStore";
import DashboardSection from "./layout/dashboardSection";

export default function AccessGuard({ children }) {
  const router = useRouter();
  const { userInfo } = useInfoStore();
  const [countdown, setCountdown] = useState(5);
  const progress = ((5 - countdown) / 5) * 100; // محاسبه پیشرفت از 0 تا 100%

  useEffect(() => {
    if (userInfo === false) {
      const timer = setTimeout(() => {
        router.push("/dashboard/companyprofilesetup");
      }, 5000);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [userInfo, router]);

  useEffect(() => {
    setCountdown(5);
  }, [userInfo]);

  if (userInfo === false) {
    return (
      <>
        <DashboardSection>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center w-full max-w-md">
              <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                تکمیل پروفایل الزامی است
              </h2>
              <p className="text-white/70 mb-6">
                برای دسترسی به داشبورد، لطفاً اطلاعات شرکت خود را تکمیل کنید.
              </p>

              {/* نوار پیشرفت */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="animate-pulse text-orange-400 text-sm">
                  در حال هدایت به صفحه تکمیل پروفایل...
                </div>
                <div className="text-white">
                  <span className="text-orange-400 font-bold text-lg">
                    {countdown}
                  </span>
                  <span className="text-sm"> ثانیه</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardSection>
      </>
    );
  }

  if (userInfo === true) {
    return <>{children}</>;
  }

  return <DashboardSection></DashboardSection>;
}
