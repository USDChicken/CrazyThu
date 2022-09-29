pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface IVMe50 is IERC20{
    /**
     * @dev the interface of the VMe50 token
     */
    function mint(address to, uint256 amount) external;

    function returnSupplyAmount() external pure returns (uint);
}
