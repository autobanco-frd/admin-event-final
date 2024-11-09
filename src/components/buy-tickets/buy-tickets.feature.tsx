import { useState } from 'react';
import BuyTicketsModal, { BuyFormInputs } from './buy-tickets.ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEventManagerProgram } from "@/utils/solana";
import Image from "next/image";
import { EventAccount } from '@/services/get-events.service';
import { buyTickets } from '@/services/buy-tickets.service';

export function BuyTicketsFeature(event: EventAccount) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const {publicKey} = useWallet()
  const program = useEventManagerProgram();
  const eventPublicKey = event.publicKey;

  const onSubmit = async ({ quantity }: BuyFormInputs) => {
    setisLoading(!isLoading);
    try {
        console.log(event)
        await buyTickets({ quantity, program, publicKey, eventPublicKey })
    } catch (e) {
      console.error(e)
    } finally {
      setisLoading(!isLoading);
      setIsModalOpen(!isModalOpen);
    }
  }

  return (
    <>
    <button className="bg-purple-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-purple-400"
                onClick={() => setIsModalOpen(true)}>
          Comprar Entrada 
          <div className="flex flex-row items-center justify-center">
            <Image 
              src="/usdc-logo.png"
              alt="Logo"
              width="15"
              height="15">
              </Image>
            <p className="px-1">{event.account.ticketPrice.toNumber().toFixed(0)}</p>
          </div>
        </button>
      <BuyTicketsModal
        isOpen={isModalOpen}
        loading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};