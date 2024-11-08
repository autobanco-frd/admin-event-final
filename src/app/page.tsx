'use client';
import { CreateEventFeature } from '@/components/create-event/create-event.feature';
import EventCard from '@/components/event-card';
import WalletInfo from '@/components/wallet-info';
import { EventAccount, getEvents } from '@/services/get-events.service';
import { useEventManagerProgram } from '@/utils/solana';
import { useEffect, useState } from 'react';

export default function Home() {
  const program = useEventManagerProgram();
  const [events, setEvents] = useState<EventAccount[]>([]);

  const getAllEvents = async () => {
    try {
      getEvents(program).then((events) => {
        if (events) {
          setEvents(events);
        }
      });
    } catch (error) {
      console.error('Error getting events:', error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      {/* <div>
        <WalletInfo />
      </div> */}
      <div>
        {events.length == 0 ? (
          <div className="my-16 flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold">
              ¡Lo sentimos! No hay eventos disponibles
            </h1>
            <h3 className="text-2xl text-center mt-5 mb font-bold">
              Sé el primero en crear un evento en Solana
            </h3>
            <CreateEventFeature />
          </div>
        ) : (
          <div className="my-16">
            <h1 className="text-4xl text-center font-bold">
              ¡No te pierdas los últimos eventos!
            </h1>
            <h3 className="text-2xl text-center mt-5 mb font-bold">
              Forma parte de la gran comunidad de Solana
            </h3>
          </div>
        )}
        <div className="grid gap-4 px-10 mb-10 xl:grid-cols-4 sm:grid-cols-2">
          {events.map((event, index) => (
            <EventCard
              key={index}
              publicKey={event.publicKey}
              account={event.account}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
