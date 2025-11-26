"use client";

import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import { getLevel } from "@/src/utils/getLevel";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { CiWarning } from "react-icons/ci";

const HonestyAssessment = ({ assessment, overallScore }) => {
  const [honestyData, setHonestyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { clientId, token } = useSessionStore();

  const fetchHonestyData = async () => {
    if (!clientId || !token || !assessment) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(BaseUrl("/assessment/report/reportas"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: assessment.AScode,
          type: "sedagat",
        }),
      });

      const result = await response.json();
      
      
      if (result.done && result.data && Object.keys(result.data).length > 0) {
        // محاسبه تعداد عدم صداقت‌ها (تقسیم بر 2)
        const totalItems = Object.keys(result.data).length;
        const actualDeductions = Math.floor(totalItems / 2); // تقسیم بر 2 و گرد کردن به پایین
        
        // محاسبه امتیاز نهایی با کسر 1% برای هر مورد صداقت واقعی
        const totalDeductions = actualDeductions * 1;
        const originalScore = parseFloat(overallScore) || 0;
        const finalScore = Math.max(0, originalScore - totalDeductions);
        
        // تبدیل داده‌ها به آرایه و حذف موارد تکراری بر اساس ID
        const dataArray = Object.values(result.data);
        const uniqueQuestions = dataArray.filter((item, index, self) =>
          index === self.findIndex((t) => t.idd === item.idd)
        );

        setHonestyData({
          originalScore: originalScore,
          finalScore: finalScore,
          deductions: totalDeductions,
          totalQuestions: actualDeductions, // استفاده از تعداد واقعی
          questions: uniqueQuestions.map((item, index) => ({
            id: item.idd || index,
            question: `تناقض در سوال ${item.idd}`,
            answer: item.caption,
          })),
        });
      } else {
        // اگر داده‌ای وجود نداشته باشد
        setHonestyData({
          originalScore: parseFloat(overallScore) || 0,
          finalScore: parseFloat(overallScore) || 0,
          deductions: 0,
          totalQuestions: 0,
          questions: [],
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching honesty data:", error);
      setHonestyData({
        originalScore: parseFloat(overallScore) || 0,
        finalScore: parseFloat(overallScore) || 0,
        deductions: 0,
        totalQuestions: 0,
        questions: [],
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHonestyData();
  }, [assessment, overallScore]);

  const hasDeductions = honestyData?.deductions > 0;

  // داده‌های چارت - تغییر رنگ بر اساس وجود عدم صداقت
  const doughnutData = {
    labels: ["امتیاز کسب شده", "امتیاز باقیمانده"],
    datasets: [
      {
        data: [
          honestyData?.finalScore || 0,
          100 - (honestyData?.finalScore || 0),
        ],
        backgroundColor: [
          hasDeductions 
            ? "rgba(239, 68, 68, 0.8)" // قرمز برای حالت عدم صداقت
            : "rgba(34, 197, 94, 0.8)", // سبز برای حالت بدون عدم صداقت
          "rgba(75, 85, 99, 0)", // خاکستری تیره برای بخش باقیمانده
        ],
        borderColor: [
          hasDeductions 
            ? "rgba(239, 68, 68, 1)" 
            : "rgba(34, 197, 94, 1)", 
          "rgba(75, 85, 99, 0.5)"
        ],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* بخش چارت */}
        <div className="lg:col-span-1">
          <div className="h-64 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div 
                className={`text-4xl font-extrabold drop-shadow-lg ${
                  hasDeductions ? "text-red-400" : "text-green-400"
                }`}
              >
                {(honestyData?.finalScore || 0).toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm mt-1">از ۱۰۰ امتیاز</div>
            </div>
          </div>
        </div>

        {/* بخش اطلاعات */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex  items-center justify-center gap-1">
                  <div className="text-gray-300 text-xl mb-1">امتیاز اصلی:</div>
                  <div className={`text-xl font-extrabold ${
                    hasDeductions ? "text-red-400" : "text-green-400"
                  }`}>
                    {(honestyData?.originalScore || 0).toFixed(1)}%
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="text-gray-300 text-xl mb-1">
                    موارد عدم صداقت:
                  </div>
                  <div
                    className={`text-xl font-extrabold ${
                      hasDeductions ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {honestyData?.totalQuestions || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* کارت وضعیت */}
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex  items-center justify-center gap-1">
                  <div className="text-gray-300 text-xl mb-1">
                    وضعیت نهایی:{" "}
                  </div>
                  <div className="text-xl font-bold text-gray-200">
                    {getLevel(honestyData?.finalScore)}
                  </div>
                </div>
                {hasDeductions && (
                  <div className="flex  items-center justify-center gap-1">
                    <div className="text-gray-300 text-xl mb-1">
                      امتیاز کسر شده
                    </div>
                    <div className="text-xl font-bold text-red-400">
                      {honestyData?.deductions || 0}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* پیام وضعیت */}
          <div
            className={`rounded-xl px-4 py-2 border ${
              hasDeductions
                ? "bg-red-500/10 border-red-500/30"
                : "bg-green-500/10 border-green-500/30"
            }`}
          >
            <div className="text-center">
              {hasDeductions ? (
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div className="flex gap-2  items-center">
                    <div className="w-12 h-12 bg-red-400 text-white rounded-full flex items-center justify-center">
                      <CiWarning size={35} />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-red-400">
                      نیاز به بررسی
                    </h4>
                  </div>
                  <p className="text-gray-200 text-xl">
                    برای مشاهده بیشتر به سوالات مراجعه کنید
                  </p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div className="flex gap-2  items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-green-400 font-bold text-lg mb-2">
                      تبریک!
                    </h4>
                  </div>
                  <p className="text-gray-200 text-xl">
                    هیچ مورد عدم صداقتی شناسایی نشد
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonestyAssessment;