import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";
import "../index.css";
import { ThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

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
    const isLoggedIn = !!primaryWallet?.address;

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

    const handleDisconnect = () => {
        localStorage.clear();
        sessionStorage.clear();

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
                            className="h-6 w-auto"
                            src="/thirdweb-name-logo.svg"
                            alt="Thirdweb Logo"
                        />
                    </div>
                    {primaryWallet?.address && (
                        <div className="w-[158px] h-[40px]">
                                    <button
                                    onClick={handleDisconnect}
                                    className="w-full h-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-aarc-primary border border-[#0033000D] hover:opacity-90 transition-opacity"
                                >
                                    <div className="flex items-center rounded-xl justify-center gap-2 w-full">
                                        <span className="text-aarc-button-text font-semibold whitespace-nowrap">Logout</span>
                                        <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" fill="#003300" />
                                        </svg>
                                    </div>
                                </button>
                        </div>
                    )}
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

                    {!isLoggedIn ? (
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
                    ) : (
                        <>
                            <ConnectButton client={thirdWebClient} />
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
