"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Calendar } from "lucide-react"

interface NFT {
  id: string
  name: string
  description: string
  image: string
  prompt?: string
  createdAt: string
}

export default function GalleryPage() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  useEffect(() => {
    // Load NFTs from localStorage
    const storedNFTs = localStorage.getItem("mintedNFTs")
    if (storedNFTs) {
      setNfts(JSON.parse(storedNFTs))
    } else {
      // Add some dummy data for demo
      const dummyNFTs: NFT[] = [
        {
          id: "1",
          name: "Cosmic Dreams",
          description: "A beautiful cosmic landscape with swirling galaxies",
          image: "/placeholder.svg?height=300&width=300",
          prompt: "A cosmic landscape with swirling galaxies and nebulae",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Digital Butterfly",
          description: "A vibrant digital butterfly with neon wings",
          image: "/placeholder.svg?height=300&width=300",
          prompt: "A digital butterfly with glowing neon wings",
          createdAt: new Date().toISOString(),
        },
      ]
      setNfts(dummyNFTs)
      localStorage.setItem("mintedNFTs", JSON.stringify(dummyNFTs))
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Your Minted NFTs</h1>
          <Link href="/mint" className="text-purple-600 hover:text-purple-700 transition-colors">
            <Plus className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="p-6">
        {nfts.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No NFTs Yet</h2>
            <p className="text-gray-600 mb-8">Start creating your first AI-powered NFT</p>
            <Link href="/mint">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                Create Your First NFT
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  onClick={() => setSelectedNFT(nft)}
                  className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{nft.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{nft.description}</p>
                    <div className="flex items-center text-purple-600 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(nft.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedNFT.image || "/placeholder.svg"}
                alt={selectedNFT.name}
                className="w-full aspect-square object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedNFT(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedNFT.name}</h2>
              {selectedNFT.description && <p className="text-gray-600">{selectedNFT.description}</p>}
              {selectedNFT.prompt && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-medium text-purple-800 mb-2">AI Prompt:</h4>
                  <p className="text-purple-700 text-sm">{selectedNFT.prompt}</p>
                </div>
              )}
              <div className="flex items-center text-purple-600 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Created on {formatDate(selectedNFT.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
