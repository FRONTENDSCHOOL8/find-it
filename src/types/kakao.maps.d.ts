// kakao.maps.d.ts
declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    // 기타 메서드 및 속성 정의
  }

  class LatLng {
    constructor(lat: number, lng: number);
    // 기타 메서드 및 속성 정의
  }

  interface MapOptions {
    center: LatLng;
    level: number;
    // 기타 옵션 정의
  }

  function load(callback: () => void): void;
}
