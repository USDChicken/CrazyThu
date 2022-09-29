pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VMe50 is ERC20, ERC20Burnable {

    uint public constant supplyAmount = 6402000 * 10 ** 18;

    constructor() ERC20("VMe50", "VM50") {
    }

    function mint(uint256 amount) public {
        require(totalSupply() + amount <= supplyAmount, "VMe50: mint amount exceeds supply amount");
        _mint(msg.sender, amount);
    }

    function returnSupplyAmount() public pure returns (uint) {
        return supplyAmount;
    }
}
