// src/components/pages/home/StatsSection.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsSection = () => {
  const ORANGE_COLOR = "#ff7300";
  const GREEN_COLOR = "#10b981";
  
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);

  // داده‌های آمار
  const statsData = [
    { 
      number: 500, 
      label: "کسب‌وکار ارزیابی شده",
      suffix: "+"
    },
    { 
      number: 120, 
      label: "کشور هدف",
      suffix: "+"
    },
    { 
      number: 95, 
      label: "رضایت‌مندی مشتریان",
      suffix: "%"
    },
    { 
      number: 3, 
      label: "رشد درآمد صادراتی",
      suffix: "x"
    }
  ];

  // داده‌های چارت‌ها
  const chartSlides = [
    {
      title: "تحلیل عملکرد صادراتی",
      charts: [
        {
          type: 'line',
          title: 'روند رشد ماهانه کسب‌وکارها',
          data: [
            { month: 'فروردین', value: 50 },
            { month: 'اردیبهشت', value: 85 },
            { month: 'خرداد', value: 120 },
            { month: 'تیر', value: 160 },
            { month: 'مرداد', value: 210 },
            { month: 'شهریور', value: 270 },
            { month: 'مهر', value: 320 },
            { month: 'آبان', value: 380 },
            { month: 'آذر', value: 430 },
            { month: 'دی', value: 470 },
            { month: 'بهمن', value: 490 },
            { month: 'اسفند', value: 500 }
          ],
          color: ORANGE_COLOR
        },
        {
          type: 'bar',
          title: 'رضایت‌مندی مشتریان بر اساس خدمات',
          data: [
            { service: 'ارزیابی', value: 96 },
            { service: 'مشاوره', value: 94 },
            { service: 'تحلیل بازار', value: 92 },
            { service: 'پشتیبانی', value: 98 },
            { service: 'اجرا', value: 95 }
          ],
          color: GREEN_COLOR
        }
      ]
    },
    {
      title: "تحلیل بازارهای هدف",
      charts: [
        {
          type: 'bar',
          title: 'توزیع جغرافیایی بازارهای هدف',
          data: [
            { region: 'خاورمیانه', value: 35 },
            { region: 'اروپا', value: 28 },
            { region: 'آسیا', value: 25 },
            { region: 'آمریکا', value: 15 },
            { region: 'آفریقا', value: 12 },
            { region: 'اقیانوسیه', value: 5 }
          ],
          color: ORANGE_COLOR
        },
        {
          type: 'line',
          title: 'رشد درآمد صادراتی (برحسب فصل)',
          data: [
            { season: 'بهار', value: 1.2 },
            { season: 'تابستان', value: 1.8 },
            { season: 'پاییز', value: 2.4 },
            { season: 'زمستان', value: 3.0 }
          ],
          color: GREEN_COLOR
        }
      ]
    }
  ];

  // انیمیشن شمارش اعداد
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;
    const steps = 20;
    const stepDuration = duration / steps;

    statsData.forEach((stat, index) => {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentValue = Math.floor(stat.number * progress);
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = currentValue;
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = stat.number;
            return newValues;
          });
        }
      }, stepDuration);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  // مشاهده section برای شروع انیمیشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // کامپوننت Tooltip سفارشی
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-bold">{label}</p>
          <p className="text-orange-500">
            {payload[0].value} {payload[0].dataKey === 'value' ? 'مورد' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  // توابع ناوبری اسلایدر
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % chartSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + chartSlides.length) % chartSlides.length);
  };

  // کامپوننت چارت
  const ChartComponent = ({ chart }) => {
    return (
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/20 h-80">
        <h4 className="text-lg font-bold text-white text-center mb-4">
          {chart.title}
        </h4>
        <ResponsiveContainer width="100%" height="85%">
          {chart.type === 'line' ? (
            <LineChart data={chart.data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey={chart.data[0].hasOwnProperty('month') ? 'month' : 
                        chart.data[0].hasOwnProperty('season') ? 'season' : 'region'} 
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chart.color}
                strokeWidth={3}
                dot={{ fill: chart.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: chart.color }}
              />
            </LineChart>
          ) : (
            <BarChart data={chart.data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey={chart.data[0].hasOwnProperty('service') ? 'service' : 'region'} 
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={chart.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* هدر بخش - با انیمیشن از بالا */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? "transform-none opacity-100" 
              : "-translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            آمار و <span style={{ color: ORANGE_COLOR }}>تحلیل‌های پیشرفته</span>
          </h2>
          <div className="flex justify-center mb-6">
            <div 
              className="h-1 rounded-full w-24"
              style={{
                background: `linear-gradient(to right, ${ORANGE_COLOR}, ${GREEN_COLOR})`,
              }}
            ></div>
          </div>
        </div>

        {/* اسلایدر چارت‌ها - همزمان با اعداد نمایش داده می‌شود */}
        <div 
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible 
              ? "transform-none opacity-100" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30">
            
            {/* عنوان اسلاید فعلی */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white">
                {chartSlides[currentSlide].title}
              </h3>
            </div>

            {/* دو چارت در کنار هم */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {chartSlides[currentSlide].charts.map((chart, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    isVisible 
                      ? "transform-none opacity-100" 
                      : `translate-y-8 opacity-0`
                  }`}
                  style={{ 
                    transitionDelay: `${400 + (index * 150)}ms` // تأخیر پلکانی برای چارت‌ها
                  }}
                >
                  <ChartComponent chart={chart} />
                </div>
              ))}
            </div>

            {/* کنترل‌های ناوبری */}
            <div className="flex items-center justify-between">
              {/* دکمه قبلی */}
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                قبلی
              </button>

              {/* نشانگرهای اسلاید */}
              <div className="flex gap-2">
                {chartSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'scale-125 bg-orange-500' 
                        : 'scale-100 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              {/* دکمه بعدی */}
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                بعدی
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* آمارهای انیمیشنی - با انیمیشن از پایین */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ease-out ${
            isVisible 
              ? "transform-none opacity-100" 
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="text-white"
              style={{
                transitionDelay: `${300 + (index * 100)}ms` // تأخیر پلکانی برای هر آمار
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-black mb-2 transition-all duration-500"
                style={{ color: ORANGE_COLOR }}
              >
                {animatedValues[index]}
                {stat.suffix}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;