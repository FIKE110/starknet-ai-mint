'use client';
 
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from '@starknet-react/core';
import { ChevronDown, Loader2, Wallet } from 'lucide-react';
import { StarknetkitConnector, useStarknetkitConnectModal } from 'starknetkit';
import { useBalance } from "@starknet-react/core";
 
 
export function truncate(str:string, maxLength:number) {
  return str.length > maxLength
    ? str.slice(0, maxLength) + '...'
    : str;
}


export function WalletConnectorModal() {
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });
 
  async function connectWallet() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connect({ connector: connector as Connector });
  }
 
  const { address ,status,account} = useAccount();
    const { data, error } = useBalance({
  address: address,
});

  if (!address) {
    return (
       <button
            onClick={connectWallet}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
          >
            {status==='connecting' ? <Loader2  className="w-6 h-6 animate-spin" /> : <Wallet className="w-5 h-5" />}
            <span className="text-md">{status==='connecting' ? "Connecting..." : "Connect"}</span>
          </button>
    );
  }
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Wallet Icon */}
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
              <Wallet className="w-5 h-5 text-white" />
            </div>

            {/* Wallet Info */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">Connected</span>
              </div>
              <div className="font-mono text-gray-800 font-semibold">{truncate(address,14)}</div>
            </div>
          </div>

        
        </div>
        </div>

  );
}