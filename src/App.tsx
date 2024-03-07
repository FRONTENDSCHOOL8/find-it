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
  MypageEntry,
} from '@/components/pages/index';
import Detail from '@/components/Detail/Detail';
import SearchFindDetail from '@/components/SearchDetail/pages/SearchFindDetail';
import SearchLostDetail from '@/components/SearchDetail/pages/SearchLostDetail';
import SearchResult from '@/components/SearchResult/SearchResult';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/searchfind" element={<SearchFindDetail />} />
          <Route path="/searchlost" element={<SearchLostDetail />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/mypageentry" element={<MypageEntry />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/credit" element={<Credit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
