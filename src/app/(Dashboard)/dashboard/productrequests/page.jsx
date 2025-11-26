"use client";

import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaSearch,
  FaFilter,
  FaPhone,
  FaUser,
  FaBuilding,
  FaBox,
  FaCalendar,
  FaStar,
  FaReply,
  FaDownload,
  FaPrint,
  FaShare,
  FaExclamationCircle,
} from "react-icons/fa";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import Modal from "@/src/components/layout/Modal";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

const ProductRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    responded: 0,
    closed: 0,
  });

  // داده‌های نمونه برای درخواست‌ها
  const sampleRequests = [
    {
      id: 1,
      product: {
        id: 1,
        name: "نرم‌افزار مدیریت منابع انسانی",
        code: "HRM-001",
        price: 25000000,
      },
      customer: {
        name: "علیرضا محمدی",
        email: "alireza.mohammadi@company.ir",
        phone: "09123456789",
        company: "شرکت توسعه راهکارهای نوین",
        position: "مدیر منابع انسانی",
      },
      message: `با سلام،
      من از محصول نرم‌افزار مدیریت منابع انسانی شما دیدن کردم و بسیار علاقه‌مند شدم.
      لطفاً اطلاعات کامل‌تری شامل:
      - دموی نرم‌افزار
      - لیست قیمت ماژول‌های مختلف
      - شرایط پشتیبانی
      را برای بنده ارسال فرمایید.
      
      با تشکر`,
      status: "pending", // pending, responded, closed
      priority: "high", // low, medium, high
      createdAt: "1402/12/15 - 14:30",
      updatedAt: "1402/12/15 - 14:30",
      attachments: [
        { name: "نیازمندی‌های شرکت.pdf", type: "pdf", size: "2.1 MB" },
      ],
      notes: [],
      response: null,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "سیستم اتوماسیون اداری",
        code: "OA-002",
        price: 18000000,
      },
      customer: {
        name: "فاطمه کریمی",
        email: "f.karimi@org.ir",
        phone: "09351234567",
        company: "سازمان خدمات عمومی",
        position: "معاون اداری و مالی",
      },
      message: `درود،
      برای سازمان ما که حدود ۲۰۰ پرسنل دارد، نیاز به سیستم اتوماسیون اداری داریم.
      آیا امکان ارائه دموی رایگان وجود دارد؟
      همچنین لطفاً شرایط استقرار و آموزش را نیز اعلام فرمایید.`,
      status: "responded",
      priority: "medium",
      createdAt: "1402/12/10 - 09:15",
      updatedAt: "1402/12/12 - 11:20",
      attachments: [],
      notes: [
        {
          id: 1,
          text: "دموی محصول برای مشتری ارسال شد",
          author: "محمد رضایی",
          date: "1402/12/11 - 10:00",
        },
      ],
      response: {
        message: `با سلام و احترام
        از ابراز علاقه شما به سیستم اتوماسیون اداری سپاسگزاریم.
        دموی کامل محصول و لیست قیمت به پیوست ارسال گردید.
        برای تنظیم جلسه دموی آنلاین، لطفاً با واحد فروش هماهنگ فرمایید.`,
        author: "محمد رضایی - واحد فروش",
        date: "1402/12/12 - 11:20",
        attachments: [
          { name: "دموی محصول.mp4", type: "video", size: "45.2 MB" },
          { name: "لیست قیمت.pdf", type: "pdf", size: "1.8 MB" },
        ],
      },
    },
    {
      id: 3,
      product: {
        id: 3,
        name: "سرور ابری اختصاصی",
        code: "CLOUD-003",
        price: 85000000,
      },
      customer: {
        name: "سعید احمدی",
        email: "s.ahmadi@techco.ir",
        phone: "09107654321",
        company: "شرکت فناوری اطلاعات پیشرو",
        position: "مدیر فنی",
      },
      message: `با عرض سلام
      برای پروژه جدید نیاز به سرور ابری با مشخصات زیر داریم:
      - حداقل ۳۲ گیگابایت RAM
      - پردازنده ۱۶ هسته‌ای
      - فضای ذخیره‌سازی ۲ ترابایت
      
      لطفاً پیشنهاد فنی و قیمت خود را ارائه دهید.`,
      status: "pending",
      priority: "high",
      createdAt: "1402/12/14 - 16:45",
      updatedAt: "1402/12/14 - 16:45",
      attachments: [
        { name: "مشخصات فنی مورد نیاز.pdf", type: "pdf", size: "3.2 MB" },
      ],
      notes: [],
      response: null,
    },
    {
      id: 4,
      product: {
        id: 4,
        name: "دستگاه پوز فروشگاهی",
        code: "POS-004",
        price: 3500000,
      },
      customer: {
        name: "محمد تقوی",
        email: "m.taghavi@store.ir",
        phone: "09368974563",
        company: "فروشگاه زنجیره‌ای رفاه",
        position: "مدیر فروش",
      },
      message: `سلام
      برای ۱۵ شعبه فروشگاه نیاز به دستگاه پوز داریم.
      لطفاً شرایط تخفیف برای خرید عمده و گارانتی را اعلام فرمایید.`,
      status: "closed",
      priority: "medium",
      createdAt: "1402/12/05 - 11:20",
      updatedAt: "1402/12/08 - 15:40",
      attachments: [],
      notes: [
        {
          id: 1,
          text: "پیشنهاد قیمت ارسال شد",
          author: "فروش منطقه‌ای",
          date: "1402/12/06 - 14:00",
        },
        {
          id: 2,
          text: "مشتری خرید خود را نهایی کرد",
          author: "فروش منطقه‌ای",
          date: "1402/12/08 - 15:40",
        },
      ],
      response: {
        message: `با سلام
        پیشنهاد ویژه برای خرید ۱۵ دستگاه پوز به شرح زیر می‌باشد:
        - قیمت واحد: ۳,۲۰۰,۰۰۰ تومان
        - گارانتی: ۳۶ ماه
        - نصب و راه‌اندازی رایگان
        
        برای هماهنگی بیشتر در خدمتتان هستیم.`,
        author: "واحد فروش منطقه‌ای",
        date: "1402/12/06 - 14:00",
        attachments: [
          { name: "پیشنهاد قیمت.pdf", type: "pdf", size: "1.2 MB" },
        ],
      },
    },
    {
      id: 5,
      product: {
        id: 5,
        name: "نرم‌افزار حسابداری شرکتی",
        code: "ACC-005",
        price: 45000000,
      },
      customer: {
        name: "زهرا نجفی",
        email: "z.najafi@accounting.ir",
        phone: "09124567890",
        company: "موسسه حسابداری دقیق",
        position: "مدیر عامل",
      },
      message: `با احترام
      برای ۳ شرکت زیرمجموعه نیاز به نرم‌افزار حسابداری یکپارچه داریم.
      آیا امکان سفارشی‌سازی بر اساس نیازهای خاص ما وجود دارد؟`,
      status: "responded",
      priority: "low",
      createdAt: "1402/12/12 - 10:30",
      updatedAt: "1402/12/13 - 09:15",
      attachments: [],
      notes: [
        {
          id: 1,
          text: "جلسه مشاوره تنظیم شد",
          author: "مدیر فروش",
          date: "1402/12/13 - 09:15",
        },
      ],
      response: {
        message: `سلام بر شما
        بله، امکان سفارشی‌سازی نرم‌افزار بر اساس نیازهای شما وجود دارد.
        پیشنهاد می‌کنیم یک جلسه مشاوره رایگان با کارشناسان فنی ما داشته باشید.
        لطفاً زمان مناسب خود را اعلام فرمایید.`,
        author: "واحد مشاوره فنی",
        date: "1402/12/13 - 09:15",
        attachments: [],
      },
    },
  ];

  const statusOptions = [
    { value: "all", label: "همه وضعیت‌ها", color: "gray" },
    { value: "pending", label: "در انتظار پاسخ", color: "orange" },
    { value: "responded", label: "پاسخ داده شده", color: "blue" },
    { value: "closed", label: "بسته شده", color: "green" },
  ];

  const priorityOptions = [
    { value: "all", label: "همه اولویت‌ها", color: "gray" },
    { value: "high", label: "بالا", color: "red" },
    { value: "medium", label: "متوسط", color: "orange" },
    { value: "low", label: "پایین", color: "green" },
  ];

  const dateRanges = [
    { value: "all", label: "همه تاریخ‌ها" },
    { value: "today", label: "امروز" },
    { value: "week", label: "هفته جاری" },
    { value: "month", label: "ماه جاری" },
    { value: "last-month", label: "ماه گذشته" },
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    updateStats();
  }, [requests]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setRequests(sampleRequests);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  const updateStats = () => {
    const total = requests.length;
    const pending = requests.filter((req) => req.status === "pending").length;
    const responded = requests.filter(
      (req) => req.status === "responded"
    ).length;
    const closed = requests.filter((req) => req.status === "closed").length;

    setStats({ total, pending, responded, closed });
  };

  // فیلتر و جستجو
  const filteredRequests = requests
    .filter((request) => {
      const matchesSearch =
        request.customer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.customer.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      const matchesDate = () => {
        if (dateFilter === "all") return true;
        // در اینجا می‌توان منطق فیلتر تاریخ را پیاده‌سازی کرد
        return true;
      };

      return matchesSearch && matchesStatus && matchesDate();
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === "pending"
            ? "bg-orange-100 text-orange-800"
            : status === "responded"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {statusOption?.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          priority === "high"
            ? "bg-red-100 text-red-800"
            : priority === "medium"
            ? "bg-orange-100 text-orange-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {priority === "high"
          ? "اولویت بالا"
          : priority === "medium"
          ? "اولویت متوسط"
          : "اولویت پایین"}
      </span>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: newStatus,
              updatedAt: new Date().toLocaleString("fa-IR"),
            }
          : req
      )
    );
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest || !replyMessage.trim()) return;

    const newResponse = {
      message: replyMessage,
      author: "شما", // در حالت واقعی نام کاربر وارد شده باشد
      date: new Date().toLocaleString("fa-IR"),
      attachments: [],
    };

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "responded",
              response: newResponse,
              updatedAt: new Date().toLocaleString("fa-IR"),
              notes: [
                ...req.notes,
                {
                  id: req.notes.length + 1,
                  text: "پاسخ جدید ارسال شد",
                  author: "شما",
                  date: new Date().toLocaleString("fa-IR"),
                },
              ],
            }
          : req
      )
    );

    setReplyMessage("");
    setShowReplyModal(false);
    alert("پاسخ شما با موفقیت ارسال شد.");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection
          tab={
            <div className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] py-2 px-3">
              <span className="text-sm md:text-base whitespace-nowrap">
                درخواست‌های محصولات
              </span>
              <div className="h-full aspect-square md:w-14 md:h-14 bg-green-500 rounded-[8px] flex justify-center items-center">
                <FaEnvelope size={"1.2rem"} className="md:size-5 text-white" />
              </div>
            </div>
          }
        >
          <div className="w-full h-full flex flex-col gap-6">
            {/* آمار کلی */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                    <FaEnvelope size={20} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--text-color)]">
                      {stats.total}
                    </div>
                    <div className="text-gray-400 text-sm">کل درخواست‌ها</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                    <FaClock size={20} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--text-color)]">
                      {stats.pending}
                    </div>
                    <div className="text-gray-400 text-sm">در انتظار پاسخ</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                    <FaCheck size={20} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--text-color)]">
                      {stats.responded}
                    </div>
                    <div className="text-gray-400 text-sm">پاسخ داده شده</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center text-white">
                    <FaTimes size={20} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--text-color)]">
                      {stats.closed}
                    </div>
                    <div className="text-gray-400 text-sm">بسته شده</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* فیلترها و جستجو */}
            <GlassCard>
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 w-full lg:w-auto">
                  <Input
                    type="text"
                    placeholder="جستجو در درخواست‌ها، نام مشتری، شرکت یا محصول..."
                    value={searchTerm}
                    icon={<FaSearch />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    {dateRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>

                  {(searchTerm !== "" ||
                    statusFilter !== "all" ||
                    dateFilter !== "all") && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      <FaTimes size={14} />
                      پاک کردن فیلترها
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* لیست درخواست‌ها */}
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--orgin-color)]"></div>
                </div>
              ) : filteredRequests.length === 0 ? (
                <GlassCard className="text-center py-12">
                  <FaEnvelope className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                    هیچ درخواستی یافت نشد
                  </h3>
                  <p className="text-gray-400 mb-4">
                    درخواستی با مشخصات جستجو شده وجود ندارد.
                  </p>
                  <Button
                    type={1}
                    label="پاک کردن فیلترها"
                    onClick={clearFilters}
                  />
                </GlassCard>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <GlassCard
                      key={request.id}
                      className="hover:scale-[1.01] transition-all duration-300 border border-gray-600/50 hover:border-green-500/30"
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          {/* اطلاعات اصلی */}
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                                <FaUser size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-bold text-[var(--text-color)] text-lg">
                                    {request.customer.name}
                                  </h3>
                                  {getStatusBadge(request.status)}
                                  {getPriorityBadge(request.priority)}
                                </div>
                                <div className="text-gray-400 text-sm space-y-1">
                                  <div className="flex items-center gap-2">
                                    <FaBuilding className="text-blue-400" />
                                    <span>{request.customer.company}</span>
                                    <span className="text-gray-500">•</span>
                                    <span>{request.customer.position}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FaBox className="text-green-400" />
                                    <span className="font-medium text-[var(--text-color)]">
                                      {request.product.name}
                                    </span>
                                    <span className="text-gray-500">•</span>
                                    <span>
                                      {formatPrice(request.product.price)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FaCalendar className="text-orange-400" />
                                    <span>ارسال: {request.createdAt}</span>
                                    {request.updatedAt !==
                                      request.createdAt && (
                                      <>
                                        <span className="text-gray-500">•</span>
                                        <span>
                                          آخرین بروزرسانی: {request.updatedAt}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* پیش‌نمایش پیام */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                              <p className="text-[var(--text-color)] text-sm line-clamp-2">
                                {request.message}
                              </p>
                            </div>
                          </div>

                          {/* اقدامات */}
                          <div className="flex flex-col gap-2 min-w-[200px]">
                            <Button
                              type={1}
                              label="مشاهده جزئیات"
                              icon={<FaEye />}
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowRequestModal(true);
                              }}
                            />

                            {request.status === "pending" && (
                              <Button
                                type={2}
                                label="پاسخ دادن"
                                icon={<FaReply />}
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowReplyModal(true);
                                }}
                              />
                            )}

                            <div className="flex gap-2">
                              {request.status !== "closed" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, "closed")
                                  }
                                  className="flex-1 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                                >
                                  <FaTimes size={12} />
                                  بستن
                                </button>
                              )}

                              {request.status === "pending" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, "responded")
                                  }
                                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                                >
                                  <FaCheck size={12} />
                                  پاسخ داده شد
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DashboardSection>

        {/* مودال مشاهده جزئیات درخواست */}
        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          title="جزئیات درخواست"
          size="xl"
        >
          {selectedRequest && (
            <div className="space-y-6">
              {/* اطلاعات مشتری */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  اطلاعات مشتری
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      نام کامل
                    </label>
                    <div className="text-[var(--text-color)] font-medium">
                      {selectedRequest.customer.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      سمت
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedRequest.customer.position}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      شرکت
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedRequest.customer.company}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      تلفن
                    </label>
                    <div className="text-[var(--text-color)] font-mono">
                      {selectedRequest.customer.phone}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      ایمیل
                    </label>
                    <div className="text-blue-600">
                      <a href={`mailto:${selectedRequest.customer.email}`}>
                        {selectedRequest.customer.email}
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* اطلاعات محصول */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                  <FaBox className="text-green-500" />
                  اطلاعات محصول
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      نام محصول
                    </label>
                    <div className="text-[var(--text-color)] font-medium">
                      {selectedRequest.product.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      کد محصول
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedRequest.product.code}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      قیمت
                    </label>
                    <div className="text-[var(--text-color)] font-bold">
                      {formatPrice(selectedRequest.product.price)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      وضعیت درخواست
                    </label>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedRequest.status)}
                      {getPriorityBadge(selectedRequest.priority)}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* پیام مشتری */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                  <FaEnvelope className="text-orange-500" />
                  پیام مشتری
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-[var(--text-color)] whitespace-pre-line leading-7">
                    {selectedRequest.message}
                  </p>
                </div>

                {/* فایل‌های پیوست */}
                {selectedRequest.attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      فایل‌های پیوست شده:
                    </h4>
                    <div className="space-y-2">
                      {selectedRequest.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-[var(--bg-color2)] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FaDownload className="text-gray-400" />
                            <div>
                              <div className="text-[var(--text-color)] text-sm">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {file.size}
                              </div>
                            </div>
                          </div>
                          <Button
                            type={2}
                            label="دانلود"
                            icon={<FaDownload />}
                            className="text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* پاسخ داده شده */}
              {selectedRequest.response && (
                <GlassCard>
                  <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                    <FaReply className="text-green-500" />
                    پاسخ شما
                  </h3>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                    <p className="text-[var(--text-color)] whitespace-pre-line leading-7">
                      {selectedRequest.response.message}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      توسط {selectedRequest.response.author} در{" "}
                      {selectedRequest.response.date}
                    </div>
                  </div>

                  {selectedRequest.response.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        فایل‌های ارسالی:
                      </h4>
                      <div className="space-y-2">
                        {selectedRequest.response.attachments.map(
                          (file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-[var(--bg-color2)] rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FaDownload className="text-gray-400" />
                                <div>
                                  <div className="text-[var(--text-color)] text-sm">
                                    {file.name}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {file.size}
                                  </div>
                                </div>
                              </div>
                              <Button
                                type={2}
                                label="دانلود"
                                icon={<FaDownload />}
                                className="text-xs"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </GlassCard>
              )}

              {/* یادداشت‌ها */}
              {selectedRequest.notes.length > 0 && (
                <GlassCard>
                  <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                    یادداشت‌ها و تاریخچه
                  </h3>
                  <div className="space-y-3">
                    {selectedRequest.notes.map((note) => (
                      <div
                        key={note.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-[var(--text-color)] text-sm">
                            {note.text}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            توسط {note.author} در {note.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* دکمه‌های اقدام */}
              <div className="flex gap-3 pt-4 border-t border-gray-600">
                {selectedRequest.status === "pending" && (
                  <Button
                    type={1}
                    label="پاسخ به درخواست"
                    icon={<FaReply />}
                    className="flex-1"
                    onClick={() => {
                      setShowRequestModal(false);
                      setShowReplyModal(true);
                    }}
                  />
                )}
                <Button
                  type={2}
                  label="چاپ جزئیات"
                  icon={<FaPrint />}
                  className="flex-1"
                />
                <Button
                  type={3}
                  label="بستن"
                  className="flex-1"
                  onClick={() => setShowRequestModal(false)}
                />
              </div>
            </div>
          )}
        </Modal>

        {/* مودال پاسخ به درخواست */}
        <Modal
          isOpen={showReplyModal}
          onClose={() => setShowReplyModal(false)}
          title="پاسخ به درخواست"
          size="lg"
        >
          {selectedRequest && (
            <div className="space-y-6">
              {/* اطلاعات مشتری */}
              <GlassCard className="bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    <FaUser size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-color)]">
                      {selectedRequest.customer.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {selectedRequest.customer.company} •{" "}
                      {selectedRequest.product.name}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* پیام اصلی مشتری */}
              <GlassCard>
                <h4 className="font-bold text-[var(--text-color)] mb-3">
                  پیام مشتری:
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <p className="text-[var(--text-color)] text-sm whitespace-pre-line">
                    {selectedRequest.message}
                  </p>
                </div>
              </GlassCard>

              {/* فرم پاسخ */}
              <GlassCard>
                <form onSubmit={handleReplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      پاسخ شما
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="پاسخ خود را اینجا بنویسید..."
                      rows={6}
                      className="w-full bg-[var(--bg-color2)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <FaExclamationCircle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-800 text-sm">
                        پاسخ شما برای مشتری ارسال خواهد شد و وضعیت درخواست به
                        "پاسخ داده شده" تغییر خواهد کرد.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type={1}
                      label="ارسال پاسخ"
                      icon={<FaReply />}
                      className="flex-1"
                      onClick={handleReplySubmit}
                    />
                    <Button
                      type={3}
                      label="انصراف"
                      className="flex-1"
                      onClick={() => setShowReplyModal(false)}
                    />
                  </div>
                </form>
              </GlassCard>
            </div>
          )}
        </Modal>
      </div>
    </AccessGuard>
  );
};

export default ProductRequestsPage;
