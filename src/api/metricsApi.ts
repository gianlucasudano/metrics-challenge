/* eslint-disable import/prefer-default-export */
import { Names } from 'queries/normalizers';
import axiosInstance from './axiosInstance';

export const getMetrics = async () => {
  const res = await axiosInstance.get('/metrics');
  return res.data;
};

type MetricPost = {
  name: Names;
  value: number;
  addedAt: number;
};

export const createMetric = async ({
  metricPost,
}: {
  metricPost: MetricPost;
}) => axiosInstance.post('/example', metricPost);
