"use client";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/inputs";

import { OtpInput } from "reactjs-otp-input";

import { useEffect, useState } from "react";

import { FaKey, FaPhone, FaUser, FaUserCircle } from "react-icons/fa";

import { useSessionStore } from "@/src/store/sessionStore";
import useFormHandler from "@/src/hooks/useFormHandler";
import BaseUrl from "@/src/utils/baseUrl";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import Alert from "@/src/components/layout/Alert";
import { IoReturnDownBack } from "react-icons/io5";

const Login = () => {
  const router = useRouter();

  const [loadingButton, setLoadingButton] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [resetPassPage, setResetPassPage] = useState("identifier");
  const [buttonName, setButtonName] = useState("ادامه");

  const { clientId, token } = useSessionStore();

  // otp
  const [code, setCode] = useState("");
  const handleOtp = (code) => setCode(code);
  // otp

  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const { formData, handleChange, setFormData } = useFormHandler({
    username: "",
    name: "",
    identifier: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [inputError, setInputError] = useState({
    name: "",
    username: "",
    identifier: "",
    password: "",
    usernameCheck: "",
    identifierCheck: "",
    passwordCheck: "",
  });

  // login
  const login = async () => {
    try {
      const loginRes = await fetch(BaseUrl("/account/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
          appId: clientId,
          token: token,
        }),
      });
      const data = await loginRes.json();
      if (data.done) {
        setAlert({
          message: "ورود با موفقیت انجام شد! به حساب خود خوش آمدید.",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setAlert({
          message:
            "نام کاربری یا رمز عبور اشتباه است. لطفاً دوباره بررسی کنید.",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
        type: "error",
        visible: true,
      });
    }
  };
  // login

  // signup
  const signup = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "نام الزامی است";

    if (!formData.username.trim()) {
      errors.username = "نام کاربری الزامی است";
      errors.usernameCheck = "";
    }

    if (!formData.identifier.trim()) {
      errors.identifier = "ایمیل یا شماره موبایل الزامی است";
      errors.identifierCheck = "";
    }

    if (!formData.password.trim()) errors.password = "رمز عبور الزامی است";

    if (Object.keys(errors).length > 0) {
      setInputError((prev) => ({
        ...prev,
        ...errors,
      }));
      return;
    } else if (formData.password.length <= 8) {
      setInputError((prev) => ({
        ...prev,
        password: "رمز عبور باید حداقل ۹ کاراکتر باشد",
      }));
    } else {
      try {
        setLoadingButton(true);
        const signupRes = await fetch(BaseUrl("/account/sign-up"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
            username: formData.username,
            name: formData.name,
            identifier: formData.identifier,
            password: formData.password,
          }),
        });
        const data = await signupRes.json();
        console.log(data);
        if (data.done) {
          setAlert({
            message:
              "ثبت نام با موفقیت انجام شد! لطفاً کد OTP ارسال‌شده به ایمیل یا شماره موبایل خود را وارد کنید.",
            type: "success",
            visible: true,
          });
          setActiveTab("otp");
          setLoadingButton(false);
        }
      } catch (error) {
        setAlert({
          message: "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
          type: "error",
          visible: true,
        });
        console.error(error);
        setLoadingButton(false);
      }
    }
  };
  // signup

  // send otp
  const sendOtp = async () => {
    try {
      const signupRes = await fetch(BaseUrl("/account/verification/info"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          otp: code,
          appId: clientId,
          token: token,
        }),
      });
      const data = await signupRes.json();
      if (data.done) {
        router.push("/dashboard/companyprofilesetup");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // send otp

  useEffect(() => {
    if (formData.password.length > 8) {
      setInputError((prev) => ({
        ...prev,
        password: "",
        passwordCheck: false,
      }));
    }
  }, [formData.password]);

  // get Otp
  const getOtp = async () => {
    try {
      const getOtpRes = await fetch(BaseUrl("/account/otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          appId: clientId,
          token: token,
        }),
      });
      const data = await getOtpRes.json();
      if (data.done) {
        setResetPassPage("otp");
        setButtonName("ثبت");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // get Otp

  // reset pass
  const resetPass = async () => {
    // بررسی برابر بودن رمزهای عبور جدید
    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({
        message: "رمز عبور جدید و تکرار آن برابر نیستند!",
        type: "error",
        visible: true,
      });
      return;
    }

    // بررسی طول رمز عبور
    if (formData.newPassword.length < 8) {
      setAlert({
        message: "رمز عبور جدید باید حداقل ۸ کاراکتر باشد!",
        type: "error",
        visible: true,
      });
      return;
    }

    try {
      const resetPassRes = await fetch(BaseUrl("/account/password/reset"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          otp: code,
          new_password: formData.newPassword,
          appId: clientId,
          token: token,
        }),
      });
      const data = await resetPassRes.json();
    } catch (error) {
      console.error(error);
    }
  };
  // reset pass

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden p-4">
      {/* Background Shape */}
      <div className="absolute w-full max-w-[95vw] sm:max-w-[610px] h-[500px] sm:h-[690px] skew-3 rounded-[40px] sm:rounded-[90px] bg-[var(--orgin-color)] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Main Container */}
      <div className="w-full max-w-[95vw] sm:max-w-[600px] h-[550px] sm:h-[680px] rounded-[30px] sm:rounded-[80px] z-20 overflow-hidden relative">
        <div className="absolute inset-0 background-image-login2">
          <div className="w-full h-full z-50 bg-black/35 backdrop-blur-[30px] px-4 md:px-16 py-6 sm:py-8">
            <div className="w-full h-full flex flex-col gap-4 md:gap-8">
              {/* Header */}
              <div className="w-full border-b-[1px] border-gray-300/30 flex justify-center items-center py-3 sm:py-4">
                <span className="text-xl sm:text-2xl md:text-[40px] font-bold text-[var(--text-color)] text-center">
                  خوش آمدید
                </span>
              </div>

              {/* Tab Switcher */}
              <div className="w-full flex justify-center items-center">
                {activeTab == "forgot-password" ? (
                  ""
                ) : (
                  <div className="w-full max-w-[250px] h-fit bg-[var(--bg-color)] rounded-full flex p-1">
                    <div
                      className={`w-1/2 h-8 sm:h-10 md:h-12 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        activeTab === "login"
                          ? "bg-[var(--bg-color2)]"
                          : "bg-transparent"
                      }`}
                      onClick={() => {
                        setActiveTab("login");
                        setFormData({
                          identifier: "",
                          password: "",
                        });
                        setInputError({
                          name: "",
                          username: "",
                          identifier: "",
                          password: "",
                          usernameCheck: "",
                          identifierCheck: "",
                        });
                      }}
                    >
                      <span
                        className={`text-xs sm:text-[14px] md:text-[18px] transition-all duration-300 ${
                          activeTab === "login"
                            ? "!text-[var(--orgin-color)] font-bold"
                            : "text-[var(--text-color)]"
                        }`}
                      >
                        ورود
                      </span>
                    </div>

                    <div
                      className={`w-1/2 h-8 sm:h-10 md:h-12 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        activeTab === "register"
                          ? "bg-[var(--bg-color2)]"
                          : "bg-transparent"
                      }`}
                      onClick={() => {
                        setActiveTab("register");
                        setFormData({
                          username: "",
                          name: "",
                          identifier: "",
                          password: "",
                        });
                        setInputError({
                          name: "",
                          username: "",
                          identifier: "",
                          password: "",
                          usernameCheck: "",
                          identifierCheck: "",
                        });
                      }}
                    >
                      <span
                        className={`text-xs sm:text-[14px] md:text-[18px] transition-all duration-300 ${
                          activeTab === "register"
                            ? "!text-[var(--orgin-color)] font-bold"
                            : "text-[var(--text-color)]"
                        }`}
                      >
                        ثبت نام
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Content */}
              <div className="w-full flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === "login" && (
                  <form className="w-full h-full flex flex-col items-center justify-between gap-4 md:gap-6">
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        type="text"
                        placeholder="نام کاربری یا ایمیل یا شماره موبایل"
                        name="identifier"
                        onChange={handleChange}
                        value={formData.identifier}
                        icon={<FaUserCircle />}
                      />
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder={"پسورد"}
                        icon={<FaKey />}
                      />
                      <div className="w-full mt-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("forgot-password")}
                          className="text-[var(--orgin-color)] text-xs sm:text-sm cursor-pointer"
                        >
                          رمز عبور خود را فراموش کرده‌اید؟
                        </button>
                      </div>
                    </div>

                    <div className="w-full">
                      <Button
                        className={"h-12 sm:h-14"}
                        label={"ورود"}
                        onClick={(e) => {
                          e.preventDefault();
                          login();
                        }}
                      />
                    </div>
                  </form>
                )}
                {activeTab === "register" && (
                  <form className="w-full h-full flex flex-col items-center justify-between gap-2">
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        error={inputError.name}
                        type="text"
                        placeholder="نام"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        icon={<FaUserCircle />}
                      />
                      <Input
                        onBlur={async () => {
                          const value = formData.username.trim();
                          if (!value) {
                            return;
                          }

                          setInputError((prev) => ({
                            ...prev,
                            usernameCheck: "start",
                          }));

                          try {
                            const ReviewRes = await fetch(
                              BaseUrl("/account/username/validate"),
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  appId: clientId,
                                  token: token,
                                  type: "username",
                                  identifier: value,
                                }),
                              }
                            );

                            const data = await ReviewRes.json();
                            const available = data.data[0]?.Available;

                            if (available) {
                              if (
                                data.data[0].error ==
                                "It must be more than 5 characters."
                              ) {
                                setInputError((prev) => ({
                                  ...prev,
                                  username: "باید بیشتر از ۵ کاراکتر باشد.",
                                  usernameCheck: true,
                                }));
                              } else {
                                setInputError((prev) => ({
                                  ...prev,
                                  username:
                                    "این نام کاربری در سیستم موجود است. لطفاً یک نام کاربری جدید وارد کنید.",
                                  usernameCheck: true,
                                }));
                              }
                            } else {
                              setInputError((prev) => ({
                                ...prev,
                                username: "",
                                usernameCheck: false,
                              }));
                            }
                          } catch (err) {
                            console.error(err);
                            setInputError((prev) => ({
                              ...prev,
                              username: "خطایی در بررسی نام کاربری رخ داده است",
                              usernameCheck: true,
                            }));
                          }
                        }}
                        error={inputError.username}
                        loading={inputError.usernameCheck}
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="نام کاربری"
                        icon={<FaUser />}
                      />

                      <Input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        error={inputError.identifier}
                        loading={inputError.identifierCheck}
                        onBlur={async () => {
                          const value = formData.identifier.trim();
                          if (!value) {
                            return;
                          }

                          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            value
                          );
                          const isPhone = /^\d{10,15}$/.test(
                            value.replace(/\D/g, "")
                          );

                          if (!isEmail && !isPhone) {
                            setInputError((prev) => ({
                              ...prev,
                              identifier:
                                "فرمت شماره موبایل یا ایمیل معتبر نیست!",
                              identifierCheck: true,
                            }));
                            return;
                          }

                          setInputError((prev) => ({
                            ...prev,
                            identifier: "",
                            identifierCheck: "start",
                          }));

                          try {
                            const ReviewRes = await fetch(
                              BaseUrl("/account/username/validate"),
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  appId: clientId,
                                  token: token,
                                  type: isEmail ? "email" : "phone",
                                  identifier: value,
                                }),
                              }
                            );

                            const data = await ReviewRes.json();
                            const available = data.data[0]?.Available;

                            if (available) {
                              setInputError((prev) => ({
                                ...prev,
                                identifier: isEmail
                                  ? "این ایمیل در سیستم موجود است. لطفاً یک ایمیل جدید وارد کنید."
                                  : "این شماره موبایل در سیستم موجود است. لطفاً یک شماره جدید وارد کنید.",
                                identifierCheck: true,
                              }));
                            } else {
                              setInputError((prev) => ({
                                ...prev,
                                identifier: "",
                                identifierCheck: false,
                              }));
                            }
                          } catch (err) {
                            console.error(err);
                            setInputError((prev) => ({
                              ...prev,
                              identifier:
                                "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
                              identifierCheck: true,
                            }));
                          }
                        }}
                        placeholder="شماره موبایل یا ایمیل"
                        icon={<FaPhone />}
                      />

                      <Input
                        loading={inputError.passwordCheck}
                        error={inputError.password}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder={"پسورد"}
                        icon={<FaKey />}
                      />
                    </div>
                    <div className="w-full">
                      <Button
                        className={"h-12 sm:h-14"}
                        label={"ثبت نام"}
                        disabled={loadingButton}
                        icon={
                          loadingButton && (
                            <ImSpinner2
                              size={"1.2rem"}
                              className="animate-spin"
                            />
                          )
                        }
                        onClick={signup}
                      />
                    </div>
                  </form>
                )}
                {activeTab === "forgot-password" && (
                  <div className="w-full h-full">
                    {resetPassPage == "identifier" && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        className="w-full h-full flex flex-col items-center justify-between gap-6"
                      >
                        <div className="w-full h-full flex flex-col gap-4">
                          <Input
                            type="text"
                            placeholder="نام کاربری یا ایمیل یا شماره موبایل"
                            name="identifier"
                            onChange={handleChange}
                            value={formData.identifier}
                            icon={<FaUserCircle />}
                          />
                        </div>
                        <div className="w-full">
                          <Button
                            className={"h-12 sm:h-14"}
                            label={"ادامه"}
                            type={1}
                            onClick={() => {
                              getOtp();
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("login");
                            setFormData({
                              username: "",
                              name: "",
                              identifier: "",
                              password: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                          }}
                          className="text-[var(--orgin-color)] text-xs sm:text-sm cursor-pointer flex items-center gap-2"
                        >
                          بازگشت
                          <IoReturnDownBack size={"1.3rem"} />
                        </button>
                      </form>
                    )}
                    {resetPassPage == "otp" && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        className="w-full h-full flex flex-col items-center justify-between gap-6"
                      >
                        <div className="w-full h-full flex flex-col gap-4">
                          <span className="text-center text-sm sm:text-[18px] text-[var(--text-color)]">
                            «برای ادامه، لطفاً رمز یکبار مصرف ارسال‌شده به شماره
                            موبایل یا ایمیل خود را وارد کنید. این کد فقط برای
                            مدت محدودی معتبر است.»
                          </span>
                          <div
                            dir="ltr"
                            className="w-full h-full flex flex-col justify-center items-center gap-4"
                          >
                            <OtpInput
                              value={code}
                              onChange={handleOtp}
                              numInputs={6}
                              separator={
                                <span style={{ width: "8px" }}></span>
                              }
                              isInputNum={true}
                              shouldAutoFocus={true}
                              inputStyle={{
                                border: "1px solid transparent",
                                borderRadius: "8px",
                                width: "100%",
                                height: "50px",
                                fontSize: "12px",
                                color: "var(--text-color)",
                                fontWeight: "400",
                                caretColor: "blue",
                                background: "var(--input-bg)",
                              }}
                              focusStyle={{
                                border: "1px solid #CFD3DB",
                                outline: "none",
                              }}
                            />
                          </div>
                          <Input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            value={formData.newPassword}
                            placeholder={"رمز عبور جدید"}
                            icon={<FaKey />}
                          />
                          <Input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder={"تکرار رمز عبور جدید"}
                            icon={<FaKey />}
                          />
                        </div>
                        <div className="w-full">
                          <Button
                            className={"h-12 sm:h-14"}
                            label={"ثبت"}
                            type={1}
                            onClick={() => {
                              if (
                                formData.newPassword !==
                                formData.confirmPassword
                              ) {
                                setAlert({
                                  message:
                                    "رمز عبور جدید و تکرار آن برابر نیستند!",
                                  type: "error",
                                  visible: true,
                                });
                                return;
                              }
                              resetPass();
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("login");
                            setFormData({
                              username: "",
                              name: "",
                              identifier: "",
                              password: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                          }}
                          className="text-[var(--orgin-color)] text-xs sm:text-sm cursor-pointer flex items-center gap-2"
                        >
                          بازگشت
                          <IoReturnDownBack size={"1.3rem"} />
                        </button>
                      </form>
                    )}
                  </div>
                )}
                {activeTab === "otp" && (
                  <form className="w-full h-full flex flex-col items-center justify-between gap-6">
                    <span className="text-center text-sm sm:text-[18px] text-[var(--text-color)]">
                      «برای ادامه، لطفاً رمز یکبار مصرف ارسال‌شده به تلفن همراه
                      خود را وارد کنید. این کد فقط برای مدت محدودی معتبر است.»
                    </span>
                    <div
                      dir="ltr"
                      className="w-full h-full flex flex-col justify-center items-center gap-4"
                    >
                      <OtpInput
                        value={code}
                        onChange={handleOtp}
                        numInputs={6}
                        separator={<span style={{ width: "8px" }}></span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        inputStyle={{
                          border: "1px solid transparent",
                          borderRadius: "8px",
                          width: "100%",
                          height: "50px",
                          fontSize: "12px",
                          color: "var(--text-color)",
                          fontWeight: "400",
                          caretColor: "blue",
                          background: "var(--input-bg)",
                        }}
                        focusStyle={{
                          border: "1px solid #CFD3DB",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <Button
                        className={"h-12 sm:h-14"}
                        label={"ثبت"}
                        onClick={(e) => {
                          e.preventDefault();
                          sendOtp();
                        }}
                        type={1}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
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
};

export default Login;