import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import default_item from '@/assets/itembox/default_item.svg';

type itemTypeProps = {
  itemType: 'get' | 'lost' | 'main';
  item?: {
    atcId: string;
    fdPrdtNm: string;
    lstPrdtNm: string;
    fdYmd: string;
    lstYmd: string;
    depPlace: string;
    lstPlace: string;
    fdFilePathImg: string;
  };
};
interface GetItemType {
  get_item_name: string;
  get_date: string;
  storage: string;
  get_item_image: string;
}

interface LostItemType {
  lost_item_name: string;
  lost_date: string;
  lost_place: string;
}

const ItemBox: React.FC<itemTypeProps> = ({ itemType, item }) => {
  const [getItemData, setGetItemData] = useState<GetItemType | null>(null);
  const [lostItemData, setLostItemData] = useState<LostItemType | null>(null);
  const navigate = useNavigate();

  const handleClickedItem = (id: string) => {
    itemType === 'get' && navigate(`/getlist/detail/${id}`);
    itemType === 'main' && navigate(`/getlist/detail/${id}`);
    itemType === 'lost' && navigate(`/lostlist/detail/${id}`);
  };

  useEffect(() => {
    if (
      item &&
      item.fdPrdtNm &&
      item.fdYmd &&
      item.depPlace &&
      item.fdFilePathImg
    ) {
      const newGetItem: GetItemType = {
        get_item_name: item.fdPrdtNm,
        get_date: item.fdYmd,
        storage: item.depPlace,
        get_item_image: item.fdFilePathImg,
      };
      setGetItemData(newGetItem);
    }
  }, [item]);

  useEffect(() => {
    if (item && item.lstPrdtNm && item.lstYmd && item.lstPlace) {
      const newLostItem: LostItemType = {
        lost_item_name: item.lstPrdtNm,
        lost_date: item.lstYmd,
        lost_place: item.lstPlace,
      };
      setLostItemData(newLostItem);
    }
  }, [item]);

  return (
    <div>
      {itemType === 'get' && getItemData && (
        <button className="block" onClick={() => handleClickedItem(item.atcId)}>
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
                {getItemData.get_item_name.length > 10
                  ? getItemData.get_item_name.slice(0, 8) + '...'
                  : getItemData.get_item_name}
              </h1>
              <span className="rounded-full bg-primary px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-white">
                {getItemData.storage}
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-start text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                  습득날짜
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter">
                  {getItemData.get_date}
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img
                src={
                  getItemData.get_item_image ===
                  'https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif'
                    ? default_item
                    : getItemData.get_item_image
                }
                alt="물품 사진"
                className="size-120px rounded-14px"
                loading="lazy"
              />
            </div>
          </div>
        </button>
      )}

      {itemType === 'lost' && lostItemData && (
        <button className="block" onClick={() => handleClickedItem(item.atcId)}>
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
                {lostItemData.lost_item_name.length > 10
                  ? lostItemData.lost_item_name.slice(0, 8) + '...'
                  : lostItemData.lost_item_name}
              </h1>
              <span className="rounded-full border-[1px] border-primary px-3 py-3px text-10px font-medium leading-[1.3] tracking-tighter text-primary ">
                {lostItemData.lost_place}
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-start text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                  분실날짜
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter">
                  {lostItemData.lost_date}
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img
                src={default_item}
                alt="등록된 사진이 없습니다."
                className="size-120px rounded-14px"
                loading="lazy"
              />
            </div>
          </div>
        </button>
      )}

      {itemType === 'main' && getItemData && (
        <button className="block" onClick={() => handleClickedItem(item.atcId)}>
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-primary transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter text-white">
                {getItemData.get_item_name.length > 10
                  ? getItemData.get_item_name.slice(0, 8) + '...'
                  : getItemData.get_item_name}
              </h1>
              <span className="rounded-full bg-white px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-primary ">
                {getItemData.storage}
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-start text-12px font-medium leading-[1.3] tracking-tighter text-skyblue-400">
                  습득날짜
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter text-white">
                  {getItemData.get_date}
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img
                src={
                  getItemData.get_item_image ===
                  'https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif'
                    ? default_item
                    : getItemData.get_item_image
                }
                alt="물품 사진"
                className="size-120px rounded-14px"
                loading="lazy"
              />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ItemBox;
