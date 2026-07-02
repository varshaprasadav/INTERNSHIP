// ==========================
// CONTRACT ADDRESSES
// ==========================

const ERC20_FACTORY =
"0xd8bD34C7444F728B9A963fFacdC0577d6F33c4F0";
const ERC721_ADDRESS = "0xedd330A89D8d1133a19EeaFC9b7CC4505Ff2c898";


const ERC1155_ADDRESS =
"0x4660BAfedE69C12F02bD472d6529c4828FBaC5f7";

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

"function mint(address to,uint256 id,uint256 amount,string tokenURI)",

"function balanceOf(address account,uint256 id) view returns(uint256)",

"function totalCopies(uint256 id) view returns(uint256)",

"function uri(uint256 id) view returns(string)",

"function safeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes data)"

];

// ==========================
// GLOBALS
// ==========================

let signer;
const uploadedImages = new Set();

let nftGallery =
JSON.parse(
localStorage.getItem("gallery")
) || [];

let erc1155Gallery =
JSON.parse(
localStorage.getItem("erc1155Gallery")
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

    if (collectionName === "") {
        alert("Enter Collection Name");
        return;
    }

    if (collectionSymbol === "") {
        alert("Enter Collection Symbol");
        return;
    }

    if (!file) {
        alert("Select Image");
        return;
    }

    // ==============================
    // Generate SHA-256 Image Hash
    // ==============================

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

    // ==============================
    // Smart Contract
    // ==============================

    const contract = new ethers.Contract(
        ERC721_ADDRESS,
        ERC721_ABI,
        signer
    );

    // ==============================
    // Check Duplicate Image
    // ==============================

    const exists =
        await contract.imageExists(imageHash);

    if (exists) {

        alert(
            "This image has already been minted as an NFT."
        );

        return;
    }

    // ==============================
    // Upload Image
    // ==============================

    alert("Uploading Image...");

    const imageURL =
        await uploadImage(file);

 

    // ==============================
    // Mint NFT
    // ==============================

    alert("Minting NFT...");

    const tx =
        await contract.mint(
            await signer.getAddress(),
            tokenURI,
            imageHash
        );

    await tx.wait();

    // ==============================
    // Get Token ID
    // ==============================

    const tokenId =
        (await contract.nextTokenId()) - 1n;

    const owner =
        await signer.getAddress();

    // ==============================
    // NFT Details Card
    // ==============================

    document
        .getElementById("nftCard")
        .classList.remove("hidden");

    document
        .getElementById("collectionName")
        .innerText =
        collectionName;

    document
        .getElementById("collectionSymbol")
        .innerText =
        collectionSymbol;

    document
        .getElementById("tokenId")
        .innerText =
        tokenId;

    document
        .getElementById("owner")
        .innerText =
        owner;

    document
        .getElementById("contractAddress")
        .innerText =
        ERC721_ADDRESS;

   
    document
        .getElementById("mintedImage")
        .src =
        imageURL;

    document
        .getElementById("viewNFT")
        .href =
        imageURL;

    document
        .getElementById("explorer")
        .href =
        "https://hoodi.etherscan.io/address/" +
        ERC721_ADDRESS;

    // ==============================
    // Temporary Gallery (will remove in Part 3)
    // ==============================

    const nft = {

        name: collectionName,

        symbol: collectionSymbol,

        image: imageURL,

        tokenId: tokenId.toString(),

        owner: owner,

        uri: tokenURI

    };

    nftGallery.push(nft);

    localStorage.setItem(
        "gallery",
        JSON.stringify(nftGallery)
    );

    loadGallery();

    alert(
        "NFT Minted Successfully!\n\nToken ID : " +
        tokenId
    );

} catch (err) {

    console.error(err);

    if (
        err.reason &&
        err.reason.includes("Image already minted")
    ) {

        alert(
            "This image has already been minted on the blockchain."
        );

        return;
    }

    alert(
        err.reason ||
        err.shortMessage ||
        err.message
    );
}

}
// ==========================
// LOAD NFT GALLERY
// ==========================

function loadGallery() {

    document
.getElementById("gallerySection")
.classList.remove("hidden");
    const gallerySection =
        document.getElementById("gallerySection");

    const gallery =
        document.getElementById("gallery");

    gallerySection.classList.remove("hidden");

    gallery.innerHTML = "";

    if (nftGallery.length === 0) {

        gallery.innerHTML =
        `<p class="text-gray-500">No NFTs Minted Yet.</p>`;

        return;
    }

    nftGallery.forEach((nft) => {

        gallery.innerHTML += `

        <div class="border rounded-xl shadow bg-white p-4">

            <img
            src="${nft.image}"
            class="w-full h-48 object-cover rounded-lg">

            <h3 class="font-bold text-lg mt-3">
                ${nft.name}
            </h3>

            <p><b>Token ID:</b> ${nft.tokenId}</p>

            <p><b>Symbol:</b> ${nft.symbol}</p>

            <p class="break-all">
                <b>Owner:</b><br>${nft.owner}
            </p>

            <a
            href="${nft.uri}"
            target="_blank"
            class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded">

            View Metadata

            </a>

        </div>

        `;

    });

}

// ==========================
// CREATE ERC1155
// ==========================



