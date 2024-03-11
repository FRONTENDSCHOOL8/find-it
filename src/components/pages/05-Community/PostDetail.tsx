import Header from '@/components/Header/Header';
import PostBody from '@/components/Community/PostBody';
import Horizon from '@/components/common/atom/Horizon';
import Navigation from '@/components/Navigation/Navigation';

const PostDetail = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="자유게시판" empty={true} />
        <Horizon lineBold="thin" lineWidth="long" />

        <PostBody />
        <Navigation />
      </div>
    </>
  );
};

export default PostDetail;
