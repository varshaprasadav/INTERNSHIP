// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyERC1155 is ERC1155 {

    mapping(uint256 => string) private tokenURIs;

    mapping(uint256 => uint256) public totalSupply;

    constructor() ERC1155("") {}

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        string memory _uri
    ) public {

        // If this token id is new, save its metadata
        if(bytes(tokenURIs[id]).length == 0){

            tokenURIs[id] = _uri;

        }
        else{

            // If token id already exists, metadata must be the same
            require(

                keccak256(bytes(tokenURIs[id])) ==
                keccak256(bytes(_uri)),

                "Token ID already exists with different metadata"

            );
        }

        _mint(to,id,amount,"");

        totalSupply[id] += amount;
    }

    function uri(uint256 id)
        public
        view
        override
        returns(string memory)
    {
        return tokenURIs[id];
    }

    function totalCopies(uint256 id)
        public
        view
        returns(uint256)
    {
        return totalSupply[id];
    }
}