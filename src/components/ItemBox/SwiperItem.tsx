import React from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import '@/tailwind.css';
import ItemBox from './ItemBox';

SwiperCore.use([Autoplay, Pagination, Keyboard]);

const SwiperItem: React.FC = () => {
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
      <SwiperSlide>
        <ItemBox itemType="main" />
      </SwiperSlide>
      <SwiperSlide>
        <ItemBox itemType="main" />
      </SwiperSlide>
      <SwiperSlide>
        <ItemBox itemType="main" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperItem;
