// components/report/RealHonestyAssessment.jsx
"use client";

import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import BaseUrl from "@/src/utils/baseUrl";
import { useSessionStore } from "@/src/store/sessionStore";
import { getLevel } from "@/src/utils/getLevel";

const RealHonestyAssessment = ({ assessment }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [honestyData, setHonestyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { clientId, token } = useSessionStore();
  const itemsPerPage = 5;

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

      if (result.done) {
        setHonestyData({
          score: calculateHonestyScore(result.data),
          items: result.data || [],
        });
      } else {
        throw new Error(result.errors);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching honesty data:", error);
      setLoading(false);
    }
  };

  const calculateHonestyScore = (data) => {
    if (!data || data.length === 0) return 100;
    // محاسبه امتیاز بر اساس تعداد موارد تناقض
    const totalItems = data.length;
    // فرض: هر مورد تناقض 10 امتیاز کم می‌کند
    const penalty = Math.min(totalItems * 10, 100);
    return Math.max(100 - penalty, 0);
  };

  useEffect(() => {
    fetchHonestyData();
  }, [assessment, clientId, token]);

  const currentItems =
    honestyData?.items?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const totalPages = Math.ceil(
    (honestyData?.items?.length || 0) / itemsPerPage
  );

  const doughnutData = {
    labels: ["امتیاز صداقت"],
    datasets: [
      {
        data: [honestyData?.score || 0, 100 - (honestyData?.score || 0)],
        backgroundColor: ["#ff0000", "rgba(75, 85, 99, 0)"],
        borderColor: ["rgba(34, 197, 94, 0.1)", "rgba(75, 85, 99, 0)"],
        borderWidth: 1,
        cutout: "30%",
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
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#f1f5f9",
        bodyColor: "#e2e8f0",
        borderColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
        padding: 12,
        rtl: true,
        bodyFont: {
          family: "Vazir, sans-serif",
        },
        titleFont: {
          family: "Vazir, sans-serif",
        },
        callbacks: {
          label: function (context) {
            return `امتیاز صداقت: ${context.parsed}%`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="text-center mb-4">
            <h3 className="text-white font-bold text-lg">
              امتیاز صداقت در ارزیابی
            </h3>
          </div>
          <div className="h-64 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
                  {honestyData?.score || 0}%
                </div>
                <div className="text-gray-400 text-sm mt-1">امتیاز شما</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="text-3xl font-extrabold text-green-400 mb-2">
                {honestyData?.items?.length || 0}
              </div>
              <div className="text-gray-300 text-sm">
                مورد تناقض شناسایی شده
              </div>
              <div className="text-gray-500 text-xs mt-1">
                در پاسخ‌های ارزیابی
              </div>
            </div>

            <div className="text-center bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="text-2xl font-extrabold text-blue-400 mb-2">
                {getLevel(honestyData)}
              </div>
              <div className="text-gray-300 text-sm">سطح صداقت</div>
              <div className="text-gray-500 text-xs mt-1">بر اساس پاسخ‌ها</div>
            </div>
          </div>

          <div className="mt-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-green-400 font-bold text-lg mb-3">توضیحات</h4>
            <p className="text-gray-200 text-sm leading-6">
              این امتیاز نشان‌دهنده میزان صداقت شما در پاسخ‌گویی به سوالات
              ارزیابی است. موارد تناقض شناسایی شده در پاسخ‌ها بر این امتیاز
              تأثیر گذاشته است. هرچه این امتیاز بالاتر باشد، نشان‌دهنده
              پاسخ‌گویی صادقانه‌تر شما بوده و نتایج ارزیابی قابل اتکاتر خواهد
              بود.
            </p>
          </div>
        </div>
      </div>

      {/* موارد تناقض */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
          <h4 className="text-white font-bold text-xl">
            موارد تناقض شناسایی شده
          </h4>
        </div>

        {honestyData?.items?.length === 0 ? (
          <div className="text-center text-gray-400 py-8 bg-gray-800/50 rounded-xl border border-gray-700">
            <p>هیچ مورد تناقضی در پاسخ‌های شما شناسایی نشد</p>
            <p className="text-sm mt-2">
              این نشان‌دهنده پاسخ‌گویی صادقانه شماست
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div
                  key={item.idd}
                  className="bg-gray-800/60 rounded-2xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-green-500/30"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex-shrink-0">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                          <p className="text-gray-200 text-sm leading-6">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  قبلی
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                        currentPage === page
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/25"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-all duration-300"
                >
                  بعدی
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="text-center text-gray-400 text-sm mt-4">
              نمایش {(currentPage - 1) * itemsPerPage + 1} تا{" "}
              {Math.min(
                currentPage * itemsPerPage,
                honestyData?.items?.length || 0
              )}{" "}
              از {honestyData?.items?.length || 0} مورد
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RealHonestyAssessment;
