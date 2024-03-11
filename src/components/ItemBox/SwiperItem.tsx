import React from 'react';
import SwiperCore from 'swiper';
import ItemBox from './ItemBox';
import { JsonArray } from '@/types/types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllData } from '@/lib/utils/getAPIData';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '@/tailwind.css';

SwiperCore.use([Autoplay, Pagination, Keyboard]);

const SwiperItem: React.FC = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getAllData({
        pageNo: 1,
        numOfRows: 3,
      });
      setItems(data as JsonArray);
    })();
  }, []);

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
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <ItemBox itemType="main" item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperItem;
