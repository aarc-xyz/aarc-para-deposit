import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import Safe, { PredictedSafeProps } from '@safe-global/protocol-kit';
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface Props {
    onSafeGenerated: () => void;
}

const StyledConnectButton = ({ onSafeGenerated }: Props) => {
    const { address, chain } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [shouldGenerateSafe, setShouldGenerateSafe] = useState(false);

    useEffect(() => {
        if (shouldGenerateSafe && address) {
            generateSafeWallet();
            setShouldGenerateSafe(false);
        }
    }, [address, shouldGenerateSafe]);

    const generateSafeWallet = async () => {
        if (!address || !window.ethereum || !chain) return;
        
        try {
            setIsLoading(true);
            // Create a unique key for this chain
            const safeKey = `safeAddress_${chain.id}`;
            
            const predictedSafe: PredictedSafeProps = {
                safeAccountConfig: {
                    owners: [address],
                    threshold: 1
                },
            };

            // Use window.ethereum as the provider and pass the address as the signer
            const protocolKit = await Safe.init({
                provider: window.ethereum,
                signer: address,
                predictedSafe
            });

            // Get the predicted Safe address
            const safeAddress = await protocolKit.getAddress();
            console.log('safeAddress', safeAddress);

            // Check if Safe is already deployed
            const isSafeDeployed = await protocolKit.isSafeDeployed();
            
            if (isSafeDeployed) {
                // If Safe is deployed, just store the address and update UI
                localStorage.setItem(safeKey, safeAddress);
                onSafeGenerated();
                setIsLoading(false);
                return;
            }
            
            // Create deployment transaction
            const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction();
            // Execute this transaction using the integrated signer or your preferred external Ethereum client
            const client = await protocolKit.getSafeProvider().getExternalSigner();

            const txHash = await client?.sendTransaction({
                to: deploymentTransaction.to,
                value: BigInt(deploymentTransaction.value),
                data: deploymentTransaction.data as `0x${string}`,
                chain
            });

            if (!txHash) {
                throw new Error('Transaction failed to send');
            }

            // Wait for transaction receipt
            let txReceipt = null;
            while (!txReceipt) {
                txReceipt = await window.ethereum.request({
                    method: 'eth_getTransactionReceipt',
                    params: [txHash]
                });
                if (!txReceipt) {
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before checking again
                }
            }

            if (!txReceipt) {
                throw new Error('Transaction failed');
            }

            // Store the Safe address with chain ID
            localStorage.setItem(safeKey, safeAddress);
            onSafeGenerated();
        } catch (error) {
            console.error('Error generating Safe wallet:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[178px] h-[40px]">
            <RainbowConnectButton.Custom>
                {({ openConnectModal }) => {
                    return (
                        <button
                            onClick={async () => {
                                if (!address) {
                                    await openConnectModal();
                                    setShouldGenerateSafe(true);
                                }
                            }}
                            disabled={isLoading}
                            className={`w-full h-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl ${isLoading && "cursor-not-allowed"} bg-aarc-primary border border-[#0033000D]`}
                        >
                            <div className="flex items-center rounded-xl justify-center gap-2 w-full">
                                <span className="text-aarc-button-text font-semibold whitespace-nowrap">{isLoading ? "Generating Safe..." : "Connect wallet"}</span>
                                {!isLoading && <img src="/chain-link.svg" alt="chain-link" />}
                            </div>
                        </button>
                    );
                }}
            </RainbowConnectButton.Custom>
        </div>
    );
};

export default StyledConnectButton; 