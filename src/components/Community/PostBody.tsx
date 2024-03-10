import { pb } from '@/lib/api/getPbData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/utils/crud';
// import GetTimeDiff from '@/components/common/atom/GetTimeDiff';
// import getPbImgURL from '@/lib/utils/getPbImgURL';

// 포켓베이스 Auto cancellation 취소 명령어
pb.autoCancellation(false);

const PostBody = () => {
  const { id } = useParams();
  const [thisData, setThisData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const records = await getData('community', { filter: `id="${id}"` });
        setThisData(records[0]);
      } catch (error) {
        console.error('자유게시판 pb id 잡아서 데이터 뿌리기 통신 에러', error);
      }
    })();
  }, [id]);

  if (!thisData) return null;

  // 이미지 가져오기
  // 1. 게시르 id 의 닉네임을 가져오고
  // user 카테고리에서 닉네임이 해당하는ㄴ걸 filter로 차장서
  // 유저 아이디의 이미지를 가져온다

  //변수 재할당
  // const { title, content: bodyText, tag, nickname, created } = thisData;
  const { title, content: bodyText, tag } = thisData;

  // const userId = '유저아이디가필요한가';
  // const userAvatar = '이미지가져오는건따로';

  return (
    <div className="w-315px pt-30px">
      {/* <section className="flex gap-8px">
        <img
          src={getPbImgURL(userId, userAvatar)}
          alt="나의 프로필 사진"
          className="size-34px rounded-full"
        />
        <div className="flex flex-col gap-2px">
          <span>{nickname}</span>
          <GetTimeDiff createdAt={created} />
        </div>
      </section> */}
      <section className="flex flex-col">
        <h1 className="text-24px text-black">{title}</h1>
        <p className="w-full whitespace-normal pt-10px	text-14px leading-5	text-gray-700">
          {bodyText}
        </p>
        <span className="block pt-30px text-14px text-primary">#{tag}</span>
      </section>
    </div>
  );
};

export default PostBody;
