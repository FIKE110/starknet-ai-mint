"use client"

import Link from "next/link"
import { Sparkles, Zap, Palette, Brain, Rocket, Star, ArrowRight, Play, Share } from "lucide-react"
import { WalletConnectorModal } from "./components/wallet-connector"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-3000"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/10 rotate-45 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400/20 rotate-12 animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-indigo-400/20 rounded-full animate-bounce animation-delay-4000"></div>
      </div>


      <main className="relative z-10 px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="max-w-lg mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-purple-200 text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered NFT Creation</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Mint Your Next
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent block">
                  AI NFT
                </span>
              </h1>
              <p className="text-purple-200 text-lg md:text-xl leading-relaxed">
                Transform your imagination into unique digital art. Create stunning NFTs with AI-powered generation or
                upload your own masterpieces.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/mint">
                <button className="group relative w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl my-6  ">
                  <div className="flex items-center justify-center space-x-3">
                    <Zap className="w-6 h-6 group-hover:animate-pulse" />
                    <span className="text-lg">Start Minting</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                </button>
              </Link>
              <Link href="/simple-mint">
                <button className="mb-4 group w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Simple mint(use generated address)</span>
                  </div>
                </button>
              </Link>
              <Link href="/gallery">
                <button className="group w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>View Gallery</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto py-16 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose AI Minter?</h2>
            <p className="text-purple-200 text-lg">Experience the future of digital art creation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Generation</h3>
              <p className="text-purple-200 leading-relaxed">
                Transform simple text prompts into stunning visual art using cutting-edge AI technology.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Artwork</h3>
              <p className="text-purple-200 leading-relaxed">
                Upload your own images and transform them into unique NFTs with professional metadata.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Minting</h3>
              <p className="text-purple-200 leading-relaxed">
                Create and mint your NFTs in seconds with our streamlined, user-friendly interface.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section
        <div className="max-w-4xl mx-auto py-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">1K+</div>
                <div className="text-purple-200 text-sm">NFTs Created</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-purple-200 text-sm">Happy Artists</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
                <div className="text-purple-200 text-sm">AI Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">∞</div>
                <div className="text-purple-200 text-sm">Possibilities</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto py-16 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
            <p className="text-purple-200 text-lg">Create your NFT in three simple steps</p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Create or Upload</h3>
                <p className="text-purple-200">
                  Write a creative prompt for AI generation or upload your existing artwork.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Customize Details</h3>
                <p className="text-purple-200">
                  Add your NFT name, description, and any additional metadata you want to include.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Mint & Enjoy</h3>
                <p className="text-purple-200">
                  Hit the mint button and watch your unique NFT come to life in your personal gallery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center py-16 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Create Magic?</h2>
            <p className="text-purple-200 text-lg">
              Join thousands of artists who are already creating stunning NFTs with AI technology.
            </p>
          </div>

          <Link href="/mint">
          <button className="group bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg">
                        <div className="flex items-center justify-center space-x-3">
                          <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                          <span>Start Creating Now</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
          </Link>
            
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-6 border-t border-white/10">
        <p className="text-purple-300 text-sm">© 2024 AI Minter. Powered by artificial intelligence and creativity.</p>
      </footer>
    </div>
  )
}
