# Token Creator DApp

A beginner-friendly decentralized application (DApp) for creating and managing blockchain tokens without writing Solidity smart contracts.

---

# Project Overview

The **Token Creator DApp** is a blockchain-based web application that allows users to create and manage different types of Ethereum tokens through a simple graphical user interface.

Normally, creating blockchain tokens requires knowledge of Solidity programming, smart contract deployment, and blockchain interaction. This project removes that complexity by allowing users to create tokens simply by filling out a form and approving the transaction in MetaMask.

The application communicates with smart contracts deployed on the **Hoodi Testnet** using **Ethers.js**. All blockchain transactions are signed securely through **MetaMask**.

For NFT standards (**ERC-721** and **ERC-1155**), the application uploads images and metadata to **IPFS** using **Pinata**, ensuring decentralized and permanent storage.

This project is intended for:

* Students learning blockchain development
* Beginners who want to understand Ethereum token standards
* Developers who want a simple interface for token creation
* Educational and internship demonstrations

---

# Problem Statement

Developing blockchain applications can be difficult for beginners because it requires:

* Knowledge of Solidity programming
* Understanding of smart contracts
* Experience with blockchain deployment
* Familiarity with wallet integration
* Knowledge of decentralized storage such as IPFS

Many users simply want to create a token without learning all these technologies.

The Token Creator DApp solves this problem by providing a no-code interface where users only enter the required details, and the application performs all blockchain interactions automatically.

---

# Objectives

The objectives of this project are:

* Provide a simple interface for blockchain token creation.
* Demonstrate Ethereum token standards.
* Integrate MetaMask for secure wallet authentication.
* Store NFT images and metadata using IPFS.
* Deploy tokens on the Hoodi Testnet.
* Allow users to transfer created tokens.
* Display created tokens in galleries.
* Help beginners understand blockchain development.

---

# Features

## Wallet Connection

The application allows users to securely connect their MetaMask wallet before performing any blockchain transaction.

Features include:

* Connect MetaMask wallet
* Display connected wallet address
* Detect current blockchain network
* Request transaction approval

---

## ERC-20 Token Creation

The ERC-20 module allows users to create fungible tokens.

Users can:

* Enter token name
* Enter token symbol
* Specify total supply
* Deploy a new ERC-20 contract
* View token details
* View all created ERC-20 tokens
* Transfer tokens to another wallet
* View transaction details in Hoodi Explorer

---

## ERC-721 NFT Creation

The ERC-721 module allows users to create unique NFTs.

Users can:

* Upload an image
* Upload metadata to IPFS
* Mint an NFT
* View NFT gallery
* Transfer NFT ownership
* View token details
* Open transaction details

---

## ERC-1155 Token Creation

The ERC-1155 module allows users to create multiple copies of the same NFT.

Users can:

* Upload NFT image
* Create multiple copies
* Mint ERC-1155 tokens
* View gallery
* Transfer copies
* Check balances
* View blockchain transaction details

---

## NFT Gallery

The application includes dedicated galleries for both ERC-721 and ERC-1155 NFTs.

The galleries display:

* NFT Image
* Token ID
* Owner Address
* Contract Address
* Explorer Link

---

## IPFS Integration

NFT images and metadata are stored using Pinata.

Benefits:

* Decentralized storage
* Permanent metadata
* Faster content retrieval
* Secure NFT storage

---

# Technology Stack

## Frontend

* HTML5
* Tailwind CSS
* JavaScript (ES6)

The frontend provides the graphical interface used by users to interact with blockchain smart contracts.

---

## Blockchain

* Solidity
* Ethereum
* Hoodi Testnet

Smart contracts are written in Solidity and deployed on the Hoodi Testnet.

---

## Libraries

### Ethers.js

Used for:

* Connecting MetaMask
* Calling smart contracts
* Sending blockchain transactions
* Reading blockchain data

### OpenZeppelin Contracts

Provides secure implementations of:

* ERC20
* ERC721
* ERC1155

---

## Wallet

### MetaMask

MetaMask is used to:

* Connect wallet
* Sign transactions
* Switch blockchain networks
* Pay transaction fees

---

