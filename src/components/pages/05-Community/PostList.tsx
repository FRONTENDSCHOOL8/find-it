import Header from '@/components/Header/Header';
import PostBox from '@/components/Community/PostBox';

const PostList = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header
        isShowSymbol={true}
        children="자유게시판 찾기"
        isShowSearch={true}
      />
      <PostBox />
    </div>
  );
};

export default PostList;
