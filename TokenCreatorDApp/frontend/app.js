// ==========================
// CONTRACT ADDRESSES
// ==========================

const ERC20_FACTORY =
"0xd8bD34C7444F728B9A963fFacdC0577d6F33c4F0";
const ERC721_ADDRESS = "0xf8Af9df05c805dE5bf3EcA61832C55AB8e8dc8e3";


const ERC1155_ADDRESS =
"0x1Bd66491DECF93078e409D26500B91DaBA9C290c";

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxODY0MjhmNC0wMWFmLTQ5Y2YtYjAwZS0wYTI5Njc1YjY0YjEiLCJlbWFpbCI6InZhcnNoYXByYXNhZDIwMTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZjMzU3ZTM1ZThlMjFkMzBhYjMzIiwic2NvcGVkS2V5U2VjcmV0IjoiNGZlNjQ0MzU0NjhlM2M0ZTdiZWU4MDMyZmFmNzlkMzkyN2M3OWNiNjRlZTRmM2Q1ZWI5NjY5OTFjZjFkZGEzZCIsImV4cCI6MTgxMjc4NTEwMX0.N1O4AlfJS8cf0lnGTjgt1PY60JvB6ivCvWjQ-rj1Lw0";




// ==========================
// ABIs
// ==========================

const ERC20_ABI = [

"event TokenCreated(address tokenAddress,address owner)",

"function createToken(string name,string symbol,uint256 supply) returns(address)"

];

const ERC721_ABI = [

"event NFTMinted(uint256 tokenId,address owner,string tokenURI)",

"function mint(address to,string tokenURI,bytes32 imageHash) returns(uint256)",

"function ownerOf(uint256 tokenId) view returns(address)",

"function tokenURI(uint256 tokenId) view returns(string)",

"function name() view returns(string)",

"function symbol() view returns(string)",

"function nextTokenId() view returns(uint256)",

"function totalMinted() view returns(uint256)",

"function imageExists(bytes32 imageHash) view returns(bool)",

"function getNFTsByOwner(address owner) view returns(uint256[])"

];
const ERC1155_ABI = [

"function mint(address to,uint256 id,uint256 amount,string tokenURI,bytes32 imageHash)",

"function getImageHash(uint256 id) view returns(bytes32)",

"function balanceOf(address account,uint256 id) view returns(uint256)",

"function totalCopies(uint256 id) view returns(uint256)",

"function uri(uint256 id) view returns(string)",

"function exists(uint256 id) view returns(bool)",

"function safeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes data)"

];

// ==========================
// GLOBALS
// ==========================

let signer;
const uploadedImages = new Set();




const ERC721_STORAGE_KEY =
    `erc721Gallery_${ERC721_ADDRESS}`;

let nftGallery =
    JSON.parse(
        localStorage.getItem(ERC721_STORAGE_KEY)
    ) || [];


const ERC1155_STORAGE_KEY =
`erc1155Gallery_${ERC1155_ADDRESS}`;

