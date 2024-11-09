'use client'

import Image from "next/image";
import Link from "next/link";
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from "next/dynamic";
const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {ssr:false});

export default function Navbar() {
  const { publicKey } = useWallet()

  return (
    <header className="bg-neutral-900 p-4 flex justify-between items-center min-h-20 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-7 w-9 mr-2"
          width="500"
          height="300"
        />
        <h1 className="text-lg font-bold hidden md:block text-zinc-300">Administrador de Eventos</h1>
      </Link>

      <div className="flex items-center gap-4">
        {
          publicKey && (
            <nav>
            <Link href="/mis-eventos" className="mx-2 px-1 font-semibold hover:text-white text-zinc-300">
              Mis Eventos
            </Link>

            <Link href="/colaboraciones" className="mx-2 px-1 font-semibold hover:text-white text-zinc-300">
              Colaboraciones
            </Link>
          </nav>
          )
        }
        <WalletMultiButton style={{}} />
      </div>
    </header>
  );
}
