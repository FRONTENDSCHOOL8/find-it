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
  CreatePost,
} from '@/components/pages/index';
import SearchFindDetail from '@/components/SearchDetail/pages/SearchFindDetail';
import SearchResult from '@/components/SearchResult/SearchResult';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/getlist" element={<GetList />} />
          <Route path="/getdetail" element={<GetDetail />} />
          <Route path="/lostdetail" element={<LostDetail />} />
          <Route path="/searchfind" element={<SearchFindDetail />} />
          <Route path="/searchresult" element={<SearchResult />} />
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
          <Route path="/splash" element={<Splash />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/lostlist" element={<LostList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
