// SPDX-License-Identifier: MIT
/*

    然后目前的计划是mint 2次 第一次supply 114个 第二次supply 514个 卖不完烧掉 这个可以写进去嘛？还是说得知道具体时间才能写？

*/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IVMe50.sol";

contract USDChicken is ERC20, ERC20Burnable, Ownable {

    /*
    * @dev the contract of the USDChicken token
    */

    IVMe50 public VME50;

    //########### constant ######################
    uint public constant FIRST_MINT = 114 * 10 ** 18;
    uint public constant SECOND_MINT = 514 * 10 ** 18;
    string public constant NAME = "USDChicken";
    string public constant SYMBOL = "USDCHK";

    //########### Mapping #######################

    // mapping map address with uint to store USDChicken minted
    // by a user so far, each user can mint max 20, 10 per round
    mapping(address => uint) public chickenHolder;

    // Identifier for first round of mint
    mapping(address => uint) public mintedCheckFirst;

    // Identtifier for second round of mint
    mapping(address => uint) public mintedCheckSecond;


    //########### Constructor ###################
    constructor(
        address _VME50
    )
    ERC20(NAME, SYMBOL) {
        VME50 = IVMe50(_VME50);
    }

    //########### Modifier ######################

    // Modifier for burnt mechnism, user can only burn
    // amount which is modulor to 5 or 10
    modifier mustBeFiveOrTenModulus(uint256 amount) {
        require(amount % 5 == 0 || amount % 10 == 0, "USDChicken: must be 5 or 10 modulus");
        _;
    }

    // Modifier for mint, user can only mint 10
    // tokens at max per Mint
    modifier canOnlyMintTen(uint256 amount) {
        require(amount <= 10, "You can only mint 10 USDChicken");
        _;
    }


    //########### Public Function ###############

    // Function for first mint
    function firstMint(uint256 amount) public canOnlyMintTen(amount) {
        // require(blockTime )

        // Set the constant variable
        uint getCurrentAmount = chickenHolder[msg.sender];
        uint getCurrentStatus = mintedCheckFirst[msg.sender];

        // requirements before mint
        require((totalSupply() + amount) <= FIRST_MINT, "First round of sell is over");
        require(getCurrentAmount <= 10, "You can only hold 10 USDChicken");
        require(getCurrentStatus == 0, "You have already claimed your token for this round");
        require(amount > 0, "You can not mint 0 USDChicken");

        // mint the token
        uint256 mintAmount = amount * 10 ** 18;
        // calls
        chickenHolder[msg.sender] = amount;
        mintedCheckFirst[msg.sender] = 1;
        _mint(msg.sender, mintAmount);
    }

    function SecondMint(uint256 amount) public canOnlyMintTen(amount) {

        // Set the constant variable
        uint getCurrentAmount = chickenHolder[msg.sender];
        uint getCurrentStatus = mintedCheckSecond[msg.sender];

        // requirements before mint
        require((totalSupply() + amount) <= (FIRST_MINT + SECOND_MINT), "Second round of sell is over");
        require(getCurrentAmount <= 20, "You can only hold 20 USDChicken");
        require(getCurrentStatus == 0, "You have already claimed your token for this round");
        require(amount > 0, "You can not mint 0 USDChicken");

        uint256 mintAmount = amount * 10 ** 18;

        chickenHolder[msg.sender] += amount;
        mintedCheckSecond[msg.sender] = 1;
        _mint(msg.sender, mintAmount);
    }

    function burn(uint256 amount) public override mustBeFiveOrTenModulus(amount) {
        require(balanceOf(msg.sender) > amount, "ERC20: burn amount exceeds balance");
        require(amount > 0, "ERC20: burn amount must be greater than 0");
        uint256 burnAmount = amount * 10 ** 18;
        super.burn(burnAmount);
        uint VME50Amount = amount * 10;
        require(VME50.totalSupply() + VME50Amount <= VME50.returnSupplyAmount(), "VME50 supply is over");
        VME50.mint(msg.sender, VME50Amount);
    }

    // For frontend to check if user has minted
    function returnFirstMintCheck() public view returns (bool){
        if (mintedCheckFirst[msg.sender] == 1) {
            return true;
        } else {
            return false;
        }
    }

    // For frontend to check if user has minted
    function returnSecondMintCheck() public view returns (bool){
        if (mintedCheckSecond[msg.sender] == 1) {
            return true;
        } else {
            return false;
        }
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent,) = _owner.call{value : amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

