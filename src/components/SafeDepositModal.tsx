import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";
import "../index.css";
import StyledConnectButton from "./StyledConnectButton";
import DisconnectButton from "./DisconnectButton";
import { useAccount } from "wagmi";
import {SafeAccountCard} from "./SafeAccountCard";
import { useState, useEffect } from "react";

interface Props {
    isDark: boolean;
    logoLight: string;
    logoDark: string;
    aarcModal: AarcFundKitModal;
    onThemeToggle: () => void;
}

const SafeDepositModal = ({ isDark, logoLight, logoDark, aarcModal }: Props) => {
    const { address, chain } = useAccount();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (chain) {
            const safeKey = `safeAddress_${chain.id}`;
            const storedSafeAddress = localStorage.getItem(safeKey);
            if (!storedSafeAddress) return;
            setIsLoggedIn(true);
        }
    }, [address, chain]);

    const handleSafeGenerated = () => {
        setIsLoggedIn(true);
    };

    const handleFundWallet = async () => {
        if (!address || !window.ethereum || !chain) return;
        
        const safeKey = `safeAddress_${chain.id}`;
        const safeAddress = localStorage.getItem(safeKey);
        if (!safeAddress) return;

        try {
            aarcModal?.updateDestinationWalletAddress(safeAddress);
            aarcModal.openModal();
        } catch (error) {
            console.error('Error opening Aarc modal:', error);
        }
    };

    const handleDisconnect = () => {
        localStorage.clear();
        sessionStorage.clear();
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-aarc-bg grid-background">
            <header className="fixed top-0 left-0 right-0 z-50 bg-aarc-bg/80 backdrop-blur-sm border-b border-[#ffffff0d]">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            className="h-6 w-auto"
                            src={isDark ? logoLight : logoDark}
                            alt="Aarc Logo"
                        />
                        <img
                            src="/cross-icon.svg"
                            alt="Cross"
                            className="w-6 h-6"
                        />
                        <img
                            className="h-8 w-auto"
                            src="/safe-name-logo.svg"
                            alt="Safe Logo"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {address ? <DisconnectButton handleDisconnect={handleDisconnect} /> : <StyledConnectButton onSafeGenerated={handleSafeGenerated} />}
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-8 px-4 mx-auto max-w-md">
                <div className="gradient-border">
                    {!isLoggedIn ? (
                        <>
                            <StyledConnectButton onSafeGenerated={handleSafeGenerated} />
                            <div className="mt-2 flex items-center justify-center space-x-0.5 text-aarc-text">
                                <span className="font-semibold text-[10.94px] leading-none">Powered by</span>
                                <img
                                    src={isDark ? logoLight : logoDark}
                                    alt="Aarc Logo"
                                    className="w-[56.11px] h-[14.90px]"
                                />
                            </div>
                            <div className="text-center text-[10px] leading-none text-aarc-text">
                                By using this service, you agree to Aarc <span className="underline">terms</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <SafeAccountCard />
                            <button
                                onClick={handleFundWallet}
                                className="w-full mt-2 py-3 px-4 bg-aarc-primary text-aarc-button-text font-medium rounded-[42px] hover:bg-opacity-90 transition-colors"
                            >
                                Fund Wallet
                            </button>
                            <div className="mt-4 flex items-center justify-center space-x-0.5 text-aarc-text">
                                <span className="font-semibold text-[10.94px] leading-none">Powered by</span>
                                <img
                                    src={isDark ? logoLight : logoDark}
                                    alt="Aarc Logo"
                                    className="w-[56.11px] h-[14.90px]"
                                />
                            </div>
                            <div className="text-center text-[10px] leading-none text-aarc-text">
                                By using this service, you agree to Aarc <span className="underline">terms</span>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SafeDepositModal;
