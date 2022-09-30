const { ethers } = require("hardhat");

async function main() {
    const MyUSDCHK = await ethers.getContractFactory("USDChicken");
    const MyUSDCHKV1 = await MyUSDCHK.deploy();
    await MyUSDCHKV1.deployed();
    console.log("MyUSDCHKV1 deployed to:", MyUSDCHKV1.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
