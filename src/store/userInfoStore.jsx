"use client";

import { create } from "zustand";

export const useInfoStore = create((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
}));
