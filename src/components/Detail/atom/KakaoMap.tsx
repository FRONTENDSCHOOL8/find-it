import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  place: string;
  className?: string;
}

const KakaoMap = ({ place, className }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    if (!container) return;

    const map = new window.kakao.maps.Map(container, options);

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(
          parseFloat(data[0].y),
          parseFloat(data[0].x)
        );

        map.setCenter(coords);

        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const content = `<div class="flex bg-white text-black border border-black px-12px py-4px"><span class="text-12px">${place}</span></div>`;

        new window.kakao.maps.CustomOverlay({
          map: map,
          position: coords,
          content,
          yAnchor: 2.8,
        });
      }
    });

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [place]);

  return <div ref={mapRef} className={className} />;
};

export default KakaoMap;
