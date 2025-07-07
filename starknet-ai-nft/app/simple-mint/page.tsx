"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import MintButton from "@/app/components/mint-button"
import { useAccount, useContract, useSendTransaction } from "@starknet-react/core"
import { toast } from "sonner"


export default function QuickMintPage() {
  const [nftAddress, setNftAddress] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const {account,isConnected}=useAccount()

    
  const handleMint = async () => {
    if(!isConnected){
       toast("Connect your wallet to mint")
        throw new Error()
      }
  const call=  await account?.execute([
      {
        contractAddress:nftAddress,
        entrypoint:'mint'
      }
    ])

    toast.success(`Transaction hash ${call?.transaction_hash}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Quick Mint</h1>
          <div className="w-12"></div>
        </div>

        {/* Simple Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Mint Your NFT</h2>

         

          {/* NFT Name */}
          <input
            type="text"
            value={nftAddress}
            onChange={(e) => setNftAddress(e.target.value)}
            placeholder="NFT address"
            className="w-full p-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* Mint Button */}
          <MintButton onMint={handleMint} disabled={!nftAddress} className="w-full" />
        </div>
      </div>
    </div>
  )
}
