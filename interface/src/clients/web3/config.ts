import type { Abi as AbiType, Address } from 'abitype';
import { abi as gravatarRegistryAbi } from '../../abis/GravatarRegistry';

type SUPPORTED_NETWORKS = 'sepolia' | 'hardhat';

class ContractConfig<Abi extends AbiType> {
  hardhat: Address;

  sepolia: Address;

  abi: Abi;

  constructor({
    hardhat,
    sepolia,
    abi,
  }: {
    hardhat: Address;
    sepolia: Address;
    abi: Abi;
  }) {
    this.hardhat = hardhat;
    this.sepolia = sepolia;
    this.abi = abi;
  }

  get address(): Address {
    return this[process.env.REACT_APP_NETWORK as SUPPORTED_NETWORKS];
  }
}

const config = {
  gravatarRegistry: new ContractConfig<typeof gravatarRegistryAbi>({
    sepolia: '0' as Address,
    hardhat: '0x80ebaee9802a1ad8ca993349b4661f6e893c9153' as Address,
    abi: gravatarRegistryAbi,
  }),
};

export default config;
