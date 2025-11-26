"use client";

import { getLevel } from "@/src/utils/getLevel";
import { Doughnut } from "react-chartjs-2";

import { CiWarning } from "react-icons/ci";

const RiskAssessment = ({ riskData }) => {

  // استخراج داده‌ها از riskData
  const riskInfo = riskData?.[2] || {};
  const totalQuestions = riskData?.[1] || 0;

  const finalScore = riskInfo.percent || 0;

  // داده‌های چارت
  const doughnutData = {
    labels: ["امتیاز کسب شده", "باقیمانده"],
    datasets: [
      {
        data: [finalScore, 100 - finalScore],
        backgroundColor: ["rgba(255, 0, 0, 0.8)", "rgba(75, 85, 99, 0)"],
        borderColor: ["rgba(255, 0, 0, 1)", "rgba(75, 85, 99, 0)"],
        borderWidth: 2,
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* بخش چارت */}
        <div className="lg:col-span-1">
          <div className="h-64 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="text-4xl font-extrabold text-[#d20606] drop-shadow-lg">
                {finalScore.toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm mt-1">امتیاز نهایی</div>
            </div>
          </div>
        </div>

        {/* بخش اطلاعات */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* کارت امتیاز */}
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-xl">تعداد ریسک:</div>
                  <div className="text-xl font-extrabold text-red-500">
                    {totalQuestions}
                  </div>
                </div>
              </div>
            </div>

            {/* کارت وضعیت */}
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-xl">سطح:</div>
                  <div className={`text-xl font-bold text-red-500`}>
                    {getLevel(finalScore)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* پیام وضعیت */}
          <div className="rounded-xl py-2 px-4 border bg-red-500/10 border-red-500/30">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div className="flex gap-2  items-center">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <CiWarning size={35} />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-red-500">
                      نیاز به بررسی
                    </h4>
                  </div>
                  <p className="text-gray-200 text-xl">
                    برای مشاهده بیشتر به سوالات مراجعه کنید
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
