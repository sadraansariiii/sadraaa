"use client";
import React, { forwardRef } from "react";
import Image from "next/image";
import Logo from "@/public/img/expot2.png";

const PrintSection = forwardRef(({ data, paperSize = "A4" }, ref) => {
  const paperDimensions = {
    A4: { width: 210, height: 297 },
    A5: { width: 148, height: 210 },
    Letter: { width: 216, height: 279 },
    Legal: { width: 216, height: 356 },
  };
  const { width, height } = paperDimensions[paperSize] || paperDimensions["A4"];

  // داده‌های نمونه بهبود یافته
  const reportData = {
    title: "گزارش ارزیابی آمادگی صادرات",
    companyName: "شرکت نمونه صنعتی",
    industry: "صنایع غذایی",
    country: "ایران",
    reportDate: new Date().toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    organization: "پلتفرم تجارت بین‌الملل",
    reportCode: "ERA-2024-0057",
    validityPeriod: "۱۲ ماه",
    assessmentPeriod: "دی‌ماه ۱۴۰۲ - اسفند‌ماه ۱۴۰۲",
    preparedBy: "دپارتمان تحلیل صادرات",
    reviewedBy: "کمیته ارزیابی بین‌الملل",
  };

  // داده‌های تمام بخش‌ها - ساختار استاندارد بین‌المللی
  const allSectionsData = {
    // خلاصه اجرایی - بهبود یافته
    executiveSummary: {
      exportReadiness: {
        level: "آماده صادرات",
        score: 78,
        description:
          "شرکت دارای زیرساخت‌های مناسب برای ورود به بازارهای بین‌المللی می‌باشد",
        category: "متوسط به بالا",
        benchmark: "بالاتر از میانگین صنعت (65)",
        improvement: "+۱۳ نسبت به ارزیابی قبلی",
      },
      userHonesty: {
        score: 85,
        level: "عالی",
        inconsistencies: 2,
        examples: [
          {
            issue: "تناقض در گزارش مالی سال ۱۴۰۲ و اظهارنامه مالیاتی",
            impact: "متوسط",
            resolution: "بررسی و تطبیق اسناد",
          },
          {
            issue: "تفاوت در آمار تولید گزارش شده با ظرفیت واقعی خط تولید",
            impact: "کم",
            resolution: "بازدید میدانی و تأیید ظرفیت",
          },
        ],
        impact: "کم",
        recommendation: "داده‌های قابل اعتماد برای تصمیم‌گیری",
      },
      successPrediction: {
        score: 72,
        level: "خوب",
        factors: [
          {
            factor: "کیفیت محصول مطابق استانداردهای بین‌المللی",
            weight: 30,
            score: 80,
          },
          {
            factor: "قیمت رقابتی در بازارهای هدف",
            weight: 25,
            score: 75,
          },
          {
            factor: "ظرفیت تولید مازاد",
            weight: 20,
            score: 85,
          },
          {
            factor: "تیم مدیریت متخصص",
            weight: 15,
            score: 70,
          },
          {
            factor: "زیرساخت‌های لجستیکی",
            weight: 10,
            score: 60,
          },
        ],
        timeframe: "۱۲-۱۸ ماه",
        confidence: "۷۵٪",
      },
      keyStrengths: [
        {
          strength: "کیفیت بالای محصولات مطابق استانداردهای بین‌المللی",
          impact: "بالا",
          evidence: "گواهی ISO 22000 و HALAL",
          sustainability: "بلندمدت",
        },
        {
          strength: "تیم مدیریت متخصص و با تجربه",
          impact: "بالا",
          evidence: "میانگین ۱۲ سال سابقه مدیریتی",
          sustainability: "بلندمدت",
        },
        {
          strength: "ظرفیت تولید انعطاف‌پذیر",
          impact: "متوسط",
          evidence: "۳۰٪ ظرفیت خالی برای صادرات",
          sustainability: "کوتاه‌مدت",
        },
        {
          strength: "قیمت رقابتی در بازارهای منطقه‌ای",
          impact: "بالا",
          evidence: "تحلیل قیمت‌گذاری رقبا",
          sustainability: "میان‌مدت",
        },
      ],
      keyWeaknesses: [
        {
          weakness: "عدم تجربه کافی در صادرات مستقیم",
          impact: "بالا",
          urgency: "فوری",
          solution: "همکاری با مشاوران صادراتی",
        },
        {
          weakness: "ضعف در برندینگ بین‌المللی",
          impact: "متوسط",
          urgency: "میان‌مدت",
          solution: "تدوین استراتژی برندینگ",
        },
        {
          weakness: "محدودیت نقدینگی برای توسعه بازار",
          impact: "بالا",
          urgency: "فوری",
          solution: "جذب سرمایه‌گذار و استفاده از تسهیلات",
        },
        {
          weakness: "کمبود نیروی متخصص بازاریابی بین‌الملل",
          impact: "متوسط",
          urgency: "میان‌مدت",
          solution: "آموزش و استخدام متخصص",
        },
      ],
      criticalRecommendations: [
        {
          recommendation: "تمرکز روی بازارهای آسیایی و خاورمیانه",
          priority: "بالا",
          timeline: "۳-۶ ماه",
          responsibility: "مدیریت ارشد",
        },
        {
          recommendation: "همکاری با دلالان بین‌المللی برای شروع",
          priority: "بالا",
          timeline: "۱-۳ ماه",
          responsibility: "مدیر فروش",
        },
        {
          recommendation: "اخذ گواهی‌های بین‌المللی مورد نیاز",
          priority: "متوسط",
          timeline: "۶-۹ ماه",
          responsibility: "مدیر کیفیت",
        },
      ],
      riskOverview: {
        level: "متوسط",
        financial: { level: "بالا", score: 7.2 },
        operational: { level: "متوسط", score: 5.8 },
        market: { level: "متوسط", score: 6.1 },
        legal: { level: "کم", score: 3.4 },
        overallScore: 5.6,
      },
    },

    // روش‌شناسی ارزیابی - استاندارد بین‌المللی
    methodology: {
      tool: "پرسشنامه جامع ارزیابی آمادگی صادراتی",
      version: "2.1",
      questionsCount: 85,
      completionRate: "۹۲٪",
      domains: [
        {
          name: "بازاریابی بین‌الملل",
          weight: 30,
          questions: 25,
          description: "تحلیل بازار، برندینگ، قیمت‌گذاری و توزیع بین‌المللی",
        },
        {
          name: "مالی و حسابداری",
          weight: 25,
          questions: 20,
          description: "مدیریت نقدینگی، ریسک ارزی، هزینه‌یابی و سرمایه‌گذاری",
        },
        {
          name: "تولید و عملیات",
          weight: 20,
          questions: 18,
          description: "ظرفیت تولید، کنترل کیفیت، لجستیک و زنجیره تأمین",
        },
        {
          name: "منابع انسانی",
          weight: 15,
          questions: 12,
          description: "مهارت‌های بین‌المللی، آموزش، ساختار سازمانی",
        },
        {
          name: "قانونی و گمرکی",
          weight: 10,
          questions: 10,
          description: "قوانین صادراتی، گمرک، مالکیت فکری و قراردادها",
        },
      ],
      process: [
        {
          step: "ارزیابی آنلاین اولیه",
          duration: "۳ روز",
          completion: "۱۰۰٪",
        },
        {
          step: "مصاحبه تخصصی تکمیلی",
          duration: "۲ روز",
          completion: "۹۵٪",
        },
      ],
      validity: "بر اساس استاندارد ITC و CORE از GlobalEdge",
      duration: "۲ هفته",
      standards: [
        {
          name: "ITC Export Readiness",
          level: "Advanced",
          compliance: "۹۵٪",
        },
        {
          name: "GlobalEdge CORE",
          level: "Certified",
          compliance: "۹۲٪",
        },
        {
          name: "UNCTAD Export Potential",
          level: "Implemented",
          compliance: "۸۸٪",
        },
        {
          name: "ISO 9001 Quality Management",
          level: "Compliant",
          compliance: "۹۰٪",
        },
      ],
      dataSources: [
        {
          source: "پرسشنامه آنلاین",
          reliability: "عالی",
          weight: 40,
        },
        {
          source: "مصاحبه با مدیریت",
          reliability: "عالی",
          weight: 25,
        },
        {
          source: "اسناد مالی و تولیدی",
          reliability: "خوب",
          weight: 20,
        },
        {
          source: "داده‌های صنعت",
          reliability: "خوب",
          weight: 10,
        },
        {
          source: "تحلیل بازارهای بین‌المللی",
          reliability: "متوسط",
          weight: 5,
        },
      ],
    },

    // امتیازات و رتبه‌بندی - ساختار استاندارد
    scores: {
      overall: {
        score: 78,
        level: "متوسط به بالا",
        description:
          "شرکت پتانسیل خوبی برای صادرات دارد اما نیاز به بهبود در برخی حوزه‌ها وجود دارد",
        industryRank: "۶۵ام از ۱۰۰ شرکت مشابه",
        regionalBenchmark: 72,
        globalBenchmark: 68,
        trend: "صعودی",
        growth: "+۱۳ امتیاز نسبت به ارزیابی قبلی",
      },
      honesty: {
        score: 85,
        level: "عالی",
        confidence: "بالا",
        recommendation: "داده‌های قابل اعتماد برای تصمیم‌گیری",
        consistency: "۹۲٪",
      },
      domains: [
        {
          name: "بازاریابی بین‌الملل",
          score: 80,
          industryAvg: 65,
          weight: 30,
          level: "خوب",
          trend: "↑ ۸ امتیاز",
          details: {
            marketResearch: 78,
            branding: 75,
            pricing: 82,
            distribution: 78,
            promotion: 85,
            digitalMarketing: 72,
          },
        },
        {
          name: "مالی و حسابداری",
          score: 70,
          industryAvg: 72,
          weight: 25,
          level: "متوسط",
          trend: "↑ ۵ امتیاز",
          details: {
            financialPlanning: 68,
            cashFlow: 65,
            costing: 75,
            forex: 60,
            funding: 80,
            riskManagement: 62,
          },
        },
        {
          name: "تولید و عملیات",
          score: 85,
          industryAvg: 70,
          weight: 20,
          level: "عالی",
          trend: "↑ ۱۲ امتیاز",
          details: {
            capacity: 90,
            quality: 88,
            efficiency: 82,
            flexibility: 80,
            logistics: 78,
            technology: 82,
          },
        },
        {
          name: "منابع انسانی",
          score: 65,
          industryAvg: 68,
          weight: 15,
          level: "متوسط",
          trend: "↑ ۳ امتیاز",
          details: {
            internationalSkills: 60,
            training: 70,
            leadership: 75,
            culture: 55,
            compensation: 68,
            retention: 62,
          },
        },
        {
          name: "قانونی و گمرکی",
          score: 60,
          industryAvg: 55,
          weight: 10,
          level: "متوسط",
          trend: "↑ ۷ امتیاز",
          details: {
            compliance: 58,
            documentation: 62,
            contracts: 65,
            insurance: 55,
            intellectualProperty: 52,
            customs: 68,
          },
        },
      ],
      progress: {
        previous: 65,
        current: 78,
        trend: "صعودی",
        growth: "۲۰٪ بهبود در ۶ ماه گذشته",
        timeline: "مهر ۱۴۰۲ - اسفند ۱۴۰۲",
      },
      benchmarking: {
        quartile: "۳",
        percentile: "۶۵ام",
        comparison: "بالاتر از ۶۵٪ شرکت‌های مشابه",
      },
    },

    // تحلیل SWOT - ساختار استاندارد
    swot: {
      strengths: [
        {
          item: "کیفیت محصول بالاتر از استانداردهای منطقه‌ای",
          impact: "بالا",
          sustainability: "بلندمدت",
          evidence: "گواهی‌های کیفیت بین‌المللی",
          utilization: "بهینه",
        },
        {
          item: "قیمت رقابتی در بازارهای هدف",
          impact: "بالا",
          sustainability: "میان‌مدت",
          evidence: "تحلیل قیمت‌گذاری رقبا",
          utilization: "نیاز به بهبود",
        },
        {
          item: "تیم مدیریت با تجربه در صنعت",
          impact: "متوسط",
          sustainability: "بلندمدت",
          evidence: "سابقه ۱۵ ساله مدیریت",
          utilization: "بهینه",
        },
        {
          item: "ظرفیت تولید مازاد برای صادرات",
          impact: "بالا",
          sustainability: "کوتاه‌مدت",
          evidence: "۳۰٪ ظرفیت خالی تولید",
          utilization: "نیاز به برنامه‌ریزی",
        },
      ],
      weaknesses: [
        {
          item: "عدم شناخته شدن برند در بازارهای بین‌المللی",
          impact: "بالا",
          urgency: "فوری",
          solution: "برندینگ هدفمند",
          timeline: "۶-۱۲ ماه",
        },
        {
          item: "محدودیت نقدینگی برای توسعه بازار",
          impact: "بالا",
          urgency: "فوری",
          solution: "جذب سرمایه‌گذار",
          timeline: "۳-۶ ماه",
        },
        {
          item: "کمبود نیروی متخصص بازاریابی بین‌الملل",
          impact: "متوسط",
          urgency: "میان‌مدت",
          solution: "آموزش و استخدام",
          timeline: "۶-۹ ماه",
        },
        {
          item: "عدم تجربه در مذاکرات بین‌المللی",
          impact: "متوسط",
          urgency: "میان‌مدت",
          solution: "مشاوره تخصصی",
          timeline: "۳-۶ ماه",
        },
      ],
      opportunities: [
        {
          item: "رشد تقاضا برای محصولات سالم در بازارهای همسایه",
          probability: "بالا",
          timeframe: "کوتاه‌مدت",
          action: "تمرکز بر بازارهای منطقه‌ای",
          potential: "بالا",
        },
        {
          item: "توافق‌های تجاری منطقه‌ای جدید",
          probability: "متوسط",
          timeframe: "میان‌مدت",
          action: "پیگیری فرصت‌های ترجیحی",
          potential: "متوسط",
        },
        {
          item: "حمایت‌های دولتی از صادرات",
          probability: "بالا",
          timeframe: "کوتاه‌مدت",
          action: "استفاده از تسهیلات دولتی",
          potential: "بالا",
        },
        {
          item: "ظهور بازارهای جدید در آسیای میانه",
          probability: "بالا",
          timeframe: "میان‌مدت",
          action: "بررسی بازارهای CIS",
          potential: "بالا",
        },
      ],
      threats: [
        {
          item: "نوسانات نرخ ارز و تورم",
          probability: "بالا",
          severity: "شدید",
          mitigation: "پوشش ریسک ارزی",
          monitoring: "مستمر",
        },
        {
          item: "رقبای قدرتمند بین‌المللی",
          probability: "بالا",
          severity: "متوسط",
          mitigation: "تفکیک بازار و تمرکز بر مزیت‌ها",
          monitoring: "فصلی",
        },
        {
          item: "تحریم‌ها و موانع تجاری",
          probability: "متوسط",
          severity: "شدید",
          mitigation: "تنوع بخشی به بازارها",
          monitoring: "مستمر",
        },
        {
          item: "تغییر قوانین گمرکی کشورهای هدف",
          probability: "متوسط",
          severity: "متوسط",
          mitigation: "پیگیری مستمر قوانین",
          monitoring: "فصلی",
        },
      ],
    },

    // ارزیابی ریسک - ساختار استاندارد بین‌المللی
    riskAssessment: {
      overallRiskLevel: "متوسط",
      riskScore: 5.6,
      riskAppetite: "متوسط",
      toleranceLevel: "قابل قبول تا ۱۵٪ کاهش سود",
      monitoringFrequency: "ماهانه",
      riskMatrix: [
        {
          category: "ریسک‌های مالی",
          weight: 35,
          score: 7.2,
          risks: [
            {
              name: "نوسانات نرخ ارز",
              level: "بالا",
              probability: "۷۰%",
              impact: "شدید",
              score: 8,
              mitigation:
                "استفاده از ابزارهای پوشش ریسک ارزی مانند فوروارد و آپشن",
              timeline: "فوری",
              cost: "متوسط",
              owner: "مدیر مالی",
            },
            {
              name: "عدم پرداخت مشتریان خارجی",
              level: "متوسط",
              probability: "۳۰%",
              impact: "متوسط",
              score: 5,
              mitigation: "اخذ اعتبار اسنادی و بیمه صادراتی",
              timeline: "میان‌مدت",
              cost: "کم",
              owner: "مدیر فروش",
            },
            {
              name: "تورم و افزایش هزینه‌ها",
              level: "متوسط",
              probability: "۴۰%",
              impact: "متوسط",
              score: 4,
              mitigation: "تنوع بخشی به بازارها و مدیریت نقدینگی",
              timeline: "کوتاه‌مدت",
              cost: "کم",
              owner: "مدیر مالی",
            },
          ],
        },
        {
          category: "ریسک‌های عملیاتی",
          weight: 25,
          score: 5.8,
          risks: [
            {
              name: "تاخیر در حمل و نقل بین‌المللی",
              level: "متوسط",
              probability: "۵۰%",
              impact: "متوسط",
              score: 6,
              mitigation: "تنوع در روش‌های حمل و نقل و برنامه‌ریزی زمان‌بندی",
              timeline: "کوتاه‌مدت",
              cost: "کم",
              owner: "مدیر لجستیک",
            },
            {
              name: "مشکلات کنترل کیفیت محصول",
              level: "کم",
              probability: "۲۰%",
              impact: "شدید",
              score: 3,
              mitigation:
                "کنترل کیفیت دقیق قبل از ارسال و اخذ گواهی‌های بین‌المللی",
              timeline: "میان‌مدت",
              cost: "متوسط",
              owner: "مدیر کیفیت",
            },
          ],
        },
        {
          category: "ریسک‌های بازار",
          weight: 25,
          score: 6.1,
          risks: [
            {
              name: "رقابت قیمتی شدید",
              level: "بالا",
              probability: "۶۰%",
              impact: "شدید",
              score: 7,
              mitigation: "تمرکز بر مزیت کیفیت به جای قیمت و تفکیک بازار",
              timeline: "فوری",
              cost: "کم",
              owner: "مدیر بازاریابی",
            },
          ],
        },
        {
          category: "ریسک‌های قانونی و گمرکی",
          weight: 15,
          score: 3.4,
          risks: [
            {
              name: "تغییر قوانین گمرکی کشورهای هدف",
              level: "متوسط",
              probability: "۳۰%",
              impact: "شدید",
              score: 6,
              mitigation: "پیگیری مستمر قوانین و مشاوره با کارشناسان گمرکی",
              timeline: "مستمر",
              cost: "کم",
              owner: "مدیر حقوقی",
            },
          ],
        },
      ],
      recommendations: [
        {
          recommendation:
            "استفاده از ابزارهای پوشش ریسک ارزی برای مدیریت نوسانات نرخ ارز",
          priority: "بالا",
          timeline: "۱-۳ ماه",
          cost: "متوسط",
          owner: "مدیر مالی",
        },
        {
          recommendation: "اخذ اعتبار اسنادی برای تضمین پرداخت‌های بین‌المللی",
          priority: "بالا",
          timeline: "۱-۲ ماه",
          cost: "کم",
          owner: "مدیر فروش",
        },
        {
          recommendation: "بیمه صادراتی برای کاهش ریسک عدم پرداخت",
          priority: "متوسط",
          timeline: "۲-۴ ماه",
          cost: "متوسط",
          owner: "مدیر مالی",
        },
      ],
    },

    // برنامه بهبود
    improvement: {
      shortTerm: [
        {
          action: "آموزش تیم فروش در مورد استانداردهای صادراتی",
          timeline: "۱-۳ ماه",
          responsibility: "مدیر فروش",
          priority: "بالا",
        },
        {
          action: "تهیه کاتالوگ و مستندات انگلیسی",
          timeline: "۱-۲ ماه",
          responsibility: "بازاریابی",
          priority: "بالا",
        },
      ],
      mediumTerm: [
        {
          action: "توسعه استراتژی بازاریابی بین‌المللی",
          timeline: "۳-۶ ماه",
          responsibility: "مدیریت",
          priority: "متوسط",
        },
        {
          action: "شرکت در نمایشگاه‌های بین‌المللی",
          timeline: "۴-۶ ماه",
          responsibility: "بازاریابی",
          priority: "متوسط",
        },
      ],
      longTerm: [
        {
          action: "ورود به ۳ بازار جدید منطقه‌ای",
          timeline: "۶-۱۲ ماه",
          responsibility: "مدیریت",
          priority: "پایین",
        },
        {
          action: "ایجاد شبکه توزیع بین‌المللی",
          timeline: "۹-۱۸ ماه",
          responsibility: "توسعه کسب‌وکار",
          priority: "پایین",
        },
      ],
    },

    // تحلیل بازارهای هدف
    marketAnalysis: {
      recommendedMarkets: [
        {
          country: "عراق",
          potential: "بالا",
          demand: "رشد ۱۵% سالانه",
          competition: "متوسط",
          barriers: "موانع قانونی متوسط",
          recommendation: "شروع از استان‌های شمالی",
          marketSize: "۵۰۰ میلیون دلار",
        },
        {
          country: "ترکیه",
          potential: "بالا",
          demand: "ثابت با رشد ۸%",
          competition: "بالا",
          barriers: "استانداردهای سخت گیرانه",
          recommendation: "همکاری با شرکت‌های محلی",
          marketSize: "۸۰۰ میلیون دلار",
        },
      ],
    },

    // بنچمارکینگ
    benchmarking: {
      comparison: [
        {
          metric: "سهم صادرات از فروش",
          company: 15,
          industryAvg: 25,
          topPerformers: 40,
        },
        {
          metric: "تعداد بازارهای صادراتی",
          company: 2,
          industryAvg: 4,
          topPerformers: 8,
        },
        {
          metric: "رشد سالانه صادرات",
          company: 12,
          industryAvg: 18,
          topPerformers: 35,
        },
        {
          metric: "سودآوری صادرات",
          company: 22,
          industryAvg: 28,
          topPerformers: 45,
        },
      ],
    },

    // گام‌های بعدی
    nextSteps: {
      immediate: [
        "تماس با مشاور صادراتی برای برنامه‌ریزی دقیق",
        "ثبت‌نام در سامانه جامع تجارت",
        "تهیه پیش‌نیازهای گمرکی",
      ],
      resources: [
        { name: "سامانه جامع تجارت ایران", url: "https://tse.ir" },
        { name: "پرتال صادراتی ITC", url: "https://intracen.org" },
        {
          name: "راهنمای گمرک جمهوری اسلامی ایران",
          url: "https://irica.gov.ir",
        },
      ],
      contact: {
        email: "export.support@platform.com",
        phone: "۰۲۱-۸۸۸۸۸۸۸۸",
        address: "تهران، خیابان ولیعصر، پلاک ۱۰۰۰",
      },
    },

    // گواهینامه
    certification: {
      granted: true,
      level: "آمادگی صادراتی سطح ۲",
      validity: "۱۲ ماه",
      requirements: [
        "امتیاز کلی بالای ۷۰",
        "صداقت بالای ۸۰%",
        "عدم ریسک بحرانی",
      ],
    },

    // کیس استادی
    caseStudies: [
      {
        company: "شرکت تولیدی مواد غذایی الف",
        industry: "صنایع غذایی",
        challenge: "عدم دسترسی به بازارهای بین‌المللی",
        solution: "شرکت در نمایشگاه‌های تخصصی و همکاری با دلالان",
        result: "افزایش ۲۰۰% صادرات در ۱۸ ماه",
      },
      {
        company: "کارخانه تولید پوشاک ب",
        industry: "پوشاک",
        challenge: "رقابت شدید در بازارهای داخلی",
        solution: "تمرکز بر بازارهای CIS و خاورمیانه",
        result: "تثبیت ۱۵% سودآوری از صادرات",
      },
    ],

    // بخش جدید: شاخص‌های کلیدی عملکرد
    kpis: {
      current: [
        { name: "ظرفیت استفاده شده تولید", value: "65%", target: "85%" },
        { name: "نرخ بازگشت سرمایه", value: "18%", target: "25%" },
        { name: "رضایت مشتریان داخلی", value: "88%", target: "90%" },
        { name: "هزینه‌های عملیاتی", value: "22%", target: "20%" },
      ],
      exportTargets: [
        { name: "سهم صادرات از کل فروش", current: "15%", target: "35%" },
        { name: "تعداد بازارهای صادراتی", current: "2", target: "5" },
        { name: "رشد درآمد صادراتی", current: "12%", target: "30%" },
      ],
    },

    // بخش جدید: الزامات قانونی و گمرکی
    legalRequirements: {
      documents: [
        "گواهی مبدأ",
        "بارنامه بین‌المللی",
        "فهرست کالا (Packing List)",
        "فاکتور تجاری",
        "گواهی سلامت",
      ],
      certifications: [
        "ISO 22000 (سیستم مدیریت ایمنی مواد غذایی)",
        "HALAL (برای بازارهای اسلامی)",
        "CE (برای بازار اروپا)",
        "FDA (برای بازار آمریکا)",
      ],
      deadlines: [
        { requirement: "اخذ کد HS", deadline: "۱ ماه", status: "در حال انجام" },
        {
          requirement: "ثبت برند بین‌المللی",
          deadline: "۳ ماه",
          status: "برنامه‌ریزی شده",
        },
      ],
    },

    // بخش جدید: تحلیل رقبا
    competitorAnalysis: {
      domestic: [
        {
          name: "شرکت رقیب الف",
          advantage: "تجربه صادراتی بیشتر",
          threat: "قیمت پایین‌تر",
        },
        {
          name: "شرکت رقیب ب",
          advantage: "شبکه توزیع قوی",
          threat: "کیفیت مشابه",
        },
      ],
      international: [
        {
          name: "شرکت ترکیه‌ای",
          advantage: "دسترسی به بازار اروپا",
          threat: "هزینه تولید بالاتر",
        },
        {
          name: "شرکت چینی",
          advantage: "قیمت بسیار رقابتی",
          threat: "کیفیت پایین‌تر",
        },
      ],
    },
  };

  // کامپوننت نمودار دایره‌ای پیشرفته
  const CircularProgress = ({
    percentage,
    label,
    size = 100,
    color = "#ff7300",
    strokeWidth = 6,
    showLabel = true,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getLevelColor = (score) => {
      if (score >= 80) return "#10b981"; // سبز
      if (score >= 60) return "#f59e0b"; // نارنجی
      return "#ef4444"; // قرمز
    };

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={getLevelColor(percentage)}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-800">
              {percentage}%
            </span>
            {showLabel && (
              <span className="text-xs text-gray-500 mt-1">{label}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // کامپوننت نمودار میله‌ای پیشرفته
  const AdvancedBarChart = ({
    data,
    maxValue = 100,
    showComparison = true,
  }) => {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-32 text-right">
                  {item.name}
                </span>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    وزن: {item.weight}%
                  </span>
                  {item.trend && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.trend.includes("↑")
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.trend}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-sm font-bold text-gray-800 w-12">
                  {item.score}
                </span>
                {showComparison && (
                  <span className="text-sm text-gray-500">
                    صنعت: {item.industryAvg}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.score / maxValue) * 100}%`,
                    backgroundColor:
                      item.score > item.industryAvg ? "#10b981" : "#ff7300",
                  }}
                ></div>
              </div>

              {showComparison && (
                <div className="w-16 bg-gray-300 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gray-600"
                    style={{ width: `${(item.industryAvg / maxValue) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            {item.details && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Object.entries(item.details)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key} className="text-xs text-gray-600">
                      {key}: <span className="font-medium">{value}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const riskLevels = [
    {
      level: "بسیار بالا",
      color: "bg-red-600",
      text: "text-white",
      min: 8,
      max: 10,
    },
    {
      level: "بالا",
      color: "bg-orange-500",
      text: "text-white",
      min: 6,
      max: 7,
    },
    {
      level: "متوسط",
      color: "bg-yellow-400",
      text: "text-gray-800",
      min: 4,
      max: 5,
    },
    {
      level: "کم",
      color: "bg-green-500",
      text: "text-white",
      min: 2,
      max: 3,
    },
    {
      level: "بسیار کم",
      color: "bg-green-300",
      text: "text-gray-800",
      min: 1,
      max: 1,
    },
  ];

  const PageTitle = ({ title }) => {
    return (
      <div className="text-center mb-3 border-b border-orange-200 pb-2">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="w-16 h-1 bg-[#ff7300] mx-auto mt-1 rounded-full"></div>
      </div>
    );
  };

  const pages = {
    // صفحه ۱: کاور - طراحی استاندارد بین‌المللی
    page1: (
      <div
        className="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        {/* هدر با دو لوگو و بسم الله */}
        <div className="flex justify-between items-start mb-8">
          {/* لوگوی سمت راست - سازمان */}
          <div className="flex flex-col items-start gap-2">
            <div className="w-24 h-24 relative">
              <Image
                src={Logo}
                alt="Organization Logo"
                className="object-contain"
                fill
                sizes="96px"
                priority // اضافه کردن priority
                onError={(e) => {
                  // فال‌بک در صورت خطا
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              {/* فال‌بک متن */}
              <div className="hidden absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center">
                لوگوی سازمان
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 text-lg">
                {reportData.organization}
              </p>
              <p className="text-gray-600 text-sm">مشاور رسمی صادرات</p>
              <p className="text-gray-400 text-xs mt-1">
                کد گزارش: {reportData.reportCode}
              </p>
            </div>
          </div>

          {/* لوگوی سمت چپ - شرکت */}
          <div className="flex flex-col items-end gap-2">
            <div className="w-24 h-24 relative bg-gray-100 rounded-lg flex items-center justify-center border border-orange-200">
              <div className="text-gray-400 text-xs text-center p-2">
                لوگوی شرکت
              </div>
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800 text-lg">
                {reportData.companyName}
              </p>
              <p className="text-gray-600 text-sm">{reportData.industry}</p>
              <p className="text-gray-400 text-xs mt-1">{reportData.country}</p>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-3xl font-bold text-gray-800 leading-[50px] mb-2">
                گزارش ارزیابی
                <br />
                <span className="text-[#ff7300]">آمادگی صادرات</span>
              </h1>
              <div className="w-48 h-2 bg-gradient-to-r from-[#ff7300] to-orange-400 mx-auto rounded-full shadow-sm"></div>
              <p className="text-gray-600 mt-4 text-lg">
                بر اساس استانداردهای بین‌المللی ITC و GlobalEdge
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 w-[400px] max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-orange-100">
                  <span className="font-semibold text-gray-700">صنعت:</span>
                  <span className="font-bold text-gray-800 text-lg">
                    {reportData.industry}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-orange-100">
                  <span className="font-semibold text-gray-700">کشور:</span>
                  <span className="font-bold text-gray-800 text-lg">
                    {reportData.country}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-700">
                    تاریخ گزارش:
                  </span>
                  <span className="font-bold text-gray-800 text-lg">
                    {reportData.reportDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* کارت خلاصه وضعیت */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-[var(--orgin-color)]/20 text-center">
              <div className="text-2xl font-bold text-[var(--orgin-color)] mb-2">
                {allSectionsData.scores.overall.score}/100
              </div>
              <div className="text-sm text-gray-600">امتیاز کلی</div>
              <div className="text-xs text-[var(--orgin-color)] font-semibold mt-1">
                {allSectionsData.scores.overall.level}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-[var(--orgin-color)]/20 text-center">
              <div className="text-2xl font-bold text-[var(--orgin-color)] mb-2">
                {allSectionsData.executiveSummary.successPrediction.score}%
              </div>
              <div className="text-sm text-gray-600">شانس موفقیت</div>
              <div className="text-xs text-[var(--orgin-color)] font-semibold mt-1">
                {allSectionsData.executiveSummary.successPrediction.confidence}{" "}
                اطمینان
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-[var(--orgin-color)]/20 text-center">
              <div className="text-2xl font-bold text-[var(--orgin-color)] mb-2">
                {allSectionsData.riskAssessment.overallRiskLevel}
              </div>
              <div className="text-sm text-gray-600">سطح ریسک</div>
              <div className="text-xs text-[var(--orgin-color)] font-semibold mt-1">
                {allSectionsData.riskAssessment.riskAppetite}
              </div>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="text-center space-y-3 pt-8 border-t border-orange-100">
          <div className="flex justify-center gap-8 text-xs text-gray-500">
            <span>اعتبار گزارش: {reportData.validityPeriod}</span>
            <span>•</span>
            <span>نسخه: ۲.۱</span>
            <span>•</span>
            <span>صفحه ۱ از ۱۳</span>
          </div>
          <p className="font-medium text-gray-600 text-sm">
            گزارش محرمانه تجاری - فقط برای استفاده داخلی
          </p>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} {reportData.organization}. کلیه حقوق
            محفوظ است.
          </p>
        </div>
      </div>
    ),

    // صفحه ۲: خلاصه اجرایی پیشرفته
    page2: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"خلاصه اجرایی"} />

        <div className="space-y-6">
          {/* کارت‌های وضعیت کلی */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-200 text-center">
              <CircularProgress
                percentage={
                  allSectionsData.executiveSummary.exportReadiness.score
                }
                size={80}
                showLabel={false}
              />
              <div className="mt-2">
                <div className="font-bold text-gray-800">آمادگی صادراتی</div>
                <div className="text-sm text-[#ff7300] font-semibold">
                  {allSectionsData.executiveSummary.exportReadiness.level}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {allSectionsData.executiveSummary.exportReadiness.improvement}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 text-center">
              <CircularProgress
                percentage={allSectionsData.executiveSummary.userHonesty.score}
                size={80}
                showLabel={false}
                color="#10b981"
              />
              <div className="mt-2">
                <div className="font-bold text-gray-800">میزان صداقت</div>
                <div className="text-sm text-green-600 font-semibold">
                  {allSectionsData.executiveSummary.userHonesty.level}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {allSectionsData.executiveSummary.userHonesty.inconsistencies}{" "}
                  تناقض
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 text-center">
              <CircularProgress
                percentage={
                  allSectionsData.executiveSummary.successPrediction.score
                }
                size={80}
                showLabel={false}
                color="#3b82f6"
              />
              <div className="mt-2">
                <div className="font-bold text-gray-800">شانس موفقیت</div>
                <div className="text-sm text-blue-600 font-semibold">
                  {allSectionsData.executiveSummary.successPrediction.level}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {allSectionsData.executiveSummary.successPrediction.timeframe}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {allSectionsData.riskAssessment.riskScore}/10
              </div>
              <div className="font-bold text-gray-800">امتیاز ریسک</div>
              <div
                className={`text-sm font-semibold ${
                  allSectionsData.riskAssessment.overallRiskLevel === "بالا"
                    ? "text-red-600"
                    : allSectionsData.riskAssessment.overallRiskLevel ===
                      "متوسط"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {allSectionsData.riskAssessment.overallRiskLevel}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {allSectionsData.riskAssessment.riskAppetite}
              </div>
            </div>
          </div>

          {/* تحلیل کلیدی */}
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                نقاط قوت کلیدی
              </h3>
              <div className="space-y-3">
                {allSectionsData.executiveSummary.keyStrengths
                  .slice(0, 3)
                  .map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {strength.strength}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          تاثیر: {strength.impact} | پایداری:{" "}
                          {strength.sustainability}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                نیازهای بهبود کلیدی
              </h3>
              <div className="space-y-3">
                {allSectionsData.executiveSummary.keyWeaknesses
                  .slice(0, 3)
                  .map((weakness, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {weakness.weakness}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          فوریت: {weakness.urgency} | راهکار:{" "}
                          {weakness.solution}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    page21: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"خلاصه اجرایی"} />
        <div className="space-y-6">
          {/* توصیه‌های حیاتی */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              توصیه‌های حیاتی
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allSectionsData.executiveSummary.criticalRecommendations.map(
                (rec, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 border border-orange-200"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#ff7300] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {rec.recommendation}
                        </h4>
                        <div className="text-xs text-gray-600 mt-1">
                          مسئول: {rec.responsibility}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          rec.priority === "بالا"
                            ? "bg-red-100 text-red-700"
                            : rec.priority === "متوسط"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {rec.priority}
                      </span>
                      <span className="text-xs text-gray-600">
                        {rec.timeline}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۳: روش‌شناسی ارزیابی - بهبود یافته
    page3: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"روش‌شناسی ارزیابی"} />

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ابزار و فرآیند ارزیابی
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">
                    ابزار ارزیابی:
                  </span>
                  <span className="text-gray-800">
                    {allSectionsData.methodology.tool}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">نسخه:</span>
                  <span className="text-gray-800">
                    {allSectionsData.methodology.version}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">
                    تعداد سوالات:
                  </span>
                  <span className="text-gray-800">
                    {allSectionsData.methodology.questionsCount} سوال
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-700">مدت زمان:</span>
                  <span className="text-gray-800">
                    {allSectionsData.methodology.duration}
                  </span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-gray-700 mb-3">
                  فرآیند ارزیابی:
                </h4>
                <div className="space-y-3">
                  {allSectionsData.methodology.process.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#ff7300] rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          {step.step}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {step.duration} • {step.completion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              حوزه‌های ارزیابی و وزن‌ها
            </h3>
            <div className="space-y-4">
              {allSectionsData.methodology.domains.map((domain, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#ff7300] rounded-full"></div>
                    <div>
                      <span className="text-gray-700">{domain.name}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        {domain.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm text-gray-600">
                      وزن: {domain.weight}%
                    </span>
                    <span className="text-sm text-gray-600">
                      سوالات: {domain.questions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    page31: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"روش‌شناسی ارزیابی"} />

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              استانداردهای بین‌المللی مورد استفاده
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {allSectionsData.methodology.standards.map((standard, index) => (
                <div
                  key={index}
                  className="bg-orange-50 rounded-lg p-3 border border-orange-200"
                >
                  <div className="font-semibold text-gray-800">
                    {standard.name}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>سطح: {standard.level}</span>
                    <span>انطباق: {standard.compliance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۴: امتیازات و رتبه‌بندی پیشرفته
    page4: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"امتیازات و رتبه‌بندی"} />

        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center">
              <div className="text-2xl font-bold text-[#ff7300]">
                {allSectionsData.scores.overall.score}/100
              </div>
              <div className="text-sm text-gray-600 mt-1">امتیاز کلی</div>
              <div className="text-xs text-[#ff7300] font-semibold">
                {allSectionsData.scores.overall.level}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center">
              <div className="text-2xl font-bold text-[#ff7300]">
                {allSectionsData.scores.honesty.score}/100
              </div>
              <div className="text-sm text-gray-600 mt-1">میزان صداقت</div>
              <div className="text-xs text-[#ff7300] font-semibold">
                {allSectionsData.scores.honesty.level}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center">
              <div className="text-lg font-bold text-[#ff7300]">
                {allSectionsData.scores.benchmarking.percentile}
              </div>
              <div className="text-sm text-gray-600 mt-1">صدک صنعت</div>
              <div className="text-xs text-[#ff7300] font-semibold">
                چارک {allSectionsData.scores.benchmarking.quartile}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center">
              <div className="text-lg font-bold text-green-600">
                {allSectionsData.scores.progress.growth}
              </div>
              <div className="text-sm text-gray-600 mt-1">رشد</div>
              <div className="text-xs text-green-600 font-semibold">
                {allSectionsData.scores.progress.trend}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              امتیازات حوزه‌های مختلف
            </h3>
            <AdvancedBarChart data={allSectionsData.scores.domains} />
          </div>
        </div>
      </div>
    ),

    page41: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"امتیازات و رتبه‌بندی"} />

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              تحلیل مقایسه‌ای با صنعت
            </h3>
            <div className="space-y-4">
              {allSectionsData.scores.domains.map((domain, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">{domain.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      وزن: {domain.weight}%
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-bold ${
                        domain.score > domain.industryAvg
                          ? "bg-green-100 text-green-800"
                          : domain.score === domain.industryAvg
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      شما: {domain.score}
                    </span>
                    <span className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-800 font-bold">
                      صنعت: {domain.industryAvg}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        domain.score > domain.industryAvg
                          ? "text-green-600"
                          : domain.score === domain.industryAvg
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {domain.score > domain.industryAvg ? "+" : ""}
                      {domain.score - domain.industryAvg}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۵: تحلیل SWOT استاندارد
    page5: (
      <div
        className="w-full h-fit p-6 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"تحلیل SWOT استاندارد"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              نقاط قوت (Strengths)
            </h3>
            <div className="space-y-3 h-[calc(100%-60px)] overflow-y-auto">
              {allSectionsData.swot.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-lg p-3 border border-green-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      {strength.item}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        strength.impact === "بالا"
                          ? "bg-green-100 text-green-700"
                          : strength.impact === "متوسط"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      تاثیر: {strength.impact}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>پایداری: {strength.sustainability}</div>
                    {strength.evidence && (
                      <div className="mt-1">شواهد: {strength.evidence}</div>
                    )}
                    {strength.utilization && (
                      <div>بهره‌برداری: {strength.utilization}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    page51: (
      <div
        className="w-full h-fit p-6 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"تحلیل SWOT استاندارد"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              نقاط ضعف (Weaknesses)
            </h3>
            <div className="space-y-3 h-[calc(100%-60px)] overflow-y-auto">
              {allSectionsData.swot.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded-lg p-3 border border-red-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      {weakness.item}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        weakness.urgency === "فوری"
                          ? "bg-red-100 text-red-700"
                          : weakness.urgency === "میان‌مدت"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      فوریت: {weakness.urgency}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>راهکار: {weakness.solution}</div>
                    <div className="mt-1">تاثیر: {weakness.impact}</div>
                    {weakness.timeline && (
                      <div>زمان‌بندی: {weakness.timeline}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    page52: (
      <div
        className="w-full h-fit p-6 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"تحلیل SWOT استاندارد"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              فرصت‌ها (Opportunities)
            </h3>
            <div className="space-y-3 h-[calc(100%-60px)] overflow-y-auto">
              {allSectionsData.swot.opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      {opportunity.item}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        opportunity.probability === "بالا"
                          ? "bg-green-100 text-green-700"
                          : opportunity.probability === "متوسط"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      احتمال: {opportunity.probability}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>اقدام: {opportunity.action}</div>
                    <div className="mt-1">
                      زمان‌بندی: {opportunity.timeframe}
                    </div>
                    {opportunity.potential && (
                      <div>پتانسیل: {opportunity.potential}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    page53: (
      <div
        className="w-full h-fit p-6 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"تحلیل SWOT استاندارد"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              تهدیدها (Threats)
            </h3>
            <div className="space-y-3 h-[calc(100%-60px)] overflow-y-auto">
              {allSectionsData.swot.threats.map((threat, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 rounded-lg p-3 border border-yellow-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      {threat.item}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        threat.severity === "شدید"
                          ? "bg-red-100 text-red-700"
                          : threat.severity === "متوسط"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      شدت: {threat.severity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>راهکار کاهش: {threat.mitigation}</div>
                    <div className="mt-1">احتمال: {threat.probability}</div>
                    {threat.monitoring && <div>نظارت: {threat.monitoring}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    // صفحه ۶: ارزیابی ریسک استاندارد
    page6: (
      <div
        className="w-full h-full p-4 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <div className="text-center mb-3 border-b border-orange-200 pb-2">
          <h2 className="text-xl font-bold text-gray-800">
            ارزیابی ریسک‌های صادراتی
          </h2>
          <div className="w-16 h-1 bg-[#ff7300] mx-auto mt-1 rounded-full"></div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 h-[calc(100%-80px)] overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            ماتریس ریسک بر اساس استاندارد بین‌المللی
          </h3>

          {/* اطلاعات کلی ریسک */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 text-sm">
                سطح کلی ریسک:
              </h4>
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    allSectionsData.riskAssessment.overallRiskLevel ===
                    "بسیار بالا"
                      ? "bg-red-600 text-white"
                      : allSectionsData.riskAssessment.overallRiskLevel ===
                        "بالا"
                      ? "bg-orange-500 text-white"
                      : allSectionsData.riskAssessment.overallRiskLevel ===
                        "متوسط"
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {allSectionsData.riskAssessment.overallRiskLevel}
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  امتیاز ریسک: {allSectionsData.riskAssessment.riskScore}/10
                </div>
                <div>
                  تحمل ریسک: {allSectionsData.riskAssessment.riskAppetite}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded p-3 border border-orange-200">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">
                شاخص‌های کلیدی ریسک:
              </h4>
              <div className="space-y-1 text-xs">
                {Object.entries(allSectionsData.executiveSummary.riskOverview)
                  .filter(([key]) => key !== "level" && key !== "overallScore")
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-semibold">
                        {value.level} ({value.score})
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* سطوح ریسک - فشرده‌تر */}
          <div className="grid grid-cols-5 gap-1 mb-4">
            {[
              {
                level: "بسیار بالا",
                color: "bg-red-600",
                text: "text-white",
                min: 8,
                max: 10,
              },
              {
                level: "بالا",
                color: "bg-orange-500",
                text: "text-white",
                min: 6,
                max: 7,
              },
              {
                level: "متوسط",
                color: "bg-yellow-400",
                text: "text-gray-800",
                min: 4,
                max: 5,
              },
              {
                level: "کم",
                color: "bg-green-500",
                text: "text-white",
                min: 2,
                max: 3,
              },
              {
                level: "بسیار کم",
                color: "bg-green-300",
                text: "text-gray-800",
                min: 1,
                max: 1,
              },
            ].map((risk, index) => (
              <div
                key={index}
                className={`${risk.color} ${risk.text} rounded p-2 text-center`}
              >
                <div className="text-xs font-bold leading-tight">
                  {risk.level}
                </div>
                <div className="text-[10px] mt-1">
                  {risk.min}-{risk.max}
                </div>
              </div>
            ))}
          </div>

          {/* توزیع ریسک‌ها - اسکرول داخلی */}
          <div className="h-48 overflow-y-auto">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              توزیع ریسک‌ها بر اساس حوزه:
            </h4>
            <div className="space-y-3 pr-1">
              {allSectionsData.riskAssessment.riskMatrix.map(
                (category, index) => {
                  const riskCount = category.risks.length;
                  const highRisks = category.risks.filter(
                    (r) => r.level === "بالا"
                  ).length;
                  const mediumRisks = category.risks.filter(
                    (r) => r.level === "متوسط"
                  ).length;
                  const lowRisks = category.risks.filter(
                    (r) => r.level === "کم"
                  ).length;

                  return (
                    <div
                      key={index}
                      className="border border-orange-200 rounded p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 text-sm">
                            {category.category}
                          </h5>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-gray-600">
                              امتیاز: {category.score}
                            </span>
                            <span className="text-xs text-gray-600">
                              وزن: {category.weight}%
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1 flex-wrap justify-end">
                          {highRisks > 0 && (
                            <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px]">
                              {highRisks} بالا
                            </span>
                          )}
                          {mediumRisks > 0 && (
                            <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-[10px]">
                              {mediumRisks} متوسط
                            </span>
                          )}
                          {lowRisks > 0 && (
                            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px]">
                              {lowRisks} کم
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">
                        مجموع: {riskCount} مورد
                      </div>

                      {/* لیست ریسک‌ها - فشرده */}
                      <div className="mt-2 space-y-1">
                        {category.risks.slice(0, 2).map((risk, riskIndex) => (
                          <div
                            key={riskIndex}
                            className="flex justify-between items-center text-xs"
                          >
                            <span className="text-gray-700 truncate flex-1 mr-2">
                              {risk.name}
                            </span>
                            <div className="flex gap-1 text-[10px] text-gray-500 whitespace-nowrap">
                              <span>احتمال: {risk.probability}</span>
                              <span>•</span>
                              <span>تاثیر: {risk.impact}</span>
                            </div>
                          </div>
                        ))}
                        {category.risks.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            + {category.risks.length - 2} مورد دیگر
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۷: برنامه کوتاه‌مدت
    page7: (
      <div
        className="w-full h-fit p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"برنامه بهبود و توصیه‌ها - کوتاه‌مدت"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              برنامه کوتاه‌مدت (۱-۳ ماه)
            </h3>
            <div className="space-y-4 h-[calc(100%-80px)] overflow-y-auto">
              {allSectionsData.improvement.shortTerm.map((item, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-lg p-4 border border-green-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {item.action}
                    </h4>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-bold ${
                          item.priority === "بالا"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "متوسط"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-bold">
                        {item.timeline}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-white rounded px-3 py-2 border border-green-100">
                    <span className="font-semibold">مسئول:</span>{" "}
                    {item.responsibility}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۸: برنامه میان‌مدت
    page71: (
      <div
        className="w-full h-fit p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"برنامه بهبود و توصیه‌ها - میان‌مدت"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-200 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              برنامه میان‌مدت (۳-۶ ماه)
            </h3>
            <div className="space-y-4 h-[calc(100%-80px)] overflow-y-auto">
              {allSectionsData.improvement.mediumTerm.map((item, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 rounded-lg p-4 border border-yellow-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {item.action}
                    </h4>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-bold ${
                          item.priority === "بالا"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "متوسط"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-bold">
                        {item.timeline}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-white rounded px-3 py-2 border border-yellow-100">
                    <span className="font-semibold">مسئول:</span>{" "}
                    {item.responsibility}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۹: برنامه بلندمدت
    page72: (
      <div
        className="w-full h-fit p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"برنامه بهبود و توصیه‌ها - بلندمدت"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              برنامه بلندمدت (۶-۱۸ ماه)
            </h3>
            <div className="space-y-4 h-[calc(100%-80px)] overflow-y-auto">
              {allSectionsData.improvement.longTerm.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {item.action}
                    </h4>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-bold ${
                          item.priority === "بالا"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "متوسط"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-bold">
                        {item.timeline}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-white rounded px-3 py-2 border border-blue-100">
                    <span className="font-semibold">مسئول:</span>{" "}
                    {item.responsibility}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۱۰: تحلیل بازارهای هدف
    page73: (
      <div
        className="w-full h-fit p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"تحلیل بازارهای هدف"} />

        <div className="h-[calc(100%-80px)]">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              تحلیل بازارهای هدف پیشنهادی
            </h3>
            <div className="space-y-4 h-[calc(100%-80px)] overflow-y-auto">
              {allSectionsData.marketAnalysis.recommendedMarkets.map(
                (market, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 border border-orange-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-gray-800 text-xl">
                        {market.country}
                      </h4>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          market.potential === "بالا"
                            ? "bg-green-100 text-green-700"
                            : market.potential === "متوسط"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        پتانسیل: {market.potential}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="bg-white rounded p-3 border border-orange-100">
                        <span className="font-semibold text-gray-700">
                          📈 تقاضا:
                        </span>
                        <p className="text-gray-800 mt-1">{market.demand}</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-orange-100">
                        <span className="font-semibold text-gray-700">
                          ⚡ رقابت:
                        </span>
                        <p className="text-gray-800 mt-1">
                          {market.competition}
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 border border-orange-100">
                        <span className="font-semibold text-gray-700">
                          🚧 موانع:
                        </span>
                        <p className="text-gray-800 mt-1">{market.barriers}</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-orange-100">
                        <span className="font-semibold text-gray-700">
                          📊 اندازه بازار:
                        </span>
                        <p className="text-gray-800 mt-1">
                          {market.marketSize}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded p-3 border border-orange-100">
                      <span className="font-semibold text-gray-700">
                        🎯 راهکار پیشنهادی:
                      </span>
                      <p className="text-gray-800 mt-1">
                        {market.recommendation}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    // صفحه ۹: بنچمارکینگ
    page74: (
      <div
        className="w-full h-fit p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={"   بنچمارکینگ و مقایسه"} />

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              مقایسه با صنعت
            </h3>
            <div className="space-y-4">
              {allSectionsData.benchmarking.comparison.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>{item.metric}</span>
                    <span>
                      شما: {item.company}% | صنعت: {item.industryAvg}% |
                      برترین‌ها: {item.topPerformers}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="flex h-3 rounded-full">
                      <div
                        className="bg-[#ff7300] rounded-l-full"
                        style={{ width: `${item.company}%` }}
                      ></div>
                      <div
                        className="bg-blue-500"
                        style={{ width: `${item.industryAvg - item.company}%` }}
                      ></div>
                      <div
                        className="bg-green-500 rounded-r-full"
                        style={{
                          width: `${item.topPerformers - item.industryAvg}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              تحلیل عملکرد
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">نقطه قوت اصلی</span>
                <span className="text-green-600 font-semibold">
                  کیفیت تولید بالاتر از متوسط صنعت
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">نیاز به بهبود</span>
                <span className="text-red-600 font-semibold">
                  تجربه صادراتی کمتر از متوسط
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">فرصت توسعه</span>
                <span className="text-blue-600 font-semibold">
                  رشد سریع در بازارهای منطقه‌ای
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۱۰: شاخص‌های کلیدی عملکرد و الزامات قانونی
    page10: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={" شاخص‌های عملکرد و الزامات قانونی"} />

        <div className="space-y-6">
          {/* شاخص‌های کلیدی عملکرد */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              شاخص‌های کلیدی عملکرد فعلی
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {allSectionsData.kpis.current.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-orange-50 rounded-lg p-4 border border-orange-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">
                      {kpi.name}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        parseFloat(kpi.value) >= parseFloat(kpi.target)
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {kpi.value}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">هدف: {kpi.target}</div>
                </div>
              ))}
            </div>
          </div>

          {/* الزامات قانونی و گمرکی */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              الزامات قانونی و گمرکی
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  مدارک مورد نیاز:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {allSectionsData.legalRequirements.documents.map(
                    (doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-[#ff7300] rounded-full"></div>
                        {doc}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  گواهی‌های مورد نیاز:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {allSectionsData.legalRequirements.certifications.map(
                    (cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-[#ff7300] rounded-full"></div>
                        {cert}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۱۱: تحلیل رقبا و گام‌های بعدی
    page11: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={" تحلیل رقبا و گام‌های بعدی"} />

        <div className="space-y-6">
          {/* تحلیل رقبا */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              تحلیل رقبای داخلی
            </h3>
            <div className="space-y-4">
              {allSectionsData.competitorAnalysis.domestic.map(
                (competitor, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 border border-orange-200"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">
                      {competitor.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-green-600">
                          مزیت رقیب:
                        </span>
                        <p className="text-gray-700">{competitor.advantage}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-red-600">
                          تهدید برای شما:
                        </span>
                        <p className="text-gray-700">{competitor.threat}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* گام‌های بعدی */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              اقدامات فوری
            </h3>
            <div className="space-y-3">
              {allSectionsData.nextSteps.immediate.map((step, index) => (
                <div
                  key={index}
                  className="bg-orange-50 rounded-lg p-4 border border-orange-200 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#ff7300] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۱۲: منابع و اطلاعات تماس
    page12: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <PageTitle title={" منابع و اطلاعات تماس"} />

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">منابع مفید</h3>
            <div className="space-y-2">
              {allSectionsData.nextSteps.resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 border-b border-gray-100"
                >
                  <div className="w-2 h-2 bg-[#ff7300] rounded-full"></div>
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {resource.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              اطلاعات تماس
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>ایمیل:</span>
                <span>{allSectionsData.nextSteps.contact.email}</span>
              </div>
              <div className="flex justify-between">
                <span>تلفن:</span>
                <span>{allSectionsData.nextSteps.contact.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>آدرس:</span>
                <span className="text-left">
                  {allSectionsData.nextSteps.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // صفحه ۱۳: گواهینامه و کیس استادی
    page13: (
      <div
        className="w-full h-full p-8 bg-gradient-to-br from-orange-50 to-gray-50"
        dir="rtl"
      >
        <div className="space-y-6 h-full flex flex-col justify-between ">
          {/* گواهینامه */}
          {allSectionsData.certification.granted && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                گواهینامه آمادگی صادراتی
              </h3>
              <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-300 border-dashed">
                <div className="text-3xl font-bold text-[#ff7300] mb-2">
                  {allSectionsData.certification.level}
                </div>
                <div className="text-gray-600 mb-4">
                  اعتبار: {allSectionsData.certification.validity}
                </div>
                <div className="text-sm text-gray-500">
                  صادر شده برای {reportData.companyName}
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  <div>تهیه شده توسط: {reportData.preparedBy}</div>
                  <div>بررسی شده توسط: {reportData.reviewedBy}</div>
                  <div>تاریخ ارزیابی: {reportData.assessmentPeriod}</div>
                </div>
              </div>
            </div>
          )}

          {/* پایان گزارش */}
          <div className="text-center pt-8">
            <div className="w-32 h-1 bg-[#ff7300] mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600">پایان گزارش ارزیابی آمادگی صادراتی</p>
            <p className="text-sm text-gray-400 mt-2">
              {reportData.organization} - {reportData.reportDate}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              کد گزارش: {reportData.reportCode}
            </p>
          </div>
        </div>
      </div>
    ),
  };

  const pageEntries = Object.entries(pages);

  return (
    <div ref={ref} className="print-container">
      <style jsx>{`
        @media print {
          .print-container {
            margin: 0;
            padding: 0;
          }
          .page {
            page-break-after: always;
            break-after: page;
            margin: 0;
            padding: 4mm;
            width: ${width}mm;
            height: ${height}mm;
            display: block;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {pageEntries.map(([key, content]) => (
        <div
          key={key}
          className="page relative"
          style={{
            width: `${width}mm`,
            height: `${height}mm`,
            boxSizing: "border-box",
          }}
        >
          {/* محتوای صفحه */}
          <div className="relative z-10 text-gray-900 h-full">{content}</div>
        </div>
      ))}
    </div>
  );
});

PrintSection.displayName = "PrintSection";
export default PrintSection;
