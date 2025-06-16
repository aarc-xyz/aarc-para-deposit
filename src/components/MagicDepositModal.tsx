import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";
import "../index.css";
import DisconnectButton from "./DisconnectButton";
import { MagicAccountCard } from "./MagicAccountCard";
import { useState, useEffect } from "react";
import { InstanceWithExtensions, MagicSDKExtensionsOption, SDKBase } from "@magic-sdk/provider";

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
    magic: InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
}

const MagicDepositModal = ({ isDark, logoLight, logoDark, aarcModal, magic }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading);
    const [magicAddress, setMagicAddress] = useState<string | null>(null);

    useEffect(() => {
        if(!isLoggedIn) return;
        const getMagicAddress = async () => {
            const magicInfo = await magic.user.getInfo();
            const magicAddress = magicInfo.publicAddress;
            setMagicAddress(magicAddress);
        };
        getMagicAddress();
    }, [magic, isLoggedIn]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const isUserLoggedIn = await magic.user.isLoggedIn();
                setIsLoggedIn(isUserLoggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, [magic]);

    const handleConnect = async () => {
        try {
            setIsLoading(true);
            await magic.wallet.connectWithUI();
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         setIsLoading(true);
    //         // @ts-ignore
    //         await magic.oauth2.loginWithRedirect({
    //             provider: 'google',
    //             redirectURI: window.location.origin,
    //         });
    //     } catch (error) {
    //         console.error('Error with Google login:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleTwitterLogin = async () => {
    //     try {
    //         setIsLoading(true);
    //         // @ts-ignore
    //         await magic.oauth2.loginWithRedirect({
    //             provider: 'twitter',
    //             redirectURI: window.location.origin,
    //         });
    //     } catch (error) {
    //         console.error('Error with Twitter login:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleFundWallet = async () => {
        if (!magicAddress) return;

        try {
            aarcModal?.updateDestinationWalletAddress(magicAddress);
            aarcModal.openModal();
        } catch (error) {
            console.error('Error opening Aarc modal:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await magic.user.logout();
            setIsLoggedIn(false);
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
                            className="h-8 w-auto"
                            src="/magic-name-logo.svg"
                            alt="Safe Logo"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && <DisconnectButton handleDisconnect={handleDisconnect} />}
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-8 px-4 mx-auto max-w-md">
                <div className="gradient-border">
                    {!isLoggedIn ? (
                        <>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleConnect}
                                    className="w-full py-3 px-4 bg-aarc-primary text-aarc-button-text font-medium rounded-[42px] hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <img src="/mail-icon.svg" alt="Email" className="w-5 h-5" />
                                    <span className="flex-1 text-center">Login / Signup with Email</span>
                                </button>
                                {/* <button
                                    onClick={handleGoogleLogin}
                                    className="w-full py-3 px-4 bg-white text-gray-800 font-medium rounded-[42px] hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                                    <span className="flex-1 text-center">Continue with Google</span>
                                </button>
                                <button
                                    onClick={handleTwitterLogin}
                                    className="w-full py-3 px-4 bg-black text-white font-medium rounded-[42px] hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <img src="/x-icon.svg" alt="X" className="w-5 h-5" />
                                    <span className="flex-1 text-center">Continue with X</span>
                                </button> */}
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
                            <MagicAccountCard magicAddress={magicAddress} />
                            <div className="w-full flex flex-col gap-4 mt-4">
                                <button
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
            </main>
        </div>
    );
};

export default MagicDepositModal;
