import { useLocation } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';

import icon_board_true from '@/assets/navigation/icon_board_true.svg';
import icon_board_false from '@/assets/navigation/icon_board_false.svg';
import icon_box_true from '@/assets/navigation/icon_box_true.svg';
import icon_box_false from '@/assets/navigation/icon_box_false.svg';
import icon_home_true from '@/assets/navigation/icon_home_true.svg';
import icon_home_false from '@/assets/navigation/icon_home_false.svg';
import icon_lost_true from '@/assets/navigation/icon_lost_true.svg';
import icon_lost_false from '@/assets/navigation/icon_lost_false.svg';
import icon_profile_true from '@/assets/navigation/icon_profile_true.svg';
import icon_profile_false from '@/assets/navigation/icon_profile_false.svg';

const Navigation: React.FC = () => {
  const location = useLocation();

  //비회원은 마이페이지 대신 로그인 노출
  const isLoggedIn = localStorage.getItem('pocketbase_auth');

  const pathname = location.pathname;

  const items = [
    {
      link: '/',
      trueIcon: icon_home_true,
      falseIcon: icon_home_false,
      children: '홈',
    },
    {
      link: '/getlist',
      trueIcon: icon_box_true,
      falseIcon: icon_box_false,
      children: '습득물',
    },
    {
      link: '/lostlist',
      trueIcon: icon_lost_true,
      falseIcon: icon_lost_false,
      children: '분실물',
    },
    {
      link: '/postlist',
      trueIcon: icon_board_true,
      falseIcon: icon_board_false,
      children: '자유게시판',
    },
    {
      link: isLoggedIn ? '/mypage' : '/signin',
      trueIcon: icon_profile_true,
      falseIcon: icon_profile_false,
      children: isLoggedIn ? '마이페이지' : '로그인',
    },
  ];

  return (
    <nav
      style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.06)' }}
      className="fixed bottom-0 left-1/2 flex h-80px w-375px -translate-x-1/2 transform items-center justify-center gap-12px rounded-tl-16px rounded-tr-16px bg-white"
    >
      {items.map((item, index) => (
        <NavigationItem
          key={index}
          isActive={pathname === item.link}
          trueIcon={item.trueIcon}
          falseIcon={item.falseIcon}
          link={item.link}
        >
          {item.children}
        </NavigationItem>
      ))}
    </nav>
  );
};

export default Navigation;
