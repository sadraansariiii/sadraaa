"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiCheck,
  FiX,
  FiUser,
  FiCalendar,
  FiFileText,
  FiDatabase,
  FiRefreshCw,
  FiArchive,
  FiMapPin,
  FiPackage,
  FiGlobe,
  FiMessageCircle,
} from "react-icons/fi";

import Alert from "@/src/components/layout/Alert";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

const DataExportRequestsPage = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'details', 'chat'

  // کنترل اسکرول بدن هنگام باز بودن مودال
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  // داده‌های فیک درخواست‌های صادرات
  const [exportRequests, setExportRequests] = useState([
    {
      id: "EXP-001",
      company: {
        name: "شرکت کشاورزی پیشرو",
        registrationNumber: "123456789",
        economicCode: "987654321",
        address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
        phone: "۰۲۱-۲۲۳۳۴۴۵۵",
        email: "info@pars-agri.com",
        manager: "محمد رضایی",
        managerPhone: "۰۹۱۲۳۴۵۶۷۸۹",
      },
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
      company: {
        name: "صنایع دستی هنر ایرانی",
        registrationNumber: "456789123",
        economicCode: "654987321",
        address: "اصفهان، خیابان چهارباغ، مجتمع صنایع دستی",
        phone: "۰۳۱-۳۴۵۶۷۸۹۰",
        email: "art@iranian-art.com",
        manager: "سارا محمدی",
        managerPhone: "۰۹۱۲۷۶۵۴۳۲۱",
      },
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
      messages: [
        {
          id: 1,
          sender: "company",
          text: "درخواست صادرات فرش به دبی دارم.",
          timestamp: "۱۴۰۲/۱۱/۱۴ - ۱۴:۲۰",
        },
      ],
    },
    {
      id: "EXP-003",
      company: {
        name: "شرکت زعفران طلایی",
        registrationNumber: "789123456",
        economicCode: "321654987",
        address: "مشهد، بلوار وکیل آباد",
        phone: "۰۵۱-۳۷۶۵۴۳۲۱",
        email: "export@golden-saffron.com",
        manager: "علی کریمی",
        managerPhone: "۰۹۳۵۵۵۵۶۶۷۷",
      },
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
      messages: [
        {
          id: 1,
          sender: "company",
          text: "زعفران برای صادرات به کانادا آماده است.",
          timestamp: "۱۴۰۲/۱۱/۱۰ - ۰۹:۱۵",
        },
      ],
    },
    {
      id: "EXP-004",
      company: {
        name: "کارخانه خشکبار بهار",
        registrationNumber: "159753486",
        economicCode: "753159486",
        address: "کرج، شهرک صنعتی بهار",
        phone: "۰۲۶-۳۴۲۱۵۶۷۸",
        email: "bahar@dryfruits.com",
        manager: "فاطمه احمدی",
        managerPhone: "۰۹۱۸۸۸۸۹۹۹۹",
      },
      product: {
        name: "بادام درختی مرغوب",
        category: "خشکبار",
        grade: "درجه دو",
        quantity: "۲۰۰۰ کیلوگرم",
        packaging: "کارتن ۲۰ کیلویی",
        standards: ["ISO 22000"],
        description: "بادام درختی تازه برداشت شده",
      },
      exportDetails: {
        targetCountry: "ترکیه",
        destinationPort: "استانبول",
        incoterm: "FCA",
        requestedDocuments: ["گواهی سلامت", "گواهی مبدا"],
        specialRequirements: "ندارد",
      },
      status: "rejected",
      createdAt: "۱۴۰۲/۱۱/۰۸ - ۱۶:۴۰",
      updatedAt: "۱۴۰۲/۱۱/۰۹ - ۱۰:۱۵",
      rejectionReason:
        "مدارک شرکت ناقص است و گواهی استاندارد بین‌المللی ارائه نشده است.",
      messages: [
        {
          id: 1,
          sender: "company",
          text: "درخواست صادرات بادام به ترکیه.",
          timestamp: "۱۴۰۲/۱۱/۰۸ - ۱۶:۴۰",
        },
        {
          id: 2,
          sender: "broker",
          text: "متاسفانه مدارک شما برای صادرات کافی نیست.",
          timestamp: "۱۴۰۲/۱۱/۰۹ - ۱۰:۱۵",
        },
        {
          id: 3,
          sender: "company",
          text: "درخواست صادرات بادام به ترکیه.",
          timestamp: "۱۴۰۲/۱۱/۰۸ - ۱۶:۴۰",
        },
        {
          id: 4,
          sender: "broker",
          text: "متاسفانه مدارک شما برای صادرات کافی نیست.",
          timestamp: "۱۴۰۲/۱۱/۰۹ - ۱۰:۱۵",
        },
        {
          id: 5,
          sender: "company",
          text: "درخواست صادرات بادام به ترکیه.",
          timestamp: "۱۴۰۲/۱۱/۰۸ - ۱۶:۴۰",
        },
        {
          id: 6,
          sender: "broker",
          text: "متاسفانه مدارک شما برای صادرات کافی نیست.",
          timestamp: "۱۴۰۲/۱۱/۰۹ - ۱۰:۱۵",
        },
        {
          id: 7,
          sender: "company",
          text: "درخواست صادرات بادام به ترکیه.",
          timestamp: "۱۴۰۲/۱۱/۰۸ - ۱۶:۴۰",
        },
        {
          id: 8,
          sender: "broker",
          text: "متاسفانه مدارک شما برای صادرات کافی نیست.",
          timestamp: "۱۴۰۲/۱۱/۰۹ - ۱۰:۱۵",
        },
      ],
    },
  ]);

  // فیلتر کردن درخواست‌ها
  const filteredRequests = exportRequests.filter((request) => {
    const matchesSearch =
      request.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.exportDetails.targetCountry
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === "all" || request.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleApprove = (requestId) => {
    setExportRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved",
              updatedAt: new Date().toLocaleString("fa-IR"),
            }
          : req
      )
    );
    setAlert({
      message: "درخواست با موفقیت تأیید شد",
      type: "success",
      visible: true,
    });
  };

  const handleReject = (requestId) => {
    setExportRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "rejected",
              updatedAt: new Date().toLocaleString("fa-IR"),
            }
          : req
      )
    );
    setAlert({
      message: "درخواست رد شد",
      type: "warning",
      visible: true,
    });
  };

  const handleComplete = (requestId) => {
    setExportRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "completed",
              updatedAt: new Date().toLocaleString("fa-IR"),
            }
          : req
      )
    );
    setAlert({
      message: "درخواست تکمیل و ارسال شد",
      type: "success",
      visible: true,
    });
  };

  const handleSendMessage = (requestId, messageText) => {
    if (!messageText.trim()) return;

    const newMessageObj = {
      id: Date.now(),
      sender: "broker",
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

  const switchToChat = () => {
    setActiveModal("chat");
  };

  const switchToDetails = () => {
    setActiveModal("details");
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection>
          <div className="w-full h-full flex flex-col gap-4 md:gap-6">
            {/* هدر و فیلترها */}
            <GlassCard>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                    مدیریت درخواست‌های صادرات
                  </h1>
                  <p className="text-white/80 text-sm">
                    بررسی و مدیریت درخواست‌های صادرات شرکت‌های ارزیابی شده
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    icon={<FiRefreshCw className="text-sm" />}
                    label="بروزرسانی"
                    onClick={() => setLoading(!loading)}
                    type={4}
                  />
                  <Button
                    icon={<FiArchive className="text-sm" />}
                    label="گزارش کلی"
                    type={1}
                    className="text-xs md:text-sm px-3 py-2"
                  />
                </div>
              </div>

              {/* نوار جستجو و فیلتر */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="جستجو بر اساس نام شرکت، محصول یا کشور مقصد..."
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
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "rejected"
                      ? "bg-red-500/20 text-red-300 shadow-lg border border-red-400/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  رد شده
                </button>
              </div>
            </GlassCard>

            {/* لیست درخواست‌ها */}
            <GlassCard className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  {filteredRequests.length} درخواست صادرات یافت شد
                </h2>
              </div>

              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10"
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
                                {getStatusText(request.status)}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FiUser className="text-blue-300" />
                                  <span className="text-white/70">شرکت:</span>
                                  <span className="font-medium text-white">
                                    {request.company.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiPackage className="text-green-300" />
                                  <span className="text-white/70">محصول:</span>
                                  <span className="font-medium text-white">
                                    {request.product.name}
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
                                  <FiMapPin className="text-red-300" />
                                  <span className="text-white/70">
                                    بندر مقصد:
                                  </span>
                                  <span className="font-medium text-white">
                                    {request.exportDetails.destinationPort}
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
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* جزئیات بیشتر */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium text-white mb-2">
                              استانداردها:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {request.product.standards.map(
                                (standard, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs border border-green-400/30"
                                  >
                                    {standard}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-white mb-2">
                              مدارک مورد نیاز:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {request.exportDetails.requestedDocuments.map(
                                (doc, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs border border-blue-400/30"
                                  >
                                    {doc}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* دلیل رد درخواست */}
                        {request.status === "rejected" &&
                          request.rejectionReason && (
                            <div className="mt-3 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                              <h4 className="font-medium text-red-300 mb-1">
                                دلیل رد درخواست:
                              </h4>
                              <p className="text-red-300/80 text-sm">
                                {request.rejectionReason}
                              </p>
                            </div>
                          )}
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
                        {request.status === "pending" && (
                          <>
                            <Button
                              icon={<FiCheck className="text-sm" />}
                              label="تأیید درخواست"
                              onClick={() => handleApprove(request.id)}
                              type={1}
                            />
                            <Button
                              icon={<FiX className="text-sm" />}
                              label="رد درخواست"
                              onClick={() => handleReject(request.id)}
                              type={3}
                            />
                          </>
                        )}
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
                {/* اطلاعات شرکت */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    اطلاعات شرکت
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">نام شرکت:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">شماره ثبت:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.registrationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">کد اقتصادی:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.economicCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">مدیر عامل:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.manager}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">تلفن:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">ایمیل:</span>
                      <span className="font-medium text-white">
                        {selectedRequest.company.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">آدرس:</span>
                      <span className="font-medium text-white text-left max-w-xs">
                        {selectedRequest.company.address}
                      </span>
                    </div>
                  </div>
                </GlassCard>

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
                        {selectedRequest.exportDetails.specialRequirements}
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
                        {getStatusText(selectedRequest.status)}
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

                {/* استانداردها */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    استانداردها
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedRequest.product.standards.map(
                      (standard, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-green-500/20 rounded-lg border border-green-400/30"
                        >
                          <FiCheck className="text-green-300" />
                          <span className="text-sm text-white">{standard}</span>
                        </div>
                      )
                    )}
                  </div>
                </GlassCard>

                {/* مدارک مورد نیاز */}
                <GlassCard>
                  <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                    مدارک مورد نیاز
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedRequest.exportDetails.requestedDocuments.map(
                      (doc, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-blue-500/20 rounded-lg border border-blue-400/30"
                        >
                          <FiFileText className="text-blue-300" />
                          <span className="text-sm text-white">{doc}</span>
                        </div>
                      )
                    )}
                  </div>
                </GlassCard>

                {/* دلیل رد */}
                {selectedRequest.status === "rejected" &&
                  selectedRequest.rejectionReason && (
                    <div className="lg:col-span-2">
                      <GlassCard>
                        <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2 mb-4">
                          دلیل رد درخواست
                        </h3>
                        <p className="text-red-300 bg-red-500/20 p-4 rounded-lg border border-red-400/30">
                          {selectedRequest.rejectionReason}
                        </p>
                      </GlassCard>
                    </div>
                  )}
              </div>

              {/* دکمه‌های اقدام */}
              <div className="flex gap-2 mt-6">
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      icon={<FiCheck className="text-sm" />}
                      label="تأیید درخواست"
                      onClick={() => {
                        handleApprove(selectedRequest.id);
                        closeModal();
                      }}
                      type={1}
                    />
                    <Button
                      icon={<FiX className="text-sm" />}
                      label="رد درخواست"
                      onClick={() => {
                        handleReject(selectedRequest.id);
                        closeModal();
                      }}
                      type={3}
                    />
                  </>
                )}
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
                  <h2 className="text-[14px] xl:text-2xl font-bold text-white">
                    گفتگو با {selectedRequest.company.name}
                  </h2>
                  <p className="text-white/60 text-[12px] xl:text-sm">
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

export default DataExportRequestsPage;
