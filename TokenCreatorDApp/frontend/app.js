// ==========================
// CONTRACT ADDRESSES
// ==========================

const ERC20_FACTORY =
"0xd8bD34C7444F728B9A963fFacdC0577d6F33c4F0";

const ERC721_FACTORY =
"0x7bad39068C5f121b95c8705C788fE9baEe9d6a39";

const ERC1155_ADDRESS =
"0x310C90c6feA2A64a0447AdE8f692a48b9e849197";

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxODY0MjhmNC0wMWFmLTQ5Y2YtYjAwZS0wYTI5Njc1YjY0YjEiLCJlbWFpbCI6InZhcnNoYXByYXNhZDIwMTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZjMzU3ZTM1ZThlMjFkMzBhYjMzIiwic2NvcGVkS2V5U2VjcmV0IjoiNGZlNjQ0MzU0NjhlM2M0ZTdiZWU4MDMyZmFmNzlkMzkyN2M3OWNiNjRlZTRmM2Q1ZWI5NjY5OTFjZjFkZGEzZCIsImV4cCI6MTgxMjc4NTEwMX0.N1O4AlfJS8cf0lnGTjgt1PY60JvB6ivCvWjQ-rj1Lw0";

// ==========================
// ABIs
// ==========================

const ERC20_ABI = [

"event TokenCreated(address tokenAddress,address owner)",

"function createToken(string name,string symbol,uint256 supply) returns(address)"

];

const ERC721_ABI = [
"function createNFT(string name,string symbol,string tokenURI) returns(address)"
];

const ERC1155_ABI = [
"function mint(address to,uint256 id,uint256 amount,string tokenURI)"
];

// ==========================
// GLOBALS
// ==========================

let signer;

// ==========================
// CONNECT WALLET
// ==========================

async function connectWallet() {

    try {

        if (!window.ethereum) {
            alert("Install MetaMask");
            return;
        }

        const provider =
            new ethers.BrowserProvider(window.ethereum);

        await provider.send(
            "eth_requestAccounts",
            []
        );

        signer =
            await provider.getSigner();

        const address =
            await signer.getAddress();

        document.getElementById(
            "walletAddress"
        ).innerText =
            "Connected: " + address;

        alert("Wallet Connected");

    } catch(err) {

        console.error(err);
    }
}

// ==========================
// TAB SWITCH
// ==========================

function showTab(tab) {

    document
        .getElementById("erc20Section")
        .classList.add("hidden");

    document
        .getElementById("erc721Section")
        .classList.add("hidden");

    document
        .getElementById("erc1155Section")
        .classList.add("hidden");

    document
        .getElementById(tab + "Section")
        .classList.remove("hidden");
}

// ==========================
// IMAGE PREVIEW ERC721
// ==========================

function preview721(event) {

    const file =
        event.target.files[0];

    if(!file) return;

    const img =
        document.getElementById("preview721");

    img.src =
        URL.createObjectURL(file);

    img.classList.remove("hidden");
}

// ==========================
// IMAGE PREVIEW ERC1155
// ==========================

function preview1155(event) {

    const file =
        event.target.files[0];

    if(!file) return;

    const img =
        document.getElementById("preview1155");

    img.src =
        URL.createObjectURL(file);

    img.classList.remove("hidden");
}

// ==========================
// PINATA IMAGE UPLOAD
// ==========================

async function uploadImage(file) {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization:
                    `Bearer ${PINATA_JWT}`
                },
                body: formData
            }
        );

    const data =
        await response.json();

    return `ipfs://${data.IpfsHash}`;
}

// ==========================
// METADATA UPLOAD
// ==========================

