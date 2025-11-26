"use client";

import { useEffect, useState } from "react";
import DynamicTabs from "../../ui/Tab";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import SWOT from "../../SWOT/SWOT";

// کامپوننت بخش با دکمه بستن و طراحی تب‌بندی شده
const SectionWithCloseButton = ({
  sectionData,
  sectionNumber,
  sectionName,
  onQuestionToggle,
  openQuestion,
  assessment,
}) => {
  const { clientId, token } = useSessionStore();
  const [honestyData, setHonestyData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionIdMapping, setQuestionIdMapping] = useState({});

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
      if (result.done && result.data) {
        setHonestyData(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching honesty data:", error);
      setLoading(false);
    }
  };

  const fetchRiskData = async () => {
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
          type: "risk",
        }),
      });

      const result = await response.json();
      if (result.done && result.data) {
        setRiskData(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching risk data:", error);
      setLoading(false);
    }
  };

  // تابع برای ایجاد نگاشت بین qcode و IDهای عددی
  const createQuestionIdMapping = () => {
    if (!sectionData?.qr) return {};

    const mapping = {};
    const questions = sectionData.qr;

    Object.entries(questions).forEach(([questionKey, questionData]) => {
      // ذخیره qcode به عنوان کلید اصلی
      mapping[questionKey] = {
        qcode: questionKey,
        // اگر اطلاعات عددی دیگری نیاز باشد می‌توانید اینجا اضافه کنید
      };
    });

    return mapping;
  };

  useEffect(() => {
    fetchHonestyData();
    fetchRiskData();
  }, [clientId, token, assessment]);

  useEffect(() => {
    if (sectionData?.qr) {
      const mapping = createQuestionIdMapping();
      setQuestionIdMapping(mapping);
    }
  }, [sectionData]);

  // تابع برای بررسی وجود سوال در داده‌های ریسک بر اساس qcode
  const hasRiskDataForQuestion = (questionKey) => {
    if (!riskData || !Array.isArray(riskData) || riskData.length === 0)
      return false;

    const riskItems = riskData[0] || {};

    // جستجو در بین تمام آیتم‌های ریسک
    return Object.values(riskItems).some((item) => {
      if (!item || typeof item !== "object") return false;

      // بررسی مستقیم با qcode
      const riskQcode = Object.keys(riskItems).find(
        (key) => riskItems[key] === item
      );

      return riskQcode === questionKey;
    });
  };

  // تابع برای بررسی وجود سوال در داده‌های صداقت بر اساس qcode
  const hasHonestyDataForQuestion = (questionKey) => {
    if (!honestyData || !Array.isArray(honestyData)) return false;

    return honestyData.some((item) => {
      if (!item) return false;
      // مقایسه مستقیم qcode
      return item.qcode === questionKey;
    });
  };

  // تابع برای دریافت داده‌های ریسک برای یک سوال خاص
  const getRiskDataForQuestion = (questionKey) => {
    if (!riskData || !Array.isArray(riskData) || riskData.length === 0)
      return null;

    const riskItems = riskData[0] || {};

    // پیدا کردن آیتم بر اساس qcode
    const riskItem = riskItems[questionKey];
    return riskItem || null;
  };

  // تابع برای دریافت داده‌های صداقت برای یک سوال خاص
  const getHonestyDataForQuestion = (questionKey) => {
    if (!honestyData || !Array.isArray(honestyData)) return null;

    return honestyData.find((item) => {
      if (!item) return false;
      return item.qcode === questionKey;
    });
  };

  // اگر sectionData وجود نداشته باشد، loading نمایش داده می‌شود
  if (!sectionData) {
    return (
      <div className=" p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full"></div>
          <span className="text-gray-400 mr-3">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  // استخراج داده‌های بخش
  const report = sectionData?.sectionr?.result || {
    yp: 0,
    mp: 0,
    yoe: 0,
    mc: 0,
    my: 0,
  };

  const questions = sectionData?.qr || {};
  const swotData = sectionData?.sectionr?.SWOT || {};
  const suggestions = sectionData?.sectionr?.SWOT.p || [];
  // کامپوننت تب‌های داخلی برای سوالات
  const QuestionContentTabs = ({ questionData, questionKey }) => {
    if (!questionData) return null;

    const data = questionData;

    const numberBadge = (index) => (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold">
        {index + 1}
      </div>
    );

    // تعریف تب‌ها برای DynamicTabs
    const questionTabs = [];

    // تب خلاصه پیشنهاد
    if (data.sugges?.n?.[0]) {
      questionTabs.push({
        id: "preview",
        label: "خلاصه پیشنهاد",
        content: (
          <div className="space-y-3">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              خلاصه پیشنهاد
            </h5>
            <p className="text-gray-200 text-sm leading-6">
              {data.sugges.n[0].title}
            </p>
          </div>
        ),
      });
    }

    // تب پیشنهادات اجرایی
    if (data.sugges?.pr && data.sugges.pr.length > 0) {
      questionTabs.push({
        id: "suggestions",
        label: "پیشنهادات اجرایی",
        content: (
          <div className="space-y-3">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              پیشنهادات اجرایی
            </h5>
            <div className="grid gap-2">
              {data.sugges.pr.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      });
    }

    // تب برنامه کوتاه مدت
    if (data.sugges?.s && data.sugges.s.length > 0) {
      questionTabs.push({
        id: "steps",
        label: "برنامه کوتاه مدت",
        content: (
          <div className="space-y-3">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              برنامه کوتاه مدت
            </h5>
            <div className="space-y-2">
              {data.sugges.s.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      });
    }

    // تب برنامه میان مدت
    if (data.sugges?.m && data.sugges.m.length > 0) {
      questionTabs.push({
        id: "actions",
        label: "برنامه میان مدت",
        content: (
          <div className="space-y-3">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              برنامه میان مدت
            </h5>
            <div className="grid gap-2">
              {data.sugges.m.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      });
    }

    // تب برنامه بلند مدت
    if (data.sugges?.y && data.sugges.y.length > 0) {
      questionTabs.push({
        id: "monitoring",
        label: "برنامه بلند مدت",
        content: (
          <div className="space-y-3">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              برنامه بلند مدت
            </h5>
            <div className="grid gap-2">
              {data.sugges.y.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {numberBadge(index)}
                  <span className="text-gray-200 text-sm flex-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      });
    }

    // تب تحلیل صداقت - فقط اگر داده وجود داشته باشد
    const honestyItem = getHonestyDataForQuestion(questionKey);
    if (honestyItem) {
      questionTabs.push({
        id: "honesty",
        label: "تحلیل صداقت",
        content: (
          <div className="space-y-4">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              تحلیل صداقت پاسخ
            </h5>

            {/* بخش سوال و جواب متناقض */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--orgin-color)] rounded-full"></div>
                <h6 className="text-[var(--orgin-color)] font-semibold text-sm">
                  تناقض شناسایی شده:
                </h6>
              </div>
              <p className="text-gray-200 text-sm leading-6 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {honestyItem.caption}
              </p>
            </div>

            {/* اطلاعات سوال */}
            {honestyItem.info && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--orgin-color)] rounded-full"></div>
                  <h6 className="text-[var(--orgin-color)] font-semibold text-sm">
                    اطلاعات سوال:
                  </h6>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-200 text-sm mb-2">
                    <strong>سوال:</strong> {honestyItem.info.q}
                  </p>
                  <p className="text-gray-200 text-sm">
                    <strong>پاسخ:</strong> {honestyItem.info.a}
                  </p>
                </div>
              </div>
            )}
          </div>
        ),
      });
    }

    // تب تحلیل ریسک - فقط اگر داده وجود داشته باشد
    const riskItem = getRiskDataForQuestion(questionKey);
    if (riskItem) {
      questionTabs.push({
        id: "risk",
        label: "تحلیل ریسک",
        content: (
          <div className="space-y-4">
            <h5 className="text-[var(--orgin-color)] font-bold text-lg">
              تحلیل ریسک پاسخ
            </h5>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--orgin-color)] rounded-full"></div>
                <h6 className="text-[var(--orgin-color)] font-semibold text-sm">
                  راهنمایی تخصصی:
                </h6>
              </div>
              <p className="text-gray-200 text-sm leading-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                {riskItem.text}
              </p>
            </div>
          </div>
        ),
      });
    }

    // فقط اگر تب‌هایی وجود داشته باشد نمایش داده شود
    if (questionTabs.length === 0) {
      return (
        <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-center text-sm">
            هیچ تحلیل اضافی برای این سوال موجود نیست
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <DynamicTabs
          tabs={questionTabs}
          defaultTab={0}
          centered={false}
          fullWidth={true}
        />
      </div>
    );
  };

  // کامپوننت محتوای سوالات
  const QuestionsContent = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[var(--orgin-color)] font-bold text-lg">
            سوالات بخش ({Object.keys(questions).length} سوال)
          </h4>
        </div>

        {Object.keys(questions).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(questions).map(([questionKey, questionData]) => {
              const hasRisk = hasRiskDataForQuestion(questionKey);
              const hasHonesty = hasHonestyDataForQuestion(questionKey);

              return (
                <div
                  key={questionKey}
                  className={`bg-gray-700/30 rounded-xl transition-all duration-300 ${
                    openQuestion === questionKey
                      ? "bg-green-500/5 "
                      : "bg-gray-700/50"
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => onQuestionToggle(questionKey)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2 flex-1">
                        {/* نشانگرهای ریسک و صداقت */}
                        <div className="flex gap-1">
                          {hasHonesty && (
                            <div
                              className="w-3 h-3 bg-red-500 rounded-full"
                              title="عدم صداقت شناسایی شده"
                            ></div>
                          )}
                          {hasRisk && (
                            <div
                              className="w-3 h-3 bg-blue-500 rounded-full"
                              title="تحلیل ریسک موجود"
                            ></div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h5 className="text-white font-semibold text-lg line-clamp-2">
                            {questionData.q_title || "سوال بدون عنوان"}
                          </h5>
                        </div>
                      </div>

                      <div className="flex items-center mr-4">
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            openQuestion === questionKey
                              ? "text-orange-400 rotate-180"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {openQuestion === questionKey && (
                    <div className="p-4 border-t border-gray-600 animate-fadeIn flex flex-col">
                      <div>
                        <h6 className="text-[var(--orgin-color)] font-bold text-lg mb-2">
                          پاسخ شما:
                        </h6>
                        <p className="text-gray-200 text-lg rounded-lg p-3">
                          {questionData.qa_title || "پاسخ داده نشده"}
                        </p>
                      </div>

                      {/* محتوای سوال و پاسخ با تب‌های داخلی */}
                      <div className="space-y-4">
                        {/* تب‌های پیشنهادات */}
                        <QuestionContentTabs
                          questionData={questionData}
                          questionKey={questionKey}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8 bg-gray-700/30 rounded-xl border border-gray-600">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>سوالی برای این بخش وجود ندارد</p>
          </div>
        )}
      </div>
    );
  };

  const SWOTContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <h5 className="text-[var(--orgin-color)] font-bold text-xl">
          تحلیل SWOT بخش
        </h5>
      </div>

      {swotData &&
      (swotData.S?.length > 0 ||
        swotData.W?.length > 0 ||
        swotData.O?.length > 0 ||
        swotData.T?.length > 0) ? (
        <div>
          <div className="hidden xl:block">
            {/* اگر کامپوننت SWOT دارید اینجا استفاده کنید */}
            <div className="text-gray-400 text-center py-4">
              <SWOT
                strengths={swotData.S}
                weaknesses={swotData.W}
                opportunities={swotData.O}
                threats={swotData.T}
              />
            </div>
          </div>
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* نقاط قوت */}
            {swotData.S && swotData.S.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <h5 className="text-emerald-300 font-bold">
                    نقاط قوت (Strengths)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.S.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-emerald-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* نقاط ضعف */}
            {swotData.W && swotData.W.length > 0 && (
              <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 rounded-xl p-4 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                  <h5 className="text-rose-300 font-bold">
                    نقاط ضعف (Weaknesses)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.W.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* فرصت‌ها */}
            {swotData.O && swotData.O.length > 0 && (
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <h5 className="text-amber-300 font-bold">
                    فرصت‌ها (Opportunities)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.O.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-amber-400 text-sm mt-1">•</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تهدیدها */}
            {swotData.T && swotData.T.length > 0 && (
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h5 className="text-orange-300 font-bold">
                    تهدیدها (Threats)
                  </h5>
                </div>
                <div className="space-y-2">
                  {swotData.T.map((item, index) => (
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
          <p>تحلیل SWOT برای این بخش موجود نیست</p>
        </div>
      )}
    </div>
  );

  const SuggestionsContent = () => (
    <div className="space-y-4">
      <h4 className="text-[var(--orgin-color)] font-bold text-lg mb-4">
        پیشنهادات کلی بخش
      </h4>

      {suggestions && suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold mt-1">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 text-sm leading-6">
                    {suggestion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8 bg-gray-700/30 rounded-xl border border-gray-600">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>پیشنهادی برای این بخش وجود ندارد</p>
        </div>
      )}
    </div>
  );

  const ShortTermContent = () => (
    <div className="space-y-4">
      <h4 className="text-[var(--orgin-color)] font-bold text-lg mb-4">
        برنامه کوتاه مدت
      </h4>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-200 text-sm leading-6">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MediumTermContent = () => (
    <div className="space-y-4">
      <h4 className="text-[var(--orgin-color)] font-bold text-lg mb-4">
        برنامه میان مدت
      </h4>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-200 text-sm leading-6">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LongTermContent = () => (
    <div className="space-y-4">
      <h4 className="text-[var(--orgin-color)] font-bold text-lg mb-4">
        برنامه بلند مدت
      </h4>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--orgin-color)] text-white text-xs font-bold mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-200 text-sm leading-6">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // تعریف تب‌ها برای DynamicTabs
  const tabs = [
    {
      id: "questions",
      label: "سوالات و پاسخ‌ها",
      component: <QuestionsContent />,
    },
    {
      id: "swot",
      label: "تحلیل SWOT",
      component: <SWOTContent />,
    },
    {
      id: "suggestions",
      label: "پیشنهادات",
      component: <SuggestionsContent />,
    },
    {
      id: "short-term",
      label: "برنامه کوتاه مدت",
      component: <ShortTermContent />,
    },
    {
      id: "medium-term",
      label: "برنامه میان مدت",
      component: <MediumTermContent />,
    },
    {
      id: "long-term",
      label: "برنامه بلند مدت",
      component: <LongTermContent />,
    },
  ];

  return (
    <div className="overflow-hidden transition-all duration-300">
      {/* هدر بخش */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-lg">
              {sectionNumber - 1}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-2xl text-white mb-2">
                {sectionName}
              </h3>
              <p className="text-gray-300 text-sm">
                تحلیل جامع عملکرد در حوزه {sectionName.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* خلاصه بخش - خارج از تب‌ها */}
        <div className="mt-6 space-y-6">
          {/* آمار کلی */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center bg-gray-700/50 rounded-xl p-6 border border-gray-600">
              <div className="text-gray-300 text-sm mb-2">بیشترین امتیاز</div>
              <div className="text-3xl font-bold text-[var(--orgin-color)]">
                {report.mp || 0}
              </div>
            </div>

            <div className="text-center bg-gray-700/50 rounded-xl p-6 border border-gray-600">
              <div className="text-gray-300 text-sm mb-2">امتیاز کسب شده</div>
              <div className="text-3xl font-bold text-orange-400">
                {report.yp || 0}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                از {report.mp || 0} امتیاز
              </div>
            </div>

            <div className="text-center bg-gray-700/50 rounded-xl p-6 border border-gray-600">
              <div className="text-gray-300 text-sm mb-2">
                سهم در کل ارزیابی
              </div>
              <div className="text-3xl font-bold text-[var(--orgin-color)]">
                {Number(report.mc || 0).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* استفاده از DynamicTabs */}
      <div className="">
        <DynamicTabs
          tabs={tabs}
          defaultTab={0}
          centered={false}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default SectionWithCloseButton;
