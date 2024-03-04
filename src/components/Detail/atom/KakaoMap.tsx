import React, { useEffect } from 'react';

interface KakaoMapProps {
  place: string;
  className: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ place, className }) => {
  const placesSearchCB = (data: any[], status: kakao.maps.services.Status) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.506502, 127.053617),
        level: 3,
      };

      if (container) {
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch('이태원 맛집', placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      }
    }
  }, [place]);

  return <div id="map" className={className}></div>;
};

export default KakaoMap;
