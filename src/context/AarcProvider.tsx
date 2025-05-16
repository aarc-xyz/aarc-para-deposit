// src/context/AarcProvider.tsx
import React from 'react';
import { WebClientInterface } from "@aarc-xyz/fundkit-web-sdk";
import { AarcEthWalletConnector, wagmiConfig } from "@aarc-xyz/eth-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';

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
                {children}
                </AarcEthWalletConnector>
            </QueryClientProvider>
        </WagmiProvider>
    );
};