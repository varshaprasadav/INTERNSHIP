// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address owner
    ) ERC20(name, symbol) {
        _mint(owner, supply * 10 ** decimals());
    }
}