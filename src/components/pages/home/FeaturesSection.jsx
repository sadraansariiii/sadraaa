// src/components/pages/home/FeaturesSection.jsx
"use client";

import { useRef, useEffect, useState } from "react";

const FeaturesSection = () => {
  const ORANGE_COLOR = "#ff7300";
  const ORANGE_COLOR_500 = "#ff7300";
  const ORANGE_COLOR_600 = "#e66900";
  const GREEN_COLOR = "#10b981";

  // رفرنس‌ها برای انیمیشن تمام بخش‌ها
  const headerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  // استیت‌ها برای مدیریت نمایش انیمیشن‌ها
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [isSection1InView, setIsSection1InView] = useState(false);
  const [isSection2InView, setIsSection2InView] = useState(false);
  const [isSection3InView, setIsSection3InView] = useState(false);

  useEffect(() => {
    const observers = [];

    // تابع ایجاد آبزرور برای هر بخش
    const createObserver = (ref, setInView) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        },
        {
          threshold: 0.3, // وقتی 30% از المان در دید باشد
          rootMargin: "-100px", // 100px قبل از رسیدن به المان
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    };

    // ایجاد آبزرور برای تمام بخش‌ها
    createObserver(headerRef, setIsHeaderInView);
    createObserver(section1Ref, setIsSection1InView);
    createObserver(section2Ref, setIsSection2InView);
    createObserver(section3Ref, setIsSection3InView);

    // پاکسازی آبزرورها هنگام آنمونت
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* بخش هدر - وسط چین - از بالا میاد */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isHeaderInView
              ? "transform-none opacity-100"
              : "-translate-y-20 opacity-0"
          }`}
        >
          {/* تایتل اصلی */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            چرا <span style={{ color: ORANGE_COLOR }}>ایکسپوت؟</span>
          </h2>

          {/* خط نارنجی زیر تایتل */}
          <div className="flex justify-center mb-8">
            <div
              className="h-1 rounded-full w-24"
              style={{
                background: `linear-gradient(to right, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
              }}
            ></div>
          </div>

          {/* متن توضیحی */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed text-justify mb-8">
              جامع ترین سامانه ارزیابی و مشاوره صادرات در ایران که با بهره‌گیری
              از تکنولوژی‌های روز و تیم متخصصان بین‌المللی، مسیر صادرات را برای
              کسب‌وکارهای ایرانی هموار می‌سازد. ما با ارائه خدمات جامع و تخصصی،
              از مرحله ارزیابی اولیه تا اجرای عملیات صادراتی، همراه شما هستیم.
              با استفاده از هوش مصنوعی و تحلیل‌های پیشرفته و استاندارد بین
              المللی، ظرفیت‌های واقعی کسب‌وکار شما را شناسایی کرده و بهترین با
              بهترین و با تجربه ترین کارگزار ها محصولات شما را به بازارهای هدف
              جهانی معرفی می‌کنیم. تیم مشاوران ما با سال‌ها تجربه در زمینه تجارت
              بین‌الملل، راهکارهای عملی و قابل اجرا ارائه می‌دهند که متناسب با
              شرایط خاص هر کسب‌وکار طراحی شده‌اند. در دنیای رقابتی تجارت جهانی،
              صادرات نه تنها فرصتی برای رشد اقتصادی شرکت‌ها محسوب می‌شود، بلکه
              ضرورتی اجتناب‌ناپذیر برای بقا و توسعه پایدار شرکت ها محسوب می شود.
              ارزیابی توانمندی صادراتی، به عنوان ابزاری کلیدی و اولیه، شرکت‌ها
              را قادر می‌سازد تا نقاط قوت و ضعف خود را در زمینه‌های تولید،
              بازاریابی، مالی و لجستیک شناسایی کنند و استراتژی‌های مناسبی برای
              ورود به بازارهای بین‌المللی تدوین نمایند، بدون ارزیابی دقیق، ریسک
              شکست در صادرات افزایش یافته و منابع شرکت به هدر می‌رود، در حالی که
              با انجام آن، می‌توان از فرصت‌های جهانی بهره‌برداری کرد.
            </p>
          </div>

          {/* دکمه ورود */}
        </div>

        {/* بخش‌های اصلی - هر بخش نصف متن و نصف عکس */}
        <div className="space-y-20">
          {/* بخش اول: متن در سمت راست، عکس در سمت چپ */}
          <div
            ref={section1Ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center"
          >
            {/* متن - از سمت راست میاد */}
            <div
              className={`text-right space-y-6 order-2 lg:order-1 transition-all duration-900 ease-out ${
                isSection1InView
                  ? "transform-none opacity-100"
                  : "translate-x-20 opacity-0" // از راست به چپ
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-2xl md:text-3xl font-black text-white">
                ارزیابی جامع صادراتی
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-0"></div>
              <p className="text-gray-300 text-lg leading-relaxed text-justify">
                با ورود و تکمیل ارزیابی توانمندی صادراتی با 120 سوال استاندارد،
                گزارش جامع شامل SWOT و برنامه‌های توسعه‌ای دریافت کنید. سپس، بر
                اساس بازار هدف ، کارگزاران متخصص را از لیست تأییدشده انتخاب
                کنید. از طریق سیستم ارتباطی امن پلتفرم، مستقیماً با کارگزار
                مشورت کرده و راهنمایی‌های عملی برای لجستیک و مذاکرات بگیرید. این
                همکاری از صفر تا صد صادرات شما را پوشش می‌دهد و موفقیت را تضمین
                می‌کند. با این روش، شرکت شما نه تنها ارزیابی دقیق می‌گیرد، بلکه
                به شبکه‌ای از کارشناسان حرفه‌ای متصل می‌شود و صادرات را آسان‌تر
                از همیشه تجربه می‌کند!
              </p>
              <ul className="text-gray-300 space-y-3 text-right">
                <li className="flex items-center justify-end gap-2">
                  <span>ارزیابی توان صادرات با ۱۲۰ سؤال استاندارد</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>دریافت گزارش SWOT و برنامه توسعه‌ای</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>انتخاب کارگزار متخصص بازار هدف</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>مشاوره و اجرای کامل فرآیند صادرات</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
              </ul>
            </div>

            {/* عکس - از سمت چپ میاد */}
            <div
              className={`h-full order-1 lg:order-2 transition-all duration-900 ease-out ${
                isSection1InView
                  ? "transform-none opacity-100"
                  : "-translate-x-20 opacity-0" // از چپ به راست
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 min-h-80 flex items-center justify-center border border-gray-600/30">
                <div className="text-center text-gray-400">
                  <p>تصویر ارزیابی هوشمند</p>
                </div>
              </div>
            </div>
          </div>

          {/* بخش دوم: متن در سمت چپ، عکس در سمت راست (برعکس) */}
          <div
            ref={section2Ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* عکس - از سمت راست میاد */}
            <div
              className={`h-full transition-all duration-900 ease-out ${
                isSection2InView
                  ? "transform-none opacity-100"
                  : "translate-x-20 opacity-0" // از راست به چپ
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 min-h-80 flex items-center justify-center border border-gray-600/30">
                <div className="text-center text-gray-400">
                  <p>تصویر تحلیل بازار جهانی</p>
                </div>
              </div>
            </div>

            {/* متن - از سمت چپ میاد */}
            <div
              className={`text-right space-y-6 transition-all duration-900 ease-out ${
                isSection2InView
                  ? "transform-none opacity-100"
                  : "-translate-x-20 opacity-0" // از چپ به راست
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h3 className="text-2xl md:text-3xl font-black text-white">
                همکاری با مشاوران
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-0"></div>
              <p className="text-gray-300 text-lg leading-relaxed text-justify">
                کارگزاران عزیز، پلتفرم ما شما را به شرکت‌هایی با ارزیابی‌های
                دقیق و برنامه‌های عملی متصل می‌کند! با در نظر گرفتن چالش‌های
                ایران و ویژگی‌های پلتفرم ، شرکت‌ها را به شرکای ایده‌آل برای
                کارگزاران تبدیل می‌کند. شما می‌توانید بر اساس بازار هدف جستجو
                کنید، توانایی‌های شرکت را بررسی کنید و از سیستم امن برای مشاوره
                استفاده کنید. این همکاری درآمد پایدار و شبکه گسترده‌ای برای شما
                به ارمغان می‌آورد. از طریق پلتفرم، مشاوره‌های مؤثر ارائه دهید و
                قراردادهای صادراتی ببندید. این فرصت، شبکه حرفه‌ای شما را تقویت
                می‌کند. همین حالا به ما بپیوندید و در اکوسیستم صادرات ایران
                پیشرو باشید!
              </p>
              <ul className="text-gray-300 space-y-3 text-right">
                <li className="flex items-center justify-end gap-2">
                  <span>دسترسی به شرکت‌های ارزیابی‌شده و آماده همکاری</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>جستجو بر اساس بازار هدف و بررسی توانمندی‌ها</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>مشاوره و عقد قرارداد از طریق سیستم امن پلتفرم</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>کسب درآمد پایدار و گسترش شبکه حرفه‌ای صادرات</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
              </ul>
            </div>
          </div>

          {/* بخش سوم: متن در سمت راست، عکس در سمت چپ */}
          <div
            ref={section3Ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* متن - از سمت راست میاد */}
            <div
              className={`text-right space-y-6 order-2 lg:order-1 transition-all duration-900 ease-out ${
                isSection3InView
                  ? "transform-none opacity-100"
                  : "translate-x-20 opacity-0" // از راست به چپ
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-2xl md:text-3xl font-black text-white">
                سازمانهای حامی صادرات
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-0"></div>
              <p className="text-gray-300 text-lg leading-relaxed text-justify">
                سازمان‌های حامی صادرات، مأموریت شما در ارتقای جایگاه ایران در
                اقتصاد جهانی الهام‌بخش است. پلتفرم ما با ارائه گزارش‌های لحظه‌ای
                و برآورد هزینه‌های گمرکی، تصمیم‌گیری شرکت‌های شما را دقیق‌تر
                می‌کند. همکاری با کارگزاران بین‌المللی، موانع صادراتی مانند
                تحریم‌ها را تا 50% کاهش می‌دهد و موفقیت در بازارهای جهانی را تا
                30% افزایش می‌دهد. این دستاوردها، نقش سازمان شما در توانمندسازی
                اقتصاد ایران را برجسته و جایگاه سازمان شما به‌عنوان حامی صادرات
                با این پلتفرم تقویت می‌شود. به پنل سازمانی وارد شوید و این تحول
                را در عمل ببینید.
              </p>
              <ul className="text-gray-300 space-y-3 text-right">
                <li className="flex items-center justify-end gap-2">
                  <span>
                    دسترسی به گزارش‌های لحظه‌ای و تحلیل‌های دقیق صادراتی
                  </span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>
                    برآورد هوشمند هزینه‌های گمرکی برای تصمیم‌گیری بهتر
                  </span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>
                    کاهش ۵۰٪ موانع صادراتی با همکاری کارگزاران بین‌المللی
                  </span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>
                    تقویت نقش سازمان در توانمندسازی و توسعه صادرات ایران
                  </span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </li>
              </ul>
            </div>

            {/* عکس - از سمت چپ میاد */}
            <div
              className={`h-full order-1 lg:order-2 transition-all duration-900 ease-out ${
                isSection3InView
                  ? "transform-none opacity-100"
                  : "-translate-x-20 opacity-0" // از چپ به راست
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 min-h-80 flex items-center justify-center border border-gray-600/30">
                <div className="text-center text-gray-400">
                  <p>تصویر پشتیبانی اجرایی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
