import React from 'react';
import { Pane, Heading } from '../primatives';
import ConnectWallet from '../connect-wallet';

function Header(): JSX.Element {
  return (
    <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
      <Pane flex={1} alignItems="center" display="flex">
        <Heading size={600}>Web 3</Heading>
      </Pane>
      <Pane>
        <ConnectWallet />
      </Pane>
    </Pane>
  );
}

export default Header;
