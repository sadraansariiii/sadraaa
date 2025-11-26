"use client";

import { create } from "zustand";

export const useSessionStore = create((set) => ({
  clientId: null,
  token: null,

  setClientId: (id) => set({ clientId: id }),
  setToken: (tok) => set({ token: tok }),
}));
