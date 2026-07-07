// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyERC20.sol";

contract ERC20Factory {

    event TokenCreated(
        address indexed tokenAddress,
        address indexed owner,
        string name,
        string symbol,
        uint256 totalSupply
    );

    address[] public allTokens;

    mapping(address => address[]) public userTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint256 supply
    )
        external
        returns(address)
    {
        require(bytes(name).length > 0, "Token name required");
        require(bytes(symbol).length > 0, "Token symbol required");
        require(supply > 0, "Supply must be greater than zero");

        MyERC20 token =
            new MyERC20(
                name,
                symbol,
                supply,
                msg.sender
            );

        allTokens.push(address(token));
        userTokens[msg.sender].push(address(token));

        emit TokenCreated(
            address(token),
            msg.sender,
            name,
            symbol,
            supply
        );

        return address(token);
    }

    function getAllTokens()
        external
        view
        returns(address[] memory)
    {
        return allTokens;
    }

    function getMyTokens()
        external
        view
        returns(address[] memory)
    {
        return userTokens[msg.sender];
    }
}