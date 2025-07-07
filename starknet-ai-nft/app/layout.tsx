'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "./components/starknet-provider";
import { InjectedConnector } from "starknetkit/injected"
import { WebWalletConnector } from "starknetkit/webwallet"
import { publicProvider, StarknetConfig, voyager } from "@starknet-react/core";
import { mainnet, sepolia } from "@starknet-react/chains";
import { Connector } from "starknetkit";

import { alchemyProvider ,jsonRpcProvider} from "@starknet-react/core";
import { Toaster } from "sonner";
import { Sparkles } from "lucide-react";
import { WalletConnectorModal } from "./components/wallet-connector";
import Link from "next/link";
import Providers from "./components/react-query-provider";
import { RpcProvider } from "starknet";

const connectors = [
  new InjectedConnector({
    options: { id: "argentX", name: "Argent X" },
  }),
  new InjectedConnector({
    options: { id: "braavos", name: "Braavos" },
  }),
  new WebWalletConnector({ url: "https://web.argent.xyz" }),
]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarknetConfig
          chains={[sepolia]}
          provider={publicProvider()}
          connectors={connectors as Connector[]}
          explorer={voyager}
        >
          <StarknetProvider
        >
          <Toaster />
          
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      
            <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <Link href='/' className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          
          
          <div>
            <span className="text-white font-bold text-xl">AI Minter</span>
            <div className="text-purple-200 text-xs">Powered by AI</div>
          </div>
          </Link>
        </div>
          <WalletConnectorModal />
        </header>
        <Providers>
          {children}
        </Providers>
         
          </div>
          
        </StarknetProvider>
        </StarknetConfig>
      </body>
    </html>
  );
}
