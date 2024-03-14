import { pb } from '@/lib/utils/pb';
import { useState, useEffect } from 'react';
import Horizon from '@/components/common/atom/Horizon';
import icon_delete from '@/assets/icons/icon_delete.svg';
import ModalComp from '@/components/common/molecule/ModalComp';

const pocketAuth = localStorage.getItem('pocketbase_auth');
const pocketData = pocketAuth ? JSON.parse(pocketAuth) : null;

interface KeywordType {
  keywords: string;
}

interface KeywordProps {
  keyword: string;
  onDelete: (keyword: string) => void;
}

const Keyword = ({ keyword, onDelete }: KeywordProps) => {
  return (
    <div id={keyword} className="relative">
      <div className="inline rounded-full border border-primary bg-white px-5 py-1 text-12px text-primary">
        {keyword}
      </div>
      <button
        className="absolute right-0 top-[-2px] size-3"
        onClick={() => onDelete(keyword)}
      >
        <img src={icon_delete} alt="등록된 키워드 삭제하기" />
      </button>
    </div>
  );
};

const Setting = () => {
  const [userKeyword, setUserKeyword] = useState<KeywordType>({ keywords: '' });
  const keywordsArray = userKeyword.keywords.split(', ').filter((k) => k);
  const [isCountModal, setIsCountModal] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const onClickConfirm = () => {
    setIsCountModal(false);
    setIsDuplicate(false);
  };

  useEffect(() => {
    (async () => {
      if (pocketData) {
        const userKeyword: KeywordType = await pb
          .collection('users')
          .getOne(pocketData.model.id, {
            fields: 'keywords',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });

        setUserKeyword(userKeyword);
      }
    })();
  }, []);

  const handleAddButton = async () => {
    const keywordInput = document.getElementById(
      'keywordInput'
    ) as HTMLInputElement;
    const newKeyword = keywordInput.value.trim();

    // 키워드 갯수 제한 모달
    if (keywordsArray.length >= 10) {
      setIsCountModal(true);
      keywordInput.value = '';
      return;
    }

    // 키워드 중복 제한 모달
    if (keywordsArray.includes(keywordInput.value)) {
      setIsDuplicate(true);
      keywordInput.value = '';
      return;
    }

    // pb에 키워드 업데이트
    if (newKeyword) {
      const updateKeyword = userKeyword.keywords
        ? `${userKeyword.keywords}, ${newKeyword}`
        : newKeyword;

      const data = {
        keywords: updateKeyword,
      };
      await pb.collection('users').update(pocketData.model.id, data);

      setUserKeyword({ keywords: updateKeyword });
      keywordInput.value = '';
    }
  };

  const handleClearButton = (keywordToDelete: string) => {
    const updatedKeywords = userKeyword.keywords
      .split(', ')
      .filter((keyword) => keyword !== keywordToDelete)
      .join(', ');

    setUserKeyword({ keywords: updatedKeywords });

    pb.collection('users').update(pocketData.model.id, {
      keywords: updatedKeywords,
    });

    // 로컬 스토리지에서 키워드 삭제
    localStorage.removeItem(keywordToDelete);
  };

  const noKeywordMessage = (
    <span className="w-full pt-5 text-center text-14px text-gray-450">
      등록된 키워드가 없습니다.
    </span>
  );

  return (
    <div className="flex flex-col items-center p-30px">
      <fieldset className="pb-30px">
        <legend className="hidden">검색 폼</legend>
        <div className="flex gap-3">
          <input
            id="keywordInput"
            type="text"
            placeholder="알림 받을 키워드를 입력해주세요."
            className="h-32px w-240px rounded-full border-[1px] border-gray-350 px-5 text-12px"
          />
          <button
            type="submit"
            className="w-63px rounded-full bg-primary px-5 py-7px text-12px text-white"
            onClick={handleAddButton}
          >
            추가
          </button>
        </div>
      </fieldset>

      <Horizon lineBold="thin" lineWidth="short" />

      <section className="w-375px p-5">
        <h1 className="pb-5 text-14px">키워드 관리</h1>
        <div className="flex flex-wrap gap-14px">
          {userKeyword.keywords === ''
            ? noKeywordMessage
            : keywordsArray.map((keyword, index) => (
                <Keyword
                  key={index}
                  keyword={keyword}
                  onDelete={handleClearButton}
                />
              ))}
        </div>
      </section>
      {isCountModal && (
        <ModalComp
          children="키워드는 최대 10개 등록 가능합니다."
          confirmText="확인"
          onClickConfirm={onClickConfirm}
        />
      )}
      {isDuplicate && (
        <ModalComp
          children="이미 등록된 키워드입니다."
          confirmText="확인"
          onClickConfirm={onClickConfirm}
        />
      )}
    </div>
  );
};

export default Setting;
