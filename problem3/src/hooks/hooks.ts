import WalletBalance from "../models/walletBalance.model";

export const useWalletBalances = (): WalletBalance[] => {
    // Example data, replace with API call
    return [
        { currency: 'ETH', amount: 1.2, blockchain: 'Ethereum' },
        { currency: 'OSMO', amount: 50, blockchain: 'Osmosis' },
        { currency: 'ARB', amount: 0, blockchain: 'Arbitrum' }, // Should be filtered out
        { currency: 'ZIL', amount: 10, blockchain: 'Zilliqa' },
    ];
};
  
export const usePrices = (): Record<string, number> => {
    // Example price data, replace with API call
    return {
        ETH: 3000,
        OSMO: 1.2,
        ZIL: 0.05,
    };
};