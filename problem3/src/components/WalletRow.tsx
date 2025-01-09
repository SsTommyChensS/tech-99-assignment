import React from 'react';
import style from '../css/walletRow.module.css'

// 📌 Define props for WalletRow
interface WalletRowProps {
  amount: number;           // Token amount
  usdValue: number;         // USD equivalent value
  formattedAmount: string;  // Formatted token amount
  blockchain: string;       // Blockchain type
}

// 📌 WalletRow Component
const WalletRow: React.FC<WalletRowProps> = ({
  usdValue,
  formattedAmount,
  blockchain,
}) => {
  return (
    <div className={style.row}>
      <div className={style.blockchain}>
        <strong>Blockchain:</strong> {blockchain}
      </div>
      <div className={style.amount}>
        <strong>Amount:</strong> {formattedAmount}
      </div>
      <div className={style.usdValue}>
        <strong>USD Value:</strong> ${usdValue.toFixed(2)}
      </div>
    </div>
  );
};

export default WalletRow;
