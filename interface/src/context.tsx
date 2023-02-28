import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import client from './clients/web3';
import queryClient from './clients/subgraph/client';
import './index.scss';

function Context({ children }: { children: JSX.Element }) {
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
}

export default Context;