let erc1155Gallery =
JSON.parse(
localStorage.getItem(ERC1155_STORAGE_KEY)
) || [];

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
// IMAGE PREVIEW
// ==========================
function preview721(event){

const file=event.target.files[0];

if(!file) return;

const img=document.getElementById("preview721");

img.src=URL.createObjectURL(file);

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


}// ==========================
// PINATA IMAGE UPLOAD
// ==========================
async function uploadImage(file) {
  try {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`
        },
        body: form
      }
    );

    const data = await res.json();

    if (!data.IpfsHash) {
      throw new Error("Image upload failed");
    }

    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (err) {
    console.error("Pinata image error:", err);
    throw err;
  }
}

// ==========================
// PINATA METADATA UPLOAD
// ==========================
async function uploadMetadata(name, imageURL) {
  try {
    if (!imageURL) throw new Error("Image missing");

    const meta = {
      name,
      description: "NFT from DApp",
      image: imageURL
    };

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(meta)
      }
    );

    const data = await res.json();

    if (!data.IpfsHash) {
      throw new Error("Metadata upload failed");
    }

    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (err) {
    console.error("Pinata metadata error:", err);
    throw err;
  }
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

        if (!signer) {
            alert("Connect Wallet First");
            return;
        }

        const collectionName =
            document.getElementById("erc721Name").value.trim();

        const collectionSymbol =
            document.getElementById("erc721Symbol").value.trim();

        const file =
            document.getElementById("erc721Image").files[0];

        if (!collectionName || !collectionSymbol || !file) {
            alert("Fill all fields");
            return;
        }

        const contract = new ethers.Contract(
            ERC721_ADDRESS,
            ERC721_ABI,
            signer
        );

        // IMAGE HASH
        const buffer = await file.arrayBuffer();

        const hashBuffer = await crypto.subtle.digest(
            "SHA-256",
            buffer
        );

        const imageHash =
            "0x" +
            Array.from(new Uint8Array(hashBuffer))
                .map(x => x.toString(16).padStart(2, "0"))
                .join("");

        const exists = await contract.imageExists(imageHash);

        if (exists) {
            alert("This image already minted!");
            return;
        }

        alert("Uploading Image...");

        const imageURL = await uploadImage(file);

        const tokenURI = await uploadMetadata(
            collectionName,
            imageURL
        );

        alert("Minting NFT...");

        const tx = await contract.mint(
            await signer.getAddress(),
            tokenURI,
            imageHash
        );

        await tx.wait();

        alert("NFT Minted Successfully!");

        // refresh gallery after mint
        await loadGallery();

    } catch (err) {
        console.error(err);
        alert(err.reason || err.message);
    }
}

// ==========================
// LOAD ERC721 GALLERY
// ==========================


async function loadGallery() {

    const gallerySection =
        document.getElementById("gallerySection");

    const gallery =
        document.getElementById("gallery");

    gallerySection.classList.remove("hidden");
    gallery.innerHTML = "";

    try {

        const contract = new ethers.Contract(
            ERC721_ADDRESS,
            ERC721_ABI,
            signer
        );

        const total = await contract.nextTokenId();

        if (total === 0n) {
            gallery.innerHTML =
                "<p class='text-gray-500'>No NFTs Minted Yet.</p>";
            return;
        }

        for (let i = 0n; i < total; i++) {

            const owner = await contract.ownerOf(i);
            const uri = await contract.tokenURI(i);

            let image = "";

            try {
                const res = await fetch(uri);
                const meta = await res.json();
                image = meta.image || "";
            } catch (e) {
                image = "";
            }

            gallery.innerHTML += `
                <div class="border rounded-xl shadow bg-white p-4">

                    <img src="${image}" class="w-full h-48 object-cover rounded-lg">

                    <h3 class="font-bold mt-3">
                        Token ID: ${i}
                    </h3>

                    <p class="break-all">
                        <b>Owner:</b><br>${owner}
                    </p>

                </div>
            `;
        }

    } catch (err) {
        console.error(err);
        alert("Failed to load gallery");
    }
}


// ==========================
// CREATE ERC1155
// ==========================
async function createERC1155() {

    try {

        if (!signer) {
            alert("Connect Wallet First");
            return;
        }

        const to = document.getElementById("erc1155To").value.trim();
        const id = document.getElementById("erc1155Id").value.trim();
        const amount = document.getElementById("erc1155Amount").value.trim();
        const file = document.getElementById("erc1155Image").files[0];

        if (!to || !id || !amount) {
            alert("Fill all fields");
            return;
        }

        // CONTRACT (ONLY ONCE)
        const contract = new ethers.Contract(
            ERC1155_ADDRESS,
            ERC1155_ABI,
            signer
        );

        const exists = await contract.exists(id);

        let tokenURI = "";
        let imageURL = "";
        let imageHash = "";

        // NEW TOKEN
        if (!exists) {

            if (!file) {
                alert("Select image");
                return;
            }

            const buffer = await file.arrayBuffer();

            const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

            imageHash =
                "0x" +
                Array.from(new Uint8Array(hashBuffer))
                .map(x => x.toString(16).padStart(2, "0"))
                .join("");

            imageURL = await uploadImage(file);

            tokenURI = await uploadMetadata(
                `ERC1155 #${id}`,
                imageURL
            );
        }

        // EXISTING TOKEN
        else {

            tokenURI = await contract.uri(id);

            const res = await fetch(tokenURI);
            const meta = await res.json();

            imageURL = meta.image || "";

            imageHash = await contract.getImageHash(id);
        }

        // MINT
        alert("Minting...");

        const tx = await contract.mint(
            to,
            id,
            amount,
            tokenURI,
            imageHash
        );

        await tx.wait();

        // DO NOT redeclare contract again ❌
        const copies = await contract.totalCopies(id);
        const balance = await contract.balanceOf(to, id);

        // SAVE GALLERY
        const index = erc1155Gallery.findIndex(x => x.id == id);

        if (index === -1) {

            erc1155Gallery.push({
                id,
                image: imageURL,
                owner: to,
                balance: balance.toString(),
                copies: copies.toString()
            });

        } else {

            erc1155Gallery[index].owner = to;
            erc1155Gallery[index].balance = balance.toString();
            erc1155Gallery[index].copies = copies.toString();

            if (!erc1155Gallery[index].image) {
                erc1155Gallery[index].image = imageURL;
            }
        }

        localStorage.setItem(
            ERC1155_STORAGE_KEY,
            JSON.stringify(erc1155Gallery)
        );

        load1155Gallery();

        // CLEAR FORM
        document.getElementById("erc1155To").value = "";
        document.getElementById("erc1155Id").value = "";
        document.getElementById("erc1155Amount").value = "";
        document.getElementById("erc1155Image").value = "";

        const preview = document.getElementById("preview1155");
        if (preview) {
            preview.src = "";
            preview.classList.add("hidden");
        }

        alert("Mint successful");

    } catch (err) {
        console.error(err);
        alert(err.reason || err.message);
    }
}



