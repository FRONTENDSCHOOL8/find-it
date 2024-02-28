import Header from '../Header/Header';
import ItemBox from '../ItemBox/ItemBox';
import Navigation from '../Navigation/Navigation';

import icon_search from '@/assets/icons/icon_search_36.svg';
import icon_next from '@/assets/icons/icon_next_14.svg';
import icon_right from '@/assets/icons/icon_right.svg';

interface ProfileBoxProps {
  userName?: string;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ userName = '방문자' }) => {
  let profileName: string;
  if (userName.length > 5) {
    profileName = `${userName.slice(0, 4)}...`;
  } else {
    profileName = userName;
  }

  return (
    <div className="h-140px w-180px rounded-20px bg-skyblue-300 transition-all duration-300 hover:shadow-lg">
      <a href="/" className="block h-full p-5">
        <span className="text-17px">
          <b className="text-24px font-normal">{profileName}</b> 님 <br />
          안녕하세요!
        </span>
      </a>
    </div>
  );
};

const FindItemBox = () => {
  return (
    <div className="relative w-140px rounded-20px bg-gray-200 transition-all duration-300 hover:shadow-lg">
      <a href="/" className="block h-full p-5">
        <span className="text-20px">물품 찾기</span>
        <img
          src={icon_search}
          alt="물품 찾기"
          className="absolute bottom-5 right-5"
        />
      </a>
    </div>
  );
};

const ShortcutGetList = () => {
  return (
    <a href="/" className="flex pb-5px pl-10px pt-3">
      <span className="text-14px text-gray-700">주인을 찾아요!</span>
      <img src={icon_next} alt="습득물 페이지 바로가기" />
    </a>
  );
};

interface CommunityBoxProps {
  recentPost1?: string;
  recentPost2?: string;
  postTime1?: string;
  postTime2?: string;
}

const CommunityBox: React.FC<CommunityBoxProps> = ({
  recentPost1 = '최근 게시물이 없습니다.',
  recentPost2 = '최근 게시물이 없습니다.',
  postTime1 = '',
  postTime2 = '',
}) => {
  return (
    <a href="/" className="block">
      <div className="mb-5 flex h-140px w-335px flex-col gap-20px rounded-20px border border-black p-5 transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-20px">자유게시판</h1>
          <img src={icon_right} alt="자유게시판 바로가기" />
        </div>

        <div className="">
          <div className="flex items-center gap-2 pb-1">
            <span className="text-14px">{recentPost1}</span>
            <span className="text-10px text-gray-450">{postTime1}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-14px">{recentPost2}</span>
            <span className="text-10px text-gray-450">{postTime2}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

const Main = () => {
  return (
    <>
      <Header isShowLogo={true} />
      <div className="w-375px px-5">
        <div className="flex gap-4">
          <ProfileBox />
          <FindItemBox />
        </div>
        <ShortcutGetList />
        <ItemBox itemType="main" />
        <CommunityBox />
      </div>
      <Navigation />
    </>
  );
};

export default Main;
