"use client";

import { useEffect, useState, useRef } from "react";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import { IoCheckmarkDoneOutline, IoReturnDownBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/src/components/layout/Modal";
import { useContextStore } from "@/src/store/contextCode";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";

// تابع limitWords برای متن‌های عادی
const limitWords = (text, wordLimit = 25) => {
  if (!text) return "";
  if (Array.isArray(text)) {
    return text
      .slice(0, 2)
      .map((item) => (item ? item.substring(0, 50) + "..." : ""))
      .join(" ");
  }
  const textString = typeof text === "string" ? text : String(text);
  const words = textString.split(" ");
  if (words.length <= wordLimit) return textString;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const data = [
  {
    id: 2,
    section: "#1",
    title: "تجربه تجاری",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " تجربه تجاری شرکت، نشان‌دهنده سابقه فعالیت‌های داخلی و بین‌المللی است که در ارزیابی توانمندی صادراتی نقش کلیدی ایفا می‌کند، زیرا پیش‌بینی‌کننده موفقیت در بازارهای جدید محسوب می‌شود. این بخش شامل بررسی قراردادها، فروش‌های گذشته و تجربیات صادراتی می‌شود که به شناسایی الگوهای موفق و شکست‌ها کمک می‌کند. بدون تحلیل تجربه تجاری، شرکت‌ها ممکن است اشتباهات گذشته را تکرار کنند و منابع خود را هدر دهند. استانداردهای جهانی مانند ابزارهای UNCTAD بر اهمیت این بخش برای سنجش آمادگی تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، تجربیات محلی را با چالش‌هایی مانند تحریم‌ها تطبیق می‌دهد تا شرکت‌ها بتوانند از تجربیات گذشته برای استراتژی‌های آینده استفاده کنند. ارزیابی این بخش، شرکت‌ها را در تقویت نقاط قوت و رفع ضعف‌ها یاری می‌رساند و اعتماد به نفس برای ورود به بازارهای رقابتی را افزایش می‌دهد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            "هدف این است که تصویر جامعی از ساختار و توانمندی‌های شرکت به دست آید. باید بتوانیم سطح آمادگی شرکت برای فعالیت‌های تجاری را ارزیابی کنیم. این بخش باید نشان‌دهنده تجربه موفق در بازارهای مختلف باشد. انتظار می‌رود نقاط قوت و فرصت‌های بهبود مشخص شوند. نتیجه باید شامل شناخت دقیق از منابع و زیرساخت‌ها باشد. باید بتوانیم ریسک‌های مرتبط با شرکت را شناسایی کنیم. این بخش باید پایه‌ای برای تدوین استراتژی‌های آینده فراهم کند. انتظار می‌رود اعتماد به پتانسیل شرکت افزایش یابد. نتیجه باید نشان‌دهنده پایداری شرکت در بلندمدت باشد. در نهایت، این بخش باید راهنمایی برای سرمایه‌گذاری و همکاری ارائه دهد.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی تجربه تجاری",
        content: {
          keyResults: [
            "شناسایی تجربیات موفق گذشته برای تکرار در بازارهای صادراتی جدید.",
            "تحلیل شکست‌های قبلی به منظور جلوگیری از تکرار اشتباهات تجاری.",
            "افزایش اعتماد شرکای خارجی بر اساس سابقه اثبات‌شده فعالیت‌ها.",
            "تدوین استراتژی‌های مبتنی بر تجربیات داخلی برای صادرات بین‌المللی.",
            "ارزیابی نیاز به آموزش تیم‌ها بر اساس تجربیات تجاری پیشین.",
          ],
        },
      },
      {
        title: "مدیر بازرگانی یا مدیر فروش داخلی/بین‌المللی",
        content:
          "این پست‌ها مستقیماً با معاملات تجاری، قراردادها و تجربیات گذشته درگیر هستند و داده‌های دقیق در مورد سابقه تجاری شرکت را دارند.",
      },
    ],
    questions: 20,
    answered: 20,
    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 3,
    section: "#2",
    title: "ظرفیت تولید و عملیات",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " ظرفیت تولید و عملیات، ستون فقرات موفقیت صادراتی شرکت‌هاست، زیرا توانایی پاسخگویی به تقاضای بازارهای بین‌المللی را تضمین می‌کند. ارزیابی دقیق این بخش، شرکت‌ها را قادر می‌سازد تا با شناسایی محدودیت‌ها و بهینه‌سازی فرآیندها، به استانداردهای جهانی دست یابند. این امر ریسک‌های عملیاتی را کاهش داده و مزیت رقابتی پایداری ایجاد می‌کند. استانداردهای جهانی مانند ISO و مدل CORE بر اهمیت این بخش برای تضمین کیفیت و کارایی تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط سازمان‌هایی مانند TPO، ظرفیت‌ها را با شرایط محلی مانند زنجیره تأمین داخلی تطبیق می‌دهد. ارزیابی این بخش نه تنها بهره‌وری را افزایش می‌دهد، بلکه شرکت‌ها را در برابر نوسانات بازار مقاوم می‌سازد و فرصت‌های رشد را فراهم می‌آورد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            "هدف این است که سطح تولید و کارایی عملیاتی شرکت مشخص شود. باید بتوانیم ظرفیت فعلی و پتانسیل رشد را ارزیابی کنیم. این بخش باید نشان‌دهنده توانایی پاسخ به نیازهای بازار باشد. انتظار می‌رود نقاط ضعف در زنجیره تولید شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای بهینه‌سازی عملیات باشد. باید بتوانیم پایداری تولید را تضمین کنیم. این بخش باید راهکارهایی برای افزایش کیفیت ارائه دهد. انتظار می‌رود انعطاف‌پذیری تولید مشخص شود. نتیجه باید پایه‌ای برای سرمایه‌گذاری در زیرساخت‌ها باشد. در نهایت، این بخش باید آمادگی شرکت را برای مقیاس‌پذیری نشان دهد.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی ظرفیت تولید و عملیات",
        content: {
          keyResults: [
            "شناسایی ظرفیت تولید فعلی برای پاسخگویی به سفارشات صادراتی بدون اختلال داخلی.",
            "ارزیابی کیفیت محصولات در انطباق با استانداردهای بین‌المللی مانند ISO یا CE.",
            "بهینه‌سازی زنجیره تأمین برای تضمین تداوم تولید در بازارهای جهانی.",
            "تحلیل هزینه‌های تولید و لجستیک جهت تعیین قیمت رقابتی صادراتی.",
            "بررسی تجهیزات و نیروی انسانی برای پشتیبانی از حجم صادرات افزایشی.",
          ],
        },
      },
      {
        title: "مدیر تولید یا مدیر عملیات",
        content:
          "آنها مسئول فرآیندهای تولید، ظرفیت خطوط تولید، تجهیزات و کارایی عملیاتی هستند و می‌توانند ارزیابی دقیقی از توانایی‌های تولیدی ارائه دهند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 4,
    section: "#3",
    title: "ظرفیت مالی",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " ظرفیت مالی شرکت، عامل تعیین‌کننده در پایداری و موفقیت فعالیت‌های صادراتی است، زیرا منابع لازم برای سرمایه‌گذاری، بازاریابی و مدیریت ریسک‌ها را فراهم می‌کند. این بخش شامل بررسی ترازنامه، جریان نقدی و دسترسی به اعتبارات می‌شود که به ارزیابان کمک می‌کند تا توانایی تحمل هزینه‌های صادراتی را سنجیده و پیشنهادهایی برای بهبود ارائه دهند. بدون ارزیابی دقیق مالی، شرکت‌ها ممکن است با کمبود منابع مواجه شوند و فرصت‌های صادراتی را از دست بدهند. استانداردهای جهانی مانند ابزارهای ITC بر تحلیل مالی برای پیش‌بینی ریسک‌ها تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط بانک‌ها و TPO، ظرفیت مالی را با چالش‌هایی مانند نرخ ارز و تحریم‌ها هماهنگ می‌سازد. ارزیابی این بخش، شرکت‌ها را در جذب سرمایه‌گذاران خارجی یاری می‌رساند و پایه‌ای برای برنامه‌ریزی بلندمدت فراهم می‌آورد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            "هدف این است که وضعیت مالی فعلی شرکت ارزیابی شود. باید بتوانیم توانایی شرکت برای سرمایه‌گذاری را تعیین کنیم. این بخش باید نشان‌دهنده پایداری مالی در بلندمدت باشد. انتظار می‌رود ریسک‌های مالی شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای مدیریت نقدینگی باشد. باید بتوانیم فرصت‌های سرمایه‌گذاری جدید را مشخص کنیم. این بخش باید اعتماد به ثبات مالی شرکت را افزایش دهد. انتظار می‌رود راهکارهایی برای کاهش هزینه‌ها ارائه شود. نتیجه باید آمادگی شرکت برای جذب سرمایه را نشان دهد. در نهایت، این بخش باید پایه‌ای برای رشد اقتصادی فراهم کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی ظرفیت مالی",
        content: {
          keyResults: [
            "شناسایی منابع مالی موجود برای سرمایه‌گذاری در فعالیت‌های صادراتی.",
            "تحلیل جریان نقدی به منظور مدیریت هزینه‌های بازاریابی بین‌المللی.",
            "ارزیابی دسترسی به اعتبارات بانکی برای پوشش ریسک‌های ارزی.",
            "تشخیص نقاط ضعف مالی و پیشنهاد راهکارهای تأمین سرمایه.",
            "پیش‌بینی پایداری مالی در برابر نوسانات بازارهای جهانی.",
          ],
        },
      },
      {
        title: "مدیر مالی (CFO) یا حسابدار ارشد",
        content:
          "این افراد به گزارش‌های مالی، بودجه، ترازنامه و جریان نقدی دسترسی دارند و می‌توانند وضعیت مالی شرکت را با دقت تحلیل کنند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 5,
    section: "#4",
    title: "دانش بازار و فروش",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " دانش بازار و فروش، کلید موفقیت شرکت‌ها در صادرات است، زیرا درک عمیق از نیازها و رفتار مشتریان بین‌المللی، استراتژی‌های هدفمند را شکل می‌دهد. ارزیابی این بخش به شرکت‌ها کمک می‌کند تا بازارهای مناسب را شناسایی کرده و رویکردهای بازاریابی را با استانداردهای جهانی هماهنگ سازند. این فرآیند، ریسک‌های ورود به بازارهای جدید را کاهش داده و شانس موفقیت تجاری را افزایش می‌دهد. استانداردهای جهانی مانند مدل UNCTAD بر اهمیت دانش بازار برای تحلیل رقبا تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، دانش محلی را با بازارهای منطقه‌ای تطبیق می‌دهد. ارزیابی این بخش نه تنها فروش را افزایش می‌دهد، بلکه روابط بلندمدت با مشتریان خارجی را تقویت می‌کند.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            " هدف این است که سطح آگاهی شرکت از بازارهای هدف مشخص شود. باید بتوانیم اثربخشی استراتژی‌های فروش را ارزیابی کنیم. این بخش باید نشان‌دهنده توانایی جذب مشتری باشد. انتظار می‌رود نقاط ضعف در بازاریابی شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای رصد بازار باشد. باید بتوانیم مزیت رقابتی شرکت را تعیین کنیم. این بخش باید راهکارهایی برای افزایش فروش ارائه دهد. انتظار می‌رود انعطاف‌پذیری در برابر تغییرات بازار مشخص شود. نتیجه باید آمادگی شرکت برای گسترش بازار را نشان دهد. در نهایت، این بخش باید رشد پایدار فروش را تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی دانش بازار و فروش",
        content: {
          keyResults: [
            "شناسایی بازارهای هدف بالقوه بر اساس تقاضا و روندهای اقتصادی جهانی.",
            "تحلیل رفتار مصرف‌کننده برای تطبیق استراتژی‌های فروش بین‌المللی.",
            "ارزیابی اثربخشی بازاریابی در مقایسه با استانداردهای جهانی رقبا.",
            "شناسایی مقررات تجاری و تعرفه‌ها در بازارهای هدف صادراتی.",
            "توسعه شبکه‌های فروش از طریق روابط با توزیع‌کنندگان خارجی.",
          ],
        },
      },
      {
        title: "مدیر بازاریابی یا مدیر فروش",
        content:
          "آنها دانش عمیقی از بازارهای هدف، رقبا، استراتژی‌های فروش و داده‌های بازار دارند و می‌توانند اطلاعات مرتبط را دقیق پر کنند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 6,
    section: "#5",
    title: " تبلیغات و اطلاع‌رسانی",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " تبلیغات و اطلاع‌رسانی، ابزارهای حیاتی برای جلب توجه مشتریان بین‌المللی و ایجاد برند قوی در بازارهای صادراتی هستند، زیرا آگاهی از محصولات را افزایش می‌دهند. این بخش شامل بررسی کانال‌های تبلیغاتی، محتوای اطلاع‌رسانی و اثربخشی کمپین‌ها می‌شود که به شرکت‌ها کمک می‌کند تا استراتژی‌های مؤثری تدوین کنند. بدون ارزیابی این بخش، شرکت‌ها ممکن است منابع تبلیغاتی را هدر دهند و فرصت‌های بازار را از دست بدهند. استانداردهای جهانی مانند ابزارهای ITC بر اهمیت تبلیغات دیجیتال تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، تبلیغات را با پلتفرم‌های محلی و تحریم‌ها هماهنگ می‌سازد. ارزیابی این بخش، شرکت‌ها را در افزایش سهم بازار یاری می‌رساند و بازخوردهای مشتریان را بهبود می‌بخشد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            " هدف این است که اثربخشی تبلیغات شرکت ارزیابی شود. باید بتوانیم سطح شناخت برند در بازار را تعیین کنیم. این بخش باید نشان‌دهنده توانایی جذب مشتری از طریق تبلیغات باشد. انتظار می‌رود نقاط ضعف در اطلاع‌رسانی شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای کمپین‌های جدید باشد. باید بتوانیم بازده سرمایه‌گذاری در تبلیغات را محاسبه کنیم. این بخش باید راهکارهایی برای بهبود تصویر برند ارائه دهد. انتظار می‌رود انعطاف‌پذیری در روش‌های تبلیغاتی مشخص شود. نتیجه باید آمادگی شرکت برای بازارهای جدید را نشان دهد. در نهایت، این بخش باید رشد فروش از طریق تبلیغات را تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی تبلیغات و اطلاع‌رسانی",
        content: {
          keyResults: [
            "شناسایی کانال‌های تبلیغاتی مؤثر برای دسترسی به مشتریان بین‌المللی.",
            "تحلیل اثربخشی کمپین‌های اطلاع‌رسانی در افزایش آگاهی برند.",
            "بهینه‌سازی محتوای تبلیغاتی بر اساس بازخوردهای بازارهای هدف.",
            "ارزیابی هزینه‌های تبلیغات نسبت به بازگشت سرمایه صادراتی.",
            "توسعه استراتژی‌های دیجیتال برای اطلاع‌رسانی در بازارهای جهانی.",
          ],
        },
      },
      {
        title: "مدیر تبلیغات یا مدیر روابط عمومی (PR)",
        content:
          "این پست‌ها مسئول کمپین‌های تبلیغاتی، رسانه‌ها و اطلاع‌رسانی هستند و جزئیات دقیقی در مورد استراتژی‌های تبلیغاتی دارند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 7,
    section: "#6",
    title: "تعهد مدیریت و منابع انسانی",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " تعهد مدیریت و منابع انسانی، موتور محرک موفقیت صادراتی است، زیرا رهبری قوی و نیروی کار ماهر، اجرای استراتژی‌ها را تضمین می‌کنند. این بخش شامل بررسی تعهد مدیران به صادرات و مهارت‌های کارکنان می‌شود که به شناسایی نیازهای آموزشی کمک می‌کند. بدون ارزیابی این بخش، شرکت‌ها ممکن است با کمبود انگیزه و تخصص مواجه شوند. استانداردهای جهانی مانند مدل CORE بر اهمیت منابع انسانی تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، تعهد را با فرهنگ سازمانی محلی تطبیق می‌دهد. ارزیابی این بخش، شرکت‌ها را در ایجاد فرهنگ صادراتی یاری می‌رساند و بهره‌وری را افزایش می‌دهد",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            " هدف این است که سطح تعهد مدیریت شرکت ارزیابی شود. باید بتوانیم کارایی منابع انسانی را تعیین کنیم. این بخش باید نشان‌دهنده فرهنگ سازمانی قوی باشد. انتظار می‌رود نقاط ضعف در مدیریت شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای توسعه تیم باشد. باید بتوانیم پایداری عملکرد شرکت را تضمین کنیم. این بخش باید راهکارهایی برای جذب استعداد ارائه دهد. انتظار می‌رود انعطاف‌پذیری در مدیریت مشخص شود. نتیجه باید آمادگی شرکت برای چالش‌های جدید را نشان دهد. در نهایت، این بخش باید رشد پایدار از طریق تیم قوی را تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی تعهد مدیریت و منابع انسانی",
        content: {
          keyResults: [
            "ارزیابی تعهد مدیران به اهداف صادراتی برای برنامه‌ریزی بلندمدت.",
            "شناسایی نیازهای آموزشی کارکنان برای مهارت‌های بین‌المللی.",
            "تقویت فرهنگ سازمانی متمرکز بر صادرات و رشد جهانی",
            "تحلیل انگیزه نیروی کار برای افزایش بهره‌وری صادراتی.",
            "توسعه برنامه‌های منابع انسانی متناسب با بازارهای هدف.",
          ],
        },
      },
      {
        title: "مدیر منابع انسانی (HR) یا مدیرعامل",
        content:
          "مدیر منابع انسانی به تعهدات مدیریتی، آموزش کارکنان و منابع انسانی مسلط است، در حالی که مدیرعامل می‌تواند جنبه‌های کلی تعهد را پوشش دهد.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 8,
    section: "#7",
    title: " تطبیق‌پذیری محصول و بسته‌بندی",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " تطبیق‌پذیری محصول و بسته‌بندی، نقشی حیاتی در موفقیت صادراتی ایفا می‌کند، زیرا انطباق با نیازها و استانداردهای بازارهای جهانی را تضمین می‌نماید. ارزیابی این بخش به شرکت‌ها کمک می‌کند تا محصولات خود را با فرهنگ، مقررات و انتظارات مشتریان بین‌المللی هماهنگ سازند. این فرآیند، پذیرش محصول در بازارهای جدید را افزایش داده و رقابت‌پذیری را تقویت می‌کند. استانداردهای جهانی مانند ISO و HACCP بر اهمیت تطبیق تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، محصولات را با مقررات محلی تطبیق می‌دهد. ارزیابی این بخش نه تنها فروش را افزایش می‌دهد، بلکه ریسک‌های بازگشت کالا را کاهش می‌دهد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            " هدف این است که سطح تطبیق‌پذیری محصول ارزیابی شود. باید بتوانیم انعطاف‌پذیری بسته‌بندی را تعیین کنیم. این بخش باید نشان‌دهنده توانایی ورود به بازارهای جدید باشد. انتظار می‌رود نقاط ضعف در طراحی شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای نوآوری محصول باشد. باید بتوانیم استانداردها را رعایت کنیم. این بخش باید راهکارهایی برای بهینه‌سازی بسته‌بندی ارائه دهد. انتظار می‌رود تطبیق با نیازهای محلی مشخص شود. نتیجه باید آمادگی شرکت برای صادرات را نشان دهد. در نهایت، این بخش باید مزیت رقابتی از طریق محصول را تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی تطبیق‌پذیری محصول و بسته‌بندی",
        content: {
          keyResults: [
            "بررسی انطباق محصول با استانداردهای کیفی بین‌المللی مانند ISO یا FDA.",
            "شناسایی ویژگی‌های فرهنگی محصول برای بازارهای هدف صادراتی.",
            "بهینه‌سازی طراحی بسته‌بندی برای دوام و جذابیت در حمل‌ونقل جهانی.",
            "محاسبه هزینه‌های تطبیق محصول برای ورود به بازارهای جدید.",
            "اطمینان از رعایت الزامات برچسب‌گذاری در قوانین بازارهای هدف.",
          ],
        },
      },
      {
        title: "مدیر تحقیق و توسعه (D&R) یا مدیر کیفیت",
        content:
          "آنها مسئول طراحی محصول، بسته‌بندی و تطبیق با استانداردهای بازار هستند و می‌توانند ارزیابی دقیقی از انعطاف‌پذیری ارائه دهند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 9,
    section: "#8",
    title: "مدیریت ریسک و شبکه‌سازی",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " مدیریت ریسک و شبکه‌سازی، عناصر کلیدی برای حفاظت از منافع شرکت در محیط پرنوسان صادرات هستند، زیرا ریسک‌های مالی، حقوقی و عملیاتی را شناسایی و کاهش می‌دهند. این بخش شامل تحلیل ریسک‌ها و روابط شبکه‌ای می‌شود که به شرکت‌ها کمک می‌کند تا استراتژی‌های پیشگیرانه تدوین کنند. بدون ارزیابی این بخش، شرکت‌ها ممکن است با خسارات غیرمنتظره مواجه شوند. استانداردهای جهانی مانند ابزارهای UNCTAD بر اهمیت شبکه‌سازی تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، ریسک‌ها را با تحریم‌ها تطبیق می‌دهد. ارزیابی این بخش، شرکت‌ها را در ایجاد روابط پایدار یاری می‌رساند و انعطاف‌پذیری را افزایش می‌دهد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            "هدف این است که سطح مدیریت ریسک شرکت ارزیابی شود. باید بتوانیم اثربخشی شبکه‌سازی را تعیین کنیم. این بخش باید نشان‌دهنده آمادگی برای بحران‌ها باشد. انتظار می‌رود نقاط ضعف در ریسک شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای کاهش ریسک باشد. باید بتوانیم روابط استراتژیک را تقویت کنیم. این بخش باید راهکارهایی برای شبکه‌سازی ارائه دهد. انتظار می‌رود انعطاف‌پذیری در برابر تهدیدات مشخص شود. نتیجه باید آمادگی شرکت برای پایداری را نشان دهد. در نهایت، این بخش باید رشد از طریق همکاری را تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی مدیریت ریسک و شبکه‌سازی",
        content: {
          keyResults: [
            "شناسایی ریسک‌های صادراتی مانند نوسانات ارزی و پیشنهاد راهکارها.",
            "توسعه شبکه‌های تجاری برای دسترسی به شرکای بین‌المللی.",
            "تحلیل ریسک‌های حقوقی در قراردادهای صادراتی جهانی.",
            "تقویت روابط شبکه‌ای برای کاهش وابستگی به بازارهای داخلی.",
            "تدوین برنامه‌های مدیریت ریسک برای پایداری فعالیت‌های صادراتی.",
          ],
        },
      },
      {
        title: "مدیر ریسک یا مدیر استراتژیک",
        content:
          "این افراد به شناسایی ریسک‌ها، برنامه‌ریزی احتمالی و شبکه‌های تجاری مسلط هستند و اطلاعات دقیقی در این زمینه دارند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
  {
    id: 10,
    section: "#9",
    title: "واسطه صادرات",
    texts: [
      {
        title: "اهمیت بخش",
        content:
          " واسطه صادرات، پلی بین شرکت و بازارهای بین‌المللی است که تسهیل‌کننده فرآیندهای صادراتی مانند لجستیک و فروش می‌شود و اهمیت آن در ارزیابی توانمندی غیرقابل انکار است. این بخش شامل بررسی نقش واسطه‌ها مانند شرکت‌های مدیریت صادرات می‌شود که به شرکت‌ها کمک می‌کند تا بدون تجربه مستقیم، وارد بازارها شوند. بدون ارزیابی این بخش، شرکت‌ها ممکن است با انتخاب واسطه نامناسب، ریسک‌های بالایی بپذیرند. استانداردهای جهانی مانند مدل ITC بر اهمیت واسطه‌ها برای کوچک‌سازی ریسک‌ها تأکید دارند. در ایران، بومی‌سازی این استانداردها توسط TPO، واسطه‌ها را با مقررات داخلی هماهنگ می‌سازد. ارزیابی این بخش، شرکت‌ها را در انتخاب شرکای مناسب یاری می‌رساند و کارایی صادرات را افزایش می‌دهد.",
      },
      {
        title: "نتیجه کلی که از بخش می‌خواهیم بگیریم",
        content: {
          description:
            "هدف این است که سطح همکاری با واسطه‌ها ارزیابی شود. باید بتوانیم اثربخشی واسطه‌ها در صادرات را تعیین کنیم. این بخش باید نشان‌دهنده توانایی ورود به بازارهای جدید باشد. انتظار می‌رود نقاط ضعف در مدیریت واسطه‌ها شناسایی شوند. نتیجه باید شامل برنامه‌ریزی برای انتخاب واسطه باشد. باید بتوانیم ریسک‌های صادراتی را کاهش دهیم. این بخش باید راهکارهایی برای بهینه‌سازی لجستیک ارائه دهد. انتظار می‌رود تطبیق با قوانین بین‌المللی مشخص شود. نتیجه باید آمادگی شرکت برای صادرات موفق را نشان دهد. در نهایت، این بخش باید رشد صادرات را از طریق واسطه‌ها تضمین کند.",
        },
      },
      {
        title: "نتایج کلیدی از ارزیابی واسطه صادرات",
        content: {
          keyResults: [
            "شناسایی واسطه‌های معتبر برای تسهیل ورود به بازارهای جهانی.",
            "تحلیل نقش واسطه در کاهش ریسک‌های لجستیکی صادراتی.",
            "ارزیابی قراردادهای واسطه برای حفاظت از منافع شرکت.",
            "توسعه روابط با واسطه‌ها برای افزایش حجم فروش صادراتی.",
            "بهینه‌سازی هزینه‌های صادراتی از طریق انتخاب واسطه کارآمد.",
          ],
        },
      },
      {
        title: "مدیر صادرات یا مدیر زنجیره تأمین",
        content:
          "آنها مستقیماً با واسطه‌ها، صادرکنندگان و فرآیندهای صادراتی درگیر هستند و می‌توانند جزئیات دقیق در مورد شبکه‌های صادراتی ارائه دهند.",
      },
    ],
    questions: 20,
    answered: 20,

    get href() {
      return `/dashboard/question/${this.id}`;
    },
  },
];

// کامپوننت توضیحات صفحه
const PageDescription = () => (
  <motion.div
    className="w-full mx-auto mb-8 text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-2xl xl:text-3xl font-bold text-white mb-4">
      ارزیابی جامع صادراتی
    </h1>
    <p className="p-4 bg-green-500/20 text-green-500 w-fit border border-green-500 rounded-[10px] flex items-start gap-2">
      در این صفحه می‌توانید با استفاده از ابزار ارزیابی صادراتی، وضعیت شرکت خود
      را در ۹ بخش مختلف تحلیل کنید. هر بخش شامل سوالات تخصصی است که پس از
      پاسخگویی، نمایی کامل از توانمندی‌ها و نقاط بهبود شرکت را در اختیار شما
      قرار می‌دهد.
    </p>
  </motion.div>
);

// تابع فیلتر کردن متن‌ها
const getTimelineTexts = (texts) => {
  return texts.filter((textItem) => !textItem.title.includes("نتایج کلیدی"));
};

// کامپوننت برای نمایش محتوای با دایره‌های رنگی
const BulletList = ({ items, limit }) => {
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-3">
      {displayItems.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-start gap-3 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <div className="w-3 h-3 rounded-full bg-[var(--orgin-color)] mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
          <span className="text-sm leading-relaxed text-gray-200 flex-1 group-hover:text-white transition-colors">
            {item}
          </span>
        </motion.div>
      ))}
      {limit && items.length > limit && (
        <motion.div
          className="text-gray-400 text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          +{items.length - limit} مورد دیگر
        </motion.div>
      )}
    </div>
  );
};

