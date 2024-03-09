import { useEffect, useState } from 'react';
import { getData } from '@/lib/utils/crud';
import GetTimeDiff from '@/components/common/atom/GetTimeDiff';

const Bar = (
  <div className=" h-10px w-full border-t border-t-gray-300 bg-gray-200" />
);

const PostBox = () => {
  const [communityData, setCommunityData] = useState([]);

  //pb 데이터 뿌리기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('community', { sort: '-created' });
        setCommunityData(data);
      } catch (error) {
        console.error('pb 통신 오류:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {communityData.map((item, index) => (
        <>
          <section
            className="relative h-160px w-335px px-10px pt-10px"
            key={index}
          >
            <GetTimeDiff createdAt={communityData[index].created} />
            <h1 className="truncate pt-8px text-16px text-black">
              {item.title}
            </h1>
            <span className="w-full	 whitespace-normal pt-8px text-12px		text-gray-700">
              {(item.content.length > 64 &&
                item.content.slice(0, 64) + '...') ||
                item.content}
            </span>
            <span className="absolute bottom-14px block text-12px text-gray-450">
              #{item.tag}
            </span>
          </section>
          {Bar}
        </>
      ))}
    </>
  );
};

export default PostBox;
