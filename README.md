# Token Creator DApp

## Project Overview

Token Creator DApp is a decentralized application that allows users to create and manage blockchain tokens through a simple web interface. The application supports:

* ERC20 Token Creation
* ERC721 NFT Minting
* ERC1155 Multi-Token Minting
* MetaMask Wallet Integration
* IPFS Storage using Pinata
* Smart Contracts written in Solidity
* Frontend developed using HTML, Tailwind CSS, JavaScript, and Ethers.js

The system enables users to create fungible tokens, unique NFTs, and multi-copy NFTs without directly interacting with smart contract code.

---

# Features

## ERC20 Token

* Create custom ERC20 tokens
* Define token name
* Define token symbol
* Define total supply
* Automatically mint supply to creator wallet

## ERC721 NFT

* Upload NFT image
* Store image on IPFS using Pinata
* Generate metadata automatically
* Mint NFT to connected wallet
* Unique Token ID generated automatically

## ERC1155 NFT

* Upload image
* Store metadata on IPFS
* Create multiple copies of the same NFT
* Specify token ID and amount
* Mint tokens to any wallet address

---

# Technology Stack

## Frontend

* HTML5
* Tailwind CSS
* JavaScript
* Ethers.js v6

## Backend / Blockchain

* Solidity 0.8.20
* OpenZeppelin Contracts
* Hardhat / Remix IDE

## Wallet

* MetaMask

## Storage

* Pinata
* IPFS

---

# Prerequisites

Before running the project, ensure the following software is installed:

### Node.js

Version 18 or later

Download:

https://nodejs.org

### MetaMask

Install MetaMask browser extension.

https://metamask.io

### Git

Download:

https://git-scm.com

### Pinata Account

Create a free account and generate a JWT API key.

https://pinata.cloud

---

# Dependencies

Install the following packages:

```bash
npm install
```

Or manually install:

```bash
npm install ethers
npm install @openzeppelin/contracts
npm install hardhat
```

---

# Smart Contracts

## ERC20

### MyERC20.sol

Responsible for creating ERC20 tokens and minting initial supply.

### ERC20Factory.sol

Factory contract used to deploy new ERC20 token contracts.

---

## ERC721

### MyNFT.sol

Responsible for minting ERC721 NFTs and storing metadata URI.

### ERC721Factory.sol

Factory contract used to deploy ERC721 NFT collections.

---

## ERC1155

### MyERC1155.sol

Responsible for minting ERC1155 tokens with multiple copies.

---

# Installation Instructions

## Clone Repository

```bash
git clone <repository-url>
```

Move into project folder:

```bash
cd token-creator
```

---

## Install Dependencies

```bash
npm install
```

---

# Configuration

## Configure Pinata

Open app.js

Replace:

```javascript
const PINATA_JWT = "YOUR_PINATA_JWT";
```

with your Pinata JWT key.

---

## Configure Smart Contract Addresses

Update deployed contract addresses in app.js:

```javascript
const ERC20_FACTORY = "0xd8bD34C7444F728B9A963fFacdC0577d6F33c4F0";

const ERC721_ADDRESS = "0x14E9FE24a0462f54dbEdA69E9c033b32e4808ea6";

const ERC1155_ADDRESS = "0x310C90c6feA2A64a0447AdE8f692a48b9e849197";
```

---

# Deploy Smart Contracts

## Using Remix IDE

1. Open Remix IDE
2. Compile contracts using Solidity 0.8.20
3. Connect MetaMask
4. Deploy contracts
5. Copy deployed contract addresses
6. Paste addresses into app.js

---

# Running the Application

If using Live Server:

```bash
npx live-server
```

or open:

```bash
index.html
```

in a browser.

---

# Usage Guidelines

## Connect Wallet

1. Open application
2. Click "Connect Wallet"
3. Approve MetaMask connection

---

## Create ERC20 Token

1. Select ERC20 tab
2. Enter token name
3. Enter token symbol
4. Enter total supply
5. Click Create ERC20
6. Confirm MetaMask transaction
7. Token contract is created

---

## Create ERC721 NFT

1. Select ERC721 tab
2. Enter NFT name
3. Enter NFT symbol
4. Upload image
5. Click Create NFT
6. Image uploaded to IPFS
7. Metadata uploaded to IPFS
8. Confirm MetaMask transaction
9. NFT is minted to connected wallet

---

## Create ERC1155 NFT

1. Select ERC1155 tab
2. Enter recipient address
3. Enter token ID
4. Enter amount
5. Upload image
6. Click Mint
7. Confirm MetaMask transaction
8. ERC1155 tokens are minted



# IPFS Workflow

The application follows these steps:

1. User uploads image
2. Image stored on IPFS via Pinata
3. Image CID generated
4. Metadata JSON created
5. Metadata uploaded to IPFS
6. Metadata URI stored on blockchain
7. NFT references metadata permanently

---

# Testing

## ERC20 Testing

* Create token
* Verify transaction
* Import token address into MetaMask
* Check token balance

## ERC721 Testing

* Mint NFT
* Verify ownership
* Check token URI
* Verify metadata on IPFS

## ERC1155 Testing

* Mint tokens
* Verify token balance
* Transfer tokens
* Check metadata URI

---

# Security Considerations

* Never expose private keys.
* Store Pinata JWT securely.
* Verify contract addresses before deployment.
* Use test networks before mainnet deployment.

---

# Future Enhancements

* NFT Marketplace Integration
* NFT Transfer Dashboard
* Burn Functionality
* Batch ERC1155 Minting
* NFT Collection Management
* Admin Dashboard
* Multi-Chain Support

---

# Author

Varsha Prasad A V

Token Creator DApp using Solidity, IPFS, Pinata, MetaMask, Ethers.js, and Tailwind CSS.
