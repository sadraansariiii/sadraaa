"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { BsPatchQuestion } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineAddToPhotos,
  MdOutlineMessage,
  MdOutlineNotificationsActive,
  MdOutlineSell,
  MdOutlineWidgets,
  MdPostAdd,
  MdProductionQuantityLimits,
} from "react-icons/md";
import {
  IoLogOutOutline,
  IoSettingsOutline,
  IoMenu,
  IoClose,
  IoCreateOutline,
} from "react-icons/io5";
import { VscGoToEditingSession } from "react-icons/vsc";
import { RiProductHuntLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";

import Button from "@/src/components/ui/Button";
import { Tooltip } from "antd";
import { useSessionStore } from "@/src/store/sessionStore";
import BaseUrl from "@/src/utils/baseUrl";
import Alert from "@/src/components/layout/Alert";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

import Profile from "@/public/img/user.jpeg";
import {
  FiX,
  FiUser,
  FiHelpCircle,
  FiHome,
  FiMessageSquare,
  FiBarChart2,
  FiUserCheck,
  FiLifeBuoy,
  FiPlay,
  FiUsers,
  FiShare2,
  FiFileText,
  FiBell,
  FiShield,
} from "react-icons/fi";
import { useInfoStore } from "@/src/store/userInfoStore";
import { formatDateFa } from "@/src/utils/dateUtils";
import Modal from "@/src/components/layout/Modal";
import DynamicTabs from "@/src/components/ui/Tab";
import { useNameStore } from "@/src/store/userNameStore";

export default function DashboardLayout({ children }) {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const [sidebarList, setSidebarList] = useState({ sidebar: [] });
  const [notifData, setNotifData] = useState({ count: 0 });
  const [notif, setNotif] = useState(false);
  const { clientId, token } = useSessionStore();

  const { userInfo, setUserInfo } = useInfoStore();
  const { userName, setUserName } = useNameStore();
  const pathname = usePathname();
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // LOGOUT
  const logOut = async () => {
    try {
      const logOutRes = await fetch(BaseUrl("/account/logout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
        }),
      });

      const data = await logOutRes.json();

      if (data.done) {
        setAlert({
          message:
            "شما با موفقیت از حساب خود خارج شدید در حال انتقال به صفحه اصلی.",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setAlert({
        message: "خطا در خروج از حساب. لطفاً دوباره تلاش کنید.",
        type: "error",
        visible: true,
      });
    }
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // دریافت اطلاعات از API
  useEffect(() => {
    if (!clientId || !token) return;

    const getInfoAppid = async () => {
      try {
        const InfoAppiRes = await fetch(BaseUrl("/account/info"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await InfoAppiRes.json();
        setUserInfo(data.data.r_form);
        setUserName(data.data);
        setSidebarList(data.data || { sidebar: [] });
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        setSidebarList({ sidebar: [] });
      }
    };

    const getNotif = async () => {
      try {
        const getNotifRes = await fetch(BaseUrl("/account/alert_count"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await getNotifRes.json();
        setNotifData((prev) => ({
          ...prev,
          count: data.data?.count || 0,
        }));
      } catch (error) {
        console.error("Error fetching notification data:", error);
      }
    };

    getInfoAppid();
    getNotif();
  }, [clientId, token]);

  // تابع برای رندر آیکون بر اساس نام فونت
  const renderIcon = (fontId) => {
    const iconMap = {
      1: <LuLayoutDashboard />,
      2: <HiOutlineUsers />,
      3: <CgProfile />,
      4: <IoSettingsOutline />,
      5: <MdOutlineWidgets />,
      6: <MdPostAdd />,
      7: <MdOutlineMessage />,
      8: <IoCreateOutline />,
      9: <MdProductionQuantityLimits />,
      10: <RiProductHuntLine />,
      11: <MdOutlineSell />,
      12: <VscGoToEditingSession />,
    };

    return iconMap[fontId] || <LuLayoutDashboard />;
  };

  // تابع برای بررسی معتبر بودن URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // تابع برای نمایش اطلاعات کاربر در اعلان
  const renderUserInfo = (item) => {
    if (item.target) {
      const user = item.target;
      return (
        <div className="flex items-center gap-2 mt-2 p-2 bg-white/5 rounded-lg">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
            {user.pic && isValidUrl(user.pic) ? (
              <img
                src={user.pic}
                alt={user.username || "User"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white">
                <FiUser size={16} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-xs text-white font-medium">
              {user.username || "کاربر"}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // دریافت لیست اعلان‌ها از API
  const getAlertList = async () => {
    try {
      setLoadingNotifications(true);
      const signupRes = await fetch(BaseUrl("/account/alert_list"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
        }),
      });
      const data = await signupRes.json();
      console.log("Alert List Data:", data);

      if (data.done && data.data && data.data.items) {
        setNotifications(data.data.items);
      }
    } catch (error) {
      console.error("Error fetching alert list:", error);
      setAlert({
        message: "خطا در دریافت اعلان‌ها",
        type: "error",
        visible: true,
      });
    } finally {
      setLoadingNotifications(false);
    }
  };

  return (
    <div className="relative w-full h-screen background-image-login p-4 xl:p-6 ">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="w-full h-full max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4 xl:gap-6 overflow-auto relative">
        {/* Mobile Header */}
        <div className="xl:hidden w-full h-fit rounded-[12px] bg-white/10 backdrop-blur-[5px] flex justify-between items-center p-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-12 h-12 flex items-center justify-center text-white text-2xl transition-transform hover:scale-110"
          >
            <IoMenu />
          </button>

          <div className="w-fit h-full flex items-center gap-4">
            <Button
              icon={<FiHelpCircle size={"1.5rem"} />}
              type={2}
              onClick={() => setHelpModalOpen(true)}
            />

            <div className="w-fit h-fit relative">
              <Button
                icon={<MdOutlineNotificationsActive size={"1.5rem"} />}
                type={2}
                onClick={() => {
                  setNotif(!notif);
                  getAlertList();
                }}
              />
              {notifData?.count !== 0 && (
                <div>
                  <div className="absolute w-4 h-4 bg-red-500 -top-1.5 -right-1.5 rounded-full animate-ping"></div>
                  <div className="absolute w-4 h-4 bg-red-500 -top-1.5 -right-1.5 rounded-full text-[10px] text-[var(--text-color)] flex justify-center items-center">
                    {notifData.count}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[1px] h-[70%] bg-gray-400"></div>
            <Link href={"/dashboard/profile"}>
              <div className="w-12 h-12 bg-[var(--bg-color)] rounded-[8px] flex justify-center items-center hover:text-[var(--orgin-color)] cursor-pointer text-[var(--text-color)] text-[20px] shadow-[0_0_5px_0px_#898686] overflow-hidden transition-transform">
                <Image
                  src={Profile}
                  alt="profile"
                  className="w-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`xl:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          ></div>

          <div
            className={`absolute right-0 top-0 w-3/4 sm:w-1/2 h-full bg-black/10 backdrop-blur-[50px] rounded-l-[0px] p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={closeMenu}
              className="self-start w-12 h-12 flex items-center justify-center text-white text-2xl mb-8 transition-transform hover:scale-110 hover:rotate-90"
            >
              <IoClose />
            </button>

            <ul className="flex-1 flex flex-col gap-4 overflow-auto">
              {sidebarList?.sidebar && sidebarList.sidebar.length > 0 ? (
                sidebarList.sidebar.map((data, index) => {
                  let isActive = false;
                  if (data.url === "/dashboard") {
                    isActive =
                      pathname === "/dashboard" ||
                      pathname.startsWith("/dashboard/question") ||
                      pathname.startsWith("/dashboard/newassessment");
                  } else {
                    isActive =
                      pathname === data.url ||
                      pathname.startsWith(data.url + "/");
                  }
                  return (
                    <li
                      key={data.id}
                      className="transform transition-all duration-300 ease-out"
                      style={{
                        animationDelay: mobileMenuOpen
                          ? `${index * 100}ms`
                          : "0ms",
                        transform: mobileMenuOpen
                          ? "translateX(0)"
                          : "translateX(50px)",
                        opacity: mobileMenuOpen ? 1 : 0,
                        transition: `transform 0.3s ease-out ${
                          index * 100
                        }ms, opacity 0.3s ease-out ${index * 100}ms`,
                      }}
                    >
                      <Link href={data.url} onClick={closeMenu}>
                        <div
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                            isActive
                              ? "bg-[var(--bg-orgin-color)] text-[var(--orgin-color)] scale-105"
                              : "text-white hover:bg-white/10 hover:scale-105"
                          }`}
                        >
                          <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                            {renderIcon(data.id)}
                          </span>
                          <span className="text-lg font-medium">
                            {data.title}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-4"></div>
              )}
            </ul>

            <button
              onClick={() => {
                logOut();
                closeMenu();
              }}
              className="flex items-center gap-4 p-4 rounded-2xl text-white hover:bg-white/10 transition-all duration-200 mt-4 transform hover:scale-105 group"
              style={{
                animationDelay: mobileMenuOpen
                  ? `${(sidebarList?.sidebar?.length || 0) * 100}ms`
                  : "0ms",
                transform: mobileMenuOpen
                  ? "translateX(0)"
                  : "translateX(50px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `transform 0.3s ease-out ${
                  (sidebarList?.sidebar?.length || 0) * 100
                }ms, opacity 0.3s ease-out ${
                  (sidebarList?.sidebar?.length || 0) * 100
                }ms`,
              }}
            >
              <IoLogOutOutline className="text-2xl transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-medium">خروج</span>
            </button>
          </div>
        </div>

        <div className="xl:hidden w-full flex-1 rounded-[20px] flex justify-end items-center z-20">
          {children}
        </div>

        {/* Desktop Sidebar */}
        <div className="w-[100px] h-full min-h-[400px] bg-white/10 backdrop-blur-[30px] rounded-[20px] hidden xl:flex flex-col justify-between items-center text-[var(--orgin-color2)] py-8 z-20 overflow-auto">
          <div></div>
          <ul className="w-full flex flex-col">
            {sidebarList?.sidebar && sidebarList.sidebar.length > 0 ? (
              sidebarList.sidebar.map((data) => {
                let isActive = false;
                if (data.url === "/dashboard") {
                  isActive =
                    pathname === "/dashboard" ||
                    pathname.startsWith("/dashboard/question") ||
                    pathname.startsWith("/dashboard/newassessment");
                } else {
                  isActive =
                    pathname === data.url ||
                    pathname.startsWith(data.url + "/");
                }
                return (
                  <li
                    key={data.id}
                    className="w-full h-fit flex justify-center items-center gap-4 py-2 relative group"
                  >
                    <Link href={data.url}>
                      <div
                        className={`w-2 h-10 transition-all duration-300 ${
                          isActive
                            ? "bg-[var(--orgin-color)] shadow-[0px_0px_10px_0px_var(--orgin-color)]"
                            : "group-hover:bg-white/30 group-hover:shadow-[0px_0px_5px_0px_#ffffff]"
                        } absolute right-0 rounded-l-xl `}
                      ></div>
                      <Tooltip
                        placement="left"
                        title={data.title}
                        classNames={{
                          root: "custom-tooltip-with-border",
                        }}
                      >
                        <div
                          className={`w-10 h-10 transition-all duration-300 ${
                            isActive
                              ? "bg-[var(--bg-orgin-color)] text-[var(--orgin-color)] scale-110"
                              : "text-[var(--text-color)] group-hover:bg-white/10 group-hover:scale-105"
                          } rounded-xl flex justify-center items-center text-[26px]`}
                        >
                          {renderIcon(data.id)}
                        </div>
                      </Tooltip>
                    </Link>
                  </li>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-4 space-y-2"></div>
            )}
          </ul>
          <div className=" text-[var(--text-color)] group">
            <Tooltip
              placement="left"
              title={"خروج از حساب کاربری"}
              classNames={{
                root: "custom-tooltip-with-border",
              }}
            >
              <IoLogOutOutline
                onClick={logOut}
                size={"2rem"}
                className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-[var(--orgin-color)]"
              />
            </Tooltip>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 h-full hidden xl:flex flex-col z-20">
          <div className="w-full min-h-[100px] bg-white/10 backdrop-blur-[30px] rounded-[20px] flex justify-end items-center overflow-hidden px-6">
            <div className="w-fit h-full flex items-center gap-4 ">
              <Tooltip
                placement="top"
                title={"راهنمای نرم‌افزار"}
                classNames={{
                  root: "custom-tooltip-with-border",
                }}
              >
                <Button
                  icon={<FiHelpCircle size={"1.5rem"} />}
                  type={2}
                  onClick={() => setHelpModalOpen(true)}
                />
              </Tooltip>

              <Tooltip
                placement="top"
                title={"اعلان"}
                classNames={{
                  root: "custom-tooltip-with-border",
                }}
              >
                <div
                  onClick={() => {
                    setNotif(!notif);
                    getAlertList();
                  }}
                  className="w-fit h-fit relative"
                >
                  <Button
                    icon={<MdOutlineNotificationsActive size={"1.5rem"} />}
                    type={2}
                  />
                  {notifData?.count !== 0 && (
                    <div>
                      <div className="absolute w-4 h-4 bg-red-500 -top-1.5 -right-1.5 rounded-full animate-ping"></div>
                      <div className="absolute w-4 h-4 bg-red-500 -top-1.5 -right-1.5 rounded-full text-[10px] text-[var(--text-color)] flex justify-center items-center">
                        {notifData.count}
                      </div>
                    </div>
                  )}
                </div>
              </Tooltip>

              <div className="w-[1px] h-[70%] bg-gray-400"></div>
              <Link href={"/dashboard/profile"}>
                <Tooltip
                  placement="top"
                  title={"پروفایل"}
                  classNames={{
                    root: "custom-tooltip-with-border",
                  }}
                >
                  <div className="w-16 h-16 bg-[var(--bg-color)] rounded-[10px] flex justify-center items-center hover:text-[var(--orgin-color)] cursor-pointer text-[var(--text-color)] text-[20px] shadow-[0_0_5px_0px_#898686] overflow-hidden transition-transform hover:scale-105">
                    <Image
                      src={Profile}
                      alt="profile"
                      className="w-full object-cover"
                    />
                  </div>
                </Tooltip>
              </Link>
            </div>
          </div>
          <div className="w-full h-[calc(100%-100px)] min-h-[300px]">
            {children}
          </div>
        </div>

        {/* مودال راهنمای بهبود یافته */}
        <Modal
          isOpen={helpModalOpen}
          onClose={() => setHelpModalOpen(false)}
          title="راهنمای جامع نرم‌افزار"
          size="lg"
        >
          <div className="xl:h-[60vh]">
            <DynamicTabs
              tabs={[
                {
                  id: "getting-started",
                  label: (
                    <div className="flex items-center gap-2">
                      <FiHome className="text-lg" />
                      <span>شروع کار</span>
                    </div>
                  ),
                  content: (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <FiPlay className="text-blue-500 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            به نرم‌افزار خوش آمدید
                          </h3>
                          <p className="text-gray-400 text-sm">
                            راهنمای جامع برای شروع کار با سیستم
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <LuLayoutDashboard className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پنل مدیریت
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            از طریق پنل مدیریت می‌توانید به تمامی بخش‌های
                            نرم‌افزار دسترسی داشته باشید و عملکرد کلی سیستم را
                            نظارت کنید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-green-400 text-xl" />
                            <h4 className="text-white font-medium">
                              منوی کناری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            منوی کناری شامل دسترسی سریع به تمامی ماژول‌های
                            نرم‌افزار می‌باشد. هر آیتم مربوط به یک بخش خاص است.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-orange-400 text-xl" />
                            <h4 className="text-white font-medium">هدآپ</h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            در بخش هدآپ می‌توانید به اعلان‌ها، پروفایل و راهنمای
                            نرم‌افزار دسترسی داشته باشید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUserCheck className="text-purple-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پروفایل کاربری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            اطلاعات حساب کاربری خود را مدیریت کرده و تنظیمات
                            شخصی را اعمال کنید.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <LuLayoutDashboard className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پنل مدیریت
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            از طریق پنل مدیریت می‌توانید به تمامی بخش‌های
                            نرم‌افزار دسترسی داشته باشید و عملکرد کلی سیستم را
                            نظارت کنید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-green-400 text-xl" />
                            <h4 className="text-white font-medium">
                              منوی کناری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            منوی کناری شامل دسترسی سریع به تمامی ماژول‌های
                            نرم‌افزار می‌باشد. هر آیتم مربوط به یک بخش خاص است.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-orange-400 text-xl" />
                            <h4 className="text-white font-medium">هدآپ</h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            در بخش هدآپ می‌توانید به اعلان‌ها، پروفایل و راهنمای
                            نرم‌افزار دسترسی داشته باشید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUserCheck className="text-purple-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پروفایل کاربری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            اطلاعات حساب کاربری خود را مدیریت کرده و تنظیمات
                            شخصی را اعمال کنید.
                          </p>
                        </div>
                      </div>{" "}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <LuLayoutDashboard className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پنل مدیریت
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            از طریق پنل مدیریت می‌توانید به تمامی بخش‌های
                            نرم‌افزار دسترسی داشته باشید و عملکرد کلی سیستم را
                            نظارت کنید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-green-400 text-xl" />
                            <h4 className="text-white font-medium">
                              منوی کناری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            منوی کناری شامل دسترسی سریع به تمامی ماژول‌های
                            نرم‌افزار می‌باشد. هر آیتم مربوط به یک بخش خاص است.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-orange-400 text-xl" />
                            <h4 className="text-white font-medium">هدآپ</h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            در بخش هدآپ می‌توانید به اعلان‌ها، پروفایل و راهنمای
                            نرم‌افزار دسترسی داشته باشید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUserCheck className="text-purple-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پروفایل کاربری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            اطلاعات حساب کاربری خود را مدیریت کرده و تنظیمات
                            شخصی را اعمال کنید.
                          </p>
                        </div>
                      </div>{" "}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <LuLayoutDashboard className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پنل مدیریت
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            از طریق پنل مدیریت می‌توانید به تمامی بخش‌های
                            نرم‌افزار دسترسی داشته باشید و عملکرد کلی سیستم را
                            نظارت کنید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-green-400 text-xl" />
                            <h4 className="text-white font-medium">
                              منوی کناری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            منوی کناری شامل دسترسی سریع به تمامی ماژول‌های
                            نرم‌افزار می‌باشد. هر آیتم مربوط به یک بخش خاص است.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-orange-400 text-xl" />
                            <h4 className="text-white font-medium">هدآپ</h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            در بخش هدآپ می‌توانید به اعلان‌ها، پروفایل و راهنمای
                            نرم‌افزار دسترسی داشته باشید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUserCheck className="text-purple-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پروفایل کاربری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            اطلاعات حساب کاربری خود را مدیریت کرده و تنظیمات
                            شخصی را اعمال کنید.
                          </p>
                        </div>
                      </div>{" "}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <LuLayoutDashboard className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پنل مدیریت
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            از طریق پنل مدیریت می‌توانید به تمامی بخش‌های
                            نرم‌افزار دسترسی داشته باشید و عملکرد کلی سیستم را
                            نظارت کنید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-green-400 text-xl" />
                            <h4 className="text-white font-medium">
                              منوی کناری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            منوی کناری شامل دسترسی سریع به تمامی ماژول‌های
                            نرم‌افزار می‌باشد. هر آیتم مربوط به یک بخش خاص است.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-orange-400 text-xl" />
                            <h4 className="text-white font-medium">هدآپ</h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            در بخش هدآپ می‌توانید به اعلان‌ها، پروفایل و راهنمای
                            نرم‌افزار دسترسی داشته باشید.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiUserCheck className="text-purple-400 text-xl" />
                            <h4 className="text-white font-medium">
                              پروفایل کاربری
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            اطلاعات حساب کاربری خود را مدیریت کرده و تنظیمات
                            شخصی را اعمال کنید.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "sessions",
                  label: (
                    <div className="flex items-center gap-2">
                      <FiMessageSquare className="text-lg" />
                      <span>مدیریت سشن‌ها</span>
                    </div>
                  ),
                  content: (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <FiMessageSquare className="text-green-500 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            مدیریت سشن‌ها
                          </h3>
                          <p className="text-gray-400 text-sm">
                            ایجاد و مدیریت جلسات کاربران
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4 border-l-4 border-green-500">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <FiPlay className="text-green-400" />
                            ایجاد سشن جدید
                          </h4>
                          <p className="text-gray-300 text-sm">
                            برای ایجاد سشن جدید بر روی دکمه "شروع جلسه جدید"
                            کلیک کنید و اطلاعات مورد نیاز شامل عنوان، توضیحات و
                            کاربر مورد نظر را وارد نمایید.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border-l-4 border-blue-500">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <FiUsers className="text-blue-400" />
                            مدیریت سشن‌های فعال
                          </h4>
                          <p className="text-gray-300 text-sm">
                            در لیست سشن‌های فعال می‌توانید سشن‌ها را مشاهده،
                            تایید، رد و یا ویرایش کنید. همچنین می‌توانید وضعیت
                            هر سشن را پیگیری کنید.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border-l-4 border-purple-500">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <FiShare2 className="text-purple-400" />
                            ارسال پیام و محتوا
                          </h4>
                          <p className="text-gray-300 text-sm">
                            در بخش پیام‌ها می‌توانید با کاربران در ارتباط باشید
                            و مکاتبات را مدیریت کنید. همچنین امکان ارسال فایل و
                            محتوای آموزشی وجود دارد.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "evaluations",
                  label: (
                    <div className="flex items-center gap-2">
                      <FiBarChart2 className="text-lg" />
                      <span>ارزیابی‌ها</span>
                    </div>
                  ),
                  content: (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <FiBarChart2 className="text-purple-500 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            سیستم ارزیابی
                          </h3>
                          <p className="text-gray-400 text-sm">
                            مدیریت فرم‌های ارزیابی و نظرسنجی
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-xl p-4 text-center">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <FiFileText className="text-green-400 text-lg" />
                          </div>
                          <h4 className="text-white font-medium mb-2">
                            ایجاد ارزیابی
                          </h4>
                          <p className="text-gray-300 text-xs">
                            می‌توانید فرم‌های ارزیابی مختلفی ایجاد کرده و برای
                            کاربران ارسال کنید.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 text-center">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <FiShare2 className="text-blue-400 text-lg" />
                          </div>
                          <h4 className="text-white font-medium mb-2">
                            اشتراک‌گذاری
                          </h4>
                          <p className="text-gray-300 text-xs">
                            از طریق تب اشتراک‌گذاری‌ها می‌توانید محتوای ارسال
                            شده را مدیریت کنید.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 text-center">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <FiBarChart2 className="text-orange-400 text-lg" />
                          </div>
                          <h4 className="text-white font-medium mb-2">
                            گزارش‌گیری
                          </h4>
                          <p className="text-gray-300 text-xs">
                            گزارش‌های کامل از ارزیابی‌ها را در قالب‌های مختلف
                            دریافت کنید.
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                        <h4 className="text-white font-medium mb-3">
                          انواع ارزیابی‌های موجود
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            ارزیابی عملکرد
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            نظرسنجی رضایت
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            چک لیست ایمنی
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            ارزیابی مهارت‌ها
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "profile",
                  label: (
                    <div className="flex items-center gap-2">
                      <FiUserCheck className="text-lg" />
                      <span>پروفایل و تنظیمات</span>
                    </div>
                  ),
                  content: (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                          <FiUserCheck className="text-orange-500 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            مدیریت حساب کاربری
                          </h3>
                          <p className="text-gray-400 text-sm">
                            شخصی‌سازی حساب کاربری و تنظیمات
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <CgProfile className="text-blue-400 text-xl" />
                            <div>
                              <h4 className="text-white font-medium">
                                اطلاعات شخصی
                              </h4>
                              <p className="text-gray-400 text-xs">
                                مدیریت اطلاعات حساب کاربری
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            اطلاعات حساب کاربری خود را در بخش پروفایل به روز
                            رسانی کنید. شامل نام، ایمیل، شماره تماس و سایر
                            اطلاعات تماس.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <FiBell className="text-green-400 text-xl" />
                            <div>
                              <h4 className="text-white font-medium">
                                تنظیمات اعلان‌ها
                              </h4>
                              <p className="text-gray-400 text-xs">
                                شخصی‌سازی نحوه دریافت اعلان‌ها
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            نوع و نحوه دریافت اعلان‌ها را شخصی‌سازی کنید.
                            می‌توانید اعلان‌های ایمیل، پیامک و push را مدیریت
                            کنید.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <FiShield className="text-red-400 text-xl" />
                            <div>
                              <h4 className="text-white font-medium">
                                امنیت و حریم خصوصی
                              </h4>
                              <p className="text-gray-400 text-xs">
                                مدیریت تنظیمات امنیتی
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            تنظیمات امنیتی حساب کاربری خود را مدیریت کنید. شامل
                            تغییر رمز عبور، احراز هویت دو مرحله‌ای و مدیریت
                            دستگاه‌های متصل.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "support",
                  label: (
                    <div className="flex items-center gap-2">
                      <FiLifeBuoy className="text-lg" />
                      <span>پشتیبانی</span>
                    </div>
                  ),
                  content: (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                          <FiLifeBuoy className="text-red-500 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            پشتیبانی و راهنمایی
                          </h3>
                          <p className="text-gray-400 text-sm">
                            راه‌های ارتباطی و منابع کمکی
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-5 border border-red-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiLifeBuoy className="text-red-400 text-xl" />
                            <h4 className="text-white font-medium">
                              تیم پشتیبانی
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">
                            در صورت بروز هرگونه مشکل یا سوال، تیم پشتیبانی ما
                            آماده کمک‌رسانی به شما می‌باشد.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="text-green-400">📧</span>
                              <span>ایمیل: support@company.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="text-blue-400">📞</span>
                              <span>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="text-purple-400">🕒</span>
                              <span>ساعات کاری: ۹ صبح تا ۵ عصر</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-5 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <FiFileText className="text-blue-400 text-xl" />
                            <h4 className="text-white font-medium">
                              مستندات و راهنما
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">
                            برای اطلاعات بیشتر و آموزش‌های پیشرفته به مستندات
                            کامل نرم‌افزار مراجعه کنید.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              راهنمای استفاده از ماژول‌ها
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              آموزش ویدیویی features
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              سوالات متداول (FAQ)
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-gray-300 text-sm">
                          💡 <strong>نکته:</strong> برای دریافت سریع‌ترین پاسخ،
                          لطفاً مشکل خود را به طور دقیق شرح داده و در صورت امکان
                          تصاویر مربوطه را ارسال کنید.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
           
            />
          </div>
        </Modal>

        {/* notif */}
        {notif && (
          <>
            <div
              onClick={() => {
                setNotif(!notif);
              }}
              className="fixed inset-0  bg-black/10  z-20"
            ></div>
            <div className="fixed md:absolute top-24 md:top-20 xl:top-32 mx-auto w-[calc(100%-40px)] md:w-1/2 md:h-[50vh] h-[80vh] md:left-0 xl:w-96 xl:h-[500px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 overflow-y-auto z-30 left-1/2 -translate-x-1/2 md:translate-x-0 md:mx-0">
              <div className="w-full h-12 border-b border-white/20 flex justify-between items-center">
                <span className="text-[var(--text-color)] font-bold">
                  اعلان‌ها
                </span>
                <button
                  className="text-white/70 hover:text-white p-2 transition-colors duration-200"
                  aria-label="بستن"
                >
                  <FiX
                    size={24}
                    onClick={() => {
                      setNotif(!notif);
                    }}
                  />
                </button>
              </div>

              {loadingNotifications && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-white">در حال دریافت اعلان‌ها...</div>
                </div>
              )}

              <div className="space-y-3 max-h-[calc(100%-60px)] overflow-y-auto mt-4">
                {!loadingNotifications && notifications.length > 0
                  ? notifications.map((item, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border transition-all duration-200 
                          "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4
                                className={`font-medium text-sm ${
                                  !item.is_new ? "text-gray-300" : "text-white"
                                }`}
                              >
                                {item.title}
                              </h4>
                              <span className="text-xs text-gray-400 whitespace-nowrap">
                                {formatDateFa(item.time)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                              {item.text}
                            </p>
                            {renderUserInfo(item)}
                          </div>
                        </div>
                      </div>
                    ))
                  : !loadingNotifications && (
                      <div className="text-center py-8 text-gray-400">
                        <p>اعلانی وجود ندارد</p>
                      </div>
                    )}
              </div>
            </div>
          </>
        )}
      </div>

      {alert.visible && (
        <Alert
          message={alert.message}
          type={alert.type}
          isVisible={alert.visible}
          duration={3000}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
    </div>
  );
}
