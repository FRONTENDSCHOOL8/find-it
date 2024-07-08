import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/utils/crud';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';
import getPbImgURL from '@/lib/utils/getPbImgURL';
import profile from '@/assets/profile.svg';

const PostDetailBody = () => {
  const { id } = useParams();
  const [thisData, setThisData] = useState(null);
  const [userId, setUserId] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const records = await getData('community', { filter: `id="${id}"` });
        setThisData(records[0]);

        if (records[0]) {
          const userRecords = await getData('users', {
            filter: `nickname="${records[0].nickname}"`,
          });

          const realData = userRecords && userRecords[0];
          setUserId(realData.id);
          setUserAvatar(realData.avatar);
        }
      } catch (error) {
        console.error('자유게시판 pb > id 검색 에러', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) return <div>로딩중...</div>;

  const { title, content: bodyText, tag, nickname, created } = thisData;

  return (
    <div className="w-315px">
      <section className="flex items-center gap-8px pt-20px">
        <img
          src={
            (userAvatar !== '' && getPbImgURL(userId, userAvatar)) || profile
          }
          alt="글쓴이 프로필 사진"
          className="size-34px rounded-full"
        />
        <div className="flex flex-col text-12px">
          <span className="text-14px">{nickname}</span>
          {getTimeDiff({ createdAt: created })}
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

export default PostDetailBody;
