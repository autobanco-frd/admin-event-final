import { BN } from "bn.js";
import { acceptedMintATA, gainVaultPda } from "@/utils/find-pdas";
import { PublicKey } from "@solana/web3.js";
import { acceptedMint, DECIMALS_PER_USDC } from "@/utils/solana";

interface buyTicketsInterface {
  quantity: number,
  publicKey: PublicKey | null,
  program: any,
  eventPublicKey: PublicKey,
}

export async function buyTickets({ quantity, publicKey, program, eventPublicKey}: buyTicketsInterface) {
  if (!publicKey) return;
  console.log(eventPublicKey.toString())
  console.log("quantity", quantity)

  try {
    const gainVaultPublicKey = gainVaultPda({eventPublicKey: eventPublicKey, programId:program.programId});
    const acceptedMintAta = acceptedMintATA(publicKey);

    const tx = await program.methods
        .buyTickets(new BN(quantity))
        .accounts({
        payerAcceptedMintAta: acceptedMintAta,
        event: eventPublicKey,
        acceptedMint: acceptedMint,
        authority: publicKey,
        gainVault: gainVaultPublicKey
        })
        .rpc();

    console.log("TxID: ", tx);

  } catch (e) {
    console.log("EL ERROR: ", e);
  }
};

