import { request } from 'graphql-request';

import { GravatarsDocument, subgraphEndpoint } from './queries';

export const getGravatars = async () =>
  await request(subgraphEndpoint, GravatarsDocument, {});