## Decentralized Storage

### Pinata

Pinata is used to upload:

* NFT Images
* NFT Metadata

### IPFS

IPFS stores NFT data in a decentralized manner instead of a centralized server.

---

## Development Tools

* Remix IDE
* Node.js
* npm
* Visual Studio Code
* Live Server Extension

---

# System Architecture

```
                 User
                   │
                   ▼
        Token Creator Frontend
     (HTML + CSS + JavaScript)
                   │
             Ethers.js Library
                   │
                   ▼
             MetaMask Wallet
                   │
                   ▼
             Hoodi Testnet
                   │
      --------------------------
      | ERC20 Factory Contract |
      | ERC721 Factory Contract|
      | ERC1155 Factory Contract|
      --------------------------
                   │
          Pinata + IPFS Storage
```

### Architecture Explanation

1. The user interacts with the web application.
2. The frontend sends requests using Ethers.js.
3. MetaMask signs blockchain transactions.
4. Transactions are sent to the Hoodi Testnet.
5. Factory contracts deploy new token contracts.
6. NFT images and metadata are uploaded to Pinata.
7. Pinata stores the files on IPFS.
8. The application displays transaction details and created tokens.

---

# Project Structure

```
INTERNSHIP/
│
├── contracts/
│   ├── ERC20Factory.sol
│   ├── ERC721Factory.sol
│   ├── ERC1155Factory.sol
│   ├── MyERC20.sol
│   ├── MyNFT.sol
│   └── MyERC1155.sol
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   
│   
│
├── package.json
├── .env
└── README.md
```

## Folder Description

### contracts/

Contains all Solidity smart contracts used to deploy and manage blockchain tokens.

### frontend/

Contains the complete user interface including HTML pages, JavaScript logic, ABI files, and project assets.

### package.json

Lists all project dependencies required to run the application.

### .env

Stores environment variables such as the Pinata JWT used for uploading NFT images and metadata.

### README.md

Provides complete project documentation, installation instructions, configuration steps, usage guidelines, and troubleshooting information.

---

# Project Workflow

1. User opens the application.
2. User connects MetaMask.
3. User selects the token standard.
4. User enters the required information.
5. NFT images are uploaded to Pinata (for ERC-721 and ERC-1155).
6. MetaMask requests transaction approval.
7. The deployed factory contracts create the requested token contract.
8. Transaction details are displayed.
9. Users can view and transfer the created tokens using the application.
# Installation and Configuration Guide

This section explains how to download, configure, deploy, and run the project on your local machine. Follow each step carefully.

---

# Prerequisites

Before running the project, install the following software on your computer.

## 1. Install Git

Git is used to clone (download) the project from GitHub.

### Download Git

Visit:

```text
https://git-scm.com/downloads
```

Install Git according to your operating system.

Verify the installation:

```bash
git --version
```

Example Output:

```text
git version 2.48.1
```

---

## 2. Install Node.js

Node.js is required to install the JavaScript dependencies used by the project.

Download Node.js from:

```text
https://nodejs.org/
```

Install the **LTS (Long Term Support)** version.

Verify installation:

```bash
node -v
```

Example:

```text
v22.17.1
```

Verify npm:

```bash
npm -v
```

---

## 3. Install Visual Studio Code

Visual Studio Code is used to edit and run the frontend.

Download:

```text
https://code.visualstudio.com/
```

---

## 4. Install Live Server Extension

The frontend is a static web application, so it should be opened using Live Server instead of opening the HTML file directly.

### Steps

1. Open Visual Studio Code.
2. Open **Extensions**.
3. Search for **Live Server**.
4. Install the extension developed by **Ritwick Dey**.

---

## 5. Install MetaMask

MetaMask is required to connect your wallet and sign blockchain transactions.

Install it from:

```text
https://metamask.io/download/
```

After installation:

* Create a new wallet **or**
* Import an existing wallet.

Save your Secret Recovery Phrase securely.

---

## 6. Create a Pinata Account

Pinata is used to upload NFT images and metadata to IPFS.

### Step 1

Visit:

```text
https://pinata.cloud/
```

### Step 2

Click **Sign Up**.

