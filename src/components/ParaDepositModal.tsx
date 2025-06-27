import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";
import "../index.css";
import DisconnectButton from "./DisconnectButton";
import { useState, useEffect } from "react";
import { ParaModal } from "@getpara/react-sdk";
import { para } from "../config/paraConfig";
import { ParaAccountCard } from "./ParaAccountCard";

declare global {
    interface Window {
        ethereum?: any;
    }
}

interface Props {
    isDark: boolean;
    logoLight: string;
    logoDark: string;
    aarcModal: AarcFundKitModal;
    onThemeToggle: () => void;
}

const ParaDepositModal = ({ isDark, logoLight, logoDark, aarcModal }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wallet, setWallet] = useState<string>("");
  
    const handleCheckIfAuthenticated = async () => {
      setIsLoading(true);
      try {
        const isAuthenticated = await para.isFullyLoggedIn();
        setIsConnected(isAuthenticated);
        if (isAuthenticated) {
          const wallets = Object.values(await para.getWallets());
          if (wallets?.length) {
            setWallet(wallets[0].address || "unknown");
          }
        }
      } catch (err: any) {
        console.error(err.message || "An error occurred during authentication");
      }
      setIsLoading(false);
    };
  
    useEffect(() => {
      handleCheckIfAuthenticated();
    }, [isOpen]);
  
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleParaModalClose = () => {
      setIsOpen(false);
      window.location.reload();
    };

    const handleFundWallet = async () => {
        if (!wallet) return;

        try {
            aarcModal?.updateDestinationWalletAddress(wallet);
            aarcModal.openModal();
        } catch (error) {
            console.error('Error opening Aarc modal:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await para.logout();
            setIsConnected(false);
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
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
                            className="h-6 w-auto"
                            src="/para-name-logo.svg"
                            alt="Safe Logo"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {isConnected && <DisconnectButton handleDisconnect={handleDisconnect} />}
                    </div>
                </div>
            </header>

            <ParaModal
                                para={para}
                                isOpen={isOpen}
                                appName="Aarc x Para"
                                logo="/logo.svg"
                                onClose={handleParaModalClose}
                                theme={{
                                foregroundColor: "#C3C3C3",
                                backgroundColor: "#2D2D2D", 
                                accentColor: "#A5E547", 
                                darkForegroundColor: "#C3C3C3",
                                darkBackgroundColor: "#2D2D2D",
                                darkAccentColor: "#A5E547",
                                mode: "dark",
                                borderRadius: "none",
                                font: "DM Sans",
                            }}
                            />

            {!isOpen && <main className="pt-24 pb-8 px-4 mx-auto max-w-md">
                <div className="gradient-border">
                    {!isConnected ? (
                        <>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleOpenModal}
                                    className="w-full py-3 px-4 bg-aarc-primary text-aarc-button-text font-medium rounded-[42px] hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <img src="/mail-icon.svg" alt="Email" className="w-5 h-5" />
                                    <span className="flex-1 text-center">Login / Signup</span>
                                </button>
                                
                            </div>
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
                            <ParaAccountCard paraAddress={wallet} />
                            <div className="w-full flex flex-col gap-4 mt-4">
                                <button
                                    disabled={isLoading}
                                    onClick={handleFundWallet}
                                    className="w-full py-3 px-4 bg-aarc-primary text-aarc-button-text font-medium rounded-[42px] hover:bg-opacity-90 transition-colors"
                                >
                                    Fund Wallet
                                </button>
                            </div>
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
            </main>}
        </div>
    );
};

export default ParaDepositModal;
