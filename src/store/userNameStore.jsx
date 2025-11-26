"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useNameStore = create(
  persist(
    (set) => ({
      userName: null,
      setUserName: (info) => set({ userName: info }),
    }),
    {
      name: "username-store", // نام کلید داخل sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
