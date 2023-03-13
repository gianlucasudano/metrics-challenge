import { useMutation } from '@tanstack/react-query';
import { createMetric } from 'api/metricsApi';

function useCreatemetric() {
  return useMutation({ mutationFn: createMetric });
}

export default useCreatemetric;