// کامپوننت برای نمایش محتوای تو در تو در تایم‌لاین
const TimelineNestedContent = ({ content, limit }) => {
  if (!content || typeof content !== "object") return null;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm leading-relaxed text-gray-200">
          {content.description
            ? limit
              ? limitWords(content.description, 25)
              : content.description
            : ""}
        </p>
      </div>
    </div>
  );
};

// کامپوننت برای نمایش محتوای تو در تو در پاپ‌آپ - اصلاح شده
const PopupNestedContent = ({ content }) => {
  if (!content || typeof content !== "object") return null;

  return (
    <div className="space-y-6">
      {content.description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm leading-relaxed text-gray-200 mb-3 bg-gray-800/30 rounded-lg p-4 border-l-4 border-gray-600">
            {content.description}
          </p>
        </motion.div>
      )}
      {content.keyResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h5 className="font-semibold text-[var(--orgin-color)] mb-3 text-lg">
            نتایج کلیدی:
          </h5>
          <BulletList items={content.keyResults} />
        </motion.div>
      )}
    </div>
  );
};

// کامپوننت دایره پیشرفت با رنگ‌های مختلف
const ProgressCircle = ({ progress, size = 32 }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress.percent / 100) * circumference;

  // تعیین رنگ بر اساس درصد
  const getProgressColor = () => {
    if (progress.percent === 0) return "text-red-500";
    if (progress.percent === 100) return "text-green-500";
    return "text-[var(--orgin-color)]";
  };

  const progressColor = getProgressColor();

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
    >
      <svg
        className={`w-${size} h-${size} transform -rotate-90`}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700/50"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ease-out ${progressColor}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
        />
      </svg>
    </motion.div>
  );
};

