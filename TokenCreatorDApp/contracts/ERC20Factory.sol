// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyERC20.sol";

contract ERC20Factory {

    event TokenCreated(
        address tokenAddress,
        address owner
    );

    function createToken(
        string memory name,
        string memory symbol,
        uint256 supply
    ) public returns(address) {

        MyERC20 token =
            new MyERC20(
                name,
                symbol,
                supply,
                msg.sender
            );

        emit TokenCreated(
            address(token),
            msg.sender
        );

        return address(token);
    }
}