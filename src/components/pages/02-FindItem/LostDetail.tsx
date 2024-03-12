import { useEffect } from 'react';
import Detail from '@/components/Detail/Detail';
import useDetailDataStore from '@/store/detail/useDetailDataStore';
import { lostSearchId } from '@/lib/utils/lostAPIData';

const GetDetail = () => {
  const setDetail = useDetailDataStore((state) => state.setDetail);
  const detail = useDetailDataStore((state) => state.detail);

  useEffect(() => {
    (async () => {
      const data = await lostSearchId('L2018120100000706');

      setDetail(data);
    })();
  }, []);

  return <>{detail && <Detail detail={detail} />}</>;
};

export default GetDetail;
