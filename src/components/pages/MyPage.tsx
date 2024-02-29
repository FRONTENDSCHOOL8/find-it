import { useState } from 'react';

import profile from '@/assets/profile.svg';
import icon_pencil from '@/assets/icons/icon_pencil.svg';
import icon_bookmark from '@/assets/icons/icon_bookmark.svg';
import icon_docs from '@/assets/icons/icon_docs.svg';
import icon_envelope from '@/assets/icons/icon_envelope.svg';
import icon_search from '@/assets/icons/icon_search_16.svg';
import icon_bell from '@/assets/icons/icon_bell.svg';
import Horizon from '../common/atom/Horizon';

const Profile = () => {
  return (
    <section className="my-50px flex items-center gap-3">
      <img
        src={profile}
        alt="나의 프로필 사진"
        className="size-66px rounded-full"
      />
      <div className="flex flex-col gap-6px">
        <div className="flex items-center gap-10px">
          <h1 className="text-20px">세븐일레븐</h1>
          <a
            href="/"
            className="p-1.5 transition-all duration-300 hover:rounded hover:bg-gray-100"
          >
            <img src={icon_pencil} alt="프로필 수정하기" />
          </a>
        </div>
        <span className="text-12px text-gray-450">seven@eleven.com</span>
      </div>
    </section>
  );
};

const List01 = () => {
  const [inboxAlert, setInBoxAlert] = useState(true);

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
  const [keywordAlert, setKeywordAlert] = useState(true);

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
          <a href="/" className="flex gap-10px py-4px">
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
        <a href="/" className="flex items-center py-1">
          <span className="text-12px text-gray-500">
            공지사항 & 사이트 문의
          </span>
        </a>
      </li>
      <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
        <a href="/" className="flex items-center py-1">
          <span className="text-12px text-gray-500">만든 사람들</span>
        </a>
      </li>
    </ul>
  );
};

const MyPage = () => {
  return (
    <div className="w-375px px-30px">
      <Profile />
      <List01 />
      <Horizon lineBold="thin" lineWidth="short" />
      <List02 />
      <Horizon lineBold="thin" lineWidth="short" />
      <Menu />
    </div>
  );
};

export default MyPage;
