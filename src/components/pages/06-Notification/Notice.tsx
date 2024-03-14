import { pb } from '@/lib/utils/pb';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllData } from '@/lib/utils/getAPIData';
import { GetDetailData, JsonType } from '@/types/types';
import none_alarm from '@/assets/none_alarm.svg';
import icon_next from '@/assets/icons/icon_next.svg';
interface KeywordType {
  keywords: string;
}

interface RecommendationType {
  keyword: string;
  selectedItem: string;
}

const Notice = () => {
  const navigate = useNavigate();
  const [userKeyword, setUserKeyword] = useState<KeywordType | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    () => {
      const savedRecommendations = localStorage.getItem('recommendations');
      return savedRecommendations ? JSON.parse(savedRecommendations) : [];
    }
  );

  useEffect(() => {
    const fetchUserKeyword = async () => {
      const pocketAuth = localStorage.getItem('pocketbase_auth');
      const pocketData = pocketAuth ? JSON.parse(pocketAuth) : null;

      // 로그인 유저의 키워드 데이터 가져오기
      if (pocketAuth) {
        const userKeywordData: KeywordType = await pb
          .collection('users')
          .getOne(pocketData.model.id, {
            fields: 'keywords',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });
        setUserKeyword(userKeywordData);
      }
    };
    fetchUserKeyword();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      // 등록된 키워드가 있을 경우, 최근 습득물 데이터 가져오기
      if (userKeyword) {
        const keywordsArray = userKeyword.keywords.split(', ').filter((k) => k);
        const data = await getAllData({ numOfRows: 100 });

        // 최근 습득물 데이터 중 키워드와 일치하는 데이터 (물품명, ID) 추출
        const recentItemData = (data as JsonType).map(
          (item: GetDetailData) => `${item.fdPrdtNm}^${item.atcId}`
        );

        // 추출한 데이터 중 랜덤으로 추천하기
        const newRecommendations = keywordsArray
          .map((keyword) => {
            const filteredItems = recentItemData.filter((item) =>
              item.includes(keyword)
            );
            if (filteredItems.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * filteredItems.length
              );
              const selectedItem = filteredItems[randomIndex];
              return { keyword, selectedItem };
            }
            return null;
          })
          .filter((item) => item !== null);

        // 추천 데이터가 있을 경우, 로컬스토리지에 저장
        if (newRecommendations.length > 0) {
          setRecommendations((prevRecommendations) => {
            const updatedRecommendations = [
              ...prevRecommendations,
              ...newRecommendations,
            ];
            localStorage.setItem(
              'recommendations',
              JSON.stringify(updatedRecommendations)
            );
            return updatedRecommendations;
          });
        }
      }
    };
    fetchPosts();

    // 1시간마다 키워드 추천 알림
    const interval = setInterval(fetchPosts, 30000);
    return () => clearInterval(interval);
  }, [userKeyword]);

  // 추천 알림 클릭 -> 상세 페이지 이동 및 로컬 삭제
  const handleButton = (index: number) => {
    navigate(
      `/getlist/detail/${recommendations[index].selectedItem.split('^')[1]}`
    );

    const updatedRecommendations = recommendations.filter(
      (_, i) => i !== index
    );
    localStorage.setItem(
      'recommendations',
      JSON.stringify(updatedRecommendations)
    );
    setRecommendations(updatedRecommendations);
  };

  const noneAlarmImage = (
    <img
      src={none_alarm}
      alt="새로운 알림이 없습니다."
      className="mx-auto mt-90px"
    />
  );

  const alarmList = (
    <ul className="">
      {recommendations.map((recommendation, index) => (
        <li key={index} className="pb-25px text-14px">
          <button
            className="flex w-full justify-between"
            onClick={() => handleButton(index)}
          >
            <span>[{recommendation.keyword}] 관련 습득물을 확인해보세요</span>
            <img src={icon_next} alt="관련 글 확인하기" />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-375px px-30px pt-40px">
      {recommendations.length === 0 ? noneAlarmImage : alarmList}
    </div>
  );
};

export default Notice;
