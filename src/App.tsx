import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Main,
  MyPage,
  Splash,
  SignIn,
  SignUp,
  Credit,
  Notice,
  Welcome,
  GetList,
  GetDetail,
  LostDetail,
  LostList,
  NotFound,
  MypageEdit,
  MypageEntry,
  MypageDelete,
  Notification,
  PostList,
  PostDetail,
  SearchPost,
  CreatePost,
} from '@/components/pages/index';
import SearchFindDetail from '@/components/SearchDetail/pages/SearchFindDetail';
import SearchLostDetail from './components/SearchDetail/pages/SearchLostDetail';
import SearchFindResult from '@/components/SearchResult/SearchFindResult';
import SearchLostResult from './components/SearchResult/SearchLostResult';

const App = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const showSplashFromStorage = localStorage.getItem('showSplash');
    if (showSplashFromStorage === null) {
      // 로컬 스토리지에 값이 없으면 스플래시를 보이고, 값을 저장
      setShowSplash(true);
      localStorage.setItem('showSplash', 'true');
    } else {
      // 로컬 스토리지에 값이 있으면 스플래시를 보이지 않음
      setShowSplash(false);
    }
    // 스플래시 보이는 시간
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash ? (
        <Splash />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/getlist" element={<GetList />} />
            <Route path="/getlist/detail/:id" element={<GetDetail />} />
            <Route path="/lostlist" element={<LostList />} />
            <Route path="/lostlist/detail/:id" element={<LostDetail />} />
            <Route path="/searchfind" element={<SearchFindDetail />} />
            <Route path="/searchresult" element={<SearchFindResult />} />
            <Route path="/searchlost" element={<SearchLostDetail />} />
            <Route path="/searchlostresult" element={<SearchLostResult />} />
            <Route path="/mypageentry" element={<MypageEntry />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypageedit" element={<MypageEdit />} />
            <Route path="/mypagedelete" element={<MypageDelete />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postdetail/:id" element={<PostDetail />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/searchpost" element={<SearchPost />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
