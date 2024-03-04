// kakao.maps.d.ts
declare namespace kakao.maps {
  class Map {
    setCenter(latlng: LatLng): void;
    constructor(container: HTMLElement, options: MapOptions);
    // 기타 메서드 및 속성 정의
  }

  // class services {
  //   class Geocoder {

  //   }
  // }

  class LatLng {
    constructor(lat: number, lng: number);
    // 기타 메서드 및 속성 정의
  }

  interface MapOptions {
    center: LatLng;
    level: number;
    // 기타 옵션 정의
  }

  namespace services {
    class Places {
      KeywordSearch(
        keyword: string,
        callback: (data: any, status: any, pagination: any) => void
      ): void;
    }

    enum Status {
      OK = 'OK',
      ERROR = 'ERROR',
    }
  }

  class Marker {
    setMap(map: Map): void;
    constructor(options: MarkerOptions);
  }

  function load(callback: () => void): void;
}
