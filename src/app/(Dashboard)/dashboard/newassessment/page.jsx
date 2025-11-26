"use client";

import BaseUrl from "@/src/utils/baseUrl";
import { useEffect, useState } from "react";
import Alert from "@/src/components/layout/Alert";
import { useSessionStore } from "@/src/store/sessionStore";
import Button from "@/src/components/ui/Button";
import useFormHandler from "@/src/hooks/useFormHandler";
import { useRouter } from "next/navigation";
import DashboardSection from "@/src/components/layout/dashboardSection";
import Updating from "@/src/components/pages/dashboard/Updating";
import AccessGuard from "@/src/components/AccessGuard";

const NewAssessment = () => {
  const { clientId, token } = useSessionStore();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const router = useRouter();
  const { formData, handleChange, setFormData } = useFormHandler({
    options: "",
  });
  const [contextList, setContextList] = useState(null);
  console.log(contextList);
  useEffect(() => {
    if (!clientId || !token) return;

    const getContextList = async () => {
      try {
        const contextListRes = await fetch(BaseUrl("/assessment/contextlist"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: clientId,
            token: token,
          }),
        });
        const data = await contextListRes.json();
        setContextList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getContextList();
  }, [clientId, token]);

  // create new Evaluation
  const newEvaluation = async () => {
    try {
      const newEvaluationRes = await fetch(BaseUrl("/assessment/new"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: clientId,
          token: token,
          context: formData.options,
        }),
      });
      const data = await newEvaluationRes.json();
      if (data.done) {
        setContextCode(data.data.AScode);
        setAlert({
          message: "«عملیات مورد نظر با موفقیت ثبت شد.»",
          type: "success",
          visible: true,
        });
        router.push("/dashboard/question");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccessGuard>
      <DashboardSection>
        <div className="w-full h-full flex flex-col justify-between gap-6">
          {contextList == null && <div className="w-full h-full" />}
          {contextList?.done == false && <Updating />}
          {contextList?.done == true && (
            <div className="w-full h-full flex flex-col justify-between gap-6">
              {/* هدر بخش */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-6 bg-[var(--orgin-color)] rounded-full"></div>
                  <h4 className="text-lg sm:text-xl font-bold text-[var(--text-color)]">
                    لیست گزینه‌ها
                  </h4>
                </div>

                {/* توضیحات */}
                <p className="text-sm text-gray-400 mb-4">
                  لطفاً یکی از گزینه‌های زیر را انتخاب کنید
                </p>

                {/* لیست گزینه‌ها با radio button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contextList &&
                    contextList?.data.map((data) => (
                      <label
                        key={data.id}
                        className={`
                        relative border-2 rounded-[10px] p-4 cursor-pointer transition-all duration-300 flex gap-4
                        ${
                          formData.options === data.id
                            ? "border-[var(--orgin-color)] bg-[var(--orgin-color)]/10 shadow-lg"
                            : "border-gray-300 hover:border-[var(--orgin-color)]/50 hover:bg-white/5"
                        }
                      `}
                      >
                        <input
                          type="radio"
                          name="options"
                          value={data.id}
                          checked={formData.options === data.id}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              options: e.target.value,
                            }));
                          }}
                          className="radio-custom"
                        />
                        <span className="text-[var(--text-color)]">
                          {data.title}
                        </span>
                      </label>
                    ))}
                </div>
              </div>

              {/* دکمه‌های اقدام */}
              <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  disabled={!formData.options}
                  type={1}
                  label={"شروع"}
                  onClick={newEvaluation}
                  className="flex-1 sm:flex-none"
                />
                <Button
                  type={3}
                  label={"بازگشت"}
                  onClick={() => {
                    setChangePage("list");
                    setFormData({ options: "" });
                  }}
                  className="flex-1 sm:flex-none"
                />
              </div>
            </div>
          )}
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
      </DashboardSection>
    </AccessGuard>
  );
};

export default NewAssessment;
