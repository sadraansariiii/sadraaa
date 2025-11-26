"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useContextStore = create(
  persist(
    (set) => ({
      contextCode: null,
      setContextCode: (id) => set({ contextCode: id }),
    }),
    {
      name: "context-storage", // کلید ذخیره در sessionStorage
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