// کامپوننت کارت تایم‌لاین
const TimelineCard = ({ item, index, progress, handleReadMore, isVisible }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`flex items-center w-full min-h-[400px] ${
        index % 2 === 0 ? "flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.9 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
    >
      <motion.div
        className="w-[45%] px-4 relative"
        whileHover={{
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <GlassCard>
          <div className="relative z-10">
            {/* هدر کارت */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex-1 flex gap-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {item.section}
                </h3>
                <p className="text-gray-300 text-lg font-medium mt-1">
                  {item.title}
                </p>
              </div>
            </motion.div>

            {/* محتوای کارت - 3 بخش */}
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getTimelineTexts(item.texts)
                .slice(0, 2) // نمایش دقیقاً 3 بخش
                .map((textItem, textIndex) => (
                  <motion.div
                    key={textIndex}
                    className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm group hover:border-gray-600/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: textIndex * 0.1 + 0.5 }}
                  >
                    <h4 className="font-semibold text-[var(--orgin-color)] mb-1 text-lg">
                      {textItem.title}
                    </h4>
                    {Array.isArray(textItem.content) ? (
                      <BulletList items={textItem.content} limit={2} />
                    ) : typeof textItem.content === "object" &&
                      textItem.content !== null ? (
                      <TimelineNestedContent
                        content={textItem.content}
                        limit={true}
                      />
                    ) : textItem.content ? (
                      <p className="text-sm leading-relaxed text-gray-200">
                        {limitWords(textItem.content, 10)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">
                        محتوایی موجود نیست
                      </p>
                    )}
                  </motion.div>
                ))}
            </motion.div>

            {/* دکمه‌های اقدام */}
            <motion.div
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href={item.href} className="flex-1">
                <motion.div className="w-full">
                  <Button type={1} label={"شروع ارزیابی"} />
                </motion.div>
              </Link>

              <motion.div className="flex-1">
                <Button
                  type={3}
                  label={"مشاهده جزئیات"}
                  onClick={() => handleReadMore(item)}
                />
              </motion.div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* نقطه اتصال تایم‌لاین */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        <Link href={item.href}>
          <motion.div
            className="relative flex items-center justify-center w-28 h-28 cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* هاله نور پویا */}
            <motion.div
              className="absolute inset-0 rounded-full transition-all duration-500 backdrop-blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* نوار درصد پیشرفت */}
            <ProgressCircle progress={progress} size={32} />

            {/* محتوای اصلی با پس‌زمینه بلور */}
            <motion.div
              className="absolute flex items-center justify-center w-24 h-24 rounded-full shadow-2xl bg-neutral-700 backdrop-blur-[100px]"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              {progress.loading ? (
                <LoadingSpinner />
              ) : progress.percent === 100 ? (
                <motion.div
                  className="flex flex-col items-center text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <IoCheckmarkDoneOutline
                    size={"2rem"}
                    className="text-green-500"
                  />
                  <span className="text-xs mt-1 font-bold text-green-500">
                    تکمیل شده
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="font-bold text-[18px]">
                    {progress.percent}%
                  </span>
                  <span className="text-[12px] opacity-90">
                    {progress.answered}/{progress.questions}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* افکت پالس برای آیتم‌های فعال */}
            {progress.percent == 0 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-rose-500"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {progress.percent > 0 && progress.percent < 100 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--orgin-color)]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {progress.percent == 100 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-500"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </Link>
      </div>
      <div className="w-[48%]"></div>
    </motion.div>
  );
};

// کامپوننت کارت موبایل
const MobileTimelineCard = ({ item, progress, handleReadMore, index }) => {
  return (
    <motion.div
      className="bg-black/50 backdrop-blur-sm  rounded-3xl p-6 mb-4 border border-gray-600/30 shadow-2xl relative overflow-hidden group"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="relative z-10">
        {/* هدر موبایل */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {item.section} | {item.title}
              </h3>
            </div>
          </div>

          {/* نمایش درصد پیشرفت در موبایل */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-gray-300 font-medium">
              {progress.percent}%
            </div>
            <ProgressCircle progress={progress} size={10} />
          </motion.div>
        </motion.div>

        {/* محتوای موبایل - 3 بخش */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {getTimelineTexts(item.texts)
            .slice(0, 3) // نمایش دقیقاً 3 بخش در موبایل
            .map((t, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <h4 className="font-semibold text-[var(--orgin-color)] mb-3">
                  {t.title}
                </h4>
                {Array.isArray(t.content) ? (
                  <BulletList items={t.content} limit={2} />
                ) : typeof t.content === "object" && t.content !== null ? (
                  <TimelineNestedContent content={t.content} limit={true} />
                ) : t.content ? (
                  <p className="text-sm leading-relaxed text-gray-200">
                    {limitWords(t.content, 25)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">محتوایی موجود نیست</p>
                )}
              </motion.div>
            ))}
        </motion.div>

        {/* دکمه‌های اقدام موبایل */}
        <motion.div
          className="flex items-center justify-between mt-6 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href={item.href} className="flex-1">
            <motion.button
              className="w-full px-4 py-3 bg-[var(--orgin-color)] text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ارزیابی
            </motion.button>
          </Link>

          <motion.button
            onClick={() => handleReadMore(item)}
            className="flex-1 px-4 py-3 border border-gray-500 text-gray-300 rounded-xl text-sm font-medium hover:border-gray-400 hover:text-white transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            جزئیات
          </motion.button>
        </motion.div>

        {/* وضعیت پیشرفت */}
        <motion.div
          className="flex justify-between items-center mt-4 text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            {progress.loading ? (
              <>
                <LoadingSpinner />
                <span>در حال دریافت اطلاعات...</span>
              </>
            ) : (
              <span>
                پیشرفت: {progress.answered}/{progress.questions} سوال
              </span>
            )}
          </div>
          <motion.div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              progress.percent === 0
                ? "bg-red-500/20 text-red-300"
                : progress.percent === 100
                ? "bg-green-500/20 text-green-300"
                : "bg-[var(--orgin-color)]/20 text-[var(--orgin-color)]"
            }`}
          >
            {progress.percent === 0
              ? "شروع نشده"
              : progress.percent === 100
              ? "تکمیل شده"
              : "در حال انجام"}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
