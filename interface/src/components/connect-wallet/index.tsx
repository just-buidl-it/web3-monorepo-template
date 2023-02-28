import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useTranslation } from '../../services/translation';
import { Button, Spinner, toaster } from '..';

function ConnectWallet(): JSX.Element {
  const { t } = useTranslation('components', { keyPrefix: 'connect-wallet' });
  const { isConnected } = useAccount();

  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onError: (error) => toaster.danger(error?.message),
  });
  const { disconnect } = useDisconnect({
    onError: (error) => toaster.danger(error?.message),
  });

  return (
    <>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            if (isConnected) {
              disconnect();
            } else {
              connect({ connector });
            }
          }}
          appearance="primary"
        >
          {isConnected
            ? t('disconnect')
            : t('connect', { connector: connector.name })}
          {isLoading && pendingConnector?.id === connector.id && <Spinner />}
        </Button>
      ))}
    </>
  );
}

export default ConnectWallet;
