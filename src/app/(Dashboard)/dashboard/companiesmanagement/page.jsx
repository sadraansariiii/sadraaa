"use client";

import { useState, useEffect } from "react";
import {
  FaBuilding,
  FaCalendar,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEnvelope,
  FaEye,
  FaFile,
  FaGlobe,
  FaIndustry,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaTimesCircle,
  FaUserTie,
  FaUpload,
  FaInfoCircle,
  FaFileExcel,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import Modal from "@/src/components/layout/Modal";
import GlassCard from "@/src/components/layout/glassCard";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import AccessGuard from "@/src/components/AccessGuard";

const CompaniesManagementPage = () => {
  const { clientId, token } = useSessionStore();

  const [companies, setCompanies] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!clientId || !token) return;

    const getAssessmentList = async () => {
      try {
        const getOtpRes = await fetch(BaseUrl("/parent/list"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await getOtpRes.json();
        setCompanies(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAssessmentList();
  }, [clientId, token]);
  return (
    <AccessGuard>
      <div className="w-full h-full">
        <DashboardSection
          tab={
            <div
              onClick={() => setShowAddModal(true)}
              className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] cursor-pointer transition-colors py-2 px-3 relative"
            >
              <span className="text-sm md:text-base whitespace-nowrap">
                افزودن شرکت جدید
              </span>
              <button className="h-full aspect-square md:w-14 md:h-14 bg-[var(--orgin-color)] rounded-[8px] flex justify-center items-center cursor-pointer relative">
                <FiPlus size={"1.2rem"} className="md:size-5" />
              </button>
            </div>
          }
        >
          <div className="w-full h-full flex flex-col gap-6">
            {/* دکمه‌های اکسل */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="w-full flex items-center gap-2">
                <Input placeholder={"جستجو"} />
                <div className="relative group">
                  <button className="flex items-center h-14 gap-2 bg-green-600 text-white px-4 py-2 rounded-[10px] transition-colors relative z-10 truncate">
                    <FaFileExcel size={16} />
                    <span className="text-sm">دانلود Excel</span>
                  </button>

                  <div className="w-[280px] absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none break-words whitespace-normal leading-relaxed z-[9999]">
                    <div className="flex items-start gap-2">
                      <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>
                        لطفاً فایل Excel را پس از دانلود، با دقت تکمیل کرده و
                        سپس آن را بارگذاری نمایید.
                      </span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 bg-blue-600 h-14 text-white px-4 py-2 rounded-[10px] transition-colors relative z-10 truncate"
                  >
                    <FaUpload size={16} />
                    <span className="text-sm">ورودی Excel</span>
                  </button>

                  <div className="w-[200px] absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none break-words whitespace-normal leading-relaxed z-[9999]">
                    <div className="flex items-start gap-2">
                      <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>آپلود لیست شرکت‌ها از فایل Excel</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* نمایش کارتی برای xl و کوچکتر */}
            <div className="block xl:hidden flex-1 overflow-auto relative z-10">
              <GlassCard className="h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
              </GlassCard>
            </div>

            {/* نمایش جدولی برای xl و بزرگتر */}
            <div className="hidden xl:block flex-1 min-h-0 relative -z-10">
              <GlassCard className="h-full flex flex-col relative z-0">
                {!companies && (
                  <div className="text-[var(--text-color)] w-full h-full flex justify-center items-center" />
                )}
                {companies?.done == false && <Updating />}
                {companies?.done == true && (
                  <div className="flex-1 overflow-hidden relative">
                    <div className="h-full overflow-auto">
                      <table className="w-full min-w-[1000px]">
                        <thead className="sticky top-0 bg-[var(--bg-color2)] z-0">
                          <tr className="border-b border-gray-600">
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                نام کاربری
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                تاریخ درخواست
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              <div className="flex items-center gap-2">
                                توضیحات
                              </div>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              وضعیت
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-[var(--text-color)]">
                              اقدامات
                            </th>
                          </tr>
                        </thead>

                        <tbody className="overflow-scroll">
                          {!companies.data && <span>iuiiii</span>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </DashboardSection>

        {/* مودال مشاهده جزئیات شرکت */}
        <Modal
          isOpen={showCompanyModal}
          onClose={() => setShowCompanyModal(false)}
          title="مشخصات شرکت"
          size="xl"
        >
          {selectedCompany && (
            <div className="space-y-6">
              {/* اطلاعات اصلی */}
              <GlassCard>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <FaBuilding size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[var(--text-color)]">
                        {selectedCompany.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        {selectedCompany.status}
                        <span className="text-gray-400 text-sm">
                          <FaCalendar className="inline ml-1" />
                          تاریخ ثبت: {selectedCompany.registrationDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      ایمیل
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaEnvelope className="text-blue-400" />
                      {selectedCompany.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      تلفن
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaPhone className="text-green-400" />
                      {selectedCompany.phone}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      وبسایت
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaGlobe className="text-purple-400" />
                      {selectedCompany.website}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      صنعت
                    </label>
                    <div className="flex items-center gap-2 text-[var(--text-color)]">
                      <FaIndustry className="text-orange-400" />
                      {selectedCompany.industry}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* اطلاعات تکمیلی */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  اطلاعات تکمیلی
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      مدیر عامل
                    </label>
                    <p className="text-[var(--text-color)]">
                      {selectedCompany.manager}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      سال تأسیس
                    </label>
                    <p className="text-[var(--text-color)]">
                      {selectedCompany.establishedYear}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      تعداد پرسنل
                    </label>
                    <p className="text-[var(--text-color)]">
                      {selectedCompany.employeesCount} نفر
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      دسته‌بندی
                    </label>
                    <p className="text-[var(--text-color)]">
                      {selectedCompany.category}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* آدرس */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  آدرس
                </h3>
                <div className="flex items-start gap-2 text-[var(--text-color)]">
                  <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0" />
                  <p>{selectedCompany.address}</p>
                </div>
              </GlassCard>

              {/* توضیحات */}
              <GlassCard>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                  توضیحات
                </h3>
                <p className="text-[var(--text-color)] leading-7">
                  {selectedCompany.description}
                </p>
              </GlassCard>

              {/* مدارک */}
              {selectedCompany.documents &&
                selectedCompany.documents.length > 0 && (
                  <GlassCard>
                    <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                      مدارک شرکت
                    </h3>
                    <div className="space-y-2">
                      {selectedCompany.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[var(--bg-color2)] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FaFile className="text-gray-400" />
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
              {selectedCompany.status === "pending" && (
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-600">
                  <Button type={3} label="رد شرکت" icon={<FaTimesCircle />} />
                  <Button
                    type={1}
                    label="تأیید شرکت"
                    icon={<FaCheckCircle />}
                  />
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* مودال افزودن شرکت جدید */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="افزودن شرکت جدید"
          size="xl"
        >
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                اطلاعات اصلی شرکت
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="نام شرکت" placeholder="نام شرکت را وارد کنید" />
                <Input
                  label="ایمیل"
                  type="email"
                  placeholder="email@company.ir"
                />
                <Input label="تلفن" placeholder="021-12345678" />
                <Input label="وبسایت" placeholder="www.company.ir" />
                <Input label="صنعت" placeholder="صنعت اصلی شرکت" />
                <Input label="دسته‌بندی" placeholder="دسته‌بندی تخصصی" />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                اطلاعات تکمیلی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="سال تأسیس" placeholder="1400" />
                <Input label="تعداد پرسنل" placeholder="100" />
                <Input label="مدیر عامل" placeholder="نام مدیر عامل" />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                آدرس
              </h3>
              <Input type="textarea" rows={3} placeholder="آدرس کامل شرکت" />
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-4">
                توضیحات
              </h3>
              <Input
                type="textarea"
                rows={4}
                placeholder="توضیحات درباره فعالیت‌های شرکت"
              />
            </GlassCard>

            <div className="flex gap-3 justify-between">
              <Button type={3} label="انصراف" />
              <Button type={1} label="افزودن شرکت" icon={<FaPlus />} />
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
          title="آپلود فایل Excel"
          size="md"
        >
          <div className="space-y-6">
            <GlassCard>
              <div className="text-center mb-4">
                <FaFileExcel className="text-green-500 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[var(--text-color)]">
                  آپلود فایل اکسل شرکت‌ها
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  فایل Excel حاوی اطلاعات شرکت‌ها را انتخاب کنید
                </p>
              </div>

              <div className="space-y-4">
                {/* منطقه کشیدن و رها کردن فایل */}
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[var(--orgin-color)] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    id="excel-file-input"
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
                  <li>نام شرکت</li>
                  <li>ایمیل</li>
                  <li>تلفن</li>
                  <li>صنعت</li>
                  <li>مدیر عامل</li>
                  <li>سال تأسیس</li>
                </ul>
                <p className="text-yellow-400 mt-3">
                  توجه: شرکت‌های تکراری به طور خودکار حذف می‌شوند.
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
              <Button type={1} />
            </div>
          </div>
        </Modal>
      </div>
    </AccessGuard>
  );
};

export default CompaniesManagementPage;
