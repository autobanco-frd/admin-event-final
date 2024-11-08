import { useState } from 'react';
import { WithdrawFundsFormInputs } from './withdraw-funds.ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEventManagerProgram } from "@/utils/solana";
import { EventAccount } from '@/services/get-events.service';
import { withdrawFunds } from '@/services/withdraw-funds.service';
import WithdrawFundsModal from './withdraw-funds.ui';

export function WithdrawFundsFeature(event: EventAccount) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const {publicKey} = useWallet()
  const program = useEventManagerProgram();
  const eventPublicKey = event.publicKey;

  const onSubmit = async ({ amount }: WithdrawFundsFormInputs) => {
    setisLoading(!isLoading);
    try {
        console.log(event)
        await withdrawFunds({ amount, program, publicKey, eventPublicKey })
    } catch (e) {
      console.error(e)
    } finally {
      setisLoading(!isLoading);
      setIsModalOpen(!isModalOpen);
    }
  }

  return (
    <>
    <button className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400"
                onClick={() => setIsModalOpen(true)}>
          Retirar Fondos 
        </button>
      <WithdrawFundsModal
        isOpen={isModalOpen}
        loading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};