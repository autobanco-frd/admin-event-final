
import { SponsoredEvent as CollaborationCardProp } from "@/services/get-sponsored-events.service"
import { WithdrawEarningsFeature } from "./withdraw-earnings/withdraw-earnings.feature";

export default function CollaborationCard(sponsoredEvent: CollaborationCardProp) {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl hover:border hover:border-indigo-100">
      <h3 className="font-bold mb-2 text-xl text-center">{sponsoredEvent.event.account.name}</h3>
      <p className="mb-5 text-lg text-center"> Colaboraste con: {sponsoredEvent.tokens.toFixed(0)} tokens</p>
      <div>
        {
            !sponsoredEvent.event.account.active ? (
              <div className="flex gap-6 justify-end">

                <WithdrawEarningsFeature
                  publicKey={sponsoredEvent.event.publicKey}
                  account={sponsoredEvent.event.account}
                ></WithdrawEarningsFeature>
                
                </div>
            ):(
              <div className="flex gap-6 justify-center">
                <p className="font-bold mb-4 text-lg text-center">*¡Este evento no ha finalizado!*</p>
              </div>
            )
        }
    </div>
    </div>
  );
}