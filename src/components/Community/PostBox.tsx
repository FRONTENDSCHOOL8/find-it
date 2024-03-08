import { pb } from '@/lib/api/getPbData';
import GetTimeDiff from '@/components/common/atom/GetTimeDiff';

// const recentPost = await pb.collection('community').getList(1, 2, {
//   sort: '-created',
//   expand: 'title, created',
// });
// const postTime1 = recentPost.items[0].created;

const title = `pb 데이터 제쥐`;
const 본문 = `pb 데이터 본문입니다람쥐pb 데이터 본문입니다람쥐pb 데이터본문입니다람쥐 pb 데이터 본문입니다람쥐 pb 데이터 본문입니다람쥐 pb
          데이터 본문입니다람쥐 pb 데이터 본문입니다람쥐 pb 데이터
          본문입니다람쥐 pb 데이터 본문입니다람쥐`;
const hashTag = `해쉬태그`;
const trimTitme = (title.length > 12 && title.slice(0, 12) + '...') || title;
const trimBodyText = (본문.length > 64 && 본문.slice(0, 64) + '...') || 본문;

const Bar = (
  <div className=" h-10px w-full border-t border-t-gray-300 bg-gray-200" />
);

const PostBox = () => {
  return (
    <>
      <section className="h-150px w-335px px-8px">
        {/* <GetTimeDiff createdAt={postTime1} /> */}
        <h1 className="pt-8px text-16px text-black">{trimTitme}</h1>
        <span className="w-full whitespace-normal pt-8px	text-12px	text-gray-700">
          {trimBodyText}
        </span>
        <span className="block pt-10px text-12px text-gray-450">
          #{hashTag}
        </span>
      </section>
      {Bar}
    </>
  );
};

export default PostBox;
