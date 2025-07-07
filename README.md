# CairoNFT: AI-Powered NFT Minting on StarkNet

CairoNFT is a full-stack project that enables users to create, customize, and mint NFTs using AI-generated or uploaded artwork, all deployed on the StarkNet blockchain. The project combines a Cairo smart contract for NFT logic with a modern Next.js frontend for a seamless user experience.

---

## Features

- **AI Art Generation:** Users can generate unique artwork using AI by providing creative prompts.
- **NFT Minting:** Mint your AI-generated or uploaded images as ERC721 NFTs on StarkNet.
- **Custom Metadata:** Add names, descriptions, and other metadata to personalize your NFTs.
- **User-Friendly Interface:** Intuitive web UI for creating, uploading, and minting NFTs.
- **Gallery:** View your minted NFTs in a personal gallery.

---

## Project Structure

- [`caironft/`](caironft/) — Cairo smart contract for ERC721 NFTs and related tests.
- [`starknet-ai-nft/`](starknet-ai-nft/) — Next.js frontend for interacting with the contract, generating images, and managing NFTs.

---

## How It Works

1. **Create or Upload Artwork:**  
   Use the web app to generate art with AI or upload your own image.

2. **Customize NFT Details:**  
   Enter a name, description, and any additional metadata.

3. **Mint on StarkNet:**  
   The app uploads your image and metadata to IPFS, then calls the Cairo smart contract to mint your NFT.

4. **View & Share:**  
   See your NFT in your gallery and share it with others.

---

## Getting Started

### Cairo Contract

```sh
cd caironft
scarb build
scarb test
```

### Next.js Frontend

```sh
cd starknet-ai-nft
pnpm install
pnpm dev
```

Configure environment variables in `starknet-ai-nft/.env` (see `.env.example`).

---

## Technologies Used

- **Cairo** for smart contracts ([`caironft/src/lib.cairo`](