// کامپوننت اسپینر لودینگ
const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center w-full h-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
  </motion.div>
);

// کامپوننت لودینگ سراسری
const GlobalLoading = () => <DashboardSection></DashboardSection>;

export default function Timeline() {
  const { contextCode } = useContextStore();
  const { clientId, token } = useSessionStore();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assessmentStatuses, setAssessmentStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  // تنظیمات انیمیشن اسکرول
  useEffect(() => {
    if (!dataLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".timeline-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [dataLoaded]);

  useEffect(() => {
    if (!clientId || !token) {
      setLoading(false);
      return;
    }

    const getAssessmentStatuses = async () => {
      try {
        setLoading(true);
        const sections = Array.from({ length: 9 }, (_, i) => i + 2);

        const requests = sections.map((section) =>
          fetch(BaseUrl("/assessment/status"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appId: clientId,
              token: token,
              AScode: contextCode,
              section,
            }),
          }).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        setAssessmentStatuses(results);
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
        setDataLoaded(false);
      } finally {
        setLoading(false);
      }
    };

    getAssessmentStatuses();
  }, [clientId, token, contextCode]);

  // تابع برای گرفتن درصد پیشرفت از API
  const getProgressFromAPI = (sectionId) => {
    const index = sectionId - 2;

    if (assessmentStatuses[index] && assessmentStatuses[index].data) {
      const apiData = assessmentStatuses[index].data;
      return {
        percent: apiData.percent,
        answered: apiData.ansed,
        questions: apiData.all,
        loaded: true,
        loading: false,
      };
    }

    // اگر داده‌ای از API دریافت نشده، از داده‌های پیش‌فرض استفاده کن
    const item = data.find((item) => item.id === sectionId);
    return {
      percent: Math.round((item.answered / item.questions) * 100),
      answered: item.answered,
      questions: item.questions,
      loaded: false,
      loading: false,
    };
  };

  const handleReadMore = (item) => {
    setSelectedItem(item);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedItem(null);
  };

  // اگر داده‌ها هنوز لود نشده، اسپینر نمایش بده
  if (!dataLoaded || loading) {
    return <GlobalLoading />;
  }

  return (
    <AccessGuard>
      <div className="w-full h-full relative overflow-hidden ">
        <DashboardSection className="relative z-10">
          {/* --- دسکتاپ (بالای lg) --- */}
          <PageDescription/>
          <div
            className="hidden xl:block relative w-[95%] mx-auto mb-20"
            ref={timelineRef}
          >
            {/* خط تایم‌لاین پویا */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1.5 transform -translate-x-1/2 bg-[var(--orgin-color)] rounded-full shadow-2xl shadow-amber-500/30"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* نقاط اتصال روی خط تایم‌لاین */}
            {data.map((_, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                style={{ top: `${(index * 100) / data.length}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              ></motion.div>
            ))}

            <div className="relative">
              {data.map((item, index) => {
                const progress = getProgressFromAPI(item.id);
                return (
                  <div
                    key={index}
                    className="timeline-card "
                    data-index={index}
                  >
                    <TimelineCard
                      item={item}
                      index={index}
                      progress={progress}
                      handleReadMore={handleReadMore}
                      isVisible={visibleItems.includes(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- موبایل (زیر lg) --- */}
          <div className="xl:hidden w-full grid lg:grid-cols-2 gap-4 mx-auto">
            {data.map((item, index) => {
              const progress = getProgressFromAPI(item.id);
              return (
                <MobileTimelineCard
                  key={index}
                  item={item}
                  progress={progress}
                  handleReadMore={handleReadMore}
                  index={index}
                />
              );
            })}
          </div>

          {/* --- دکمه بازگشت --- */}
          <motion.div
            className="hidden xl:block fixed left-8 bottom-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, type: "spring" }}
          >
            <Link href={"/dashboard"}>
              <motion.div>
                <Button
                  icon={<IoReturnDownBack size={"1.5rem"} />}
                  label={"بازگشت به داشبورد"}
                />
              </motion.div>
            </Link>
          </motion.div>
        </DashboardSection>

        {/* --- پاپ‌آپ با کامپوننت Modal --- */}
        <AnimatePresence>
          {popupOpen && selectedItem && (
            <Modal
              isOpen={popupOpen}
              onClose={handleClosePopup}
              title={
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedItem.section} - {selectedItem.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      جزئیات کامل بخش
                    </p>
                  </div>
                </div>
              }
              size="xl"
              className="p-8 bg-gray-900/80 backdrop-blur-2xl border border-gray-700/50"
            >
              <motion.div
                className="space-y-8 pt-6 max-h-[65vh] overflow-y-auto custom-scrollbar pr-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedItem.texts.map((textItem, index) => (
                  <motion.div
                    key={index}
                    className="text-gray-200 bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <h4 className="font-semibold text-[var(--orgin-color)] mb-4 text-xl">
                      {textItem.title}
                    </h4>
                    {Array.isArray(textItem.content) ? (
                      <BulletList items={textItem.content} />
                    ) : typeof textItem.content === "object" &&
                      textItem.content !== null ? (
                      <PopupNestedContent content={textItem.content} />
                    ) : textItem.content ? (
                      <p className="text-base leading-relaxed text-gray-200 bg-gray-800/30 rounded-lg p-4">
                        {textItem.content}
                      </p>
                    ) : (
                      <p className="text-base text-gray-400">
                        محتوایی موجود نیست
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 flex justify-end gap-4">
                <Link href={selectedItem.href}>
                  <motion.div>
                    <Button
                      label={"ارزیابی این بخش"}
                      className="bg-[var(--orgin-color)] shadow-lg hover:shadow-xl"
                    />
                  </motion.div>
                </Link>
                <motion.div>
                  <Button type={3} label={"بستن"} onClick={handleClosePopup} />
                </motion.div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </AccessGuard>
  );
}
