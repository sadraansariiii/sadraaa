"use client";

import AccessGuard from "@/src/components/AccessGuard";
import Alert from "@/src/components/layout/Alert";
import DashboardSection from "@/src/components/layout/dashboardSection";
import EvaluationTable from "@/src/components/layout/evaluationTable";
import Updating from "@/src/components/pages/dashboard/Updating";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import { useContextStore } from "@/src/store/contextCode";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import { formatDateFa } from "@/src/utils/dateUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { FaSearch, FaUserPlus, FaPaperPlane } from "react-icons/fa";
import { FiPlus, FiUsers, FiSettings, FiUser, FiCheck } from "react-icons/fi";
import Modal from "@/src/components/layout/Modal";
import { useAssessmentStore } from "@/src/store/assessmentstore";

const UserDashboard = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const { clientId, token } = useSessionStore();
  const { assessment, setAssessment } = useAssessmentStore();
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setContextCode } = useContextStore();
  const [pageStatus, setPageStatus] = useState(null);
  const router = useRouter();

  // حالت‌های مودال
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [counter, setCounter] = useState(0);

  // حالت‌های مربوط به انتقال پروژه
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transferSettings, setTransferSettings] = useState({
    includeAttachments: true,
    sendNotification: true,
    transferOwnership: false,
  });

  // تابع برای دریافت درصد پیشرفت هر پروژه
  const getAssessmentPercentage = async (AScode) => {
    if (!clientId || !token) return null;

    try {
      const AssessmentPercentageRes = await fetch(
        BaseUrl("/assessment/status"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            AScode: AScode,
          }),
        }
      );
      const data = await AssessmentPercentageRes.json();
      console.log(data);
      if (data.done && data.data) {
        return data.data.percent; // بازگشت درصد پیشرفت
      } else {
        return 0;
      }
    } catch (error) {
      console.error("خطا در دریافت درصد پیشرفت:", error);
      return 0;
    }
  };

  // get list
  useEffect(() => {
    if (!clientId || !token) return;

    const getAssessmentList = async () => {
      try {
        const getOtpRes = await fetch(BaseUrl("/assessment/list"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            search: searchTerm,
          }),
        });
        const data = await getOtpRes.json();
        setPageStatus(data);

        if (data.done && data.data) {
          const sortedData = data.data.sort(
            (a, b) => parseInt(b.date) - parseInt(a.date)
          );

          // دریافت درصد پیشرفت برای هر پروژه
          const assessmentsWithPercentages = await Promise.all(
            sortedData.map(async (assessment) => {
              const percentage = await getAssessmentPercentage(
                assessment.AScode
              );
              return {
                ...assessment,
                percentage: percentage, // اضافه کردن درصد به هر پروژه
              };
            })
          );

          setAssessments(assessmentsWithPercentages);
        } else {
          setAssessments([]);
        }
      } catch (error) {
        console.error(error);
        setAssessments([]);
      }
    };

    getAssessmentList();
  }, [clientId, token, searchTerm, counter]);

  // تابع برای باز کردن مودال تأیید گزارش‌گیری
  const handleReportGeneration = (assessment) => {
    setSelectedAssessment(assessment);
    setIsConfirmationModalOpen(true);
  };

  // تابع برای تأیید گزارش‌گیری
  const handleConfirmReport = async () => {
    try {
      const ConfirmReportRes = await fetch(BaseUrl("/assessment/getreport"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          AScode: selectedAssessment.AScode,
        }),
      });
      const data = await ConfirmReportRes.json();
      if (data.done) {
        setIsConfirmationModalOpen(false);
        setCounter(counter + 1);
      }
    } catch (error) {
      console.error("خطا در تولید گزارش:", error);
    }
  };

  // تابع برای جستجوی کاربران
  const handleUserSearch = async () => {
    try {
      // در اینجا API جستجوی کاربران را فراخوانی کنید
      const searchRes = await fetch(BaseUrl("/users/search"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          search: userSearchTerm,
        }),
      });
      const data = await searchRes.json();

      if (data.done && data.data) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("خطا در جستجوی کاربران:", error);
      setUsers([]);
    }
  };

  // تابع برای ارسال گزارش به کاربر انتخاب شده
  const handleSendReport = async () => {
    if (!selectedUser) {
      setAlert({
        message: "لطفاً یک کاربر انتخاب کنید",
        type: "error",
        visible: true,
      });
      return;
    }

    try {
      // در اینجا API ارسال گزارش را فراخوانی کنید
      const sendRes = await fetch(BaseUrl("/assessment/transfer"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          assessmentCode: selectedAssessment.AScode,
          targetUserId: selectedUser.id,
          settings: transferSettings,
        }),
      });
      const data = await sendRes.json();

      if (data.done) {
        setAlert({
          message: "گزارش با موفقیت ارسال شد",
          type: "success",
          visible: true,
        });
        setIsTransferModalOpen(false);
        setSelectedUser(null);
        setUserSearchTerm("");
      } else {
        setAlert({
          message: "خطا در ارسال گزارش",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error("خطا در ارسال گزارش:", error);
      setAlert({
        message: "خطا در ارسال گزارش",
        type: "error",
        visible: true,
      });
    }
  };

  // داده‌های نمونه برای کاربران (در صورت عدم دسترسی به API)
  const sampleUsers = [
    { id: 1, name: "علی محمدی", email: "ali@example.com", role: "کاربر عادی" },
    { id: 2, name: "رضا کریمی", email: "reza@example.com", role: "مدیر پروژه" },
    {
      id: 3,
      name: "مریم احمدی",
      email: "maryam@example.com",
      role: "کاربر عادی",
    },
    { id: 4, name: "سارا نوروزی", email: "sara@example.com", role: "تحلیل‌گر" },
  ];

  return (
    <div className="w-full h-full">
      <AccessGuard>
        <DashboardSection
          tab={
            <Link href={"/dashboard/newassessment"}>
              <div className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] cursor-pointer transition-colors py-2 px-3">
                <span className="text-sm md:text-base whitespace-nowrap">
                  شروع ارزیابی جدید
                </span>
                <button className="h-full aspect-square md:w-14 md:h-14 bg-[var(--orgin-color)] rounded-[8px] flex justify-center items-center cursor-pointer ">
                  <FiPlus size={"1.2rem"} className="md:size-5" />
                </button>
              </div>
            </Link>
          }
        >
          {!pageStatus && (
            <div className="text-[var(--text-color)] w-full h-full flex justify-center items-center"></div>
          )}
          {pageStatus?.done == false && <Updating />}
          {pageStatus?.done == true && (
            <div className="w-full h-full flex flex-col gap-1">
              <div className="xl:hidden w-full">
                <Link href={"/dashboard/newassessment"}>
                  <Button
                    type={1}
                    label={"شروع ارزیابی جدید"}
                    icon={<FiPlus size={20} />}
                  />
                </Link>
              </div>

              {/* Dashboard Container */}
              <div className="flex flex-col h-full">
                {/* Search and Filter Bar */}
                <div className="py-4 space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
                    <div className="flex-1 flex gap-4 items-center justify-center w-full sm:max-w-[600px]">
                      <Input
                        type="text"
                        placeholder="جستجو بر اساس کد ارزیابی..."
                        value={searchTerm}
                        icon={<FaSearch />}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start"></div>
                  </div>
                </div>

                {/* Assessments List */}
                <div className="flex-1  flex flex-col overflow-hidden border-2 border-[#444444] rounded-[10px]">
                  <div className="hidden min-h-14 xl:grid grid-cols-7 gap-4 items-center bg-[#444444] px-2 py-2">
                    <div>
                      <span className="text-[var(--text-color)]">
                        کد ارزیابی
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-color)]">
                        زمینه ارزیابی
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-color)]">
                        تاریخ شروع
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-[var(--text-color)]">
                        درصد پیشرفت
                      </span>
                    </div>
                    <div></div>
                  </div>
                  {!assessments && (
                    <div className="flex-1 flex flex-col justify-center items-center gap-1 md:gap-2 overflow-auto px-2 pb-4 text-[var(--text-color)]">
                      «هنوز هیچ فعالیت ارزیابی در حساب شما ثبت نشده است...»
                    </div>
                  )}
                  {assessments && (
                    <div className="flex-1 flex flex-col gap-1 md:gap-2 overflow-auto">
                      {assessments.map((assessment, index) => (
                        <EvaluationTable
                          key={assessment.AScode || index}
                          code={
                            <Link href={"/dashboard/question"}>
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  setContextCode(assessment.AScode)
                                }
                              >
                                {assessment.AScode}
                              </div>
                            </Link>
                          }
                          companyName={
                            <Link href={"/dashboard/question"}>
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  setContextCode(assessment.AScode)
                                }
                              >
                                {assessment.context}
                              </div>
                            </Link>
                          }
                          date={formatDateFa(assessment.date, {
                            mode: "simple",
                          })}
                          Percentage={assessment.percentage || 0} // استفاده از درصد واقعی
                          button={
                            <div className="flex  gap-2">
                              {assessment.st == 1 ? (
                                <Button
                                  type={"blue"}
                                  label="انتقال به کاربر"
                                  onClick={() => {
                                    setIsTransferModalOpen(
                                      !isTransferModalOpen
                                    );
                                  }}
                                />
                              ) : (
                                <Link href={"/dashboard/question"}>
                                  <Button
                                    type={1}
                                    label={"ادامه ارزیابی"}
                                    onClick={() =>
                                      setContextCode(assessment.AScode)
                                    }
                                  />
                                </Link>
                              )}

                              {assessment.st == 1 ? (
                                <Link href={"/report"}>
                                  <Button
                                    type={"red"}
                                    label="مشاهده گزارش"
                                    onClick={() => {
                                      setAssessment(assessment);
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Button
                                  type={"green"}
                                  label="گزارش گیری"
                                  onClick={() =>
                                    handleReportGeneration(assessment)
                                  }
                                />
                              )}
                            </div>
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Alert */}
          {alert.visible && (
            <Alert
              message={alert.message}
              type={alert.type}
              isVisible={alert.visible}
              duration={3000}
              onClose={() => setAlert({ ...alert, visible: false })}
            />
          )}
        </DashboardSection>
      </AccessGuard>
      {/* مودال تأیید گزارش‌گیری */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="تأیید گزارش‌گیری"
        size="md"
      >
        <div className="space-y-6">
          {/* هشدار مهم */}
          <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-xl mt-0.5">⚠️</div>
              <div className="flex-1">
                <h4 className="text-yellow-400 font-medium text-sm mb-2">
                  توجه مهم
                </h4>
                <p className="text-yellow-300 text-xs leading-relaxed">
                  پس از تولید گزارش، امکان <strong>ویرایش یا تغییر</strong> این
                  ارزیابی وجود نخواهد داشت. لطفاً پیش از ادامه، از{" "}
                  <strong> صحیح بودن</strong> اطلاعات واردشده اطمینان حاصل کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="text-white text-center">
            <div className="mb-4">
              <p className="text-lg font-medium">
                آیا از تولید گزارش مطمئن هستید؟
              </p>
            </div>

            {selectedAssessment && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">کد ارزیابی:</span>
                    <span className="text-white font-medium">
                      {selectedAssessment.AScode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">
                      زمینه ارزیابی:
                    </span>
                    <span className="text-white font-medium text-left max-w-[150px] truncate">
                      {selectedAssessment.context}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-white/60 text-sm">تاریخ شروع:</span>
                    <span className="text-white text-sm">
                      {formatDateFa(selectedAssessment.date)}
                    </span>
                  </div>
                  {/* نمایش درصد پیشرفت */}
                  {selectedAssessment.percentage !== undefined && (
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-white/60 text-sm">پیشرفت:</span>
                      <span
                        className={`${
                          selectedAssessment.percentage == 100
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {selectedAssessment.percentage}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* پیغام تأکیدی */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {selectedAssessment?.percentage == 100 ? (
              <p className="text-red-400 text-xs text-center leading-relaxed">
                لطفاً توجه داشته باشید که پس از تأیید، ارزیابی{" "}
                <strong>قفل</strong> می‌شود و امکان ویرایش آن وجود نخواهد داشت.
              </p>
            ) : (
              <p className="text-red-400 text-xs text-center leading-relaxed">
                درصد تکمیل ارزیابی کمتر از <strong>۱۰۰٪</strong> است. لطفاً
                ابتدا تمام بخش‌ها را تکمیل کنید تا بتوانید ارزیابی را دریافت
                نمایید.
              </p>
            )}
          </div>
          {selectedAssessment?.percentage == 100 && (
            <Button label="تأیید و تولید گزارش" onClick={handleConfirmReport} />
          )}
        </div>
      </Modal>

      {/* مودال انتقال پروژه */}
      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="انتقال گزارش به کاربر"
        size="lg"
      >
        <div className="space-y-6">
          {/* اطلاعات ارزیابی */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">اطلاعات ارزیابی</h3>
            {selectedAssessment && (
              <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                <div>
                  <span className="text-white/60">کد:</span>{" "}
                  {selectedAssessment.AScode}
                </div>
                <div>
                  <span className="text-white/60">زمینه:</span>{" "}
                  {selectedAssessment.context}
                </div>
                <div>
                  <span className="text-white/60">تاریخ:</span>{" "}
                  {formatDateFa(selectedAssessment.date)}
                </div>
                {selectedAssessment.percentage !== undefined && (
                  <div>
                    <span className="text-white/60">پیشرفت:</span>{" "}
                    {selectedAssessment.percentage}%
                  </div>
                )}
              </div>
            )}
          </div>

          {/* تنظیمات انتقال */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <FiSettings />
              تنظیمات انتقال
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transferSettings.includeAttachments}
                  onChange={(e) =>
                    setTransferSettings((prev) => ({
                      ...prev,
                      includeAttachments: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-white text-sm">ارسال فایل‌های ضمیمه</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transferSettings.sendNotification}
                  onChange={(e) =>
                    setTransferSettings((prev) => ({
                      ...prev,
                      sendNotification: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-white text-sm">
                  ارسال نوتیفیکیشن به کاربر
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transferSettings.transferOwnership}
                  onChange={(e) =>
                    setTransferSettings((prev) => ({
                      ...prev,
                      transferOwnership: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-white text-sm">انتقال مالکیت پروژه</span>
              </label>
            </div>
          </div>

          {/* جستجو و انتخاب کاربر */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <FiUsers />
              انتخاب کاربر
            </h3>

            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="جستجوی کاربر بر اساس نام یا ایمیل..."
                  value={userSearchTerm}
                  icon={<FaSearch />}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleUserSearch();
                  }}
                />
              </div>
              <Button
                label="جستجو"
                onClick={handleUserSearch}
                icon={<FaSearch />}
              />
            </div>

            {/* لیست کاربران */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {(users.length > 0 ? users : sampleUsers).map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedUser?.id === user.id
                      ? "bg-[var(--orgin-color)]/20 border-[var(--orgin-color)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FiUser className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user.name}
                        </div>
                        <div className="text-white/60 text-sm">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    {selectedUser?.id === user.id && (
                      <FiCheck className="text-[var(--orgin-color)] text-xl" />
                    )}
                  </div>
                  <div className="text-white/60 text-xs mt-2">{user.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* دکمه‌های اقدام */}
          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <Button
              label="انصراف"
              type={2}
              onClick={() => setIsTransferModalOpen(false)}
              className="min-w-24"
            />
            <Button
              label="ارسال گزارش"
              onClick={handleSendReport}
              icon={<FaPaperPlane />}
              disabled={!selectedUser}
              className="min-w-24"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDashboard;
