export interface AllData {
  atcId: string;
  depPlace: string;
  fdFilePathImg: string;
  fdPrdtNm: string;
  fdSbjt: string;
  fdSn: string;
  fdYmd: string;
  prdtClNm: string;
  rnum: string;
  lstYmd: string;
  lstPlace: string;
  lstPrdtNm: string;
}

export interface LostAllData {
  lstFilePathImg: string;
  lstPlace: string;
  lstPrdtNm: string;
  lstSbjt: string;
  lstSn: string;
  lstYmd: string;
  prdtClNm: string;
  rnum: string;
}

export interface GetDetailData {
  atcId: string;
  csteSteNm: string;
  depPlace: string;
  fdFilePathImg: string;
  fdHor: string;
  fdPlace: string;
  fdPrdtNm: string;
  fdSn: string;
  fdYmd: string;
  fndKeepOrgnSeNm: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
  uniq: string;
}

export interface LostDetailData {
  atcId: string;
  lstFilePathImg: string;
  uniq: string;
  lstLctNm: string;
  lstPlace: string;
  lstPlaceSeNm: string;
  lstPrdtNm: string;
  lstSbjt: string;
  lstSteNm: string;
  lstYmd: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
}

export interface DetailData {
  id: string;
  item_name: string;
  image: string;
  place: string;
  date: string;
  item_type: string;
  description: string;
  storage: string;
  contact: string;
}

export type JsonValue =
  | string
  | number
  | boolean
  | JsonArray
  | JsonObject
  | null;

export interface JsonArray extends Array<JsonValue> {}

export type JsonItem = JsonValue | string | GetDetailData;
export interface JsonType extends Array<JsonItem> {}

export interface JsonObject {
  [key: string]: JsonValue;
}
