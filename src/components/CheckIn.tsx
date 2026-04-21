import { 
  Transaction, 
  TransactionButton, 
  TransactionStatus, 
  TransactionStatusLabel, 
  TransactionStatusAction 
} from '@coinbase/onchainkit/transaction';
import type { TransactionResponseType } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
import { encodePacked } from 'viem';

// Example builder code or a simple check-in message
const CHECK_IN_DATA = encodePacked(['string'], ['Blackjack 21 Check-in']);

export function CheckIn({ onComplete }: { onComplete: () => void }) {
  const { address } = useAccount();

  if (!address) return null;

  const calls = [
    {
      to: address as `0x${string}`, // Self-transaction to minimize risk/cost
      value: BigInt(0),
      data: CHECK_IN_DATA
    }
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <Transaction
        calls={calls}
        onSuccess={(response: TransactionResponseType) => {
          console.log('Transaction success', response);
          onComplete();
        }}
        onError={(error) => {
          console.error('Transaction error', error);
        }}
      >
        <TransactionButton 
          className="bg-[#0052FF] hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all transform hover:scale-105 uppercase tracking-widest text-sm"
          text="Sit at the Table" 
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] text-center">
        Gas-only join (Base Network)
      </p>
    </div>
  );
}
