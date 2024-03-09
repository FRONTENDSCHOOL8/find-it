import { lostAllData } from '@/lib/utils/lostAPIData';
import { useEffect } from 'react';
import Header from '@/components/Header/Header';
import ItemBox from '@/components/ItemBox/ItemBox';
import Navigation from '@/components/Navigation/Navigation';

const LostList = () => {
  useEffect(() => {
    (async () => {
      const data = await lostAllData();

      console.log(data);
    })();
  }, []);

  return (
    <div className="min-h-667px w-375px bg-gray-200">
      <Header isShowSymbol={true} children="분실물 확인" isShowSearch={true} />
      <div className="h-[calc(100vh-73px-80px)] overflow-auto">
        <ul className="flex flex-col items-center">
          <li>
            <ItemBox itemType="lost" />
          </li>
        </ul>
      </div>
      <Navigation />
    </div>
  );
};

export default LostList;
