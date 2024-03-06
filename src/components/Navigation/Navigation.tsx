import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = () => {
  //비회원은 마이페이지 대신 로그인 노출
  const loginUserData = localStorage.getItem('pocketbase_auth');

  return (
    <nav className="fixed bottom-0 left-1/2 flex h-80px w-375px -translate-x-1/2 transform items-center justify-center gap-25px rounded-tl-14px rounded-tr-14px bg-white shadow-md">
      <NavigationItem isHomeActive={false}></NavigationItem>
      <NavigationItem isBoxActive={false}>습득물</NavigationItem>
      <NavigationItem isLostActive={false}>분실물</NavigationItem>
      <NavigationItem isBoardActive={false}>자유게시판</NavigationItem>
      <NavigationItem isProfileActive={false}>
        {(loginUserData && '마이페이지') || '로그인'}
      </NavigationItem>
    </nav>
  );
};

export default Navigation;
