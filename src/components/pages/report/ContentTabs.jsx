"use client";

import { useState } from "react";

const ContentTabs = ({ questionData }) => {
  const [activeTab, setActiveTab] = useState("preview");

  if (!questionData) return null;

  const data = questionData;
  const tabs = [];

  if (data.sugges?.n?.[0]) tabs.push({ id: "preview", title: "خلاصه پیشنهاد" });
  if (data.sugges?.pr && data.sugges.pr.length > 0)
    tabs.push({ id: "suggestions", title: "پیشنهادات اجرایی" });
  if (data.sugges?.s && data.sugges.s.length > 0)
    tabs.push({ id: "steps", title: "برنامه کوتاه مدت" });
  if (data.sugges?.m && data.sugges.m.length > 0)
    tabs.push({ id: "actions", title: "برنامه میان مدت" });
  if (data.sugges?.y && data.sugges.y.length > 0)
    tabs.push({ id: "monitoring", title: "برنامه بلند مدت" });

  if (tabs.length === 0) return null;

  const numberBadge = (index) => (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold">
      {index + 1}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "preview":
        return (
          <div className="space-y-3">
            <h5 className="text-orange-400 font-bold text-lg">خلاصه پیشنهاد</h5>
            <p className="text-gray-200 text-sm leading-6 px-4 py-1">
              {data.sugges.n[0].title}
            </p>
          </div>
        );

      case "suggestions":
        return (
          <div className="space-y-3">
            <h5 className="text-orange-400 font-bold text-lg">
              پیشنهادات اجرایی
            </h5>
            <div className="grid gap-2">
              {data.sugges.pr.map((item, index) => (
                <div key={index} className="flex items-start gap-3 px-4 py-1">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "steps":
        return (
          <div className="space-y-3">
            <h5 className="text-orange-400 font-bold text-lg">
              برنامه کوتاه مدت
            </h5>
            <div className="space-y-2">
              {data.sugges.s.map((item, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-1">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "actions":
        return (
          <div className="space-y-3">
            <h5 className="text-orange-400 font-bold text-lg">
              برنامه میان مدت
            </h5>
            <div className="grid gap-2">
              {data.sugges.m.map((item, index) => (
                <div key={index} className="flex items-start gap-3 px-4 py-1">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "monitoring":
        return (
          <div className="space-y-3">
            <h5 className="text-orange-400 font-bold text-lg">
              برنامه بلند مدت
            </h5>
            <div className="grid gap-2">
              {data.sugges.y.map((item, index) => (
                <div key={index} className="flex items-start gap-3 px-4 py-1">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
            }`}
          >
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">{renderTabContent()}</div>
    </div>
  );
};

export default ContentTabs;
