"use client"

import { useState } from "react"
import { Sparkles, Loader2, CheckCircle } from "lucide-react"

interface MintButtonProps {
  onMint: () => Promise<void>
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function MintButton({ onMint, disabled = false, className = "", size = "lg" }: MintButtonProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)

  const handleMint = async () => {
    if (disabled || isMinting) return

    setIsMinting(true)
    try {
      await onMint()
      setMintSuccess(true)
      setTimeout(() => setMintSuccess(false), 3000)
    } catch (error) {
      console.error("Minting failed:", error)
    } finally {
      setIsMinting(false)
    }
  }

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <button
      onClick={handleMint}
      disabled={disabled || isMinting}
      className={`
        group relative font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:transform-none disabled:shadow-none
        ${
          mintSuccess
            ? "bg-gradient-to-r from-green-500 to-emerald-500"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400"
        }
        text-white ${sizeClasses[size]} ${className}
      `}
    >
      {mintSuccess ? (
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className={iconSizes[size]} />
          <span>Minted Successfully!</span>
        </div>
      ) : isMinting ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
          <span>Minting...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className={`${iconSizes[size]} group-hover:animate-pulse`} />
          <span>Mint NFT</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
    </button>
  )
}
