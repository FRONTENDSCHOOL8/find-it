import icon_next from '@/assets/icons/icon_next.svg';

const Notice = () => {
  return (
    <div className="px-30px pt-40px">
      <ul>
        <li className="pb-25px text-14px">
          <a href="/" className="flex justify-between">
            <span>[키워드] 관련 글을 확인해보세요.</span>
            <img src={icon_next} alt="관련 글 확인하기" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Notice;
