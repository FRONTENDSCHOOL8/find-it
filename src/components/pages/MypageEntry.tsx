import MyPage from '@/components/pages/MyPage';
import SignIn from '@/components/pages/SignIn';

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
