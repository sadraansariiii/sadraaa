// components/LoadingScreen.jsx
"use client";

import { motion } from "framer-motion";

const LoadingScreen = ({ backdrop =true }) => {
  const ORANGE_COLOR = "#ff7300";
  const GREEN_COLOR = "#10b981";

  // اگر backdrop غیرفعال باشد، فقط محتوای بارگذاری را نشان می‌دهد
  if (!backdrop) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          {/* توپ چرخشی */}
          <motion.div
            className="mb-4"
            initial={{ y: -100, scale: 0, rotate: -180 }}
            animate={{ y: 0, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-full mx-auto mb-2 relative"
              style={{
                background: `linear-gradient(135deg, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* خطوط روی توپ برای نشان دادن چرخش */}
              <div className="absolute inset-2 rounded-full border-2 border-white/30"></div>
              <div className="absolute inset-4 rounded-full border-2 border-white/20"></div>
            </motion.div>
          </motion.div>

          {/* متن */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              EXPOT
            </h2>
            <p className="text-gray-600 text-xs">
              در حال بارگذاری...
            </p>
          </motion.div>

          {/* دانه‌های بارگذاری */}
          <motion.div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  // نسخه اصلی با backdrop
  const ballVariants = {
    initial: {
      y: -100,
      scale: 0,
      rotate: -180
    },
    animate: {
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  };

  // انیمیشن چرخش توپ
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // انیمیشن پرش دانه‌ها
  const dotVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* توپ چرخشی */}
        <motion.div
          className="mb-8"
          variants={ballVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="w-16 h-16 rounded-full mx-auto mb-4 relative"
            style={{
              background: `linear-gradient(135deg, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
            }}
            variants={spinVariants}
            animate="animate"
          >
            {/* خطوط روی توپ برای نشان دادن چرخش */}
            <div className="absolute inset-2 rounded-full border-2 border-white/30"></div>
            <div className="absolute inset-4 rounded-full border-2 border-white/20"></div>
          </motion.div>
        </motion.div>

        {/* متن */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            EXPOT
          </h2>
          <p className="text-gray-400 text-sm">
            در حال بارگذاری...
          </p>
        </motion.div>

        {/* دانه‌های بارگذاری */}
        <motion.div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-500"
              custom={i}
              variants={dotVariants}
              animate="animate"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;