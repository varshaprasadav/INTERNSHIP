// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyERC20.sol";

contract ERC20Factory {

    struct TokenInfo {

        address tokenAddress;
        string name;
        string symbol;
        uint256 totalSupply;

    }

    event TokenCreated(

        address indexed tokenAddress,
        address indexed owner,
        string name,
        string symbol,
        uint256 totalSupply

    );

    // All token contract addresses
    address[] public allTokens;

    // Token addresses created by each user
    mapping(address => address[]) public userTokens;

    // Complete token details for each user
    mapping(address => TokenInfo[]) private userTokenDetails;

    // ==========================
    // CREATE TOKEN
    // ==========================

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

        MyERC20 token = new MyERC20(

            name,
            symbol,
            supply,
            msg.sender

        );

        address tokenAddress = address(token);

        allTokens.push(tokenAddress);

        userTokens[msg.sender].push(tokenAddress);

        // Save complete token details

        userTokenDetails[msg.sender].push(

            TokenInfo({

                tokenAddress: tokenAddress,
                name: name,
                symbol: symbol,
                totalSupply: supply

            })

        );

        emit TokenCreated(

            tokenAddress,
            msg.sender,
            name,
            symbol,
            supply

        );

        return tokenAddress;

    }

    // ==========================
    // ALL TOKEN ADDRESSES
    // ==========================

    function getAllTokens()

        external
        view
        returns(address[] memory)

    {

        return allTokens;

    }

    // ==========================
    // MY TOKEN ADDRESSES
    // ==========================

    function getMyTokens()

        external
        view
        returns(address[] memory)

    {

        return userTokens[msg.sender];

    }

    // ==========================
    // MY TOKEN DETAILS
    // ==========================

    function getMyTokenDetails()

        external
        view
        returns(TokenInfo[] memory)

    {

        return userTokenDetails[msg.sender];

    }

}