async function createERC1155() {

    try {

        const to =
            document.getElementById("erc1155To").value;

        const id =
            document.getElementById("erc1155Id").value;

        const amount =
            document.getElementById("erc1155Amount").value;

        const file =
            document.getElementById("erc1155Image").files[0];

        if (!to || !id || !amount) {

            alert("Fill all fields");

            return;
        }

        const contract =
            new ethers.Contract(
                ERC1155_ADDRESS,
                ERC1155_ABI,
                signer
            );

        // Check whether Token ID already exists
        let tokenURI = "";

        try {

            tokenURI =
                await contract.uri(id);

        } catch {

            tokenURI = "";

        }

        let imageURL = "";

        // New Token ID
        if (!tokenURI || tokenURI == "") {

            if (!file) {

                alert("Select Image");

                return;

            }

            alert("Uploading Image...");

            const imageCID =
                await uploadImage(file);

            imageURL =
                imageCID.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                );

            alert("Uploading Metadata...");

            tokenURI =
                await uploadMetadata(
                    `ERC1155 #${id}`,
                    imageCID
                );

        }

        // Existing Token ID
        else {

            const metadataURL =
                tokenURI.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                );

            const metadata =
                await fetch(metadataURL).then(r => r.json());

            imageURL =
                metadata.image.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                );

        }

        const tx =
            await contract.mint(
                to,
                id,
                amount,
                tokenURI
            );

        alert("Minting NFT...");

        await tx.wait();

        const balance =
            await contract.balanceOf(
                to,
                id
            );

        const copies =
            await contract.totalCopies(
                id
            );

        document
            .getElementById("erc1155Card")
            .classList.remove("hidden");

        document
            .getElementById("erc1155MintedImage")
            .src = imageURL;

        document
            .getElementById("erc1155TokenId")
            .innerHTML = id;

        document
            .getElementById("erc1155Copies")
            .innerHTML = copies.toString();

        document
            .getElementById("erc1155Balance")
            .innerHTML = balance.toString();

        document
            .getElementById("erc1155Owner")
            .innerHTML = to;

        // Update gallery if Token ID already exists
        const index =
            erc1155Gallery.findIndex(
                nft => nft.id == id
            );

        if (index >= 0) {

            erc1155Gallery[index].owner = to;

        } else {

            erc1155Gallery.push({

                id: id,

                image: imageURL,

                owner: to

            });

        }

        localStorage.setItem(

            "erc1155Gallery",

            JSON.stringify(
                erc1155Gallery
            )

        );

        load1155Gallery();

        alert("ERC1155 Minted Successfully");

    }

    catch (err) {

        console.log(err);

        alert("Mint Failed");

    }

}

// ==========================
// LOAD GALLERY
// ==========================

window.onload = function () {

    load1155Gallery();

};

function toggle1155Gallery() {

    const gallery =
        document.getElementById("gallery1155");

    if (gallery.classList.contains("hidden")) {

        gallery.classList.remove("hidden");

        load1155Gallery();

    }

    else {

        gallery.classList.add("hidden");

    }

}

async function load1155Gallery() {

    const gallery =
        document.getElementById("gallery1155");

    gallery.innerHTML = "";

    if (erc1155Gallery.length == 0) {

        gallery.innerHTML =
            "<p>No ERC1155 NFTs Minted</p>";

        return;

    }

    const contract =
        new ethers.Contract(
            ERC1155_ADDRESS,
            ERC1155_ABI,
            signer
        );

    for (const nft of erc1155Gallery) {

        const balance =
            await contract.balanceOf(
                nft.owner,
                nft.id
            );

        const copies =
            await contract.totalCopies(
                nft.id
            );

        gallery.innerHTML += `

<div class="border rounded-xl p-4 bg-white shadow">

<img
src="${nft.image}"
class="w-full h-48 object-cover rounded-lg">

<p class="mt-3">
<b>Token ID :</b> ${nft.id}
</p>

<p>
<b>Total Copies :</b> ${copies}
</p>

<p>
<b>Your Balance :</b> ${balance}
</p>

<p class="break-all">
<b>Owner :</b> ${nft.owner}
</p>

</div>

`;

    }

}


// ==========================
// REFRESH DAPP
// ==========================

function refreshDApp() {

    // ERC20
    const erc20Name = document.getElementById("erc20Name");
    if (erc20Name) erc20Name.value = "";

    const erc20Symbol = document.getElementById("erc20Symbol");
    if (erc20Symbol) erc20Symbol.value = "";

    const erc20Supply = document.getElementById("erc20Supply");
    if (erc20Supply) erc20Supply.value = "";


    // ERC721
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


    // NFT Card
    const card = document.getElementById("nftCard");
    if (card) card.classList.add("hidden");

    document.getElementById("collectionName").innerHTML = "";
    document.getElementById("collectionSymbol").innerHTML = "";
    document.getElementById("tokenId").innerHTML = "";
    document.getElementById("owner").innerHTML = "";
    document.getElementById("contractAddress").innerHTML = "";
    document.getElementById("metadataURI").innerHTML = "";

    const minted = document.getElementById("mintedImage");
    if (minted) minted.src = "";


    // ERC1155
    const to = document.getElementById("erc1155To");
    if (to) to.value = "";

    const id = document.getElementById("erc1155Id");
    if (id) id.value = "";

    const amount = document.getElementById("erc1155Amount");
    if (amount) amount.value = "";

    const img1155 = document.getElementById("erc1155Image");
    if (img1155) img1155.value = "";

  const preview1155 = document.getElementById("preview1155");

if (preview1155) {

    preview1155.src = "";

    preview1155.classList.add("hidden");

}

// Hide Gallery

const gallerySection =
document.getElementById("gallerySection");

if(gallerySection){

gallerySection.classList.add("hidden");

}

}