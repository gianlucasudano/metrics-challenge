import { useMutation } from '@tanstack/react-query';
import { createExample } from 'api/exampleApi';

function useCreateExample() {
  return useMutation({ mutationFn: createExample });
}

export default useCreateExample;
