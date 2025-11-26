// src/components/pages/home/ProcessSection.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProcessSection = () => {
  const ORANGE_COLOR = "#ff7300";
  const ORANGE_COLOR_500 = "#ff7300";
  const ORANGE_COLOR_600 = "#e66900";
  const GREEN_COLOR = "#10b981";

  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);

  const steps = [
    {
      step: "۱",
      title: "ثبت نام ",
      description:
        "ثبت نام کنید و اطلاعات شرکت  و کسب‌وکار خود را وارد نمایید. این مرحله تنها ۱۰ دقیقه زمان می‌برد.",
      icon: "📝",
      details: [
        "نام شرکت",
        "شناسه ملی شرکت",
        "شماره همراه رابط",
        "شماره تماس شرکت",
      ],
      duration: "۱۰ دقیقه",
    },
    {
      step: "۲",
      title: "فرم های ارزیابی",
      description:
        "فرم ارزیابی  شامل 9 بخش که با انتخاب 120 جواب از بین 440 جواب نقات قدرت و ضعف خودتان را بررسی کنید. این مرحله تنها 40 دقیقه زمان می‌برد.",
      icon: "🔍",
      details: [
        "ظرفیت تولید و عملیات",
        "دانش بازار و فروش",
        "تطبیق‌ پذیری محصول و بسته‌بندی",
        "مدیریت ریسک و شبکه‌سازی",
      ],
      duration: "۲۴-۴۸ ساعت",
    },
    {
      step: "۳",
      title: "تحلیل و دریافت گزارش",
      description:
        "ظرفیت‌ها و فرصت‌های صادراتی شما  با استفاده از هوش مصنوعی و تمهیدات لازم بصورت آنلاین و لحظه ای تجریه و تحلیل و نتایج آن برای تصمیم گیری بهتر ارائه می گردد.",
      icon: "📊",
      details: [
        "ارائه پیشنهاد و برنامه کوتاه و میان و بلند مدت و  swot",
        "هزینه های و درصدهای گمرکی و حدود زمان ترخیص",
        "ارائه ارزیابی صداقت و ریسک توان صادراتی",
        "ارائه ارزیابی پیش بینی موفقیت صادراتی",
      ],
      duration: "فوری",
    },
    {
      step: "۴",
      title: "ارتباط با کارگزاران",
      description:
        "با همراهی مشاوران متخصص در سرتاسر دنیا ، برنامه صادراتی و استراتژی  ورود به بازهای جهانی به صورت عملی اجرا کنید.",
      icon: "🚀",
      details: [
        "انتخاب کارگزار متخصص",
        "نمایش محصولات شما برای همه کارگزاران",
        "انتخاب نوع خدمات مورد نیاز",
        "بهینه‌سازی استراتژی",
      ],
      duration: "مستمر",
    },
  ];

  // مشاهده section برای شروع انیمیشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // تابع شروع اتوپلی
  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
  };

  // تابع توقف اتوپلی
  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // شروع اتوپلی وقتی section visible شد
  useEffect(() => {
    if (isVisible) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isVisible]);

  // هندلر کلیک دستی کاربر - تایمر ریست شود
  const handleStepClick = (index) => {
    setActiveStep(index);
    stopAutoPlay();

    // بعد از 10 ثانیه دوباره اتوپلی شروع شود
    setTimeout(() => {
      if (isVisible) {
        startAutoPlay();
      }
    }, 10000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* المان‌های دکوراتیو پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
          style={{ border: `1px solid ${ORANGE_COLOR}15` }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full"
          style={{ border: `1px solid ${GREEN_COLOR}10` }}
          animate={{
            x: [0, 8, 0],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* نقاط متحرک */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full"
          style={{ backgroundColor: ORANGE_COLOR }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* المان‌های متحرک جدید */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full"
          style={{ backgroundColor: `${ORANGE_COLOR}10` }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/2 w-12 h-12 rounded-full"
          style={{ border: `2px dashed ${GREEN_COLOR}20` }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* هدر بخش */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            مراحل <span style={{ color: ORANGE_COLOR }}>ارزیابی صادرات</span>
          </h2>
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="h-1 rounded-full w-24"
              style={{
                background: `linear-gradient(to right, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
              }}
            />
          </motion.div>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            در ۴ مرحله ساده و سریع، آماده ورود به بازارهای جهانی شوید
          </motion.p>
        </motion.div>

        {/* نمایش مراحل به صورت دسکتاپ */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => handleStepClick(index)}
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* دایره مرحله */}
                  <motion.div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                      activeStep === index ? "shadow-2xl" : "shadow-lg"
                    }`}
                    style={{
                      background:
                        activeStep === index
                          ? `linear-gradient(135deg, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`
                          : `linear-gradient(135deg, ${ORANGE_COLOR}30, ${GREEN_COLOR}30)`,
                      color: activeStep === index ? "white" : ORANGE_COLOR,
                    }}
                    animate={{
                      scale: activeStep === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* هایلایت فعال */}
                  {activeStep === index && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: ORANGE_COLOR }}
                        initial={{ scale: 1, opacity: 0.2 }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute -inset-2 rounded-full blur-md opacity-30"
                        style={{ backgroundColor: ORANGE_COLOR }}
                        animate={{
                          opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}
                </motion.button>

                {/* عنوان مرحله */}
                <motion.h3
                  className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    activeStep === index ? "text-orange-400" : "text-white"
                  }`}
                  animate={{
                    scale: activeStep === index ? 1.05 : 1,
                  }}
                >
                  {step.title}
                </motion.h3>

                {/* زمان */}
                <motion.div
                  className="text-sm text-gray-400"
                  whileHover={{ scale: 1.05 }}
                >
                  ⏱️ {step.duration}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* نمایش جزئیات مرحله فعال */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
                {/* اطلاعات مرحله */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div>
                    <motion.h3
                      className="text-2xl font-black text-white mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {steps[activeStep].title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 h-20 text-lg leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {steps[activeStep].description}
                    </motion.p>
                  </div>

                  {/* جزئیات */}
                  <div className="space-y-3">
                    <motion.h4
                      className="text-lg font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      جزئیات مرحله:
                    </motion.h4>
                    <ul className="space-y-2">
                      {steps[activeStep].details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: idx * 0.2,
                            }}
                          />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* نمایش بصری */}
                <motion.div
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 flex items-center justify-center border border-gray-600/30 h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="text-center text-gray-400">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {steps[activeStep].icon}
                    </motion.div>
                    <motion.p
                      className="text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      مرحله {steps[activeStep].step}
                    </motion.p>
                    <motion.p
                      className="text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      {steps[activeStep].duration}
                    </motion.p>

                    {/* نشانگر پیشرفت */}
                    <motion.div
                      className="mt-6 flex justify-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      {steps.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeStep
                              ? "bg-orange-500"
                              : "bg-gray-600"
                          }`}
                          whileHover={{ scale: 1.3 }}
                          animate={{
                            scale: index === activeStep ? [1, 1.3, 1] : 1,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* نمایش مراحل به صورت موبایل */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                activeStep === index
                  ? "border-orange-500/30 shadow-lg scale-105"
                  : "border-gray-700/30"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                {/* آیکون مرحله */}
                <motion.button
                  onClick={() => handleStepClick(index)}
                  className="flex-shrink-0"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      activeStep === index ? "scale-110" : ""
                    }`}
                    style={{
                      background:
                        activeStep === index
                          ? `linear-gradient(135deg, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`
                          : `linear-gradient(135deg, ${ORANGE_COLOR}30, ${GREEN_COLOR}30)`,
                      color: activeStep === index ? "white" : ORANGE_COLOR,
                    }}
                    animate={{
                      scale: activeStep === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: activeStep === index ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.button>

                {/* محتوا */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.h3
                      className="text-lg font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.span
                      className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                      ⏱️ {step.duration}
                    </motion.span>
                  </div>

                  <motion.p
                    className="text-gray-300 mb-3 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* جزئیات */}
                  <motion.ul
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                  >
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1 + idx * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.1,
                          }}
                        />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* دکمه اقدام */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 transform border backdrop-blur-sm"
            style={{
              background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
              borderColor: `${ORANGE_COLOR}40`,
              boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}25`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 35px 60px -12px ${ORANGE_COLOR}35`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            شروع فرآیند ارزیابی
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
