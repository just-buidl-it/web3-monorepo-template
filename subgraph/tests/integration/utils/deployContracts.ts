import { ethers } from 'hardhat';
import { GravatarRegistry } from '../../../generated/GravatarRegistry/GravatarRegistry';

async function deployContracts(): Promise<{ gravatarRegistry: GravatarRegistry}> {
  const gravatarFactory = await ethers.getContractFactory('GravatarRegistry');
  const gravatarRegistry = await gravatarFactory.deploy();
  await gravatarRegistry.deployed();
  return {
    gravatarRegistry,
  };
}

export default deployContracts;
