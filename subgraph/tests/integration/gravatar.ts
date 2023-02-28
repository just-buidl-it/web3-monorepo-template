import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { exec } from './utils/exec';
import { waitForSubgraphToBeSynced } from './utils/sync';

import graphQlClient from '../../graph-client';
import deploy from './utils/deploy';
import deployContracts from './utils/deployContracts';
import { GravatarRegistry } from '../../typechain-types/GravatarRegistry';

describe('Gravatar', () => {
  let signers: Signer[];
  let gravatarRegistry: GravatarRegistry;

  const syncDelay = 3000;

  before(async function () {
    this.timeout(5000000); // sometimes it takes a long time
    signers = await ethers.getSigners();
    await deploy();
    ({ gravatarRegistry } = await deployContracts());
  });

  after(async () => {
    process.stdout.write('Clean up, removing subgraph....');

    exec('yarn remove:local', __dirname);

    process.stdout.write('Clean up complete.');
  });

  it('handles Gravatar created', async () => {
    await gravatarRegistry.connect(signers[1]).createGravatar('Gravy', 0);
    await waitForSubgraphToBeSynced(syncDelay);
    const data = await graphQlClient.getGravatars();
    console.log(data);
    expect(data?.gravatars).to.be.deep.equal(undefined);
  });
  // updateGravatarName
  // updateGravatarImage
});
