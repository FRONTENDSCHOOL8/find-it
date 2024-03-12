import { create } from 'zustand';
import { DetailData } from '@/types/types';

interface DetailDataStore {
  detail: DetailData | null;
  setDetail: (detail: DetailData) => void;
}

const useDetailDataStore = create<DetailDataStore>((set) => ({
  detail: null,
  setDetail: (detail) => set({ detail }),
}));

export default useDetailDataStore;
