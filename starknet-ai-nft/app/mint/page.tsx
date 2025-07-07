'use client'
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Sparkles, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {byteArray, cairo, Call, CallData, Calldata, RawCalldata, shortString, wallet, WalletAccount} from 'starknet'
import { useAccount ,UseAccountResult, useDeployAccount, useProvider, useSendTransaction, useUniversalDeployerContract} from "@starknet-react/core"

 

type FormValues = {
  name: string
  symbol: string
  description: string
}


export default function MintPage() {
  alert("After deploying your NFT smart contract, PLEASE check the nft section of your wallet you can mint your first token by calling the mint function on the contract. You can also use the deploy function to deploy your NFT smart contract to the network.")
  const [activeTab, setActiveTab] = useState<"prompt" | "upload">("prompt")
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {account,isConnected,address}=useAccount()
  const {provider}=useProvider()
  console.log(account,isConnected)


const {udc}=useUniversalDeployerContract({})
const {send,data:dataTransaction}=useSendTransaction({})


  const router = useRouter()
  const { register,getValues, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>()
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const values = watch()
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          symbol: values.symbol,
          description: values.description,
          image: activeTab==='upload' ? uploadedImage : generatedImage,
        }),
      })
      return res.json()
    },
    onSuccess:async (data) => {
      try{
        const encoder=new TextEncoder()
        const classHash= process.env.NEXT_PUBLIC_CLASS_HASH as `0x${string}`
          toast.success("Metadata uploaded successfully")

          console.log(account);
            const contractConstructor: Calldata = CallData.compile([
              address as `0x${string}`,
              byteArray.byteArrayFromString(data.url),
             byteArray.byteArrayFromString(getValues('name')), 
            byteArray.byteArrayFromString(getValues('symbol'))
            ]
            );

          const uniqueSalt = Math.floor(Math.random() * 1_000_000_000_000);
          const trans:Call=await udc?.populate('deploy_contract',[
            classHash,
            uniqueSalt,
            false,
            contractConstructor
          ]) as Call
          console.log(trans)
          toast.success("Transaction is being sent, please wait...")
          send([trans])
          if(dataTransaction) toast.success(`Transaction confirmed , hash is at ${dataTransaction.transaction_hash}`)
          toast.message(`
            IF your wallet accepted the transfer, then your NFT smart contract has been deployed successfully.
          `)
          toast.message(`If you are using a testnet, please wait for the transaction to be confirmed on the network. If you are using mainnet, it may take a few minutes for the transaction to be processed.`)
            toast.message("You can now mint your NFT by calling the mint function on the contract.")
          reset()
        }
        catch(e:any){
          toast.error(e.message)
        }
    },
    onError:(e)=>{
      toast.error(e.message)
    }
  })

  const { mutate: mutateImage } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/gen-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      return res.json()
    },
    onSuccess: (data) => {
      setGeneratedImage(`data:image/png;base64,${data.image}`)
      setIsGenerating(false)
      toast.success("Ai Image has been generated")
    },
    onError:(e)=>{
      setGeneratedImage(null)
      setIsGenerating(false)
      toast.error(e.message)
    }
  })

  const generateImageFromPrompt = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    mutateImage()
  }

  const clearGeneratedImage = () => {
    setGeneratedImage(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMint = async (data: FormValues) => {
    if (!data.name || (!prompt && !uploadedImage)) return
      if(data.name || data.description || data.symbol){
        if(!isConnected){
          toast.error("Please connect your wallet before mint")
          return
        }
         toast.promise(
     mutateAsync(),
     {
       loading: 'Deploying your NFT smart contract',
       success: 'Deployed successfully',
       error: 'Failed to deploy',
     },

   );
    }
    else{
      toast.error("Fill all required fields")
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
      <main className="p-6 max-w-md mx-auto space-y-6">
        <h2 className="font-bold text-lg text-amber-900">Create your NFT smart contract and mint your first token</h2>
        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-purple-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("prompt")}
              className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "prompt"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "upload"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "prompt" ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              {!generatedImage ? (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Enter your prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the NFT you want to create..."
                    className="w-full h-32 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </>
              ) : (
                <img
                  src={generatedImage}
                  alt="Generated NFT preview"
                  className="w-full aspect-square object-cover rounded-xl border border-purple-200"
                />
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={generateImageFromPrompt}
                  disabled={!prompt.trim() || isGenerating}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Preview</span>
                    </div>
                  )}
                </button>
                {generatedImage && (
                  <button
                    onClick={clearGeneratedImage}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Image</label>
              <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="w-32 h-32 object-cover rounded-xl mx-auto"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-purple-600 font-medium hover:text-purple-700">Click to upload</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleMint)} className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">NFT Name</label>
              <input
                {...register("name", { required: "NFT name is required" })}
                placeholder="Enter NFT name"
                className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">NFT Symbol</label>
              <input
                {...register("symbol")}
                placeholder="Enter NFT symbol"
                className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">NFT Description</label>
              <textarea
                {...register("description")}
                placeholder="Describe your NFT"
                className="w-full h-24 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Minting NFT...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Mint NFT</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
