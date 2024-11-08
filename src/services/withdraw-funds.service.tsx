import { acceptedMintATA, treasuryVaultPda } from "@/utils/find-pdas";
import { acceptedMint, DECIMALS_PER_USDC } from "@/utils/solana";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

interface WithdrawFundsInterface {
  amount: number;
  publicKey: PublicKey | null,
  program: any,
  eventPublicKey: PublicKey,
}

export async function withdrawFunds({amount, publicKey, program, eventPublicKey}: WithdrawFundsInterface) {
    if (!publicKey) return;
    console.log(eventPublicKey.toString());
    console.log("amount", amount);
  
    try {
      const treasuryVaultPublicKey = treasuryVaultPda({eventPublicKey: eventPublicKey, programId:program.programId});
      const acceptedMintAta = acceptedMintATA(publicKey);
  
      const tx = await program.methods
          .withdrawFunds(new BN(amount*DECIMALS_PER_USDC))
          .accounts({
          authotiryAcceptedMintAta: acceptedMintAta,
          event: eventPublicKey,
          acceptedMint: acceptedMint,
          authority: publicKey,
          treasuryVault: treasuryVaultPublicKey
          })
          .rpc();
  
      console.log("TxID: ", tx);
  
    } catch (e) {
      console.log("EL ERROR: ", e);
    }
};

