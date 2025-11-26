"use client";

import ContentTabs from "./ContentTabs";

const AccordionQuestion = ({
  questionData,
  questionNumber,
  isOpen,
  onToggle,
}) => {
  if (!questionData) return null;

  const data = questionData;

  return (
    <div
      className={`rounded-[8px] mb-4 overflow-hidden transition-all duration-300 backdrop-blur-[80px] ${
        isOpen
          ? "bg-green-400/5"
          : " bg-gray-800/60 rounded-2xl px-4 py-2 border border-gray-700 shadow-lg shadow-black/20"
      }`}
    >
      <div
        className="p-4 cursor-pointer flex justify-between items-center transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1">
            <h4
              className={`font-bold text-lg ${
                isOpen ? "text-white" : "text-white"
              }`}
            >
              سؤال {questionNumber}
            </h4>

            {data.q_title && (
              <p
                className={`text-sm mt-1 line-clamp-2 ${
                  isOpen ? "text-gray-200" : "text-gray-400"
                }`}
              >
                {data.q_title}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-orange-400 font-bold text-sm">
              {Number(data.your_percent_in_context || 0).toFixed(1)}%
            </div>
            <div className="text-gray-400 text-xs">
              {data.answered} از {data.max}
            </div>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "text-orange-400 rotate-180" : "text-gray-400"
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

      {isOpen && (
        <div className="p-4 border-t border-gray-700 animate-fadeIn">
          <div className="mb-6 p-4">
            <h5 className="text-orange-400 font-bold mb-2 text-lg">سوال</h5>
            <p className="text-gray-200 text-sm px-4 py-1">{data.q_title}</p>
          </div>

          <div className="mb-6 p-4">
            <h5 className="text-orange-400 font-bold mb-2 text-lg">پاسخ شما</h5>
            <p className="text-gray-200 text-sm px-4 py-1">{data.qa_title}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
              <div className="text-gray-300 text-xs">امتیاز سوال</div>
              <div className="text-orange-400 font-bold text-lg">
                {data.max}
              </div>
            </div>
            <div className="text-center bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
              <div className="text-gray-300 text-xs">امتیاز کسب شده</div>
              <div className="text-green-400 font-bold text-lg">
                {data.answered}
              </div>
            </div>
            <div className="text-center bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
              <div className="text-gray-300 text-xs">درصد در بخش</div>
              <div className="text-blue-400 font-bold text-lg">
                {Number(data.maxqinsecton || 0).toFixed(1)}%
              </div>
            </div>
            <div className="text-center bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
              <div className="text-gray-300 text-xs">درصد در کل</div>
              <div className="text-purple-400 font-bold text-lg">
                {Number(data.your_percent_in_context || 0).toFixed(1)}%
              </div>
            </div>
          </div>

          <ContentTabs questionData={questionData} />
        </div>
      )}
    </div>
  );
};

export default AccordionQuestion;