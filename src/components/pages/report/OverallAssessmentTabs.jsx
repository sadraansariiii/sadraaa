"use client";

import { useState } from "react";
import HonestyAssessment from "./HonestyAssessment";
import RiskAssessment from "./RiskAssessment";
import IndexCharts from "./IndexCharts";
import DynamicTabs from "../../ui/Tab";
import SWOT from "../../SWOT/SWOT";

const OverallAssessmentTabs = ({
  sectionsData,
  overallData,
  assessment,
  indexData,
  riskData,
}) => {
  const getoverallScore = overallData?.youp;

  // فقط از داده‌های API استفاده می‌کنیم
  const getOverallSWOTData = () => {
    if (overallData?.swot) {
      return {
        strengths: overallData.swot.S || [],
        weaknesses: overallData.swot.W || [],
        opportunities: overallData.swot.O || [],
        threats: overallData.swot.T || [],
        recommendations: overallData.swot.p || [],
      };
    }

    // اگر داده‌ای از API وجود نداشته باشد، آرایه‌های خالی برمی‌گردانیم
    return {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      recommendations: [],
    };
  };

  const swotData = getOverallSWOTData();

  const numberBadge = (index) => (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold">
      {index + 1}
    </div>
  );

  // تابع رندر محتوای SWOT
  const renderSWOTContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <h5 className="text-[var(--orgin-color)] font-bold text-xl">
          تحلیل SWOT کلی شرکت
        </h5>
      </div>

      {swotData.strengths.length > 0 ||
      swotData.weaknesses.length > 0 ||
      swotData.opportunities.length > 0 ||
      swotData.threats.length > 0 ? (
        <div>
          <div className="hidden xl:block">
            <SWOT
              strengths={swotData.strengths}
              weaknesses={swotData.weaknesses}
              opportunities={swotData.opportunities}
              threats={swotData.threats}
            />
          </div>
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {swotData.strengths.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <h5 className="text-emerald-300 font-bold">
                    نقاط قوت (Strengths)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.strengths.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-emerald-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {swotData.weaknesses.length > 0 && (
              <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 rounded-xl p-4 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                  <h5 className="text-rose-300 font-bold">
                    نقاط ضعف (Weaknesses)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.weaknesses.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {swotData.opportunities.length > 0 && (
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <h5 className="text-amber-300 font-bold">
                    فرصت‌ها (Opportunities)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.opportunities.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-amber-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {swotData.threats.length > 0 && (
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h5 className="text-orange-300 font-bold">
                    تهدیدها (Threats)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.threats.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-orange-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8 bg-gray-800/50 rounded-xl border border-gray-700">
          <p>تحلیل SWOT در حال حاضر در دسترس نیست</p>
        </div>
      )}
    </div>
  );

  // تابع رندر محتوای لیستی
  const renderListContent = (title, items) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <h5 className="text-[var(--orgin-color)] font-bold text-xl">{title}</h5>
      </div>

      {items && items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 px-4 py-1">
              {numberBadge(index)}
              <span className="text-gray-200 text-sm leading-6 flex-1 group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8 bg-gray-800/50 rounded-xl border border-gray-700">
          <p>محتوایی برای این بخش در حال حاضر موجود نیست</p>
        </div>
      )}
    </div>
  );

  // تعریف تب‌ها برای DynamicTabs
  const tabs = [
    {
      id: "summary",
      label: "خلاصه ارزیابی",
      content: renderListContent("خلاصه ارزیابی کلی", swotData.recommendations),
    },
    {
      id: "swot",
      label: "تحلیل SWOT",
      content: renderSWOTContent(),
    },
    {
      id: "strengths",
      label: "برنامه های کوتاه مدت",
      content: renderListContent("برنامه های کوتاه مدت", swotData.strengths),
    },
    {
      id: "improvements",
      label: "برنامه های میان مدت",
      content: renderListContent("برنامه های میان مدت", swotData.weaknesses),
    },
    {
      id: "recommendations",
      label: "برنامه های بلند مدت",
      content: renderListContent("برنامه های بلند مدت", swotData.threats),
    },
    {
      id: "honesty",
      label: "صداقت در ارزیابی",
      content: (
        <div className="space-y-4">
          <HonestyAssessment
            assessment={assessment}
            selectionData={sectionsData}
            overallScore={getoverallScore}
          />
        </div>
      ),
    },
    {
      id: "risk",
      label: "تحلیل ریسک",
      content: (
        <div className="space-y-4">
          <RiskAssessment assessment={assessment} riskData={riskData} />
        </div>
      ),
    },
    {
      id: "Indicators",
      label: "شاخص‌های آمادگی",
      content: (
        <div className="space-y-4">
          <IndexCharts indexData={indexData} />
        </div>
      ),
    },
  ];

  const handleTabChange = (index, tab) => {
    // می‌توانید عملیات اضافی هنگام تغییر تب را اینجا اضافه کنید
  };

  return (
    <div className="mt-6">
      <DynamicTabs
        tabs={tabs}
        defaultTab={0}
        onTabChange={handleTabChange}
        centered={false}
        fullWidth={true}
      />
    </div>
  );
};

export default OverallAssessmentTabs;
