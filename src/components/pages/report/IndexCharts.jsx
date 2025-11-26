"use client";

import { getLevel } from "@/src/utils/getLevel";
import { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";

const IndexCharts = ({ indexData, loading }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص دستگاه
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  const colorPalette = [
    "rgba(255, 115, 0, 0.8)",
    "rgba(59, 130, 246, 0.8)",
    "rgba(16, 185, 129, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(236, 72, 153, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(6, 182, 212, 0.8)",
    "rgba(99, 102, 241, 0.8)",
    "rgba(220, 38, 38, 0.8)",
    "rgba(5, 150, 105, 0.8)",
    "rgba(109, 40, 217, 0.8)",
    "rgba(190, 18, 60, 0.8)",
    "rgba(217, 119, 6, 0.8)",
    "rgba(15, 118, 110, 0.8)",
    "rgba(55, 65, 81, 0.8)",
    "rgba(147, 51, 234, 0.8)",
    "rgba(190, 24, 93, 0.8)",
  ];

  // تابع برای استخراج رنگ اصلی از rgba
  const getSolidColor = (rgbaColor) => {
    return rgbaColor.replace(/rgba?\(([^)]+)\)/, (match, p1) => {
      const parts = p1.split(',').map(part => part.trim());
      return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    });
  };

  // تابع برای کوتاه کردن متن در موبایل
  const getShortenedLabel = (label, maxLength = 15) => {
    if (!isMobile) return label;

    if (label.length > maxLength) {
      return label.substring(0, maxLength) + "...";
    }
    return label;
  };

  const polarData = {
    labels:
      indexData?.map((index) => getShortenedLabel(index.index_title)) || [],
    datasets: [
      {
        data: indexData?.map((index) => Number(index.percent)) || [],
        backgroundColor:
          indexData?.map((_, index) =>
            selectedIndex === null || selectedIndex === index
              ? colorPalette[index]
              : colorPalette[index].replace("0.8", "0.2")
          ) || [],
        borderColor:
          indexData?.map((_, index) =>
            selectedIndex === null || selectedIndex === index
              ? colorPalette[index].replace("0.8", "1")
              : colorPalette[index].replace("0.8", "0.3")
          ) || [],
        borderWidth:
          indexData?.map((_, index) =>
            selectedIndex === null || selectedIndex === index ? 3 : 1
          ) || [],
        ...(selectedIndex !== null && {
          radius:
            indexData?.map((_, index) =>
              selectedIndex === index ? 150 : 100
            ) || [],
        }),
      },
    ],
  };

  const polarOptions = {
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
        borderColor: "rgba(255, 115, 0, 0.5)",
        borderWidth: 1,
        padding: 12,
        rtl: true,
        bodyFont: {
          family: "Vazir, sans-serif",
          size: 12,
        },
        titleFont: {
          family: "Vazir, sans-serif",
          size: 14,
        },
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const item = indexData[index];
            return [
              `امتیاز: ${item.your_point} از ${item.max_point}`,
              `درصد: ${context.parsed}%`,
            ];
          },
          title: function (context) {
            return context[0].label;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: !isMobile, // نمایش ticks فقط در دسکتاپ
          stepSize: 20,
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "Vazir, sans-serif",
            size: 11,
          },
          backdropColor: "transparent",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
          lineWidth: 1,
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.2)",
          lineWidth: 1,
        },
        pointLabels: {
          display: !isMobile, // نمایش pointLabels فقط در دسکتاپ
          color: "#ffffff",
          font: {
            family: "Vazir, sans-serif",
            size: 11,
            weight: "bold",
          },
          padding: 15,
          backdropColor: "transparent",
          backdropPadding: 0,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        setSelectedIndex(selectedIndex === elementIndex ? null : elementIndex);
      } else {
        setSelectedIndex(null);
      }
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor =
        elements.length > 0 ? "pointer" : "default";
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!indexData || indexData.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-lg">داده‌ای برای نمایش وجود ندارد</p>
        <p className="text-sm mt-2">لطفاً بعداً مجدداً بررسی کنید</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center">
        <div className="w-2/3">
          <div className="h-96 lg:h-[600px] relative">
            <PolarArea data={polarData} options={polarOptions} />
          </div>
        </div>
        <div className="w-1/3 h-full">
          {selectedIndex !== null && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: colorPalette[selectedIndex].replace(
                      "0.8",
                      "1"
                    ),
                  }}
                ></div>
                <h3 className="text-xl font-bold text-white">
                  {indexData[selectedIndex].index_title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div 
                  className="text-center rounded-xl p-4 "
                  style={{
                    backgroundColor: getSolidColor(colorPalette[selectedIndex]).replace(')', ', 0.2)')
                  }}
                >
                  <div className="text-gray-300 text-sm mb-2">درصد موفقیت</div>
                  <div className="text-3xl font-bold text-[var(--orgin-color)]">
                    {Number(indexData[selectedIndex].percent).toFixed(1)}%
                  </div>
                </div>

                <div 
                  className="text-center rounded-xl p-4 "
                  style={{
                    backgroundColor: getSolidColor(colorPalette[selectedIndex]).replace(')', ', 0.2)')
                  }}
                >
                  <div className="text-gray-300 text-sm mb-2">
                    امتیاز کسب شده
                  </div>
                  <div className="text-3xl font-bold text-[var(--orgin-color)]">
                    {indexData[selectedIndex].your_point}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    از {indexData[selectedIndex].max_point} امتیاز
                  </div>
                </div>

                <div 
                  className="text-center rounded-xl p-4 "
                  style={{
                    backgroundColor: getSolidColor(colorPalette[selectedIndex]).replace(')', ', 0.2)')
                  }}
                >
                  <div className="text-gray-300 text-sm mb-2">وضعیت</div>
                  <div className="text-3xl text-[var(--orgin-color)] font-bold">
                    {getLevel(Number(indexData[selectedIndex].percent))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* نمایش لیست برچسب‌ها در موبایل */}
        {isMobile && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {indexData?.map((index, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedIndex === i
                    ? "border-orange-500"
                    : "border-gray-600"
                }`}
                style={{
                  backgroundColor: getSolidColor(colorPalette[i]).replace(')', ', 0.1)')
                }}
                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette[i] }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {index.index_title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {Number(index.percent).toFixed(1)}% - {index.your_point} از{" "}
                    {index.max_point}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexCharts;