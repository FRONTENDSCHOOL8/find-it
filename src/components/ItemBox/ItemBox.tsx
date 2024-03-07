import default_item from '@/assets/itembox/default_item.svg';
import { useEffect, useState } from 'react';

type itemTypeProps = {
  itemType: 'get' | 'lost' | 'main';
  item: any;
};

interface GetItemType {
  item_name: string;
  date: string;
  storage: string;
  item_image: string;
}

const ItemBox: React.FC<itemTypeProps> = ({ itemType, item }) => {
  const [itemData, setItemData] = useState<GetItemType | null>(null);
  useEffect(() => {
    const newItem: GetItemType = {
      item_name: item.fdPrdtNm['#text'],
      date: item.fdYmd['#text'],
      storage: item.depPlace['#text'],
      item_image: item.fdFilePathImg['#text'],
    };
    setItemData(newItem);
  }, [item]);

  return (
    <div>
      {itemType === 'get' && itemData && (
        <a href="/" className="block">
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
                {itemData.item_name.length > 10
                  ? itemData.item_name.slice(0, 8) + '...'
                  : itemData.item_name}
              </h1>
              <span className="rounded-full bg-primary px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-white">
                {itemData.storage}
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                  습득날짜
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter">
                  {itemData.date}
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img
                src={
                  itemData.item_image ===
                  'https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif'
                    ? default_item
                    : itemData.item_image
                }
                alt="물품 사진"
                className="size-120px rounded-14px"
              />
            </div>
          </div>
        </a>
      )}

      {itemType === 'lost' && (
        <a href="/" className="block">
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
                물품명
              </h1>
              <span className="rounded-full border-[1px] border-primary px-3 py-3px text-10px font-medium leading-[1.3] tracking-tighter text-primary ">
                분실장소
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                  잃어버린 날
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter">
                  2024년 2월 26일
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img src={default_item} alt="등록된 물품 사진 없음" />
            </div>
          </div>
        </a>
      )}

      {itemType === 'main' && (
        <a href="/" className="block">
          <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-primary transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col items-start py-18px pl-20px">
              <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter text-white">
                물품명
              </h1>
              <span className="rounded-full bg-white px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-primary ">
                습득장소
              </span>

              <div className="mt-13px flex flex-col gap-1">
                <span className="text-12px font-medium leading-[1.3] tracking-tighter text-skyblue-400">
                  습득한 날
                </span>
                <span className="text-12px font-medium leading-[1.3] tracking-tighter text-white">
                  2024년 2월 26일
                </span>
              </div>
            </div>

            <div className="p-10px">
              <img src={default_item} alt="등록된 물품 사진 없음" />
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default ItemBox;
