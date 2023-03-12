import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getExample, ExampleItem } from 'api/exampleApi';

export type ListItems = ExampleItem[];

export type GetExampleResponse = {
  isLoading: boolean;
  data: ListItems;
  isError: boolean;
  error: AxiosError;
};

export const exampleQueryKey = 'exampleList';

function useGetExample() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [exampleQueryKey],
    queryFn: getExample,
  });

  return { isLoading, data, isError, error } as GetExampleResponse;
}

export default useGetExample;
