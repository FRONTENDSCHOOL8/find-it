import { pb } from '@/lib/api/getPbData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/utils/crud';
import getPbImgURL from '@/lib/utils/getPbImgURL';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';
import profile from '@/assets/profile.svg';
import Horizon from '@/components/common/atom/Horizon';

// 포켓베이스 Auto cancellation 취소 명령어
pb.autoCancellation(false);

const PostBody = () => {
  const { id } = useParams();
  const [thisData, setThisData] = useState(null);
  const [userId, setUserId] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

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
  const { title, content: bodyText, tag, nickname, created } = thisData;

  // 커뮤니티 닉네임으로 유저에서 id, avartar 뽑기
  (async () => {
    try {
      const records = await getData('users', {
        filter: `nickname="${nickname}"`,
      });
      const realdata = records && records[0];
      setUserId(realdata.id);
      setUserAvatar(realdata.avatar);
    } catch (error) {
      console.error('유저 데이터에서 닉네임 잡기 통신 에러', error);
    }
  })();

  return (
    <div className="w-315px">
      <Horizon lineBold="thin" lineWidth="short" />

      <section className="itmes-center flex gap-8px pt-20px">
        <img
          src={
            (userAvatar !== '' && getPbImgURL(userId, userAvatar)) || profile
          }
          alt="글쓴이 프로필 사진"
          className="size-34px rounded-full"
        />
        <div className="flex flex-col text-12px">
          <span className="text-14px">{nickname}</span>
          {getTimeDiff(created)}
        </div>
      </section>

      <section className="flex flex-col pt-18px">
        <h1 className="text-24px tracking-tight text-black">{title}</h1>
        <p className="w-full	whitespace-normal break-keep pt-10px	text-16px leading-28px tracking-tight	text-gray-700">
          {bodyText}
        </p>
        <span className="block pt-30px text-14px tracking-tight text-primary">
          #{tag}
        </span>
      </section>
    </div>
  );
};

export default PostBody;
