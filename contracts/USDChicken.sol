// SPDX-License-Identifier: MIT
/*

    然后目前的计划是mint 2次 第一次supply 114个 第二次supply 514个 卖不完烧掉 这个可以写进去嘛？还是说得知道具体时间才能写？

*/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDChicken is ERC20, ERC20Burnable, Ownable {

    //########### constant ######################
    uint public constant FIRST_MINT = 114;
    uint public constant SECOND_MINT = 514;
    string public constant NAME = "USDChicken";
    string public constant SYMBOL = "USDChick";

    //########### Mapping #######################

    // mapping map address with uint to store USDChicken minted
    // by a user so far, each user can mint max 20, 10 per round
    mapping (address => uint) public chickenHolder;

    // Identifier for first round of mint
    mapping (address => uint) public mintedCheckFirst;

    // Identtifier for second round of mint
    mapping (address => uint) public mintedCheckSecond;


    //########### Constructor ###################
    constructor() ERC20(NAME, SYMBOL) {}

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
    function firstMint(uint256 amount) public canOnlyMintTen(amount){
        // require(blockTime )

        // Set the constant variable
        uint getCurrentAmount = chickenHolder[msg.sender];
        uint getCurrentStatus = mintedCheckFirst[msg.sender];

        // requirements before mint
        require((totalSupply() + amount) <= FIRST_MINT, "First round of sell is over");
        require(getCurrentAmount <= 10, "You can only hold 10 USDChicken");
        require(getCurrentStatus == 0, "You have already claimed your token for this round");

        // calls
        chickenHolder[msg.sender] = amount;
        mintedCheckFirst[msg.sender] = 1;
        _mint(msg.sender, amount);
    }

    function SecondMint(uint256 amount) public canOnlyMintTen(amount){

        // Set the constant variable
        uint getCurrentAmount = chickenHolder[msg.sender];
        uint getCurrentStatus = mintedCheckSecond[msg.sender];

        // requirements before mint
        require((totalSupply() + amount) <= (FIRST_MINT+SECOND_MINT), "Second round of sell is over");
        require(getCurrentAmount <= 20, "You can only hold 20 USDChicken");
        require(getCurrentStatus == 0, "You have already claimed your token for this round");


        chickenHolder[msg.sender] += amount;
        mintedCheckSecond[msg.sender] = 1;
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public override mustBeFiveOrTenModulus(amount) {
        require(balanceOf(msg.sender) > amount, "You dont have enough token");
        super.burn(amount);
    }

    // For frontend to check if user has minted
    function returnFirstMintCheck() public view returns(bool){
        if(mintedCheckFirst[msg.sender] == 1){
            return true;
        }else{
            return false;
        }
    }

    // For frontend to check if user has minted
    function returnSecondMintCheck() public view returns(bool){
        if(mintedCheckSecond[msg.sender] == 1){
            return true;
        }else{
            return false;
        }
    }
}