// ==========================
// ERC1155 GALLERY
// ==========================
async function load1155Gallery() {

    const gallery = document.getElementById("gallery1155Grid");
    if (!gallery) return;

    gallery.innerHTML = "";

    erc1155Gallery =
        JSON.parse(localStorage.getItem(ERC1155_STORAGE_KEY)) || [];

    if (erc1155Gallery.length === 0) {
        gallery.innerHTML = "<p class='text-gray-500'>No NFTs Yet</p>";
        return;
    }

    const contract = new ethers.Contract(
        ERC1155_ADDRESS,
        ERC1155_ABI,
        signer
    );

    for (const nft of erc1155Gallery) {

        const copies = await contract.totalCopies(nft.id);
        const balance = await contract.balanceOf(nft.owner, nft.id);

        gallery.innerHTML += `
            <div class="border rounded-xl shadow bg-white p-4">

                <img src="${nft.image}" class="w-full h-48 object-cover rounded-lg">

                <h3 class="font-bold mt-3">Token ID: ${nft.id}</h3>

                <p><b>Total Copies:</b> ${copies}</p>
                <p><b>Your Balance:</b> ${balance}</p>

                <p class="break-all mt-2">
                    <b>Owner:</b><br>${nft.owner}
                </p>

            </div>
        `;
    }
}

// ==========================
// TOGGLE ERC1155 GALLERY
// ==========================

async function toggle1155Gallery() {

    const gallery = document.getElementById("gallery1155");

    gallery.classList.toggle("hidden");

    if (!gallery.classList.contains("hidden")) {
        await load1155Gallery();
    }
}




// ==========================
// REFRESH DAPP
// ==========================

function refreshDApp() {

    // ==========================
    // ERC20
    // ==========================

    const erc20Name = document.getElementById("erc20Name");
    if (erc20Name) erc20Name.value = "";

    const erc20Symbol = document.getElementById("erc20Symbol");
    if (erc20Symbol) erc20Symbol.value = "";

    const erc20Supply = document.getElementById("erc20Supply");
    if (erc20Supply) erc20Supply.value = "";

    // ==========================
    // ERC721
    // ==========================

    const name = document.getElementById("erc721Name");
    if (name) name.value = "";

    const symbol = document.getElementById("erc721Symbol");
    if (symbol) symbol.value = "";

    const image = document.getElementById("erc721Image");
    if (image) image.value = "";

    const preview = document.getElementById("preview721");

    if (preview) {

        preview.src = "";
        preview.classList.add("hidden");

    }

    // Hide NFT Card

    const card = document.getElementById("nftCard");

    if (card) {

        card.classList.add("hidden");

    }

    document.getElementById("collectionName").innerHTML = "";
    document.getElementById("collectionSymbol").innerHTML = "";
    document.getElementById("tokenId").innerHTML = "";
    document.getElementById("owner").innerHTML = "";
    document.getElementById("contractAddress").innerHTML = "";

    const minted = document.getElementById("mintedImage");

    if (minted) {

        minted.src = "";

    }

    // Hide ERC721 Gallery

    const gallerySection =
        document.getElementById("gallerySection");

    if (gallerySection) {

        gallerySection.classList.add("hidden");

    }

    // ==========================
    // ERC1155
    // ==========================

    const to = document.getElementById("erc1155To");
    if (to) to.value = "";

    const id = document.getElementById("erc1155Id");
    if (id) id.value = "";

    const amount = document.getElementById("erc1155Amount");
    if (amount) amount.value = "";

    const img1155 = document.getElementById("erc1155Image");
    if (img1155) img1155.value = "";

    const preview1155 =
        document.getElementById("preview1155");

    if (preview1155) {

        preview1155.src = "";
        preview1155.classList.add("hidden");

    }

    // Hide ERC1155 Gallery

    const gallery1155 =
        document.getElementById("gallery1155");

    if (gallery1155) {

        gallery1155.classList.add("hidden");

    }

}
window.onload = async function () {

    loadGallery();

    await load1155Gallery();

};