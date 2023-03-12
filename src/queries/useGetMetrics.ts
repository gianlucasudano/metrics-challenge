import { useQuery } from '@tanstack/react-query';
import { getMetrics } from 'api/metricsApi';
import getGroupedMetrics from './normalizers';

export const metricsQueryKey = 'metricsList';

function useGetMetrics() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [metricsQueryKey],
    queryFn: getMetrics,
  });

  const normalizedData = getGroupedMetrics(data);

  return { isLoading, normalizedData, isError, error };
}

export default useGetMetrics;
