"use client";

import { useState, useEffect } from "react";
import {
  FaBox,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
  FaTag,
  FaDollarSign,
  FaBoxOpen,
  FaIndustry,
  FaCalendar,
  FaInfoCircle,
  FaUpload,
  FaFileExcel,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import Modal from "@/src/components/layout/Modal";
import GlassCard from "@/src/components/layout/glassCard";
import SectionTitle from "@/src/components/ui/title";
import AccessGuard from "@/src/components/AccessGuard";

const ProductsManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [excelFile, setExcelFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // داده‌های نمونه برای محصولات
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
      description: "سیستم جامع مدیریت منابع انسانی با قابلیت‌های پیشرفته",
      specifications: {
        version: "2.1.0",
        platform: "وب، موبایل",
        license: "سالیانه",
        support: "24 ماه",
      },
      status: "available", // available, low-stock, out-of-stock, discontinued
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/10/15",
      updatedAt: "1402/11/20",
      images: [],
      documents: [
        { name: "کاتالوگ محصول.pdf", type: "pdf", size: "2.1 MB" },
        { name: "راهنمای نصب.pdf", type: "pdf", size: "1.8 MB" },
      ],
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
      description: "سیستم کامل اتوماسیون اداری با امکانات workflow",
      specifications: {
        version: "1.5.0",
        platform: "وب",
        license: "دائمی",
        support: "12 ماه",
      },
      status: "low-stock",
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/09/20",
      updatedAt: "1402/10/25",
      images: [],
      documents: [
        { name: "دموی محصول.mp4", type: "video", size: "15.2 MB" },
        { name: "لیست قابلیت‌ها.pdf", type: "pdf", size: "1.2 MB" },
      ],
    },
    {
      id: 3,
      name: "سرور ابری اختصاصی",
      code: "CLOUD-003",
      category: "سخت‌افزار",
      subCategory: "سرور",
      price: 85000000,
      unit: "دستگاه",
      stock: 0,
      minStock: 2,
      description: "سرور ابری با قابلیت‌های امنیتی پیشرفته",
      specifications: {
        processor: "Intel Xeon Gold",
        ram: "64 GB",
        storage: "2 TB SSD",
        warranty: "36 ماه",
      },
      status: "out-of-stock",
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/08/10",
      updatedAt: "1402/11/15",
      images: [],
      documents: [
        { name: "دیتاشیت فنی.pdf", type: "pdf", size: "3.1 MB" },
        { name: "گواهی استاندارد.pdf", type: "pdf", size: "1.5 MB" },
      ],
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
      description: "دستگاه پوز هوشمند با قابلیت اتصال به انواع درگاه‌های بانکی",
      specifications: {
        screen: "7 اینچ لمسی",
        connectivity: "WiFi, 4G, Ethernet",
        printer: "حرارتی داخلی",
        warranty: "24 ماه",
      },
      status: "available",
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/11/05",
      updatedAt: "1403/01/12",
      images: [],
      documents: [
        { name: "راهنمای کاربری.pdf", type: "pdf", size: "2.8 MB" },
        { name: "کاتالوگ قیمت.pdf", type: "pdf", size: "1.1 MB" },
      ],
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
      description: "سیستم حسابداری پیشرفته برای شرکت‌های بزرگ",
      specifications: {
        version: "3.0.0",
        platform: "دسکتاپ، وب",
        license: "دائمی",
        support: "18 ماه",
      },
      status: "available",
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/07/15",
      updatedAt: "1402/12/20",
      images: [],
      documents: [
        { name: "نمونه گزارش‌ها.pdf", type: "pdf", size: "4.2 MB" },
        { name: "لیست ماژول‌ها.pdf", type: "pdf", size: "2.3 MB" },
      ],
    },
    {
      id: 6,
      name: "دوربین مداربسته هوشمند",
      code: "CAM-006",
      category: "سخت‌افزار",
      subCategory: "امنیتی",
      price: 2800000,
      unit: "دستگاه",
      stock: 0,
      minStock: 5,
      description: "دوربین مداربسته با قابلیت تشخیص چهره و پلاک",
      specifications: {
        resolution: "4K Ultra HD",
        storage: "128 GB داخلی",
        nightVision: "30 متر",
        warranty: "24 ماه",
      },
      status: "discontinued",
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: "1402/05/20",
      updatedAt: "1402/10/30",
      images: [],
      documents: [
        { name: "گواهی کیفیت.pdf", type: "pdf", size: "1.9 MB" },
        { name: "نصب و راه‌اندازی.pdf", type: "pdf", size: "2.4 MB" },
      ],
    },
  ];

  // داده‌های فرم جدید
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    category: "",
    subCategory: "",
    price: "",
    unit: "",
    stock: "",
    minStock: "",
    description: "",
    specifications: {
      version: "",
      platform: "",
      license: "",
      support: "",
    },
    status: "available",
  });

  // دسته‌بندی‌های نمونه
  const categories = [
    {
      value: "نرم‌افزار",
      subCategories: [
        "مدیریت سازمانی",
        "اتوماسیون",
        "مالی",
        "فروش",
        "پشتیبانی",
      ],
    },
    {
      value: "سخت‌افزار",
      subCategories: ["سرور", "فروشگاهی", "امنیتی", "شبکه", "ذخیره‌سازی"],
    },
    {
      value: "خدمات",
      subCategories: ["مشاوره", "پشتیبانی", "آموزش", "طراحی", "برنامه‌نویسی"],
    },
  ];

  const units = ["عدد", "دستگاه", "بسته", "مجوز", "سرویس"];

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
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // عملیات مدیریت محصولات
  const addNewProduct = () => {
    const product = {
      id: Date.now(),
      ...newProduct,
      company: "شرکت فناوری اطلاعات نوآوران",
      createdAt: new Date().toLocaleDateString("fa-IR"),
      updatedAt: new Date().toLocaleDateString("fa-IR"),
      images: [],
      documents: [],
    };

    setProducts((prev) => [product, ...prev]);
    setShowAddModal(false);
    resetNewProductForm();
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...updatedData,
              updatedAt: new Date().toLocaleDateString("fa-IR"),
            }
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const resetNewProductForm = () => {
    setNewProduct({
      name: "",
      code: "",
      category: "",
      subCategory: "",
      price: "",
      unit: "",
      stock: "",
      minStock: "",
      description: "",
      specifications: {
        version: "",
        platform: "",
        license: "",
        support: "",
      },
      status: "available",
    });
  };

  // عملیات اکسل
  const handleDownloadExcel = () => {
    console.log("دانلود فایل اکسل محصولات");
    // شبیه‌سازی دانلود فایل اکسل
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        setExcelFile(file);
      } else {
        alert("لطفاً یک فایل اکسل معتبر انتخاب کنید (xlsx یا xls)");
      }
    }
  };

  const handleUploadExcel = async () => {
    if (!excelFile) {
      alert("لطفاً یک فایل انتخاب کنید");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // شبیه‌سازی آپلود فایل
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          setTimeout(() => {
            setShowUploadModal(false);
            setExcelFile(null);
            setUploadProgress(0);
            alert("فایل با موفقیت آپلود و پردازش شد");
          }, 1000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaCheckCircle size={12} />
            موجود
          </span>
        );
      case "low-stock":
        return (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaInfoCircle size={12} />
            کمبود موجودی
          </span>
        );
      case "out-of-stock":
        return (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaTimesCircle size={12} />
            ناموجود
          </span>
        );
      case "discontinued":
        return (
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaTimesCircle size={12} />
            متوقف شده
          </span>
        );
      default:
        return null;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= minStock) return "low-stock";
    return "available";
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection
          tab={
            <div
              onClick={() => setShowAddModal(true)}
              className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] cursor-pointer transition-colors py-2 px-3"
            >
              <span className="text-sm md:text-base whitespace-nowrap">
                افزودن محصول جدید
              </span>
              <button className="h-full aspect-square md:w-14 md:h-14 bg-[var(--orgin-color)] rounded-[8px] flex justify-center items-center cursor-pointer ">
                <FiPlus size={"1.2rem"} className="md:size-5" />
              </button>
            </div>
          }
        >
          <div className="w-full h-full flex flex-col gap-6">
            {/* فیلترها و جستجو */}
            <GlassCard>
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 w-full lg:w-auto">
                  <Input
                    type="text"
                    placeholder="جستجو در محصولات..."
                    value={searchTerm}
                    icon={<FaSearch />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="available">موجود</option>
                    <option value="low-stock">کمبود موجودی</option>
                    <option value="out-of-stock">ناموجود</option>
                    <option value="discontinued">متوقف شده</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-[var(--bg-color)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm min-w-[150px]"
                  >
                    <option value="all">همه دسته‌بندی‌ها</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.value}
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
                    <option value="name">بر اساس نام</option>
                    <option value="price-high">گران‌ترین</option>
                    <option value="price-low">ارزان‌ترین</option>
                  </select>

                  {/* دکمه‌های اکسل */}
                  <div className="flex items-center gap-2">
                    {/* دکمه دانلود اکسل با راهنما */}
                    <div className="relative group">
                      <button
                        onClick={handleDownloadExcel}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors relative z-10"
                        title="دانلود خروجی اکسل"
                      >
                        <FaFileExcel size={16} />
                        <span className="text-sm">خروجی Excel</span>
                      </button>
                      <div className="w-[280px] absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none break-words whitespace-normal leading-relaxed z-[9999]">
                        <div className="flex items-start gap-2">
                          <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>دانلود لیست محصولات در قالب Excel</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                      </div>
                    </div>

                    {/* دکمه آپلود اکسل با راهنما */}
                    <div className="relative group">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors relative z-10"
                        title="آپلود فایل اکسل"
                      >
                        <FaUpload size={16} />
                        <span className="text-sm">ورودی Excel</span>
                      </button>
                      <div className="w-[200px] absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none break-words whitespace-normal leading-relaxed z-[9999]">
                        <div className="flex items-start gap-2">
                          <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>آپلود لیست محصولات از فایل Excel</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* نمایش کارتی برای md و کوچکتر */}
            <div className="block xl:hidden flex-1 overflow-auto">
              <GlassCard className="h-full">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--orgin-color)]"></div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center text-[var(--text-color)] py-12">
                    <FaBox className="text-4xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">
                      هیچ محصولی یافت نشد
                    </h3>
                    <p className="text-gray-400">
                      محصولی با مشخصات جستجو شده وجود ندارد.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <GlassCard
                        key={product.id}
                        className="hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-[var(--orgin-color)]/30"
                      >
                        <div
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductModal(true);
                          }}
                          className="p-6"
                        >
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
                            {getStatusBadge(product.status)}
                          </div>

                          {/* اطلاعات محصول */}
                          <div className="grid grid-cols-1 gap-4 mb-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                  <FaTag className="text-blue-400" size={14} />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-400 text-xs">
                                    کد محصول
                                  </div>
                                  <div className="text-[var(--text-color)] text-sm font-mono">
                                    {product.code}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                  <FaDollarSign
                                    className="text-green-400"
                                    size={14}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-400 text-xs">
                                    قیمت
                                  </div>
                                  <div className="text-[var(--text-color)] text-sm">
                                    {formatPrice(product.price)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                  <FaBoxOpen
                                    className="text-purple-400"
                                    size={14}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-400 text-xs">
                                    موجودی
                                  </div>
                                  <div className="text-[var(--text-color)] text-sm">
                                    {product.stock} {product.unit}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                  <FaCalendar
                                    className="text-orange-400"
                                    size={14}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-400 text-xs">
                                    آخرین بروزرسانی
                                  </div>
                                  <div className="text-[var(--text-color)] text-sm">
                                    {product.updatedAt}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* توضیحات */}
                          {product.description && (
                            <div className="mb-4">
                              <p className="text-[var(--text-color)] text-sm leading-6 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                          )}

                          {/* اقدامات */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <FaIndustry className="text-yellow-400" />
                              <span>{product.company}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* دکمه مشاهده */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(product);
                                  setShowProductModal(true);
                                }}
                                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors group"
                                title="مشاهده جزئیات"
                              >
                                <FaEye
                                  className="text-blue-400 group-hover:scale-110 transition-transform"
                                  size={16}
                                />
                              </button>

                              {/* دکمه ویرایش */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // تابع ویرایش محصول
                                }}
                                className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors group"
                                title="ویرایش محصول"
                              >
                                <FaEdit
                                  className="text-yellow-400 group-hover:scale-110 transition-transform"
                                  size={16}
                                />
                              </button>

                              {/* دکمه حذف */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    window.confirm(
                                      "آیا از حذف این محصول اطمینان دارید؟"
                                    )
                                  ) {
                                    deleteProduct(product.id);
                                  }
                                }}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                                title="حذف محصول"
                              >
                                <FaTrash
                                  className="text-red-400 group-hover:scale-110 transition-transform"
                                  size={16}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>

            {/* نمایش جدولی برای xl و بزرگتر */}
            <div className="hidden xl:block flex-1 min-h-0">
              <GlassCard className="h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-auto">
                    {loading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--orgin-color)]"></div>
                      </div>
                    ) : filteredProducts.length === 0 ? (
                      <div className="text-center text-[var(--text-color)] py-12">
                        <FaBox className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">
                          هیچ محصولی یافت نشد
                        </h3>
                        <p className="text-gray-400">
                          محصولی با مشخصات جستجو شده وجود ندارد.
                        </p>
                      </div>
                    ) : (
                      <table className="w-full min-w-[1200px]">
                        <thead className="sticky top-0 bg-[var(--bg-color2)] z-10">
                          <tr className="border-b border-gray-600">
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                <FaBox className="text-blue-400" />
                                نام محصول
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                <FaTag className="text-purple-400" />
                                کد محصول
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                <FaIndustry className="text-orange-400" />
                                دسته‌بندی
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                <FaDollarSign className="text-green-400" />
                                قیمت
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                <FaBoxOpen className="text-yellow-400" />
                                موجودی
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              وضعیت
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              تاریخ ایجاد
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              اقدامات
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredProducts.map((product, index) => (
                            <tr
                              key={product.id}
                              className={`
                              border-b border-gray-600/50 transition-all cursor-pointer
                              hover:bg-[var(--bg-color)]/50
                              ${
                                index % 2 === 0
                                  ? "bg-[var(--bg-color2)]/30"
                                  : ""
                              }
                            `}
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowProductModal(true);
                              }}
                            >
                              <td className="py-4 px-4">
                                <SectionTitle
                                  type={2}
                                  icon={<FaBox size={16} />}
                                  title={product.name}
                                  subTitle={product.subCategory}
                                />
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-[var(--text-color)] text-sm font-mono">
                                  {product.code}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-[var(--text-color)] text-sm">
                                  {product.category}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-[var(--text-color)] text-sm">
                                  {formatPrice(product.price)}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-[var(--text-color)] text-sm">
                                  {product.stock} {product.unit}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                {getStatusBadge(product.status)}
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-[var(--text-color)] text-sm">
                                  {product.createdAt}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedProduct(product);
                                      setShowProductModal(true);
                                    }}
                                    className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                                    title="مشاهده جزئیات"
                                  >
                                    <FaEye
                                      className="text-blue-400"
                                      size={14}
                                    />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // تابع ویرایش محصول
                                    }}
                                    className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors"
                                    title="ویرایش محصول"
                                  >
                                    <FaEdit
                                      className="text-yellow-400"
                                      size={14}
                                    />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        window.confirm(
                                          "آیا از حذف این محصول اطمینان دارید؟"
                                        )
                                      ) {
                                        deleteProduct(product.id);
                                      }
                                    }}
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                    title="حذف محصول"
                                  >
                                    <FaTrash
                                      className="text-red-400"
                                      size={14}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* پایین جدول - اطلاعات آماری */}
                {!loading && filteredProducts.length > 0 && (
                  <div className="border-t border-gray-600 px-4 py-3">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span>تعداد کل: {filteredProducts.length} محصول</span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          موجود:{" "}
                          {
                            filteredProducts.filter(
                              (p) => p.status === "available"
                            ).length
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          کمبود موجودی:{" "}
                          {
                            filteredProducts.filter(
                              (p) => p.status === "low-stock"
                            ).length
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          ناموجود:{" "}
                          {
                            filteredProducts.filter(
                              (p) => p.status === "out-of-stock"
                            ).length
                          }
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2 lg:mt-0">
                        <button className="flex items-center gap-2 hover:text-[var(--orgin-color)] transition-colors">
                          <FaShoppingCart size={14} />
                          گزارش فروش
                        </button>
                        <button className="flex items-center gap-2 hover:text-[var(--orgin-color)] transition-colors">
                          <FaBoxOpen size={14} />
                          موجودی انبار
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </DashboardSection>

        {/* مودال مشاهده جزئیات محصول */}
        <Modal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          title="مشخصات محصول"
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
                    <div>
                      <h2 className="text-xl font-bold text-[var(--text-color)]">
                        {selectedProduct.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        {getStatusBadge(selectedProduct.status)}
                        <span className="text-gray-400 text-sm">
                          <FaCalendar className="inline ml-1" />
                          ایجاد: {selectedProduct.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      کد محصول
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)] font-mono">
                      <FaTag className="text-purple-400" />
                      {selectedProduct.code}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      دسته‌بندی
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaIndustry className="text-orange-400" />
                      {selectedProduct.category}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      زیردسته
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaBox className="text-blue-400" />
                      {selectedProduct.subCategory}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      قیمت
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaDollarSign className="text-green-400" />
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* اطلاعات موجودی */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  اطلاعات موجودی
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      موجودی فعلی
                    </label>
                    <p className="text-[var(--text-color)] text-lg font-bold">
                      {selectedProduct.stock} {selectedProduct.unit}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      حداقل موجودی
                    </label>
                    <p className="text-[var(--text-color)]">
                      {selectedProduct.minStock} {selectedProduct.unit}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      وضعیت
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedProduct.status)}
                    </div>
                  </div>
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
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                            {key}
                          </label>
                          <p className="text-[var(--text-color)]">{value}</p>
                        </div>
                      )
                  )}
                </div>
              </GlassCard>

              {/* توضیحات */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  توضیحات
                </h3>
                <p className="text-[var(--text-color)] leading-7">
                  {selectedProduct.description}
                </p>
              </GlassCard>

              {/* مدارک */}
              {selectedProduct.documents &&
                selectedProduct.documents.length > 0 && (
                  <GlassCard>
                    <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                      مدارک و فایل‌ها
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
            </div>
          )}
        </Modal>

        {/* مودال افزودن محصول جدید */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetNewProductForm();
          }}
          title="افزودن محصول جدید"
          size="xl"
        >
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                اطلاعات اصلی محصول
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="نام محصول"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="نام کامل محصول"
                  required
                />
                <Input
                  label="کد محصول"
                  value={newProduct.code}
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, code: e.target.value }))
                  }
                  placeholder="کد منحصر به فرد محصول"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    دسته‌بندی اصلی
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        category: e.target.value,
                        subCategory: "", // Reset subcategory when main category changes
                      }))
                    }
                    className="w-full bg-[var(--bg-color2)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm"
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    زیردسته
                  </label>
                  <select
                    value={newProduct.subCategory}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        subCategory: e.target.value,
                      }))
                    }
                    className="w-full bg-[var(--bg-color2)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm"
                    required
                    disabled={!newProduct.category}
                  >
                    <option value="">انتخاب کنید</option>
                    {newProduct.category &&
                      categories
                        .find((cat) => cat.value === newProduct.category)
                        ?.subCategories.map((subCat) => (
                          <option key={subCat} value={subCat}>
                            {subCat}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                اطلاعات مالی و موجودی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="قیمت (تومان)"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="قیمت محصول"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    واحد اندازه‌گیری
                  </label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                    className="w-full bg-[var(--bg-color2)] border border-gray-600 rounded-lg px-3 py-2 text-[var(--text-color)] text-sm"
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="موجودی اولیه"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      stock: e.target.value,
                    }))
                  }
                  placeholder="تعداد موجودی"
                  required
                />
                <Input
                  label="حداقل موجودی"
                  type="number"
                  value={newProduct.minStock}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      minStock: e.target.value,
                    }))
                  }
                  placeholder="حداقل موجودی مجاز"
                  required
                />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                مشخصات فنی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="ورژن"
                  value={newProduct.specifications.version}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      specifications: {
                        ...prev.specifications,
                        version: e.target.value,
                      },
                    }))
                  }
                  placeholder="ورژن محصول"
                />
                <Input
                  label="پلتفرم"
                  value={newProduct.specifications.platform}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      specifications: {
                        ...prev.specifications,
                        platform: e.target.value,
                      },
                    }))
                  }
                  placeholder="پلتفرم‌های قابل اجرا"
                />
                <Input
                  label="لایسنس"
                  value={newProduct.specifications.license}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      specifications: {
                        ...prev.specifications,
                        license: e.target.value,
                      },
                    }))
                  }
                  placeholder="نوع لایسنس"
                />
                <Input
                  label="پشتیبانی"
                  value={newProduct.specifications.support}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      specifications: {
                        ...prev.specifications,
                        support: e.target.value,
                      },
                    }))
                  }
                  placeholder="مدت پشتیبانی"
                />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                توضیحات
              </h3>
              <Input
                type="textarea"
                rows={4}
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="توضیحات کامل درباره محصول"
              />
            </GlassCard>

            <div className="flex gap-3 justify-between">
              <Button
                type={3}
                label="انصراف"
                onClick={() => {
                  setShowAddModal(false);
                  resetNewProductForm();
                }}
              />
              <Button
                type={1}
                label="افزودن محصول"
                icon={<FaPlus />}
                onClick={addNewProduct}
                disabled={
                  !newProduct.name || !newProduct.code || !newProduct.category
                }
              />
            </div>
          </div>
        </Modal>

        {/* مودال آپلود اکسل */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => {
            setShowUploadModal(false);
            setExcelFile(null);
            setUploadProgress(0);
            setIsUploading(false);
          }}
          title="آپلود فایل Excel محصولات"
          size="md"
        >
          <div className="space-y-6">
            <GlassCard>
              <div className="text-center mb-4">
                <FaFileExcel className="text-green-500 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[var(--text-color)]">
                  آپلود فایل اکسل محصولات
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  فایل Excel حاوی اطلاعات محصولات را انتخاب کنید
                </p>
              </div>

              <div className="space-y-4">
                {/* منطقه کشیدن و رها کردن فایل */}
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[var(--orgin-color)] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="excel-file-input"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="excel-file-input"
                    className="cursor-pointer block"
                  >
                    <FaUpload className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-[var(--text-color)] font-medium">
                      {excelFile
                        ? excelFile.name
                        : "کلیک کنید یا فایل را اینجا رها کنید"}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      فرمت‌های مجاز: XLSX, XLS
                    </p>
                  </label>
                </div>

                {/* اطلاعات فایل انتخاب شده */}
                {excelFile && (
                  <div className="bg-[var(--bg-color2)] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaFileExcel className="text-green-500" />
                        <div>
                          <p className="text-[var(--text-color)] font-medium">
                            {excelFile.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(excelFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExcelFile(null)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        disabled={isUploading}
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* نوار پیشرفت */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>در حال آپلود...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* راهنمای فرمت فایل */}
            <GlassCard>
              <h4 className="font-bold text-[var(--text-color)] mb-3 flex items-center gap-2">
                <FaInfoCircle className="text-blue-400" />
                راهنمای فرمت فایل
              </h4>
              <div className="text-sm text-gray-400 space-y-2">
                <p>• فایل Excel باید شامل ستون‌های زیر باشد:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>نام محصول</li>
                  <li>کد محصول</li>
                  <li>دسته‌بندی</li>
                  <li>قیمت</li>
                  <li>موجودی</li>
                  <li>واحد اندازه‌گیری</li>
                </ul>
                <p className="text-yellow-400 mt-3">
                  توجه: محصولات تکراری به طور خودکار حذف می‌شوند.
                </p>
              </div>
            </GlassCard>

            {/* دکمه‌های اقدام */}
            <div className="flex gap-3 justify-between pt-4">
              <Button
                type={3}
                label="انصراف"
                onClick={() => {
                  setShowUploadModal(false);
                  setExcelFile(null);
                  setUploadProgress(0);
                  setIsUploading(false);
                }}
                disabled={isUploading}
              />
              <Button
                type={1}
                label={isUploading ? "در حال آپلود..." : "آپلود فایل"}
                icon={isUploading ? null : <FaUpload />}
                onClick={handleUploadExcel}
                disabled={!excelFile || isUploading}
                className="min-w-[120px]"
              />
            </div>
          </div>
        </Modal>
      </div>
    </AccessGuard>
  );
};

export default ProductsManagementPage;
