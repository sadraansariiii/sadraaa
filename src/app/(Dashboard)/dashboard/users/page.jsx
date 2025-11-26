"use client";

import { useState, useEffect, useRef } from "react";
import Input from "@/src/components/ui/inputs";
import {
  FaSearch,
  FaUsers,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaComment,
  FaPaperPlane,
} from "react-icons/fa";
import user from "@/public/img/user.jpeg";
import DashboardSection from "@/src/components/layout/dashboardSection";
import AccessGuard from "@/src/components/AccessGuard";
import Modal from "@/src/components/layout/Modal";
import Image from "next/image";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { clientId, token } = useSessionStore();
  const searchTimeoutRef = useRef(null);

  // جستجوی کاربران
  const searchUsers = async (query = "") => {
    if (!clientId || !token) return;

    try {
      setLoading(true);
      const userListRes = await fetch(BaseUrl("/account/search"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          live: 1,
          item_type: "accounts",
          q: query,
        }),
      });
      const data = await userListRes.json();
      console.log("API Response:", data);

      if (data && data.data && data.data.items) {
        const formattedUsers = data.data.items.map((item, index) => ({
          id: item.id || index,
          name: item.text || "نام نامشخص",
          username: item.id || "user_" + index,
          email: `${item.id || item.text}@example.com`,
          phone: "09120000000",
          company: "شرکت نمونه",
          park: "پارک نمونه",
          avatar: user,
          status: "active",
        }));
        setUsersData(formattedUsers);
      } else {
        setUsersData([]);
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // جستجو با تاخیر برای جلوگیری از درخواست‌های مکرر
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim() !== "") {
      searchTimeoutRef.current = setTimeout(() => {
        searchUsers(searchTerm);
      }, 500);
    } else {
      setUsersData([]);
      setHasSearched(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // تابع برای باز کردن مودال پروفایل
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  // تابع برای بستن مودال پروفایل
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  // تابع برای باز کردن مودال ارسال پیام
  const handleOpenMessageModal = (user) => {
    setSelectedUser(user);
    setMessageText("");
    setIsMessageModalOpen(true);
  };

  // تابع برای بستن مودال ارسال پیام
  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedUser(null);
    setMessageText("");
  };

  // تابع برای ارسال پیام
  const handleSendMessage = () => {
    if (!messageText.trim()) {
      alert("لطفا متن پیام را وارد کنید");
      return;
    }

    console.log("ارسال پیام به کاربر:", selectedUser);
    console.log("متن پیام:", messageText);

    // اینجا می‌توانید منطق ارسال پیام به API را اضافه کنید
    alert(`پیام به ${selectedUser.name} ارسال شد:\n\n${messageText}`);

    // بستن مودال پس از ارسال
    handleCloseMessageModal();
  };

  // محتوای مشترک برای تمام حالت‌ها
  const renderContent = () => {
    if (!hasSearched) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <h3 className="text-base font-medium text-white mb-2">
            جستجوی کاربران
          </h3>
          <p className="text-gray-300 text-sm">
            برای مشاهده کاربران، در کادر بالا جستجو کنید
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-3"></div>
          <p className="text-gray-300 text-sm">در حال جستجو...</p>
        </div>
      );
    }

    if (usersData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mb-4">
            <FaUsers className="text-xl text-red-400" />
          </div>
          <h3 className="text-base font-medium text-white mb-2">
            کاربری یافت نشد
          </h3>
          <p className="text-gray-300 text-sm">
            هیچ کاربری با "{searchTerm}" یافت نشد
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <AccessGuard>
      <DashboardSection>
        <div className="w-full h-full flex flex-col gap-4">
          {/* بخش جستجو */}
          <div className="w-full">
            <div className="w-full">
              <div className="flex gap-2 items-center w-full px-1">
                <Input
                  type="text"
                  placeholder="جستجو کاربر..."
                  value={searchTerm}
                  icon={<FaSearch />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1 flex flex-col">
            {/* هدر اطلاعات */}
            <div className="bg-gray-800 px-3 py-3 rounded-t-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gray-300 text-sm" />
                  <h3 className="text-base font-semibold text-white">
                    کاربران
                  </h3>
                  {hasSearched && !loading && usersData.length > 0 && (
                    <span className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded-full">
                      {usersData.length}
                    </span>
                  )}
                </div>
                {hasSearched && searchTerm && (
                  <div className="text-xs text-gray-300">"{searchTerm}"</div>
                )}
              </div>
            </div>

            {/* محتوای کاربران - حالت موبایل */}
            <div className="xl:hidden flex-1 overflow-auto rounded-b-lg border border-gray-700 border-t-0">
              {renderContent() || (
                <div className="p-2 space-y-3">
                  {usersData.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors duration-200"
                    >
                      {/* هدر کارت */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              {user.name}
                            </h4>
                            <p className="text-xs text-gray-400">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewProfile(user)}
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-900/30 px-2 py-1 rounded text-xs border border-blue-800/50"
                        >
                          <FaEye className="text-xs" />
                          مشاهده
                        </button>
                      </div>

                      {/* اطلاعات تماس */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FaEnvelope className="text-gray-500" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FaPhone className="text-gray-500" />
                          <span>{user.phone}</span>
                        </div>
                      </div>

                      {/* دکمه‌های اقدام */}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleViewProfile(user)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-xs flex items-center justify-center gap-1 transition-colors duration-200 border border-blue-500"
                        >
                          <FaEye className="text-xs" />
                          مشاهده پروفایل
                        </button>
                        <button
                          onClick={() => handleOpenMessageModal(user)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-xs flex items-center justify-center gap-1 transition-colors duration-200 border border-green-500"
                        >
                          <FaComment className="text-xs" />
                          ارسال پیام
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* جدول دسکتاپ */}
            <div className="hidden xl:block flex-1 overflow-auto rounded-b-lg border border-gray-700 border-t-0">
              {renderContent() || (
                <table className="w-full">
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-300 uppercase tracking-wider border-l border-gray-700">
                        نام
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-300 uppercase tracking-wider border-l border-gray-700">
                        نام کاربری
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-300 uppercase tracking-wider border-l border-gray-700">
                        مشاهده پروفایل
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-300 uppercase tracking-wider">
                        ارسال پیام
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700">
                    {usersData.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-750 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap border-l border-gray-700">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <Image
                                className="h-12 w-12 rounded-full"
                                src={user.avatar}
                                alt={user.name}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div className="mr-4">
                              <div className="text-base font-medium text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-l border-gray-700">
                          <div className="text-base font-medium text-white">
                            @{user.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-l border-gray-700">
                          <button
                            onClick={() => handleViewProfile(user)}
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-900/50 border border-blue-800/50"
                          >
                            <FaEye />
                            مشاهده پروفایل
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenMessageModal(user)}
                            className="text-green-400 hover:text-green-300 flex items-center gap-2 bg-green-900/30 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-green-900/50 border border-green-800/50"
                          >
                            <FaComment />
                            ارسال پیام
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* مودال پروفایل کاربر */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        title="مشخصات کاربر"
        size="md"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        {selectedUser && (
          <div className="p-4 space-y-6">
            {/* هدر پروفایل */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">
                  {selectedUser.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  @{selectedUser.username}
                </p>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${
                    selectedUser.status === "active"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1 ${
                      selectedUser.status === "active"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  ></div>
                  {selectedUser.status === "active" ? "فعال" : "غیرفعال"}
                </div>
              </div>
            </div>

            {/* اطلاعات کاربر */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-white/80 text-xs font-medium mb-2">
                  اطلاعات تماس
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">ایمیل:</span>
                    <span className="text-white text-xs">
                      {selectedUser.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">تلفن:</span>
                    <span className="text-white text-xs">
                      {selectedUser.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-white/80 text-xs font-medium mb-2">
                  اطلاعات سازمانی
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">شرکت:</span>
                    <span className="text-white text-xs">
                      {selectedUser.company}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">پارک:</span>
                    <span className="text-white text-xs">
                      {selectedUser.park}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleCloseProfileModal}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              >
                بستن
              </button>
              <button
                onClick={() => {
                  handleCloseProfileModal();
                  handleOpenMessageModal(selectedUser);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-1"
              >
                <FaComment className="text-xs" />
                ارسال پیام
              </button>
              <button className="flex-1 bg-[var(--orgin-color)] hover:bg-[var(--orgin-color)]/80 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm">
                ویرایش
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* مودال ارسال پیام */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        title="ارسال پیام"
        size="md"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        {selectedUser && (
          <div className="p-4 space-y-6">
            {/* اطلاعات کاربر */}
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">
                  {selectedUser.name}
                </h4>
                <p className="text-white/60 text-xs">
                  @{selectedUser.username}
                </p>
              </div>
            </div>

            {/* فرم ارسال پیام */}
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  متن پیام
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="متن پیام خود را اینجا بنویسید..."
                  rows="6"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-white/40 text-xs">
                    {messageText.length} / 1000 کاراکتر
                  </span>
                  {messageText.length > 800 && (
                    <span className="text-orange-400 text-xs">
                      نزدیک به محدودیت کاراکتر
                    </span>
                  )}
                </div>
              </div>

              {/* پیشنهادات سریع */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  پیشنهادات سریع
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "سلام، چطور می‌توانم کمک کنم؟",
                    "لطفا با من تماس بگیرید",
                    "جلسه هماهنگی داریم",
                    "پروژه نیاز به بررسی دارد",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMessageText(suggestion)}
                      className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs text-right transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCloseMessageModal}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                انصراف
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <FaPaperPlane className="text-xs" />
                ارسال پیام
              </button>
            </div>
          </div>
        )}
      </Modal>
    </AccessGuard>
  );
};

export default Users;