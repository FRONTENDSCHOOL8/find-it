import { useEffect } from 'react';
import Detail from '@/components/Detail/Detail';
import { getSearchId } from '@/lib/utils/getAPIData';
import useDetailDataStore from '@/store/detail/useDetailDataStore';

const GetDetail = () => {
  const setDetail = useDetailDataStore((state) => state.setDetail);
  const detail = useDetailDataStore((state) => state.detail);

  useEffect(() => {
    (async () => {
      const data = await getSearchId('F2024030600000059');

      setDetail(data);

      console.log(detail);
    })();
  }, []);

  return <>{detail && <Detail detail={detail} />}</>;
};

export default GetDetail;
