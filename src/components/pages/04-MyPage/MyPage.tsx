import { useEffect, useState } from 'react';
import { pb } from '@/lib/api/getPbData';
import { Link, useLocation } from 'react-router-dom';

import profile from '@/assets/profile.svg';
import icon_pencil from '@/assets/icons/icon_pencil.svg';
import icon_bookmark from '@/assets/icons/icon_bookmark.svg';
import icon_docs from '@/assets/icons/icon_docs.svg';
import icon_envelope from '@/assets/icons/icon_envelope.svg';
import icon_search from '@/assets/icons/icon_search_16.svg';
import icon_bell from '@/assets/icons/icon_bell.svg';
import Horizon from '../../common/atom/Horizon';
import getPbImgURL from '@/lib/utils/getPbImgURL';
import Header from '../../Header/Header';

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      showWidget: () => void;
    };
  }
}

/* -------------------------------------------------------------------------- */
// 로그인 유저 정보 가져오기
const loginUserData = localStorage.getItem('pocketbase_auth');
const localData = loginUserData && JSON.parse(loginUserData);
const userNickname = localData?.model?.nickname;
const userEmail = localData?.model?.email;
const userId = localData?.model?.id;
const userAvatar = localData?.model?.avatar;

// 로그아웃 기능
const handleLogout = () => {
  pb.authStore.clear();
  window.location.href = '/';
};
/* -------------------------------------------------------------------------- */
// 마이페이지 마크업
const Profile = () => {
  return (
    <section className="my-30px flex items-center gap-4">
      <img
        src={userAvatar !== '' ? getPbImgURL(userId, userAvatar) : profile}
        alt="나의 프로필 사진"
        className="size-66px rounded-full"
      />
      <div className="flex flex-col gap-6px">
        <div className="flex items-center gap-4px">
          <h1 className="text-20px">{userNickname}</h1>
          <Link
            to="/mypageedit"
            className="p-1.5 transition-all duration-300 hover:rounded hover:bg-gray-100"
          >
            <img src={icon_pencil} alt="프로필 수정하기" />
          </Link>
        </div>
        <span className="text-12px text-gray-450">{userEmail}</span>
      </div>
    </section>
  );
};

const List01 = () => {
  const [inboxAlert] = useState(false);

  return (
    <section className="pb-26px">
      <ul className="flex flex-col gap-10px">
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a href="/" className="flex gap-10px py-4px">
            <img src={icon_bookmark} alt="북마크 관리하기" />
            <span>북마크 관리</span>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a href="/" className="flex gap-10px py-4px">
            <img src={icon_docs} alt="게시글 관리하기" />
            <span>게시글 관리</span>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a href="/" className="flex gap-10px py-4px">
            <img src={icon_envelope} alt="받은 쪽지함 보기" />
            <span className="flex gap-3px">
              받은 쪽지함
              <p
                className={`${inboxAlert ? 'h-7px w-7px rounded-full bg-primary' : ''} `}
              >
                &nbsp;
              </p>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
};

const List02 = () => {
  const [keywordAlert] = useState(false);

  return (
    <section className="py-26px">
      <ul className="flex flex-col gap-10px">
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a href="/" className="flex gap-10px py-4px">
            <img src={icon_search} alt="검색 범위 설정하기" />
            <span>검색 범위 설정</span>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a href="/notification" className="flex gap-10px py-4px">
            <img src={icon_bell} alt="키워드 알림 보기" />
            <span className="flex gap-3px">
              키워드 알림
              <p
                className={`${keywordAlert ? 'h-7px w-7px rounded-full bg-primary' : ''} `}
              >
                &nbsp;
              </p>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
};

const Menu = () => {
  return (
    <ul className="flex flex-col gap-8px py-26px">
      <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
        <Link to="/notice" className="flex items-center py-1">
          <span className="text-12px text-gray-500">공지사항</span>
        </Link>
      </li>
      <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
        <Link to="/credit" className="flex items-center py-1">
          <span className="text-12px text-gray-500">만든 사람들</span>
        </Link>
      </li>
      <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
        <button
          className="flex items-center py-1 text-12px text-gray-500"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </li>
    </ul>
  );
};

const MyPage = () => {
  const location = useLocation();
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/65eeb6d69131ed19d977bab0/1hom7kdu6';
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    const hideTawkToWidget = () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };

    const showTawkToWidget = () => {
      if (window.Tawk_API) {
        window.Tawk_API.showWidget();
      }
    };

    if (location.pathname !== '/mypageentry') {
      hideTawkToWidget();
    } else {
      showTawkToWidget();
    }

    return hideTawkToWidget;
  }, [location]);

  return (
    <div className="flex w-full min-w-375px flex-col items-center">
      <Header isShowPrev={true} children="마이페이지" empty={true} />
      <div className="px-30px">
        <Profile />
        <List01 />
        <Horizon lineBold="thin" lineWidth="short" />
        <List02 />
        <Horizon lineBold="thin" lineWidth="short" />
        <Menu />
      </div>
    </div>
  );
};

export default MyPage;
