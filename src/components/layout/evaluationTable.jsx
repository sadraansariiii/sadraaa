const EvaluationTable = ({ companyName, date, Percentage, button, code }) => {
  return (
    <div
      className="w-full xl:min-h-32 bg-gradient-to-r from-white/10 via-black/30 to-white/10 
                   flex gap-3 xl:gap-4 items-center p-3 xl:p-4"
    >
      <div className="flex-1 h-full grid grid-cols-1 xl:grid-cols-7 gap-3 xl:gap-4 items-center">
        <div className="w-full h-fit text-[var(--text-color)] text-base xl:text-[18px] font-medium flex flex-col gap-1.5 justify-center order-1">
          {code}
        </div>
        {/* نام شرکت */}
        <div className="w-full h-fit text-[var(--text-color)] text-base xl:text-[18px] font-medium flex flex-col gap-1.5 justify-center order-1">
          <span className="font-bold truncate" title={companyName}>
            {companyName}
          </span>
          {/* نمایش تاریخ در موبایل */}
          <div className="xl:hidden text-sm text-gray-300 mt-1">
            تاریخ: {date}
          </div>
        </div>

        {/* تاریخ - فقط در دسکتاپ */}
        <div className="hidden xl:flex w-full h-fit text-[var(--text-color)] text-[18px] font-medium  order-3 xl:order-2">
          {date}
        </div>

        {/* درصد پیشرفت */}
        <div className="w-full col-span-2 h-full text-[var(--text-color)] text-base xl:text-[18px] font-medium flex items-center justify-center order-2 xl:order-3">
          <div className="flex flex-col h-full xl:flex-row items-start xl:items-center xl:justify-center gap-2 xl:gap-3 w-full">
            {/* متن درصد و توضیح */}
            <div className="flex items-center gap-2 w-full xl:w-auto justify-between xl:justify-start">
              {/* نمایش درصد در موبایل به صورت دایره‌ای */}
              <div className="xl:hidden relative w-12 h-12">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#a0a0a0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray={`${Percentage}, 100`}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-400">
                  {Percentage}%
                </div>
              </div>
            </div>

            {/* نوار پیشرفت - برای دسکتاپ و موبایل */}
            <div className="relative w-full h-full flex justify-center items-center">
              {/* درصدهای 0 و 100 */}
              <div className="absolute top-4 right-0 transform translate-x-1/2 text-xs text-gray-200">
                0%
              </div>
              <div className="absolute top-4 right-1/4 transform translate-x-1/2 text-xs text-gray-200">
                25%
              </div>
              <div className="absolute top-4 right-2/4 transform translate-x-1/2 text-xs text-gray-200">
                50%
              </div>
              <div className="absolute top-4 right-3/4 transform translate-x-1/2 text-xs text-gray-200">
                75%
              </div>
              <div className="absolute top-4 left-0 transform -translate-x-1/2 text-xs text-gray-200">
                100%
              </div>

              <div className="flex-1 h-3 bg-gradient-to-r from-green-600 via-yellow-500  to-rose-700 rounded-full overflow-hidden relative">
                {/* نشانگرهای 20 درصدی */}
                <div className="absolute top-0 left-1/4 w-px h-3 bg-white/50"></div>
                <div className="absolute top-0 left-2/4 w-px h-3 bg-white/50"></div>
                <div className="absolute top-0 left-3/4 w-px h-3 bg-white/50"></div>

                {/* قسمت پر شده */}
                <div
                  className="absolute top-0 right-0 h-full bg-transparent rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Percentage}%` }}
                ></div>

                {/* قسمت باقیمانده */}
                <div
                  className="absolute top-0 left-0 h-full bg-gray-200 transition-all duration-1000 ease-out"
                  style={{ width: `calc(100% - ${Percentage}%)` }}
                ></div>
              </div>

              <div
                className="hidden w-16 h-8 absolute bg-[var(--orgin-color)] -bottom-3 rounded-[8px] transition-all duration-700 ease-out transform translate-x-1/2 
                z-50 xl:flex justify-center items-end p-1"
                style={{ right: `${Percentage}%` }}
              >
                <div className="absolute w-4 h-4 rotate-45 right-1/2 transform translate-x-1/2 -top-2 rounded-tl-[2px] bg-[var(--orgin-color)] "></div>
                <span className="text-[var(--text-color)] text-[14px]">
                  {Percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه */}
        <div className="w-full h-fit col-span-2 text-[var(--text-color2)] font-medium flex items-center justify-end order-4 ">
          <div className="transform scale-90 mt-10 xl:mt-0 xl:scale-100 origin-left">
            {button}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationTable;
