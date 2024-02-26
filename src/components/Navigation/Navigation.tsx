import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = () => {
  return (
    <nav className="rounded-tl-14px rounded-tr-14px flex h-80px w-375px items-center justify-center gap-25px bg-white shadow-md">
      <NavigationItem isHomeTrue={false}></NavigationItem>
      <NavigationItem isBoxTrue={false}>습득물</NavigationItem>
      <NavigationItem isLostTrue={false}>분실물</NavigationItem>
      <NavigationItem isBoardTrue={false}>자유게시판</NavigationItem>
      <NavigationItem isProfileTrue={false}>마이페이지</NavigationItem>
    </nav>
  );
};

export default Navigation;
