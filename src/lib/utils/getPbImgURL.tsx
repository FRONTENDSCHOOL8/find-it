const getPbImgURL = (
  item: { collectionId: string; id: string },
  fileName: string
): string => {
  return `${import.meta.env.VITE_PB_API_URL}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
};

export default getPbImgURL;
