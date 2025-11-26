"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiDatabase,
  FiGlobe,
  FiHome,
  FiAward,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiX,
  FiTag,
  FiPlus,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaTelegram, FaLinkedin, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

import Alert from "@/src/components/layout/Alert";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import { Building } from "lucide-react";
import useFormHandler from "@/src/hooks/useFormHandler";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import { useRouter } from "next/navigation";
import { useInfoStore } from "@/src/store/userInfoStore";
import { BsCheck2All } from "react-icons/bs";

const CompanyProfileSetup = () => {
  const { clientId, token } = useSessionStore();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const { formData, handleChange, setFormData } = useFormHandler({
    type: "",
    co_name: "",
    r_number: "",
    c_number: "",
    ceo_phone: "",
    address: "",
    o_phone: "",
    co_email: "",
    website: "",
    postcode: "",
    r_phone: "",
    country: "",
    Province: "",
    ProvinceId: "",
    city: "",
    cityId: "",
    context: [],
    link: {
      instagram: "",
      facebook: "",
      twitter: "",
      telegram: "",
      youtube: "",
      linkedin: "",
      whatsapp: "",
      tiktok: "",
      aparat: "",
    },
  });
  const [countryList, setCountryList] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [isSelectingProvince, setIsSelectingProvince] = useState(false);
  const [isSelectingCity, setIsSelectingCity] = useState(false);
  const { userInfo, setUserInfo } = useInfoStore();
  const router = useRouter();
  // دریافت لیست کشور ها
  useEffect(() => {
    if (!clientId || !token) return;

    const getCountry = async () => {
      try {
        const countryRes = await fetch(BaseUrl("/countries"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: "",
            appId: clientId,
            token: token,
          }),
        });
        const data = await countryRes.json();
        // سورت کردن کشورها بر اساس نام فارسی
        const sortedCountries = data.data.sort((a, b) => {
          return a.fa_name.localeCompare(b.fa_name, "fa");
        });
        setCountryList(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };

    getCountry();
  }, [clientId, token]);

  // دریافت استان
  const getProvince = async (value, action = "search") => {
    try {
      // اگر input خالی است و action submit است، درخواست نده
      if (action === "submit" && !value.trim()) {
        setShowProvinceDropdown(false);
        return;
      }

      const ProvinceRes = await fetch(BaseUrl("/city"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: value,
          type: 1,
          action: action,
          appId: clientId,
          token: token,
        }),
      });
      const data = await ProvinceRes.json();

      if (data.done) {
        setProvinceList(data.data || []);

        if (action === "search") {
          setShowProvinceDropdown(true);
        } else if (action === "submit") {
          // در حالت submit، اولین آیتم را انتخاب کن
          if (data.data && data.data.length > 0) {
            const selectedProvince = data.data[0];
            setFormData((prev) => ({
              ...prev,
              Province: selectedProvince.title,
              ProvinceId: selectedProvince.id,
            }));
          }
          setShowProvinceDropdown(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // دریافت استان

  // دریافت شهر
  const getCity = async (value, action = "search") => {
    try {
      // اگر input خالی است و action submit است، درخواست نده
      if (action === "submit" && !value.trim()) {
        setShowCityDropdown(false);
        return;
      }

      const cityRes = await fetch(BaseUrl("/city"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: value,
          type: 2,
          action: action,
          appId: clientId,
          token: token,
        }),
      });
      const data = await cityRes.json();

      if (data.done) {
        setCityList(data.data || []);

        if (action === "search") {
          setShowCityDropdown(true);
        } else if (action === "submit") {
          // در حالت submit، اولین آیتم را انتخاب کن
          if (data.data && data.data.length > 0) {
            const selectedCity = data.data[0];
            setFormData((prev) => ({
              ...prev,
              city: selectedCity.title,
              cityId: selectedCity.id,
            }));
          }
          setShowCityDropdown(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // دریافت شهر

  // توابع جداگانه برای مدیریت تغییرات استان و شهر
  const handleProvinceChange = (e) => {
    const value = e.target.value;

    // آپدیت مقدار در formData
    setFormData((prev) => ({
      ...prev,
      Province: value,
      ProvinceId: "", // ریست کردن ID چون مقدار جدید تایپ شده
    }));

    if (value.trim() === "") {
      setProvinceList([]);
      setShowProvinceDropdown(false);
    } else {
      getProvince(value, "search");
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;

    // آپدیت مقدار در formData
    setFormData((prev) => ({
      ...prev,
      city: value,
      cityId: "", // ریست کردن ID چون مقدار جدید تایپ شده
    }));

    if (value.trim() === "") {
      setCityList([]);
      setShowCityDropdown(false);
    } else {
      getCity(value, "search");
    }
  };
  // توابع جداگانه برای مدیریت تغییرات استان و شهر

  // انتخاب استان از لیست
  const handleSelectProvince = (province) => {
    setIsSelectingProvince(true);
    setFormData((prev) => ({
      ...prev,
      Province: province.title,
      ProvinceId: province.id,
    }));
    setShowProvinceDropdown(false);
    setProvinceList([]);

    // بعد از انتخاب از dropdown، focus را از input بردار
    setTimeout(() => {
      setIsSelectingProvince(false);
    }, 100);
  };

  // انتخاب شهر از لیست
  const handleSelectCity = (city) => {
    setIsSelectingCity(true);
    setFormData((prev) => ({
      ...prev,
      city: city.title,
      cityId: city.id,
    }));
    setShowCityDropdown(false);
    setCityList([]);

    // بعد از انتخاب از dropdown، focus را از input بردار
    setTimeout(() => {
      setIsSelectingCity(false);
    }, 100);
  };

  // هنگامی که کاربر از فیلد استان خارج می‌شود
  const handleProvinceBlur = () => {
    setTimeout(() => {
      // اگر کاربر در حال انتخاب از dropdown بود، کاری نکن
      if (isSelectingProvince) {
        return;
      }

      // اگر کاربر از لیست انتخاب نکرده و مقدار وارد کرده
      if (formData.Province && !formData.ProvinceId) {
        getProvince(formData.Province, "submit");
      }
      setShowProvinceDropdown(false);
    }, 200);
  };

  // هنگامی که کاربر از فیلد شهر خارج می‌شود
  const handleCityBlur = () => {
    setTimeout(() => {
      // اگر کاربر در حال انتخاب از dropdown بود، کاری نکن
      if (isSelectingCity) {
        return;
      }

      // اگر کاربر از لیست انتخاب نکرده و مقدار وارد کرده
      if (formData.city && !formData.cityId) {
        getCity(formData.city, "submit");
      }
      setShowCityDropdown(false);
    }, 200);
  };

  // state برای تگ‌ها
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // توابع مربوط به تگ‌ها
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setFormData((prev) => ({
        ...prev,
        context: newTags,
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    setFormData((prev) => ({
      ...prev,
      context: newTags,
    }));
  };

  // تابع برای تغییر شبکه‌های اجتماعی
  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      link: {
        ...prev.link,
        [platform]: value,
      },
    }));
  };

  // آیکون‌های شبکه‌های اجتماعی
  const socialMediaIcons = {
    instagram: <FiInstagram className="text-[var(--orgin-color)]" />,
    facebook: <FiFacebook className="text-[var(--orgin-color)]" />,
    twitter: <FiTwitter className="text-[var(--orgin-color)]" />,
    telegram: <FaTelegram className="text-[var(--orgin-color)]" />,
    youtube: <FiYoutube className="text-[var(--orgin-color)]" />,
    linkedin: <FaLinkedin className="text-[var(--orgin-color)]" />,
    whatsapp: <FaWhatsapp className="text-[var(--orgin-color)]" />,
    tiktok: <FaTiktok className="text-[var(--orgin-color)]" />,
    aparat: <SiAparat className="text-[var(--orgin-color)]" />,
  };

  // لیست کامل شبکه‌های اجتماعی
  const socialMediaPlatforms = [
    {
      key: "instagram",
      label: "اینستاگرام",
      placeholder: "username یا لینک پروفایل",
    },
    {
      key: "facebook",
      label: "فیسبوک",
      placeholder: "username یا لینک پروفایل",
    },
    {
      key: "twitter",
      label: "توییتر",
      placeholder: "username یا لینک پروفایل",
    },
    { key: "telegram", label: "تلگرام", placeholder: "username یا لینک کانال" },
    { key: "youtube", label: "یوتیوب", placeholder: "لینک کانال" },
    { key: "linkedin", label: "لینکدین", placeholder: "لینک پروفایل شرکت" },
    { key: "whatsapp", label: "واتساپ", placeholder: "شماره واتساپ" },
    { key: "tiktok", label: "تیک تاک", placeholder: "username" },
    { key: "aparat", label: "آپارات", placeholder: "لینک کانال" },
  ];

  // ارسال فرم
  const sendRform = async () => {
    try {
      const sendRformRes = await fetch(BaseUrl("/account/userinfo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          type: formData.type,
          co_name: formData.co_name,
          r_number: Number(formData.r_number), // عددی
          context: formData.context,
          c_number: Number(formData.c_number), // عددی
          ceo_phone: Number(formData.ceo_phone), // عددی
          address: formData.address,
          o_phone: Number(formData.o_phone), // عددی
          co_email: formData.co_email,
          website: formData.website,
          postcode: Number(formData.postcode), // عددی
          r_phone: Number(formData.r_phone), // عددی
          country: formData.country,
          state: Number(formData.ProvinceId), // عددی
          city: Number(formData.cityId), // عددی
          link: formData.link,
        }),
      });

      const data = await sendRformRes.json();

      if (data.done) {
        setAlert({
          message: "اطلاعات با موفقیت ارسال شد",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          setUserInfo(true);
          router.push("/dashboard");
        }, 1500);
      } else {
        setAlert({
          message: "خطا در ارسال اطلاعات",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "خطا در ارتباط با سرور",
        type: "error",
        visible: true,
      });
    }
  };

  // انتقال به داشبورد در صورت پر کردن فرم
  useEffect(() => {
    if (userInfo && userInfo === true) {
      // هدایت با تاخیر کمی برای نمایش Alert
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userInfo, router]);
  // انتقال به داشبورد در صورت پر کردن فرم

  return (
    <DashboardSection>
      {userInfo === false && (
        <div className="w-full">
          {/* هدر صفحه */}
          <GlassCard className="mb-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                تکمیل پروفایل شرکت
              </h1>
              <p className="text-white/70 text-lg">
                لطفاً اطلاعات کامل شرکت خود را برای استفاده از خدمات وارد کنید
              </p>

              {/* Select برای انتخاب حالت */}
              <div className="max-w-1/2 mb-6">
                <Input
                  label={"نوع کاربری"}
                  type="select"
                  options={[
                    { value: "1", label: "شرکت" },
                    { value: "3", label: "کارگزار" },
                  ]}
                  name={"type"}
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
            </div>
          </GlassCard>

          <div className="flex flex-col gap-4">
            {/* بخش ۱: اطلاعات اصلی شرکت */}
            <GlassCard className="flex flex-col gap-10">
              <div className="p-4 bg-red-500/20 text-red-500 w-fit border border-red-500 rounded-[10px] flex items-start gap-2">
                <span>
                  لطفاً تمام اطلاعات خواسته‌شده را با دقت و به‌صورت صحیح وارد
                  کنید. در صورت ثبت اطلاعات نادرست، امکان ویرایش یا تغییر آن‌ها
                  در آینده وجود نخواهد داشت. پیش از ثبت نهایی، حتماً از صحت
                  داده‌های واردشده اطمینان حاصل کنید.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--orgin-color)]/20 rounded-lg flex items-center justify-center">
                  <FiHome className="text-[var(--orgin-color)] text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    اطلاعات اصلی شرکت
                  </h2>
                  <p className="text-white/60 text-sm">
                    اطلاعات ثبت و هویتی شرکت
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="نام کامل شرکت *"
                  name="co_name"
                  icon={<FiUser />}
                  placeholder="نام شرکت"
                  value={formData.co_name}
                  onChange={handleChange}
                />
                <Input
                  label="شماره ثبت شرکت"
                  name="r_number"
                  icon={<FiFileText />}
                  placeholder="123456"
                  value={formData.r_number}
                  onChange={handleChange}
                />
                <Input
                  label="کد اقتصادی *"
                  name="c_number"
                  icon={<FiTrendingUp />}
                  placeholder="987654321"
                  value={formData.c_number}
                  onChange={handleChange}
                />

                {/* کشور */}
                <Input
                  label="کشور"
                  type="select"
                  name="country"
                  icon={<FiGlobe />}
                  placeholder="کشور را انتخاب کنید"
                  options={
                    countryList
                      ? countryList.map((country) => ({
                          value: country.id,
                          label: country.fa_name,
                        }))
                      : []
                  }
                  value={formData.country}
                  onChange={handleChange}
                />

                {/* استان */}
                <div className="w-full relative">
                  <Input
                    label="استان"
                    type="text"
                    name="Province"
                    icon={<FiDatabase />}
                    placeholder="استان مورد نظر خود را تایپ کنید"
                    value={formData.Province}
                    onChange={handleProvinceChange}
                    onBlur={handleProvinceBlur}
                    onFocus={() => {
                      if (provinceList.length > 0) {
                        setShowProvinceDropdown(true);
                      }
                    }}
                  />
                  {showProvinceDropdown && provinceList.length > 0 && (
                    <div
                      className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                      onMouseDown={(e) => e.preventDefault()} // جلوگیری از trigger شدن onBlur
                    >
                      {provinceList.map((province, index) => (
                        <div
                          key={province.id || index}
                          className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0"
                          onClick={() => handleSelectProvince(province)}
                        >
                          <div className="text-white">{province.title}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* شهر */}
                <div className="w-full relative">
                  <Input
                    label="شهر"
                    type="text"
                    name="city"
                    icon={<FiDatabase />}
                    placeholder="شهر مورد نظر خود را تایپ کنید"
                    value={formData.city}
                    onChange={handleCityChange}
                    onBlur={handleCityBlur}
                    onFocus={() => {
                      if (cityList.length > 0) {
                        setShowCityDropdown(true);
                      }
                    }}
                  />
                  {showCityDropdown && cityList.length > 0 && (
                    <div
                      className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                      onMouseDown={(e) => e.preventDefault()} // جلوگیری از trigger شدن onBlur
                    >
                      {cityList.map((city, index) => (
                        <div
                          key={city.id || index}
                          className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0"
                          onClick={() => handleSelectCity(city)}
                        >
                          <div className="text-white">{city.title}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--orgin-color)]/20 rounded-lg flex items-center justify-center">
                  <FiMapPin className="text-[var(--orgin-color)] text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">اطلاعات تماس</h2>
                  <p className="text-white/60 text-sm">
                    راه‌های ارتباطی با شرکت
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="آدرس کامل *"
                  name="address"
                  icon={<FiMapPin />}
                  placeholder="آدرس دقیق شرکت"
                  value={formData.address}
                  onChange={handleChange}
                />
                <Input
                  label="شماره دفتر *"
                  name="o_phone"
                  icon={<FiPhone />}
                  placeholder="02122334455"
                  value={formData.o_phone}
                  onChange={handleChange}
                />
                <Input
                  label="شماره مدیرعامل *"
                  name="ceo_phone"
                  icon={<FiPhone />}
                  placeholder="09123456789"
                  value={formData.ceo_phone}
                  onChange={handleChange}
                />
                <Input
                  label="ایمیل شرکت *"
                  name="co_email"
                  type="email"
                  icon={<FiMail />}
                  placeholder="company@example.com"
                  value={formData.co_email}
                  onChange={handleChange}
                />
                <Input
                  label="وبسایت"
                  name="website"
                  icon={<FiGlobe />}
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange}
                />
                <Input
                  label="کد پستی"
                  name="postcode"
                  icon={<FiMapPin />}
                  placeholder="1234567890"
                  value={formData.postcode}
                  onChange={handleChange}
                />
                <Input
                  label="شماره ثبت‌کننده"
                  name="r_phone"
                  icon={<FiAward />}
                  placeholder="09123456789"
                  value={formData.r_phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--orgin-color)]/20 rounded-lg flex items-center justify-center">
                  <FiGlobe className="text-[var(--orgin-color)] text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    شبکه‌های اجتماعی
                  </h2>
                  <p className="text-white/60 text-sm">
                    صفحات رسمی شرکت در شبکه‌های اجتماعی
                  </p>
                </div>
              </div>

              {/* پیغام راهنما */}
              <div className="w-fit bg-blue-500/10 border border-blue-500/30 rounded-[10px] p-4">
                <p className="text-blue-400 text-sm">
                  توجه: پر کردن تمامی شبکه‌های اجتماعی اجباری نیست. فقط
                  شبکه‌هایی که شرکت شما در آن‌ها فعال است را پر کنید. در صورت
                  عدم فعالیت در هر شبکه، فیلد مربوطه را خالی بگذارید.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialMediaPlatforms.map((platform) => (
                  <Input
                    key={platform.key}
                    label={
                      <div className="flex items-center gap-2">
                        {socialMediaIcons[platform.key]}
                        <span>{platform.label}</span>
                      </div>
                    }
                    placeholder={platform.placeholder}
                    value={formData.link[platform.key]}
                    onChange={(e) =>
                      handleSocialMediaChange(platform.key, e.target.value)
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--orgin-color)]/20 rounded-lg flex items-center justify-center">
                  <FiTag className="text-[var(--orgin-color)] text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    زمینه‌های فعالیت شرکت
                  </h2>
                  <p className="text-white/60 text-sm">
                    حوزه‌ها و برچسب‌هایی را که شرکت شما در آن فعالیت دارد، مشخص
                    کنید.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      label="زمینه فعالیت"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      icon={<FiTag />}
                      placeholder="زمینه فعالیت"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      label="ثبت"
                      onClick={handleAddTag}
                      className="h-14"
                    />
                  </div>
                </div>

                {/* نمایش تگ‌ها */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-[var(--orgin-color)]/20 text-[var(--orgin-color)] px-3 py-2 rounded-lg flex items-center gap-2 border border-[var(--orgin-color)]/30"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                  {tags.length === 0 && (
                    <div className="text-white/50 text-sm py-2">
                      هنوز برچسبی اضافه نشده است
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* دکمه‌های اقدام */}
            <GlassCard>
              <Button
                label="ثبت اطلاعات شرکت"
                className="h-14 w-full"
                onClick={() => {
                  sendRform();
                }}
              />
            </GlassCard>
          </div>
        </div>
      )}
      {userInfo === true && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BsCheck2All size={30} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              پروفایل شما با موفقیت تکمیل شد
            </h2>
            <p className="text-white/70 mb-6">
              برای استفاده از امکانات سامانه، به‌زودی به صفحه‌ی داشبورد هدایت
              خواهید شد.
            </p>
            <div className="animate-pulse text-green-400">
              در حال انتقال به داشبورد...
            </div>
          </div>
        </div>
      )}

      {/* Alert */}
      {alert.visible && (
        <Alert
          message={alert.message}
          type={alert.type}
          isVisible={alert.visible}
          duration={5000}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
    </DashboardSection>
  );
};

export default CompanyProfileSetup;
