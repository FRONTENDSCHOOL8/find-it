import { create } from 'zustand';

interface SearchStoreState {
  resultData: null | object[];
  selectStartDate: string;
  setSelectStartDate: (date: string) => void;
  selectEndDate: string;
  setSelectEndDate: (date: string) => void;
  selectedMainCategoryValue: string;
  setSelectedMainCategoryValue: (value: string) => void;
  selectedSubCategoryValue: string;
  setSelectedSubCategoryValue: (value: string) => void;
  selectedAreaValue: string;
  setSelectedAreaValue: (value: string) => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
  resultData: null,
  setResultData: (data: object[] | null) => set({ resultData: data }),
  selectStartDate: '날짜를 선택하세요.',
  setSelectStartDate: (date) => set({ selectStartDate: date }),
  selectEndDate: '날짜를 선택하세요.',
  setSelectEndDate: (date) => set({ selectEndDate: date }),
  selectedMainCategoryValue: '',
  setSelectedMainCategoryValue: (value) =>
    set({ selectedMainCategoryValue: value }),
  selectedSubCategoryValue: '',
  setSelectedSubCategoryValue: (value) =>
    set({ selectedSubCategoryValue: value }),
  selectedAreaValue: '',
  setSelectedAreaValue: (value) => set({ selectedAreaValue: value }),
}));

export default useSearchStore;
