import {  useState } from "react";
import { CheckIcon } from "../icons/CheckIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { useAccount } from "wagmi";

const formatAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const ParaAccountCard = ({paraAddress}: {paraAddress: string | null}) => {
    const { chain } = useAccount();
    const [copied, setCopied] = useState(false);

    const handleCopyAddress = async () => {
        if (paraAddress) {
            await navigator.clipboard.writeText(paraAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!paraAddress) return null;

    return (
        <div className="flex flex-col gap-y-4 w-full items-center justify-center">
        <div className="box-border flex w-full items-center px-2 py-3 gap-2.5 border border-[#424242] rounded-2xl flex-grow-0 z-[5]">
        <img src="/para-logo.png" alt="Ethereum" className="w-6 h-6" />
        <div className="flex flex-col items-start center gap-2">
            <div className="text-[#C3C3C3] text-xs font-medium">{chain?.name} Address</div>
            <div className="text-white text-sm font-semibold">{formatAddress(paraAddress)}</div>
        </div>
        <button
            onClick={handleCopyAddress}
            className="ml-auto hover:opacity-80 transition-opacity"
            title={copied ? "Copied!" : "Copy address"}
        >
            {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
            </div>
    </div>
    )
}