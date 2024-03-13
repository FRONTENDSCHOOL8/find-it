import KakaoMap from '@/components/Detail/atom/KakaoMap';
import { DetailData } from '@/types/types';

interface DetailProps {
  detail: DetailData;
}

const Detail: React.FC<DetailProps> = ({ detail }) => {
  return (
    <div className="w-full leading-[1.3]">
      <div className="flow-root">
        <img src={detail.image} alt="item_image" className="w-full" />
      </div>
      <div className="relative">
        <ul className="mt-28px flex flex-col gap-8px px-30px text-12px">
          <li>
            <dl>
              <dt className="sr-only">물품명</dt>
              <dd className="text-20px">{detail.item_name}</dd>
            </dl>
          </li>
          <li className="mt-20px">
            <dl className="flex gap-22px">
              <dt className="">습득장소</dt>
              <dd>{detail.place}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt className="">습득일자</dt>
              <dd>{detail.date}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>관리번호</dt>
              <dd className="text-gray-400">{detail.id}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt className="">물품분류</dt>
              <dd className="text-gray-400">{detail.item_type}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>상세내용</dt>
              <dd className="mt-8px text-gray-400">{detail.description}</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div className="mb-33px mt-28px h-10px border-t border-t-gray-300 bg-gray-200" />

      <div className="relative">
        <button
          type="button"
          className="absolute -top-4px right-30px rounded-full border border-primary px-12px py-4px text-10px text-primary"
        >
          전화하기
        </button>
        <ul className="flex flex-col gap-8px px-30px text-12px">
          <li>
            <dl className="flex gap-22px">
              <dt>보관장소</dt>
              <dd>{detail.storage}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>전화번호</dt>
              <dd>{detail.contact}</dd>
            </dl>
          </li>
        </ul>
        <div className="mt-28px h-375px bg-slate-500 text-center text-24px text-white">
          <KakaoMap place={detail.storage} className="h-full w-full" />
        </div>

        <button
          type="button"
          className="mx-auto mt-28px block rounded-20px border border-black px-128px py-16px"
        >
          공유하기
        </button>
      </div>
    </div>
  );
};

export default Detail;
