"use client";

import { useState } from "react";

const SectionAssessmentTabs = ({ sectionData, sectionName }) => {
  const [activeTab, setActiveTab] = useState("summary");

  const swotData = sectionData?.sectionr?.SWOT || {};

  const getSectionSWOTData = () => {
    if (swotData && Object.keys(swotData).length > 0) {
      return {
        strengths: swotData.S || [],
        weaknesses: swotData.W || [],
        opportunities: swotData.O || [],
        threats: swotData.T || [],
        recommendations: swotData.p || [],
      };
    }
  };

  const sectionSwotData = getSectionSWOTData();

  const tabs = [
    { id: "summary", title: "خلاصه ارزیابی" },
    { id: "strengths", title: "نقاط قوت" },
    { id: "improvements", title: "نیازهای بهبود" },
    { id: "recommendations", title: "پیشنهادات" },
    { id: "swot", title: "تحلیل SWOT" },
  ];

  const tabData = {
    summary: {
      title: `خلاصه ارزیابی بخش ${sectionName}`,
      content: sectionSwotData.recommendations,
    },
    strengths: {
      title: `نقاط قوت بخش ${sectionName}`,
      content: sectionSwotData.strengths,
    },
    improvements: {
      title: `نیازهای بهبود بخش ${sectionName}`,
      content: sectionSwotData.weaknesses,
    },
    recommendations: {
      title: `پیشنهادات اجرایی بخش ${sectionName}`,
      content: sectionSwotData.threats,
    },
    swot: {
      title: `تحلیل SWOT بخش ${sectionName}`,
      content: [],
    },
  };

  const numberBadge = (index) => (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold">
      {index + 1}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "swot") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <h5 className="text-orange-400 font-bold text-xl">
              تحلیل SWOT بخش {sectionName}
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-4 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <h5 className="text-emerald-300 font-bold">
                  نقاط قوت (Strengths)
                </h5>
              </div>
              <div className="space-y-2">
                {sectionSwotData.strengths.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span className="text-gray-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 rounded-xl p-4 border border-rose-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                <h5 className="text-rose-300 font-bold">
                  نقاط ضعف (Weaknesses)
                </h5>
              </div>
              <div className="space-y-2">
                {sectionSwotData.weaknesses.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm mt-1">•</span>
                    <span className="text-gray-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl p-4 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <h5 className="text-amber-300 font-bold">
                  فرصت‌ها (Opportunities)
                </h5>
              </div>
              <div className="space-y-2">
                {sectionSwotData.opportunities.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-amber-400 text-sm mt-1">•</span>
                    <span className="text-gray-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <h5 className="text-orange-300 font-bold">تهدیدها (Threats)</h5>
              </div>
              <div className="space-y-2">
                {sectionSwotData.threats.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 text-sm mt-1">•</span>
                    <span className="text-gray-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const data = tabData[activeTab];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <h5 className="text-orange-400 font-bold text-xl">{data.title}</h5>
        </div>

        <div className="space-y-3">
          {data.content.map((item, index) => (
            <div key={index} className="flex items-start gap-3 px-4 py-1">
              {numberBadge(index)}
              <span className="text-gray-200 text-sm leading-6 flex-1 group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 transform scale-105"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50"
            }`}
          >
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[200px] animate-fadeIn">{renderTabContent()}</div>
    </div>
  );
};

export default SectionAssessmentTabs;
