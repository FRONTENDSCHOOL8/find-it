import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Main,
  MyPage,
  Splash,
  SignIn,
  SignUp,
  Credit,
  Welcome,
  MypageEntry,
} from '@/components/pages/index';
import Detail from '@/components/Detail/Detail';

import SearchFindDetail from '@/components/SearchDetail/pages/SearchFindDetail';
import SearchLostDetail from './components/SearchDetail/pages/SearchLostDetail';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/mypageentry" element={<MypageEntry />} />

          <Route path="/searchfind" element={<SearchFindDetail />} />
          <Route path="/searchlost" element={<SearchLostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
