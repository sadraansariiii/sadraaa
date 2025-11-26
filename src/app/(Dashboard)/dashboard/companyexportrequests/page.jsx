"use client";

import { useState, useEffect } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiMessageCircle,
  FiCalendar,
  FiPackage,
  FiGlobe,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCheck,
  FiX,
  FiClock,
  FiDownload,
  FiSend,
  FiDatabase,
  FiStar,
} from "react-icons/fi";

import Alert from "@/src/components/layout/Alert";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

// کامپوننت انتخاب کشور
const CountrySelector = ({ onCountrySelect, selectedCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // داده‌های نمونه برای کشورها
  const countries = [
    { id: "DE", name: "آلمان", brokers: 12, flag: "🇩🇪" },
    { id: "AE", name: "امارات", brokers: 8, flag: "🇦🇪" },
    { id: "CA", name: "کانادا", brokers: 15, flag: "🇨🇦" },
    { id: "TR", name: "ترکیه", brokers: 6, flag: "🇹🇷" },
    { id: "CN", name: "چین", brokers: 25, flag: "🇨🇳" },
    { id: "RU", name: "روسیه", brokers: 9, flag: "🇷🇺" },
    { id: "FR", name: "فرانسه", brokers: 11, flag: "🇫🇷" },
    { id: "GB", name: "انگلستان", brokers: 14, flag: "🇬🇧" },
    { id: "US", name: "آمریکا", brokers: 22, flag: "🇺🇸" },
    { id: "IN", name: "هند", brokers: 18, flag: "🇮🇳" },
    { id: "JP", name: "ژاپن", brokers: 13, flag: "🇯🇵" },
    { id: "KR", name: "کره جنوبی", brokers: 10, flag: "🇰🇷" },
    { id: "BR", name: "برزیل", brokers: 7, flag: "🇧🇷" },
    { id: "AU", name: "استرالیا", brokers: 9, flag: "🇦🇺" },
    { id: "IT", name: "ایتالیا", brokers: 11, flag: "🇮🇹" },
    { id: "ES", name: "اسپانیا", brokers: 8, flag: "🇪🇸" },
    { id: "NL", name: "هلند", brokers: 10, flag: "🇳🇱" },
    { id: "SG", name: "سنگاپور", brokers: 12, flag: "🇸🇬" },
    { id: "MY", name: "مالزی", brokers: 6, flag: "🇲🇾" },
    { id: "SA", name: "عربستان", brokers: 9, flag: "🇸🇦" },
  ];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryClick = (country) => {
    if (onCountrySelect) {
      onCountrySelect(country);
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/20 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">انتخاب کشور مقصد</h3>
        <p className="text-white/60 text-sm">
          کشور مورد نظر برای صادرات را انتخاب کنید تا لیست کارگزاران آن کشور
          نمایش داده شود.
        </p>
      </div>

      {/* جستجو */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="جستجوی کشور..."
          value={searchTerm}
          icon={<FiSearch />}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
        />
      </div>

      {/* لیست کشورها */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
        {filteredCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleCountryClick(country)}
            className={`p-3 rounded-lg border transition-all duration-200 text-center ${
              selectedCountry?.id === country.id
                ? "bg-orange-500/20 border-orange-400/50 text-orange-300 shadow-lg"
                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <div className="text-2xl mb-2">{country.flag}</div>
            <div className="text-sm font-medium truncate">{country.name}</div>
            <div className="text-xs text-white/60 mt-1">
              {country.brokers} کارگزار
            </div>
          </button>
        ))}
      </div>

      {/* اطلاعات کشور انتخاب شده */}
      {selectedCountry && (
        <div className="mt-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">{selectedCountry.flag}</span>
              {selectedCountry.name}
            </h4>
            <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
              <FiUser className="text-orange-300 text-sm" />
              <span className="text-orange-300 text-sm font-medium">
                {selectedCountry.brokers} کارگزار فعال
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <FiStar className="text-yellow-300" />
              <span>کارگزاران معتبر و دارای مجوز</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <FiClock className="text-green-300" />
              <span>پاسخگویی ۲۴ ساعته</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <FiCheck className="text-blue-300" />
              <span>پشتیبانی کامل صادرات</span>
            </div>
          </div>
        </div>
      )}

      {filteredCountries.length === 0 && (
        <div className="text-center py-8">
          <FiGlobe className="text-white/40 text-4xl mx-auto mb-4" />
          <p className="text-white/60">کشوری یافت نشد</p>
        </div>
      )}
    </div>
  );
};

// کامپوننت لیست کارگزاران
const BrokersList = ({ country, onSelectBroker, selectedBroker }) => {
  if (!country) return null;

  // داده‌های نمونه برای کارگزاران
  const brokers = [
    {
      id: 1,
      name: "کارگزاری بین‌المللی تجارت",
      rating: 4.8,
      completedExports: 124,
      specialization: "محصولات کشاورزی",
      responseTime: "۲-۴ ساعت",
      languages: ["فارسی", "انگلیسی", "آلمانی"],
      contact: {
        email: "info@trade-international.com",
        phone: "+49 30 1234567",
      },
      description: "دارای ۱۰ سال سابقه در صادرات محصولات کشاورزی به اروپا",
      features: ["مشاوره رایگان", "ترخیص کالا", "بیمه حمل و نقل"],
    },
    {
      id: 2,
      name: "کارگزاری اروپا تجارت",
      rating: 4.6,
      completedExports: 89,
      specialization: "کالاهای صنعتی",
      responseTime: "۱-۳ ساعت",
      languages: ["فارسی", "انگلیسی", "فرانسوی"],
      contact: {
        email: "contact@euro-trade.com",
        phone: "+49 30 7654321",
      },
      description: "متخصص در زمینه صادرات کالاهای صنعتی و فنی",
      features: ["مشاوره تخصصی", "بازاریابی", "انبارداری"],
    },
    {
      id: 3,
      name: "کارگزاری صادرات جهانی",
      rating: 4.9,
      completedExports: 156,
      specialization: "زعفران و ادویه‌جات",
      responseTime: "فوری",
      languages: ["فارسی", "انگلیسی", "عربی"],
      contact: {
        email: "export@global-trade.com",
        phone: "+49 30 9876543",
      },
      description: "پیشرو در صادرات زعفران و محصولات لوکس",
      features: ["بازاریابی بین‌المللی", "کنترل کیفیت", "حمل هوایی"],
    },
  ];

  const handleSelectBroker = (broker) => {
    if (onSelectBroker) {
      onSelectBroker(broker);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">
          کارگزاران فعال در {country.name}
        </h3>
        <span className="text-white/60 text-sm">
          {brokers.length} کارگزار از {country.brokers} کارگزار کل
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 ${
              selectedBroker?.id === broker.id
                ? "border-orange-400/50 bg-orange-500/10"
                : "border-white/10 hover:border-orange-400/30"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                <FiUser className="text-orange-300 text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-sm truncate">
                  {broker.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full border border-yellow-400/30">
                    <FiStar className="text-yellow-300 text-xs" />
                    <span className="text-yellow-300 text-xs font-medium">
                      {broker.rating}
                    </span>
                  </div>
                  <span className="text-white/60 text-xs">
                    {broker.completedExports} صادرات
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-xs mb-3 line-clamp-2">
              {broker.description}
            </p>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <FiPackage className="text-green-300 text-xs" />
                <span className="text-white/70 text-xs">تخصص:</span>
                <span className="text-white text-xs font-medium">
                  {broker.specialization}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-blue-300 text-xs" />
                <span className="text-white/70 text-xs">پاسخگویی:</span>
                <span className="text-white text-xs font-medium">
                  {broker.responseTime}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {broker.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full border border-white/10"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                label={
                  selectedBroker?.id === broker.id
                    ? "انتخاب شده"
                    : "انتخاب کارگزار"
                }
                onClick={() => handleSelectBroker(broker)}
                className={`w-full text-xs justify-center ${
                  selectedBroker?.id === broker.id
                    ? "bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/30"
                    : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border-orange-400/30"
                }`}
                disabled={selectedBroker?.id === broker.id}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedBroker && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                <FiCheck className="text-green-300" />
              </div>
              <div>
                <h4 className="text-green-300 font-bold text-sm">
                  کارگزار انتخاب شده
                </h4>
                <p className="text-white text-sm">
                  {selectedBroker.name} - امتیاز: {selectedBroker.rating} ★
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectBroker(null)}
              className="text-green-300 hover:text-green-200 p-2"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CompanyExportRequestsPage = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedBroker, setSelectedBroker] = useState(null);

  // کنترل اسکرول بدن هنگام باز بودن مودال
  useEffect(() => {
    if (activeModal || showNewRequestForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal, showNewRequestForm]);

  // داده‌های درخواست‌های صادرات شرکت
  const [exportRequests, setExportRequests] = useState([
    {
      id: "EXP-001",
      product: {
        name: "پسته ممتاز",
        category: "کشاورزی",
        grade: "درجه یک",
        quantity: "۱۰۰۰ کیلوگرم",
        packaging: "بسته‌بندی وکیوم",
        standards: ["ISO 22000", "HACCP", "سیب سلامت"],
        description: "پسته مرغوب با کیفیت صادراتی، عاری از آفلاتوکسین",
      },
      exportDetails: {
        targetCountry: "آلمان",
        destinationPort: "هامبورگ",
        incoterm: "FOB",
        requestedDocuments: ["گواهی سلامت", "گواهی مبدا", "بارنامه", "فاکتور"],
        specialRequirements: "نیاز به گواهی HALAL و استاندارد اروپایی",
      },
      status: "pending",
      createdAt: "۱۴۰۲/۱۱/۱۵ - ۱۰:۳۰",
      updatedAt: "۱۴۰۲/۱۱/۱۵ - ۱۰:۳۰",
      broker: {
        name: "کارگزاری بین‌المللی تجارت",
        rating: "۴.۸",
        completedExports: "۱۲۴",
      },
      messages: [
        {
          id: 1,
          sender: "company",
          text: "با سلام، درخواست صادرات پسته به آلمان دارم. لطفا راهنمایی کنید.",
          timestamp: "۱۴۰۲/۱۱/۱۵ - ۱۰:۳۰",
        },
        {
          id: 2,
          sender: "broker",
          text: "سلام، مدارک شرکت و مشخصات محصول را ارسال کنید.",
          timestamp: "۱۴۰۲/۱۱/۱۵ - ۱۱:۱۵",
        },
      ],
    },
    {
      id: "EXP-002",
      product: {
        name: "فرش دستباف اصفهان",
        category: "صنایع دستی",
        grade: "موزه‌ای",
        quantity: "۵۰ تخته",
        packaging: "پالت چوبی مخصوص",
        standards: ["علامت استاندارد", "گواهی اصالت"],
        description: "فرش دستباف اصفهان با طرح لچک ترنج، ابعاد ۶ متری",
      },
      exportDetails: {
        targetCountry: "امارات متحده عربی",
        destinationPort: "دبی",
        incoterm: "CIF",
        requestedDocuments: ["گواهی اصالت", "گواهی مبدا", "عکس محصول"],
        specialRequirements: "بیمه تمام ریسک و حمل با کانتینر مخصوص",
      },
      status: "approved",
      createdAt: "۱۴۰۲/۱۱/۱۴ - ۱۴:۲۰",
      updatedAt: "۱۴۰۲/۱۱/۱۴ - ۱۵:۴۵",
      broker: {
        name: "کارگزاری خلیج فارس",
        rating: "۴.۶",
        completedExports: "۸۹",
      },
      messages: [],
    },
    {
      id: "EXP-003",
      product: {
        name: "زعفران سوپر نگین",
        category: "زعفران",
        grade: "درجه یک",
        quantity: "۵۰۰ کیلوگرم",
        packaging: "قوطی ۱۰ گرمی طلایی",
        standards: ["ISO 3632", "گواهی سازمان غذا و دارو"],
        description: "زعفران مرغوب قائنات با عطر و رنگ بالا",
      },
      exportDetails: {
        targetCountry: "کانادا",
        destinationPort: "تورنتو",
        incoterm: "EXW",
        requestedDocuments: [
          "آنالیز آزمایشگاهی",
          "گواهی سلامت",
          "بارنامه هوایی",
        ],
        specialRequirements: "نیاز به تاییدیه بهداشت کانادا",
      },
      status: "completed",
      createdAt: "۱۴۰۲/۱۱/۱۰ - ۰۹:۱۵",
      updatedAt: "۱۴۰۲/۱۱/۱۲ - ۱۱:۲۰",
      broker: {
        name: "کارگزاری اقیانوس آرام",
        rating: "۴.۹",
        completedExports: "۲۰۳",
      },
      messages: [
        {
          id: 1,
          sender: "company",
          text: "زعفران برای صادرات به کانادا آماده است.",
          timestamp: "۱۴۰۲/۱۱/۱۰ - ۰۹:۱۵",
        },
        {
          id: 2,
          sender: "broker",
          text: "صادرات با موفقیت انجام شد. مدارک ارسال شد.",
          timestamp: "۱۴۰۲/۱۱/۱۲ - ۱۱:۲۰",
        },
      ],
    },
  ]);

  // فرم جدید درخواست
  const [newRequest, setNewRequest] = useState({
    product: {
      name: "",
      category: "",
      grade: "",
      quantity: "",
      packaging: "",
      standards: [""],
      description: "",
    },
    exportDetails: {
      targetCountry: "",
      destinationPort: "",
      incoterm: "",
      requestedDocuments: [""],
      specialRequirements: "",
    },
  });

  // فیلتر کردن درخواست‌ها
  const filteredRequests = exportRequests.filter((request) => {
    const matchesSearch =
      request.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.exportDetails.targetCountry
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === "all" || request.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setNewRequest({
      ...newRequest,
      exportDetails: {
        ...newRequest.exportDetails,
        targetCountry: country.name,
      },
    });
  };

  const handleSelectBroker = (broker) => {
    setSelectedBroker(broker);
    setAlert({
      message: `کارگزار ${broker.name} با موفقیت انتخاب شد`,
      type: "success",
      visible: true,
    });
  };

  const handleSendMessage = (requestId, messageText) => {
    if (!messageText.trim()) return;

    const newMessageObj = {
      id: Date.now(),
      sender: "company",
      text: messageText,
      timestamp: new Date().toLocaleString("fa-IR"),
    };

    setExportRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              messages: [...req.messages, newMessageObj],
              updatedAt: new Date().toLocaleString("fa-IR"),
            }
          : req
      )
    );

    setAlert({
      message: "پیام با موفقیت ارسال شد",
      type: "success",
      visible: true,
    });
  };

  const handleCreateRequest = () => {
    // اعتبارسنجی فرم
    if (
      !newRequest.product.name ||
      !newRequest.product.category ||
      !newRequest.exportDetails.targetCountry
    ) {
      setAlert({
        message: "لطفا فیلدهای ضروری را پر کنید",
        type: "warning",
        visible: true,
      });
      return;
    }

    if (!selectedBroker) {
      setAlert({
        message: "لطفا یک کارگزار انتخاب کنید",
        type: "warning",
        visible: true,
      });
      return;
    }

    const newRequestObj = {
      id: `EXP-${String(exportRequests.length + 1).padStart(3, "0")}`,
      ...newRequest,
      status: "pending",
      createdAt: new Date().toLocaleString("fa-IR"),
      updatedAt: new Date().toLocaleString("fa-IR"),
      broker: selectedBroker,
      messages: [
        {
          id: 1,
          sender: "company",
          text: `درخواست صادرات ${newRequest.product.name} به ${newRequest.exportDetails.targetCountry} ثبت شد.`,
          timestamp: new Date().toLocaleString("fa-IR"),
        },
      ],
    };

    setExportRequests((prev) => [newRequestObj, ...prev]);
    setShowNewRequestForm(false);
    setNewRequest({
      product: {
        name: "",
        category: "",
        grade: "",
        quantity: "",
        packaging: "",
        standards: [""],
        description: "",
      },
      exportDetails: {
        targetCountry: "",
        destinationPort: "",
        incoterm: "",
        requestedDocuments: [""],
        specialRequirements: "",
      },
    });
    setSelectedBroker(null);
    setSelectedCountry(null);

    setAlert({
      message: "درخواست صادرات با موفقیت ثبت شد",
      type: "success",
      visible: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "approved":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "در انتظار بررسی";
      case "approved":
        return "تأیید شده";
      case "completed":
        return "تکمیل شده";
      case "rejected":
        return "رد شده";
      default:
        return "نامشخص";
    }
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setActiveModal("details");
  };

  const openChatModal = (request) => {
    setSelectedRequest(request);
    setActiveModal("chat");
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setActiveModal(null);
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection>
          <div className="w-full h-full flex flex-col gap-4 md:gap-6">
            {/* هدر و آمار */}
            <GlassCard>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                    درخواست‌های صادرات
                  </h1>
                  <p className="text-white/80 text-sm">
                    مدیریت درخواست‌های صادرات و ارتباط با کارگزاران
                  </p>
                </div>

                <Button
                  icon={<FiPlus className="text-sm" />}
                  label="درخواست جدید"
                  onClick={() => setShowNewRequestForm(true)}
                />
              </div>

              {/* آمار سریع */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/30">
                  <div className="text-2xl font-bold text-blue-300">
                    {exportRequests.length}
                  </div>
                  <div className="text-sm text-blue-300/80">کل درخواست‌ها</div>
                </div>
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/30">
                  <div className="text-2xl font-bold text-yellow-300">
                    {
                      exportRequests.filter((req) => req.status === "pending")
                        .length
                    }
                  </div>
                  <div className="text-sm text-yellow-300/80">در انتظار</div>
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-green-400/30">
                  <div className="text-2xl font-bold text-green-300">
                    {
                      exportRequests.filter((req) => req.status === "completed")
                        .length
                    }
                  </div>
                  <div className="text-sm text-green-300/80">تکمیل شده</div>
                </div>
                <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-400/30">
                  <div className="text-2xl font-bold text-purple-300">
                    {exportRequests.reduce(
                      (total, req) => total + req.messages.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-purple-300/80">پیام‌ها</div>
                </div>
              </div>

              {/* نوار جستجو و فیلتر */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="جستجو بر اساس نام محصول، کشور مقصد..."
                    value={searchTerm}
                    icon={<FiSearch />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                  />
                </div>
              </div>

              {/* تب‌های وضعیت */}
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "all"
                      ? "bg-white/20 text-white shadow-lg border border-white/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  همه درخواست‌ها
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "pending"
                      ? "bg-yellow-500/20 text-yellow-300 shadow-lg border border-yellow-400/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  در انتظار
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "approved"
                      ? "bg-blue-500/20 text-blue-300 shadow-lg border border-blue-400/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  تأیید شده
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "completed"
                      ? "bg-green-500/20 text-green-300 shadow-lg border border-green-400/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  تکمیل شده
                </button>
              </div>
            </GlassCard>

            {/* لیست درخواست‌ها */}
            <GlassCard className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  {filteredRequests.length} درخواست صادرات
                </h2>
              </div>

              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
                      {/* اطلاعات اصلی */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-white">
                                {request.id}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                  request.status
                                )}`}
                              >
                                <span className="mr-1">
                                  {getStatusText(request.status)}
                                </span>
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FiPackage className="text-green-300" />
                                  <span className="text-white/70">محصول:</span>
                                  <span className="font-medium text-white">
                                    {request.product.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiUser className="text-blue-300" />
                                  <span className="text-white/70">
                                    کارگزار:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.broker.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiDatabase className="text-purple-300" />
                                  <span className="text-white/70">
                                    دسته‌بندی:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.product.category}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FiGlobe className="text-orange-300" />
                                  <span className="text-white/70">
                                    کشور مقصد:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.exportDetails.targetCountry}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiCalendar className="text-teal-300" />
                                  <span className="text-white/70">
                                    تاریخ درخواست:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.createdAt}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiMessageCircle className="text-purple-300" />
                                  <span className="text-white/70">
                                    پیام‌ها:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.messages.length} پیام
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* اطلاعات کارگزار */}
                        <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-white/70">
                                امتیاز کارگزار:
                              </span>
                              <span className="font-medium text-yellow-300">
                                {request.broker.rating} ★
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-white/70">
                                صادرات انجام شده:
                              </span>
                              <span className="font-medium text-blue-300">
                                {request.broker.completedExports} مورد
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* اقدامات */}
                      <div className="flex flex-col gap-2 lg:w-48">
                        <div className="flex gap-2">
                          <Button
                            icon={<FiEye className="text-lg" />}
                            label="مشاهده جزئیات"
                            onClick={() => openDetailsModal(request)}
                            type={4}
                            className="w-full text-xs justify-center bg-white/10 hover:bg-white/20 text-white border-white/20"
                          />
                          <Button
                            icon={<FiMessageCircle className="text-lg" />}
                            label="مشاهده چت"
                            onClick={() => openChatModal(request)}
                            type={4}
                            className="text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredRequests.length === 0 && (
                  <div className="text-center py-8">
                    <FiPackage className="text-white/40 text-4xl mx-auto mb-4" />
                    <p className="text-white/60">
                      هیچ درخواست صادراتی یافت نشد
                    </p>
                    <Button
                      label="ثبت اولین درخواست"
                      onClick={() => setShowNewRequestForm(true)}
                      className="mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30"
                    />
                  </div>
                )}
              </div>
            </GlassCard>
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

        {/* مودال ثبت درخواست جدید */}
        {showNewRequestForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  ثبت درخواست صادرات جدید
                </h2>
                <button
                  onClick={() => setShowNewRequestForm(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* انتخاب کشور */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white mb-4">
                    انتخاب کشور مقصد
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    کشور مورد نظر برای صادرات را انتخاب کنید تا لیست کارگزاران
                    آن کشور نمایش داده شود.
                  </p>
                  <CountrySelector
                    onCountrySelect={handleCountrySelect}
                    selectedCountry={selectedCountry}
                  />

                  {/* لیست کارگزاران */}
                  <BrokersList
                    country={selectedCountry}
                    onSelectBroker={handleSelectBroker}
                    selectedBroker={selectedBroker}
                  />
                </GlassCard>

                {/* اطلاعات محصول */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white mb-4">
                    اطلاعات محصول
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="نام محصول *"
                      value={newRequest.product.name}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            name: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="دسته‌بندی *"
                      value={newRequest.product.category}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            category: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="درجه کیفیت"
                      value={newRequest.product.grade}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            grade: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="مقدار"
                      value={newRequest.product.quantity}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            quantity: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="نوع بسته‌بندی"
                      value={newRequest.product.packaging}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            packaging: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-white mb-2">
                      توضیحات محصول
                    </label>
                    <textarea
                      value={newRequest.product.description}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          product: {
                            ...newRequest.product,
                            description: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/50"
                      placeholder="توضیحات کامل درباره محصول..."
                    />
                  </div>
                </GlassCard>

                {/* جزئیات صادرات */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white mb-4">
                    جزئیات صادرات
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="کشور مقصد *"
                      value={newRequest.exportDetails.targetCountry}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          exportDetails: {
                            ...newRequest.exportDetails,
                            targetCountry: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      icon={<FiGlobe />}
                      disabled={!!selectedCountry}
                    />
                    <Input
                      placeholder="بندر مقصد"
                      value={newRequest.exportDetails.destinationPort}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          exportDetails: {
                            ...newRequest.exportDetails,
                            destinationPort: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="اینکوترمز"
                      value={newRequest.exportDetails.incoterm}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          exportDetails: {
                            ...newRequest.exportDetails,
                            incoterm: e.target.value,
                          },
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-white mb-2">
                      نیازمندی‌های خاص
                    </label>
                    <textarea
                      value={newRequest.exportDetails.specialRequirements}
                      onChange={(e) =>
                        setNewRequest({
                          ...newRequest,
                          exportDetails: {
                            ...newRequest.exportDetails,
                            specialRequirements: e.target.value,
                          },
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/50"
                      placeholder="نیازمندی‌های خاص برای صادرات..."
                    />
                  </div>
                </GlassCard>

                <div className="flex gap-3 pt-6 border-t border-white/20">
                  <Button label="ثبت درخواست" onClick={handleCreateRequest} />
                  <Button
                    label="انصراف"
                    onClick={() => setShowNewRequestForm(false)}
                    type={4}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* مودال جزئیات درخواست */}
        {activeModal === "details" && selectedRequest && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
            onClick={closeModal}
          >
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  جزئیات درخواست {selectedRequest.id}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={closeModal}
                    className="text-white/70 hover:text-white p-2"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* اطلاعات محصول */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    اطلاعات محصول
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">نام محصول:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.product.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">دسته‌بندی:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.product.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">درجه کیفیت:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.product.grade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">مقدار:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.product.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">بسته‌بندی:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.product.packaging}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* جزئیات صادرات */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    جزئیات صادرات
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">کشور مقصد:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.exportDetails.targetCountry}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">بندر مقصد:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.exportDetails.destinationPort}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">اینکوترمز:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.exportDetails.incoterm}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">نیازمندی‌های خاص:</span>
                      <span className="font-medium text-white text-left max-w-xs">
                        {selectedRequest.exportDetails.specialRequirements ||
                          "ندارد"}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* اطلاعات کارگزار */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    اطلاعات کارگزار
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">نام کارگزار:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.broker.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">امتیاز:</span>
                      <span className="font-medium text-yellow-300">
                        {selectedRequest.broker.rating} ★
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">صادرات انجام شده:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.broker.completedExports} مورد
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* وضعیت */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    وضعیت درخواست
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">وضعیت:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedRequest.status
                        )}`}
                      >
                        <span className="mr-1">
                          {getStatusText(selectedRequest.status)}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">تاریخ درخواست:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.createdAt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">آخرین بروزرسانی:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.updatedAt}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {/* مودال چت */}
        {activeModal === "chat" && selectedRequest && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
            onClick={closeModal}
          >
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    گفتگو با {selectedRequest.broker.name}
                  </h2>
                  <p className="text-white/60 text-sm">
                    درخواست: {selectedRequest.id} -{" "}
                    {selectedRequest.product.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={closeModal}
                    className="text-white/70 hover:text-white p-2"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

           
            </div>
          </div>
        )}
      </div>
    </AccessGuard>
  );
};

export default CompanyExportRequestsPage;
