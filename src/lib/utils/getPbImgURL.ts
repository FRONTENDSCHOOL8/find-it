const getPbImgURL = (id: string, fileName: string) => {
  return `${import.meta.env.VITE_PB_API_URL}/api/files/users/${id}/${fileName}`;
};

export default getPbImgURL;
