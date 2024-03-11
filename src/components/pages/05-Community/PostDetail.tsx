import Header from '@/components/Header/Header';
import PostBody from '@/components/Community/PostBody';

const PostDetail = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="자유게시판" empty={true} />
        <PostBody />
      </div>
    </>
  );
};

export default PostDetail;
