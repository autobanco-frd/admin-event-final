import { PublicKey } from "@solana/web3.js";

interface CloseEventInterface {
  publicKey: PublicKey | null,
  program: any,
  eventPublicKey: PublicKey,
}

export async function closeEvent({publicKey, program, eventPublicKey}: CloseEventInterface) {
  if (!publicKey) return;
  console.log(eventPublicKey.toString())

  try {

    const tx = await program.methods
        .closeEvent()
        .accounts({
        event: eventPublicKey,
        authority: publicKey,
        })
        .rpc();

    console.log("TxID: ", tx);

  } catch (e) {
    console.log("EL ERROR: ", e);
  }
};
