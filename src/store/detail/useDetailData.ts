import { create } from 'zustand';

interface DetailType {
  item_name: string;
  date: string;
  place: string;
  content: string;
  item_image: string;
  storage: string;
  phone: string;
  mgmt_num: string;
  item_type: string;
}

const useDetailDataStore = create((set) => ({
  data: {
    item_name: '종이가방',
    date: '2021-10-10',
    place: '피시방',
    content: '종이로 만든 가방입니다. 피시방에서 주움.',
    item_image: '',
    storage: '멋쟁이 사자처럼',
    phone: '010-1234-5678',
    mgmt_num: 'ff123456',
    item_type: '가방 > 종이가방',
  } as DetailType,
}));

export default useDetailDataStore;
