"use client";

import { Doughnut } from "react-chartjs-2";
import SectionTitle from "@/src/components/ui/title";
import OverallAssessmentTabs from "./OverallAssessmentTabs";
import IndexCharts from "./IndexCharts";
import { getLevel } from "@/src/utils/getLevel";

const OverallAssessment = ({
  overallData,
  loading,
  sectionsData,
  indexData,
  assessment,
  riskData,
}) => {
  const calculateOverallScore = () => {
    if (!overallData) return 0;
    return overallData.youp || 0;
  };
  const overallScore = calculateOverallScore();

  const doughnutData = {
    labels: ["امتیاز کسب شده", "باقیمانده"],
    datasets: [
      {
        data: [overallScore, 100 - overallScore],
        backgroundColor: ["rgba(255, 115, 0, 0.8)", "rgba(75, 85, 99, 0)"],
        borderColor: ["rgba(255, 115, 0, 1)", "rgba(75, 85, 99, 0)"],
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
        display: false, // حذف نشانگر
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
        },
        titleFont: {
          family: "Vazir, sans-serif",
        },
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="rounded-[12px] bg-white/10 backdrop-blur-[5px] p-6">
        <SectionTitle title={"ارزیابی کلی"} />
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] bg-white/10 backdrop-blur-[5px] p-6">
      <SectionTitle title={"ارزیابی کلی"} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div>
            <div className="h-64 relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-orange-400 drop-shadow-lg">
                    {Number(overallScore || 0).toFixed(1)}%
                  </div>
                  <div className="text-gray-400 text-sm mt-1">امتیاز شما</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 flex flex-col justify-center">
              <div className="text-4xl font-extrabold text-gray-200 mb-2">
                {overallData?.maxapp || 0}
              </div>
              <div className="text-gray-300 text-sm">حداکثر امتیاز</div>
              <div className="text-gray-500 text-xs mt-1">
                بیشترین امتیاز ممکن
              </div>
            </div>

            <div className="text-center p-6 flex flex-col justify-center">
              <div className="text-4xl font-extrabold text-[var(--orgin-color)] mb-2">
                {overallData?.you || 0}
              </div>
              <div className="text-gray-300 text-sm">امتیاز کسب شده</div>
              <div className="text-gray-500 text-xs mt-1">
                از {overallData?.maxapp || 0} امتیاز
              </div>
            </div>

            <div className="text-center p-6 flex flex-col justify-center">
              <div className="text-4xl font-extrabold text-[var(--orgin-color)] mb-2">
                {getLevel(overallScore)}
              </div>
              <div className="text-gray-300 text-sm">سطح آمادگی</div>
              <div className="text-gray-500 text-xs mt-1">سطح کلی صادرات</div>
            </div>
          </div>
        </div>
      </div>

      <OverallAssessmentTabs
        sectionsData={sectionsData}
        overallData={overallData}
        assessment={assessment}
        indexData={indexData}
        riskData={riskData}
      />
    </div>
  );
};

export default OverallAssessment;
