import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts }: any = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('GravatarRegistry', {
    from: deployer,
    contract: 'GravatarRegistry',
    args: [],
    log: true,
    autoMine: true,
  });
};

func.tags = ['Gravatar'];

export default func;
