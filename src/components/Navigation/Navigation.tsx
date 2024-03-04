import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 flex h-80px w-375px -translate-x-1/2 transform items-center justify-center gap-25px rounded-tl-14px rounded-tr-14px bg-white shadow-md">
      <NavigationItem isHomeActive={false}></NavigationItem>
      <NavigationItem isBoxActive={false}>습득물</NavigationItem>
      <NavigationItem isLostActive={false}>분실물</NavigationItem>
      <NavigationItem isBoardActive={false}>자유게시판</NavigationItem>
      <NavigationItem isProfileActive={false}>마이페이지</NavigationItem>
    </nav>
  );
};

export default Navigation;