### Step 3

Create your account.

### Step 4

Verify your email.

### Step 5

Login to your Pinata dashboard.

---

## 7. Generate a Pinata JWT

The application uses a JWT (JSON Web Token) to upload files securely to Pinata.

### Steps

1. Open the Pinata Dashboard.
2. Navigate to **API Keys**.
3. Click **Create API Key**.
4. Enter a name for the key.
5. Grant the required permissions.
6. Create the key.
7. Copy the generated JWT.

Keep this JWT secure because it allows the application to upload files to your Pinata account.

---

# Clone the Repository

Clone the project from GitHub.

```bash
git clone https://github.com/varshaprasadav/INTERNSHIP.git
```

Move into the project folder.

```bash
cd INTERNSHIP
```

The project files are now available on your local machine.

---

# Install Project Dependencies

Install all required packages.

```bash
npm install
```

This command reads the **package.json** file and downloads all required project dependencies.

After installation, a **node_modules** folder will be created automatically.

---

# Configure Environment Variables

Create a file named:

```text
.env
```

inside the project root directory.

Example:

```env
PINATA_JWT=YOUR_PINATA_JWT
```

Replace **YOUR_PINATA_JWT** with the JWT copied from your Pinata account.

> **Important:** Do not upload the `.env` file to GitHub because it contains private credentials.

---

# Deploy Smart Contracts Using Remix IDE

The frontend interacts with deployed smart contracts. Before running the application, the factory contracts must be deployed.

## Step 1: Open Remix IDE

Open your browser and visit:

```text
https://remix.ethereum.org/
```

---

## Step 2: Upload the Contracts

Open the `contracts` folder from this project and upload the following files into Remix:

* ERC20Factory.sol
* ERC721Factory.sol
* ERC1155Factory.sol
* MyERC20.sol
* MyNFT.sol
* MyERC1155.sol

---

## Step 3: Compile the Contracts

1. Open the **Solidity Compiler** tab.
2. Select the correct compiler version.
3. Compile each contract.
4. Ensure there are no compilation errors.

---

## Step 4: Connect MetaMask

Open **Deploy & Run Transactions**.

Select the environment:

```text
Injected Provider - MetaMask
```

MetaMask will ask for permission.

Click **Connect**.

---

## Step 5: Deploy Factory Contracts

Deploy the following contracts one by one:

* ERC20Factory
* ERC721Factory
* ERC1155Factory

For each deployment:

1. Click **Deploy**.
2. MetaMask opens automatically.
3. Review the transaction.
4. Click **Confirm**.
5. Wait for the transaction to be mined.

After deployment, Remix displays the deployed contract.

Example:

```text
ERC20Factory at

0x1234567890abcdef1234567890abcdef12345678
```

This hexadecimal value is the **contract address**.

Copy the contract address for each deployed factory contract.

---

# Configure Contract Addresses

Open:

```text
frontend/app.js
```

Locate the contract address variables.

Example:

```javascript
const ERC20_FACTORY = "";

const MyNFT = "";

const ERC1155_FACTORY = "";
```

Replace them with the addresses copied from Remix.

Example:

```javascript
const ERC20_FACTORY =
"0x1234567890abcdef1234567890abcdef12345678";

const MyNFT =
"0xabcdef1234567890abcdef1234567890abcdef12";

const ERC1155_FACTORY =
"0x9876543210abcdef9876543210abcdef98765432";
```

Save the file.

---

# Run the Application

Open the project in Visual Studio Code.

Navigate to the `frontend` folder.

Right-click `index.html`.

Select:

```text
Open with Live Server
```

The browser automatically opens the application.

Example URL:

```text
http://127.0.0.1:5501/TokenCreatorDApp/frontend/index.html
```

---

# Connect MetaMask

When the application opens:

1. Click **Connect Wallet**.
2. MetaMask will appear.
3. Select your wallet account.
4. Click **Connect**.
5. Ensure MetaMask is connected to the **Hoodi Testnet**.

The wallet address will now be displayed on the application, and you can begin creating ERC-20, ERC-721, and ERC-1155 tokens.

---

# Installation Summary

