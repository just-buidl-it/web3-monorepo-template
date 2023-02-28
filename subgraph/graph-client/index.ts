import { Client as UrqlClient, createClient } from 'urql/core';

import { GravatarByIdDocument, GravatarsDocument } from './.graphclient';

class SubgraphClient {
  urqlClient: UrqlClient;

  constructor(url: string) {
    this.urqlClient = createClient({
      url,
      requestPolicy: 'network-only',
    });
  }

  async getGravatars(): Promise<Record<string, any>> {
    const result = await this.urqlClient.query(GravatarsDocument, {}).toPromise();
    return result;
  }

  async getGravatarById(id: string): Promise<Record<string, any>> {
    const result = await this.urqlClient.query(GravatarByIdDocument, { id }).toPromise();
    return result;
  }
}

export default new SubgraphClient(
  'http://graph-node:8000/subgraphs/name/subgraph',
);
