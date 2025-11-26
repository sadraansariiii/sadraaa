// utils/getLevel.js

function getLevel(overallScore) {
  if (overallScore >= 90) return "فوق‌العاده";
  if (overallScore >= 80) return "عالی";
  if (overallScore >= 70) return "خیلی خوب";
  if (overallScore >= 60) return "خوب";
  if (overallScore >= 50) return "متوسط رو به بالا";
  if (overallScore >= 40) return "متوسط";
  if (overallScore >= 30) return "متوسط رو به پایین";
  if (overallScore >= 20) return "نسبتاً ضعیف";
  if (overallScore >= 10) return "ضعیف";
  return "خیلی ضعیف";
}

module.exports = { getLevel };
