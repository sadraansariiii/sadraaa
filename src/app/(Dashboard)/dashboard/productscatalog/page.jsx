"use client";

import { useState, useEffect } from "react";
import {
  FaBox,
  FaSearch,
  FaEye,
  FaShoppingCart,
  FaTag,
  FaDollarSign,
  FaBoxOpen,
  FaIndustry,
  FaCalendar,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaFilter,
  FaTimes,
  FaCheckCircle, // اضافه شد
  FaDownload, // اضافه شد
} from "react-icons/fa";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import Modal from "@/src/components/layout/Modal";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

const ProductsCatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // داده‌های نمونه برای محصولات (همان داده‌های قبلی)
  const sampleProducts = [
    {
      id: 1,
      name: "نرم‌افزار مدیریت منابع انسانی",
      code: "HRM-001",
      category: "نرم‌افزار",
      subCategory: "مدیریت سازمانی",
      price: 25000000,
      unit: "عدد",
      stock: 15,
      minStock: 5,
      description:
        "سیستم جامع مدیریت منابع انسانی با قابلیت‌های پیشرفته شامل مدیریت پرسنل، حقوق و دستمزد، حضور و غیاب و ارزیابی عملکرد. این نرم‌افزار با آخرین تکنولوژی‌های روز دنیا توسعه یافته است.",
      specifications: {
        version: "2.1.0",
        platform: "وب، موبایل",
        license: "سالیانه",
        support: "24 ماه",
        "حداقل سیستم مورد نیاز": "CPU Core i5, 8GB RAM",
        "زبان‌های پشتیبانی": "فارسی، انگلیسی",
        امنیت: "SSL, Two-Factor Authentication",
      },
      status: "available",
      company: {
        name: "شرکت فناوری اطلاعات نوآوران",
        description:
          "شرکت پیشرو در زمینه توسعه راهکارهای نرم‌افزاری سازمانی با بیش از ۱۵ سال سابقه",
        contact: {
          phone: "021-88776655",
          email: "sales@novin-it.ir",
          website: "www.novin-it.ir",
          address: "تهران، میدان ونک، برج نگار، طبقه ۸",
        },
        rating: 4.8,
        reviews: 124,
        established: 1385,
        employees: "150-200 نفر",
      },
      features: [
        "مدیریت کامل پرسنل",
        "سیستم حقوق و دستمزد",
        "حضور و غیاب هوشمند",
        "ارزیابی عملکرد",
        "گزارش‌گیری پیشرفته",
        "پشتیبانی 24/7",
      ],
      images: [],
      documents: [
        { name: "کاتالوگ محصول.pdf", type: "pdf", size: "2.1 MB" },
        { name: "راهنمای نصب.pdf", type: "pdf", size: "1.8 MB" },
        { name: "لیست قیمت.pdf", type: "pdf", size: "1.2 MB" },
      ],
      createdAt: "1402/10/15",
      updatedAt: "1402/11/20",
      tags: ["نرم‌افزار", "HR", "مدیریت", "سازمانی"],
    },
    {
      id: 2,
      name: "سیستم اتوماسیون اداری",
      code: "OA-002",
      category: "نرم‌افزار",
      subCategory: "اتوماسیون",
      price: 18000000,
      unit: "عدد",
      stock: 3,
      minStock: 5,
      description:
        "سیستم کامل اتوماسیون اداری با امکانات workflow پیشرفته. امکان مدیریت مکاتبات، بایگانی الکترونیک و گردش کار هوشمند.",
      specifications: {
        version: "1.5.0",
        platform: "وب",
        license: "دائمی",
        support: "12 ماه",
        ماژول‌ها: "مکاتبات، بایگانی، گردش کار",
        "پایگاه داده": "SQL Server, Oracle",
        امنیت: "Role-Based Access Control",
      },
      status: "available",
      company: {
        name: "شرکت راهکارهای هوشمند آریان",
        description: "تخصص در زمینه سیستم‌های اتوماسیون اداری و مدیریت اسناد",
        contact: {
          phone: "021-77998866",
          email: "info@aryan-smart.ir",
          website: "www.aryan-smart.ir",
          address: "اصفهان، شهرک صنعتی موردم، بلوار اصلی، پلاک ۱۲",
        },
        rating: 4.5,
        reviews: 89,
        established: 1390,
        employees: "80-120 نفر",
      },
      features: [
        "مدیریت مکاتبات",
        "بایگانی الکترونیک",
        "گردش کار هوشمند",
        "گزارش‌گیری",
        "جستجوی پیشرفته",
        "امضای الکترونیک",
      ],
      images: [],
      documents: [
        { name: "دموی محصول.mp4", type: "video", size: "15.2 MB" },
        { name: "لیست قابلیت‌ها.pdf", type: "pdf", size: "1.2 MB" },
      ],
      createdAt: "1402/09/20",
      updatedAt: "1402/10/25",
      tags: ["اتوماسیون", "اداری", "workflow", "مدیریت اسناد"],
    },
    {
      id: 3,
      name: "سرور ابری اختصاصی",
      code: "CLOUD-003",
      category: "سخت‌افزار",
      subCategory: "سرور",
      price: 85000000,
      unit: "دستگاه",
      stock: 8,
      minStock: 2,
      description:
        "سرور ابری با قابلیت‌های امنیتی پیشرفته و پشتیبانی ۲۴ ساعته. مناسب برای سازمان‌های بزرگ و حساس.",
      specifications: {
        processor: "Intel Xeon Gold 6314U",
        ram: "64 GB DDR4",
        storage: "2 TB NVMe SSD",
        warranty: "36 ماه",
        شبکه: "10 Gigabit Ethernet",
        "منبع تغذیه": "Redundant 1200W",
        راک: "2U",
      },
      status: "available",
      company: {
        name: "شرکت راهبردهای ابری پارس",
        description:
          "ارائه‌دهنده راهکارهای ابری و زیرساخت‌های شبکه برای سازمان‌های بزرگ",
        contact: {
          phone: "031-44557788",
          email: "sales@pars-cloud.ir",
          website: "www.pars-cloud.ir",
          address: "مشهد، بلوار وکیل‌آباد، مجتمع تجاری الماس، طبقه ۴",
        },
        rating: 4.9,
        reviews: 67,
        established: 1388,
        employees: "200-300 نفر",
      },
      features: [
        "پشتیبانی 24/7",
        "بک‌آپ خودکار",
        "امنیت پیشرفته",
        "مقیاس‌پذیری",
        "مانیتورینگ Real-time",
        "گارانتی طلایی",
      ],
      images: [],
      documents: [
        { name: "دیتاشیت فنی.pdf", type: "pdf", size: "3.1 MB" },
        { name: "گواهی استاندارد.pdf", type: "pdf", size: "1.5 MB" },
      ],
      createdAt: "1402/08/10",
      updatedAt: "1402/11/15",
      tags: ["سرور", "ابری", "زیرساخت", "شبکه"],
    },
    {
      id: 4,
      name: "دستگاه پوز فروشگاهی",
      code: "POS-004",
      category: "سخت‌افزار",
      subCategory: "فروشگاهی",
      price: 3500000,
      unit: "دستگاه",
      stock: 25,
      minStock: 10,
      description:
        "دستگاه پوز هوشمند با قابلیت اتصال به انواع درگاه‌های بانکی و پشتیبانی از کارت‌های عضو شتاب.",
      specifications: {
        screen: "7 اینچ لمسی IPS",
        connectivity: "WiFi, 4G, Ethernet, Bluetooth",
        printer: "حرارتی داخلی 80mm",
        warranty: "24 ماه",
        "سیستم عامل": "Android 11",
        پردازنده: "Octa-core 2.0GHz",
        حافظه: "4GB RAM, 64GB Storage",
      },
      status: "available",
      company: {
        name: "شرکت تجهیزات مالی الکترونیک",
        description:
          "تولید کننده دستگاه‌های پرداخت الکترونیک و تجهیزات فروشگاهی",
        contact: {
          phone: "044-33221100",
          email: "info@efeq.ir",
          website: "www.efeq.ir",
          address: "تبریز، شهرک صنعتی غرب، خیابان اصلی، پلاک ۴۵",
        },
        rating: 4.6,
        reviews: 203,
        established: 1380,
        employees: "300-400 نفر",
      },
      features: [
        "پشتیبانی از شتاب",
        "چاپ فیش خودکار",
        "مدیریت موجودی",
        "گزارش‌گیری فروش",
        "امنیت PCI DSS",
        "آپدیت Over-the-air",
      ],
      images: [],
      documents: [
        { name: "راهنمای کاربری.pdf", type: "pdf", size: "2.8 MB" },
        { name: "کاتالوگ قیمت.pdf", type: "pdf", size: "1.1 MB" },
      ],
      createdAt: "1402/11/05",
      updatedAt: "1403/01/12",
      tags: ["پوز", "فروشگاهی", "درگاه پرداخت", "شتاب"],
    },
    {
      id: 5,
      name: "نرم‌افزار حسابداری شرکتی",
      code: "ACC-005",
      category: "نرم‌افزار",
      subCategory: "مالی",
      price: 45000000,
      unit: "عدد",
      stock: 8,
      minStock: 3,
      description:
        "سیستم حسابداری پیشرفته برای شرکت‌های بزرگ با قابلیت مدیریت چند شرکتی و گزارش‌گیری حرفه‌ای.",
      specifications: {
        version: "3.0.0",
        platform: "دسکتاپ، وب، موبایل",
        license: "دائمی",
        support: "18 ماه",
        استانداردها: "IAS, IFRS",
        "پایگاه داده": "SQL Server, PostgreSQL",
        امنیت: "End-to-End Encryption",
      },
      status: "available",
      company: {
        name: "موسسه نرم‌افزاری حساب رایان",
        description:
          "متخصص در زمینه نرم‌افزارهای مالی و حسابداری با ۲۰ سال سابقه",
        contact: {
          phone: "021-77553344",
          email: "support@hesabrayan.ir",
          website: "www.hesabrayan.ir",
          address: "تهران، خیابان ولیعصر، پلاک ۲۰۰۰، برج سامان",
        },
        rating: 4.7,
        reviews: 156,
        established: 1382,
        employees: "180-250 نفر",
      },
      features: [
        "مدیریت چند شرکتی",
        "کنترل بودجه",
        "صورت‌های مالی",
        "مالیات بر ارزش افزوده",
        "تراز آزمایشی",
        "دسترسی سطحی",
      ],
      images: [],
      documents: [
        { name: "نمونه گزارش‌ها.pdf", type: "pdf", size: "4.2 MB" },
        { name: "لیست ماژول‌ها.pdf", type: "pdf", size: "2.3 MB" },
      ],
      createdAt: "1402/07/15",
      updatedAt: "1402/12/20",
      tags: ["حسابداری", "مالی", "گزارش‌گیری", "شرکتی"],
    },
    {
      id: 6,
      name: "دوربین مداربسته هوشمند",
      code: "CAM-006",
      category: "سخت‌افزار",
      subCategory: "امنیتی",
      price: 2800000,
      unit: "دستگاه",
      stock: 15,
      minStock: 5,
      description:
        "دوربین مداربسته با قابلیت تشخیص چهره، پلاک و حرکت. مناسب برای نظارت هوشمند بر اماکن حساس.",
      specifications: {
        resolution: "4K Ultra HD (3840x2160)",
        storage: "128 GB داخلی + Cloud",
        nightVision: "30 متر IR Vision",
        warranty: "24 ماه",
        "دید در شب": "رنگی Full Color",
        "زاویه دید": "360° Pan-Tilt",
        "هوش مصنوعی": "تشخیص چهره و پلاک",
      },
      status: "available",
      company: {
        name: "شرکت امن‌پردازان هوشمند",
        description: "طراحی و تولید سیستم‌های نظارت تصویری و امنیتی هوشمند",
        contact: {
          phone: "051-36698745",
          email: "sales@amn-pardazan.ir",
          website: "www.amn-pardazan.ir",
          address: "مشهد، بلوار احمدآباد، پلاک ۳۴۵",
        },
        rating: 4.4,
        reviews: 92,
        established: 1392,
        employees: "120-180 نفر",
      },
      features: [
        "تشخیص چهره",
        "تشخیص پلاک",
        "هشدار حرکت",
        "ضبط 24/7",
        "دسترسی از راه دور",
        "ذخیره ابری",
      ],
      images: [],
      documents: [
        { name: "گواهی کیفیت.pdf", type: "pdf", size: "1.9 MB" },
        { name: "نصب و راه‌اندازی.pdf", type: "pdf", size: "2.4 MB" },
      ],
      createdAt: "1402/05/20",
      updatedAt: "1402/10/30",
      tags: ["دوربین", "امنیتی", "هوشمند", "نظارت"],
    },
  ];

  const categories = ["همه دسته‌بندی‌ها", "نرم‌افزار", "سخت‌افزار", "خدمات"];

  const priceRanges = [
    { value: "all", label: "همه قیمت‌ها" },
    { value: "0-5000000", label: "زیر ۵ میلیون" },
    { value: "5000000-20000000", label: "۵ تا ۲۰ میلیون" },
    { value: "20000000-50000000", label: "۲۰ تا ۵۰ میلیون" },
    { value: "50000000-100000000", label: "۵۰ تا ۱۰۰ میلیون" },
    { value: "100000000+", label: "بالای ۱۰۰ میلیون" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setProducts(sampleProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // فیلتر و مرتب‌سازی
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesPrice = () => {
        if (priceRange === "all") return true;
        if (priceRange === "100000000+") return product.price >= 100000000;

        const [min, max] = priceRange.split("-").map(Number);
        return product.price >= min && product.price <= max;
      };

      return matchesSearch && matchesCategory && matchesPrice();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "rating":
          return b.company.rating - a.company.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("فرم تماس:", contactForm);
    alert(
      "پیام شما با موفقیت ارسال شد. تولیدکننده به زودی با شما تماس خواهد گرفت."
    );
    setShowContactModal(false);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  const handleContactClick = (product) => {
    setSelectedProduct(product);
    setShowContactModal(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setPriceRange("all");
    setSortBy("newest");
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection
          tab={
            <div className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] py-2 px-3">
              <span className="text-sm md:text-base whitespace-nowrap">
                کاتالوگ محصولات
              </span>
              <div className="h-full aspect-square md:w-14 md:h-14 bg-blue-500 rounded-[8px] flex justify-center items-center">
                <FaShoppingCart
                  size={"1.2rem"}
                  className="md:size-5 text-white"
                />
              </div>
            </div>
          }
        >
          <div className="w-full h-full flex flex-col gap-6">
            {/* هدر و جستجو */}
            <GlassCard>
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 w-full lg:w-auto">
                  <Input
                    type="text"
                    placeholder="جستجو در محصولات، توضیحات یا برچسب‌ها..."
                    value={searchTerm}
                    icon={<FaSearch />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={
                          category === "همه دسته‌بندی‌ها" ? "all" : category
                        }
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی‌ترین</option>
                    <option value="price-high">گران‌ترین</option>
                    <option value="price-low">ارزان‌ترین</option>
                    <option value="rating">بالاترین امتیاز</option>
                    <option value="name">الفبایی</option>
                  </select>

                  {(searchTerm !== "" ||
                    categoryFilter !== "all" ||
                    priceRange !== "all") && (
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

            {/* اطلاعات فیلترها */}
            {(searchTerm !== "" ||
              categoryFilter !== "all" ||
              priceRange !== "all") && (
              <GlassCard className="bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-blue-800 dark:text-blue-300 font-medium">
                    فیلترهای فعال:
                  </span>

                  {searchTerm !== "" && (
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center gap-2">
                      جستجو: {searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </span>
                  )}

                  {categoryFilter !== "all" && (
                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full flex items-center gap-2">
                      دسته‌بندی: {categoryFilter}
                      <button
                        onClick={() => setCategoryFilter("all")}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </span>
                  )}

                  {priceRange !== "all" && (
                    <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full flex items-center gap-2">
                      محدوده قیمت:{" "}
                      {priceRanges.find((r) => r.value === priceRange)?.label}
                      <button
                        onClick={() => setPriceRange("all")}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </GlassCard>
            )}

            {/* نمایش محصولات */}
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--orgin-color)]"></div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <GlassCard className="text-center py-12">
                  <FaBox className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                    هیچ محصولی یافت نشد
                  </h3>
                  <p className="text-gray-400 mb-4">
                    محصولی با مشخصات جستجو شده وجود ندارد.
                  </p>
                  <Button
                    type={1}
                    label="پاک کردن فیلترها"
                    onClick={clearFilters}
                  />
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <GlassCard
                      key={product.id}
                      className="hover:scale-[1.02] transition-all duration-300 border border-gray-600/50 hover:border-blue-500/30 relative group"
                    >
                      {/* نشانگر مورد علاقه */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 left-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        {favorites.has(product.id) ? (
                          <FaHeart className="text-red-500" size={16} />
                        ) : (
                          <FaRegHeart className="text-gray-400" size={16} />
                        )}
                      </button>

                      <div className="p-6">
                        {/* هدر کارت */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                              <FaBox size={20} />
                            </div>
                            <div className="text-right">
                              <h3 className="font-bold text-[var(--text-color)] text-lg leading-tight">
                                {product.name}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">
                                {product.category} • {product.subCategory}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* اطلاعات محصول */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <FaTag className="text-blue-400" />
                              <span>کد: {product.code}</span>
                            </div>
                            <div className="text-lg font-bold text-[var(--text-color)]">
                              {formatPrice(product.price)}
                            </div>
                          </div>

                          {/* امتیاز شرکت */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(product.company.rating)}
                              </div>
                              <span className="text-sm text-gray-400">
                                ({product.company.reviews} نظر)
                              </span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {product.status === "available"
                                ? "موجود"
                                : "ناموجود"}
                            </span>
                          </div>
                        </div>

                        {/* توضیحات مختصر */}
                        <div className="mb-4">
                          <p className="text-[var(--text-color)] text-sm leading-6 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* برچسب‌ها */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {product.tags.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{product.tags.length - 3} بیشتر
                            </span>
                          )}
                        </div>

                        {/* اطلاعات شرکت تولیدکننده */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                              <FaBuilding size={14} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-[var(--text-color)]">
                                {product.company.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {product.company.employees} • تاسیس{" "}
                                {product.company.established}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* اقدامات */}
                        <div className="flex gap-3">
                          <Button
                            type={1}
                            label="تماس با تولیدکننده"
                            icon={<FaPhone />}
                            className="flex-1"
                            onClick={() => handleContactClick(product)}
                          />
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowProductModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                          >
                            <FaEye size={14} />
                            مشاهده
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>

            {/* اطلاعات پایین صفحه */}
            {!loading && filteredProducts.length > 0 && (
              <GlassCard>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>تعداد محصولات: {filteredProducts.length}</span>
                    <span className="flex items-center gap-1">
                      <FaBox className="text-blue-400" />
                      {
                        filteredProducts.filter(
                          (p) => p.category === "نرم‌افزار"
                        ).length
                      }{" "}
                      نرم‌افزار
                    </span>
                    <span className="flex items-center gap-1">
                      <FaIndustry className="text-green-400" />
                      {
                        filteredProducts.filter(
                          (p) => p.category === "سخت‌افزار"
                        ).length
                      }{" "}
                      سخت‌افزار
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <FaShare size={14} />
                      اشتراک‌گذاری
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                      <FaHeart size={14} />
                      مورد علاقه ({favorites.size})
                    </button>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </DashboardSection>

        {/* مودال مشاهده جزئیات محصول */}
        <Modal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          title="مشخصات کامل محصول"
          size="xl"
        >
          {selectedProduct && (
            <div className="space-y-6">
              {/* اطلاعات اصلی */}
              <GlassCard>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <FaBox size={24} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[var(--text-color)]">
                        {selectedProduct.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="text-gray-400 text-sm">
                          <FaTag className="inline ml-1" />
                          کد: {selectedProduct.code}
                        </span>
                        <span className="text-gray-400 text-sm">
                          <FaIndustry className="inline ml-1" />
                          {selectedProduct.category} •{" "}
                          {selectedProduct.subCategory}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      وضعیت موجودی
                    </label>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedProduct.status === "available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-[var(--text-color)]">
                        {selectedProduct.status === "available"
                          ? "موجود در انبار"
                          : "ناموجود"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      واحد فروش
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedProduct.unit}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* اطلاعات شرکت تولیدکننده */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                  <FaBuilding className="text-orange-500" />
                  اطلاعات تولیدکننده
                </h3>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                      <FaBuilding size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[var(--text-color)] text-lg">
                        {selectedProduct.company.name}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {selectedProduct.company.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>
                          ⭐ {selectedProduct.company.rating} (
                          {selectedProduct.company.reviews} نظر)
                        </span>
                        <span>👥 {selectedProduct.company.employees}</span>
                        <span>
                          📅 تاسیس {selectedProduct.company.established}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <FaPhone className="inline ml-1" />
                      تلفن
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedProduct.company.contact.phone}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <FaEnvelope className="inline ml-1" />
                      ایمیل
                    </label>
                    <div className="text-[var(--text-color)]">
                      {selectedProduct.company.contact.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <FaBuilding className="inline ml-1" />
                      وبسایت
                    </label>
                    <div className="text-blue-600">
                      <a
                        href={`https://${selectedProduct.company.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedProduct.company.contact.website}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <FaMapMarkerAlt className="inline ml-1" />
                      آدرس
                    </label>
                    <div className="text-[var(--text-color)] text-sm">
                      {selectedProduct.company.contact.address}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* ویژگی‌های محصول */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  ویژگی‌های اصلی
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span className="text-[var(--text-color)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* مشخصات فنی */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  مشخصات فنی
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedProduct.specifications).map(
                    ([key, value]) =>
                      value && (
                        <div
                          key={key}
                          className="border-b border-gray-200 pb-2"
                        >
                          <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                            {key}
                          </label>
                          <p className="text-[var(--text-color)]">{value}</p>
                        </div>
                      )
                  )}
                </div>
              </GlassCard>

              {/* توضیحات کامل */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  توضیحات کامل
                </h3>
                <p className="text-[var(--text-color)] leading-7">
                  {selectedProduct.description}
                </p>
              </GlassCard>

              {/* مدارک و فایل‌ها */}
              {selectedProduct.documents &&
                selectedProduct.documents.length > 0 && (
                  <GlassCard>
                    <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                      مدارک و فایل‌های قابل دانلود
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[var(--bg-color2)] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FaBox className="text-gray-400" />
                            <div>
                              <div className="text-[var(--text-color)] font-medium">
                                {doc.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {doc.size}
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
                  </GlassCard>
                )}

              {/* دکمه‌های اقدام */}
              <div className="flex gap-3 pt-4 border-t border-gray-600">
                <Button
                  type={1}
                  label="تماس با تولیدکننده"
                  icon={<FaPhone />}
                  className="flex-1"
                  onClick={() => {
                    setShowProductModal(false);
                    setShowContactModal(true);
                  }}
                />
                <Button
                  type={2}
                  label="افزودن به علاقه‌مندی‌ها"
                  icon={
                    favorites.has(selectedProduct.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )
                  }
                  className="flex-1"
                  onClick={() => toggleFavorite(selectedProduct.id)}
                />
              </div>
            </div>
          )}
        </Modal>

        {/* مودال تماس با تولیدکننده */}
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title="تماس با تولیدکننده"
          size="md"
        >
          {selectedProduct && (
            <div className="space-y-6">
              {/* اطلاعات تولیدکننده */}
              <GlassCard className="bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    <FaBuilding size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-color)]">
                      {selectedProduct.company.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      تولیدکننده: {selectedProduct.name}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* اطلاعات تماس مستقیم */}
              <GlassCard>
                <h4 className="font-bold text-[var(--text-color)] mb-3">
                  اطلاعات تماس مستقیم
                </h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">تلفن:</span>
                    <span className="text-[var(--text-color)] font-mono">
                      {selectedProduct.company.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">ایمیل:</span>
                    <span className="text-[var(--text-color)]">
                      {selectedProduct.company.contact.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">وبسایت:</span>
                    <a
                      href={`https://${selectedProduct.company.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedProduct.company.contact.website}
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* فرم تماس */}
              <GlassCard>
                <h4 className="font-bold text-[var(--text-color)] mb-4">
                  ارسال پیام به تولیدکننده
                </h4>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="نام و نام خانوادگی"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="نام کامل خود را وارد کنید"
                      icon={<FaUser />}
                      required
                    />
                    <Input
                      label="شرکت"
                      value={contactForm.company}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="نام شرکت یا سازمان"
                      icon={<FaBuilding />}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ایمیل"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="email@example.com"
                      icon={<FaEnvelope />}
                      required
                    />
                    <Input
                      label="تلفن تماس"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="09xxxxxxxxx"
                      icon={<FaPhone />}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      پیام شما
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder={`سلام، من علاقه‌مند به محصول "${selectedProduct.name}" هستم. لطفاً اطلاعات بیشتری ارسال کنید.`}
                      rows={4}
                      className="w-full bg-[var(--bg-color2)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <FaInfoCircle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-800 text-sm">
                        پیام شما مستقیماً برای تولیدکننده ارسال می‌شود و معمولاً
                        در کمتر از ۲۴ ساعت پاسخ داده می‌شود.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type={1}
                      label="ارسال پیام"
                      icon={<FaEnvelope />}
                      className="flex-1"
                      onClick={handleContactSubmit}
                    />
                    <Button
                      type={3}
                      label="انصراف"
                      className="flex-1"
                      onClick={() => setShowContactModal(false)}
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

export default ProductsCatalogPage;
