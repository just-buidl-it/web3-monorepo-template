import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import '@typechain/hardhat';
import 'solidity-docgen';
import 'solidity-coverage';
import '@openzeppelin/hardhat-upgrades';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  // hardhat-deploy
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC ?? 'dog dog dog dog dog dog dog dog dog dog dog dog dog dog dog dog dog dog',
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    account1: 1,
  },
  // docgen
  docgen: {
    outputDir: './docs',
    pages: 'files',
    templates: './docgen-templates',
  },
};

export default config;
