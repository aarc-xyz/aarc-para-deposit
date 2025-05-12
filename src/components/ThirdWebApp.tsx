import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";
import "../index.css";
import { ThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount, } from "thirdweb/react";

interface Props {
    isDark: boolean;
    logoLight: string;
    logoDark: string;
    aarcModal: AarcFundKitModal;
    onThemeToggle: () => void;
    thirdWebClient: ThirdwebClient;
}

const ThirdWebApp = ({ isDark, logoLight, logoDark, aarcModal, thirdWebClient }: Props) => {
    const primaryWallet = useActiveAccount();
    console.log('primaryWallet: ', primaryWallet);
    const isLoggedIn = false;

    const handleFundWallet = () => {
        if (primaryWallet?.address) {
            console.log('primaryWallet?.address: ', primaryWallet?.address);
            try {
                aarcModal?.updateDestinationWalletAddress(primaryWallet.address);
                aarcModal.openModal();
            } catch (error) {
                console.error('Error opening Aarc modal:', error);
            }
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
                            src="/dynamicLogo.svg"
                            alt="Dynamic Logo"
                        />
                    </div>
                    {/* <div
                        onClick={onThemeToggle}
                        className="w-10 h-10"
                    >
                        <img src="/dark_mode.svg" alt="Theme toggle" />
                    </div> */}
                </div>
            </header>

            <main className="pt-24 pb-8 px-4 mx-auto max-w-md">
                <div className="gradient-border">

                    {!isLoggedIn && (
                        <>
                            <ConnectButton client={thirdWebClient} />
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
                    )}
                    {primaryWallet?.address && (
                        <>
                            <button
                                onClick={handleFundWallet}
                                className="w-full mt-4 py-3 px-4 bg-aarc-primary text-aarc-button-text font-medium rounded-[42px] hover:bg-opacity-90 transition-colors"
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

export default ThirdWebApp;
