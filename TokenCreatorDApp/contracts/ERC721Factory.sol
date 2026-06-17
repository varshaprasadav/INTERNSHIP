// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyNFT.sol";

contract ERC721Factory {

    event NFTCreated(address nftAddress, address owner);

    function createNFT() public returns (address) {
        MyNFT nft = new MyNFT();

        emit NFTCreated(address(nft), msg.sender);

        return address(nft);
    }
}