import { Link } from 'react-router-dom';
import { getData } from '@/lib/utils/crud';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';

// pb 데이터 뿌리기
const data = await getData('community', { sort: '-created' });

const PostBox = () => {
  return (
    <>
      {data.map((item, index) => (
        <div key={item.id} className="w-full">
          <Link to={`/postdetail/${item.id}`}>
            <section className="relative mx-auto my-0 h-160px w-335px bg-white px-10px pt-10px">
              {getTimeDiff({ createdAt: data[index].created })}
              <h1 className="truncate pt-8px text-16px text-black">
                {item.title}
              </h1>
              <span className="w-full	 whitespace-normal pt-8px text-12px text-gray-700">
                {(item.content.length > 64 &&
                  item.content.slice(0, 64) + '...') ||
                  item.content}
              </span>
              <span className="absolute bottom-14px block text-12px text-gray-450">
                #{item.tag}
              </span>
            </section>
          </Link>
          <div className="mx-auto my-0 h-10px w-full max-w-400px border-t border-t-gray-300 bg-gray-200" />
        </div>
      ))}
    </>
  );
};

export default PostBox;
