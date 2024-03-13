import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import PostBox from '@/components/Community/PostBox';
import IconPlus from '@/assets/icons/icon_plus.svg';
import Navigation from '@/components/Navigation/Navigation';
import Horizon from '@/components/common/atom/Horizon';

const PostList = () => {
  const loginUserData = localStorage.getItem('pocketbase_auth');

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header
        isShowSymbol={true}
        children="자유게시판"
        isShowSearch={true}
        link="/searchpost"
      />
      <Horizon lineBold="bold" lineWidth="long" />
      <div className="relative w-375px">
        <div className="h-[calc(100vh-66px-80px)] overflow-auto">
          <PostBox />
        </div>
        {loginUserData && (
          <Link to="/createpost">
            <img
              src={IconPlus}
              alt="글쓰기 버튼"
              className="absolute bottom-18px right-30px z-10 size-60px drop-shadow-xl hover:animate-bounce	 "
            />
          </Link>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default PostList;