Before using the application, ensure you have completed the following:

* ✅ Installed Git
* ✅ Installed Node.js and npm
* ✅ Installed Visual Studio Code
* ✅ Installed Live Server
* ✅ Installed MetaMask
* ✅ Created a Pinata account
* ✅ Generated a Pinata JWT
* ✅ Created the `.env` file
* ✅ Cloned the repository
* ✅ Installed project dependencies using `npm install`
* ✅ Deployed the factory contracts using Remix IDE
* ✅ Updated the deployed contract addresses in `frontend/app.js`
* ✅ Started the frontend using Live Server
* ✅ Connected MetaMask to the Hoodi Testnet
# Usage Guide

After completing the installation and configuration steps, you can start using the Token Creator DApp to create and manage blockchain tokens.

---

# Launching the Application

1. Open the application using **Live Server**.
2. The application opens in your default web browser.
3. Make sure MetaMask is installed and unlocked.
4. Ensure MetaMask is connected to the **Hoodi Testnet**.

The application home page displays options for:

* Connect Wallet
* Create ERC-20 Token
* Create ERC-721 NFT
* Create ERC-1155 Token
* Transfer Tokens
* View NFT Galleries

---

# Connecting Your Wallet

Before performing any blockchain operation, you must connect your MetaMask wallet.

## Steps

1. Click the **Connect Wallet** button.
2. MetaMask will open automatically.
3. Select the wallet account you want to use.
4. Click **Connect**.
5. Approve the connection request.

Once connected, the application displays your wallet address.

> **Note:** If MetaMask is connected to a different network, switch to the Hoodi Testnet before continuing.

---

# Creating an ERC-20 Token

ERC-20 tokens are fungible tokens where each token has the same value.

## Steps

1. Open the **ERC-20** section.
2. Enter the following details:

| Field        | Description                        |
| ------------ | ---------------------------------- |
| Token Name   | Name of your token (e.g., MyToken) |
| Token Symbol | Short symbol (e.g., MTK)           |
| Total Supply | Number of tokens to create         |

3. Click **Create ERC-20 Token**.
4. MetaMask will open and display the transaction.
5. Review the transaction details.
6. Click **Confirm**.

After the transaction is confirmed, the application displays:

* Token Name
* Token Symbol
* Total Supply
* Token Contract Address
* Transaction Hash
* Hoodi Explorer Link

The newly created token is also added to the **My ERC-20 Tokens** section.

---

# Viewing ERC-20 Tokens

To view the ERC-20 tokens created through the application:

1. Click **My ERC-20 Tokens**.
2. The application retrieves all ERC-20 tokens deployed by the connected wallet.
3. Click on a token to view its details.

The displayed information includes:

* Token Name
* Symbol
* Total Supply
* Contract Address

---

# Transferring ERC-20 Tokens

Users can transfer ERC-20 tokens to another wallet.

## Steps

1. Open the **Transfer ERC-20** section.
2. Enter:

| Field             | Description                    |
| ----------------- | ------------------------------ |
| Recipient Address | Wallet address of the receiver |
| Amount            | Number of tokens to transfer   |

3. Click **Transfer**.
4. MetaMask will request transaction approval.
5. Click **Confirm**.

After the transaction is mined, the recipient receives the transferred tokens.

---

# Creating an ERC-721 NFT

ERC-721 is used to create unique Non-Fungible Tokens.

## Steps

1. Open the **ERC-721** section.
2. Enter the NFT name.
3. Select an image from your computer.
4. The application uploads the image to Pinata.
5. Metadata is automatically generated and uploaded to IPFS.
6. Click **Create ERC-721 NFT**.
7. Confirm the transaction in MetaMask.

After successful minting, the application displays:

* NFT Name
* Token ID
* Contract Address
* Transaction Hash
* Hoodi Explorer Link

The NFT is automatically added to the ERC-721 Gallery.

---

# Viewing the ERC-721 Gallery

The ERC-721 Gallery displays NFTs owned by the connected wallet.

Each NFT card contains:

* NFT Image
* Token ID
* Owner Address
* Contract Address
* Hoodi Explorer Link

