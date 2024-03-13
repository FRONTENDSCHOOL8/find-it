import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '@/components/Detail/Detail';
import { getSearchId } from '@/lib/utils/getAPIData';
import useDetailDataStore from '@/store/detail/useDetailDataStore';
import Header from '@/components/Header/Header';

const GetDetail = () => {
  const setDetail = useDetailDataStore((state) => state.setDetail);
  const detail = useDetailDataStore((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getSearchId(id);

      setDetail(data);
    })();
  }, [id, setDetail]);

  return (
    <div className="mx-auto w-375px">
      <Header children="습득물 상세정보" isShowPrev empty />
      {detail && <Detail detail={detail} />}
    </div>
  );
};

export default GetDetail;
