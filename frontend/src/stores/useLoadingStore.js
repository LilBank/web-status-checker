import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  progress: 0,
  filename: '',
  setProgress: (currentProgress) => set((state) => ({ ...state, progress: currentProgress })),
  setLoading: (currentStatus) => set((state) => ({ ...state, loading: currentStatus })),
  setFilename: (name) => set((state) => ({ ...state, filename: name })),
  clearLoading: () => set(() => ({ loading: false, progress: 0, filename: '' }))
}));

export default useLoadingStore;
