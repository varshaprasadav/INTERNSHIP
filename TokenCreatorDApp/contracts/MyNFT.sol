// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {

    uint256 public nextTokenId;

    string public collectionName;
    string public collectionSymbol;

    // ------------------------------------
    // NEW
    // Prevent duplicate images
    // ------------------------------------
    mapping(bytes32 => bool) public usedImages;

    // ------------------------------------
    // NEW
    // Store NFTs owned by each address
    // ------------------------------------
    mapping(address => uint256[]) private ownerNFTs;

    event NFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenURI
    );

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC721(_name, _symbol)
    {
        collectionName = _name;
        collectionSymbol = _symbol;
    }

    function mint(
        address to,
        string memory uri,
        bytes32 imageHash
    )
        public
        returns (uint256)
    {
        // -------------------------
        // Prevent duplicate image
        // -------------------------
        require(
            !usedImages[imageHash],
            "Image already minted"
        );

        uint256 tokenId = nextTokenId;

        nextTokenId++;

        _safeMint(
            to,
            tokenId
        );

        _setTokenURI(
            tokenId,
            uri
        );

        // Save image hash forever
        usedImages[imageHash] = true;

        // Save owner's NFT
        ownerNFTs[to].push(tokenId);

        emit NFTMinted(
            tokenId,
            to,
            uri
        );

        return tokenId;
    }

    // -------------------------
    // Total NFTs Minted
    // -------------------------
    function totalMinted()
        public
        view
        returns (uint256)
    {
        return nextTokenId;
    }

    // -------------------------
    // Check duplicate image
    // -------------------------
    function imageExists(
        bytes32 imageHash
    )
        public
        view
        returns (bool)
    {
        return usedImages[imageHash];
    }

    // -------------------------
    // Get NFTs owned by user
    // -------------------------
    function getNFTsByOwner(
        address owner
    )
        public
        view
        returns (uint256[] memory)
    {
        return ownerNFTs[owner];
    }
}