Users can click the Explorer link to verify the NFT transaction on the Hoodi blockchain explorer.

---

# Transferring an ERC-721 NFT

NFT ownership can be transferred to another wallet.

## Steps

1. Open the **Transfer ERC-721** section.
2. Enter:

| Field             | Description                    |
| ----------------- | ------------------------------ |
| Recipient Address | Wallet address of the receiver |
| Token ID          | NFT Token ID                   |

3. Click **Transfer NFT**.
4. Approve the MetaMask transaction.
5. Wait for confirmation.

After confirmation, the NFT ownership is transferred to the recipient.

---

# Creating an ERC-1155 Token

ERC-1155 allows multiple copies of the same NFT to be created.

## Steps

1. Open the **ERC-1155** section.
2. Enter:

| Field            | Description          |
| ---------------- | -------------------- |
| Token Name       | Name of the NFT      |
| Number of Copies | Total copies to mint |

3. Upload an image.
4. The application uploads the image and metadata to IPFS.
5. Click **Create ERC-1155 Token**.
6. Confirm the transaction in MetaMask.

After successful minting, the application displays:

* Token ID
* Number of Copies
* Contract Address
* Transaction Hash
* Hoodi Explorer Link

---

# Viewing the ERC-1155 Gallery

The ERC-1155 Gallery displays tokens owned by the connected wallet.

Each card includes:

* NFT Image
* Token ID
* Number of Copies Owned
* Contract Address
* Hoodi Explorer Link

---

# Transferring ERC-1155 Tokens

ERC-1155 allows users to transfer one or more copies of the same token.

## Steps

1. Open the **Transfer ERC-1155** section.
2. Enter:

| Field             | Description                    |
| ----------------- | ------------------------------ |
| Recipient Address | Wallet address of the receiver |
| Token ID          | Token to transfer              |
| Number of Copies  | Quantity to transfer           |

3. Click **Transfer**.
4. Confirm the transaction in MetaMask.
5. Wait until the transaction is confirmed.

After completion, the specified number of copies is transferred to the recipient.

---

# Refreshing the Application

The **Refresh DApp** button resets the user interface.

It performs the following actions:

* Clears input fields.
* Removes success messages.
* Resets temporary form values.
* Refreshes displayed token information.

This action does **not** delete any blockchain data or deployed smart contracts.

---

# Verifying Transactions

Every successful blockchain transaction generates a transaction hash.

The application provides a **Hoodi Explorer** link that allows users to:

* Verify the transaction status.
* View block details.
* View the deployed contract address.
* Check token ownership.
* Confirm transfer history.

This allows users to independently verify that all blockchain operations were successfully recorded.

---

# Testing the Application

To verify that the project works correctly, perform the following tests.

## Test 1: Wallet Connection

* Connect MetaMask.
* Verify that the wallet address is displayed.

---

## Test 2: ERC-20 Token

* Create an ERC-20 token.
* Verify that it appears in **My ERC-20 Tokens**.
* Transfer tokens to another wallet.
* Verify that the recipient receives the transferred tokens.

---

## Test 3: ERC-721 NFT

* Mint an NFT.
* Verify that it appears in the ERC-721 Gallery.
* Transfer the NFT to another wallet.
* Confirm that the new owner can view the NFT.

---

## Test 4: ERC-1155 Token

* Mint an ERC-1155 token with multiple copies.
* Verify that it appears in the ERC-1155 Gallery.
* Transfer some copies to another wallet.
* Verify that both wallets display the correct balances.

Successful completion of these tests confirms that the Token Creator DApp is functioning correctly.
# Troubleshooting

While using the Token Creator DApp, users may encounter some common issues. The following table provides possible causes and recommended solutions.

