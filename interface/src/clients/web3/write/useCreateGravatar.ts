import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import contractConfig from '../config';

const useCreateGravatar = (
  name: string,
  url: string
): ReturnType<typeof useContractWrite> => {
  const { config } = usePrepareContractWrite({
    abi: contractConfig.gravatarRegistry.abi,
    address: contractConfig.gravatarRegistry.address,
    functionName: 'createGravatar',
    args: [name, url],
  });
  return useContractWrite(config);
};

export default useCreateGravatar;
