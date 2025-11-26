"use client";

import { useState } from "react";
import {
  FiSettings,
  FiUser,
  FiBell,
  FiLock,
  FiEye,
  FiGlobe,
  FiMoon,
  FiSun,
  FiSave,
  FiRefreshCw,
  FiTrash2,
  FiDownload,
  FiUpload,
  FiShield,
  FiDatabase,
  FiHardDrive,
  FiWifi,
  FiHelpCircle,
  FiMail,
  FiAlertCircle,
  FiBarChart2,
  FiTrendingUp,
  FiSearch,
  FiActivity,
  FiZap,
  FiAlertTriangle,
} from "react-icons/fi";

import Alert from "@/src/components/layout/Alert";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

const SettingsPage = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState({
    general: false,
    notifications: false,
    privacy: false,
    appearance: false,
    advanced: false,
  });

  // تنظیمات عمومی
  const [generalSettings, setGeneralSettings] = useState({
    language: "fa",
    timezone: "Asia/Tehran",
    dateFormat: "jalali",
    timeFormat: "24h",
    autoSave: true,
    autoBackup: true,
  });

  // تنظیمات اعلانات
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assessmentReminders: true,
    deadlineAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
    securityAlerts: true,
  });

  // تنظیمات حریم خصوصی
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    dataSharing: false,
    analytics: true,
    searchIndexing: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
  });

  // تنظیمات ظاهری
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "medium",
    density: "comfortable",
    sidebarPosition: "right",
    animation: true,
    highContrast: false,
  });

  // تنظیمات پیشرفته
  const [advancedSettings, setAdvancedSettings] = useState({
    cacheSize: "500",
    autoCleanup: true,
    debugMode: false,
    performanceMode: false,
    apiCalls: true,
    errorReporting: true,
  });

  const handleGeneralChange = (field, value) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdvancedChange = (field, value) => {
    setAdvancedSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAllSettings = async () => {
    setLoading((prev) => ({
      ...prev,
      general: true,
      notifications: true,
      privacy: true,
      appearance: true,
      advanced: true,
    }));

    setTimeout(() => {
      setAlert({
        message: "تمام تنظیمات با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading({
        general: false,
        notifications: false,
        privacy: false,
        appearance: false,
        advanced: false,
      });
    }, 1500);
  };

  const handleSaveGeneral = async () => {
    setLoading((prev) => ({ ...prev, general: true }));

    setTimeout(() => {
      setAlert({
        message: "تنظیمات عمومی با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading((prev) => ({ ...prev, general: false }));
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading((prev) => ({ ...prev, notifications: true }));

    setTimeout(() => {
      setAlert({
        message: "تنظیمات اعلانات با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading((prev) => ({ ...prev, notifications: false }));
    }, 1000);
  };

  const handleSavePrivacy = async () => {
    setLoading((prev) => ({ ...prev, privacy: true }));

    setTimeout(() => {
      setAlert({
        message: "تنظیمات حریم خصوصی با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading((prev) => ({ ...prev, privacy: false }));
    }, 1000);
  };

  const handleSaveAppearance = async () => {
    setLoading((prev) => ({ ...prev, appearance: true }));

    setTimeout(() => {
      setAlert({
        message: "تنظیمات ظاهر با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading((prev) => ({ ...prev, appearance: false }));
    }, 1000);
  };

  const handleSaveAdvanced = async () => {
    setLoading((prev) => ({ ...prev, advanced: true }));

    setTimeout(() => {
      setAlert({
        message: "تنظیمات پیشرفته با موفقیت ذخیره شد",
        type: "success",
        visible: true,
      });
      setLoading((prev) => ({ ...prev, advanced: false }));
    }, 1000);
  };



  const handleClearCache = () => {
    setAlert({
      message: "حافظه کش با موفقیت پاک شد",
      type: "success",
      visible: true,
    });
  };

  return (
    <AccessGuard>
      <DashboardSection>
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* سایدبار تنظیمات */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <GlassCard className="h-full overflow-auto">
              {/* اطلاعات کاربر */}
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white text-center mb-1">
                  تنظیمات سیستم
                </h2>
                <p className="text-white/80 text-sm text-center">
                  مدیریت تنظیمات حساب کاربری
                </p>
              </div>

              {/* منو */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === "general"
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span className="text-sm md:text-base">تنظیمات عمومی</span>
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === "notifications"
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiBell className="text-lg" />
                  <span className="text-sm md:text-base">اعلانات</span>
                </button>

                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === "privacy"
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiShield className="text-lg" />
                  <span className="text-sm md:text-base">
                    حریم خصوصی و امنیت
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === "appearance"
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiEye className="text-lg" />
                  <span className="text-sm md:text-base">ظاهر و نمایش</span>
                </button>

                <button
                  onClick={() => setActiveTab("advanced")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === "advanced"
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiHardDrive className="text-lg" />
                  <span className="text-sm md:text-base">پیشرفته</span>
                </button>
              </div>
            </GlassCard>
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1 min-h-0">
            <div className="h-full flex flex-col">
              {/* هدر */}
              <GlassCard className="mb-6">
                <div className="flex flex-col">
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {activeTab === "general" && "تنظیمات عمومی"}
                    {activeTab === "notifications" && "تنظیمات اعلانات"}
                    {activeTab === "privacy" && "حریم خصوصی و امنیت"}
                    {activeTab === "appearance" && "ظاهر و نمایش"}
                    {activeTab === "advanced" && "تنظیمات پیشرفته"}
                  </h1>
                  <p className="text-white/80 text-sm">
                    {activeTab === "general" && "مدیریت تنظیمات اصلی سیستم"}
                    {activeTab === "notifications" && "کنترل اعلانات و هشدارها"}
                    {activeTab === "privacy" && "تنظیمات امنیتی و حریم خصوصی"}
                    {activeTab === "appearance" && "شخصی‌سازی ظاهر برنامه"}
                    {activeTab === "advanced" && "تنظیمات پیشرفته سیستم"}
                  </p>
                </div>
              </GlassCard>

              {/* محتوای تب‌ها */}
              <div className="flex-1 overflow-auto space-y-6">
                {/* تب تنظیمات عمومی */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <GlassCard>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            زبان
                          </label>
                          <Input
                            type="select"
                            value={generalSettings.language}
                            onChange={(e) =>
                              handleGeneralChange("language", e.target.value)
                            }
                            options={[
                              { value: "fa", label: "فارسی" },
                              { value: "en", label: "English" },
                              { value: "ar", label: "العربیة" },
                            ]}
                            placeholder="انتخاب زبان"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            منطقه زمانی
                          </label>
                          <Input
                            type="select"
                            value={generalSettings.timezone}
                            onChange={(e) =>
                              handleGeneralChange("timezone", e.target.value)
                            }
                            options={[
                              {
                                value: "Asia/Tehran",
                                label: "تهران (UTC+3:30)",
                              },
                              { value: "UTC", label: "UTC" },
                              { value: "Europe/London", label: "لندن (UTC+0)" },
                            ]}
                            placeholder="انتخاب منطقه زمانی"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            فرمت تاریخ
                          </label>
                          <Input
                            type="select"
                            value={generalSettings.dateFormat}
                            onChange={(e) =>
                              handleGeneralChange("dateFormat", e.target.value)
                            }
                            options={[
                              { value: "jalali", label: "شمسی (۱۴۰۳/۰۱/۰۱)" },
                              {
                                value: "gregorian",
                                label: "میلادی (2024/01/01)",
                              },
                            ]}
                            placeholder="انتخاب فرمت تاریخ"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            فرمت زمان
                          </label>
                          <Input
                            type="select"
                            value={generalSettings.timeFormat}
                            onChange={(e) =>
                              handleGeneralChange("timeFormat", e.target.value)
                            }
                            options={[
                              { value: "24h", label: "۲۴ ساعته (۱۴:۳۰)" },
                              { value: "12h", label: "۱۲ ساعته (۲:۳۰ ب.ظ)" },
                            ]}
                            placeholder="انتخاب فرمت زمان"
                          />
                        </div>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        تنظیمات ذخیره‌سازی
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiDatabase className="text-blue-300" />
                            <div>
                              <div className="text-white font-medium">
                                ذخیره‌سازی خودکار
                              </div>
                              <div className="text-white/70 text-sm">
                                ذخیره‌سازی خودکار تغییرات هر ۵ دقیقه
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={generalSettings.autoSave}
                            onChange={(e) =>
                              handleGeneralChange("autoSave", e.target.checked)
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiHardDrive className="text-green-300" />
                            <div>
                              <div className="text-white font-medium">
                                پشتیبان‌گیری خودکار
                              </div>
                              <div className="text-white/70 text-sm">
                                ایجاد پشتیبان روزانه از داده‌ها
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={generalSettings.autoBackup}
                            onChange={(e) =>
                              handleGeneralChange(
                                "autoBackup",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      {/* دکمه ذخیره برای تنظیمات عمومی */}
                      <div>
                        <Button
                          icon={<FiSave className="text-sm" />}
                          label="ذخیره تنظیمات عمومی"
                          onClick={handleSaveGeneral}
                          disabled={loading.general}
                          className={"h-14"}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* تب تنظیمات اعلانات */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        کانال‌های اطلاع‌رسانی
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiMail className="text-blue-300" />
                            <div>
                              <div className="text-white font-medium">
                                اعلانات ایمیلی
                              </div>
                              <div className="text-white/70 text-sm">
                                دریافت اعلانات از طریق ایمیل
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={(e) =>
                              handleNotificationChange(
                                "emailNotifications",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiBell className="text-orange-300" />
                            <div>
                              <div className="text-white font-medium">
                                اعلانات فوری
                              </div>
                              <div className="text-white/70 text-sm">
                                نمایش اعلانات فوری در مرورگر
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.pushNotifications}
                            onChange={(e) =>
                              handleNotificationChange(
                                "pushNotifications",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        انواع اعلانات
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiRefreshCw className="text-green-300" />
                            <div>
                              <div className="text-white font-medium">
                                یادآوری ارزیابی
                              </div>
                              <div className="text-white/70 text-sm">
                                یادآوری ارزیابی‌های در حال انجام
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.assessmentReminders}
                            onChange={(e) =>
                              handleNotificationChange(
                                "assessmentReminders",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiAlertCircle className="text-red-300" />
                            <div>
                              <div className="text-white font-medium">
                                هشدار مهلت‌ها
                              </div>
                              <div className="text-white/70 text-sm">
                                هشدار برای مهلت‌های نزدیک
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.deadlineAlerts}
                            onChange={(e) =>
                              handleNotificationChange(
                                "deadlineAlerts",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiBarChart2 className="text-purple-300" />
                            <div>
                              <div className="text-white font-medium">
                                گزارش هفتگی
                              </div>
                              <div className="text-white/70 text-sm">
                                ارسال گزارش عملکرد هفتگی
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.weeklyReports}
                            onChange={(e) =>
                              handleNotificationChange(
                                "weeklyReports",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiTrendingUp className="text-teal-300" />
                            <div>
                              <div className="text-white font-medium">
                                گزارش ماهانه
                              </div>
                              <div className="text-white/70 text-sm">
                                ارسال گزارش جامع ماهانه
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.monthlyReports}
                            onChange={(e) =>
                              handleNotificationChange(
                                "monthlyReports",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiShield className="text-yellow-300" />
                            <div>
                              <div className="text-white font-medium">
                                هشدارهای امنیتی
                              </div>
                              <div className="text-white/70 text-sm">
                                هشدار برای فعالیت‌های غیرعادی
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.securityAlerts}
                            onChange={(e) =>
                              handleNotificationChange(
                                "securityAlerts",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      {/* دکمه ذخیره برای اعلانات */}
                      <div>
                        <Button
                          icon={<FiSave className="text-sm" />}
                          label="ذخیره تنظیمات اعلانات"
                          onClick={handleSaveNotifications}
                          disabled={loading.notifications}
                          className={"h-14"}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* تب حریم خصوصی و امنیت */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        تنظیمات حریم خصوصی
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            نمایش پروفایل
                          </label>
                          <Input
                            type="select"
                            value={privacySettings.profileVisibility}
                            onChange={(e) =>
                              handlePrivacyChange(
                                "profileVisibility",
                                e.target.value
                              )
                            }
                            options={[
                              { value: "private", label: "خصوصی" },
                              { value: "public", label: "عمومی" },
                              { value: "contacts", label: "فقط مخاطبین" },
                            ]}
                            placeholder="انتخاب سطح نمایش"
                          />
                        </div>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiDatabase className="text-blue-300" />
                            <div>
                              <div className="text-white font-medium">
                                اشتراک‌گذاری داده
                              </div>
                              <div className="text-white/70 text-sm">
                                اشتراک‌گذاری داده‌های ناشناس برای بهبود سرویس
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.dataSharing}
                            onChange={(e) =>
                              handlePrivacyChange(
                                "dataSharing",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiBarChart2 className="text-green-300" />
                            <div>
                              <div className="text-white font-medium">
                                تحلیل و آمار
                              </div>
                              <div className="text-white/70 text-sm">
                                جمع‌آوری آمار استفاده برای بهبود عملکرد
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.analytics}
                            onChange={(e) =>
                              handlePrivacyChange("analytics", e.target.checked)
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiSearch className="text-purple-300" />
                            <div>
                              <div className="text-white font-medium">
                                نمایش در نتایج جستجو
                              </div>
                              <div className="text-white/70 text-sm">
                                اجازه نمایه‌سازی توسط موتورهای جستجو
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.searchIndexing}
                            onChange={(e) =>
                              handlePrivacyChange(
                                "searchIndexing",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        امنیت
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiLock className="text-red-300" />
                            <div>
                              <div className="text-white font-medium">
                                احراز هویت دو مرحله‌ای
                              </div>
                              <div className="text-white/70 text-sm">
                                افزایش امنیت حساب با کد یکبار مصرف
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.twoFactorAuth}
                            onChange={(e) =>
                              handlePrivacyChange(
                                "twoFactorAuth",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            مدت زمان عدم فعالیت
                          </label>
                          <Input
                            type="select"
                            value={privacySettings.sessionTimeout}
                            onChange={(e) =>
                              handlePrivacyChange(
                                "sessionTimeout",
                                e.target.value
                              )
                            }
                            options={[
                              { value: 15, label: "۱۵ دقیقه" },
                              { value: 30, label: "۳۰ دقیقه" },
                              { value: 60, label: "۱ ساعت" },
                              { value: 120, label: "۲ ساعت" },
                            ]}
                            placeholder="انتخاب مدت زمان"
                          />
                        </div>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      {/* دکمه ذخیره برای حریم خصوصی */}
                      <div>
                        <Button
                          icon={<FiSave className="text-sm" />}
                          label="ذخیره تنظیمات حریم خصوصی"
                          onClick={handleSavePrivacy}
                          disabled={loading.privacy}
                          className={"h-14"}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* تب ظاهر و نمایش */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <GlassCard>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            تم
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() =>
                                handleAppearanceChange("theme", "light")
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                appearanceSettings.theme === "light"
                                  ? "border-[var(--orgin-color)] bg-[var(--orgin-color)]/20"
                                  : "border-white/20 bg-white/5 hover:border-white/40"
                              }`}
                            >
                              <div className="flex items-center gap-2 justify-center">
                                <FiSun className="text-yellow-300" />
                                <span className="text-white text-sm font-medium">
                                  روشن
                                </span>
                              </div>
                            </button>
                            <button
                              onClick={() =>
                                handleAppearanceChange("theme", "dark")
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                appearanceSettings.theme === "dark"
                                  ? "border-[var(--orgin-color)] bg-[var(--orgin-color)]/20"
                                  : "border-white/20 bg-white/5 hover:border-white/40"
                              }`}
                            >
                              <div className="flex items-center gap-2 justify-center">
                                <FiMoon className="text-indigo-300" />
                                <span className="text-white text-sm font-medium">
                                  تیره
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            اندازه فونت
                          </label>
                          <Input
                            type="select"
                            value={appearanceSettings.fontSize}
                            onChange={(e) =>
                              handleAppearanceChange("fontSize", e.target.value)
                            }
                            options={[
                              { value: "small", label: "کوچک" },
                              { value: "medium", label: "متوسط" },
                              { value: "large", label: "بزرگ" },
                            ]}
                            placeholder="انتخاب اندازه فونت"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            تراکم نمایش
                          </label>
                          <Input
                            type="select"
                            value={appearanceSettings.density}
                            onChange={(e) =>
                              handleAppearanceChange("density", e.target.value)
                            }
                            options={[
                              { value: "compact", label: "فشرده" },
                              { value: "comfortable", label: "استاندارد" },
                              { value: "spacious", label: "گسترده" },
                            ]}
                            placeholder="انتخاب تراکم نمایش"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            موقعیت نوار کناری
                          </label>
                          <Input
                            type="select"
                            value={appearanceSettings.sidebarPosition}
                            onChange={(e) =>
                              handleAppearanceChange(
                                "sidebarPosition",
                                e.target.value
                              )
                            }
                            options={[
                              { value: "right", label: "راست" },
                              { value: "left", label: "چپ" },
                            ]}
                            placeholder="انتخاب موقعیت نوار کناری"
                          />
                        </div>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        تنظیمات نمایش
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiActivity className="text-purple-300" />
                            <div>
                              <div className="text-white font-medium">
                                انیمیشن‌ها
                              </div>
                              <div className="text-white/70 text-sm">
                                فعال‌سازی انیمیشن‌های رابط کاربری
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={appearanceSettings.animation}
                            onChange={(e) =>
                              handleAppearanceChange(
                                "animation",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiEye className="text-orange-300" />
                            <div>
                              <div className="text-white font-medium">
                                کنتراست بالا
                              </div>
                              <div className="text-white/70 text-sm">
                                افزایش کنتراست برای خوانایی بهتر
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={appearanceSettings.highContrast}
                            onChange={(e) =>
                              handleAppearanceChange(
                                "highContrast",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      {/* دکمه ذخیره برای ظاهر */}
                      <div>
                        <Button
                          icon={<FiSave className="text-sm" />}
                          label="ذخیره تنظیمات ظاهر"
                          onClick={handleSaveAppearance}
                          disabled={loading.appearance}
                          className={"h-14"}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* تب تنظیمات پیشرفته */}
                {activeTab === "advanced" && (
                  <div className="space-y-6">
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        مدیریت حافظه
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            حجم حافظه کش (MB)
                          </label>
                          <Input
                            type="select"
                            value={advancedSettings.cacheSize}
                            onChange={(e) =>
                              handleAdvancedChange("cacheSize", e.target.value)
                            }
                            options={[
                              { value: "100", label: "۱۰۰ مگابایت" },
                              { value: "500", label: "۵۰۰ مگابایت" },
                              { value: "1000", label: "۱ گیگابایت" },
                            ]}
                            placeholder="انتخاب حجم حافظه کش"
                          />
                        </div>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiTrash2 className="text-red-300" />
                            <div>
                              <div className="text-white font-medium">
                                پاک‌سازی خودکار کش
                              </div>
                              <div className="text-white/70 text-sm">
                                پاک‌سازی خودکار حافظه کش هر ۷ روز
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={advancedSettings.autoCleanup}
                            onChange={(e) =>
                              handleAdvancedChange(
                                "autoCleanup",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <Button
                          icon={<FiTrash2 className="text-sm" />}
                          label="پاک‌سازی حافظه کش"
                          onClick={handleClearCache}
                          type={2}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        />
                      </div>
                    </GlassCard>
                    <GlassCard>
                      <h3 className="text-lg font-bold text-white mb-4">
                        تنظیمات توسعه
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiHelpCircle className="text-yellow-300" />
                            <div>
                              <div className="text-white font-medium">
                                حالت دیباگ
                              </div>
                              <div className="text-white/70 text-sm">
                                فعال‌سازی لاگ‌های خطایابی
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={advancedSettings.debugMode}
                            onChange={(e) =>
                              handleAdvancedChange(
                                "debugMode",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiZap className="text-green-300" />
                            <div>
                              <div className="text-white font-medium">
                                حالت عملکرد بالا
                              </div>
                              <div className="text-white/70 text-sm">
                                بهینه‌سازی برای سرعت بیشتر (مصرف باتری بیشتر)
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={advancedSettings.performanceMode}
                            onChange={(e) =>
                              handleAdvancedChange(
                                "performanceMode",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiWifi className="text-blue-300" />
                            <div>
                              <div className="text-white font-medium">
                                فراخوانی‌های API
                              </div>
                              <div className="text-white/70 text-sm">
                                اجازه فراخوانی API به سرویس‌های خارجی
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={advancedSettings.apiCalls}
                            onChange={(e) =>
                              handleAdvancedChange("apiCalls", e.target.checked)
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <FiAlertTriangle className="text-orange-300" />
                            <div>
                              <div className="text-white font-medium">
                                گزارش خطا
                              </div>
                              <div className="text-white/70 text-sm">
                                ارسال خودکار گزارش خطاها برای بهبود سرویس
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={advancedSettings.errorReporting}
                            onChange={(e) =>
                              handleAdvancedChange(
                                "errorReporting",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </GlassCard>
                    <GlassCard>
                      {/* دکمه ذخیره برای پیشرفته */}
                      <div>
                        <Button
                          icon={<FiSave className="text-sm" />}
                          label="ذخیره تنظیمات پیشرفته"
                          onClick={handleSaveAdvanced}
                          disabled={loading.advanced}
                          className={"h-14"}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            isVisible={alert.visible}
            duration={3000}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
        )}
      </DashboardSection>
    </AccessGuard>
  );
};

export default SettingsPage;
