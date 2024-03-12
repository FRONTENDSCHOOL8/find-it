import Header from '@/components/Header/Header';
import NoticeItem from '@/components/Notice/NoticeItem';

const Notice = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Header isShowPrev={true} children="공지사항" empty={true} />
        <ul className="mx-auto my-0 flex w-315px flex-col">
          <NoticeItem
            title="찾아줘! 서비스가 오픈했습니다."
            date="2023.3.15"
            bodytext="안녕하세요, 분실물 검색 서비스 찾아줘!가 오픈했습니다. 많은 사랑 부탁드립니다."
          />

          <NoticeItem
            title="찾아줘! 삼일절 이벤트"
            date="2023.3.1"
            bodytext={`3.1절, 대한독립 만세! 우리는 독립운동가들의 피와 희생에 감사를 표합니다. 자유와 독립을 위한 투쟁은 우리의 자랑스러운 역사이며, 오늘날 우리는 그들의 희생을 기리며 함께 나아갑니다. 자유와 평화의 길을 함께 걸어가며 우리의 미래를 밝게 이끌어 나갑시다!`}
          />
          <NoticeItem
            title="점심 메뉴 공지입니다."
            date="2023.2.31"
            bodytext="짜장이냐, 짬뽕이냐, 그것이 문제입니다."
          />
        </ul>
      </div>
    </>
  );
};

export default Notice;
