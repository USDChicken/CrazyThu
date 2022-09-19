// SPDX-License-Identifier: MIT
/*

    然后目前的计划是mint 2次 第一次supply 114个 第二次supply 514个 卖不完烧掉 这个可以写进去嘛？还是说得知道具体时间才能写？

*/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDChicken is ERC20, ERC20Burnable, Ownable {
    uint public constant NUM_MINT = 2;
    uint public constant FIRST_MINT = 114;
    uint public constant SECOND_MINT = 514;
    uint public constant NAME = "USDChicken";
    uint public constant SYMBOL = "USDC";

    mapping (bool => address[]) public chickenHolder;

    constructor() ERC20("USDChicken", "USDC") {}

    function firstMint(uint256 amount) public {
        require(totalSupply() <= FIRST_MINT, "First mint is over");
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public virtual override {
        require(amount % 5 == 0, "Amount must be divisible by 5");
        _burn(msg.sender, amount);
    }
}
