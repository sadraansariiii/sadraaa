"use client";

import { useAssessmentStore } from "@/src/store/assessmentstore";
import { useSessionStore } from "@/src/store/sessionStore";
import { useNameStore } from "@/src/store/userNameStore";

import SectionTitle from "@/src/components/ui/title";
import { formatDateFa } from "@/src/utils/dateUtils";
import BaseUrl from "@/src/utils/baseUrl";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import CompanyInfoAccordion from "@/src/components/pages/report/CompanyInfoAccordion";
import OverallAssessment from "@/src/components/pages/report/OverallAssessment";
import SectionWithCloseButton from "@/src/components/pages/report/SectionWithCloseButton";

// ثبت کامپوننت‌ها
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Test = () => {
  const { assessment } = useAssessmentStore();
  const { clientId, token } = useSessionStore();
  const { userName } = useNameStore();
  const [sectionsData, setSectionsData] = useState([]);
  const [overallData, setOverallData] = useState(null);
  const [indexData, setIndexData] = useState([]);
  const [riskData, setRiskData] = useState([]); // اضافه کردن state جدید برای داده‌های ریسک
  const [loading, setLoading] = useState(true);
  const [indexLoading, setIndexLoading] = useState(false);
  const [sectionDetails, setSectionDetails] = useState({});
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const sectionLabels = [
    "تجربه تجاری",
    "ظرفیت تولید و عملیات",
    "ظرفیت مالی",
    "دانش بازار و فروش",
    "تبلیغات و اطلاع‌رسانی",
    "تعهد مدیریت و منابع انسانی",
    "تطبیق‌پذیری محصول و بسته‌بندی",
    "مدیریت ریسک و شبکه‌سازی",
    "واسطه صادرات",
  ];

  const closeSection = () => {
    setOpenSection(null);
    setOpenQuestion(null);
  };

  const openSectionHandler = (sectionNumber) => {
    setOpenSection(sectionNumber);
    setOpenQuestion(null);

    if (!sectionDetails[sectionNumber]) {
      fetchSectionData(sectionNumber);
    }
  };

  const toggleQuestion = (questionNumber) => {
    setOpenQuestion((prev) =>
      prev === questionNumber ? null : questionNumber
    );
  };

  const fetchOverallData = async () => {
    if (!clientId || !token || !assessment) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(BaseUrl("/assessment/getreport"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: assessment.AScode,
          type: "all",
        }),
      });

      const result = await response.json();

      if (result.done) {
        const data = result.data;

        setOverallData({
          maxapp: data.all?.allp || 0,
          you: data.all?.allyp || 0,
          youp: data.all?.allprsy || 0,
          swot: data.all?.swot || {},
        });

        if (data) {
          const sectionsArray = Object.entries(data)
            .filter(([key]) => key !== "all")
            .map(([sectionNumber, sectionData]) => {
              return {
                section: parseInt(sectionNumber),
                yourpoint: sectionData.yp || 0,
                maxpoint: sectionData.mp || 0,
                percent: sectionData.yoe || 0,
                maxqinsecton: sectionData.mc || 0,
                section_in_assens: sectionData.my || 0,
              };
            })
            .sort((a, b) => a.section - b.section);

          setSectionsData(sectionsArray);
        }

        setLoading(false);
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      console.error("Error fetching overall data:", error);
      setLoading(false);
    }
  };

  const fetchSectionData = async (sectionNumber) => {
    if (!clientId || !token || !assessment) {
      return;
    }

    try {
      const response = await fetch(BaseUrl("/assessment/getreport"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: assessment.AScode,
          type: "base",
          section: sectionNumber,
        }),
      });

      const result = await response.json();

      if (result.done) {
        setSectionDetails((prev) => ({
          ...prev,
          [sectionNumber]: result.data[sectionNumber],
        }));
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      console.error(`Error fetching section ${sectionNumber}:`, error);
    }
  };

  const fetchIndexData = async () => {
    if (!clientId || !token || !assessment) {
      return;
    }

    try {
      setIndexLoading(true);
      const indices = Array.from({ length: 17 }, (_, i) => i + 19);
      const indexPromises = indices.map((indexNumber) =>
        fetch(BaseUrl("/assessment/report/reportas"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            AScode: assessment.AScode,
            type: "index",
            index: indexNumber,
          }),
        }).then((res) => res.json())
      );

      const indexResults = await Promise.all(indexPromises);
      const validIndexData = indexResults
        .filter((result) => result.done && result.data)
        .map((result) => result.data);

      setIndexData(validIndexData);
      setIndexLoading(false);
    } catch (error) {
      console.error("Error fetching index data:", error);
      setIndexLoading(false);
    }
  };

  const fetchRiskData = async () => {
    if (!clientId || !token || !assessment) {
      return;
    }

    try {
      const response = await fetch(BaseUrl("/assessment/report/reportas"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: assessment.AScode,
          type: "risk",
        }),
      });

      const result = await response.json();

      if (result.done && result.data) {
        setRiskData(result.data);
      } else {
        throw new Error(result.errors || "خطا در دریافت داده‌های ریسک");
      }
    } catch (error) {
      console.error("Error fetching risk data:", error);
    }
  };

  useEffect(() => {
    fetchOverallData();
    fetchIndexData();
    fetchRiskData(); // فراخوانی تابع دریافت داده‌های ریسک
  }, [assessment, clientId, token, userName]);

  const chartData = {
    labels: sectionsData.map(
      (section) =>
        sectionLabels[section.section - 2] || `بخش ${section.section}`
    ),
    datasets: [
      {
        label: "امتیاز",
        data: sectionsData.map((section) => section.percent || 0),
        backgroundColor: sectionsData.map((section) =>
          openSection === section.section
            ? "#8f140260"
            : "rgba(255, 115, 0, 0.4)"
        ),
        borderColor: sectionsData.map((section) =>
          openSection === section.section
            ? "#8f1402"
            : "rgba(255, 115, 0, 0.6)"
        ),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const sectionNumber = sectionsData[elementIndex]?.section;
        if (sectionNumber) {
          openSectionHandler(sectionNumber);
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: "#e5e7eb",
          font: {
            size: 14,
            family: "Vazir, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "مقایسه امتیاز بخش‌های مختلف - برای مشاهده جزئیات روی میله‌ها کلیک کنید",
        color: "#e5e7eb",
        font: {
          size: 16,
          family: "Vazir, sans-serif",
        },
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
            const sectionIndex = context.dataIndex;
            const section = sectionsData[sectionIndex];
            const value = context.parsed.y;

            if (section) {
              return `امتیاز شرکت: ${value.toFixed(1)}% (${
                section.yourpoint
              } از ${section.maxpoint} امتیاز)`;
            }
            return `امتیاز شرکت: ${value.toFixed(1)}%`;
          },
          afterLabel: function (context) {
            const sectionIndex = context.dataIndex;
            const section = sectionsData[sectionIndex];
            if (section) {
              return `سطح ارزیابی: ${section.section_in_assens?.toFixed(1)}`;
            }
            return "برای مشاهده جزئیات کلیک کنید";
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#e5e7eb",
          font: {
            size: 12,
            family: "Vazir, sans-serif",
          },
        },
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#e5e7eb",
          font: {
            size: 12,
            family: "Vazir, sans-serif",
          },
          stepSize: 20,
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto flex flex-col gap-6 min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
        <p className="text-gray-300 text-lg">در حال دریافت اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className=" max-w-[1920px] mx-auto flex flex-col gap-6 ">
      <header>
        <div className="rounded-[12px] bg-white/10 backdrop-blur-[5px] shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-white">
                زمینه ارزیابی:{" "}
                <span className="text-orange-400">
                  {assessment?.context || "نامشخص"}
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-300 text-sm">
                تاریخ گزارش:{" "}
                <span className="text-orange-400">
                  {assessment?.date
                    ? formatDateFa(assessment.date, {
                        mode: "simple",
                      })
                    : "نامشخص"}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                کد گزارش:{" "}
                <span className="text-orange-400">
                  {assessment?.AScode || "نامشخص"}
                </span>
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent text-center">
            گزارش جامع ارزیابی توانمندی صادراتی
          </h1>
          <p className="text-gray-300 text-lg mb-6 text-center">
            بررسی تخصصی قابلیت‌های صادراتی و ارائه راهکارهای عملیاتی
          </p>

          <CompanyInfoAccordion />
        </div>
      </header>

      <OverallAssessment
        overallData={overallData}
        loading={loading}
        sectionsData={sectionsData}
        indexData={indexData}
        indexLoading={indexLoading}
        riskData={riskData} // ارسال داده‌های ریسک به کامپوننت
        assessment={assessment}
      />

      <div className="rounded-[12px] bg-white/10 backdrop-blur-[5px] shadow-2xl p-4">
        <SectionTitle title={"تحلیل امتیاز بخش‌های مختلف"} />
        <div className="h-[600px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {openSection && (
        <div className="rounded-[12px] bg-white/10 backdrop-blur-[5px] p-6">
          <div className="flex justify-between items-center mb-6">
            <SectionTitle
              title={`جزئیات بخش ${sectionLabels[openSection - 2] || "نامشخص"}`}
            />
            <button
              onClick={closeSection}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg border border-rose-500/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              بستن بخش
            </button>
          </div>

          <div className="mt-4">
            <SectionWithCloseButton
              sectionData={sectionDetails[openSection]}
              sectionNumber={openSection}
              sectionName={sectionLabels[openSection - 2] || "بخش نامشخص"}
              onClose={closeSection}
              onQuestionToggle={toggleQuestion}
              openQuestion={openQuestion}
              assessment={assessment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
