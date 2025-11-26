"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardSection from "@/src/components/layout/dashboardSection";
import {
  IoCheckmarkDoneOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import { useContextStore } from "@/src/store/contextCode";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import AccessGuard from "@/src/components/AccessGuard";

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { clientId, token } = useSessionStore();
  const { contextCode } = useContextStore();

  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getCode, setGetCode] = useState({
    Qcode: "",
    Acode: "",
  });
  const [sectionProgress, setSectionProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  const sectionId = Number(id);
  const [sectionName, setSectionName] = useState("");

  const sectionNames = {
    2: "تجربه تجاری",
    3: "ظرفیت تولید و عملیات",
    4: "ظرفیت مالی",
    5: "دانش بازار و فروش",
    6: "تبلیغات و اطلاع‌رسانی",
    7: "تعهد مدیریت و منابع انسانی",
    8: "تطبیق‌پذیری محصول و بسته‌بندی",
    9: "مدیریت ریسک و شبکه‌سازی",
    10: "واسطه صادرات",
  };

  useEffect(() => {
    setSectionName(sectionNames[sectionId] || "بخش ناشناخته");
  }, [sectionId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!clientId || !token || !contextCode) return;

    const fetchAllSectionProgress = async () => {
      try {
        setLoadingProgress(true);
        const sections = [2, 3, 4, 5, 6, 7, 8, 9, 10];

        const progressPromises = sections.map((sectionId) =>
          fetch(BaseUrl("/assessment/status"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appId: clientId,
              token: token,
              AScode: contextCode,
              section: sectionId,
            }),
          }).then((res) => res.json())
        );

        const results = await Promise.all(progressPromises);

        const progressData = {};
        results.forEach((result, index) => {
          const sectionId = sections[index];
          if (result.data) {
            progressData[sectionId] = {
              percent: result.data.percent || 0,
              answered: result.data.ansed || 0,
              total: result.data.all || 0,
              loaded: true,
            };
          } else {
            progressData[sectionId] = {
              percent: 0,
              answered: 0,
              total: 0,
              loaded: false,
            };
          }
        });

        setSectionProgress(progressData);
      } catch (error) {
        console.error("خطا در دریافت وضعیت بخش‌ها:", error);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchAllSectionProgress();
  }, [clientId, token, contextCode]);

  useEffect(() => {
    if (!clientId || !token || !contextCode) return;

    const getQuestion = async () => {
      try {
        setQuestionsLoading(true);
        const res = await fetch(BaseUrl("/assessment/load"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            AScode: contextCode,
            sectionid: id,
          }),
        });

        const data = await res.json();
        const Qlist = data.data.Qlist;
        const allQuestionsArray = Object.entries(Qlist).flatMap(
          ([sectionId, sectionQuestions]) =>
            Object.entries(sectionQuestions).map(([questionId, qData]) => ({
              id: questionId,
              title: qData.title,
              options: Object.entries(qData.option).map(([optId, optData]) => ({
                id: optId,
                title: optData.title,
              })),
              ANcode: qData.ANcode || "",
            }))
        );

        const initialAnswers = allQuestionsArray.map((question) => {
          if (question.ANcode && question.ANcode.trim() !== "") {
            const answerIndex = question.options.findIndex(
              (option) => option.id === question.ANcode
            );
            return answerIndex >= 0 ? answerIndex : undefined;
          }
          return undefined;
        });

        setQuestions(allQuestionsArray);
        setAnswers(initialAnswers);

        if (allQuestionsArray.length > 0) {
          const firstQuestion = allQuestionsArray[0];
          const firstAnswer = initialAnswers[0];

          setSelectedAnswer(
            firstAnswer !== undefined && firstAnswer !== null
              ? Number(firstAnswer)
              : null
          );

          setGetCode({
            Qcode: firstQuestion.id,
            Acode:
              firstAnswer !== undefined && firstAnswer !== null
                ? firstQuestion.options[firstAnswer].id
                : "",
          });
        }
      } catch (error) {
        console.error("خطا در گرفتن سوالات:", error);
      } finally {
        setQuestionsLoading(false);
      }
    };

    getQuestion();
  }, [clientId, token, id, contextCode]);

  const allQuestionsAnswered = answers.every(
    (answer) => answer !== undefined && answer !== null
  );

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = async (optionIndex) => {
    if (isLoading) return;

    const selectedOptionIndex = Number(optionIndex);
    setSelectedAnswer(selectedOptionIndex);

    const newAnswerCode = currentQ.options[selectedOptionIndex].id;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOptionIndex;
    setAnswers(newAnswers);

    setGetCode((prev) => ({
      ...prev,
      Acode: newAnswerCode,
    }));

    await SendReply(selectedOptionIndex, newAnswerCode);
  };

  const handleQuestionClick = (questionIndex) => {
    if (isLoading) return;

    setCurrentQuestion(questionIndex);

    const existingAnswer = answers[questionIndex];
    setSelectedAnswer(
      existingAnswer !== undefined && existingAnswer !== null
        ? Number(existingAnswer)
        : null
    );

    setGetCode((prev) => ({
      ...prev,
      Qcode: questions[questionIndex].id,
      Acode:
        existingAnswer !== undefined && existingAnswer !== null
          ? questions[questionIndex].options[existingAnswer].id
          : "",
    }));
  };

  const moveToNextQuestion = () => {
    const nextUnansweredIndex = answers.findIndex(
      (answer, index) =>
        (answer === undefined || answer === null) && index > currentQuestion
    );

    if (nextUnansweredIndex !== -1) {
      setCurrentQuestion(nextUnansweredIndex);
      setSelectedAnswer(null);
      setGetCode({
        Qcode: questions[nextUnansweredIndex].id,
        Acode: "",
      });
    } else {
      const firstUnansweredIndex = answers.findIndex(
        (answer) => answer === undefined || answer === null
      );
      if (firstUnansweredIndex !== -1) {
        setCurrentQuestion(firstUnansweredIndex);
        setSelectedAnswer(null);
        setGetCode({
          Qcode: questions[firstUnansweredIndex].id,
          Acode: "",
        });
      }
    }
  };

  const SendReply = async (selectedOptionIndex, answerCode) => {
    if (!answerCode) return;

    setIsLoading(true);
    try {
      const SendReplyRes = await fetch(BaseUrl("/assessment/answer"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: contextCode,
          Qcode: getCode.Qcode,
          Acode: answerCode,
        }),
      });

      const data = await SendReplyRes.json();
      if (data.done) {
        const updateProgressRes = await fetch(BaseUrl("/assessment/status"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            AScode: contextCode,
            section: sectionId,
          }),
        });

        const progressData = await updateProgressRes.json();
        if (progressData.data) {
          setSectionProgress((prev) => ({
            ...prev,
            [sectionId]: {
              percent: progressData.data.percent || 0,
              answered: progressData.data.ansed || 0,
              total: progressData.data.all || 0,
              loaded: true,
            },
          }));
        }

        moveToNextQuestion();
      }
    } catch (error) {
      console.error("خطا در ارسال پاسخ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextSection = () => {
    if (sectionId < 10) {
      router.push(`/dashboard/question/${sectionId + 1}`);
    }
  };

  const goToPrevSection = () => {
    if (sectionId > 2) {
      router.push(`/dashboard/question/${sectionId - 1}`);
    }
  };

  const goToSection = (targetSectionId) => {
    if (targetSectionId >= 2 && targetSectionId <= 10) {
      router.push(`/dashboard/question/${targetSectionId}`);
    }
  };

  const persianLetters = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰"];

  if (questionsLoading) {
    return (
      <DashboardSection>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[var(--orgin-color)]/20 rounded-full animate-spin mx-auto mb-6"></div>
              <div className="w-20 h-20 border-4 border-t-[var(--orgin-color)] border-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              در حال بارگذاری سوالات...
            </h2>
            <p className="text-gray-400">لطفاً چند لحظه صبر کنید</p>
          </div>
        </div>
      </DashboardSection>
    );
  }

  if (!questions.length && !questionsLoading) {
    return (
      <DashboardSection>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2">
              سوالی یافت نشد
            </h2>
            <p className="text-gray-400 mb-4">
              مشکلی در بارگذاری سوالات این بخش وجود دارد
            </p>
            <Link href="/dashboard/question">
              <Button label="بازگشت به صفحه اصلی" />
            </Link>
          </div>
        </div>
      </DashboardSection>
    );
  }

  return (
    <AccessGuard>
      <DashboardSection>
        <div className="w-full mx-auto px-4 sm:px-6 xl:px-4 flex flex-col gap-4">
          {/* هدر ساده و شفاف */}
          <div className="py-2 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/dashboard/question">
                  <button className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors">
                    <IoChevronForward className="text-lg" />
                    <span>بازگشت</span>
                  </button>
                </Link>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {sectionName}
                </h1>
              </div>
              <div className="w-24"></div> {/* برای بالانس */}
            </div>
          </div>

          {/* وضعیت تکمیل بخش */}
          {allQuestionsAnswered && (
            <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-[10px]">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="font-bold text-green-400 text-lg">
                    با تشکر، این بخش با موفقیت به پایان رسید.
                  </p>
                  <p className="text-green-300 text-sm mt-1">
                    لطفاً برای ادامه، به بخش بعدی مراجعه فرمایید.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ناوبری سوالات */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-center">
              سوالات
            </h3>

            <div className="flex flex-wrap gap-2 justify-center">
              {questions.map((_, index) => {
                const isAnswered =
                  answers[index] !== undefined && answers[index] !== null;
                const isCurrent = currentQuestion === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(index)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg text-sm transition-all flex items-center justify-center ${
                      isCurrent
                        ? "bg-white text-black font-bold border-2 border-white"
                        : isAnswered
                        ? "bg-[var(--orgin-color)] text-white border-2 border-[var(--orgin-color)]"
                        : "bg-white/10 text-white/50 border-2 border-white/30 hover:bg-white/20 hover:border-white/50"
                    }`}
                  >
                    {isAnswered ? (
                      <IoCheckmarkDoneOutline className="text-sm sm:text-base" />
                    ) : (
                      <span className="text-xs sm:text-sm">{index + 1}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="flex flex-col xl:flex-row gap-4 items-stretch">
            {/* بخش سوالات - اولویت اصلی */}
            <div className="flex-1 order-2 xl:order-1 flex flex-col">
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col gap-6 flex-1">
                {/* متن سوال */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 ">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[var(--orgin-color)] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {currentQuestion + 1}
                      </span>
                    </div>
                    <h2 className="text-[16px] sm:text-[18px] font-bold text-white leading-relaxed text-justify">
                      {currentQ?.title}
                    </h2>
                  </div>

                  {isLoading && (
                    <div className="flex items-center gap-2 text-[var(--orgin-color)]">
                      <div className="w-4 h-4 border-2 border-[var(--orgin-color)] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">در حال ذخیره پاسخ...</span>
                    </div>
                  )}
                </div>

                {/* گزینه‌های پاسخ */}
                <div className="space-y-4 flex-1 overflow-y-auto">
                  {currentQ?.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isSubmitting = isLoading && isSelected;

                    return (
                      <div
                        key={`${currentQ.id}-${option.id}`}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-2 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                          isSelected
                            ? "border-[var(--orgin-color)] bg-[var(--orgin-color)]/20 shadow-lg"
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        } ${isLoading && !isSelected ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-[var(--orgin-color)] bg-[var(--orgin-color)] text-white"
                                : "border-white/30 text-white/70 group-hover:border-white/50"
                            }`}
                          >
                            {isSubmitting ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <span className="font-bold text-lg">
                                {persianLetters[index]}
                              </span>
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="text-white text-[16px] leading-relaxed text-justify">
                              {option.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ناوبری بین سوالات */}
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <button
                    onClick={() => handleQuestionClick(currentQuestion - 1)}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      currentQuestion === 0
                        ? "opacity-50 cursor-not-allowed text-white/30"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <IoChevronForward className="text-lg" />
                    <span>سوال قبلی</span>
                  </button>

                  <button
                    onClick={() => handleQuestionClick(currentQuestion + 1)}
                    disabled={currentQuestion === questions.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      currentQuestion === questions.length - 1
                        ? "opacity-50 cursor-not-allowed text-white/30"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>سوال بعدی</span>
                    <IoChevronBack className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* سایدبار بخش‌ها - فقط در xl نمایش داده شود */}
            <div className="hidden xl:flex xl:flex-col xl:w-80 order-1 xl:order-2">
              <div className="sticky top-8 flex-1 flex flex-col">
                {/* پیشرفت بخش‌ها */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex-1 flex flex-col">
                  <h3 className="text-white font-semibold mb-3 text-center">
                    پیشرفت بخش‌ها
                  </h3>
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {Object.entries(sectionNames).map(([id, name]) => {
                      const sectionIdNum = Number(id);
                      const progress = sectionProgress[sectionIdNum];
                      const isCurrent = sectionIdNum === sectionId;
                      const isCompleted = progress?.percent === 100;

                      return (
                        <button
                          key={id}
                          onClick={() => goToSection(sectionIdNum)}
                          className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                            isCurrent
                              ? "bg-[var(--orgin-color)] text-white shadow-lg"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`w-6 h-6 flex items-center justify-center text-xs rounded ${
                                isCurrent ? "bg-white/20" : "bg-white/10"
                              }`}
                            >
                              {sectionIdNum - 1}
                            </div>
                            <span className="text-sm flex-1 text-right">
                              {name}
                            </span>
                          </div>

                          {/* نمایش درصد یا تیک */}
                          <div className="flex-shrink-0">
                            {loadingProgress ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin"></div>
                            ) : isCompleted ? (
                              <IoCheckmarkDoneOutline className="text-green-400 text-lg" />
                            ) : (
                              <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                                {progress?.percent || 0}%
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardSection>
    </AccessGuard>
  );
}
