// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyERC1155 is ERC1155 {

    // ==========================
    // STORAGE
    // ==========================

    mapping(uint256 => string) private tokenURIs;

    mapping(uint256 => uint256) public totalSupply;

    // Image Hash => Token ID + 1
    // (0 means image not used)
    mapping(bytes32 => uint256) public imageToToken;

    constructor() ERC1155("") {}

    // ==========================
    // MINT
    // ==========================

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        string memory _uri,
        bytes32 imageHash
    ) public {

        // --------------------------
        // New Token ID
        // --------------------------

        if(bytes(tokenURIs[id]).length == 0){

            // Same image cannot belong
            // to another Token ID

            require(

                imageToToken[imageHash] == 0,

                "Image already belongs to another Token ID"

            );

            tokenURIs[id] = _uri;

            imageToToken[imageHash] = id + 1;

        }

        // --------------------------
        // Existing Token ID
        // --------------------------

        else{

            require(

                keccak256(bytes(tokenURIs[id])) ==
                keccak256(bytes(_uri)),

                "Metadata mismatch"

            );

            require(

                imageToToken[imageHash] == id + 1,

                "Wrong image for this Token ID"

            );

        }

        _mint(
            to,
            id,
            amount,
            ""
        );

        totalSupply[id] += amount;
    }

    // ==========================
    // URI
    // ==========================

    function uri(
        uint256 id
    )
        public
        view
        override
        returns(string memory)
    {
        return tokenURIs[id];
    }

    // ==========================
    // TOTAL COPIES
    // ==========================

    function totalCopies(
        uint256 id
    )
        public
        view
        returns(uint256)
    {
        return totalSupply[id];
    }

    // ==========================
    // TOKEN EXISTS
    // ==========================

    function exists(
        uint256 id
    )
        public
        view
        returns(bool)
    {
        return bytes(tokenURIs[id]).length > 0;
    }

}