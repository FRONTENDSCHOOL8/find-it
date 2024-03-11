import bookmark_icon from '@/assets/icons/icon_bookmark_detail.svg';
import bookmark_icon_fill from '@/assets/icons/icon_bookmark_detail_fill.svg';
import useBookmarkStore from '@/store/bookmark/bookmark';
import KakaoMap from '@/components/Detail/atom/KakaoMap';
import { DetailData } from '@/types/types';

const isEmpty = (value: string) => {
  return value.length !== 0;
};

interface DetailProps {
  detail: DetailData;
}

const Detail: React.FC<DetailProps> = ({ detail }) => {
  const bookmark = useBookmarkStore((state) => state.bookmark);

  const isBookmarked = (bookmark: boolean) => {
    if (bookmark) {
      return bookmark_icon_fill;
    }
    return bookmark_icon;
  };

  return (
    <div className="w-375px leading-[1.3]">
      <div className="flow-root h-250px w-full bg-slate-500">
        {isEmpty(detail.filePathImg) && (
          <img src={detail.filePathImg} alt="item_image" />
        )}
        <span className="mt-40px block text-center text-24px text-white">
          사진 자리
        </span>
      </div>
      <div className="relative">
        <form className="absolute right-30px top-2px">
          <label htmlFor="bookmark">
            <img
              src={isBookmarked(bookmark)}
              alt="bookmark"
              className="h-18px w-18px"
            />
          </label>
          <input
            type="checkbox"
            id="bookmark"
            hidden
            onChange={() => {
              useBookmarkStore.setState({ bookmark: !bookmark });
              console.log(bookmark);
            }}
          />
        </form>
        <ul className="mt-28px flex flex-col gap-8px px-30px text-12px">
          <li>
            <dl>
              <dt className="sr-only">물품명</dt>
              <dd className="text-20px">{detail.prdtNm}</dd>
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
              <dd>{detail.ymd}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>관리번호</dt>
              <dd className="text-gray-400">{detail.orgId}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt className="">물품분류</dt>
              <dd className="text-gray-400">{detail.prdtClNm}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>상세내용</dt>
              <dd className="mt-8px text-gray-400">{'asdf'}</dd>
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
              <dd>{detail.depPlace}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>전화번호</dt>
              <dd>{detail.tel}</dd>
            </dl>
          </li>
        </ul>
        <div className="mt-28px h-375px bg-slate-500 text-center text-24px text-white">
          <KakaoMap place={detail.depPlace} className="h-full w-full" />
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
