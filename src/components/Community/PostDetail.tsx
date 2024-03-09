import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import GetTimeDiff from '@/components/common/atom/GetTimeDiff';
import getPbImgURL from '@/lib/utils/getPbImgURL';

// 프롭스로 받은 id로 데이터 가져오기
const Body = () => {
  const { id } = useParams();
  const [thisData, setThisData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const records = await getData('community', { filter: `id="${id}"` });
        setThisData(records[0]);
      } catch (error) {
        console.error('pb id잡아서 상세페이지 뿌리기 통신 에러', error);
      }
    })();
  }, [id]);

  if (!thisData) return null;

  //변수 재할당
  const { title, content: bodyText, tag, nickname, created } = thisData;

  const userId = '유저아이디가필요한가';
  const userAvatar = '이미지가져오는건따로';

  return (
    <div className="w-315px pt-30px">
      <section className="flex gap-8px bg-gray-200">
        <img
          src={getPbImgURL(userId, userAvatar)}
          alt="나의 프로필 사진"
          className="size-34px rounded-full"
        />
        <div className="flex flex-col gap-2px">
          <span>{nickname}</span>
          <GetTimeDiff createdAt={created} />
        </div>
      </section>
      <section className="flex flex-col pt-30px">
        <h1 className="text-24px text-black">{title}</h1>
        <p className="w-full whitespace-normal pt-10px	text-14px leading-5	text-gray-700">
          {bodyText}
        </p>
        <span className="block pt-30px text-14px text-primary">#{tag}</span>
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
