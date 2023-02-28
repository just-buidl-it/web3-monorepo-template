import path from 'path';
import exec from './exec';
import { waitForSubgraphToBeSynced } from './sync';

import { SYNC_DELAY } from '../constants';

const deploy = async (): Promise<void> => {
  const root = path.join(__dirname, '..', '..', '..');

  // Build and Deploy Subgraph
  console.log('Build and deploy subgraph...');
  exec('yarn write-config docker', root);
  exec('yarn codegen', root);
  exec('yarn create:local', root);
  exec(`yarn deploy:local --version-label ${Date.now().toString()}`, root);
  await waitForSubgraphToBeSynced(SYNC_DELAY);
};

export default deploy;
