'use client';
import MyEventCard from '@/components/my-event-card';
import { redirect } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { CreateEventFeature } from '@/components/create-event/create-event.feature';
import { useEventManagerProgram } from '@/utils/solana';
import { useEffect, useState } from 'react';
import { getMyEvents, MyEventInfo } from '@/services/get-my-events.service';
import { EventAccount } from '@/services/get-events.service';

export default function MyEvents() {
  const program = useEventManagerProgram();
  const { connection } = useConnection();
  const [events, setEvents] = useState<EventAccount[]>([]);
  const { publicKey } = useWallet();
  if (!publicKey) {
    return redirect('/');
  }

  const getEvents = async () => {
    try {
      getMyEvents(connection, program, publicKey).then((events) => {
        if (events) {
          setEvents(events);
        }
      });
    } catch (error) {
      console.error('Error getting events:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      {events.length == 0 ? (
        <div className="my-16 flex flex-col items-center">
          <h1 className="text-4xl text-center font-bold">
            Aún no tienes eventos en Solana
          </h1>
          <h3 className="text-2xl text-center mt-5 mb font-bold">
            ¡Crea tu primer evento hoy mismo!
          </h3>
          <CreateEventFeature />
        </div>
      ) : (
        <div>
          <div className="my-16 flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold">
              Tus eventos en Solana
            </h1>
            <h3 className="text-2xl text-center mt-5 mb font-bold">
              ¿Nuevo plan? ¡Hazlo realidad!
            </h3>
            <CreateEventFeature />
          </div>
          <div className="grid gap-4 px-10 mb-10 xl:grid-cols-3 sm:grid-cols-2">
            {events.map((event, index) => (
              <MyEventCard
                key={index}
                publicKey={event.publicKey}
                account={event.account}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
