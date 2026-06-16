// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyERC1155 is ERC1155 {

    mapping(uint256 => string) private tokenURIs;

    constructor() ERC1155("") {}

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        string memory _uri
    ) public {

        _mint(to,id,amount,"");

        tokenURIs[id] = _uri;
    }

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
}