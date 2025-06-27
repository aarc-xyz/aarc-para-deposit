// src/context/AarcProvider.tsx
import React from 'react';
import { WebClientInterface } from "@aarc-xyz/fundkit-web-sdk";
import { AarcEthWalletConnector, wagmiConfig } from "@aarc-xyz/eth-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { Environment, ParaProvider } from '@getpara/react-sdk';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});

export const AarcProvider: React.FC<{ aarcModal: WebClientInterface, children: React.ReactNode }> = ({ aarcModal, children }) => {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <AarcEthWalletConnector aarcWebClient={aarcModal}>
                <ParaProvider
        paraClientConfig={{
          apiKey: import.meta.env.VITE_PARA_API_KEY || "",
          env: Environment.BETA,
        }}>
                {children}
                </ParaProvider>
                </AarcEthWalletConnector>
            </QueryClientProvider>
        </WagmiProvider>
    );
};