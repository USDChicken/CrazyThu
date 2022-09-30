pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VMe50 is ERC20, ERC20Burnable {

    /*
    * @dev the contract of the VMe50 token
    */

    uint public constant supplyAmount = 6402000 * 10 ** 18;

    constructor() ERC20("VMe50", "VM50") {
    }

    // mint function
    function mint(address to, uint256 amount) public {
        uint256 amountWithDecimals = amount * 10 ** 18;
        require((totalSupply() + amountWithDecimals) <= supplyAmount, "VMe50: mint amount exceeds supply amount");
        _mint(to, amountWithDecimals);
    }

    // return supply amount
    function returnSupplyAmount() public pure returns (uint) {
        return supplyAmount;
    }

    //TODO: 赠送

}
