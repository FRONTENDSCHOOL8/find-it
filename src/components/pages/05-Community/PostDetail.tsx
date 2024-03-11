import Header from '@/components/Header/Header';
import PostBody from '@/components/Community/PostBody';
import Horizon from '@/components/common/atom/Horizon';

const PostDetail = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="자유게시판" empty={true} />
        <Horizon lineBold="thin" lineWidth="long" />

        <PostBody />
      </div>
    </>
  );
};

export default PostDetail;