| Issue                                | Possible Cause                                   | Solution                                                                                             |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| MetaMask is not detected             | MetaMask extension is not installed or disabled  | Install the MetaMask browser extension and refresh the page.                                         |
| Unable to connect wallet             | User rejected the connection request             | Click **Connect Wallet** again and approve the request in MetaMask.                                  |
| Wrong network selected               | MetaMask is connected to another network         | Switch MetaMask to the **Hoodi Testnet** and refresh the application.                                |
| Transaction failed                   | Insufficient Hoodi Testnet ETH                   | Add Hoodi Testnet ETH to your wallet using a faucet before retrying.                                 |
| NFT image upload failed              | Invalid or expired Pinata JWT                    | Verify that the Pinata JWT in the `.env` file is correct.                                            |
| Smart contract interaction failed    | Incorrect factory contract address               | Ensure the deployed contract addresses in `frontend/app.js` match the addresses deployed from Remix. |
| ERC-721 or ERC-1155 gallery is empty | No NFTs have been minted by the connected wallet | Mint an NFT first or connect the wallet that owns the NFTs.                                          |
| Application does not open            | Live Server is not running                       | Start the application using the **Live Server** extension in Visual Studio Code.                     |

---

# Security Considerations

This project interacts with blockchain wallets and decentralized storage. Follow these security practices while using the application.

* Never share your MetaMask Secret Recovery Phrase.
* Never share your MetaMask private key.
* Keep your Pinata JWT confidential.
* Do not upload the `.env` file to GitHub.
* Always verify the recipient wallet address before transferring tokens.
* Review every MetaMask transaction carefully before clicking **Confirm**.
* Use only the supported Hoodi Testnet while testing the application.

---

# Future Enhancements

The current version provides the core functionality required to create and manage ERC-20, ERC-721, and ERC-1155 tokens. Future improvements may include:

* Support for additional blockchain networks such as Ethereum Mainnet, Sepolia, Polygon, and Binance Smart Chain.
* Token burning functionality.
* Batch NFT minting.
* NFT marketplace integration.
* Search and filter options for created tokens.
* Transaction history for each connected wallet.
* Dashboard with blockchain statistics and analytics.
* Mobile-responsive user interface enhancements.
* Dark mode support.
* User profile and activity tracking.

---

# Limitations

The current implementation has the following limitations:

* Supports only the Hoodi Testnet.
* Requires MetaMask for wallet connection.
* Uses Pinata for IPFS storage.
* Smart contracts must be deployed manually using Remix IDE.
* Internet connectivity is required for blockchain interactions and IPFS uploads.

---

# Conclusion

The **Token Creator DApp** provides a simple and user-friendly approach to blockchain token creation by allowing users to create **ERC-20**, **ERC-721**, and **ERC-1155** tokens without writing Solidity code.

By integrating **MetaMask**, **Ethers.js**, **Pinata**, and **IPFS**, the application demonstrates the complete workflow of decentralized application development, including wallet authentication, smart contract interaction, decentralized storage, and blockchain transactions.

This project serves as a practical learning resource for students and beginners while also demonstrating the implementation of Ethereum token standards in a real-world decentralized application.

---

# License

This project was developed as part of an internship and is intended for educational purposes.

Users are free to study, modify, and extend the project for learning and academic use. If the project is intended for production use, additional testing, optimization, and smart contract security audits are recommended.

---

# Author

**Name:** Varsha Prasad A V

**Project:** Token Creator DApp

**GitHub Repository:**

```text
https://github.com/varshaprasadav/INTERNSHIP
```

---

# Acknowledgements

The successful completion of this project was made possible through the following technologies, tools, and open-source libraries:

* **Ethereum** – Blockchain platform used for deploying smart contracts.
* **Solidity** – Programming language used to develop the smart contracts.
* **OpenZeppelin Contracts** – Secure implementations of ERC-20, ERC-721, and ERC-1155 standards.
* **Remix IDE** – Online development environment used to compile and deploy smart contracts.
* **MetaMask** – Browser wallet used for blockchain authentication and transaction signing.
* **Ethers.js** – JavaScript library used for interacting with Ethereum smart contracts.
* **Pinata** – Service used to upload NFT images and metadata to IPFS.
* **IPFS (InterPlanetary File System)** – Decentralized storage for NFT assets.
* **Tailwind CSS** – CSS framework used to build the responsive user interface.
* **Node.js and npm** – Runtime environment and package manager used to manage project dependencies.
* **Visual Studio Code** – Source code editor used during development.

The documentation and community support provided by these technologies greatly contributed to the successful development of this project.

---
