import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '@/components/Detail/Detail';
import useDetailDataStore from '@/store/detail/useDetailDataStore';
import { lostSearchId } from '@/lib/utils/lostAPIData';

const GetDetail = () => {
  const setDetail = useDetailDataStore((state) => state.setDetail);
  const detail = useDetailDataStore((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await lostSearchId(id as string);

      setDetail(data);
    })();
  }, []);

  return <>{detail && <Detail detail={detail} />}</>;
};

export default GetDetail;
