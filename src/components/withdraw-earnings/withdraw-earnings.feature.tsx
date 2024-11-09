import { useWallet } from '@solana/wallet-adapter-react';
import { useEventManagerProgram } from '@/utils/solana';
import { EventAccount } from '@/services/get-events.service';
import { withdrawEarnings } from '@/services/withdraw-earnings.service';

export function WithdrawEarningsFeature(event: EventAccount) {
  const { publicKey } = useWallet();
  const program = useEventManagerProgram();
  const eventPublicKey = event.publicKey;

  const withdraw = async () => {
    try {
      console.log(event);
      await withdrawEarnings({ program, publicKey, eventPublicKey });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400"
        onClick={withdraw}
      >
        Retirar Ganancias
      </button>
    </>
  );
}
