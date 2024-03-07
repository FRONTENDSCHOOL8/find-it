import { useEffect } from 'react';
import Detail from '@/components/Detail/Detail';
import { getSearchId } from '@/lib/utils/getAPIData';

const GetDetail = () => {
  useEffect(() => {
    (async () => {
      const data = await getSearchId('F2024030600000059');

      console.log(data);
    })();
  });
  return <Detail />;
};

export default GetDetail;
