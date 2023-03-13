/* eslint-disable import/prefer-default-export */
import axiosInstance from './axiosInstance';

export const getMetrics = async () => {
  const res = await axiosInstance.get('/metrics');
  return res.data;
};
