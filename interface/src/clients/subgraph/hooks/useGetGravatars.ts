import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { getGravatars } from '..';
import { GravatarsQuery } from '../queries';

const GET_GRAVATAR = 'GET_GRAVATAR';

type Options = QueryObserverOptions<
  GravatarsQuery,
  Error,
  GravatarsQuery,
  GravatarsQuery,
  [typeof GET_GRAVATAR]
>;

const useGetGravatars = (options?: Options) =>
  useQuery([GET_GRAVATAR], getGravatars, options);

export default useGetGravatars;
