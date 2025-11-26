"use client";

import { useState, useEffect, useRef } from "react";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";
import Modal from "@/src/components/layout/Modal";
import Alert from "@/src/components/layout/Alert";
import GlassCard from "@/src/components/layout/glassCard";
import AccessGuard from "@/src/components/AccessGuard";
import BaseUrl from "@/src/utils/baseUrl";
import { useSessionStore } from "@/src/store/sessionStore";
import useFormHandler from "@/src/hooks/useFormHandler";
import MessageList from "@/src/components/ui/MessageList";

// آیکون‌ها
import {
  FaSearch,
  FaBuilding,
  FaRegUser,
  FaEnvelope,
  FaCalendar,
  FaPhone,
  FaGlobe,
  FaIdCard,
  FaCheck,
} from "react-icons/fa";
import { FiPlus, FiSend } from "react-icons/fi";
import { formatDateFa } from "@/src/utils/dateUtils";
import { decodeUnicodeDeep } from "@/src/utils/decodeUnicode";

const MessagesPage = () => {
  const { clientId, token } = useSessionStore();
  const [composeModal, setComposeModal] = useState(false);
  const [changePage, setChangePage] = useState("list");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const { formData, handleChange, setFormData } = useFormHandler({
    NewMessage: {
      Title: "",
      Text: "",
      userId: "",
      Username: "",
    },
  });

  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [originalSession, setOriginalSession] = useState(null);

  // ________________________________________________________________
  // بخش گرفتن لیست کاربران
  useEffect(() => {
    if (!clientId || !token) {
      return;
    }

    // هنگام لود اولیه، همه کاربران را بگیر
    const getAllUsers = async () => {
      try {
        const userListRes = await fetch(BaseUrl("/account/search"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            live: 1,
            item_type: "accounts",
            q: "", // جستجوی خالی برای گرفتن همه کاربران
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

    getAllUsers();
  }, [clientId, token]);

  // جستجوی کاربر بر اساس ورودی
  useEffect(() => {
    if (!clientId || !token) {
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
            q: formData.NewMessage.Username || "",
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
  }, [clientId, token, formData.NewMessage.Username]);

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
      setHasSearched(false);
      setFormData((prev) => ({
        ...prev,
        NewMessage: {
          ...prev.NewMessage,
          userId: "",
        },
      }));
      setSelectedUserProfile(null);
    }
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      NewMessage: {
        ...prev.NewMessage,
        userId: user.id,
        Username: user.text,
      },
    }));
    // دریافت پروفایل کاربر انتخاب شده
    fetchUserProfile(user.id);
  };

  // انتخاب تمام کاربران
  const handleSelectAllUsers = () => {
    // در این حالت، userId را خالی می‌گذاریم تا نشان دهنده ارسال به همه باشد
    setFormData((prev) => ({
      ...prev,
      NewMessage: {
        ...prev.NewMessage,
        userId: "all",
        Username: "تمامی کاربران",
      },
    }));
    setSelectedUserProfile(null);
  };
  // ________________________________________________________________

  // ________________________________________________________________
  // بخش پیام‌ها
  const getMessageList = async (targetUser) => {
    if (!clientId || !token || !targetUser) return;

    try {
      const MessageListRes = await fetch(BaseUrl("/account/messages"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          action: "list",
          targetuser: targetUser,
          type: "user",
          title: "",
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
    if (!formData.NewMessage.Title.trim() || !formData.NewMessage.Text.trim()) {
      setAlert({
        message: "لطفا عنوان و متن پیام را وارد کنید",
        type: "error",
        visible: true,
      });
      return;
    }

    try {
      const sendMessageRes = await fetch(BaseUrl("/account/messages"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          action: "send",
          targetuser: formData.NewMessage.userId || "all", // اگر userId خالی بود، به همه ارسال شود
          type: "user",
          title: formData.NewMessage.Title,
          text: formData.NewMessage.Text,
        }),
      });
      const data = await sendMessageRes.json();
      if (data.done) {
        setFormData((prev) => ({
          ...prev,
          NewMessage: {
            Title: "",
            Text: "",
            userId: "",
            Username: "",
          },
        }));
        setIsNewMessageModalOpen(false);
        setComposeModal(false);
        setAlert({
          message: "پیام با موفقیت ارسال شد",
          type: "success",
          visible: true,
        });
        // رفرش لیست پیام‌ها اگر در صفحه مشاهده هستیم
        if (selectedMessage) {
          getMessageList(selectedMessage.userId);
        }
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
  // ________________________________________________________________

  // داده‌های نمونه برای پیام‌ها
  const [messages, setMessages] = useState([
    {
      id: "1",
      subject: "بررسی طرح توسعه جدید",
      sender: "شرکت فناوری اطلاعات نوآوران",
      preview: "با سلام، طرح توسعه جدید آماده بررسی می‌باشد...",
      date: "1403/02/15",
      time: "14:30",
      unread: true,
      type: "incoming",
      userId: "user1",
    },
    {
      id: "2",
      subject: "پاسخ به درخواست همکاری",
      sender: "شرکت صنعتی مپنا",
      preview: "ضمن تشکر از ارسال درخواست، جهت ادامه فرآیند...",
      date: "1403/02/14",
      time: "09:15",
      unread: false,
      type: "incoming",
      userId: "user2",
    },
  ]);

  // مشاهده جزئیات پیام
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setChangePage("view");
    // گرفتن لیست پیام‌های مربوط به این کاربر
    getMessageList(message.userId);

    // علامت زدن پیام به عنوان خوانده شده
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id ? { ...msg, unread: false } : msg
      )
    );
  };

  return (
    <AccessGuard>
      <div className="w-full h-full">
        {changePage === "list" && (
          <DashboardSection
            tab={
              <div
                onClick={() => setComposeModal(true)}
                className="h-full flex justify-center items-center gap-2 text-[var(--text-color)] cursor-pointer transition-colors py-2 px-3"
              >
                <span className="text-sm md:text-base whitespace-nowrap">
                  ارسال پیام جدید
                </span>
                <button className="h-full aspect-square md:w-14 md:h-14 bg-[var(--orgin-color)] rounded-[8px] flex justify-center items-center cursor-pointer ">
                  <FiPlus size={"1.2rem"} className="md:size-5" />
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="xl:hidden w-full">
                <Button
                  onClick={() => setComposeModal(true)}
                  type={1}
                  label={"ارسال پیام جدید"}
                  icon={<FiPlus size={20} />}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">پیام‌ها</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder={"جستجو در پیام‌ها..."}
                      type="text"
                      icon={<FaSearch />}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {messages.map((message) => (
                  <GlassCard key={message.id}>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${
                            message.type === "incoming"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-[var(--orgin-color)]/20 text-[var(--orgin-color)]"
                          } rounded-xl flex items-center justify-center`}
                        >
                          <FaRegUser />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {message.sender}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {message.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {message.unread && (
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        )}
                        <span className="text-gray-400 text-sm">
                          {message.date} - {message.time}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                      <div className="w-full lg:flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="h-14 bg-white/5 rounded-lg px-4 flex flex-col justify-center">
                          <span className="text-gray-400 block text-xs mb-1">
                            موضوع
                          </span>
                          <p className="text-white font-medium">
                            {message.subject}
                          </p>
                        </div>

                        <div className="h-14 bg-white/5 rounded-lg px-4 flex flex-col justify-center">
                          <span className="text-gray-400 block text-xs mb-1">
                            پیش‌نمایش
                          </span>
                          <p className="text-white font-medium truncate">
                            {message.preview}
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex gap-4 justify-end lg:w-1/4">
                        <Button
                          label={"مشاهده"}
                          type={1}
                          className={"h-14"}
                          onClick={() => handleViewMessage(message)}
                        />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </DashboardSection>
        )}

        {changePage === "view" && selectedMessage && (
          <DashboardSection>
            <div className="w-full h-full flex flex-col xl:flex-row gap-4">
              {/* بخش بزرگ - محتوای پیام */}
              <div className="w-full xl:w-[70%] h-full">
                <GlassCard>
                  <div className="h-10 flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedMessage.subject}
                    </h2>
                    <Button
                      label={"بازگشت به لیست"}
                      type={"red"}
                      onClick={() => {
                        setChangePage("list");
                        setSelectedMessage(null);
                      }}
                    />
                  </div>
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
                            تاریخچه مکاتبات و پیام‌های ارسالی و دریافتی
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
                              sender={message.sender?.name || "نامشخص"}
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
                </GlassCard>
              </div>

              {/* بخش کوچک - اطلاعات فرستنده */}
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
                      {selectedMessage.sender}
                    </h3>
                    <p className="text-gray-400 text-sm text-center">
                      {selectedMessage.type === "incoming"
                        ? "فرستنده پیام"
                        : "گیرنده پیام"}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* اطلاعات تماس */}
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <FaEnvelope className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">ایمیل</p>
                        <p className="text-white text-sm">info@company.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <FaBuilding className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">صنعت</p>
                        <p className="text-white text-sm">فناوری اطلاعات</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <FaCalendar className="text-[var(--orgin-color)]" />
                      <div>
                        <p className="text-gray-400 text-xs">عضویت از</p>
                        <p className="text-white text-sm">1402/05/01</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm">وضعیت پیام</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedMessage.unread
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {selectedMessage.unread ? "خوانده نشده" : "خوانده شده"}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        label={"پاسخ سریع"}
                        type={1}
                        className={"flex-1"}
                        icon={<FiSend size={16} />}
                        onClick={() => setIsNewMessageModalOpen(true)}
                      />
                    </div>
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

        {/* مودال نوشتن پیام جدید */}
        <Modal
          isOpen={composeModal}
          onClose={() => {
            setComposeModal(false);
            setFormData((prev) => ({
              ...prev,
              NewMessage: {
                Title: "",
                Text: "",
                userId: "",
                Username: "",
              },
            }));
            setUserList([]);
            setHasSearched(false);
            setSelectedUserProfile(null);
          }}
          title="نوشتن پیام جدید"
          size="xl"
        >
          <div className="space-y-6">
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

            <Input
              label={"جستجوی کاربر"}
              type="text"
              placeholder="جستجوی کاربر بر اساس نام کاربری ..."
              value={formData.NewMessage.Username}
              name={"NewMessage.Username"}
              onChange={handleUserSearchChange}
            />

            {/* دکمه انتخاب تمام کاربران */}
            <div className="flex justify-end">
              <Button
                label="ارسال به تمام کاربران"
                type={1}
                className="h-10"
                onClick={handleSelectAllUsers}
              />
            </div>

            <div className="max-h-[400px] border border-white/10 rounded-[12px] bg-white/5 overflow-hidden">
              <div className="h-[60px] flex items-center px-4 border-b border-white/10 bg-white/10">
                <h4 className="text-white font-semibold text-sm">
                  لیست کاربران ({userList?.data?.items?.length || 0} کاربر)
                </h4>
              </div>

              <div className="divide-y h-[340px] divide-white/10 overflow-y-auto">
                {!userList?.data?.items || userList.data.items.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    کاربری یافت نشد
                  </div>
                ) : (
                  userList.data.items.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className={`p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 ${
                        formData.NewMessage.userId === user.id
                          ? "bg-white/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[var(--orgin-color)]/20 rounded-full flex items-center justify-center">
                            <FaRegUser className="text-[var(--orgin-color)]" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {user.text}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              کاربر سیستم
                            </p>
                          </div>
                        </div>

                        {formData.NewMessage.userId === user.id && (
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

            {/* نمایش وضعیت انتخاب تمام کاربران */}
            {formData.NewMessage.userId === "all" && (
              <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500" />
                  <div>
                    <h4 className="text-white font-semibold">
                      ارسال به تمام کاربران
                    </h4>
                    <p className="text-green-400 text-sm">
                      این پیام برای همه کاربران سیستم ارسال خواهد شد
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                label={"ارسال پیام"}
                className={"h-12 w-full"}
                onClick={handleSendNewMessage}
                disabled={
                  !formData.NewMessage.Title.trim() ||
                  !formData.NewMessage.Text.trim()
                }
              />
            </div>
          </div>
        </Modal>

        {/* مودال ارسال پیام جدید از صفحه مشاهده */}
        <Modal
          isOpen={isNewMessageModalOpen}
          onClose={() => {
            setIsNewMessageModalOpen(false);
            setFormData((prev) => ({
              ...prev,
              NewMessage: {
                Title: "",
                Text: "",
                userId: selectedMessage?.userId || "",
                Username: "",
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
      </div>
    </AccessGuard>
  );
};

export default MessagesPage;