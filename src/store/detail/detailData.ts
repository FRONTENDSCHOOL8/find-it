import { create } from 'zustand';

interface LostItem {
  atcId: string;
  csteSteNm: string;
  depPlace: string;
  fdFilePathImg: string;
  fdHor: string;
  fdPlace: string;
  fdPrdtNm: string;
  fdSn: string;
  fdYmd: string;
  fndKeepOrgnSeNm: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
  uniq: string;
}

interface LostItemState {
  lostItem: LostItem[];
}

const useDetailDataStore = create<LostItemState>((set) => ({
  lostItem: [],
}));

export default useDetailDataStore;
