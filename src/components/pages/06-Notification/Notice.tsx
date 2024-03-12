import { pb } from '@/lib/utils/pb';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllData } from '@/lib/utils/getAPIData';
import { GetDetailData, JsonType } from '@/types/types';
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

      if (pocketData) {
        try {
          const userKeywordData: KeywordType = await pb
            .collection('users')
            .getOne(pocketData.model.id, {
              fields: 'keywords',
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            });
          setUserKeyword(userKeywordData);
        } catch (error) {
          console.error('Fail', error);
        }
      }
    };
    fetchUserKeyword();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userKeyword) {
        const keywordsArray = userKeyword.keywords.split(', ').filter((k) => k);
        const data = await getAllData({ numOfRows: 100 });

        const recentItemData = (data as JsonType).map(
          (item: GetDetailData) => `${item.fdPrdtNm}^${item.atcId}`
        );

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
    const interval = setInterval(fetchPosts, 3600000); // 3600000ms = 1시간
    return () => clearInterval(interval);
  }, [userKeyword]);

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

  return (
    <div className="w-375px px-30px pt-40px">
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
    </div>
  );
};

export default Notice;
