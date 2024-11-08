import { useState } from 'react';
import { SponsorFormInputs } from './sponsor-event.ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEventManagerProgram } from "@/utils/solana";
import SponsorEventModal from './sponsor-event.ui';
import { EventAccount } from '@/services/get-events.service';
import { sponsorEvent } from '@/services/sponsor-event.service';

export function SponsorEventFeature(event: EventAccount) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const {publicKey} = useWallet()
  const program = useEventManagerProgram();
  const eventPublicKey = event.publicKey;

  const onSubmit = async ({ quantity }: SponsorFormInputs) => {
    setisLoading(!isLoading);
    try {
        console.log(event)
        await sponsorEvent({ quantity, program, publicKey, eventPublicKey })
    } catch (e) {
      console.error(e)
    } finally {
      setisLoading(!isLoading);
      setIsModalOpen(!isModalOpen);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400"
      >
        Colaborar
        
      </button>

      <SponsorEventModal
        isOpen={isModalOpen}
        loading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};