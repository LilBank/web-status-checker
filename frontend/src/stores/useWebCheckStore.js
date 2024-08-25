import { create } from "zustand";

const useWebCheckStore = create((set) => ({
  urls: [],
  webStatus: { status: [], up: 0, down: 0, total: 0 },
  duration: 0,
  setUrls: (urls) => set((state) => ({ ...state, urls: urls })),
  setWebStatus: (status) => set((state) => ({ ...state, webStatus: status })),
  setDuration: (duration) => set((state) => ({ ...state, duration: duration }))
}));

export default useWebCheckStore;
