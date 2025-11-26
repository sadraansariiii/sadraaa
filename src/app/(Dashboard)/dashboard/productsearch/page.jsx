"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Select } from "antd";
import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import { FiSearch, FiDownload, FiUpload } from "react-icons/fi";
import { FaChartBar, FaFilter, FaSync } from "react-icons/fa";

const { Option } = Select;

export default function ProductSearchPage() {
  const { clientId, token } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [countries, setCountries] = useState([]);

  // ستون‌های جدول
  const columns = [
    {
      title: "ردیف",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60,
      align: "center",
    },
    {
      title: "ASCode",
      dataIndex: "ascode",
      key: "ascode",
      width: 120,
      render: (text) => (
        <span className="text-blue-400 font-mono text-sm">{text}</span>
      ),
    },
    {
      title: "نام کالا",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <span className="text-white font-medium">{text}</span>
      ),
    },
    {
      title: "دسته‌بندی",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <Tag color="blue" className="text-xs">
          {text}
        </Tag>
      ),
    },
    {
      title: "کشور چین",
      dataIndex: "china",
      key: "china",
      align: "center",
      render: (percent) => renderPercentage(percent, "china"),
    },
    {
      title: "کشور آلمان",
      dataIndex: "germany",
      key: "germany",
      align: "center",
      render: (percent) => renderPercentage(percent, "germany"),
    },
    {
      title: "کشور ترکیه",
      dataIndex: "turkey",
      key: "turkey",
      align: "center",
      render: (percent) => renderPercentage(percent, "turkey"),
    },
    {
      title: "کشور امارات",
      dataIndex: "uae",
      key: "uae",
      align: "center",
      render: (percent) => renderPercentage(percent, "uae"),
    },
    {
      title: "کشور هند",
      dataIndex: "india",
      key: "india",
      align: "center",
      render: (percent) => renderPercentage(percent, "india"),
    },
    {
      title: "میانگین درصد",
      key: "average",
      align: "center",
      render: (record) => {
        const percentages = [record.china, record.germany, record.turkey, record.uae, record.india];
        const validPercentages = percentages.filter(p => p !== null && p !== undefined);
        const average = validPercentages.length > 0 
          ? validPercentages.reduce((a, b) => a + b, 0) / validPercentages.length 
          : 0;
        
        return (
          <div className="flex flex-col items-center">
            <span className={`text-sm font-bold ${
              average >= 70 ? 'text-green-400' : 
              average >= 40 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {average.toFixed(1)}%
            </span>
            <div className="w-16 h-1 bg-gray-600 rounded-full mt-1">
              <div 
                className={`h-full rounded-full ${
                  average >= 70 ? 'bg-green-500' : 
                  average >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(average, 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "عملیات",
      key: "actions",
      align: "center",
      width: 120,
      render: (record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="outline"
            size="small"
            label="نمایش"
            onClick={() => handleViewDetails(record)}
          />
        </div>
      ),
    },
  ];

  // تابع برای نمایش درصد هر کشور
  const renderPercentage = (percent, country) => {
    if (percent === null || percent === undefined) {
      return (
        <span className="text-gray-500 text-xs">--</span>
      );
    }

    const getColor = (value) => {
      if (value >= 70) return "green";
      if (value >= 40) return "orange";
      return "red";
    };

    return (
      <div className="flex flex-col items-center">
        <Tag color={getColor(percent)} className="text-xs font-bold">
          {percent}%
        </Tag>
        <div className="w-12 h-1 bg-gray-600 rounded-full mt-1">
          <div 
            className={`h-full rounded-full bg-${getColor(percent)}-500`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  // دریافت داده‌ها از API
  useEffect(() => {
    if (!clientId || !token) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(BaseUrl("/product/search"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await response.json();
        
        if (data.done && data.data) {
          setProducts(data.data);
          setFilteredProducts(data.data);
          
          // استخراج کشورهای منحصر به فرد
          const uniqueCountries = [...new Set(data.data.flatMap(product => 
            Object.keys(product).filter(key => 
              !['ascode', 'productName', 'category'].includes(key)
            )
          ))];
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [clientId, token]);

  // فیلتر کردن داده‌ها
  useEffect(() => {
    let filtered = products;

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ascode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فیلتر بر اساس کشور
    if (selectedCountry !== "all") {
      filtered = filtered.filter(product => 
        product[selectedCountry] !== null && product[selectedCountry] !== undefined
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCountry, products]);

  // مشاهده جزییات محصول
  const handleViewDetails = (product) => {
    // این تابع می‌تواند یک مودال یا صفحه جزییات را باز کند
    console.log("View product details:", product);
    // می‌توانید از منطق مشابه handleViewSession در صفحه اصلی استفاده کنید
  };

  // خروجی گرفتن از داده‌ها
  const handleExport = () => {
    // منطق خروجی گرفتن از داده‌ها
    console.log("Export data");
  };

  // بارگذاری مجدد داده‌ها
  const handleRefresh = () => {
    // منطق بارگذاری مجدد
    window.location.reload();
  };

  return (
    <DashboardSection
      tab={
        <div className="flex items-center gap-4">
          <Button
            type={1}
            label="خروجی Excel"
            icon={<FiDownload size={16} />}
            onClick={handleExport}
          />
          <Button
            type="outline"
            label="بروزرسانی"
            icon={<FaSync size={14} />}
            onClick={handleRefresh}
          />
        </div>
      }
    >
      <div className="space-y-6">
        {/* هدر و جستجو */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              جستجوی کالا و درصد واردات
            </h2>
            <p className="text-gray-400">
              مشاهده اطلاعات کالاها و درصد واردات از کشورهای مختلف
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-green-400 bg-green-500/20 px-3 py-1 rounded-lg border border-green-500/30">
              <span className="text-sm">
                {filteredProducts.length} کالا
              </span>
            </div>
          </div>
        </div>

        {/* فیلترها و جستجو */}
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <Input
                placeholder="جستجو بر اساس نام کالا، ASCode یا دسته‌بندی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch className="text-gray-400" />}
              />
            </div>
            
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              className="w-full"
              suffixIcon={<FaFilter className="text-gray-400" />}
            >
              <Option value="all">همه کشورها</Option>
              {countries.map(country => (
                <Option key={country} value={country}>
                  {getCountryName(country)}
                </Option>
              ))}
            </Select>
          </div>

          {/* آمار سریع */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {countries.map(country => (
              <div key={country} className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {products.filter(p => p[country] > 0).length}
                </div>
                <div className="text-gray-400 text-sm">
                  {getCountryName(country)}
                </div>
              </div>
            ))}
          </div>

          {/* جدول داده‌ها */}
          <div className="rounded-lg overflow-hidden border border-white/10">
            <Table
              columns={columns}
              dataSource={filteredProducts}
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `نمایش ${range[0]}-${range[1]} از ${total} کالا`,
              }}
              scroll={{ x: 1000 }}
              rowKey="ascode"
              className="custom-table"
            />
          </div>
        </GlassCard>

        {/* راهنما */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <FaChartBar className="text-blue-400" size={14} />
              </div>
              <h4 className="text-white font-semibold">درصد واردات</h4>
            </div>
            <p className="text-gray-400 text-sm">
              اعداد نشان‌دهنده درصد سهم واردات از هر کشور می‌باشد
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">رنگ‌بندی</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400">بالای ۷۰% - عالی</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-gray-400">۴۰% تا ۷۰% - متوسط</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400">زیر ۴۰% - کم</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">ASCode</h4>
            <p className="text-gray-400 text-sm">
              کد یکتا برای شناسایی هر کالا در سیستم
            </p>
          </div>
        </div>
      </div>
    </DashboardSection>
  );
}

// تابع کمکی برای نمایش نام کشورها
function getCountryName(countryCode) {
  const countryNames = {
    china: "چین",
    germany: "آلمان", 
    turkey: "ترکیه",
    uae: "امارات",
    india: "هند",
    usa: "آمریکا",
    japan: "ژاپن",
    korea: "کره جنوبی"
  };
  
  return countryNames[countryCode] || countryCode;
}