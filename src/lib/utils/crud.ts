import { pb } from '@/lib/api/getPbData';

export const getData = async (collection: string, options: object = {}) => {
  try {
    const response = pb.collection(collection).getFullList(options);

    return response;
  } catch (error) {
    console.error('에러 발생: ', error);
  }
};

export const createData = async (collection: string, data: object) => {
  try {
    const response = pb.collection(collection).create(data);

    return response;
  } catch (error) {
    console.error('에러 발생: ', error);
  }
};

export const updateData = async (
  collection: string,
  id: string,
  data: object
) => {
  try {
    const response = pb.collection(collection).update(id, data);

    return response;
  } catch (error) {
    console.error('에러 발생: ', error);
  }
};

export const deleteData = async (collection: string, id: string) => {
  try {
    const response = pb.collection(collection).delete(id);

    return response;
  } catch (error) {
    console.error('에러 발생: ', error);
  }
};
