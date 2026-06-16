pragma solidity ^0.8.20;

import "./MyNFT.sol";

contract ERC721Factory {

    event NFTCreated(address nftAddress);

    function createNFT(
        string memory name,
        string memory symbol,
        string memory tokenURI
    ) public returns(address) {

        MyNFT nft = new MyNFT(
            name,
            symbol,
            msg.sender,
            tokenURI
        );

        emit NFTCreated(address(nft));

        return address(nft);
    }
}