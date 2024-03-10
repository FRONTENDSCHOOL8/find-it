import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import PostBox from '@/components/Community/PostBox';
import IconPlus from '@/assets/icons/icon_plus.svg';

const PostList = () => {
  const loginUserData = localStorage.getItem('pocketbase_auth');

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowSymbol={true} children="자유게시판" isShowSearch={true} />

        <PostBox />
      </div>
      {loginUserData && (
        <Link to="/createpost">
          <img
            src={IconPlus}
            alt="글쓰기 버튼"
            className="absolute bottom-20px right-24px z-10 size-60px"
          />
        </Link>
      )}
    </>
  );
};

export default PostList;
