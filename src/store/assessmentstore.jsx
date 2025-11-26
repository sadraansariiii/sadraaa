"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAssessmentStore = create(
  persist(
    (set) => ({
      assessment: null,
      setAssessment: (info) => set({ assessment: info }),
    }),
    {
      name: "assessment-storage", // اسم key در sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
