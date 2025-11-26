// components/HeroSlider.jsx
"use client";

import { useState, useEffect, useRef } from "react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeElements, setActiveElements] = useState({
    title: false,
    description: false,
    button: false,
  });
  const [isChanging, setIsChanging] = useState(false);
  const autoPlayRef = useRef(null);
  const slideChangeTimeoutRef = useRef(null);

  // رنگ اصلی
  const ORANGE_COLOR = "#ff7300";
  const ORANGE_COLOR_500 = "#ff7300";
  const ORANGE_COLOR_600 = "#e66900";
  const ORANGE_COLOR_400 = "#ff8c33";
  const GREEN_COLOR = "#10b981";

  const slides = [
    {
      id: 1,
      image: "/images/hero1.jpg",
      title: "ارزیابی توانمندی صادراتی",
      description:
        "در دنیای رقابتی صادرات، بسیاری از شرکت‌ها بدون استاندارد مشخصی برای ارزیابی توانمندی‌های خود، فرصت‌های جهانی را از دست می‌دهند. نبود زیرساخت‌های مناسب مانند یک پلتفرم اختصاصی، باعث می‌شود شرکت‌ها نتوانند نقاط قوت و ضعف صادراتی‌شان را به درستی شناسایی کنند. با پلتفرم ارزیابی توانمندی صادراتی ما، استانداردی نوین ارائه می‌دهیم تا شرکت‌ها با اطمینان بیشتری وارد بازارهای بین‌المللی شوند.",
      buttonText: "ورود به پنل شزکت ها",
      buttonLink: "/assessment",
    },
    {
      id: 2,
      image: "/images/hero2.jpg",
      title: "مشاوران متخصص صادراتی",
      description:
        "تصور کنید دسترسی به شرکت‌هایی که با ۱۲۰ سؤال ارزیابی شده‌اند و گزارش‌هایی شامل SWOT، برنامه‌های توسعه‌ای و ارزیابی ریسک دارند. پلتفرم همچنین هزینه‌های گمرکی بر اساس HS Code را محاسبه می‌کند. کارگزاران مانند شما می‌توانند این شرکت‌ها را جستجو کنند، جزئیات را بررسی کنند و همکاری را آغاز کنند. این فرصت شبکه‌سازی قدرتمندی فراهم می‌کند. به پنل اختصاصی مشاوران وارد شوید و موفقیت‌های بزرگ را تجربه کنید!",
      buttonText: "ورود به پنل مشاوران",
      buttonLink: "/market-analysis",
    },
    {
      id: 3,
      image: "/images/hero3.jpg",
      title: "سازمانهای حامی صادرات",
      description:
        "سازمان‌های پیشرو و حامیان اصلی صادرات، شما معماران رشد صادرات شرکت ها هستید. مأموریت شما در توانمندسازی شرکت‌ها برای رقابت در بازارهای جهانی بی‌نظیر است. پلتفرم ما با ارزیابی‌های استاندارد بین‌المللی و اتصال به شبکه گسترده کارگزاران، شرکت‌های تحت حمایت شما را به بازارهای جهانی متصل می‌کند. این ابزار، فرآیند صادرات را کارآمد و داده‌محور می‌کند. برای تقویت مأموریت خود، به پنل اختصاصی سازمان‌ها وارد شوید.",
      buttonText: "ورود به پنل سازمان ها",
      buttonLink: "/consultation",
    },
  ];

  // تابع تغییر اسلاید (برای دستی و اتوپلی)
  const changeSlide = (newSlide) => {
    if (isChanging) return;
    setIsChanging(true);

    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (slideChangeTimeoutRef.current)
      clearTimeout(slideChangeTimeoutRef.current);

    // خروج انیمیشن متن‌ها
    setActiveElements({
      title: false,
      description: false,
      button: false,
    });

    // بعد از 600ms اسلاید عوض بشه
    slideChangeTimeoutRef.current = setTimeout(() => {
      setCurrentSlide(newSlide);
      setIsChanging(false);
    }, 600);
  };

  // اتوپلی → همیشه از changeSlide استفاده می‌کنه
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    autoPlayRef.current = setInterval(() => {
      changeSlide((currentSlide + 1) % slides.length);
    }, 15000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (slideChangeTimeoutRef.current)
        clearTimeout(slideChangeTimeoutRef.current);
    };
  }, [currentSlide]);

  // انیمیشن ورود متن‌ها
  useEffect(() => {
    if (isChanging) return;

    const titleTimer = setTimeout(() => {
      setActiveElements((prev) => ({ ...prev, title: true }));
    }, 500);

    const descriptionTimer = setTimeout(() => {
      setActiveElements((prev) => ({ ...prev, description: true }));
    }, 1000);

    const buttonTimer = setTimeout(() => {
      setActiveElements((prev) => ({ ...prev, button: true }));
    }, 1500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(descriptionTimer);
      clearTimeout(buttonTimer);
    };
  }, [currentSlide, isChanging]);

  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
  const goToSlide = (index) => {
    if (index !== currentSlide) changeSlide(index);
  };

  return (
    <div className="relative w-full h-[700px] md:h-[750px] xl:h-[950px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* هدر با لوگو و دکمه‌های ورود/ثبت نام */}

      {/* Background Animated Elements - مخفی در موبایل برای عملکرد بهتر */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Connection Lines - فقط در دسکتاپ */}
        <div
          className="hidden lg:block absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-float-slow"
          style={{ border: `1px solid ${ORANGE_COLOR}20` }}
        ></div>
        <div
          className="hidden lg:block absolute top-3/4 right-1/4 w-48 h-48 rounded-full animate-float-medium"
          style={{ border: `1px solid ${ORANGE_COLOR}15` }}
        ></div>

        {/* Animated Connection Dots - ساده‌تر در موبایل */}
        <div
          className="absolute top-1/2 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
          style={{ backgroundColor: ORANGE_COLOR }}
        ></div>

        {/* Geometric Shapes - فقط در دسکتاپ */}
        <div
          className="hidden lg:block absolute top-16 right-16 w-8 h-8 transform rotate-45 animate-spin-slow"
          style={{ border: `2px solid ${ORANGE_COLOR}30` }}
        ></div>
      </div>

      {/* Main Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-600 ease-out px-0 lg:px-20 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="container mx-auto h-full px-4 sm:px-6">
            <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-10 lg:gap-0 h-full pt-16 sm:pt-20 lg:pt-0">
              {/* متن‌ها - سمت راست در دسکتاپ، بالا در موبایل */}
              <div className="lg:w-1/2 text-center lg:text-right order-2 lg:order-1 lg:pr-8 mt-8 lg:mt-0 lg:ml-10">
                <div className="space-y-4 sm:space-y-6">
                  {/* تایتل */}
                  <h1
                    className={`text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight transition-all duration-800 ease-out ${
                      activeElements.title
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8"
                    }`}
                    style={{
                      textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {slide.title}
                    {/* Accent Line */}
                    <div
                      className={`h-1 mt-3 sm:mt-4 rounded-full transition-all duration-1200 ease-out mx-auto lg:mx-0 ${
                        activeElements.title
                          ? "w-16 sm:w-20 lg:w-24 opacity-100"
                          : "w-0 opacity-0"
                      }`}
                      style={{
                        background: `linear-gradient(to right, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
                      }}
                    ></div>
                  </h1>

                  {/* توضیحات */}
                  <p
                    className={`text-base sm:text-lg md:text-xl lg:text-[18px] text-justify text-gray-300 leading-relaxed transition-all duration-800 ease-out delay-300 ${
                      activeElements.description
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6"
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* دکمه */}
                  <div
                    className={`transition-all duration-800 ease-out delay-600 ${
                      activeElements.button
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6"
                    }`}
                  >
                    <button
                      className="group relative text-white px-6 sm:px-8 py-3 sm:py-2 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 transform hover:scale-105 border overflow-hidden backdrop-blur-sm w-full sm:w-auto"
                      style={{
                        background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
                        borderColor: `${ORANGE_COLOR}20`,
                        boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}25`,
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `linear-gradient(to right, ${ORANGE_COLOR_600}, ${ORANGE_COLOR_600})`;
                        e.target.style.boxShadow = `0 35px 60px -12px ${ORANGE_COLOR}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`;
                        e.target.style.boxShadow = `0 25px 50px -12px ${ORANGE_COLOR}25`;
                      }}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative flex items-center justify-center lg:justify-start gap-2">
                        {slide.buttonText}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* عکس - سمت چپ در دسکتاپ، پایین در موبایل */}
              <div className="lg:w-1/2 order-1 lg:order-2 mb-6 lg:mb-0 w-full lg:mr-10">
                <div
                  className={`relative w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 transition-all duration-1200 ease-out ${
                    activeElements.title
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                  }`}
                >
                  {/* Main Image Container */}
                  <div className="relative w-full h-full group">
                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                      style={{
                        background: `radial-gradient(ellipse at center, ${ORANGE_COLOR}20 0%, transparent 70%)`,
                      }}
                    ></div>

                    {/* Image Frame */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                      {/* Placeholder Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                            style={{ backgroundColor: `${ORANGE_COLOR}20` }}
                          >
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: ORANGE_COLOR }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-400 font-medium text-sm sm:text-base">
                            تصویر {slide.title}
                          </span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${ORANGE_COLOR}10` }}
                      ></div>
                    </div>

                    {/* Floating Elements - فقط در دسکتاپ */}
                    <div
                      className="hidden lg:block absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse"
                      style={{ backgroundColor: ORANGE_COLOR }}
                    ></div>
                    <div
                      className="hidden lg:block absolute -bottom-2 -left-2 w-4 h-4 rounded-full animate-pulse delay-1000"
                      style={{ backgroundColor: ORANGE_COLOR_400 }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* دکمه‌های ناوبری - پایین وسط */}
      <div className="absolute bottom-4 hidden sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 lg:flex gap-8 sm:gap-20 items-center">
        {/* دکمه قبلی */}
        <button
          onClick={prevSlide}
          className="group relative bg-gray-800/80 text-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-110 border backdrop-blur-sm"
          style={{
            borderColor: `${ORANGE_COLOR}50`,
            boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}10`,
          }}
        >
          <div className="relative">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>

        {/* دکمه بعدی */}
        <button
          onClick={nextSlide}
          className="group relative bg-gray-800/80 text-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-110 border backdrop-blur-sm"
          style={{
            borderColor: `${ORANGE_COLOR}50`,
            boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}10`,
          }}
        >
          <div className="relative">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* شماره اسلایدها - سمت چپ در دسکتاپ */}
      <div className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 sm:space-y-6">
        {/* خط عمودی */}
        <div
          className="w-1 h-20 sm:h-32 rounded-full shadow-lg"
          style={{
            background: `linear-gradient(to bottom, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_400}, ${ORANGE_COLOR_500})`,
            boxShadow: `0 10px 15px -3px ${ORANGE_COLOR}25`,
          }}
        ></div>

        {/* شماره اسلایدها */}
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full transition-all duration-500 transform ${
              index === currentSlide
                ? "scale-110 shadow-2xl"
                : "bg-gray-700/50 hover:bg-gray-600/70 scale-90 hover:scale-100"
            }`}
            style={
              index === currentSlide
                ? {
                    backgroundColor: ORANGE_COLOR,
                    boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}50`,
                  }
                : {}
            }
          >
            {/* شماره */}
            <span
              className={`font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                index === currentSlide
                  ? "text-white"
                  : "text-gray-400 group-hover:text-white"
              }`}
            >
              {index + 1}
            </span>
          </button>
        ))}

        {/* خط پایین */}
        <div
          className="w-1 h-20 sm:h-32 rounded-full shadow-lg"
          style={{
            background: `linear-gradient(to top, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_400}, ${ORANGE_COLOR_500})`,
            boxShadow: `0 10px 15px -3px ${ORANGE_COLOR}25`,
          }}
        ></div>
      </div>

      {/* نسخه موبایل - افقی */}
    </div>
  );
};

export default HeroSlider;
