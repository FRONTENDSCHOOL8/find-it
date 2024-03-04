import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Main,
  MyPage,
  Splash,
  SignIn,
  SignUp,
  Credit,
} from '@/components/pages/index';
import Detail from '@/components/Detail/Detail';


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
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
