import SwiperCore from 'swiper';
import { useQuery } from '@tanstack/react-query';
import ItemBox from './ItemBox';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllData } from '@/lib/utils/getAPIData';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '@/tailwind.css';
import Skeleton from './Skeleton';

SwiperCore.use([Autoplay, Pagination, Keyboard]);

const SwiperItem: React.FC = () => {
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { data: items, isLoading } = useQuery({
    queryKey: ['swiperItems'],
    queryFn: async () => await getAllData({ pageNo: 1, numOfRows: 3 }),
  });

  // console.log('data');
  // console.log(data);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     const data = await getAllData({
  //       pageNo: 1,
  //       numOfRows: 3,
  //     });
  //     setItems(data as JsonArray);
  //     setIsLoading(false);
  //   })();
  // }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Swiper
      autoplay
      keyboard
      loop
      spaceBetween={50}
      pagination={{
        bulletActiveClass: 'custom-bullet-active',
        bulletClass: 'custom-bullet',
      }}
    >
      {Array.isArray(items) &&
        items.map((item, index) => (
          <SwiperSlide key={index}>
            <ItemBox itemType="main" item={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperItem;
