// @TODO These mocks are incomplete
// Complete and type them correctly
export const useAccount = jest.fn((): any => ({ isConnected: false }));

export const useConnect = jest.fn((): any => ({
  isConnected: false,
  connectors: [
    {
      ready: true,
      id: 'metamask',
      name: 'MetaMask',
    },
  ],
}));

export const useDisconnect = jest.fn(() => ({ diconnect: jest.fn() }));

export const usePrepareContractWrite = jest.fn(() => ({
  config: {},
}));

export const useContractWrite = jest.fn(() => ({}));

export const configureChains = jest.fn(() => ({}));

export const createClient = jest.fn(() => ({}));

export const WagmiConfig = ({ children }: any) => children;
