// kakao.maps.d.ts
declare namespace kakao.maps {
  class Map {
    setCenter(latlng: LatLng): void;
    constructor(container: HTMLElement, options: MapOptions);
    // 기타 메서드 및 속성 정의
  }

  class LatLng {
    constructor(lat: number, lng: number);
  }

  class LatLngBounds {
    extend(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
    // 기타 옵션 정의
  }

  namespace services {
    class Places {
      keywordSearch(
        keyword: string,
        callback: (
          data: PlaceResult[],
          status: Status,
          pagination: Pagination
        ) => void
      ): void;
    }

    enum Status {
      OK = 'OK',
      ERROR = 'ERROR',
    }

    interface PlaceResult {
      x: string;
      y: string;
      // 기타 정보
    }

    interface Pagination {
      hasNext: boolean;
      count: number;
    }
  }

  class Marker {
    setMap(map: Map | null): void;
    constructor(options: MarkerOptions);
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
  }

  function load(callback: () => void): void;
}
