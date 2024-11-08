import { DECIMALS_PER_USDC } from "@/utils/solana";
import { CloseEventFeature } from "./close-event/close-event.feature";
import { EventAccount } from "@/services/get-events.service";
import { WithdrawFundsFeature } from "./withdraw-funds/withdraw-funds.feature";

export default function MyEventCard(myEvent: EventAccount) {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl hover:border hover:border-indigo-100">
      <h3 className="font-bold mb-4 text-xl text-center">{myEvent.account.name}</h3>
      <div className="flex gap-6 justify-center">
            <div className="px-4 py-2 rounded basis-[50%] bg-white mb-4">
                <h6 className="font-semibold text-center mb-2"> Bóveda del Evento</h6>
                <div>
                    <p>Precio token: {1}</p>
                    <p>Colaboradores: {myEvent.account.sponsors.toNumber().toFixed(0)}</p>
                    <p>Total: {(myEvent.account.treasuryVaultTotal.toNumber()/DECIMALS_PER_USDC).toFixed(0)}</p>
                </div>
            </div>
            <div className="px-4 py-2 rounded basis-[50%] bg-white mb-4">
                <h6 className="font-semibold text-center mb-2"> Bóveda de Ganancias</h6>
                <div>
                    <p>Precio ticket: {myEvent.account.ticketPrice.toNumber().toFixed(0)}</p>
                    <p>Tickets vendidos:{myEvent.account.ticketsSold.toNumber().toFixed(0)}</p>
                    <p>Total: {(myEvent.account.gainVaultTotal.toNumber()/DECIMALS_PER_USDC).toFixed(0)}</p>
                </div>
            </div>
        </div>
      <div className="flex gap-6 justify-end">
        
        <WithdrawFundsFeature
         publicKey={myEvent.publicKey}
         account={myEvent.account}
        ></WithdrawFundsFeature>
        {
            myEvent.account.active && (
              <CloseEventFeature 
              publicKey={myEvent.publicKey}
              account={myEvent.account} ></CloseEventFeature>
            )
        }
      </div>
    </div>
  );
}