import icon_search from '@/assets/icons/icon_search_36.svg';
import icon_next from '@/assets/icons/icon_next_14.svg';
import icon_right from '@/assets/icons/icon_right.svg';

const Main = () => {
  return (
    <div className="w-375px px-5">
      <div className="flex gap-4">
        <div className="h-140px w-180px rounded-20px bg-skyblue-300">
          <a href="/" className="block h-full p-5">
            <span className="text-17px">
              <b className="text-24px font-normal">방문자</b> 님 <br />
              안녕하세요!
            </span>
          </a>
        </div>

        <div className="relative w-140px rounded-20px bg-gray-200">
          <a href="/" className="block h-full p-5">
            <span className="text-20px">물품 찾기</span>
            <img
              src={icon_search}
              alt="물품 찾기"
              className="absolute bottom-5 right-5"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
