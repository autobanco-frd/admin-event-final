'use client';
import Link from 'next/link';
import CollaborationCard from '@/components/collaboration-card';
import { dataTest } from '../../utils/data/collaboration-data';
import { redirect } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEventManagerProgram } from '@/utils/solana';
import { useEffect, useState } from 'react';
import {
  getSponsoredEvents,
  SponsoredEvent,
} from '../../services/get-sponsored-event.service';

export default function Collaborations() {
  const program = useEventManagerProgram();
  const { connection } = useConnection();
  const [sponsored, setSponsored] = useState<SponsoredEvent[]>([]);
  const { publicKey } = useWallet();

  if (!publicKey) {
    return redirect('/');
  }

  const getSponsored = async () => {
    try {
      getSponsoredEvents(program, connection, publicKey).then((sponsored) => {
        if (sponsored) {
          setSponsored(sponsored);
        }
      });
    } catch (error) {
      console.error('Error getting events:', error);
    }
  };

  useEffect(() => {
    getSponsored();
  }, []);

  return (
    <div>
      {sponsored.length == 0 ? (
        <div className="my-16 flex flex-col items-center">
          <h1 className="text-4xl text-center font-bold">
            Parece que aún no has colaborado con ningún evento
          </h1>
          <h3 className="text-2xl text-center mt-5 mb font-bold">
            ¡Explora los últimos eventos en Solana y participa como colaborador!
          </h3>
          <Link
            href="/"
            className="bg-purple-300 w-50 text-black mt-5 font-semibold px-4 py-1 rounded hover:text-white hover:bg-purple-400"
          >
            Explorar eventos
          </Link>
        </div>
      ) : (
        <div className="my-16">
          <h1 className="text-4xl text-center font-bold">Tus Colaboraciones</h1>
          <h3 className="text-2xl text-center mt-5 mb font-bold">
            Recolecta tus recompenzas una vez finalizado el evento
          </h3>
        </div>
      )}
      <div className="grid gap-4 px-10 mb-10 xl:grid-cols-4 sm:grid-cols-2">
        {sponsored.map((event, index) => (
          <CollaborationCard
            key={index}
            event={event.event}
            tokens={event.tokens}
          />
        ))}
      </div>
    </div>
  );
}
