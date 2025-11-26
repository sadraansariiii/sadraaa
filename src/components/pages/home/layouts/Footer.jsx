import Image from "next/image";

import { FaClock, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Logo from "@/public/img/expot2.png";

// src/components/pages/home/Footer.jsx
const Footer = () => {
  const ORANGE_COLOR_500 = "#ff7300";
  const ORANGE_COLOR_600 = "#e66900";

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* بخش اصلی فوتر */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* برند و معرفی */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src={Logo} className="h-16 xl:h-20 w-fit" alt="expot" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              همراه مطمئن شما در مسیر موفقیت در بازارهای بین‌المللی. با
              بهره‌گیری از تکنولوژی روز و تجربه متخصصان، مسیر صادرات را برای شما
              هموار می‌سازیم.
            </p>

            {/* مجوزها */}
            <div className="flex gap-4 mt-6">
              {["نماد اعتماد الکترونیک", "انجمن تجارت الکترونیک"].map(
                (license, index) => (
                  <div
                    key={index}
                    className="w-28 h-40 flex justify-center items-center bg-gray-800 rounded-lg text-xs text-gray-300 border border-gray-700/30"
                  >
                    {license}
                  </div>
                )
              )}
            </div>
          </div>

          {/* خدمات */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg border-b border-gray-700 pb-2">
              خدمات تخصصی
            </h4>
            <ul className="space-y-3">
              {[
                "ارزیابی آمادگی صادرات",
                "تحلیل بازارهای جهانی",
                "مشاوره صادرات تخصصی",
                "برنامه‌ریزی استراتژیک",
                "پشتیبانی اجرایی",
                "مطالعات امکان‌سنجی",
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ORANGE_COLOR_500 }}
                  ></div>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* راهنمایی و پشتیبانی */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg border-b border-gray-700 pb-2">
              راهنمایی و پشتیبانی
            </h4>
            <ul className="space-y-3">
              {[
                "سوالات متداول",
                "مقالات آموزشی",
                "ویدیوهای آموزشی",
                "مطالعات موردی",
                "وبلاگ تخصصی",
                "تماس با پشتیبانی",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ORANGE_COLOR_500 }}
                  ></div>
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg border-b border-gray-700 pb-2">
              ارتباط با ما
            </h4>
            <div className="space-y-4">
              {/* تلفن */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
                  }}
                >
                  <span className="text-white text-sm">
                    <FaPhone />
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">تلفن تماس</p>
                  <p className="text-gray-400 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-gray-400 text-sm">۰۹۱۲۳۴۵۶۷۸۹</p>
                </div>
              </div>

              {/* ایمیل */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
                  }}
                >
                  <span className="text-white text-sm">
                    <MdEmail />
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">آدرس ایمیل</p>
                  <p className="text-gray-400 text-sm">info@saderplus.ir</p>
                  <p className="text-gray-400 text-sm">support@saderplus.ir</p>
                </div>
              </div>

              {/* ساعت کاری */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${ORANGE_COLOR_500}, ${ORANGE_COLOR_600})`,
                  }}
                >
                  <span className="text-white text-sm">
                    <FaClock />
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">ساعت کاری</p>
                  <p className="text-gray-400 text-sm">
                    شنبه تا چهارشنبه: ۸:۰۰ - ۱۷:۰۰
                  </p>
                  <p className="text-gray-400 text-sm">پنجشنبه: ۸:۰۰ - ۱۴:۰۰</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* کپی رایت */}
      <div className="border-t border-gray-800 bg-gray-800/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
            <p className="text-gray-400 text-sm">
              © ۱۴۰۳ - ۲۰۲۴ صادرپلاس. تمام حقوق مادی و معنوی این سامانه محفوظ
              است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
