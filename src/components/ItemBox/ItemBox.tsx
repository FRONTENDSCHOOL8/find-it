import default_item from '@/assets/itembox/default_item.svg';

type itemTypeProps = {
  itemType: 'get' | 'lost' | 'main';
};

const ItemBox: React.FC<itemTypeProps> = ({ itemType }) => {
  return (
    <>
      {itemType === 'get' && (
        <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col items-start py-18px pl-20px">
            <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
              물품명
            </h1>
            <span className="rounded-full bg-primary px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-white">
              습득장소
            </span>

            <div className="mt-13px flex flex-col gap-1">
              <span className="text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                습득한 날
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
      )}

      {itemType === 'lost' && (
        <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:shadow-lg">
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
      )}

      {itemType === 'main' && (
        <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-primary transition-all duration-300 hover:shadow-lg">
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
      )}
    </>
  );
};

export default ItemBox;