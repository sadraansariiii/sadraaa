"use client";

import DashboardSection from "@/src/components/layout/dashboardSection";
import GlassCard from "@/src/components/layout/glassCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ✅ ثبت ماژول‌های Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ParkDashboard = () => {
  const chartData = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: [
      {
        label: "شرکت‌های فعال",
        data: [30, 50, 70, 60, 80, 100],
        borderColor: "#ff7300",
        backgroundColor: "#ff730030",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        fill: true,
      },
      {
        label: "ارزیابی کامل‌شده",
        data: [15, 25, 40, 35, 55, 75],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.3)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  // ⚙️ تنظیمات ظاهری چارت
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ccc",
          font: { family: "IRANSans, sans-serif", size: 13 },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        borderRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "#bbb" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#bbb" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  const StatCard = ({ title, value, icon }) => (
    <GlassCard className="relative overflow-hidden h-full">
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center 
            bg-[var(--orgin-color)] border border-[var(--orgin-color)]/30 
            shadow-lg transition-all duration-300 relative overflow-hidden`}
          >
            {icon}
          </div>
          <div className="text-right flex-1 mr-3">
            <div className="text-xl font-bold text-[var(--text-color)] mb-1">
              {value}
            </div>
            <div className="text-sm text-gray-400 font-medium">{title}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <DashboardSection>
      <div className="w-full h-full flex flex-col gap-6">
        {/* هدر */}
        <GlassCard className="overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--orgin-color)]/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--orgin-color)]/10 rounded-full -translate-x-12 translate-y-12"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--orgin-color)] to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl relative overflow-hidden">
                <FaChartLine size={24} />
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl animate-ping"></div>
              </div>
              <div>
                <h1 className="text-[12px] xl:text-[20px] font-bold text-[var(--text-color)] mb-1">
                  داشبورد مدیریت پارک (نام پارک)
                </h1>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="شرکت‌های ثبت‌نام شده"
            value={20}
            icon={<FaBuilding className="text-white text-xl" />}
          />
          <StatCard
            title="ارزیابی کامل شده"
            value={40}
            icon={<FaCheckCircle className="text-white text-xl" />}
          />
          <StatCard
            title="شرکت‌های ناقص"
            value={60}
            icon={<FaExclamationTriangle className="text-white text-xl" />}
          />
          <StatCard
            title="شرکت‌های فعال"
            value={80}
            icon={<FaBuilding className="text-white text-xl" />}
          />
        </div>

        {/* 📊 چارت از Chart.js - عرض کامل */}
        <GlassCard className="overflow-hidden p-6 w-full">
          <h2 className="text-xl font-semibold text-[var(--text-color)] mb-6">
            روند تغییرات شرکت‌ها و ارزیابی‌ها
          </h2>
          <div className="w-full h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* ستون سمت چپ - فعالیت‌های اخیر */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">
            فعالیت‌های اخیر
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-600/20 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-[var(--orgin-color)] rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--text-color)]">
                  شرکت جدید ثبت شد
                </div>
                <div className="text-xs text-gray-400">۲ دقیقه پیش</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-600/20 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-[var(--orgin-color)] rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--text-color)]">
                  ارزیابی تکمیل شد
                </div>
                <div className="text-xs text-gray-400">۱۵ دقیقه پیش</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-600/20 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-[var(--orgin-color)] rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--text-color)]">
                  نیاز به پیگیری
                </div>
                <div className="text-xs text-gray-400">۱ ساعت پیش</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardSection>
  );
};

export default ParkDashboard;
