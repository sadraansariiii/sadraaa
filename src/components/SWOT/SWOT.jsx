import React from "react";

const SWOT = ({ strengths, weaknesses, opportunities, threats }) => {
  const swotSections = [
    {
      title: "نقاط قوت (Strengths)",
      short: "S",
      items: strengths,
      bgGradient: "ml-40",
      border: "border-emerald-500/30",
      dotColor: "bg-emerald-400",
      textColor: "text-emerald-500",
      circleColor: "bg-emerald-500/70",
      position: "-left-24 -bottom-30",
      justify: "justify-end",
      shortPosition: "top-[35%] right-4",
    },
    {
      title: "نقاط ضعف (Weaknesses)",
      short: "W",
      items: weaknesses,
      bgGradient: "mr-40",
      border: "border-rose-500/30",
      dotColor: "bg-rose-400",
      textColor: "text-rose-500",
      circleColor: "bg-rose-500/70",
      position: "-right-30 -bottom-24",
      justify: "justify-star",
      shortPosition: "left-[35%] top-4",
    },
    {
      title: "فرصت‌ها (Opportunities)",
      short: "O",
      items: opportunities,
      bgGradient: "ml-40",
      border: "border-amber-500/30",
      dotColor: "bg-amber-400",
      textColor: "text-amber-500",
      circleColor: "bg-amber-500/70",
      position: "-left-30 -top-24",
      justify: "justify-end",
      shortPosition: "bottom-4 right-[38%]",
    },
    {
      title: "تهدیدها (Threats)",
      short: "T",
      items: threats,
      bgGradient: "mr-40",
      border: "border-orange-500/30",
      dotColor: "bg-orange-400",
      textColor: "text-orange-500",
      circleColor: "bg-orange-500/70",
      position: "-right-24 -top-30",
      justify: "justify-start",
      shortPosition: "bottom-[30%] left-4",
    },
  ];

  return (
    <div className="w-full h-fit grid grid-cols-2 p-4 relative">
      {/* دایره سفید مرکزی */}
      <div className="absolute w-44 h-44 bg-neutral-800 text-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center text-4xl SWOT-shadow">
        SWOT
      </div>

      {swotSections.map((section, index) => (
        <div
          key={index}
          className={`relative w-full h-full flex items-center ${section.justify} overflow-hidden z-10`}
        >
          {/* دایره رنگی با حرف اول */}
          <div
            className={`absolute w-60 h-60 rounded-full ${section.circleColor} ${section.position} flex justify-center items-center text-white font-bold text-4xl`}
          >
            <span className={`absolute text-2xl ${section.shortPosition}`}>{section.short}</span>
          </div>
         

          {/* کادر با داده‌ها */}
          <div
            className={`relative z-20  min-w-[400px] max-w-[500px] mb-4 h-full max-h-full p-4 flex flex-col overflow-y-auto bg-gradient-to-br ${section.bgGradient} ${section.border} `}
          >
            <div className="flex w-fit items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${section.dotColor}`}></div>
              <h5 className={`font-bold ${section.textColor}`}>
                {section.title}
              </h5>
            </div>

            <div className="space-y-2 w-fit overflow-y-auto">
              {section.items && section.items.length > 0 ? (
                section.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 px-10">
                    <span className={`${section.textColor} text-sm mt-1`}>
                      •
                    </span>
                    <span className={`${section.textColor} text-sm`}>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">داده‌ای موجود نیست</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SWOT;
