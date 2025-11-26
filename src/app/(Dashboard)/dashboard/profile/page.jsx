"use client";

import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiEdit2,
  FiSave,
  FiX,
  FiLock,
  FiList,
  FiGlobe,
  FiMapPin,
  FiUsers,
  FiAward,
  FiCalendar,
  FiShield,
  FiCamera,
  FiVideo,
} from "react-icons/fi";
import {
  FaRegBuilding,
  FaLinkedin,
  FaTwitter,
  FaIndustry,
  FaCity,
  FaSeedling,
  FaRocket,
  FaCode,
  FaCloud,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";

import Alert from "@/src/components/layout/Alert";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Profile from "@/public/img/user.jpeg";
import Image from "next/image";
import GlassCard from "@/src/components/layout/glassCard";
import useFormHandler from "@/src/hooks/useFormHandler";
import BaseUrl from "@/src/utils/baseUrl";
import { useSessionStore } from "@/src/store/sessionStore";
import { ImSpinner2 } from "react-icons/im";
import AccessGuard from "@/src/components/AccessGuard";
import { useNameStore } from "@/src/store/userNameStore";
import { decodeUnicodeDeep } from "@/src/utils/decodeUnicode";

const ProfilePage = () => {
  const { clientId, token } = useSessionStore();
  const { userName } = useNameStore();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(Profile);

  const { formData, handleChange, setFormData } = useFormHandler({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [loadingButton, setLoadingButton] = useState({
    resetPass: false,
  });

  // reset passWord
  const changePassword = async () => {
    if (formData.new_password.length <= 8) {
      setAlert({
        message: "رمز عبور باید حداقل ۹ کاراکتر باشد",
        type: "error",
        visible: true,
      });
      return;
    } else if (formData.new_password !== formData.confirm_new_password) {
      setAlert({
        message: "رمز عبور جدید و تکرار آن برابر نیستند!",
        type: "error",
        visible: true,
      });
      return;
    } else {
      try {
        setLoadingButton(() => ({ resetPass: true }));
        const changePasswordRes = await fetch(
          BaseUrl("/account/account/password/change"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              old_password: formData.old_password,
              new_password: formData.new_password,
              appId: clientId,
              token: token,
            }),
          }
        );
        const data = await changePasswordRes.json();
        if (data.done) {
          setLoadingButton(() => ({ resetPass: false }));
          setAlert({
            message: "رمز عبور با موفقیت تغییر یافت",
            type: "success",
            visible: true,
          });
          return;
        }
      } catch (error) {
        setLoadingButton(() => ({ resetPass: false }));
        console.error(error);
      }
    }
  };

  // داده‌های پروفایل از API
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    username: "",
    about: {
      coname: "",
      coemail: "",
      cophone: "",
      rabet_phone: "",
      address: "",
      website: "",
      postcode: "",
      r_number: "",
      c_number: "",
    },
    links: {
      instagram: "",
      telegram: "",
      whatsapp: "",
      aparat: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      tiktok: "",
      youtube: "",
    },
    context: [],
  });

  // آمارهای کاربر
  const [userStats] = useState({
    totalAssessments: 15,
    completedAssessments: 11,
    inProgressAssessments: 3,
    pendingAssessments: 1,
    successRate: 87,
    averageScore: 79,
    memberSince: "۱۴۰۲/۰۵/۲۰",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setAlert({
          message: "تصویر پروفایل با موفقیت تغییر کرد",
          type: "success",
          visible: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ____________________________________________________________
  // گرفتن پروفایل
  useEffect(() => {
    if (!clientId || !token || !userName) return;

    const getProfile = async () => {
      try {
        const profileRes = await fetch(BaseUrl("/account/profile"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            username: userName.username,
          }),
        });
        const data = await profileRes.json();
        if (data.done && data.data) {
          const decodedData = decodeUnicodeDeep(data.data);
          setProfileData(decodedData);
          setEditFormData({
            name: decodedData.name || "",
            username: decodedData.username || "",
            about: {
              coname: decodedData.about?.coname || "",
              coemail: decodedData.about?.coemail || "",
              cophone: decodedData.about?.cophone || "",
              rabet_phone: decodedData.about?.rabet_phone || "",
              address: decodedData.about?.address || "",
              website: decodedData.about?.website || "",
              postcode: decodedData.about?.postcode || "",
              r_number: decodedData.about?.r_number || "",
              c_number: decodedData.about?.c_number || "",
            },
            links: {
              instagram: decodedData.links?.instagram || "",
              telegram: decodedData.links?.telegram || "",
              whatsapp: decodedData.links?.whatsapp || "",
              aparat: decodedData.links?.aparat || "",
              twitter: decodedData.links?.twitter || "",
              linkedin: decodedData.links?.linkedin || "",
              facebook: decodedData.links?.facebook || "",
              tiktok: decodedData.links?.tiktok || "",
              youtube: decodedData.links?.youtube || "",
            },
            context: decodedData.context || [],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, [clientId, token, userName]);

  // تابع برای ویرایش پروفایل
  const handleEditProfile = async () => {
    if (!clientId || !token) return;

    try {
      const updateRes = await fetch(BaseUrl("/account/update"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          name: editFormData.name,
          about: editFormData.about,
          links: editFormData.links,
          context: editFormData.context,
        }),
      });
      const data = await updateRes.json();
      if (data.done) {
        setAlert({
          message: "پروفایل با موفقیت به‌روزرسانی شد",
          type: "success",
          visible: true,
        });
        setIsEditing(false);
        // ریلود داده‌ها
        const profileRes = await fetch(BaseUrl("/account/profile"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            username: userName.username,
          }),
        });
        const profileData = await profileRes.json();
        if (profileData.done && profileData.data) {
          const decodedData = decodeUnicodeDeep(profileData.data);
          setProfileData(decodedData);
        }
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "خطا در به‌روزرسانی پروفایل",
        type: "error",
        visible: true,
      });
    }
  };

  // تابع برای مدیریت تغییرات فرم ویرایش - نسخه اصلاح شده
  const handleEditChange = (section, field, value) => {
    setEditFormData((prev) => {
      if (section === "about" || section === "links") {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  // تابع ساده‌تر برای تغییر فیلدهای about
  const handleAboutChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  // تابع ساده‌تر برای تغییر فیلدهای links
  const handleLinksChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [field]: value,
      },
    }));
  };

  // تابع برای مدیریت تغییر زمینه‌های فعالیت
  const handleContextChange = (index, value) => {
    const newContext = [...editFormData.context];
    newContext[index] = value;
    setEditFormData((prev) => ({
      ...prev,
      context: newContext,
    }));
  };

  // تابع برای افزودن زمینه فعالیت جدید
  const addContextField = () => {
    setEditFormData((prev) => ({
      ...prev,
      context: [...prev.context, ""],
    }));
  };

  // تابع برای حذف زمینه فعالیت
  const removeContextField = (index) => {
    const newContext = editFormData.context.filter((_, i) => i !== index);
    setEditFormData((prev) => ({
      ...prev,
      context: newContext,
    }));
  };

  // کامپوننت برای نمایش آیکون شبکه‌های اجتماعی
  const SocialIcon = ({ platform }) => {
    const icons = {
      instagram: <FaInstagram className="text-pink-500" />,
      telegram: <FaTelegram className="text-blue-400" />,
      whatsapp: <FaWhatsapp className="text-green-500" />,
      aparat: <FaPlayCircle className="text-red-500" />,
      twitter: <FaTwitter className="text-blue-400" />,
      linkedin: <FaLinkedin className="text-blue-600" />,
      facebook: <FaTwitter className="text-blue-600" />,
      tiktok: <FaTiktok className="text-black" />,
      youtube: <FaYoutube className="text-red-600" />,
    };
    return icons[platform] || <FiGlobe />;
  };

  // گرفتن پروفایل
  // ____________________________________________________________

  return (
    <AccessGuard>
      <DashboardSection>
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 md:gap-4">
          {/* سایدبار پروفایل */}
          <div className="w-full h-full lg:w-80 xl:w-96 flex-shrink-0">
            <GlassCard>
              <div className="w-full h-full flex flex-col items-center gap-6">
                {/* تصویر پروفایل */}
                <div className="relative group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-lg">
                    <Image
                      src={profileImage}
                      className="object-cover w-full h-full"
                      alt="Profile"
                      width={128}
                      height={128}
                    />
                  </div>
                  <label className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer border-2 border-white">
                    <FiCamera className="text-white text-sm md:text-base" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* اطلاعات کاربر */}
                <div className="w-full flex flex-col items-center text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {profileData?.about?.coname ||
                      profileData?.name ||
                      "نام کاربر"}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mb-1">
                    @{profileData?.username}
                  </p>
                  <p className="text-white/60 text-xs md:text-sm">
                    {profileData?.about?.coname || "شرکت"}
                  </p>
                
                </div>

                {/* آمار کاربر */}
                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="bg-[var(--orgin-color)]/20 backdrop-blur-sm rounded-xl p-3 text-center border border-[var(--orgin-color)]/30 ">
                    <div className="text-[var(--orgin-color)] text-xs">کل ارزیابی‌ها</div>
                    <div className="text-white text-lg font-bold">
                      {userStats.totalAssessments}
                    </div>
                  </div>
                  <div className="bg-[var(--orgin-color)]/20 backdrop-blur-sm rounded-xl p-3 text-center border border-[var(--orgin-color)]/30 ">
                    <div className="text-[var(--orgin-color)] text-xs">تکمیل شده</div>
                    <div className="text-white text-lg font-bold">
                      {userStats.completedAssessments}
                    </div>
                  </div>
                  <div className="bg-[var(--orgin-color)]/20 backdrop-blur-sm rounded-xl p-3 text-center border border-[var(--orgin-color)]/30 ">
                    <div className="text-[var(--orgin-color)] text-xs">در حال انجام</div>
                    <div className="text-white text-lg font-bold">
                      {userStats.inProgressAssessments}
                    </div>
                  </div>
                  <div className="bg-[var(--orgin-color)]/20 backdrop-blur-sm rounded-xl p-3 text-center border border-[var(--orgin-color)]/30 ">
                    <div className="text-[var(--orgin-color)] text-xs">میزان موفقیت</div>
                    <div className="text-white text-lg font-bold">
                      {userStats.successRate}%
                    </div>
                  </div>
                </div>

                {/* منوی تب‌ها */}
                <div className="w-full space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                      activeTab === "profile"
                        ? "text-[var(--orgin-color)]"
                        : "text-[var(--text-color)]"
                    }`}
                  >
                    <FiUser className="text-lg" />
                    <span className="text-sm md:text-base">پروفایل</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                      activeTab === "security"
                        ? "text-[var(--orgin-color)]"
                        : "text-[var(--text-color)]"
                    }`}
                  >
                    <FiLock className="text-lg" />
                    <span className="text-sm md:text-base">امنیت</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1 min-h-0">
            <div className="h-full flex flex-col gap-4">
              {/* محتوای تب‌ها */}
              <div className="flex-1 overflow-auto space-y-6">
                {/* تب پروفایل */}
                {activeTab === "profile" && (
                  <GlassCard>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">
                        اطلاعات پروفایل
                      </h3>
                      <Button
                        label={isEditing ? "ذخیره تغییرات" : "ویرایش پروفایل"}
                        type={isEditing ? "green" : 1}
                        icon={isEditing ? <FiSave /> : <FiEdit2 />}
                        onClick={
                          isEditing
                            ? handleEditProfile
                            : () => setIsEditing(true)
                        }
                      />
                    </div>

                    {isEditing ? (
                      <div className="space-y-6">
                        {/* اطلاعات اصلی */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="نام کامل"
                            value={editFormData.name || ""}
                            onChange={(e) =>
                              handleEditChange("", "name", e.target.value)
                            }
                            placeholder="نام کامل"
                          />
                          <Input
                            label="نام کاربری"
                            value={editFormData.username || ""}
                            disabled
                            placeholder="نام کاربری"
                          />
                        </div>

                        {/* اطلاعات شرکت */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-4">
                            اطلاعات شرکت
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="نام شرکت"
                              value={editFormData.about?.coname || ""}
                              onChange={(e) =>
                                handleAboutChange("coname", e.target.value)
                              }
                              placeholder="نام شرکت"
                            />
                            <Input
                              label="ایمیل شرکت"
                              value={editFormData.about?.coemail || ""}
                              onChange={(e) =>
                                handleAboutChange("coemail", e.target.value)
                              }
                              placeholder="ایمیل شرکت"
                            />
                            <Input
                              label="تلفن شرکت"
                              value={editFormData.about?.cophone || ""}
                              onChange={(e) =>
                                handleAboutChange("cophone", e.target.value)
                              }
                              placeholder="تلفن شرکت"
                            />
                            <Input
                              label="تلفن رابط"
                              value={editFormData.about?.rabet_phone || ""}
                              onChange={(e) =>
                                handleAboutChange("rabet_phone", e.target.value)
                              }
                              placeholder="تلفن رابط"
                            />
                            <div className="w-full col-span-2">
                              <Input
                                label="آدرس"
                                value={editFormData.about?.address || ""}
                                onChange={(e) =>
                                  handleAboutChange("address", e.target.value)
                                }
                                placeholder="آدرس"
                                type="textarea"
                              />
                            </div>
                            <Input
                              label="کد پستی"
                              value={editFormData.about?.postcode || ""}
                              onChange={(e) =>
                                handleAboutChange("postcode", e.target.value)
                              }
                              placeholder="کد پستی"
                            />
                            <Input
                              label="شماره ثبت"
                              value={editFormData.about?.r_number || ""}
                              onChange={(e) =>
                                handleAboutChange("r_number", e.target.value)
                              }
                              placeholder="شماره ثبت"
                            />
                            <Input
                              label="شماره شرکت"
                              value={editFormData.about?.c_number || ""}
                              onChange={(e) =>
                                handleAboutChange("c_number", e.target.value)
                              }
                              placeholder="شماره شرکت"
                            />
                          </div>
                        </div>

                        {/* شبکه‌های اجتماعی */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-4">
                            شبکه‌های اجتماعی
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(editFormData.links || {}).map(
                              ([platform, value]) => (
                                <Input
                                  key={platform}
                                  label={
                                    platform.charAt(0).toUpperCase() +
                                    platform.slice(1)
                                  }
                                  value={value}
                                  onChange={(e) =>
                                    handleLinksChange(platform, e.target.value)
                                  }
                                  placeholder={`آدرس ${platform}`}
                                  icon={<SocialIcon platform={platform} />}
                                />
                              )
                            )}
                          </div>
                        </div>

                        {/* زمینه‌های فعالیت */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-white font-semibold">
                              زمینه‌های فعالیت
                            </h4>
                            <Button
                              label="افزودن زمینه"
                              type={1}
                              onClick={addContextField}
                              className="h-10"
                            />
                          </div>
                          <div className="space-y-3">
                            {editFormData.context?.map((context, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={context}
                                  onChange={(e) =>
                                    handleContextChange(index, e.target.value)
                                  }
                                  placeholder={`زمینه فعالیت ${index + 1}`}
                                  className="flex-1"
                                />
                                <Button
                                  label="حذف"
                                  type="red"
                                  onClick={() => removeContextField(index)}
                                  className="h-14 w-20"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* دکمه‌های اقدام */}
                        <div className="flex gap-3">
                          <Button
                            label="ذخیره تغییرات"
                            type="green"
                            onClick={handleEditProfile}
                            className="flex-1"
                          />
                          <Button
                            label="انصراف"
                            type="red"
                            onClick={() => setIsEditing(false)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* اطلاعات اصلی */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                            <FiUser className="text-[var(--orgin-color)] text-lg" />
                            <div>
                              <p className="text-gray-400 text-xs">نام کامل</p>
                              <p className="text-white font-medium">
                                {profileData?.name || "تعریف نشده"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                            <FiUser className="text-[var(--orgin-color)] text-lg" />
                            <div>
                              <p className="text-gray-400 text-xs">
                                نام کاربری
                              </p>
                              <p className="text-white font-medium">
                                {profileData?.username}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* اطلاعات شرکت */}
                        <div className="bg-white/5 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            اطلاعات شرکت
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {profileData?.about?.coname && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FaRegBuilding className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    نام شرکت
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.coname}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.coemail && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiMail className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    ایمیل شرکت
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.coemail}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.cophone && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiPhone className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    تلفن شرکت
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.cophone}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.rabet_phone && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiPhone className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    تلفن رابط
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.rabet_phone}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.address && (
                              <div className="w-full flex col-span-2 row-span-2 gap-3 p-3 bg-white/5 rounded-lg">
                                <FiMapPin className="text-[var(--orgin-color)] shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-gray-400 text-xs">آدرس</p>
                                  <p className="text-white font-medium break-words">
                                    {profileData.about.address}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.postcode && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiMapPin className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    کد پستی
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.postcode}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.r_number && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiBriefcase className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    شماره ثبت
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.r_number}
                                  </p>
                                </div>
                              </div>
                            )}
                            {profileData?.about?.c_number && (
                              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <FiBriefcase className="text-[var(--orgin-color)]" />
                                <div>
                                  <p className="text-gray-400 text-xs">
                                    شماره شرکت
                                  </p>
                                  <p className="text-white font-medium">
                                    {profileData.about.c_number}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* زمینه‌های فعالیت */}
                        {profileData?.context &&
                          profileData.context.length > 0 && (
                            <div className="bg-white/5 rounded-lg p-6">
                              <h4 className="text-lg font-semibold text-white mb-4">
                                زمینه‌های فعالیت
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {profileData.context.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--orgin-color)]/20 rounded-full border border-[var(--orgin-color)]/30"
                                  >
                                    <FiList className="text-[var(--orgin-color)] text-sm" />
                                    <span className="text-[var(--orgin-color)] text-sm font-medium">
                                      {field}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* شبکه‌های اجتماعی */}
                        <div className="bg-white/5 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            شبکه‌های اجتماعی
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {profileData?.links &&
                              Object.entries(profileData.links).map(
                                ([platform, url]) =>
                                  url && (
                                    <div
                                      key={platform}
                                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                    >
                                      <SocialIcon platform={platform} />
                                      <div>
                                        <p className="text-gray-400 text-xs capitalize">
                                          {platform}
                                        </p>
                                        <p className="text-white font-medium">
                                          {url}
                                        </p>
                                      </div>
                                    </div>
                                  )
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </GlassCard>
                )}

                {/* تب امنیت */}
                {activeTab === "security" && (
                  <GlassCard>
                    <div className="h-full flex flex-col gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">
                          تغییر رمز عبور
                        </h3>
                        <div className="grid grid-cols-1 gap-4 p-4 bg-white/5 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              رمز عبور فعلی
                            </label>
                            <Input
                              type="password"
                              placeholder="رمز عبور فعلی خود را وارد کنید"
                              icon={<FiLock className="text-white/70" />}
                              name="old_password"
                              value={formData.old_password}
                              onChange={handleChange}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              رمز عبور جدید
                            </label>
                            <Input
                              type="password"
                              placeholder="رمز عبور جدید خود را وارد کنید"
                              icon={<FiLock className="text-white/70" />}
                              name="new_password"
                              value={formData.new_password}
                              onChange={handleChange}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              تکرار رمز عبور جدید
                            </label>
                            <Input
                              type="password"
                              placeholder="رمز عبور جدید را مجدداً وارد کنید"
                              icon={<FiLock className="text-white/70" />}
                              name="confirm_new_password"
                              value={formData.confirm_new_password}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                        <Button
                          label="تغییر رمز عبور"
                          onClick={changePassword}
                          icon={
                            loadingButton.resetPass && (
                              <ImSpinner2 className="animate-spin" />
                            )
                          }
                          disabled={loadingButton.resetPass}
                        />
                      </div>
                    </div>
                  </GlassCard>
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

export default ProfilePage;
