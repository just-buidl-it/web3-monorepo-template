import { createApolloFetch } from 'apollo-fetch';
import { execSync } from 'child_process';

// Types
interface SyncedSubgraphType {
  synced: boolean;
}

// Execute Child Processes
export const exec = (cmd: string, srcDir: string): Buffer => {
  try {
    return execSync(cmd, { cwd: srcDir, stdio: 'inherit' });
  } catch (e) {
    throw new Error(`Failed to run command \`${cmd}\``);
  }
};

// Subgraph Support
export const fetchSubgraphs = createApolloFetch({
  uri: 'http://graph-node:8030/graphql',
});

const checkIfAllSynced = (subgraphs: SyncedSubgraphType[]): boolean => {
  const result = subgraphs.find((el: SyncedSubgraphType) => !el.synced);
  return Boolean(result == null);
};
// eslint-disable-next-line no-return-await
export const waitForSubgraphToBeSynced = async (delay: number): Promise<{ synced: boolean }> => await new Promise<{ synced: boolean }>((resolve, reject) => {
  // Wait for 5s
  const deadline = Date.now() + 60 * 1000;

  // Function to check if the subgraph is synced
  const checkSubgraphSynced = async (): Promise<void> => {
    try {
      const result = await fetchSubgraphs({
        query: `{ 
            indexingStatuses { 
              subgraph
              synced
              health
              fatalError {
                handler
                message
                deterministic
                block {
                  hash
                  number
                }
              }
            }
          }`,
      });

      if (checkIfAllSynced(result.data.indexingStatuses)) {
        resolve({ synced: true });
      } else {
        throw new Error('reject or retry');
      }
    } catch (e) {
      if (Date.now() > deadline) {
        console.log('The error: ', e);
        reject(new Error('Timed out waiting for the subgraph to sync'));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(checkSubgraphSynced, delay);
      }
    }
  };

  // Periodically check whether the subgraph has synced
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(checkSubgraphSynced, delay);
});
