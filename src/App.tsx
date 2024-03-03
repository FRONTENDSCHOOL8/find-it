
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
