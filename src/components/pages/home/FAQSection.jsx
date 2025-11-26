// src/components/pages/home/FAQSection.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const ORANGE_COLOR = "#ff7300";
  const GREEN_COLOR = "#10b981";

  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const faqItems = [
    {
      question: "ارزیابی آمادگی صادرات در Expot چیست و چه مزایایی دارد؟",
      answer:
        "ارزیابی آمادگی صادرات (Export Readiness Assessment) در Expot کاملاً آنلاین انجام می‌شود و به کسب‌وکارها کمک می‌کند تا نقاط قوت، ضعف و ظرفیت‌های واقعی خود را برای ورود به بازارهای بین‌المللی شناسایی کنند. این فرآیند باعث کاهش ریسک، صرفه‌جویی در زمان و هزینه، و افزایش شانس موفقیت در صادرات می‌شود.",
    },
    {
      question: "چه مدت طول می‌کشد تا نتایج ارزیابی در Expot آماده شود؟",
      answer:
        "تکمیل فرم ارزیابی آنلاین حدود ۱۰ تا ۱۵ دقیقه زمان می‌برد. پس از اتمام، سیستم Expot تحلیل اولیه را فوری نمایش می‌دهد و گزارش جامع تخصصی طی ۲۴ تا ۴۸ ساعت آماده و در دسترس قرار می‌گیرد.",
    },
    {
      question: "هزینه استفاده از خدمات ارزیابی Expot چقدر است؟",
      answer:
        "Expot یک ارزیابی اولیه رایگان ارائه می‌دهد که شامل تحلیل ظرفیت و شناسایی فرصت‌های صادراتی است. برای خدمات پیشرفته‌تر مانند تحلیل بازار هدف، مشاوره تخصصی و پشتیبانی اجرایی، بسته‌های متنوع با قیمت‌های متناسب ارائه می‌شوند.",
    },
    {
      question: "آیا Expot برای کسب‌وکارهای کوچک هم مناسب است؟",
      answer:
        "بله، Expot برای همه سطوح کسب‌وکار طراحی شده است — از استارت‌آپ‌ها و کارگاه‌های تولیدی کوچک گرفته تا شرکت‌های بزرگ. این پلتفرم به کسب‌وکارهای کوچک کمک می‌کند با کمترین هزینه، صادرات خود را به شکل آنلاین و هوشمند آغاز کنند.",
    },
    {
      question: "گزارش ارزیابی Expot شامل چه مواردی است؟",
      answer:
        "گزارش آنلاین Expot شامل تحلیل SWOT، پیشنهادات استراتژیک، بازارهای هدف، برنامه زمان‌بندی توسعه صادرات و تحلیل رقباست. این گزارش بعد از تکمیل ارزیابی در دسترس قرار می‌گیرد و به عنوان نقشه راه صادرات و توسعه بین‌المللی شما عمل می‌کند.",
    },
    {
      question: "آیا Expot پس از ارزیابی پشتیبانی هم ارائه می‌دهد؟",
      answer:
        "بله، Expot فقط ارزیابی نمی‌کند بلکه همراه شما می‌ماند! پس از تکمیل ارزیابی آنلاین، خدمات پشتیبانی شامل مشاوره تخصصی، راهنمایی در مذاکرات بین‌المللی، پشتیبانی لجستیکی و بهبود مداوم استراتژی صادرات ارائه می‌شود.",
    },
    {
      question: "اطلاعات و داده‌های من در Expot چگونه محافظت می‌شوند؟",
      answer:
        "امنیت اطلاعات در Expot اولویت اصلی ماست. تمام داده‌ها رمزنگاری شده و تحت پروتکل‌های بین‌المللی امنیتی ذخیره می‌شوند. فقط کارشناسان مجاز و متعهد به حفظ محرمانگی به داده‌ها دسترسی دارند.",
    },
    {
      question: "آیا Expot برای همه نوع محصولات و خدمات کاربرد دارد؟",
      answer:
        "بله، Expot انواع محصولات صنعتی، کشاورزی، صنایع دستی، خدمات فنی‌مهندسی و دیجیتال را پشتیبانی می‌کند. هدف ما یافتن بهترین بازار هدف برای هر نوع محصول یا خدمت ایرانی است و کل فرآیند آنلاین انجام می‌شود.",
    },
    {
      question: "آیا گزارش Expot قابل استفاده برای جذب سرمایه‌گذار است؟",
      answer:
        "بله، گزارش‌های تحلیلی Expot شامل داده‌های کلیدی عملکردی، نقاط قوت و مسیر رشد صادراتی هستند و می‌توانند بعد از تکمیل ارزیابی آنلاین در جلسات جذب سرمایه‌گذار یا مذاکرات تجاری استفاده شوند.",
    },
    {
      question: "چگونه می‌توانم ارزیابی خود را در Expot شروع کنم؟",
      answer:
        "خیلی ساده! وارد وب‌اپلیکیشن Expot شوید، فرم ارزیابی آنلاین را تکمیل کنید و بعد از اتمام، گزارش جامع و تخصصی خود را دریافت کنید.",
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
      { threshold: 0.2 }
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

  // انیمیشن‌ها
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // شبیه‌سازی ارسال فرم
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* المان‌های دکوراتیو پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full"
          style={{ border: `1px solid ${ORANGE_COLOR}15` }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-28 h-28 rounded-full"
          style={{ border: `1px solid ${GREEN_COLOR}10` }}
          animate={{
            x: [0, 15, 0],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full"
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
            سوالات <span style={{ color: ORANGE_COLOR }}>متداول</span>
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
            پاسخ به پرسش‌های پرتکرار درباره ارزیابی صادرات و خدمات صادرپلاس
          </motion.p>
        </motion.div>

        {/* شبکه سوالات متداول */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden"
                style={{
                  boxShadow:
                    activeIndex === index
                      ? `0 10px 30px -10px ${ORANGE_COLOR}15`
                      : "0 5px 20px -5px rgba(0,0,0,0.2)",
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(255, 115, 0, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* سوال */}
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 hover:bg-gray-700/30 transition-all duration-300"
                  whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg font-bold text-white flex-1 text-right">
                    {item.question}
                  </h3>
                  <motion.div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                    animate={{
                      rotate: activeIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-4 h-4"
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
                  </motion.div>
                </motion.button>

                {/* پاسخ */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -20,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 border-t border-gray-700/30">
                        <motion.p
                          className="text-gray-300 leading-relaxed text-justify"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* بخش فرم تماس */}
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600/30"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <motion.svg
                      className="w-8 h-8 text-green-500"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-black text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    پیام شما با موفقیت ارسال شد!
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    کارشناسان ما در کمتر از ۲۴ ساعت کاری با شما تماس خواهند
                    گرفت.
                  </motion.p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-xl font-bold text-white border backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(to right, ${ORANGE_COLOR}, #e66900)`,
                      borderColor: `${ORANGE_COLOR}40`,
                      boxShadow: `0 10px 25px -5px ${ORANGE_COLOR}25`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 15px 30px -5px ${ORANGE_COLOR}35`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ارسال پیام جدید
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <motion.h3
                      className="text-2xl font-black text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      سوال دیگری دارید؟
                    </motion.h3>
                    <motion.p
                      className="text-gray-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      اطلاعات خود را وارد کنید تا کارشناسان ما در اسرع وقت با
                      شما تماس بگیرند.
                    </motion.p>
                  </div>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* نام و نام خانوادگی */}
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2 text-right">
                          نام و نام خانوادگی *
                        </label>
                        <motion.input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                          placeholder="نام خود را وارد کنید"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </motion.div>

                      {/* ایمیل */}
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2 text-right">
                          آدرس ایمیل *
                        </label>
                        <motion.input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                          placeholder="email@example.com"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </motion.div>

                      {/* شماره تماس */}
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2 text-right">
                          شماره تماس *
                        </label>
                        <motion.input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </motion.div>

                      {/* نام شرکت */}
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2 text-right">
                          نام شرکت (اختیاری)
                        </label>
                        <motion.input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                          placeholder="نام شرکت یا کسب‌وکار"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </motion.div>
                    </div>

                    {/* پیام */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2 text-right">
                        سوال یا پیام شما *
                      </label>
                      <motion.textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 resize-none"
                        placeholder="سوال یا درخواست خود را به طور کامل شرح دهید..."
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    {/* دکمه ارسال */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4"
                      variants={itemVariants}
                    >
                      <div className="text-gray-400 text-sm text-right">
                        <p> پاسخگویی در کمتر از ۲۴ ساعت</p>
                        <p> مشاوره رایگان تخصصی</p>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-xl text-lg font-bold text-white border backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        style={{
                          background: `linear-gradient(to right, ${ORANGE_COLOR}, #e66900)`,
                          borderColor: `${ORANGE_COLOR}40`,
                          boxShadow: `0 10px 25px -5px ${ORANGE_COLOR}25`,
                        }}
                        whileHover={{
                          scale: isSubmitting ? 1 : 1.05,
                          boxShadow: isSubmitting
                            ? `0 10px 25px -5px ${ORANGE_COLOR}25`
                            : `0 15px 30px -5px ${ORANGE_COLOR}35`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubmitting ? (
                          <motion.span
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.svg
                              className="w-5 h-5"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </motion.svg>
                            در حال ارسال...
                          </motion.span>
                        ) : (
                          <motion.span
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              animate={{
                                x: [0, 5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <IoSend />
                            </motion.div>
                            ارسال درخواست تماس
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
