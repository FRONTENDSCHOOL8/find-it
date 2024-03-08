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
  NotFound,
  MypageEdit,
  MypageEntry,
  MypageDelete,
} from '@/components/pages/index';
import Detail from '@/components/Detail/Detail';
import SearchFindDetail from '@/components/SearchDetail/pages/SearchFindDetail';
import SearchResult from '@/components/SearchResult/SearchResult';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/getlist" element={<GetList />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/searchfind" element={<SearchFindDetail />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/mypageentry" element={<MypageEntry />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypageedit" element={<MypageEdit />} />
          <Route path="/mypagedelete" element={<MypageDelete />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
