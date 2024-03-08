import MyPage from '@/components/pages/04-MyPage/MyPage';
import SignIn from '@/components/pages/04-MyPage/SignIn';

const MypageEntry = () => {
  const loginUserData = localStorage.getItem('pocketbase_auth');

  return (
    <>
      {loginUserData && <MyPage />}
      {!loginUserData && <SignIn />}
    </>
  );
};

export default MypageEntry;
