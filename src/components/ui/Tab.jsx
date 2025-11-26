"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useId } from "react";

const DynamicTabs = ({
  tabs,
  defaultTab = 0,
  onTabChange,
  centered = false,
  fullWidth = false,
  instanceId, // امکان پاس دادن id از خارج
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isMobile, setIsMobile] = useState(false);
  
  // ایجاد id یکتا برای هر instance
  const generatedId = useId();
  const uniqueId = instanceId || `tabs-${generatedId}`;

  // تشخیص ریسپانسیو بودن
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleTabClick = (index, tab) => {
    setActiveTab(index);
    onTabChange?.(index, tabs[index]);

    // فراخوانی onClick مخصوص هر تب اگر وجود داشته باشد
    if (tab.onClick) {
      tab.onClick(index, tab);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tab Headers */}
      <motion.div
        className={`
          flex  gap-4
          ${centered ? "justify-center" : ""}
          ${isMobile ? "overflow-x-auto scrollbar-hide" : "flex-wrap"}
          h-16 mb-10
          ${isMobile ? "space-x-1" : ""}
        `}
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id || index}
            variants={tabVariants}
            onClick={() => handleTabClick(index, tab)}
            className={`
              relative 
              px-4 py-3 
              text-sm font-medium 
              transition-all duration-200 
              whitespace-nowrap
              flex items-center justify-center
              ${fullWidth ? "flex-1 text-center" : ""}
              ${isMobile ? "min-w-max flex-shrink-0" : ""}
              ${
                activeTab === index
                  ? `text-[var(--orgin-color)]`
                  : `text-gray-400 hover:text-gray-50`
              }
            `}
            whileTap={{ scale: 0.98 }}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span className={isMobile && tab.icon ? "hidden" : "block"}>
              {tab.label}
            </span>

            {activeTab === index && (
              <motion.div
                layoutId={`activeTab-${uniqueId}`} // استفاده از id یکتا
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--orgin-color)]"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}

            {tab.badge && (
              <span
                className={`
                  ml-2 px-2 py-1 text-xs rounded-full
                  ${isMobile ? "hidden" : "block"}
                  ${
                    activeTab === index
                      ? "bg-[var(--orgin-color)] text-white"
                      : "text-[var(--text-color)]"
                  }
                `}
              >
                {tab.badge}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="h-[calc(100%-104px)] overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full h-full `}
          >
            {tabs[activeTab]?.content || tabs[activeTab]?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DynamicTabs;