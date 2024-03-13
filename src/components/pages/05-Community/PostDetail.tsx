import Header from '@/components/Header/Header';
import PostDetailBody from '@/components/Community/PostDetailBody';
import Horizon from '@/components/common/atom/Horizon';
import Navigation from '@/components/Navigation/Navigation';

const PostDetail = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header isShowPrev={true} children="자유게시판" empty={true} />
      <Horizon lineBold="thin" lineWidth="long" />
      <div className="w-375px">
        <div className="flex h-[calc(100vh-66px-80px)] w-full justify-center overflow-auto">
          <PostDetailBody />
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default PostDetail;
