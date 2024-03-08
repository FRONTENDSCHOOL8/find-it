import { pb } from '@/lib/api/getPbData';
import Header from '@/components/Header/Header';
import GetTimeDiff from '@/components/common/atom/GetTimeDiff';
import getPbImgURL from '@/lib/utils/getPbImgURL';

const recentPost = await pb.collection('community').getList(1, 2, {
  sort: '-created',
  expand: 'title, created',
});
const postTime1 = recentPost.items[0].created;

const title = `pb 데이터 제쥐`;
const 본문 = `pb 데이터 본문입니다람쥐pb 데이터 본문입니다람쥐pb 데이터
          본문입니다람쥐 pb 데이터 본문입니다람쥐 pb 데이터 본문입니다람쥐 pb
          데이터 본문입니다람쥐 pb 데이터 본문입니다람쥐 pb 데이터
          본문입니다람쥐 pb 데이터 본문입니다람쥐`;
const hashTag = `해쉬태그`;

const userId = '1';
const userAvatar = 'fil.jpg';
const userNickname = '닉네임';

const Body = () => {
  return (
    <div className="w-315px pt-30px">
      <section className="flex gap-8px bg-gray-200">
        <img
          src={getPbImgURL(userId, userAvatar)}
          alt="나의 프로필 사진"
          className="size-34px rounded-full"
        />
        <div className="flex flex-col gap-2px">
          <span>{userNickname}</span>
          <GetTimeDiff createdAt={postTime1} />
        </div>
      </section>
      <section className="flex flex-col pt-30px">
        <h1 className="text-24px text-black">{title}</h1>
        <p className="w-full whitespace-normal pt-10px	text-14px leading-5	text-gray-700">
          {본문}
        </p>
        <span className="block pt-30px text-14px text-primary">#{hashTag}</span>
      </section>
    </div>
  );
};
const PostDetail = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="자유게시판" empty={true} />
        <Body />
      </div>
    </>
  );
};

export default PostDetail;
