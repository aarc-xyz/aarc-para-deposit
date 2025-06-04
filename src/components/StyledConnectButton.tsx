import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface Props {
    onSafeGenerated: () => void;
}

const StyledConnectButton = ({ onSafeGenerated }: Props) => {
    const { address, chain } = useAccount();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="w-[178px] h-[40px]">
            <RainbowConnectButton.Custom>
                {({ openConnectModal }) => {
                    return (
                        <button
                            onClick={async () => {
                                if (!address) {
                                    await openConnectModal();
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