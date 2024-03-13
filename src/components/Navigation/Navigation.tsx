import { useLocation } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation: React.FC = () => {
  const location = useLocation();
  //비회원은 마이페이지 대신 로그인 노출
  const loginUserData = localStorage.getItem('pocketbase_auth');
  const pathname = location.pathname;

  return (
    <nav
      style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.06)' }}
      className="fixed bottom-0 left-1/2 flex h-80px w-375px -translate-x-1/2 transform items-center justify-center gap-12px rounded-tl-16px rounded-tr-16px bg-white"
    >
      <NavigationItem isHomeActive={pathname === '/'}>찾아줘!</NavigationItem>
      <NavigationItem
        isBoxActive={
          pathname.startsWith('/getlist') ||
          pathname.startsWith('/searchfindresult')
        }
      >
        습득물
      </NavigationItem>
      <NavigationItem
        isLostActive={
          pathname.startsWith('/lostlist') ||
          pathname.startsWith('/searchlostresult')
        }
      >
        분실물
      </NavigationItem>
      <NavigationItem
        isBoardActive={
          pathname.startsWith('/postlist') ||
          pathname.startsWith('/postdetail') ||
          pathname.startsWith('/searchpost')
        }
      >
        자유게시판
      </NavigationItem>
      <NavigationItem isProfileActive={false}>
        {(loginUserData && '마이페이지') || '로그인'}
      </NavigationItem>
    </nav>
  );
};

export default Navigation;
