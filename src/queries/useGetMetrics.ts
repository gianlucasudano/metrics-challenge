import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getMetrics } from 'api/metricsApi';
import { type TymesMetric } from './normalizers';

export const metricsQueryKey = 'metricsList';

export type MetricsResponse = {
  isLoading: boolean;
  data: TymesMetric;
  isError: boolean;
  error: AxiosError;
};

function useGetMetrics() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [metricsQueryKey],
    queryFn: getMetrics,
  });

  return { isLoading, data, isError, error } as MetricsResponse;
}

export default useGetMetrics;