async function uploadMetadata(
    name,
    imageCID
) {

    const metadata = {

        name: name,

        description:
        "Created from Token Creator DApp",

        image: imageCID
    };

    const response =
        await fetch(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            {
                method: "POST",

                headers: {

                    Authorization:
                    `Bearer ${PINATA_JWT}`,

                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(metadata)
            }
        );

    const data =
        await response.json();

    return `ipfs://${data.IpfsHash}`;
}

// ==========================
// CREATE ERC20
// ==========================
async function createERC20() {

    try {

        const name =
            document.getElementById(
                "erc20Name"
            ).value;

        const symbol =
            document.getElementById(
                "erc20Symbol"
            ).value;

        const supply =
            document.getElementById(
                "erc20Supply"
            ).value;

        const contract =
            new ethers.Contract(
                ERC20_FACTORY,
                ERC20_ABI,
                signer
            );

        const tx =
            await contract.createToken(
                name,
                symbol,
                supply
            );

        alert(
            "Creating ERC20..."
        );

        const receipt =
            await tx.wait();

        let tokenAddress = "";

        for (const log of receipt.logs) {

            try {

                const parsed =
                    contract.interface.parseLog(log);

                if (
                    parsed &&
                    parsed.name ===
                    "TokenCreated"
                ) {

                    tokenAddress =
                        parsed.args.tokenAddress;

                    break;
                }

            } catch {}
        }

        if (!tokenAddress) {

            alert(
                "Token created but address not found"
            );

            return;
        }

        alert(
            "ERC20 Created\n\n" +
            tokenAddress
        );

        await window.ethereum.request({

            method:
                "wallet_watchAsset",

            params: {

                type: "ERC20",

                options: {

                    address:
                        tokenAddress,

                    symbol:
                        symbol,

                    decimals:
                        18
                }
            }
        });

    } catch(err) {

        console.error(err);

        alert(
            "ERC20 Creation Failed"
        );
    }
}

// ==========================
// CREATE ERC721
// ==========================

async function createERC721() {

    try {

        const name =
            document.getElementById(
                "erc721Name"
            ).value;

        const symbol =
            document.getElementById(
                "erc721Symbol"
            ).value;

        const file =
            document.getElementById(
                "erc721Image"
            ).files[0];

        if(!file) {

            alert(
                "Select Image"
            );

            return;
        }

        alert(
            "Uploading Image..."
        );

        const imageCID =
            await uploadImage(file);

        alert(
            "Creating Metadata..."
        );

        const tokenURI =
            await uploadMetadata(
                name,
                imageCID
            );

        const contract =
            new ethers.Contract(
                ERC721_FACTORY,
                ERC721_ABI,
                signer
            );

        const tx =
            await contract.createNFT(
                name,
                symbol,
                tokenURI
            );

        alert(
            "Creating NFT..."
        );

        await tx.wait();

        alert(
            "ERC721 NFT Created"
        );

    } catch(err) {

        console.error(err);

        alert(
            "ERC721 Creation Failed"
        );
    }
}

// ==========================
// CREATE ERC1155
// ==========================

async function createERC1155() {

    try {

        const to =
            document.getElementById(
                "erc1155To"
            ).value;

        const id =
            document.getElementById(
                "erc1155Id"
            ).value;

        const amount =
            document.getElementById(
                "erc1155Amount"
            ).value;

        const file =
            document.getElementById(
                "erc1155Image"
            ).files[0];

        if(!file) {

            alert(
                "Select Image"
            );

            return;
        }

        alert(
            "Uploading Image..."
        );

        const imageCID =
            await uploadImage(file);

        alert(
            "Creating Metadata..."
        );

        const tokenURI =
            await uploadMetadata(
                `ERC1155 #${id}`,
                imageCID
            );

        const contract =
            new ethers.Contract(
                ERC1155_ADDRESS,
                ERC1155_ABI,
                signer
            );

        const tx =
            await contract.mint(
                to,
                id,
                amount,
                tokenURI
            );

        alert(
            "Minting ERC1155..."
        );

        await tx.wait();

        alert(
            "ERC1155 Minted Successfully"
        );

    } catch(err) {

        console.error(err);

        alert(
            "ERC1155 Mint Failed"
        );
    }
}