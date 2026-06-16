pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {

    uint256 public tokenId;

    constructor(
        string memory name,
        string memory symbol,
        address owner,
        string memory _tokenURI
    ) ERC721(name, symbol) {

        tokenId = 1;

        _mint(owner, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }
}