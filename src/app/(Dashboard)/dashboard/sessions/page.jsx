"use client";

import { useEffect, useState, useRef } from "react";
import { Switch, Slider, Tag } from "antd";
import Alert from "@/src/components/layout/Alert";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Modal from "@/src/components/layout/Modal";
import Input from "@/src/components/ui/inputs";
import AccessGuard from "@/src/components/AccessGuard";
import { FiChevronLeft, FiPlus, FiSend } from "react-icons/fi";
import { useSessionStore } from "@/src/store/sessionStore";
import Button from "@/src/components/ui/Button";
import useFormHandler from "@/src/hooks/useFormHandler";
import BaseUrl from "@/src/utils/baseUrl";
import {
  FaCheck,
  FaRegUser,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaMapMarkerAlt,
  FaGlobe,
  FaBuilding,
  FaIdCard,
  FaUser,
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import {
  FaFileAlt,
  FaChartBar,
  FaClipboardList,
  FaUserCheck,
  FaEye,
  FaChevronLeft,
} from "react-icons/fa";
import { formatDateFa } from "@/src/utils/dateUtils";
import GlassCard from "@/src/components/layout/glassCard";
import SessionTag from "@/src/components/ui/statusMap";
import { decodeUnicodeDeep } from "@/src/utils/decodeUnicode";
import DynamicTabs from "@/src/components/ui/Tab";
import { motion, AnimatePresence } from "framer-motion";
import { BsDownload, BsUpload } from "react-icons/bs";
import MessageList from "@/src/components/ui/MessageList";

export default function SessionsPage() {
  const { clientId, token } = useSessionStore();
  const [changePage, setChangePage] = useState("list");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [sessionListReload, setSesstionListReload] = useState(0);
  const [assessmentListReload, setAssessmentListReload] = useState(0);
  const { formData, handleChange, setFormData } = useFormHandler({
    StartSession: {
      Title: "",
      Description: "",
      Username: "",
      userId: "",
    },
    NewMessage: {
      Title: "",
      Text: "",
    },
  });
  const [originalSession, setOriginalSession] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const messagesEndRef = useRef(null);

  // ________________________________________________________________
  // بخش گرفتن لیست سشن
  const [sessionList, setSesstionList] = useState([]);
  useEffect(() => {
    if (!clientId || !token) {
      return;
    }

    const getSessionList = async () => {
      try {
        const SessionListRes = await fetch(BaseUrl("/parent/list"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await SessionListRes.json();
        setSesstionList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSessionList();
  }, [clientId, token, sessionListReload]);
  // ________________________________________________________________

  // ________________________________________________________________
  // بخش شروع سشن جدید
  const [userList, setUserList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  useEffect(() => {
    if (!clientId || !token || !formData.StartSession.Username) {
      setUserList([]);
      return;
    }

    const getUserList = async () => {
      try {
        const userListRes = await fetch(BaseUrl("/account/search"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            live: 1,
            item_type: "accounts",
            q: formData.StartSession.Username,
            appId: clientId,
            token: token,
          }),
        });
        const data = await userListRes.json();
        setUserList(data);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(getUserList, 500);
    return () => clearTimeout(timeoutId);
  }, [clientId, token, formData.StartSession.Username]);

  // تابع برای دریافت پروفایل کاربر
  const fetchUserProfile = async (username) => {
    if (!clientId || !token || !username) {
      setSelectedUserProfile(null);
      return;
    }

    try {
      const profileRes = await fetch(BaseUrl("/account/profile"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          appId: clientId,
          token: token,
        }),
      });
      const data = await profileRes.json();
      if (data.data) {
        const decodedData = decodeUnicodeDeep(data.data);
        setSelectedUserProfile(decodedData);
      }
    } catch (error) {
      console.error(error);
      setSelectedUserProfile(null);
    }
  };

  const handleUserSearchChange = (e) => {
    handleChange(e);
    setHasSearched(true);

    if (!e.target.value) {
      setUserList([]);
      setHasSearched(false);
      setFormData((prev) => ({
        ...prev,
        StartSession: {
          ...prev.StartSession,
          userId: "",
        },
      }));
      setSelectedUserProfile(null);
    }
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      StartSession: {
        ...prev.StartSession,
        userId: user.id,
        Username: user.text,
      },
    }));
    // دریافت پروفایل کاربر انتخاب شده
    fetchUserProfile(user.id);
  };

  const handleStartNewSession = async () => {
    if (
      !formData.StartSession.Title ||
      !formData.StartSession.Description ||
      !formData.StartSession.userId
    ) {
      setAlert({
        message: "لطفا عنوان، متن جلسه و کاربر را انتخاب کنید",
        type: "error",
        visible: true,
      });
      return;
    }
    try {
      const newSessionRes = await fetch(BaseUrl("/parent/request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetuser: formData.StartSession.userId,
          title: formData.StartSession.Title,
          text: formData.StartSession.Description,
          appId: clientId,
          token: token,
        }),
      });
      const data = await newSessionRes.json();
      if (data.done) {
        setSesstionListReload(sessionListReload + 1);
        setAlert({
          message: "جلسه جدید با موفقیت شروع شد",
          type: "success",
          visible: true,
        });
        setFormData((prev) => ({
          ...prev,
          StartSession: {
            ...prev.StartSession,
            Title: "",
            Description: "",
            Username: "",
            userId: "",
          },
        }));
        setUserList([]);
        setHasSearched(false);
        setSelectedUserProfile(null);
        setIsNewSessionModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ________________________________________________________________

  // ________________________________________________________________
  // تغییر وضعیت سشن
  const changeStatus = async (getData) => {
    try {
      const SessionListRes = await fetch(BaseUrl("/parent/changestatus"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          uuid: getData.id,
          st: getData.st,
        }),
      });
      const data = await SessionListRes.json();
      if (data.done) {
        setSesstionListReload(sessionListReload + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ________________________________________________________________

  // ________________________________________________________________
  // بخش پیام
  const getMessageList = async (session) => {
    try {
      const MessageListRes = await fetch(BaseUrl("/account/messages"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          action: session.action,
          targetuser: session.uuid,
          type: session.type,
          title: session.title,
          text: "",
        }),
      });

      const data = await MessageListRes.json();

      if (data.done && data.data) {
        setMessageData([...data.data].reverse());
      } else {
        setMessageData([]);
      }
    } catch (error) {
      console.error(error);
      setMessageData([]);
    }
  };

  // تابع برای ارسال پیام جدید
  const handleSendNewMessage = async () => {
    if (
      !formData.NewMessage.Title.trim() ||
      !formData.NewMessage.Text.trim() ||
      !originalSession
    )
      return;

    try {
      const sendMessageRes = await fetch(BaseUrl("/account/messages"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          action: "send",
          targetuser: originalSession.uuid,
          type: "sesstion",
          title: formData.NewMessage.Title,
          text: formData.NewMessage.Text,
        }),
      });
      const data = await sendMessageRes.json();
      if (data.done) {
        // رفرش لیست پیام‌ها
        getMessageList({
          uuid: originalSession.uuid,
          type: "sesstion",
          action: "list",
          title: originalSession.title,
        });
        setFormData((prev) => ({
          ...prev,
          NewMessage: {
            Title: "",
            Text: "",
          },
        }));
        setIsNewMessageModalOpen(false);
        setAlert({
          message: "پیام با موفقیت ارسال شد",
          type: "success",
          visible: true,
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "خطا در ارسال پیام",
        type: "error",
        visible: true,
      });
    }
  };

  // اسکرول به پایین هنگام تغییر پیام‌ها
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageData]);
  // ________________________________________________________________

  // ________________________________________________________________
  // مشاهده جزییات سشن
  const [userProfile, setUserProfile] = useState(null);
  const [sharedAssessments, setSharedAssessments] = useState([]);

  // تابع جداگانه برای دریافت لیست ارزیابی‌های ارسال شده
  const fetchSharedAssessments = async (sessionId) => {
    if (!clientId || !token || !sessionId) {
      setSharedAssessments([]);
      return;
    }

    try {
      const ShareListRes = await fetch(BaseUrl("/sessionweb/sessionshlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          sessionid: sessionId,
        }),
      });
      const data = await ShareListRes.json();
      if (data.done && data.data) {
        setSharedAssessments(data.data);
      } else {
        setSharedAssessments([]);
      }
    } catch (error) {
      console.error(error);
      setSharedAssessments([]);
    }
  };

  // useEffect برای ریلود خودکار لیست ارزیابی‌ها
  useEffect(() => {
    if (originalSession && changePage === "View") {
      fetchSharedAssessments(originalSession.uuid);
    }
  }, [assessmentListReload, originalSession, changePage]);

  const handleViewSession = async (session) => {
    setOriginalSession(session);
    setChangePage("View");
    // گرفتن پروفایل برای بخش داخلی
    try {
      const profileRes = await fetch(BaseUrl("/account/profile"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: session.username,
          appId: clientId,
          token: token,
        }),
      });
      const data = await profileRes.json();
      if (data.data) {
        const decodedData = decodeUnicodeDeep(data.data);
        setUserProfile(decodedData);
      }
    } catch (error) {
      console.error(error);
    }
    // گرفتن ارزیابی های ارسال شده
    fetchSharedAssessments(session.uuid);
    getMessageList({
      uuid: session.uuid,
      type: "sesstion",
      action: "list",
      title: session.title,
    });
  };
  // مشاهده جزییات سشن
  // ________________________________________________________________

  // ________________________________________________________________
  // گرفتن لیست ارزیابی
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  useEffect(() => {
    if (!clientId || !token) return;

    const getAssessmentList = async () => {
      try {
        const AssessmentListRes = await fetch(BaseUrl("/assessment/list"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await AssessmentListRes.json();
        if (data.done && data.data) {
          const sortedData = data.data.sort(
            (a, b) => parseInt(b.date) - parseInt(a.date)
          );
          setAssessments(sortedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAssessmentList();
  }, [clientId, token]);

  // فیلتر کردن ارزیابی‌های فعال (st: "1")
  const activeAssessments = assessments.filter(
    (assessment) => assessment.st === "1"
  );

  // تابع برای انتخاب ارزیابی
  const handleSelectAssessment = (assessment) => {
    setSelectedAssessment(assessment);
  };

  // تابع برای ارسال ارزیابی
  const handleSendAssessment = async () => {
    if (!selectedAssessment) return;
    try {
      const sendAssessmentRes = await fetch(
        BaseUrl("/sessionweb/accessreport"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            AScode: selectedAssessment.AScode,
            type: "session",
            targetid: originalSession.uuid,
          }),
        }
      );
      const data = await sendAssessmentRes.json();
      if (data.done) {
        setAlert({
          message: "ارزیابی با موفقیت ارسال شد",
          type: "success",
          visible: true,
        });
        // رفرش لیست ارزیابی‌های ارسال شده
        setAssessmentListReload((prev) => prev + 1);
        setSelectedAssessment(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // گرفتن لیست ارزیابی
  // ________________________________________________________________

  return (
    <AccessGuard>
      <div className="w-full h-full">
        {changePage === "list" && (
          <DashboardSection
            tab={
              <div
                className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] cursor-pointer py-2 px-3 "
                onClick={() => setIsNewSessionModalOpen(true)}
              >
                <span className="text-sm md:text-base whitespace-nowrap">
                  شروع جلسه جدید
                </span>
                <button className="h-full aspect-square md:w-14 md:h-14 bg-[var(--orgin-color)] rounded-[8px] flex justify-center items-center cursor-pointer hover:bg-[var(--orgin-color)]/80 transition-colors">
                  <FiPlus size={"1.2rem"} className="md:size-5" />
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="xl:hidden w-full">
                <Button
                  onClick={() => setIsNewSessionModalOpen(true)}
                  type={1}
                  label={" شروع جلسه جدید"}
                  icon={<FiPlus size={20} />}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  سیشن‌های فعال
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder={"جستجو..."}
                      type="text"
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {sessionList.data?.map((session) => (
                  <GlassCard key={session.uuid}>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--orgin-color)]/20 text-[var(--orgin-color)] rounded-xl flex items-center justify-center">
                          <FaRegUser />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {session.username}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className=" py-1 rounded-full text-xs font-medium">
                          <div className="flex items-center gap-2">
                            <SessionTag status={session.status} />
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                      <div className="w-full lg:flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="h-14 bg-white/5 rounded-lg px-4 flex flex-col justify-center ">
                          <span className="text-gray-400 block text-xs mb-1">
                            عنوان جلسه
                          </span>
                          <p className="text-white font-medium">
                            {session.title}
                          </p>
                        </div>

                        <div className="h-14 bg-white/5 rounded-lg px-4 flex flex-col justify-center ">
                          <span className="text-gray-400 block text-xs mb-1">
                            تاریخ شروع
                          </span>
                          <p className="text-white font-medium">
                            {formatDateFa(session.date, {
                              mode: "simple",
                              includeTime: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex gap-4 justify-end lg:w-1/4">
                        {session.viewer_st == 0 ? (
                          <div className="w-fit flex gap-4 ">
                            <Button
                              label={"تایید"}
                              type={"green"}
                              className={"h-14"}
                              onClick={() => {
                                changeStatus({ id: session.uuid, st: 1 });
                              }}
                            />
                            <Button
                              label={"رد"}
                              type={"red"}
                              className={"h-14"}
                              onClick={() => {
                                changeStatus({ id: session.uuid, st: -1 });
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <Button
                          label={"مشاهده"}
                          type={1}
                          className={"h-14"}
                          onClick={() => handleViewSession(session)}
                        />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </DashboardSection>
        )}

        {changePage === "View" && originalSession && (
          <DashboardSection>
            <div className="w-full h-full flex flex-col xl:flex-row gap-4">
              {/* بخش بزرگ - عملیات‌ها */}
              <div className="w-full xl:w-[70%] h-full">
                <GlassCard>
                  <div className="h-10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">
                      {originalSession.title}
                    </h2>
                    <Button
                      label={"بازگشت به لیست"}
                      type={"red"}
                      onClick={() => {
                        setChangePage("list");
                        setSelectedAssessment(null);
                      }}
                    />
                  </div>
                  <div className="w-full h-[calc(100%-40px)]">
                    <DynamicTabs
                      tabs={[
                        {
                          id: "session-info",
                          label: "مشخصات",
                          content: (
                            <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
                              {/* 🔹 اطلاعات اصلی سشن */}
                              <div className="flex-shrink-0 bg-white/5 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                  اطلاعات سشن
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <p className="text-gray-400 text-sm">
                                      عنوان سشن:
                                    </p>
                                    <p className="text-white font-medium">
                                      {originalSession.title}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-gray-400 text-sm">
                                      کاربر:
                                    </p>
                                    <p className="text-white font-medium">
                                      {originalSession.username}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-gray-400 text-sm">
                                      تاریخ ایجاد:
                                    </p>
                                    <p className="text-white font-medium">
                                      {formatDateFa(originalSession.date, {
                                        mode: "simple",
                                        includeTime: true,
                                      })}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-gray-400 text-sm">
                                      وضعیت:
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <SessionTag
                                        status={originalSession.status}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                             
                            </div>
                          ),
                        },
                        {
                          id: "shares",
                          label: "لیست اشتراک‌گذاری‌ها",
                          content: (
                            <div className="w-full h-full flex flex-col bg-white/5 rounded-lg p-6 overflow-hidden">
                              {/* 🔹 هدر */}
                              <div className="flex-shrink-0 flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                  لیست ارزیابی‌های ارسال شده
                                </h3>
                                <Button
                                  label="بروزرسانی"
                                  type={1}
                                  className="h-10"
                                  onClick={() =>
                                    setAssessmentListReload((prev) => prev + 1)
                                  }
                                />
                              </div>

                              {/* 🔹 لیست ارزیابی‌ها */}
                              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                {sharedAssessments &&
                                sharedAssessments.length > 0 ? (
                                  sharedAssessments.map((assessment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                          <FaFileAlt
                                            className="text-green-500"
                                            size={16}
                                          />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                          <p className="text-white font-medium">
                                            کد ارزیابی: {assessment.AScode}
                                          </p>
                                          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                            <p>
                                              امتیاز: {assessment.one} از{" "}
                                              {assessment.two}
                                            </p>
                                            <p>
                                              درصد:{" "}
                                              {Math.round(
                                                (assessment.one /
                                                  assessment.two) *
                                                  100
                                              )}
                                              %
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <p>هیچ ارزیابی ارسال شده‌ای وجود ندارد</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ),
                        },
                        {
                          id: "new-share",
                          label: "اشتراک‌گذاری جدید",
                          content: (
                            <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
                              {/* 🔹 بخش لیست ارزیابی‌ها */}
                              <div className="flex-1 bg-white/5 rounded-lg p-6 flex flex-col overflow-hidden">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                  انتخاب ارزیابی برای اشتراک‌گذاری
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                  ارزیابی مورد نظر خود را از لیست زیر انتخاب
                                  کنید
                                </p>

                                {/* 🔸 لیست ارزیابی‌های فعال از API */}
                                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                  {activeAssessments.length > 0 ? (
                                    activeAssessments.map((assessment) => (
                                      <div
                                        key={assessment.AScode}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
                                        onClick={() =>
                                          handleSelectAssessment(assessment)
                                        }
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <FaFileAlt
                                              className="text-green-500"
                                              size={16}
                                            />
                                          </div>
                                          <div className="flex flex-col gap-1">
                                            <p className="text-white font-medium">
                                              {assessment.context}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                                              <p>کد: {assessment.AScode}</p>
                                              <p>
                                                تاریخ ایجاد:{" "}
                                                {formatDateFa(assessment.date)}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-center py-8 text-gray-400">
                                      <p>هیچ ارزیابی فعالی یافت نشد</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 🔹 بخش تنظیمات (تنها در صورت انتخاب ارزیابی) */}
                              {selectedAssessment && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0 bg-white/5 rounded-lg p-6 border border-white/10"
                                >
                                  <h3 className="text-lg font-semibold text-white mb-4">
                                    {selectedAssessment.context}
                                  </h3>

                                  <div className="space-y-4">
                                    <Button
                                      label="ارسال ارزیابی"
                                      type={1}
                                      className="flex-1"
                                      icon={<FiSend size={16} />}
                                      onClick={handleSendAssessment}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          ),
                        },
                        {
                          id: "messages",
                          label: "پیام‌ها",
                          content: (
                            <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
                              {/* 🔹 هدر اصلی */}
                              <div className="flex-shrink-0 h-12 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">
                                  تاریخچه پیام‌ها
                                </h3>
                                <Button
                                  label="پیام جدید"
                                  type={"green"}
                                  className="h-10"
                                  icon={<FiPlus size={16} />}
                                  onClick={() => setIsNewMessageModalOpen(true)}
                                />
                              </div>

                              {/* 🔹 بخش محتوای پیام‌ها */}
                              <div className="flex-1 flex flex-col rounded-[8px] border border-white/10 p-4 overflow-hidden min-h-0">
                                {/* 🔸 هدر داخلی */}
                                <div className="flex-shrink-0 flex justify-between items-center border-b border-gray-600/40 pb-2 mb-2">
                                  <div>
                                    <h3 className="text-xl font-bold text-white">
                                      پیام‌ها
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                      تاریخچه مکاتبات و پیام‌های ارسالی و
                                      دریافتی
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[var(--text-color)] text-sm bg-[var(--orgin-color)]/40 px-3 py-1 rounded-lg border border-gray-500/30">
                                      {messageData?.length || 0} پیام
                                    </span>
                                  </div>
                                </div>

                                {/* 🔸 لیست پیام‌ها */}
                                <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 min-h-0">
                                  {messageData && messageData.length > 0 ? (
                                    messageData.map((message, index) => (
                                      <MessageList
                                        key={message.id || index}
                                        title={message.title}
                                        text={message.text}
                                        status={message.viewer_is_sender}
                                        sender={message.sender.name}
                                      />
                                    ))
                                  ) : (
                                    <div className="flex flex-col items-center justify-center flex-1 text-gray-400 py-8">
                                      <div className="w-16 h-16 bg-gray-600/40 rounded-full flex items-center justify-center mb-4 border border-gray-500/40">
                                        <FaEnvelope className="text-2xl text-gray-400" />
                                      </div>
                                      <p className="text-lg mb-2 text-gray-300">
                                        هیچ پیامی یافت نشد
                                      </p>
                                      <p className="text-sm text-gray-400">
                                        اولین پیام را ارسال کنید
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </GlassCard>
              </div>

              {/* بخش کوچک - اطلاعات کاربر */}
              <div className="w-full xl:w-[30%] h-full">
                <GlassCard>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 bg-[var(--orgin-color)]/20 rounded-full flex items-center justify-center mb-4">
                      <FaRegUser
                        size={32}
                        className="text-[var(--orgin-color)]"
                      />
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-2 text-center">
                      {userProfile?.about?.coname || userProfile?.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {userProfile?.username}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* نام شرکت */}
                    {userProfile?.about?.coname && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <FaBuilding className="text-[var(--orgin-color)]" />
                        <div>
                          <p className="text-gray-400 text-xs">نام شرکت</p>
                          <p className="text-white text-sm">
                            {userProfile.about.coname}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ایمیل شرکت */}
                    {userProfile?.about?.coemail && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <FaEnvelope className="text-[var(--orgin-color)]" />
                        <div>
                          <p className="text-gray-400 text-xs">ایمیل شرکت</p>
                          <p className="text-white text-sm">
                            {userProfile.about.coemail}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* تلفن شرکت */}
                    {userProfile?.about?.cophone && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <FaPhone className="text-[var(--orgin-color)]" />
                        <div>
                          <p className="text-gray-400 text-xs">تلفن شرکت</p>
                          <p className="text-white text-sm">
                            {userProfile.about.cophone}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* تلفن رابط */}
                    {userProfile?.about?.rabet_phone && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <FaIdCard className="text-[var(--orgin-color)]" />
                        <div>
                          <p className="text-gray-400 text-xs">تلفن رابط</p>
                          <p className="text-white text-sm">
                            {userProfile.about.rabet_phone}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* وب‌سایت */}
                    {userProfile?.about?.website && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <FaGlobe className="text-[var(--orgin-color)]" />
                        <div>
                          <p className="text-gray-400 text-xs">وب‌سایت</p>
                          <p className="text-white text-sm">
                            {userProfile.about.website}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* زمینه‌های فعالیت */}
                    {userProfile?.context && userProfile.context.length > 0 && (
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-xs mb-2">
                          زمینه‌های فعالیت
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.context.map((field, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[var(--orgin-color)]/20 text-[var(--orgin-color)] rounded text-xs"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm">وضعیت سشن</span>
                      <SessionTag status={originalSession.status} />
                    </div>

                    {originalSession.viewer_st == 0 && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          label={"تایید سشن"}
                          type={"green"}
                          className={"flex-1"}
                          onClick={() => {
                            changeStatus({ id: originalSession.uuid, st: 1 });
                            setChangePage("list");
                          }}
                        />
                        <Button
                          label={"رد سشن"}
                          type={"red"}
                          className={"flex-1"}
                          onClick={() => {
                            changeStatus({
                              id: originalSession.uuid,
                              st: -1,
                            });
                            setChangePage("list");
                          }}
                        />
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>
          </DashboardSection>
        )}

        {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            isVisible={alert.visible}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
        )}

        {/* مودال شروع جلسه جدید */}
        <Modal
          isOpen={isNewSessionModalOpen}
          onClose={() => {
            setIsNewSessionModalOpen(false);
            setFormData((prev) => ({
              ...prev,
              StartSession: {
                ...prev.StartSession,
                Title: "",
                Description: "",
                Username: "",
                userId: "",
              },
            }));
            setUserList([]);
            setHasSearched(false);
            setSelectedUserProfile(null);
          }}
          title="شروع جلسه جدید"
          size="xl"
        >
          <div className="space-y-6">
            <Input
              label={"عنوان جلسه *"}
              type="text"
              placeholder="عنوان جلسه را وارد کنید..."
              value={formData.StartSession.Title}
              name={"StartSession.Title"}
              onChange={handleChange}
            />

            <Input
              label={"متن جلسه *"}
              type="textarea"
              placeholder={"متن جلسه را وارد کنید..."}
              value={formData.StartSession.Description}
              name={"StartSession.Description"}
              onChange={handleChange}
            />

            <Input
              label={"جستجوی کاربر"}
              type="text"
              placeholder="جستجوی کاربر بر اساس نام کاربری ..."
              value={formData.StartSession.Username}
              name={"StartSession.Username"}
              onChange={handleUserSearchChange}
            />

            <div className="max-h-[400px] border border-white/10 rounded-[12px] bg-white/5 overflow-hidden">
              <div className="h-[60px] flex items-center px-4 border-b border-white/10 bg-white/10">
                <h4 className="text-white font-semibold text-sm">
                  لیست کاربران
                </h4>
              </div>

              <div className="divide-y h-[340px] divide-white/10 overflow-y-auto">
                {!hasSearched ? (
                  <div className="p-4 text-center text-gray-400">
                    لطفا برای جستجو تایپ کنید
                  </div>
                ) : !userList?.data?.items ||
                  userList.data.items.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    کاربری یافت نشد
                  </div>
                ) : (
                  userList.data.items.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className={`p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 ${
                        formData.StartSession.userId === user.id
                          ? "bg-white/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="text-white font-medium">
                            {user.text}
                          </h4>
                        </div>

                        {formData.StartSession.userId === user.id && (
                          <div className="text-[var(--orgin-color)] text-sm">
                            <FaCheck size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* بخش نمایش پروفایل کاربر انتخاب شده */}
            {selectedUserProfile && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-3">
                  اطلاعات کاربر انتخاب شده
                </h4>
                <div className="space-y-3">
                  {/* نام شرکت */}
                  {selectedUserProfile.about?.coname && (
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">نام شرکت</p>
                        <p className="text-white text-sm">
                          {selectedUserProfile.about.coname}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ایمیل */}
                  {selectedUserProfile.about?.coemail && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">ایمیل</p>
                        <p className="text-white text-sm">
                          {selectedUserProfile.about.coemail}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* تلفن */}
                  {selectedUserProfile.about?.cophone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">تلفن</p>
                        <p className="text-white text-sm">
                          {selectedUserProfile.about.cophone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* زمینه‌های فعالیت */}
                  {selectedUserProfile.context &&
                    selectedUserProfile.context.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-xs mb-2">
                          زمینه‌های فعالیت
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedUserProfile.context.map((field, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[var(--orgin-color)]/20 text-[var(--orgin-color)] rounded text-xs"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            <div>
              <Button
                label={"شروع جلسه"}
                className={"h-12 w-full"}
                onClick={handleStartNewSession}
              />
            </div>
          </div>
        </Modal>

        {/* مودال ارسال پیام جدید */}
        <Modal
          isOpen={isNewMessageModalOpen}
          onClose={() => {
            setIsNewMessageModalOpen(false);
            setFormData((prev) => ({
              ...prev,
              NewMessage: {
                Title: "",
                Text: "",
              },
            }));
          }}
          title="ارسال پیام جدید"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label={"عنوان پیام *"}
              type="text"
              placeholder="عنوان پیام را وارد کنید..."
              value={formData.NewMessage.Title}
              name={"NewMessage.Title"}
              onChange={handleChange}
            />

            <Input
              label={"متن پیام *"}
              type="textarea"
              placeholder="متن پیام خود را وارد کنید..."
              value={formData.NewMessage.Text}
              name={"NewMessage.Text"}
              onChange={handleChange}
              rows={6}
            />

            <div className="flex gap-2">
              <Button
                label="انصراف"
                type="outline"
                className="flex-1"
                onClick={() => setIsNewMessageModalOpen(false)}
              />
              <Button
                label="ارسال پیام"
                type={"green"}
                className="flex-1"
                icon={<FiSend size={16} />}
                onClick={handleSendNewMessage}
                disabled={
                  !formData.NewMessage.Title.trim() ||
                  !formData.NewMessage.Text.trim()
                }
              />
            </div>
          </div>
        </Modal>

        {/* مودال اشتراک‌گذاری ارزیابی */}
        <Modal
          isOpen={isEvaluationModalOpen}
          onClose={() => setIsEvaluationModalOpen(false)}
          title="اشتراک‌گذاری ارزیابی"
          size="lg"
        >
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">لیست ارزیابی‌ها</h4>
              <div className="w-fit bg-blue-500/10 border border-blue-500/30 rounded-[10px] p-4">
                <p className="text-blue-400 text-sm">
                  ارزیابی مورد نظر را انتخاب کنید تا برای کاربر ارسال شود
                </p>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {/* نمونه ارزیابی‌ها */}
              <div
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  // ارسال ارزیابی انتخاب شده
                  setAlert({
                    message: "ارزیابی با موفقیت ارسال شد",
                    type: "success",
                    visible: true,
                  });
                  setIsEvaluationModalOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <FaFileAlt className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      فرم ارزیابی عملکرد ماهانه
                    </p>
                    <p className="text-gray-400 text-sm">
                      ارزیابی جامع عملکرد کارکنان
                    </p>
                  </div>
                </div>
                <FaChevronLeft className="text-gray-400" />
              </div>

              <div
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setAlert({
                    message: "ارزیابی با موفقیت ارسال شد",
                    type: "success",
                    visible: true,
                  });
                  setIsEvaluationModalOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FaChartBar className="text-blue-500" size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      نظرسنجی رضایت مشتری
                    </p>
                    <p className="text-gray-400 text-sm">
                      بررسی رضایت مشتریان از خدمات
                    </p>
                  </div>
                </div>
                <FaChevronLeft className="text-gray-400" />
              </div>

              <div
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setAlert({
                    message: "ارزیابی با موفقیت ارسال شد",
                    type: "success",
                    visible: true,
                  });
                  setIsEvaluationModalOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <FaClipboardList className="text-yellow-500" size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">چک لیست ایمنی</p>
                    <p className="text-gray-400 text-sm">
                      بررسی استانداردهای ایمنی محیط کار
                    </p>
                  </div>
                </div>
                <FaChevronLeft className="text-gray-400" />
              </div>

              <div
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setAlert({
                    message: "ارزیابی با موفقیت ارسال شد",
                    type: "success",
                    visible: true,
                  });
                  setIsEvaluationModalOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FaUserCheck className="text-purple-500" size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      ارزیابی مهارت‌های نرم
                    </p>
                    <p className="text-gray-400 text-sm">
                      سنجش مهارت‌های ارتباطی و رفتاری
                    </p>
                  </div>
                </div>
                <FaChevronLeft className="text-gray-400" />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </AccessGuard>
  );
}
