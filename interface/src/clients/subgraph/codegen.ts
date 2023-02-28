import { CodegenConfig } from '@graphql-codegen/cli';
import config from './config';

const codegenConfig: CodegenConfig = {
  schema: config.url[process.env.REACT_APP_NETWORK as keyof typeof config.url],
  documents: ['src/clients/subgraph/**/*.graphql'],
  generates: {
    './src/clients/subgraph/queries.ts': {
      plugins: [
        {
          add: {
            placement: 'append',
            content: `export const subgraphEndpoint = '${
              config.url[
                process.env.REACT_APP_NETWORK as keyof typeof config.url
              ]
            }';`,
          },
        },
        'typescript',
        'typed-document-node',
        'typescript-operations',
      ],
    },
  },
};

export default codegenConfig;
