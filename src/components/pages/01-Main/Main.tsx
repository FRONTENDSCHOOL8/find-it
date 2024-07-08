import { pb } from '@/lib/utils/pb';
import { Link } from 'react-router-dom';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';
import Header from '../../Header/Header';
import Shortcut from '../../Shortcut/Shortcut';
import SwiperItem from '../../ItemBox/SwiperItem';
import Navigation from '../../Navigation/Navigation';
import icon_right from '@/assets/icons/icon_right.svg';
import icon_search from '@/assets/icons/icon_search_36.svg';

/* -------------------------------------------------------------------------- */
/*                                  유저 이름 렌더링                              */
/* -------------------------------------------------------------------------- */

// 로그인시 로컬 스토리지에 저장된 유저 닉네임 가져오기
const loginUserData = localStorage.getItem('pocketbase_auth');
const localData = loginUserData && JSON.parse(loginUserData);
const userNickname = localData?.model?.nickname;

// 타입 지정
interface ProfileBoxProps {
  userName?: string;
}

// 프로필 영역
const ProfileBox: React.FC<ProfileBoxProps> = ({
  userName = userNickname || '방문자',
}) => {
  let profileName: string;
  if (userNickname?.length > 5) {
    profileName = `${userName.slice(0, 4)}...`;
  } else {
    profileName = userName;
  }

  return (
    <div className="h-140px w-180px rounded-20px bg-skyblue-300 transition-all duration-300 hover:shadow-lg">
      <Link
        to="/mypageentry"
        style={{ display: 'block', height: '100%', padding: '20px' }}
      >
        <span style={{ fontSize: '17px' }}>
          <b style={{ fontSize: '24px', fontWeight: 'normal' }}>
            {profileName}
          </b>{' '}
          님 <br />
          안녕하세요!
        </span>
      </Link>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 물품 찾기 박스                                */
/* -------------------------------------------------------------------------- */
const FindItemBox = () => {
  return (
    <div className="relative w-140px rounded-20px bg-gray-200 transition-all duration-300 hover:shadow-lg">
      <Link to="/searchfind" className="block h-full p-5">
        <span className="text-20px">물품 찾기</span>
        <img
          src={icon_search}
          alt="돋보기 아이콘"
          className="absolute bottom-5 right-5"
        />
      </Link>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                             자유게시판 최근 게시물 렌더링                             */
/* -------------------------------------------------------------------------- */

const recentPost = await pb.collection('community').getList(1, 2, {
  sort: '-created',
  expand: 'title, created',
});
const recentPost1 = recentPost.items[0].title;
const recentPost2 = recentPost.items[1].title;
const postTime1 = recentPost.items[0].created;
const postTime2 = recentPost.items[1].created;

const CommunityBox = () => {
  return (
    <Link to="/postlist" className="block">
      <div className="mb-5 flex h-140px w-335px flex-col gap-20px rounded-20px border border-black p-5 transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-20px">자유게시판</h1>
          <img src={icon_right} alt="자유게시판 바로가기" />
        </div>
        <div className="">
          <div className="flex items-center gap-2 pb-1">
            <span className="text-14px">{recentPost1}</span>
            {getTimeDiff({ createdAt: postTime1 })}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-14px">{recentPost2}</span>
            {getTimeDiff({ createdAt: postTime2 })}
          </div>
        </div>
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/*                                메인페이지 렌더링                               */
/* -------------------------------------------------------------------------- */
const Main = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Header isShowLogo={true} />
        <div className="w-375px px-5">
          <div className="flex gap-4">
            <ProfileBox />
            <FindItemBox />
          </div>
          <div className="pb-5px pl-10px pt-3">
            <Shortcut
              link="/getlist"
              text="주인을 찾아요!"
              alt="습득물 페이지 바로가기"
            />
          </div>
          <SwiperItem />
          <CommunityBox />
        </div>
        <Navigation />
      </div>
    </>
  );
};

export default Main;
