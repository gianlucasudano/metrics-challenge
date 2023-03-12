/* eslint-disable import/prefer-default-export */
import axiosInstance from './axiosInstance';

export type ExampleItem = {
  id: number;
  name: string;
  description: string;
  inStock: boolean;
};

export type ExampleItemPost = Omit<ExampleItem, 'id'>;

export const getExample = async () => {
  const res = await axiosInstance.get('/example');
  return res.data;
};

export const createExample = async ({
  example,
}: {
  example: ExampleItemPost;
}) => axiosInstance.post('/example', example);
