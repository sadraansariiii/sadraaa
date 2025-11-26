export const formatDateFa = (timestamp, options = {}) => {
  if (!timestamp) return "-";

  const {
    includeTime = false,
    shortFormat = false,
    mode = "relative", // "relative" | "simple"
  } = options;

  // تبدیل timestamp به میلی‌ثانیه
  const ts = String(timestamp).length === 10 ? timestamp * 1000 : timestamp;
  const date = new Date(Number(ts));

  // حالت ساده (simple)
  if (mode === "simple") {
    return formatPersianDate(date, includeTime, shortFormat);
  }

  // حالت نسبی (relative)
  const now = new Date();
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  // اگر تاریخ در آینده باشد
  if (diffInMs < 0) {
    const futureDiff = Math.abs(diffInMs);
    const futureDays = Math.floor(futureDiff / (1000 * 60 * 60 * 24));

    if (futureDays < 1) {
      return "به زودی";
    } else if (futureDays < 7) {
      return `${futureDays} روز بعد`;
    } else {
      return formatPersianDate(date, includeTime, shortFormat);
    }
  }

  // نمایش زمان نسبی
  if (diffInSeconds < 5) {
    return "همین الان";
  } else if (diffInSeconds < 60) {
    return `${diffInSeconds} ثانیه پیش`;
  } else if (diffInMinutes < 60) {
    return shortFormat
      ? `${diffInMinutes} دقیقه`
      : `${diffInMinutes} دقیقه پیش`;
  } else if (diffInHours < 24) {
    return shortFormat ? `${diffInHours} ساعت` : `${diffInHours} ساعت پیش`;
  } else if (diffInDays < 7) {
    return shortFormat ? `${diffInDays} روز` : `${diffInDays} روز پیش`;
  } else if (diffInWeeks < 4) {
    return shortFormat ? `${diffInWeeks} هفته` : `${diffInWeeks} هفته پیش`;
  } else {
    // بیش از یک ماه - نمایش تاریخ شمسی کامل
    return formatPersianDate(date, includeTime, shortFormat);
  }
};

// تابع کمکی برای فرمت‌بندی تاریخ شمسی
const formatPersianDate = (date, includeTime = false, shortFormat = false) => {
  const options = {
    year: "numeric",
    month: shortFormat ? "2-digit" : "long",
    day: "2-digit",
  };

  let dateString = date.toLocaleDateString("fa-IR", options);

  if (includeTime) {
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const timeString = date.toLocaleTimeString("fa-IR", timeOptions);
    dateString += ` - ${timeString}`;
  }

  return dateString;
};

/* -------------------------------------------------------
 نحوه استفاده از تابع formatDateFa :

 حالت نسبی (پیش‌فرض):
--------------------------------
formatDateFa(1731234567);
//  خروجی: "۲ روز پیش"  یا  "همین الان"  یا  "۳ هفته پیش"

 حالت ساده (تاریخ شمسی کامل):
--------------------------------
formatDateFa(1731234567, { mode: "simple" });
//  خروجی: "۱۴۰۴ آبان ۱۸"

 حالت ساده با زمان:
--------------------------------
formatDateFa(1731234567, { mode: "simple", includeTime: true });
//  خروجی: "۱۴۰۴ آبان ۱۸ - ۱۴:۳۰"

 حالت ساده با فرمت کوتاه (عددی):
--------------------------------
formatDateFa(1731234567, { mode: "simple", shortFormat: true });
//  خروجی: "۱۴۰۴/۰۸/۱۸"

 نکته:
در JSX استفاده کن مثل زیر 

<span>{formatDateFa(item.date, { mode: "simple" })}</span>
------------------------------------------------------- */
