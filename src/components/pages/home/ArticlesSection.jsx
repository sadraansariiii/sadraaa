// src/components/pages/home/ArticlesSection.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArticlesSection = () => {
  const ORANGE_COLOR = "#ff7300";
  const GREEN_COLOR = "#10b981";

  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const articles = [
    {
      id: 1,
      title: "راهنمای جامع صادرات به بازار اروپا",
      description:
        "آشنایی با قوانین، استانداردها و فرصت‌های صادراتی در بازار پرظرفیت اتحادیه اروپا",
      image: "/images/article1.jpg",
      category: "بازارهای بین‌المللی",
      readTime: "۸ دقیقه",
      date: "۱۴۰۲/۱۰/۱۵",
      author: "تیم تحلیلی صادرپلاس",
    },
    {
      id: 2,
      title: "۵ اشتباه رایج در صادرات",
      description:
        "شناسایی و پیشگیری از خطاهای متداول در فرآیند صادرات برای موفقیت بیشتر",
      image: "/images/article2.jpg",
      category: "تجربه‌های عملی",
      readTime: "۶ دقیقه",
      date: "۱۴۰۲/۱۰/۱۲",
      author: "دکتر محمدی",
    },
    {
      id: 3,
      title: "تحلیل بازار محصولات کشاورزی",
      description:
        "بررسی فرصت‌ها و چالش‌های صادرات محصولات کشاورزی در سال پیش رو",
      image: "/images/article3.jpg",
      category: "تحلیل بازار",
      readTime: "۱۰ دقیقه",
      date: "۱۴۰۲/۱۰/۱۰",
      author: "تیم تحقیقاتی",
    },
    {
      id: 4,
      title: "نقش دیجیتال مارکتینگ در صادرات",
      description: "چگونه با ابزارهای دیجیتال، بازارهای بین‌المللی را فتح کنیم",
      image: "/images/article4.jpg",
      category: "بازاریابی",
      readTime: "۷ دقیقه",
      date: "۱۴۰۲/۱۰/۰۸",
      author: "کارشناس دیجیتال",
    },
    {
      id: 5,
      title: "استانداردهای کیفی برای صادرات",
      description: "آشنایی با الزامات ISO، CE و دیگر استانداردهای بین‌المللی",
      image: "/images/article5.jpg",
      category: "استانداردها",
      readTime: "۹ دقیقه",
      date: "۱۴۰۲/۱۰/۰۵",
      author: "مهندس کیفیت",
    },
    {
      id: 6,
      title: "مدیریت لجستیک در صادرات",
      description: "راهکارهای بهینه‌سازی هزینه و زمان در فرآیند حمل بین‌المللی",
      image: "/images/article6.jpg",
      category: "لجستیک",
      readTime: "۱۱ دقیقه",
      date: "۱۴۰۲/۱۰/۰۳",
      author: "متخصص لجستیک",
    },
    {
      id: 7,
      title: "فاینانس و تأمین مالی صادرات",
      description:
        "شناسایی بهترین روش‌های تأمین مالی برای توسعه فعالیت‌های صادراتی",
      image: "/images/article7.jpg",
      category: "مالی",
      readTime: "۸ دقیقه",
      date: "۱۴۰۲/۱۰/۰۱",
      author: "کارشناس مالی",
    },
    {
      id: 8,
      title: "استراتژی‌های قیمت‌گذاری",
      description:
        "چگونه محصولات خود را در بازارهای بین‌المللی قیمت‌گذاری کنیم",
      image: "/images/article8.jpg",
      category: "بازاریابی",
      readTime: "۷ دقیقه",
      date: "۱۴۰۲/۰۹/۲۸",
      author: "متخصص قیمت‌گذاری",
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
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // تابع برای محدود کردن تعداد کلمات
  const limitWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // محدود کردن تایتل به 5 کلمه و توضیحات به 12 کلمه
  const formattedArticles = articles.map((article) => ({
    ...article,
    title: limitWords(article.title, 5),
    description: limitWords(article.description, 12),
  }));

  const itemsPerPage = 4;
  const totalPages = Math.ceil(formattedArticles.length / itemsPerPage);
  const currentArticles = formattedArticles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      
      {/* المان‌های دکوراتیو پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full"
          style={{ border: `1px solid ${ORANGE_COLOR}15` }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full"
          style={{ border: `1px solid ${GREEN_COLOR}10` }}
          animate={{
            x: [0, 15, 0],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
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
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* هدر بخش مقالات */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            مقالات <span style={{ color: ORANGE_COLOR }}>تخصصی</span> صادرات
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
            جدیدترین مطالب آموزشی و تحلیلی در زمینه تجارت بین‌الملل و صادرات
          </motion.p>
        </motion.div>

        {/* شبکه مقالات */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {currentArticles.map((article, index) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 flex flex-col h-full relative"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                }}
                whileHover="hover"
              >
                {/* تصویر مقاله */}
                <motion.div 
                  className="relative h-48 overflow-hidden flex-shrink-0"
                  whileHover="hover"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
                    variants={imageHoverVariants}
                  >
                    <div className="text-center text-gray-400">
                      <motion.div 
                        className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(255, 115, 0, 0.3)"
                        }}
                      >
                        <span className="text-xl">📝</span>
                      </motion.div>
                      <p className="text-sm">تصویر مقاله</p>
                    </div>
                  </motion.div>

                  {/* overlay روی hover */}
                  <motion.div 
                    className="absolute inset-0 bg-orange-500/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* دسته‌بندی */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(to right, ${ORANGE_COLOR}80, ${GREEN_COLOR}80)`,
                      }}
                    >
                      {article.category}
                    </span>
                  </motion.div>
                </motion.div>

                {/* محتوای مقاله */}
                <div className="p-6 flex flex-col flex-1">
                  {/* عنوان مقاله */}
                  <motion.h3 
                    className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors duration-300 min-h-[3.5rem] flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {article.title}
                  </motion.h3>

                  {/* توضیحات */}
                  <motion.p 
                    className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 min-h-[4.5rem]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {article.description}
                  </motion.p>

                  {/* متادیتا */}
                  <motion.div 
                    className="flex items-center justify-between text-xs text-gray-400 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{article.date}</span>
                    </div>
                  </motion.div>

                  {/* نویسنده و دکمه */}
                  <motion.div 
                    className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-xs text-gray-400">
                      {article.author}
                    </span>
                    {/* دکمه مطالعه بیشتر */}
                    <motion.button 
                      className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center gap-1"
                      whileHover={{ x: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        className="flex items-center gap-1"
                        href={"/articles/1"}
                      >
                        <motion.svg
                          className="w-4 h-4"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
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
                        </motion.svg>
                        مطالعه مقاله
                      </Link>
                    </motion.button>
                  </motion.div>
                </div>

                {/* افکت hover */}
                <motion.div 
                  className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                  initial={{ borderColor: "transparent" }}
                  whileHover={{ 
                    borderColor: "rgba(255, 115, 0, 0.3)",
                    boxShadow: "0 20px 40px rgba(255, 115, 0, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* کنترل‌های صفحه‌بندی */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* دکمه قبلی */}
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700/80 text-white hover:bg-gray-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm border border-gray-600/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-5 h-5"
              initial={{ x: 0 }}
              whileHover={{ x: -3 }}
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
            </motion.svg>
            مقالات قبلی
          </motion.button>

          {/* نشانگر صفحات */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-orange-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: currentPage === index ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: currentPage === index ? Infinity : 0,
                }}
              />
            ))}
          </div>

          {/* دکمه بعدی */}
          <motion.button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700/80 text-white hover:bg-gray-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm border border-gray-600/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            مقالات بعدی
            <motion.svg
              className="w-5 h-5"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
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
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* دکمه مشاهده همه مقالات */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link href={"/articles"}>
            <motion.button
              className="px-8 py-3 rounded-xl text-lg font-bold text-white border backdrop-blur-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${ORANGE_COLOR}, #e66900)`,
                borderColor: `${ORANGE_COLOR}40`,
                boxShadow: `0 20px 25px -5px ${ORANGE_COLOR}25`,
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 25px 50px -12px ${ORANGE_COLOR}35`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">مشاهده همه مقالات</span>
              
              {/* افکت hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;