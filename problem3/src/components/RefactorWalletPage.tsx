import React, { useMemo } from 'react';
import WalletRow from './WalletRow';
import { useWalletBalances, usePrices } from '../hooks/hooks'; // Custom hooks to fetch wallet data
// import '../css/walletPage.module.css'
import '../css/walletPage.module.css'

// 📌 Blockchain priority configuration
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// 📌 Utility function for blockchain priority
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
};

// 📌 Hook for filtering and sorting balances
const useSortedBalances = (balances: WalletBalance[]) => {
    return useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => {
          const priority = getPriority(balance.blockchain);
          return priority > -99 && balance.amount > 0;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });
    }, [balances]);
  };

// 📌 Hook for formatting balances
const useFormattedBalances = (balances: WalletBalance[]) => {
  return useMemo(() => {
    return balances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // 2 decimal precision
    }));
  }, [balances]);
};

// 📌 Interface definitions
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added blockchain field for priority logic
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}


// 📌 Main WalletPage Component
const RefactorWalletPage: React.FC = () => {
  const balances = useWalletBalances(); // Fetch wallet balances
  const prices = usePrices(); // Fetch token prices

  const sortedBalances = useSortedBalances(balances); // Filter & sort balances
  const formattedBalances = useFormattedBalances(sortedBalances); // Format balances

  // 📌 Map through formatted balances and render rows
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = (prices[balance.currency] || 0) * balance.amount; // Fallback to 0 if price is missing

    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
        blockchain={balance.blockchain}
      />
    );
  });

  return (
    <div>
      <h1>Refactored version of the code: See the RefactorWalletPage component</h1>
      <h2 className="title">Wallet Balances</h2>
      {rows}
    </div>
  );
};

export default RefactorWalletPage;
